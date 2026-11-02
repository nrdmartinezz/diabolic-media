import { readFileSync } from 'node:fs';
import path from 'node:path';
import { onRequest, type Request } from 'firebase-functions/v2/https';
import { defineSecret, defineString } from 'firebase-functions/params';
import nodemailer from 'nodemailer';
import type { Response } from 'express';

const smtpPass = defineSecret('SMTP_PASS');
const recaptchaSecret = defineSecret('RECAPTCHA_SECRET');

const smtpHost = defineString('SMTP_HOST');
const smtpPort = defineString('SMTP_PORT', { default: '587' });
const smtpUser = defineString('SMTP_USER');
const notifyTo = defineString('NOTIFY_TO');
const fromEmail = defineString('FROM_EMAIL');
const fromName = defineString('FROM_NAME', { default: 'Diabolic Media' });
const siteUrl = defineString('SITE_URL', { default: '' });
const sitePhone = defineString('SITE_PHONE', { default: '' });
const sitePhoneHref = defineString('SITE_PHONE_HREF', { default: '' });
const timezone = defineString('TIMEZONE', { default: 'America/New_York' });
const sendAutoreply = defineString('SEND_AUTOREPLY', { default: 'false' });
const recaptchaMinScore = defineString('RECAPTCHA_MIN_SCORE', { default: '0.5' });

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const recentHits = new Map<string, number[]>();

type Fields = Record<string, string>;

function json(res: Response, status: number, body: { ok: boolean; error?: string }): void {
  res.status(status).json(body);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function readFields(req: Request): Fields {
  const body = req.body as unknown;
  if (!body || typeof body !== 'object' || Buffer.isBuffer(body)) return {};

  const fields: Fields = {};
  for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
    if (typeof value === 'string') fields[key] = value;
    else if (typeof value === 'number' || typeof value === 'boolean') fields[key] = String(value);
    else if (Array.isArray(value)) {
      fields[key] = value.filter((item): item is string => typeof item === 'string').join(', ');
    }
  }
  return fields;
}

function clientIp(req: Request): string {
  const forwarded = req.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim() ?? '';
    if (first) return first;
  }
  return req.ip || 'unknown';
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const hits = (recentHits.get(ip) ?? []).filter((stamp) => now - stamp < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    recentHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  recentHits.set(ip, hits);
  return true;
}

function parseEmails(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item));
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function renderTemplate(filename: string, vars: Fields): string {
  if (!/^[a-zA-Z0-9._-]+\.html$/.test(filename)) {
    throw new Error('Invalid template filename.');
  }
  const file = path.join(__dirname, '../templates', filename);
  let html = readFileSync(file, 'utf8');
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function formatSubmittedAt(timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date());
}

async function verifyRecaptcha(
  token: string,
  secret: string,
  minScore: number,
  remoteIp: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  const params = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  });
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean; score?: number };
  return Boolean(result.success) && (result.score ?? 0) >= minScore;
}

function allowLocalCors(req: Request, res: Response): boolean {
  if (process.env.FUNCTIONS_EMULATOR !== 'true') return false;
  const origin = req.get('origin') ?? '';
  if (!origin.startsWith('http://localhost') && !origin.startsWith('http://127.0.0.1'))
    return false;
  res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Vary', 'Origin');
  return req.method === 'OPTIONS';
}

export const submit = onRequest(
  {
    region: 'us-central1',
    cors: false,
    invoker: 'public',
    secrets: [smtpPass, recaptchaSecret],
    maxInstances: 5,
  },
  async (req, res) => {
    if (allowLocalCors(req, res)) {
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      json(res, 405, { ok: false, error: 'Method not allowed.' });
      return;
    }

    const host = smtpHost.value().trim();
    const user = smtpUser.value().trim();
    const pass = smtpPass.value().trim();
    const recipients = parseEmails(notifyTo.value());
    const sender = fromEmail.value().trim();
    const senderName = fromName.value().trim() || 'Diabolic Media';

    if (!host || !user || !pass || !sender || recipients.length === 0) {
      console.error('Form mail config missing or incomplete.');
      json(res, 503, { ok: false, error: 'Form is temporarily unavailable.' });
      return;
    }

    const ip = clientIp(req);
    if (!allowRequest(ip)) {
      json(res, 429, { ok: false, error: 'Too many submissions. Please try again later.' });
      return;
    }

    const fields = readFields(req);

    if (fields._gotcha) {
      json(res, 200, { ok: true });
      return;
    }

    const recaptchaKey = recaptchaSecret.value().trim();
    if (recaptchaKey && recaptchaKey !== 'off') {
      const minScore = Number(recaptchaMinScore.value()) || 0.5;
      const passed = await verifyRecaptcha(
        fields['g-recaptcha-response'] ?? '',
        recaptchaKey,
        minScore,
        ip,
      );
      if (!passed) {
        json(res, 400, { ok: false, error: 'Verification failed. Please refresh and try again.' });
        return;
      }
    }

    const formType = (fields.form_type ?? '').trim();
    if (formType !== 'contact') {
      json(res, 400, { ok: false, error: 'Invalid form submission.' });
      return;
    }

    const name = (fields.name ?? '').trim();
    const email = (fields.email ?? '').trim();
    let message = (fields.message ?? '').trim();
    const company = (fields.company ?? '').trim();
    const phone = (fields.phone ?? '').trim();
    const service = (fields.service ?? '').trim();
    const services = (fields.services ?? '').trim();
    const hearAbout = (fields.hear_about_us ?? '').trim();

    if (!name || !email || !message) {
      json(res, 400, { ok: false, error: 'Please fill in all required fields.' });
      return;
    }
    if (!isEmail(email)) {
      json(res, 400, { ok: false, error: 'Please enter a valid email address.' });
      return;
    }
    if (company) {
      message = `Brand / company: ${company}\n\n${message}`;
    }

    const servicesDisplay = services || service || '—';
    const templateVars: Fields = {
      subject_line: escapeHtml(`New enquiry — ${senderName}`),
      name: escapeHtml(name),
      email: escapeHtml(email),
      email_raw: email,
      phone: escapeHtml(phone || '—'),
      services: escapeHtml(servicesDisplay),
      hear_about_us: escapeHtml(hearAbout || '—'),
      message: escapeHtml(message),
      form_source: escapeHtml('Contact form'),
      submitted_at: escapeHtml(formatSubmittedAt(timezone.value() || 'America/New_York')),
      sender_ip: escapeHtml(ip),
      site_name: escapeHtml(senderName),
      site_url: escapeHtml(siteUrl.value()),
      site_phone: escapeHtml(sitePhone.value()),
      site_phone_href: escapeHtml(sitePhoneHref.value()),
    };

    const port = Number(smtpPort.value()) || 587;
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    try {
      const notificationHtml = renderTemplate('notification-contact.html', templateVars);
      await transport.sendMail({
        from: `"${senderName}" <${sender}>`,
        to: recipients,
        replyTo: `"${name}" <${email}>`,
        subject: `New enquiry — ${senderName}`,
        html: notificationHtml,
        text: htmlToText(notificationHtml),
      });

      if (sendAutoreply.value().trim().toLowerCase() === 'true') {
        const autoreplyHtml = renderTemplate('autoreply.html', templateVars);
        await transport.sendMail({
          from: `"${senderName}" <${sender}>`,
          to: `"${name}" <${email}>`,
          replyTo: `"${senderName}" <${recipients[0]}>`,
          subject: `We received your message — ${senderName}`,
          html: autoreplyHtml,
          text: htmlToText(autoreplyHtml),
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      json(res, 500, {
        ok: false,
        error: 'Something went wrong sending your message. Please call us instead.',
      });
      return;
    }

    json(res, 200, { ok: true });
  },
);

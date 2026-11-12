# Forms and email

Contact forms POST to a Firebase Cloud Function on the same domain (`/api/submit/`).
Firebase Hosting rewrites that path to the `submit` function. Hosting cannot run the old PHP mailer.

## How it works

```
Browser form
  → reCAPTCHA v3 token attached, when a site key is set
  → POST /api/submit/ (JSON via fetch, or a normal form post without JS)
  → honeypot + optional reCAPTCHA verified
  → HTML templates rendered
  → SMTP sends the notification
  → optional autoreply to the submitter
  → redirect to /thank-you/
```

**Frontend** (`src/config/site.ts`):

- `formEndpoint: '/api/submit/'` — blank disables all forms
- `recaptchaSiteKey` — public reCAPTCHA v3 key

**Backend** (`functions/`):

| Path                      | Role                                   |
| ------------------------- | -------------------------------------- |
| `src/index.ts`            | HTTPS function `submit`                |
| `templates/*.html`        | The same branded HTML emails as before |
| `.env`                    | Non-secret mail settings (gitignored)  |
| Secret `SMTP_PASS`        | Mailbox password                       |
| Secret `RECAPTCHA_SECRET` | Optional. Only checked when it is set  |

## Mail settings

Copy `functions/.env.example` to `functions/.env` and fill it in. Do not commit `.env`.

| Key                   | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `SMTP_HOST`           | SMTP server, such as `smtp.gmail.com`                    |
| `SMTP_PORT`           | `587` for STARTTLS, `465` for implicit TLS               |
| `SMTP_USER`           | SMTP username                                            |
| `NOTIFY_TO`           | Inbox for new enquiries. Comma-separate several.         |
| `FROM_EMAIL`          | From address. Must be allowed by the SMTP account.       |
| `FROM_NAME`           | From display name                                        |
| `SITE_URL`            | Used in the email templates                              |
| `SITE_PHONE`          | Display phone in the email footer                        |
| `SITE_PHONE_HREF`     | `tel:` href, digits only with country code               |
| `TIMEZONE`            | Timestamp zone. Defaults to `America/New_York`           |
| `SEND_AUTOREPLY`      | `true` sends the visitor a confirmation                  |
| `RECAPTCHA_MIN_SCORE` | Score threshold when reCAPTCHA is enabled. Default `0.5` |

Store the mailbox password as a secret, not in `.env`:

```bash
npx -y firebase-tools@latest functions:secrets:set SMTP_PASS --project diabolic-media
```

For local emulators, put the same value in `functions/.secret.local`:

```
SMTP_PASS=your-app-password
```

Gmail needs an [app password](https://myaccount.google.com/apppasswords) and `smtp.gmail.com`. Use that mailbox as both `SMTP_USER` and `FROM_EMAIL`.

### reCAPTCHA

The function expects `RECAPTCHA_SECRET` because it is bound at deploy time. Set it to `off` until you have a key pair. To turn the check on, store the real secret and set `recaptchaSiteKey` in `src/config/site.ts`:

```bash
npx -y firebase-tools@latest functions:secrets:set RECAPTCHA_SECRET --project diabolic-media
```

## Deploy

Hosting serves `dist/`. The rewrite in `firebase.json` sends `/api/submit` and `/api/submit/` to the function in `us-central1`.

```bash
npm run build
npx -y firebase-tools@latest deploy --project diabolic-media --only functions,hosting
```

The function build runs before deploy (`tsc` in `functions/`).

## Local testing

```bash
cd functions && npm install && npm run build && cd ..
npx -y firebase-tools@latest emulators:start --only functions,hosting
```

The hosting emulator serves `dist/` and applies the rewrite, so the form posts to the same origin.

## Template placeholders

**Notification** (`notification-contact.html`):

| Placeholder           | Content                               |
| --------------------- | ------------------------------------- |
| `{{subject_line}}`    | Email subject                         |
| `{{name}}`            | Submitter name                        |
| `{{email}}`           | Submitter email (escaped)             |
| `{{email_raw}}`       | Submitter email (for `mailto:` links) |
| `{{phone}}`           | Phone or em dash                      |
| `{{services}}`        | Platform focus, or em dash            |
| `{{hear_about_us}}`   | Referral source or em dash            |
| `{{message}}`         | Message body. Company is prepended.   |
| `{{form_source}}`     | Human-readable form label             |
| `{{submitted_at}}`    | Timestamp                             |
| `{{sender_ip}}`       | Submitter IP address                  |
| `{{site_name}}`       | From name                             |
| `{{site_url}}`        | Site URL                              |
| `{{site_phone}}`      | Phone display string                  |
| `{{site_phone_href}}` | Phone tel: href                       |

**Autoreply** (`autoreply.html`): `{{name}}`, `{{site_name}}`, `{{site_phone}}`, `{{site_phone_href}}`.

Use inline CSS. Email clients strip `<style>` blocks inconsistently.

## Security

- SMTP password and the reCAPTCHA secret stay in Secret Manager.
- Honeypot field `_gotcha`. A filled honeypot gets a fake success response.
- reCAPTCHA v3 is verified only when `RECAPTCHA_SECRET` is set.
- Five submissions per IP per minute, per function instance.
- Template filenames are fixed in code. Nothing from the request chooses a path.

## Troubleshooting

| Symptom                           | Likely cause                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------- |
| "Form is temporarily unavailable" | `SMTP_HOST`, `SMTP_USER`, `FROM_EMAIL`, `NOTIFY_TO`, or `SMTP_PASS` is blank |
| "Verification failed"             | reCAPTCHA secret mismatch, or the domain is not allowed                      |
| Notification never arrives        | SMTP auth failed, or `FROM_EMAIL` is not allowed by the provider             |
| Lands in spam                     | Send from the domain mailbox and set SPF/DKIM                                |
| 404 on submit                     | Hosting rewrite missing, or the function was not deployed                    |

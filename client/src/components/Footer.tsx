/* ============================================================
   DIABOLIC MEDIA — FOOTER
   Nocturnal Salon: brighter text, Font Awesome icons
   ============================================================ */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { label: "Instagram", icon: "fa-brands fa-instagram", href: "#" },
    { label: "TikTok", icon: "fa-brands fa-tiktok", href: "#" },
    { label: "Pinterest", icon: "fa-brands fa-pinterest", href: "#" },
    { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", href: "#" },
  ];

  const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="relative pt-20 pb-10 overflow-hidden"
      style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(196,191,160,0.1)" }}
    >
      <div className="container">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16" style={{ borderBottom: "1px solid rgba(196,191,160,0.1)" }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/manus-storage/logo-icon_050a7131.png"
                alt="Diabolic Media"
                className="w-8 h-8 object-contain opacity-80"
              />
              <div>
                <span
                  className="block font-display text-xl font-light tracking-[0.15em]"
                  style={{ color: "#c4bfa0", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  DIABOLIC
                </span>
                <span
                  className="block text-[0.5rem] tracking-[0.4em] uppercase"
                  style={{ color: "#c0524a", marginTop: "-2px", fontFamily: "'Courier Prime', monospace" }}
                >
                  Media
                </span>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1.05rem",
                color: "#b8b395",
                lineHeight: 1.75,
                maxWidth: "260px",
              }}
            >
              Dark, deliberate social media management for brands that refuse to blend in.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="font-mono-gothic text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: "'Courier Prime', monospace", color: "#c0524a", fontSize: "0.65rem" }}
            >
              Navigation
            </div>
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link"
                  style={{ fontSize: "1rem" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div
              className="font-mono-gothic text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: "'Courier Prime', monospace", color: "#c0524a", fontSize: "0.65rem" }}
            >
              Contact
            </div>
            <div className="space-y-4">
              <a
                href="mailto:aaronceasterday@gmail.com"
                className="flex items-center gap-3"
                style={{ textDecoration: "none" }}
              >
                <i className="fa-solid fa-envelope" style={{ color: "#c0524a", fontSize: "0.85rem", width: "18px" }}></i>
                <span
                  style={{ fontFamily: "'EB Garamond', serif", color: "#c4bfa0", fontSize: "1.05rem", transition: "color 300ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ddd8bc")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#c4bfa0")}
                >
                  aaronceasterday@gmail.com
                </span>
              </a>
              <a
                href="tel:2406252480"
                className="flex items-center gap-3"
                style={{ textDecoration: "none" }}
              >
                <i className="fa-solid fa-phone" style={{ color: "#c0524a", fontSize: "0.85rem", width: "18px" }}></i>
                <span style={{ fontFamily: "'EB Garamond', serif", color: "#c4bfa0", fontSize: "1.05rem" }}>
                  (240) 625 2480
                </span>
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{ color: "#b8b395", transition: "color 300ms", fontSize: "1.15rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c0524a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#b8b395")}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <span
            className="font-mono-gothic text-xs tracking-widest"
            style={{ fontFamily: "'Courier Prime', monospace", color: "#b8b395", opacity: 0.5, fontSize: "0.65rem" }}
          >
            © {currentYear} Diabolic Media. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <div style={{ width: "30px", height: "1px", background: "#c0524a", opacity: 0.5 }} />
            <i className="fa-solid fa-moon" style={{ color: "#c0524a", opacity: 0.5, fontSize: "0.75rem" }}></i>
            <div style={{ width: "30px", height: "1px", background: "#c0524a", opacity: 0.5 }} />
          </div>
          <span
            className="font-mono-gothic text-xs tracking-widest"
            style={{ fontFamily: "'Courier Prime', monospace", color: "#b8b395", opacity: 0.5, fontSize: "0.65rem" }}
          >
            Dark. Deliberate. Diabolic.
          </span>
        </div>
      </div>
    </footer>
  );
}

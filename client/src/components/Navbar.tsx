/* ============================================================
   DIABOLIC MEDIA — NAVBAR
   Nocturnal Salon: fixed, transparent → opaque on scroll
   Font Awesome icons, brighter text for legibility
   ============================================================ */
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(18, 18, 18, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196, 191, 160, 0.1)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between py-5">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <img
            src="/manus-storage/diabolic-logo-cropped_36126093.png"
            alt="Diabolic Media"
            className="w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            style={{ height: '44px', maxWidth: '260px' }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contact" className="hidden md:inline-flex btn-diabolic" style={{ padding: "0.65rem 1.75rem", fontSize: "0.78rem" }}>
          <i className="fa-solid fa-circle-arrow-right" style={{ fontSize: "0.85rem" }}></i>
          <span>Enter the Circle</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i
            className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-lg`}
            style={{ color: "#c4bfa0", transition: "all 300ms" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: menuOpen ? "320px" : "0",
          backgroundColor: "rgba(18, 18, 18, 0.99)",
          borderTop: menuOpen ? "1px solid rgba(196, 191, 160, 0.1)" : "none",
        }}
      >
        <nav className="container py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-diabolic mt-2 self-start"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-circle-arrow-right"></i>
            <span>Enter the Circle</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

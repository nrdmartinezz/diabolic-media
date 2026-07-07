/* ============================================================
   DIABOLIC MEDIA — HERO SECTION
   Nocturnal Salon: asymmetric, brighter text, prominent CTAs
   Font Awesome icons replacing emoji
   ============================================================ */
import { useEffect, useRef } from "react";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => headingRef.current?.classList.add("visible"), 200);
    const timer2 = setTimeout(() => subRef.current?.classList.add("visible"), 500);
    const timer3 = setTimeout(() => ctaRef.current?.classList.add("visible"), 750);
    return () => { clearTimeout(timer); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden grain-overlay"
      style={{
        backgroundImage: "url('/manus-storage/hero-bg_c2c1c214.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, rgba(18,18,18,0.97) 0%, rgba(18,18,18,0.88) 45%, rgba(18,18,18,0.45) 75%, rgba(18,18,18,0.2) 100%)",
          zIndex: 0,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, #181818, transparent)", zIndex: 0 }}
      />

      {/* Content */}
      <div className="container relative z-10 pb-24 pt-40">
        <div className="max-w-4xl">

          {/* Label */}
          <div className="section-label mb-8 flex items-center gap-3">
            <i className="fa-solid fa-star-of-david" style={{ fontSize: "0.65rem", color: "#c0524a" }}></i>
            <span>Social Media Management</span>
            <i className="fa-solid fa-star-of-david" style={{ fontSize: "0.65rem", color: "#c0524a" }}></i>
          </div>

          {/* Main heading */}
          <h1
            ref={headingRef}
            className="reveal font-display leading-none mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
              fontWeight: 300,
              color: "#ddd8bc",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
            }}
          >
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "#c4bfa0", opacity: 0.85 }}>
              Thy audience awaits.
            </em>
            <br />
            <span style={{ fontWeight: 700, color: "#ddd8bc", position: "relative", display: "inline-block" }}>
              We summon them.
              <span style={{ position: "absolute", bottom: "0.1em", left: 0, right: 0, height: "2px", background: "#c0524a", opacity: 0.9 }} />
            </span>
          </h1>

          {/* Ornamental rule */}
          <div className="flex items-center gap-4 my-8" style={{ maxWidth: "480px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #c0524a, rgba(196,191,160,0.3))" }} />
            <i className="fa-solid fa-moon" style={{ color: "#c0524a", fontSize: "0.9rem" }}></i>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, #c0524a, rgba(196,191,160,0.3))" }} />
          </div>

          {/* Subtext */}
          <div ref={subRef} className="reveal" style={{ transitionDelay: "0.1s" }}>
            <p
              className="font-body leading-relaxed mb-10"
              style={{
                fontFamily: "'EB Garamond', serif",
                color: "#c4bfa0",
                maxWidth: "520px",
                fontSize: "1.45rem",
                lineHeight: 1.7,
              }}
            >
              Your brand deserves to be feared.
              <br /><br />
              <span style={{ fontSize: '1.05rem', opacity: 0.75 }}>Strategy, content, and community — executed with occult precision.</span>
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="reveal flex flex-wrap items-center gap-5" style={{ transitionDelay: "0.2s" }}>
            <a href="#contact" className="btn-diabolic">
              <i className="fa-solid fa-circle-arrow-right"></i>
              <span>Enter the Circle</span>
            </a>
            <a href="#services" className="btn-sage">
              <i className="fa-solid fa-list-ul"></i>
              Our Services
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2"
        style={{ color: "#c4bfa0", opacity: 0.5 }}
      >
        <span
          className="font-mono-gothic text-xs tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl", fontFamily: "'Courier Prime', monospace" }}
        >
          Scroll
        </span>
        <div style={{ width: "1px", height: "64px", background: "linear-gradient(to bottom, #c4bfa0, transparent)" }} />
      </div>
    </section>
  );
}

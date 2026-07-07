/* ============================================================
   DIABOLIC MEDIA — ABOUT SECTION
   Nocturnal Salon: brighter text, Font Awesome icons
   ============================================================ */
import { useEffect, useRef } from "react";

const stats = [
  { value: "150+", label: "Brands Unleashed" },
  { value: "4.2M", label: "Followers Grown" },
  { value: "8yrs", label: "In the Dark Arts" },
  { value: "98%", label: "Client Retention" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-0 overflow-hidden"
      style={{ backgroundColor: "#181818" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Parchment texture panel */}
        <div
          className="relative flex flex-col justify-center p-12 lg:p-20 grain-overlay"
          style={{
            backgroundImage: "url('/manus-storage/about-texture_d914f892.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "600px",
          }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(45, 35, 18, 0.65)", zIndex: 0 }} />

          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-3">
              <i className="fa-solid fa-shield-halved" style={{ fontSize: "0.65rem", color: "#c0524a" }}></i>
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#ddd8bc" }}>About the Agency</span>
            </div>

            <h2
              className="reveal font-display mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 4.5rem)", fontWeight: 300, color: "#ddd8bc", lineHeight: 1, letterSpacing: "-0.01em" }}
            >
              We Don't<br />
              <em style={{ fontStyle: "italic", color: "#c4bfa0" }}>Follow</em><br />
              <strong style={{ fontWeight: 700 }}>Trends.</strong>
            </h2>

            <div className="flex items-center gap-3 my-6" style={{ maxWidth: "300px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(196,191,160,0.4)" }} />
              <i className="fa-solid fa-cross" style={{ color: "#c0524a", fontSize: "0.75rem" }}></i>
              <div style={{ flex: 1, height: "1px", background: "rgba(196,191,160,0.4)" }} />
            </div>

            <p
              className="reveal font-body leading-relaxed mb-5"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.2rem", color: "#c4bfa0", lineHeight: 1.8, transitionDelay: "0.1s" }}
            >
              Diabolic Media was founded on a single conviction: that the most
              powerful brands in the world don't chase the algorithm — they
              command it.
            </p>
            <p
              className="reveal font-body leading-relaxed"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", color: "#b8b395", lineHeight: 1.8, transitionDelay: "0.15s" }}
            >
              We work with a select roster of brands who understand that
              attention is the new currency — and that earning it requires
              something darker than a content calendar.
            </p>

            <div className="reveal mt-10 flex items-center gap-4" style={{ transitionDelay: "0.2s" }}>
              <div style={{ width: "40px", height: "1px", background: "#c0524a" }} />
              <span
                className="font-mono-gothic text-xs tracking-widest uppercase"
              style={{ color: "#ddd8bc", fontFamily: "'Courier Prime', monospace" }}
            >
              Aaron Easterday — Founder
              </span>
            </div>
          </div>
        </div>

        {/* Right: Dark panel with stats */}
        <div className="flex flex-col justify-center p-12 lg:p-20" style={{ backgroundColor: "#181818" }}>
          <div className="grid grid-cols-2 gap-px mb-16" style={{ border: "1px solid rgba(196,191,160,0.1)" }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="reveal p-8 lg:p-10"
                style={{
                  backgroundColor: i % 2 === 0 ? "rgba(65,52,32,0.6)" : "rgba(74,61,40,0.6)",
                  transitionDelay: `${i * 0.08}s`,
                  borderRight: i % 2 === 0 ? "1px solid rgba(196,191,160,0.08)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(196,191,160,0.08)" : "none",
                }}
              >
                <div
                  className="font-display mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 700, color: "#ddd8bc", lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-mono-gothic text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Courier Prime', monospace", color: "#c4bfa0", fontSize: "0.68rem" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div
            className="reveal"
            style={{ borderLeft: "2px solid #c0524a", paddingLeft: "1.5rem", transitionDelay: "0.3s" }}
          >
            <blockquote
              className="font-display"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontStyle: "italic", fontWeight: 300, color: "#c4bfa0", lineHeight: 1.6 }}
            >
              "We don't make content. We make{" "}
              <em style={{ fontWeight: 600, color: "#ddd8bc" }}>mythology.</em>"
            </blockquote>
            <div
              className="font-mono-gothic text-xs tracking-widest uppercase mt-4"
              style={{ fontFamily: "'Courier Prime', monospace", color: "#c4bfa0", opacity: 0.85, fontSize: "0.65rem" }}
            >
              — Diabolic Media Manifesto
            </div>
          </div>

          {/* CTA */}
          <div className="reveal mt-10" style={{ transitionDelay: "0.35s" }}>
            <a href="#contact" className="btn-diabolic">
              <i className="fa-solid fa-handshake"></i>
              <span>Work With Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

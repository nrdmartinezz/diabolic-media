/* ============================================================
   DIABOLIC MEDIA — PROCESS SECTION
   Nocturnal Salon: brighter text, Font Awesome icons
   ============================================================ */
import { useEffect, useRef } from "react";

const steps = [
  {
    phase: "Phase I",
    title: "The Séance",
    description: "A deep discovery session. We learn your brand's soul, your audience's fears, and your competitors' weaknesses.",
    icon: "fa-solid fa-ear-listen",
  },
  {
    phase: "Phase II",
    title: "The Grimoire",
    description: "We craft your strategy document — the sacred text that governs every post, campaign, and community interaction.",
    icon: "fa-solid fa-book-skull",
  },
  {
    phase: "Phase III",
    title: "The Ritual",
    description: "Content creation and scheduling begins. Every piece is reviewed, refined, and released with intention.",
    icon: "fa-solid fa-fire-flame-curved",
  },
  {
    phase: "Phase IV",
    title: "The Ascension",
    description: "Monthly reporting, optimization, and evolution. We track your growth and adapt the strategy as your brand ascends.",
    icon: "fa-solid fa-arrow-trend-up",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
      ref={sectionRef}
      className="relative py-32 overflow-hidden grain-overlay"
      style={{
        backgroundColor: "#4a3d28",
        backgroundImage: "url('/manus-storage/cta-bg_30d497b8.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to bottom, #181818, transparent)", zIndex: 1 }} />
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, #181818, transparent)", zIndex: 1 }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="section-label mb-4 flex items-center justify-center gap-3">
            <i className="fa-solid fa-star-of-david" style={{ fontSize: "0.65rem" }}></i>
            <span>How We Work</span>
            <i className="fa-solid fa-star-of-david" style={{ fontSize: "0.65rem" }}></i>
          </div>
          <h2
            className="reveal font-display"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#ddd8bc", lineHeight: 1 }}
          >
            The{" "}
            <em style={{ fontStyle: "italic", color: "#c4bfa0" }}>Sacred</em>{" "}
            <strong style={{ fontWeight: 700 }}>Process</strong>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: "1px solid rgba(196,191,160,0.1)" }}>
          {steps.map((step, i) => (
            <div
              key={step.phase}
              className="reveal p-8 lg:p-10 relative"
              style={{
                backgroundColor: "rgba(74, 61, 40, 0.75)",
                transitionDelay: `${i * 0.1}s`,
                borderRight: i < steps.length - 1 ? "1px solid rgba(196,191,160,0.08)" : "none",
              }}
            >
              {/* Icon */}
              <div className="mb-6">
                <i className={step.icon} style={{ fontSize: "1.75rem", color: "#c0524a", opacity: 0.85 }}></i>
              </div>

              {/* Phase label */}
              <div
                className="font-mono-gothic text-xs tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Courier Prime', monospace", color: "#c0524a", fontSize: "0.65rem" }}
              >
                {step.phase}
              </div>

              {/* Title */}
              <h3
                className="font-display mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.65rem", fontWeight: 600, color: "#ddd8bc", lineHeight: 1.1 }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: "#c4bfa0", lineHeight: 1.75 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-14 flex justify-center" style={{ transitionDelay: "0.5s" }}>
          <a href="#contact" className="btn-diabolic">
            <i className="fa-solid fa-circle-arrow-right"></i>
            <span>Begin the Process</span>
          </a>
        </div>
      </div>
    </section>
  );
}

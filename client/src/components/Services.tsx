/* ============================================================
   DIABOLIC MEDIA — SERVICES SECTION
   Nocturnal Salon: brighter text, Font Awesome icons
   ============================================================ */
import { useEffect, useRef } from "react";

const services = [
  {
    number: "I",
    title: "Social Strategy",
    subtitle: "The Grand Design",
    description: "We architect your entire social presence from the ground up — platform selection, content pillars, audience targeting, and competitive positioning. Every post serves a purpose.",
    icon: "fa-solid fa-chess-knight",
  },
  {
    number: "II",
    title: "Content Creation",
    subtitle: "Crafted in Darkness",
    description: "Photography direction, graphic design, copywriting, and video production. We create content that stops the scroll and commands attention — no templates, no compromises.",
    icon: "fa-solid fa-pen-nib",
  },
  {
    number: "III",
    title: "Community Management",
    subtitle: "The Inner Circle",
    description: "Daily engagement, comment moderation, DM management, and community cultivation. We tend your audience like a sacred ritual — with consistency and intention.",
    icon: "fa-solid fa-users",
  },
  {
    number: "IV",
    title: "Paid Social",
    subtitle: "Targeted Dominion",
    description: "Meta, TikTok, and Pinterest ad campaigns engineered for conversion. We spend your budget with surgical precision and report with full transparency.",
    icon: "fa-solid fa-bullseye",
  },
  {
    number: "V",
    title: "Analytics & Reporting",
    subtitle: "The Oracle's Report",
    description: "Monthly deep-dive reports that translate data into decisions. We track what matters, ignore vanity metrics, and continuously optimize your presence.",
    icon: "fa-solid fa-chart-line",
  },
  {
    number: "VI",
    title: "Brand Identity",
    subtitle: "The Mark of Diabolic",
    description: "Visual identity systems, tone-of-voice guides, and brand positioning for new ventures or rebrands. We give your brand a soul — and a spine.",
    icon: "fa-solid fa-wand-magic-sparkles",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
      id="services"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        backgroundColor: "#3d3220",
        backgroundImage: "url('/manus-storage/services-bg_6f2417d9.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        // Canvas parchment tone from moodboard
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to bottom, #181818, transparent)", zIndex: 1 }} />
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, #181818, transparent)", zIndex: 1 }} />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <div className="section-label mb-4 flex items-center gap-3">
            <i className="fa-solid fa-star-of-david" style={{ fontSize: "0.65rem" }}></i>
            <span>What We Do</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2
              className="reveal font-display"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#ddd8bc", lineHeight: 1, letterSpacing: "-0.01em" }}
            >
              Our<br />
              <em style={{ fontStyle: "italic", color: "#c4bfa0" }}>Dark</em>{" "}
              <strong style={{ fontWeight: 700 }}>Arts</strong>
            </h2>
            <p
              className="reveal font-body text-base leading-relaxed max-w-xs"
              style={{ fontFamily: "'EB Garamond', serif", color: "#c4bfa0", fontSize: "1.1rem", lineHeight: 1.7, transitionDelay: "0.1s" }}
            >
              Six disciplines. One singular purpose: to make your brand impossible to ignore.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-10" style={{ opacity: 0.35 }}>
            <div style={{ flex: 1, height: "1px", background: "#c4bfa0" }} />
            <i className="fa-solid fa-cross" style={{ color: "#c0524a", fontSize: "0.9rem" }}></i>
            <div style={{ flex: 1, height: "1px", background: "#c4bfa0" }} />
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: "1px solid rgba(196,191,160,0.1)" }}>
          {services.map((service, i) => (
            <div
              key={service.number}
              className="reveal service-card p-8 lg:p-10"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Number + icon row */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-display"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "#c0524a", lineHeight: 1, opacity: 0.75 }}
                >
                  {service.number}
                </span>
                <i
                  className={service.icon}
                  style={{ fontSize: "1.4rem", color: "#c4bfa0", opacity: 0.45, marginTop: "0.5rem" }}
                />
              </div>

              {/* Title */}
              <h3
                className="font-display mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 600, color: "#ddd8bc", lineHeight: 1.1 }}
              >
                {service.title}
              </h3>
              <p
                className="font-mono-gothic mb-4"
                style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c0524a" }}
              >
                {service.subtitle}
              </p>

              {/* Description */}
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.75, color: "#c4bfa0" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA below grid */}
        <div className="reveal mt-14 flex justify-center" style={{ transitionDelay: "0.5s" }}>
          <a href="#contact" className="btn-diabolic">
            <i className="fa-solid fa-circle-arrow-right"></i>
            <span>Start Your Strategy</span>
          </a>
        </div>
      </div>
    </section>
  );
}

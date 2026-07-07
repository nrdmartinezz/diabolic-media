/* ============================================================
   DIABOLIC MEDIA — MANIFESTO BAND
   Nocturnal Salon: brighter text, Font Awesome icons
   ============================================================ */
import { useEffect, useRef } from "react";

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#3d3220" }}
    >
      {/* Ghost background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-display select-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(8rem, 20vw, 20rem)",
            fontWeight: 700,
            color: "rgba(69, 12, 12, 0.07)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          DIABOLIC
        </span>
      </div>

      <div className="container relative z-10 text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div style={{ width: "60px", height: "1px", background: "rgba(196,191,160,0.25)" }} />
          <i className="fa-solid fa-cross" style={{ color: "#c0524a", fontSize: "1.1rem" }}></i>
          <div style={{ width: "60px", height: "1px", background: "rgba(196,191,160,0.25)" }} />
        </div>

        <h2
          className="reveal font-display mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            fontWeight: 300,
            color: "#c4bfa0",
            lineHeight: 1.25,
            maxWidth: "900px",
            letterSpacing: "-0.01em",
          }}
        >
          "The brands that win on social media aren't the ones with the biggest
          budgets.{" "}
          <em style={{ fontStyle: "italic", color: "#e05a50", fontWeight: 400 }}>
            They're the ones with the darkest conviction.
          </em>
          "
        </h2>

        <div
          className="reveal flex items-center justify-center gap-4 mt-10"
          style={{ transitionDelay: "0.15s" }}
        >
          <div style={{ width: "40px", height: "1px", background: "#c0524a" }} />
          <span
            className="font-mono-gothic text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Courier Prime', monospace", color: "#c0524a", fontSize: "0.68rem" }}
          >
            Aaron Easterday — Founder, Diabolic Media
          </span>
          <div style={{ width: "40px", height: "1px", background: "#c0524a" }} />
        </div>
      </div>
    </section>
  );
}

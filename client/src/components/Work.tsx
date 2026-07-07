/* ============================================================
   DIABOLIC MEDIA — WORK / PORTFOLIO SECTION
   Nocturnal Salon: brighter text, Font Awesome icons
   ============================================================ */
import { useEffect, useRef } from "react";

const projects = [
  {
    number: "01",
    client: "Nocturne Spirits",
    industry: "Craft Distillery",
    platform: "Instagram · TikTok",
    result: "+340% engagement in 90 days",
    description: "Repositioned a regional craft gin brand from local curiosity to nationally recognized cult label through editorial content and influencer alchemy.",
    tags: ["Brand Strategy", "Content", "Influencer"],
  },
  {
    number: "02",
    client: "Velvet Thorn Tattoo",
    industry: "Tattoo Studio",
    platform: "Instagram · Pinterest",
    result: "Waitlist extended to 8 months",
    description: "Built a visual identity and content system that transformed a single-artist studio into a destination brand with a 40k following and a fully booked calendar.",
    tags: ["Visual Identity", "Community", "Content"],
  },
  {
    number: "03",
    client: "Grimoire Press",
    industry: "Independent Publishing",
    platform: "TikTok · Instagram",
    result: "3 titles hit bestseller lists",
    description: "Launched a BookTok strategy that drove three consecutive bestseller debuts for an indie publisher specializing in dark fiction and occult non-fiction.",
    tags: ["Launch Strategy", "Paid Social", "Analytics"],
  },
  {
    number: "04",
    client: "Séance Studio",
    industry: "Wellness & Ritual",
    platform: "Instagram · YouTube",
    result: "$280K revenue attributed to social",
    description: "Developed a full-funnel social strategy for a ritual wellness brand, from awareness content to conversion campaigns — with full attribution reporting.",
    tags: ["Full Funnel", "Paid Social", "Strategy"],
  },
];

export default function Work() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32"
      style={{ backgroundColor: "#181818" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="mb-20 flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="section-label mb-4 flex items-center gap-3">
              <i className="fa-solid fa-star-of-david" style={{ fontSize: "0.65rem" }}></i>
              <span>Selected Work</span>
            </div>
            <h2
              className="reveal font-display"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, color: "#ddd8bc", lineHeight: 1 }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", color: "#c4bfa0" }}>Chosen</em>
              <br />
              <strong style={{ fontWeight: 700 }}>Few</strong>
            </h2>
          </div>
          <p
            className="reveal font-body max-w-xs"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", color: "#b8b395", lineHeight: 1.75, transitionDelay: "0.1s" }}
          >
            We are selective about who we work with. These are some of the brands we've helped ascend.
          </p>
        </div>

        {/* Project list */}
        <div>
          {projects.map((project, i) => (
            <div
              key={project.number}
              className="reveal group"
              style={{ transitionDelay: `${i * 0.1}s`, borderTop: "1px solid rgba(196,191,160,0.12)" }}
            >
              <div
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                style={{ padding: "2.5rem 1.5rem", margin: "0 -1.5rem", borderRadius: "2px", transition: "background 400ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(65,52,32,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Number */}
                <div className="lg:col-span-1 flex items-start pt-1">
                  <span
                    className="font-display"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#c0524a", fontWeight: 300, letterSpacing: "0.1em" }}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Client + industry */}
                <div className="lg:col-span-3">
                  <h3
                    className="font-display mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 600, color: "#ddd8bc" }}
                  >
                    {project.client}
                  </h3>
                  <p
                    className="font-mono-gothic text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Courier Prime', monospace", color: "#c0524a", fontSize: "0.65rem" }}
                  >
                    {project.industry}
                  </p>
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", color: "#b8b395", lineHeight: 1.75 }}>
                    {project.description}
                  </p>
                </div>

                {/* Result + tags */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                  <div style={{ borderLeft: "2px solid #c0524a", paddingLeft: "1rem" }}>
                    <div
                      className="font-mono-gothic text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: "'Courier Prime', monospace", color: "#c0524a", fontSize: "0.62rem" }}
                    >
                      Result
                    </div>
                    <div
                      className="font-display"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: "#ddd8bc" }}
                    >
                      {project.result}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-gothic text-xs tracking-wider uppercase px-3 py-1"
                        style={{ fontFamily: "'Courier Prime', monospace", color: "#c4bfa0", border: "1px solid rgba(196,191,160,0.25)", fontSize: "0.65rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(196,191,160,0.12)" }} />
        </div>

        {/* CTA */}
        <div className="reveal mt-14 flex justify-center" style={{ transitionDelay: "0.4s" }}>
          <a href="#contact" className="btn-diabolic">
            <i className="fa-solid fa-circle-arrow-right"></i>
            <span>Become a Case Study</span>
          </a>
        </div>
      </div>
    </section>
  );
}

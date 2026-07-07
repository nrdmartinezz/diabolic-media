/* ============================================================
   DIABOLIC MEDIA — CONTACT SECTION
   Nocturnal Salon: brighter text, Font Awesome icons, prominent CTA
   ============================================================ */
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", brand: "", message: "", platform: "" });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "rgba(65, 52, 32, 0.65)",
    border: "1px solid rgba(196, 191, 160, 0.25)",
    color: "#ddd8bc",
    fontFamily: "'EB Garamond', serif",
    fontSize: "1.1rem",
    padding: "0.9rem 1rem",
    outline: "none",
    transition: "border-color 300ms",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Courier Prime', monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "#c0524a",
    marginBottom: "0.5rem",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "#181818" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #c0524a 30%, #c0524a 70%, transparent)" }} />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left: Manifesto text */}
          <div className="flex flex-col justify-center">
            <div className="section-label mb-8 flex items-center gap-3">
              <i className="fa-solid fa-moon" style={{ fontSize: "0.65rem", color: "#c0524a" }}></i>
              <span>Enter the Circle</span>
            </div>

            <h2
              className="reveal font-display mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 4.5rem)", fontWeight: 300, color: "#ddd8bc", lineHeight: 1 }}
            >
              Ready to<br />
              <em style={{ fontStyle: "italic", color: "#c4bfa0" }}>Summon</em><br />
              <strong style={{ fontWeight: 700 }}>Your Audience?</strong>
            </h2>

            <div className="flex items-center gap-3 mb-8" style={{ maxWidth: "280px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(196,191,160,0.3)" }} />
              <i className="fa-solid fa-cross" style={{ color: "#c0524a", fontSize: "0.75rem" }}></i>
              <div style={{ flex: 1, height: "1px", background: "rgba(196,191,160,0.3)" }} />
            </div>

            <p
              className="reveal font-body leading-relaxed mb-8"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.2rem", color: "#c4bfa0", lineHeight: 1.8, transitionDelay: "0.1s" }}
            >
              We take on a limited number of new clients each quarter.
              <br /><br />
              <em style={{ fontStyle: 'italic', color: '#ddd8bc', fontSize: '1.3rem' }}>The algorithm is yours. If thou darest.</em>
            </p>

            {/* Contact details */}
            <div className="reveal space-y-5" style={{ transitionDelay: "0.15s" }}>
              {[
                { label: "Email", value: "aaronceasterday@gmail.com", href: "mailto:aaronceasterday@gmail.com", icon: "fa-solid fa-envelope" },
                { label: "Phone", value: "(240) 625 2480", href: "tel:2406252480", icon: "fa-solid fa-phone" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <i className={item.icon} style={{ color: "#c0524a", fontSize: "0.9rem", width: "20px", textAlign: "center" }}></i>
                  <div>
                    <div
                      className="font-mono-gothic text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'Courier Prime', monospace", color: "#c0524a", fontSize: "0.6rem" }}
                    >
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      style={{ fontFamily: "'EB Garamond', serif", color: "#c4bfa0", fontSize: "1.1rem", textDecoration: "none", transition: "color 300ms" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ddd8bc")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#c4bfa0")}
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            {submitted ? (
              <div
                className="flex flex-col items-start justify-center h-full min-h-80 p-10"
                style={{ border: "1px solid rgba(196,191,160,0.18)", backgroundColor: "rgba(65,52,32,0.55)" }}
              >
                <i className="fa-solid fa-moon text-5xl mb-6" style={{ color: "#c0524a" }}></i>
                <h3
                  className="font-display mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#ddd8bc" }}
                >
                  The Circle is Open.
                </h3>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", color: "#c4bfa0", lineHeight: 1.75 }}>
                  We've received your message. Expect to hear from us within 48
                  hours — or sooner, if the stars align.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                style={{ padding: "2.5rem", border: "1px solid rgba(196,191,160,0.18)", backgroundColor: "rgba(65,52,32,0.4)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(192,82,74,0.7)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(196,191,160,0.25)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(192,82,74,0.7)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(196,191,160,0.25)")}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Brand / Company</label>
                  <input
                    type="text"
                    placeholder="Your brand name"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(192,82,74,0.7)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(196,191,160,0.25)")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Platform Focus</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    style={{ ...inputStyle, appearance: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(192,82,74,0.7)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(196,191,160,0.25)")}
                  >
                    <option value="" style={{ backgroundColor: "#3d3220" }}>Select platforms...</option>
                    <option value="instagram" style={{ backgroundColor: "#3d3220" }}>Instagram</option>
                    <option value="tiktok" style={{ backgroundColor: "#3d3220" }}>TikTok</option>
                    <option value="pinterest" style={{ backgroundColor: "#3d3220" }}>Pinterest</option>
                    <option value="youtube" style={{ backgroundColor: "#3d3220" }}>YouTube</option>
                    <option value="all" style={{ backgroundColor: "#3d3220" }}>All Platforms</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Tell Us About Your Brand</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="What makes your brand worth fearing? What do you want to achieve?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(192,82,74,0.7)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(196,191,160,0.25)")}
                  />
                </div>

                <button type="submit" className="btn-diabolic w-full justify-center" style={{ fontSize: "0.9rem" }}>
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Summon the Agency</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

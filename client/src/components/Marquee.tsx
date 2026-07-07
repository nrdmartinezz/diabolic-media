/* ============================================================
   DIABOLIC MEDIA — MARQUEE TICKER
   Nocturnal Salon: blood-red scrolling band, Font Awesome icons
   ============================================================ */

const items = [
  { type: "text", content: "Social Strategy" },
  { type: "icon", content: "fa-solid fa-star-of-david" },
  { type: "text", content: "Content Creation" },
  { type: "icon", content: "fa-solid fa-moon" },
  { type: "text", content: "Community Management" },
  { type: "icon", content: "fa-solid fa-cross" },
  { type: "text", content: "Paid Social" },
  { type: "icon", content: "fa-solid fa-bullseye" },
  { type: "text", content: "Brand Identity" },
  { type: "icon", content: "fa-solid fa-wand-magic-sparkles" },
  { type: "text", content: "Analytics" },
  { type: "icon", content: "fa-solid fa-chart-line" },
  // Duplicate for seamless loop
  { type: "text", content: "Social Strategy" },
  { type: "icon", content: "fa-solid fa-star-of-david" },
  { type: "text", content: "Content Creation" },
  { type: "icon", content: "fa-solid fa-moon" },
  { type: "text", content: "Community Management" },
  { type: "icon", content: "fa-solid fa-cross" },
  { type: "text", content: "Paid Social" },
  { type: "icon", content: "fa-solid fa-bullseye" },
  { type: "text", content: "Brand Identity" },
  { type: "icon", content: "fa-solid fa-wand-magic-sparkles" },
  { type: "text", content: "Analytics" },
  { type: "icon", content: "fa-solid fa-chart-line" },
];

export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        backgroundColor: "#450c0c",
        borderTop: "1px solid rgba(196,191,160,0.12)",
        borderBottom: "1px solid rgba(196,191,160,0.12)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "2rem",
          whiteSpace: "nowrap",
          animation: "marquee 30s linear infinite",
        }}
      >
        {items.map((item, i) =>
          item.type === "text" ? (
            <span
              key={i}
              style={{
                fontFamily: "'Cormorant SC', Georgia, serif",
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#e8e2cc",
              }}
            >
              {item.content}
            </span>
          ) : (
            <i
              key={i}
              className={item.content}
              style={{ color: "#e8e2cc", opacity: 0.5, fontSize: "0.7rem" }}
            />
          )
        )}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

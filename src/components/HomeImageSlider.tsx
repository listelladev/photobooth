"use client";

import { useState, useRef } from "react";

const slides = [
  { src: "/full-image-home.jpg", alt: "Photo booth experience" },
  { src: "/salsa-photobooth.jpg", alt: "Salsa photo booth" },
  { src: "/360.jpeg", alt: "360 video booth" },
  { src: "/mirror.jpeg", alt: "Mirror photo booth" },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    alt: "Wedding celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    alt: "Party event",
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    alt: "Corporate event",
  },
  {
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
    alt: "Event celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop",
    alt: "Birthday party",
  },
  {
    src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1200&auto=format&fit=crop",
    alt: "Festival event",
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
    alt: "Event backdrop",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    alt: "Special occasion",
  },
];

const VISIBLE = 3;
const GAP = 12; // px, matches the gap between images

export default function HomeImageSlider() {
  const [start, setStart] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const n = slides.length;

  // Build an extended array: [last] + all slides + [first] so we can
  // infinitely loop by always having neighbours on both sides.
  // For simplicity, we duplicate the full array once on each side.
  const extended = [...slides, ...slides, ...slides];
  // The "real" slides start at index n in the extended array.
  const offset = n; // where the real slides begin in extended

  const trackRef = useRef<HTMLDivElement>(null);

  const slide = (dir: "prev" | "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStart((s) => {
      const next = dir === "next" ? (s + 1) % n : (s - 1 + n) % n;
      return next;
    });
    setTimeout(() => setIsAnimating(false), 480);
  };

  const jumpTo = (idx: number) => {
    if (isAnimating || idx === start) return;
    setIsAnimating(true);
    setStart(idx);
    setTimeout(() => setIsAnimating(false), 480);
  };

  // translateX: each image takes 1/VISIBLE of the container width + gap
  // We use calc so it works without JS measurements.
  // The track has all images side by side. We shift by `start` image widths.
  const translateX = `calc((100% / ${VISIBLE} + ${GAP}px) * -${start})`;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(24px, 5vw, 80px) clamp(24px, 5vw, 80px) 0" }}>

      {/* ── Desktop: sliding track ── */}
      <div
        className="hidden md:block"
        style={{ borderRadius: "clamp(8px, 1vw, 16px)", overflow: "hidden" }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: GAP,
            transform: `translateX(${translateX})`,
            transition: isAnimating
              ? "transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                // Each panel is exactly 1/VISIBLE of the outer container minus gaps
                width: `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
                borderRadius: "clamp(6px, 0.8vw, 12px)",
                overflow: "hidden",
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  width: "100%",
                  height: "clamp(220px, 28vw, 480px)",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: single image with slide ── */}
      <div
        className="md:hidden"
        style={{ borderRadius: "clamp(12px, 1.5vw, 20px)", overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(calc(-100% * ${start}))`,
            transition: isAnimating
              ? "transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {slides.map((s, i) => (
            <div key={i} style={{ flexShrink: 0, width: "100%" }}>
              <img
                src={s.src}
                alt={s.alt}
                style={{
                  width: "100%",
                  height: "clamp(240px, 60vw, 380px)",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-center" style={{ gap: 16, marginTop: 24 }}>
        <button
          onClick={() => slide("prev")}
          aria-label="Previous images"
          className="cursor-pointer transition-all duration-300 hover:scale-110"
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "#1a1a2e", border: "2.5px solid #1a1a2e",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transform: "rotate(-4deg)",
            boxShadow: "3px 3px 0 #FF6B35", padding: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex items-center" style={{ gap: 6 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              aria-label={`Go to image ${i + 1}`}
              style={{
                width: i === start ? 20 : 7,
                height: 7,
                borderRadius: 99,
                background: i === start ? "#1a1a2e" : "#d1d5db",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => slide("next")}
          aria-label="Next images"
          className="cursor-pointer transition-all duration-300 hover:scale-110"
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "#FF6B35", border: "2.5px solid #FF6B35",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transform: "rotate(3deg)",
            boxShadow: "3px 3px 0 #1a1a2e", padding: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

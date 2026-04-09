"use client";

import { useState, useRef } from "react";

const slides = [
  { src: "/pool/Create_an_image_using_the_atta (1).jpg", alt: "Photo booth experience" },
  { src: "/pool/Create_an_image_using_the_atta (2).jpg", alt: "Event photo booth" },
  { src: "/pool/Create_an_image_using_the_atta (5).jpg", alt: "Photo booth fun" },
  { src: "/pool/Create_an_image_using_the_atta (7).jpg", alt: "Celebration photo booth" },
  { src: "/pool/Create_an_image_using_the_atta (8).jpg", alt: "Party photo booth" },
  { src: "/pool/Create_an_image_using_the_atta (9).jpg", alt: "Wedding photo booth" },
  { src: "/pool/Create_an_image_using_the_atta (13).jpg", alt: "Corporate photo booth" },
  { src: "/pool/birthday-featured.jpg", alt: "Birthday photo booth" },
  { src: "/pool/Create_an_image_using_the_atta (14).jpg", alt: "Event memories" },
  { src: "/pool/gender-reveal.jpg", alt: "Gender reveal photo booth" },
  { src: "/pool/Create_an_image_using_the_atta (16).jpg", alt: "Booth experience" },
  { src: "/pool/Create_an_image_using_the_atta (17).jpg", alt: "Photo booth guests" },
  { src: "/pool/Create_an_image_using_the_atta (18).jpg", alt: "Special occasion booth" },
  { src: "/pool/Create_an_image_using_the_atta (19).jpg", alt: "Event booth" },
  { src: "/pool/Create_an_image_using_the_atta (20).jpg", alt: "Photo booth setup" },
  { src: "/pool/Create_an_image_using_the_atta (21).jpg", alt: "Booth at event" },
  { src: "/pool/Create_an_image_using_the_atta.jpg", alt: "Photo booth rental" },
  { src: "/pool/remove_the__a_night_to_remembe.jpg", alt: "A night to remember" },
  { src: "/pool/remove_the_text_on_the_pointer.jpg", alt: "Photo booth action" },
  { src: "/pool/remove_the_word__backdrop__any.jpg", alt: "Photo booth backdrop" },
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

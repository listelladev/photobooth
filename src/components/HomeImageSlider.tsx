"use client";

import { useState, useEffect, useRef } from "react";

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
const GAP = 12;
const n = slides.length;
// Render three copies so we always have slides on both sides for seamless looping
const allSlides = [...slides, ...slides, ...slides];

export default function HomeImageSlider() {
  // Start in the middle copy so both directions have room to scroll
  const [index, setIndex] = useState(n);
  const [transitioning, setTransitioning] = useState(false);

  const slide = (dir: "prev" | "next") => {
    if (transitioning) return;
    setTransitioning(true);
    setIndex((i) => (dir === "next" ? i + 1 : i - 1));
  };

  // After the transition completes, silently jump back to the middle copy
  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      setTransitioning(false);
      setIndex((i) => {
        if (i >= 2 * n) return i - n;
        if (i < n) return i + n;
        return i;
      });
    }, 480);
    return () => clearTimeout(timer);
  }, [transitioning]);

  const translateX = `calc((100% / ${VISIBLE} + ${GAP}px) * -${index})`;

  // Mobile uses a single-image view; same tripled array, starts at n
  const [mIndex, setMIndex] = useState(n);
  const [mTransitioning, setMTransitioning] = useState(false);

  const mSlide = (dir: "prev" | "next") => {
    if (mTransitioning) return;
    setMTransitioning(true);
    setMIndex((i) => (dir === "next" ? i + 1 : i - 1));
  };

  useEffect(() => {
    if (!mTransitioning) return;
    const timer = setTimeout(() => {
      setMTransitioning(false);
      setMIndex((i) => {
        if (i >= 2 * n) return i - n;
        if (i < n) return i + n;
        return i;
      });
    }, 480);
    return () => clearTimeout(timer);
  }, [mTransitioning]);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(24px, 5vw, 80px) clamp(24px, 5vw, 80px) 0" }}>

      {/* ── Desktop: sliding track ── */}
      <div
        className="hidden md:block"
        style={{ borderRadius: "clamp(8px, 1vw, 16px)", overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            gap: GAP,
            transform: `translateX(${translateX})`,
            transition: transitioning
              ? "transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {allSlides.map((s, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
                borderRadius: "clamp(6px, 0.8vw, 12px)",
                overflow: "hidden",
              }}
            >
              <img
                src={s.src}
                alt={s.alt}
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

      {/* ── Mobile: single image ── */}
      <div
        className="md:hidden"
        style={{ borderRadius: "clamp(12px, 1.5vw, 20px)", overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(calc(-100% * ${mIndex}))`,
            transition: mTransitioning
              ? "transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {allSlides.map((s, i) => (
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
          onClick={() => { slide("prev"); mSlide("prev"); }}
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
          onClick={() => { slide("next"); mSlide("next"); }}
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

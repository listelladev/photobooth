"use client";

import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import CircleHighlight from "./CircleHighlight";

export interface ActivityHeroProps {
  /** Plain text prefix before the circle word, e.g. "Calgary" */
  line1: string;
  /** The word wrapped in the hand-drawn circle */
  circleWord: string;
  /** SVG stroke color for the circle */
  circleStroke: string;
  /** SVG path `d` attribute for the circle shape */
  circlePathD: string;
  /** Text that follows the circle word, e.g. " Photo Booth Rental." */
  line2Suffix: string;
  subtext: string;
  ctaText: string;
  ctaColor: string;
  /** Defaults to white. Use dark color for light-colored buttons (e.g. yellow) */
  ctaTextColor?: string;
  bgSrc: string;
  bgAlt: string;
  bgPosition?: string;
  sticker1Src: string;
  sticker1Rotation?: string;
  sticker1Size?: string;
  sticker2Src: string;
  sticker2Rotation?: string;
  sticker2Size?: string;
}

export default function ActivityHero({
  line1,
  circleWord,
  circleStroke,
  circlePathD,
  line2Suffix,
  subtext,
  ctaText,
  ctaColor,
  ctaTextColor = "#fff",
  bgSrc,
  bgAlt,
  bgPosition = "center 40%",
  sticker1Src,
  sticker1Rotation = "0deg",
  sticker1Size = "clamp(64px, 7vw, 108px)",
  sticker2Src,
  sticker2Rotation = "8deg",
  sticker2Size = "clamp(44px, 5vw, 76px)",
}: ActivityHeroProps) {
  const subRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<SVGPathElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [sticker1, setSticker1] = useState(false);
  const [sticker2, setSticker2] = useState(false);

  useEffect(() => {
    // Heading fades in as a single unit — no block spans means no forced line breaks
    setTimeout(() => setHeadingVisible(true), 100);

    setTimeout(() => {
      if (subRef.current) {
        subRef.current.style.transform = "translateY(0)";
        subRef.current.style.opacity = "1";
      }
    }, 540);

    setTimeout(() => {
      const c = circleRef.current;
      if (!c) return;
      const len = c.getTotalLength();
      c.style.strokeDasharray = `${len}`;
      c.style.strokeDashoffset = `${len}`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          c.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
          c.style.strokeDashoffset = "0";
        }),
      );
    }, 700);

    setTimeout(() => setSticker1(true), 500);
    setTimeout(() => setSticker2(true), 950);
  }, []);

  return (
    <section style={{ padding: "clamp(8px, 1vw, 16px)", minHeight: "70vh", display: "flex" }}>
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: "clamp(12px, 1.5vw, 24px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={bgSrc}
            alt={bgAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: bgPosition }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(125deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.65) 100%)" }} />
        </div>

        {/* Sticker 1 — hidden on mobile to avoid overlapping text */}
        <div className="absolute hidden md:block" style={{ top: "12%", right: "7%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
            transform: sticker1 ? `scale(1) rotate(${sticker1Rotation})` : "scale(0) rotate(-18deg)",
            opacity: sticker1 ? 1 : 0,
          }}>
            <img src={sticker1Src} alt="" style={{ width: sticker1Size, height: "auto" }} />
          </div>
        </div>

        {/* Sticker 2 — hidden on mobile to avoid overlapping text */}
        <div className="absolute hidden md:block" style={{ bottom: "20%", right: "5%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
            transform: sticker2 ? `scale(1) rotate(${sticker2Rotation})` : "scale(0) rotate(20deg)",
            opacity: sticker2 ? 1 : 0,
          }}>
            <img src={sticker2Src} alt="" style={{ width: sticker2Size, height: "auto" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px, 9vw, 116px) clamp(28px, 6vw, 100px) clamp(8px, 1vw, 12px)" }}>
          {/*
            All text flows as a single inline stream inside the h1 — no block-level
            wrapper spans, no forced line breaks, no overflow:hidden masks. The heading
            fills its container and only wraps when it runs out of horizontal space.
            The CircleHighlight SVG is free to render without any clipping context.
          */}
          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(48px, 7.5vw, 110px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: "0 0 clamp(24px, 2.5vw, 36px)",
              textWrap: "initial",
              opacity: headingVisible ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            {line1}{" "}
            <CircleHighlight
              text={circleWord}
              circleRef={circleRef}
              stroke={circleStroke}
              pathD={circlePathD}
            />
            {line2Suffix}
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{
                fontSize: "clamp(16px, 1.3vw, 20px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 680,
                lineHeight: 1.7,
                transform: "translateY(20px)",
                opacity: 0,
                transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s",
              }}
            >
              {subtext}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

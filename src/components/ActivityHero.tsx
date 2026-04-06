"use client";

import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import CircleHighlight from "./CircleHighlight";

export interface ActivityHeroProps {
  /** Plain text for line 1, e.g. "Gender Reveal Photo" */
  line1: string;
  /** The word wrapped in the hand-drawn circle on line 2, e.g. "Booth" */
  circleWord: string;
  /** SVG stroke color for the circle */
  circleStroke: string;
  /** SVG path `d` attribute for the circle shape */
  circlePathD: string;
  /** Text that follows the circle word on line 2, e.g. " Rental Calgary." */
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
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<SVGPathElement>(null);
  const [sticker1, setSticker1] = useState(false);
  const [sticker2, setSticker2] = useState(false);

  useEffect(() => {
    const reveal = (ref: React.RefObject<HTMLSpanElement | null>, ms: number) => {
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.transform = "translateY(0)";
        ref.current.style.opacity = "1";
      }, ms);
    };
    reveal(line1Ref, 100);
    reveal(line2Ref, 240);
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

        {/* Sticker 1 — absolute, no effect on text layout */}
        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
            transform: sticker1 ? `scale(1) rotate(${sticker1Rotation})` : "scale(0) rotate(-18deg)",
            opacity: sticker1 ? 1 : 0,
          }}>
            <img src={sticker1Src} alt="" style={{ width: sticker1Size, height: "auto" }} />
          </div>
        </div>

        {/* Sticker 2 — absolute, no effect on text layout */}
        <div className="absolute" style={{ bottom: "20%", right: "5%", zIndex: 5, pointerEvents: "none" }}>
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
          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(48px, 7.5vw, 110px)",
              // lineHeight > 1 so descenders (y, g, p) are never clipped by overflow:hidden masks
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#fff",
              // No maxWidth — the content div's padding defines the usable width.
              // A maxWidth here was the root cause of "Photo" stranding on its own line.
              margin: "0 0 clamp(24px, 2.5vw, 36px)",
            }}
          >
            {/* Line 1 — plain text slide-up */}
            <span style={{
              display: "block",
              overflow: "hidden",
              paddingTop: "0.1em",
              marginTop: "-0.1em",
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
              paddingLeft: "0.08em",
              marginLeft: "-0.08em",
            }}>
              <span
                ref={line1Ref}
                style={{
                  display: "block",
                  transform: "translateY(110%)",
                  opacity: 0,
                  transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {line1}
              </span>
            </span>

            {/* Line 2 — circle word + suffix, slide-up */}
            <span style={{
              display: "block",
              overflow: "hidden",
              paddingTop: "0.08em",
              marginTop: "-0.08em",
              // Generous bottom so descenders in "y" (Calgary) never hit the overflow:hidden edge
              paddingBottom: "0.36em",
              marginBottom: "-0.36em",
              paddingLeft: "0.08em",
              marginLeft: "-0.08em",
            }}>
              <span
                ref={line2Ref}
                style={{
                  display: "block",
                  transform: "translateY(110%)",
                  opacity: 0,
                  transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s",
                }}
              >
                <CircleHighlight
                  text={circleWord}
                  circleRef={circleRef}
                  stroke={circleStroke}
                  pathD={circlePathD}
                />
                {line2Suffix}
              </span>
            </span>
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

          <div style={{ overflow: "hidden", marginTop: "clamp(28px, 3.5vw, 48px)" }}>
            <RevealOnScroll direction="up">
              <div className="flex flex-wrap" style={{ gap: 14 }}>
                <a
                  href="#book"
                  style={{ display: "inline-block", padding: "clamp(13px, 1.4vw, 16px) clamp(28px, 2.5vw, 36px)", background: ctaColor, color: ctaTextColor, borderRadius: 60, fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif", textDecoration: "none", transition: "opacity 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {ctaText}
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

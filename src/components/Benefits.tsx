"use client";

import { useState, useRef, useEffect } from "react";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

// Each card maps to a labelled SVG icon in /public/icons/
const cards = [
  {
    title: "Free Setup\n& Takedown",
    items: [
      "Free delivery to your venue",
      "Full professional setup",
      "Prompt takedown after",
      "Zero hidden fees",
    ],
    iconSrc: "/icons/set-up-takedown.svg",
    bg: "#F5693B",
    contentColor: "#FFE6DE",
    rotation: -12,
  },
  {
    title: "Unlimited\nPrints",
    items: [
      "Up to 400 photos per event",
      "Or 800 double-strip prints",
      "Instant in-booth printing",
      "Every guest takes one home",
    ],
    iconSrc: "/icons/unlimited-prints.svg",
    bg: "#82A0FF",
    contentColor: "#F1F4FF",
    rotation: -2,
  },
  {
    title: "Custom\nPhoto Frames",
    items: [
      "Designed to match your event",
      "Your logo & brand colors",
      "Custom themes & messages",
      "Expert design team",
    ],
    iconSrc: "/icons/cutsom-photo-frames.svg",
    bg: "#B35CC4",
    contentColor: "#F7D1FF",
    rotation: 9,
  },
];

function getCardTransform(i: number, hovered: number | null): string {
  const base = [-12, -2, 9];
  if (hovered === null) return `rotate(${base[i]}deg)`;
  if (hovered === i) return `translateY(-40px) rotate(0deg) scale(1.08)`;
  const dir = i < hovered ? -1 : 1;
  return `translateX(${dir * 210}px) rotate(${base[i] + dir * 10}deg)`;
}

function getMobileCardStyle(
  i: number,
  progress: number,
): React.CSSProperties {
  // Card 0: always visible immediately
  // Card 1: starts entering at progress 0.05 (~1.5vh scroll)
  // Card 2: starts entering at progress 0.4 (~12vh scroll)
  const entryStarts = [0, 0.18, 0.52];
  const entryDuration = 0.28;

  const entryStart = entryStarts[i];
  const entryProgress = i === 0
    ? 1
    : Math.max(0, Math.min(1, (progress - entryStart) / entryDuration));

  if (entryProgress === 0) {
    return { transform: "translateY(55vh)", opacity: 0 };
  }

  // How much later cards have stacked on top of this one
  const laterEntryStarts = [entryStarts[1], entryStarts[2], 999];
  let depth = 0;
  for (let j = i + 1; j < 3; j++) {
    depth += Math.max(0, Math.min(1, (progress - laterEntryStarts[j - 1]) / entryDuration));
  }

  const restY = depth * 5;
  const scale = Math.max(0.82, 1 - depth * 0.06);
  const translateY = i === 0
    ? restY
    : (1 - entryProgress) * 55 + entryProgress * restY;

  return {
    transform: `translateY(${translateY}vh) scale(${scale})`,
    opacity: 1,
  };
}

function SnakeWord({ word }: { word: string }) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <em ref={ref} style={{ fontStyle: "italic", display: "inline-flex" }}>
      {word.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          <span
            style={{
              display: "inline-block",
              transform: revealed ? "translateY(0)" : "translateY(115%)",
              opacity: revealed ? 1 : 0,
              transition: `transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 48}ms,
                           opacity 0.3s ease ${i * 48}ms`,
            }}
          >
            {char}
          </span>
        </span>
      ))}
    </em>
  );
}

export default function Benefits() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardEnter = (i: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoveredCard(i);
  };
  const handleCardLeave = () => {
    hoverTimer.current = setTimeout(() => setHoveredCard(null), 80);
  };

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", position: "relative", overflow: "clip" }}>
      {/* Background blob */}
      <StickerReveal
        delay={200}
        style={{ position: "absolute", left: "-6vw", top: "12%", zIndex: 0, pointerEvents: "none" }}
      >
        <img src="/icons/blob-behind-everydetail.svg" alt="" style={{ width: "clamp(320px, 48vw, 720px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* "Every detail" heading */}
        <AnimatedText
          as="h2"
          className="font-heading"
          style={{
            fontSize: "clamp(40px, 7vw, 100px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#1a1a2e",
            marginBottom: "clamp(56px, 7vw, 100px)",
          }}
          stagger={90}
        >
          <AnimLine>
            Every <SnakeWord word="detail," />
          </AnimLine>
          <AnimLine>taken care of.</AnimLine>
        </AnimatedText>

        {/* ── Desktop: fanned stacked cards ── */}
        <div
          className="hidden md:flex"
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            paddingTop: 48,
            paddingBottom: 32,
          }}
        >
          {cards.map((card, i) => (
            // Static hit zone — never moves, so the card's own transform
            // can't trigger mouseleave and create a jitter feedback loop.
            <div
              key={i}
              style={{
                width: "clamp(280px, 28vw, 400px)",
                flexShrink: 0,
                marginLeft: i === 0 ? 0 : "clamp(-80px, -8vw, -110px)",
                position: "relative",
                zIndex: hoveredCard === i ? 10 : i + 1,
                cursor: "pointer",
              }}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={handleCardLeave}
            >
              {/* Moving inner — pointerEvents:none so it never intercepts events */}
              <div
                style={{
                  transform: getCardTransform(i, hoveredCard),
                  transformOrigin: "bottom center",
                  transition: "transform 0.65s cubic-bezier(0.34, 1.46, 0.64, 1)",
                  willChange: "transform",
                  pointerEvents: "none",
                }}
              >
              <div
                style={{
                  background: card.bg,
                  borderRadius: "clamp(12px, 1.5vw, 20px)",
                  padding: "clamp(20px, 2.5vw, 32px)",
                  color: card.contentColor,
                  aspectRatio: "3 / 4.2",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                {/* Sticker icon — top right, overlapping the card edge */}
                <div style={{ position: "absolute", top: -28, right: -14, zIndex: 2 }}>
                  <img
                    src={card.iconSrc}
                    alt=""
                    style={{ width: "clamp(64px, 6.5vw, 88px)", height: "auto" }}
                  />
                </div>

                <h3
                  className="font-heading"
                  style={{
                    fontSize: 34,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    whiteSpace: "pre-line",
                    color: card.contentColor,
                    marginBottom: "clamp(12px, 1.5vw, 18px)",
                    marginTop: "clamp(32px, 3vw, 44px)",
                  }}
                >
                  {card.title}
                </h3>
                <div style={{ width: "100%", height: 1, background: card.contentColor, marginBottom: "clamp(12px, 1.5vw, 18px)" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "clamp(7px, 0.8vw, 10px)" }}>
                  {card.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 18,
                        color: card.contentColor,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        lineHeight: 1.45,
                      }}
                    >
                      <span style={{ marginTop: 1, flexShrink: 0, fontSize: "0.7em" }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              </div>{/* end moving inner */}
            </div>
          ))}
        </div>

        {/* ── Mobile: static stack ── */}
        <div className="md:hidden flex flex-col" style={{ gap: 16, marginTop: 40 }}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: card.bg,
                borderRadius: 20,
                padding: "48px 24px 36px",
                color: card.contentColor,
                boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                position: "relative",
                overflow: "visible",
              }}
            >
              <div style={{ position: "absolute", top: -28, right: 16, zIndex: 2 }}>
                <img src={card.iconSrc} alt="" style={{ width: 68, height: "auto" }} />
              </div>
              <h3 className="font-heading" style={{ fontSize: 28, letterSpacing: "-0.025em", lineHeight: 1.1, whiteSpace: "pre-line", color: card.contentColor, marginBottom: 16 }}>
                {card.title}
              </h3>
              <div style={{ width: "100%", height: 1, background: card.contentColor, marginBottom: 16 }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {card.items.map((item, j) => (
                  <li key={j} style={{ fontSize: 15, color: card.contentColor, display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.5 }}>
                    <span style={{ marginTop: 2, flexShrink: 0, fontSize: "0.7em" }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Book Now CTA */}
        <div className="flex justify-center" style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
          <a
            href="/contact"
            className="transition-all duration-300 hover:opacity-80"
            style={{
              fontSize: 16,
              fontWeight: 700,
              padding: "16px 48px",
              background: "#FF6B35",
              color: "#fff",
              borderRadius: 60,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Book Now
          </a>
        </div>

      </div>
    </section>
  );
}

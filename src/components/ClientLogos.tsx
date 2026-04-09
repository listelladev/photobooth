"use client";

import { useState } from "react";

const logos = [
  { src: "/logos-home/BanffCollection.svg", alt: "Banff Collection", mode: "normal" },
  { src: "/logos-home/svgexport-1.svg", alt: "Client logo", mode: "grayscale" },
  { src: "/logos-home/braces-ortho-dontics-new-logo.png", alt: "Braces Orthodontics", mode: "invert" },
  { src: "/logos-home/bf3cfd74-1204-46bb-bb20-a48f5516199e.png", alt: "Fortis Alberta", mode: "normal" },
  { src: "/logos-home/d767433e-a4eb-4369-8599-fdf13621089b.png", alt: "Wholesome Empire", mode: "normal" },
  { src: "/logos-home/dawgs-c33d0b7a70985fa8495f0ef2ac8ad968.png", alt: "Dawgs", mode: "grayscale" },
  { src: "/logos-home/DMG Logo-1.png", alt: "DMG", mode: "grayscale" },
];

// Triple for seamless loop
const allLogos = [...logos, ...logos, ...logos];

function logoFilter(mode: string) {
  if (mode === "invert") return "invert(1) grayscale(1)";
  if (mode === "grayscale") return "grayscale(1)";
  return "grayscale(1) brightness(0)";
}

function LogoItem({ logo }: { logo: (typeof logos)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "clamp(36px, 4vw, 56px)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        style={{
          height: "100%",
          width: "auto",
          maxWidth: "clamp(100px, 12vw, 160px)",
          objectFit: "contain",
          filter: hovered
            ? logo.mode === "invert"
              ? "invert(1) grayscale(1) brightness(0)"   // true black on hover
              : "none"                                    // full colour on hover
            : logoFilter(logo.mode),
          opacity: hovered ? 1 : 0.65,
          transition: "filter 0.35s ease, opacity 0.35s ease",
        }}
      />
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section style={{ padding: "clamp(48px, 7vw, 96px) 0 clamp(80px, 12vw, 160px)", overflow: "hidden", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", marginBottom: "clamp(28px, 3.5vw, 48px)" }}>
        <h2
          className="font-heading text-center"
          style={{
            fontSize: "clamp(28px, 3.5vw, 52px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#1a1a2e",
          }}
        >
          We have worked for
        </h2>
      </div>

      {/* Scrolling marquee */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "clamp(60px, 8vw, 120px)",
            background: "linear-gradient(to right, #fff, transparent)",
            zIndex: 2, pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "clamp(60px, 8vw, 120px)",
            background: "linear-gradient(to left, #fff, transparent)",
            zIndex: 2, pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(48px, 6vw, 96px)",
            animation: "marquee 28s linear infinite",
            width: "max-content",
            padding: "0 clamp(24px, 3vw, 48px)",
          }}
        >
          {allLogos.map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}

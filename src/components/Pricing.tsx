"use client";

import { useRef, useEffect } from "react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

function TransparentWord() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            path.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
            path.style.strokeDashoffset = "0";
          }),
        );
        observer.unobserve(svg);
      },
      { threshold: 0.2 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <em style={{ fontStyle: "italic" }}>transparent</em>
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        style={{ position: "absolute", bottom: "-8px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}
      >
        <path
          ref={pathRef}
          d="M2 4 C30 1, 70 11, 100 5 C130 0, 168 11, 198 5"
          fill="none"
          stroke="#2563EB"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
        />
      </svg>
    </span>
  );
}

const packages = [
  {
    name: "Basic",
    popular: false,
    cardBg: "#F7F3EA",
    features: ["Choice of Photo Booth", "Delivery, Setup & Takedown", "Custom Photo Template", "Digital Media Sharing"],
    dimmed: [],
  },
  {
    name: "Gold",
    popular: true,
    cardBg: "#141414",
    features: ["Choice of Photo Booth", "Delivery, Setup & Takedown", "Custom Photo Template", "Digital Media Sharing", "Unlimited Printing", "Premium Backdrop", "Wide Variety of Props"],
    dimmed: [],
  },
  {
    name: "Platinum",
    popular: false,
    cardBg: "#ffffff",
    features: ["Choice of Photo Booth", "Delivery, Setup & Takedown", "Custom Photo Template", "Digital Media Sharing", "Unlimited Printing", "Premium Backdrop", "Wide Variety of Props", "Audio Guest Book", "Red Carpet", "Velvet Rope Stanchions", "Theme Decorated Background"],
    dimmed: [],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "clamp(80px, 12vw, 180px) 0 0", position: "relative", overflow: "hidden" }}>
      {/* Background blob */}
      <StickerReveal
        delay={200}
        style={{ position: "absolute", right: "-5vw", top: "8%", zIndex: 0, pointerEvents: "none" }}
      >
        <img src="/icons/blob-behind-pricing.svg" alt="" style={{ width: "clamp(280px, 42vw, 640px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Heading + pricing sticker inline */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <AnimatedText
            as="h2"
            className="font-heading"
            style={{
              fontSize: "clamp(40px, 7vw, 100px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#1a1a2e",
            }}
            stagger={90}
          >
            <AnimLine>
              Simple, <TransparentWord />
            </AnimLine>
            <AnimLine>
              pricing for all{" "}
              <StickerReveal
                delay={500}
                style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "0.15em" }}
              >
                <img
                  src="/icons/pricing.svg"
                  alt=""
                  style={{ width: "clamp(48px, 5.5vw, 80px)", height: "auto" }}
                />
              </StickerReveal>
            </AnimLine>
            <AnimLine>Calgary Events</AnimLine>
          </AnimatedText>
        </div>

        <RevealOnScroll>
          <p style={{ fontSize: "clamp(16px, 1.2vw, 20px)", fontWeight: 400, color: "#6b7280", maxWidth: 440, lineHeight: 1.7, marginBottom: "clamp(48px, 6vw, 80px)" }}>
            Choose the package that fits your event. Every package includes our premium service guarantee.
          </p>
        </RevealOnScroll>

        {/* 3-column pricing with rounded corners */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "clamp(12px, 1.5vw, 20px)" }}
        >
          {packages.map((pkg, i) => (
            <RevealOnScroll key={pkg.name} delay={i * 150}>
              <div
                className="flex flex-col h-full"
                style={{
                  padding: "clamp(32px, 3.5vw, 52px) clamp(24px, 3vw, 40px)",
                  borderRadius: "clamp(16px, 1.8vw, 24px)",
                  border: "none",
                  background: pkg.cardBg,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 28 }}>
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: "clamp(24px, 2vw, 32px)",
                      color: pkg.popular ? "#fff" : "#1a1a2e",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {pkg.name}
                  </h3>
                  {pkg.popular && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#FF6B35",
                        background: "rgba(255,107,53,0.15)",
                        padding: "4px 12px",
                        borderRadius: 50,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>

                <div style={{ height: 1, background: pkg.popular ? "rgba(255,255,255,0.08)" : "#e5e7eb", marginBottom: 28 }} />

                <ul className="flex-1" style={{ marginBottom: 36 }}>
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
                      <span style={{ color: "#FF6B35", fontSize: 14 }}>&#10003;</span>
                      <span style={{ fontSize: 14, fontWeight: 400, color: pkg.popular ? "rgba(255,255,255,0.6)" : "#6b7280" }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#book"
                  className="block text-center transition-all duration-300 hover:opacity-80"
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    padding: "14px 28px",
                    background: pkg.popular ? "#FF6B35" : "#141414",
                    color: "#fff",
                    borderRadius: 60,
                  }}
                >
                  Get Started
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <p style={{ fontSize: 16, fontWeight: 400, color: "#9ca3af", marginTop: 40 }}>
            Need something custom?{" "}
            <a href="#book" className="transition-opacity duration-300 hover:opacity-60" style={{ color: "#1a1a2e", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4 }}>
              Let&apos;s talk
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

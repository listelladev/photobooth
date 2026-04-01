"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

const steps = [
  {
    number: "01",
    title: "Inquire & Book",
    description: "Fill out our booking form or give us a call. We'll confirm your date, discuss your event details, and help you choose the right package.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Customize",
    description: "Our design team works with you to create custom photo frames that match your event theme, brand colors, or personal message.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "We Handle Setup",
    description: "On your event day, our team arrives early to set up everything. A professional attendant stays on-site for the entire duration.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Enjoy & Share",
    description: "Guests enjoy unlimited photos and videos. Prints are instant, and digital copies are ready for social sharing right from the booth.",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function WhatToExpect() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="about"
      style={{
        background: "#141414",
        padding: "clamp(80px, 12vw, 180px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1.5s]"
          style={{
            backgroundImage: `url('${step.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: activeStep === i ? 0.12 : 0,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #141414 0%, rgba(20,20,20,0.7) 50%, #141414 100%)" }}
      />

      <div className="relative z-10" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        {/* Heading + Book Now sticker */}
        <div style={{ position: "relative", display: "inline-block", width: "100%", marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <AnimatedText
            as="h2"
            className="font-heading"
            style={{
              fontSize: "clamp(40px, 7vw, 100px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#fff",
            }}
            stagger={90}
          >
            <AnimLine>
              From <em style={{ fontStyle: "italic" }}>booking</em>
            </AnimLine>
            <AnimLine>
              to <em style={{ fontStyle: "italic" }}>celebration.</em>
            </AnimLine>
          </AnimatedText>

          {/* Book Now sticker — right side, vertically centred on heading */}
          <StickerReveal
            delay={600}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <img
              src="/icons/book-now-main.svg"
              alt=""
              style={{ width: "clamp(72px, 7vw, 108px)", height: "auto" }}
            />
          </StickerReveal>
        </div>

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(40px, 5vw, 80px)" }}
        >
          <RevealOnScroll>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#FF6B35", letterSpacing: "0.06em", marginBottom: 16 }}>
                STEP {steps[activeStep].number}
              </p>
              <h3
                className="font-heading"
                style={{
                  fontSize: "clamp(28px, 3vw, 48px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  marginBottom: 20,
                  transition: "all 0.4s ease",
                }}
              >
                {steps[activeStep].title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(16px, 1.2vw, 20px)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: 440,
                  transition: "all 0.4s ease",
                }}
              >
                {steps[activeStep].description}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left cursor-pointer flex items-center transition-all duration-400"
                  style={{
                    padding: "clamp(18px, 2vw, 28px) 0",
                    gap: 20,
                    background: "none",
                    border: "none",
                    borderBlockEnd: "1px solid rgba(255,255,255,0.08)",
                    opacity: activeStep === i ? 1 : 0.35,
                  }}
                >
                  <span
                    className="font-heading"
                    style={{
                      fontSize: 13,
                      color: activeStep === i ? "#FF6B35" : "rgba(255,255,255,0.3)",
                      minWidth: 28,
                      transition: "color 0.3s",
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="font-heading"
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 22px)",
                      color: "#fff",
                      letterSpacing: "-0.01em",
                      transition: "opacity 0.3s",
                    }}
                  >
                    {step.title}
                  </span>
                  {activeStep === i && (
                    <span
                      style={{
                        marginLeft: "auto",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#FF6B35",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

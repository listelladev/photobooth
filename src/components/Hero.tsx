"use client";

import { useRef, useEffect, useState } from "react";

// Reusable inline pop-transition style
function stickerStyle(popped: boolean): React.CSSProperties {
  return {
    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
    transform: popped ? "scale(1) rotate(0deg)" : "scale(0) rotate(-18deg)",
    opacity: popped ? 1 : 0,
    transformOrigin: "center center",
  };
}

export default function Hero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const outerCircleRef = useRef<SVGPathElement>(null);
  const innerCircleRef = useRef<SVGPathElement>(null);

  const [cameraPopped, setCameraPopped] = useState(false);
  const [twinklePopped, setTwinklePopped] = useState(false);

  useEffect(() => {
    [outerCircleRef, innerCircleRef].forEach((r) => {
      const el = r.current;
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    });

    const revealLine = (ref: React.RefObject<HTMLSpanElement | null>, ms: number) => {
      setTimeout(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }, ms);
    };
    revealLine(line1Ref, 120);
    revealLine(line2Ref, 240);

    setTimeout(() => {
      const o = outerCircleRef.current;
      if (!o) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          o.style.transition = "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)";
          o.style.strokeDashoffset = "0";
        }),
      );
    }, 700);

    setTimeout(() => {
      const inner = innerCircleRef.current;
      if (!inner) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          inner.style.transition = "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)";
          inner.style.strokeDashoffset = "0";
        }),
      );
    }, 980);

    setTimeout(() => setCameraPopped(true), 450);
    setTimeout(() => setTwinklePopped(true), 1050);
  }, []);

  return (
    <section
      style={{
        padding: "clamp(8px, 1vw, 16px)",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "clamp(12px, 1.5vw, 24px)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.25) 100%)",
            }}
          />
        </div>

        {/* Camera sticker — desktop: separate outer (positioning) + inner (pop transition) */}
        <div
          className="absolute hidden md:block"
          style={{ top: "38%", left: "50%", transform: "translateX(-50%)", zIndex: 5 }}
        >
          <div style={stickerStyle(cameraPopped)}>
            <img
              src="/icons/hero-camera.svg"
              alt=""
              style={{ width: "clamp(72px, 8vw, 112px)", height: "auto" }}
            />
          </div>
        </div>

        {/* Camera sticker — mobile */}
        <div
          className="absolute md:hidden"
          style={{ top: "28%", right: "10%", zIndex: 5 }}
        >
          <div style={stickerStyle(cameraPopped)}>
            <img src="/icons/hero-camera.svg" alt="" style={{ width: 56, height: "auto" }} />
          </div>
        </div>

        <div
          className="relative z-10"
          style={{
            padding: "clamp(40px, 5vw, 80px)",
            paddingBottom: "clamp(64px, 8vh, 120px)",
            textAlign: "center",
          }}
        >
          <div
            className="font-heading"
            style={{
              fontSize: "clamp(40px, 6vw, 82px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#fff",
              maxWidth: 1400,
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/* Line 1 */}
            <span
              style={{
                overflow: "hidden",
                display: "block",
                paddingTop: "0.42em",
                marginTop: "-0.42em",
                paddingBottom: "0.9em",
                marginBottom: "-0.9em",
                paddingLeft: "0.08em",
                marginLeft: "-0.08em",
                paddingRight: "0.12em",
                marginRight: "-0.12em",
              }}
            >
              <span
                ref={line1Ref}
                style={{
                  display: "block",
                  transform: "translateY(110%)",
                  opacity: 0,
                  transition:
                    "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Premium{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  Photo Booth
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 80"
                    preserveAspectRatio="none"
                    style={{
                      position: "absolute",
                      top: "-35%",
                      left: "-4%",
                      width: "108%",
                      height: "170%",
                      overflow: "visible",
                      pointerEvents: "none",
                    }}
                  >
                    <path
                      ref={outerCircleRef}
                      d="M150,6 C220,3 294,18 294,40 C294,62 220,74 150,74 C80,74 6,62 6,40 C6,18 80,3 150,6"
                      fill="none"
                      stroke="rgba(255,255,255,0.88)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
                    />
                    <path
                      ref={innerCircleRef}
                      d="M150,12 C215,9 286,22 286,40 C286,58 215,68 150,68 C85,68 14,58 14,40 C14,22 85,9 150,12"
                      fill="none"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
                    />
                  </svg>
                </span>
                {" "}Rentals
              </span>
            </span>

            {/* Line 2 + twinkle sticker inline */}
            <span
              style={{
                overflow: "hidden",
                display: "block",
                paddingBottom: "0.18em",
                marginBottom: "-0.18em",
                paddingLeft: "0.08em",
                marginLeft: "-0.08em",
                paddingRight: "0.12em",
                marginRight: "-0.12em",
              }}
            >
              <span
                ref={line2Ref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.25em",
                  transform: "translateY(110%)",
                  opacity: 0,
                  transition:
                    "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s",
                }}
              >
                <span style={{ fontSize: "clamp(28px, 4.5vw, 65px)", letterSpacing: "-0.01em", color: "#fff" }}>
                  in Calgary &amp; Southern Alberta
                </span>
                {/* Twinkle — outer span is in-flow, inner div owns the pop transition */}
                <span style={{ display: "inline-block", flexShrink: 0 }}>
                  <div style={stickerStyle(twinklePopped)}>
                    <img
                      src="/icons/hero-twinkle.svg"
                      alt=""
                      style={{ width: "clamp(28px, 3.5vw, 50px)", height: "auto", display: "block" }}
                    />
                  </div>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

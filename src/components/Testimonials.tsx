"use client";

import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

const testimonials = [
  {
    quote: "The Photobooth Experience team made our wedding reception absolutely magical. Every guest was raving about the mirror booth — the prints were stunning.",
    name: "Sarah & Michael",
    event: "Wedding Reception",
  },
  {
    quote: "We booked the 360 video booth for our corporate gala and it was the highlight of the evening. The videos were incredible and shared instantly.",
    name: "David R.",
    event: "Corporate Gala",
  },
  {
    quote: "From the custom frames to the amazing props, everything was perfect. Setup was seamless and our guests had an absolute blast.",
    name: "Amanda T.",
    event: "Birthday Celebration",
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", position: "relative", overflow: "hidden" }}>
      {/* Background blob */}
      <StickerReveal
        delay={200}
        style={{ position: "absolute", right: "-6vw", top: "10%", zIndex: 0, pointerEvents: "none" }}
      >
        <img src="/icons/blob-behind-testimonials.svg" alt="" style={{ width: "clamp(300px, 44vw, 680px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Heading row — heart sticker inline after "clients." */}
        <div style={{ position: "relative", marginBottom: "clamp(48px, 6vw, 80px)" }}>
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
              Loved by our
            </AnimLine>
            <AnimLine>
              <em style={{ fontStyle: "italic" }}>clients.</em>{" "}
              {/* Heart sticker — inline, slightly overlapping the text */}
              <StickerReveal
                delay={500}
                style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "0.1em" }}
              >
                <img
                  src="/icons/love-by-clients.svg"
                  alt=""
                  style={{ width: "clamp(44px, 5vw, 70px)", height: "auto" }}
                />
              </StickerReveal>
            </AnimLine>
          </AnimatedText>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb" }}>
          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 120}>
              <div
                className="grid grid-cols-1 md:grid-cols-12"
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "clamp(32px, 4vw, 56px) 0",
                  gap: "clamp(16px, 2vw, 32px)",
                }}
              >
                <div className="md:col-span-3">
                  <p
                    className="font-heading"
                    style={{ fontSize: 12, color: "#FF6B35", letterSpacing: "0.08em", marginBottom: 12 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-heading" style={{ fontSize: 18, color: "#1a1a2e", marginBottom: 4 }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#9ca3af" }}>
                    {t.event}
                  </p>
                </div>

                <div className="md:col-span-9">
                  <p
                    style={{
                      fontSize: "clamp(20px, 2vw, 32px)",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: "#1a1a2e",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

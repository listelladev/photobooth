"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

const faqs = [
  { q: "How far in advance should I book?", a: "We recommend booking at least 2–4 weeks in advance, especially during peak season (May through October). Popular dates fill up quickly." },
  { q: "What's included in every rental?", a: "Every rental includes your choice of photo booth, a professional on-site attendant, full setup and takedown, unlimited prints, curated props collection, and a custom-designed photo frame." },
  { q: "How much space does a photo booth require?", a: "Standard and mirror booths need a minimum 8' × 8' area. The 360° video booth needs about 10' × 10'. We also need a standard power outlet within 50 feet." },
  { q: "Can I customize the photo frames?", a: "Absolutely. Our designers create fully customized frames — your wedding monogram, corporate logo, or event theme. Included at no extra cost." },
  { q: "Do you travel outside of Calgary?", a: "Yes. We regularly serve Banff, Canmore, Airdrie, Cochrane, Okotoks, and the greater Calgary region. Travel fees may apply beyond a certain distance." },
  { q: "Which photo booth should I choose?", a: "Classic is perfect for timeless prints. Mirror adds interactive elegance — ideal for weddings. 360° is the social media show-stopper for corporate events and celebrations." },
  { q: "What's your cancellation policy?", a: "We understand plans change. Reach out to our team directly and we'll do our best to accommodate rescheduling or cancellation requests." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "clamp(80px, 12vw, 180px) 0", position: "relative", overflow: "hidden" }}>
      {/* Background blob */}
      <StickerReveal
        delay={200}
        style={{ position: "absolute", left: "-5vw", top: "15%", zIndex: 0, pointerEvents: "none" }}
      >
        <img src="/icons/blob-behind-faq.svg" alt="" style={{ width: "clamp(280px, 42vw, 660px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Good Vibes sticker above heading */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(16px, 2vw, 24px)" }}>
          <StickerReveal delay={200}>
            <img
              src="/icons/questions-answers.svg"
              alt=""
              style={{ width: "clamp(72px, 7vw, 100px)", height: "auto" }}
            />
          </StickerReveal>
        </div>

        <AnimatedText
          as="h2"
          className="font-heading"
          style={{
            fontSize: "clamp(40px, 7vw, 100px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#1a1a2e",
            marginBottom: "clamp(48px, 6vw, 80px)",
            textAlign: "center",
          }}
          stagger={90}
        >
          <AnimLine>
            Questions &amp;
          </AnimLine>
          <AnimLine>
            <em style={{ fontStyle: "italic" }}>answers.</em>
          </AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 50}>
              <div style={{ borderBottom: "1px solid #e5e7eb" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group"
                  style={{ padding: "clamp(20px, 2.5vw, 32px) 0", background: "none", border: "none" }}
                >
                  <span
                    className="font-heading"
                    style={{
                      fontSize: "clamp(17px, 1.3vw, 22px)",
                      color: "#1a1a2e",
                      paddingRight: 32,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 transition-transform duration-500"
                    style={{
                      transform: open === i ? "rotate(45deg)" : "none",
                      fontSize: 24,
                      color: "#1a1a2e",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: open === i ? 300 : 0,
                    transition: "max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <p style={{
                    fontSize: "clamp(15px, 1.1vw, 18px)",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: "#6b7280",
                    paddingBottom: "clamp(20px, 2.5vw, 32px)",
                    maxWidth: 640,
                  }}>
                    {faq.a}
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

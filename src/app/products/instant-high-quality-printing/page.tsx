"use client";

import { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const pricingTiers = [
  { label: "With Gold or Platinum Package", price: "Included", muted: false },
  { label: '2×6" Unlimited Prints', price: "$120", muted: true },
  { label: '4×6" Unlimited Prints', price: "$150", muted: true },
];

const faqs = [
  {
    q: "What print sizes are available?",
    a: 'We offer two print formats: a classic 2×6" photo strip (great for 3 mini shots) and a 4×6" photo print (a standard photo size, perfect for framing or slipping into a wallet).',
  },
  {
    q: "How quickly do photos print?",
    a: "Our dye-sublimation printers produce a finished print in approximately 10–15 seconds — fast enough that guests barely have to wait after their session.",
  },
  {
    q: "Are prints really unlimited?",
    a: "Yes — every printing add-on includes unlimited prints for your full rental period. Every guest can print as many times as they like with no extra charge.",
  },
  {
    q: "What is dye-sublimation printing?",
    a: "Dye-sublimation is the professional printing method used by photo labs. Unlike inkjet printing, it infuses dye directly into the paper to produce vivid, waterproof, and fade-resistant prints that look professional and last for decades.",
  },
  {
    q: "Can the prints be customized with our event branding?",
    a: "Absolutely. We design a custom print template for your event — including your names, date, logo, or any design elements that match your theme.",
  },
  {
    q: "Which booths can I add printing to?",
    a: "Printing is available as an add-on to all of our booths — the Compact Pole Booth, Premium Pole Booth, AI PhotoBooth, and 360 VideoBooth (print-from-screenshot).",
  },
  {
    q: "Is printing included with the Mirror PhotoBooth?",
    a: "Yes — the Mirror PhotoBooth already includes printing as part of its package at no additional add-on cost.",
  },
];

// ─── ANIMATION HOOK ────────────────────────────────────────────────────────────

function useAnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const len = el.getTotalLength();
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = `${len}`;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              el.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
              el.style.strokeDashoffset = "0";
            })
          );
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return pathRef;
}

// ─── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  const subRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [sticker1, setSticker1] = useState(false);
  const [sticker2, setSticker2] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeadingVisible(true), 100);
    setTimeout(() => {
      if (subRef.current) {
        subRef.current.style.transform = "translateY(0)";
        subRef.current.style.opacity = "1";
      }
    }, 540);
    setTimeout(() => {
      const c = underlineRef.current;
      if (!c) return;
      const len = c.getTotalLength();
      c.style.strokeDasharray = `${len}`;
      c.style.strokeDashoffset = `${len}`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          c.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
          c.style.strokeDashoffset = "0";
        })
      );
    }, 700);
    setTimeout(() => setSticker1(true), 500);
    setTimeout(() => setSticker2(true), 950);
  }, []);

  const stickerAnim = (active: boolean, rotate: number): React.CSSProperties => ({
    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
    transform: active ? `scale(1) rotate(${rotate}deg)` : "scale(0) rotate(-18deg)",
    opacity: active ? 1 : 0,
  });

  return (
    <section style={{ padding: "clamp(8px, 1vw, 16px)", minHeight: "70vh", display: "flex" }}>
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: "clamp(12px, 1.5vw, 24px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <div className="absolute inset-0">
          <img
            src="/products/instant-high-quality-printing/instant%20high%20quality%20prints%201.jpg"
            alt="Instant high quality photo prints"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(125deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.70) 100%)" }}
          />
        </div>

        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5 }}>
          <div style={stickerAnim(sticker1, -6)}>
            <img src="/icons/pool-of-icons/hero-camera.svg" alt="" style={{ width: "clamp(60px, 7vw, 108px)", height: "auto" }} />
          </div>
        </div>
        <div className="absolute" style={{ bottom: "18%", right: "5%", zIndex: 5 }}>
          <div style={stickerAnim(sticker2, 8)}>
            <img src="/icons/pool-of-icons/props.svg" alt="" style={{ width: "clamp(44px, 5vw, 76px)", height: "auto" }} />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px, 9vw, 116px) clamp(28px, 6vw, 100px) clamp(8px, 1vw, 12px)" }}>
          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(44px, 7vw, 106px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: "0 0 clamp(20px, 2.5vw, 32px)",
              opacity: headingVisible ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
            }}
          >
            <span style={{ position: "relative", display: "inline-block" }}>
              Instant High Quality
              <svg
                aria-hidden="true"
                viewBox="0 0 400 14"
                preserveAspectRatio="none"
                style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible" }}
              >
                <path
                  ref={underlineRef}
                  d="M3 10 C50 3, 130 13, 200 7 C270 1, 350 11, 397 6"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <em style={{ fontStyle: "italic" }}>Printing.</em>
          </h1>
          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{
                fontSize: "clamp(16px, 1.3vw, 20px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.65)",
                maxWidth: 600,
                lineHeight: 1.7,
                transform: "translateY(20px)",
                opacity: 0,
                transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s",
              }}
            >
              Lab-Quality Prints. In Seconds. The Keepsake Every Guest Wants to Take Home.
            </p>
          </div>
          <div style={{ overflow: "hidden", marginTop: "clamp(28px, 3.5vw, 48px)" }}>
            <RevealOnScroll direction="up">
              <a
                href="/contact"
                style={{
                  display: "inline-block",
                  padding: "clamp(13px, 1.4vw, 16px) clamp(28px, 2.5vw, 36px)",
                  background: "#FF6B35",
                  color: "#fff",
                  borderRadius: 60,
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "dm-sans, sans-serif",
                  textDecoration: "none",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Book Now
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INTRO ─────────────────────────────────────────────────────────────────────

function Intro() {
  const circleRef = useAnimatedPath();

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 7vw, 100px)", alignItems: "center" }}>

          <RevealOnScroll direction="left" className="order-2 lg:order-1">
            <div style={{ borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
              <img
                src="/products/instant-high-quality-printing/instant%20high%20quality%20prints%202.jpg"
                alt="Guest holding instant photo prints"
                className="w-full h-full object-cover"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={150} className="order-1 lg:order-2">
            <div>
              <AnimatedText
                as="h2"
                className="font-heading"
                style={{ fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(20px, 2.5vw, 32px)" }}
                stagger={90}
              >
                <AnimLine>Prints they&apos;ll</AnimLine>
                <AnimLine>
                  keep{" "}
                  <span style={{ position: "relative", display: "inline-block" }}>
                    forever.
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 180 56"
                      preserveAspectRatio="none"
                      style={{ position: "absolute", top: "-0.06em", bottom: "-0.08em", left: "-0.1em", right: "-0.1em", width: "calc(100% + 0.2em)", height: "calc(100% + 0.14em)", overflow: "visible", pointerEvents: "none" }}
                    >
                      <path
                        ref={circleRef}
                        d="M90 3 C124 1, 164 12, 169 28 C173 42, 160 52, 136 55 C112 58, 64 56, 36 50 C10 44, 5 30, 11 18 C18 7, 54 1, 90 3"
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 20 }}>
                What&apos;s a great photo booth moment without a print to take home? Our Instant High Quality Printing add-on brings professional dye-sublimation printing to your event — producing stunning, vibrant, fade-resistant photos in just seconds. No blurry pixelated strips. No washed-out colours. Just crisp, beautiful prints that guests are genuinely proud to display.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8 }}>
                Available as an add-on to any of our booth packages, printing is unlimited for the duration of your rental. Choose between a classic 2×6" photo strip or a standard 4×6" photo — either way, every guest goes home with a physical memory in their hands.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}

// ─── PRICING ───────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 7vw, 100px)", alignItems: "start" }}>

          <RevealOnScroll direction="left">
            <div>
              <AnimatedText
                as="h2"
                className="font-heading"
                style={{ fontSize: "clamp(36px, 5vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: "#1a1a2e" }}
                stagger={90}
              >
                <AnimLine>Pricing.</AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(14px, 1vw, 16px)", color: "#9ca3af", marginTop: "clamp(16px, 2vw, 24px)", lineHeight: 1.7 }}>
                Unlimited prints included. Add-on to any booth rental.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={150}>
            <div style={{ borderRadius: "clamp(16px, 1.5vw, 20px)", overflow: "hidden", border: "1px solid #e5e7eb" }}>
              <div
                className="grid grid-cols-2"
                style={{ background: "#141414", padding: "clamp(16px, 1.5vw, 20px) clamp(24px, 2.5vw, 36px)" }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Print Format</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "right" }}>Price</span>
              </div>

              {pricingTiers.map((tier, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2"
                  style={{
                    padding: "clamp(18px, 1.8vw, 24px) clamp(24px, 2.5vw, 36px)",
                    borderTop: "1px solid #e5e7eb",
                    background: i % 2 === 0 ? "#fff" : "#fafafa",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "clamp(14px, 1.1vw, 17px)", fontWeight: 500, color: "#1a1a2e" }}>
                    {tier.label}
                  </span>
                  <span
                    className="font-heading"
                    style={{ fontSize: "clamp(20px, 2vw, 30px)", letterSpacing: "-0.03em", color: "#FF6B35", textAlign: "right" }}
                  >
                    {tier.price}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}

// ─── FAQ + IMAGES ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const underlineRef = useAnimatedPath();

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(48px, 6vw, 80px)", alignItems: "start" }}>

          {/* FAQ column */}
          <div className="lg:col-span-7">
            <AnimatedText
              as="h2"
              className="font-heading"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(40px, 5vw, 64px)" }}
              stagger={90}
            >
              <AnimLine>Frequently asked</AnimLine>
              <AnimLine>
                <span style={{ position: "relative", display: "inline-block" }}>
                  <em style={{ fontStyle: "italic" }}>questions.</em>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 260 14"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}
                  >
                    <path
                      ref={underlineRef}
                      d="M3 9 C36 3, 90 13, 130 7 C170 1, 224 11, 257 6"
                      fill="none"
                      stroke="#FF6B35"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </AnimLine>
            </AnimatedText>

            <div style={{ borderTop: "1px solid #e5e7eb" }}>
              {faqs.map((faq, i) => (
                <RevealOnScroll key={i} delay={i * 40}>
                  <div style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between text-left cursor-pointer"
                      style={{ padding: "clamp(18px, 2vw, 28px) 0", background: "none", border: "none" }}
                    >
                      <span className="font-heading" style={{ fontSize: "clamp(16px, 1.2vw, 20px)", color: "#1a1a2e", paddingRight: 24, letterSpacing: "-0.01em" }}>
                        {faq.q}
                      </span>
                      <span style={{ flexShrink: 0, transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)", transform: open === i ? "rotate(45deg)" : "none", fontSize: 24, color: "#1a1a2e", lineHeight: 1 }}>
                        +
                      </span>
                    </button>
                    <div className="overflow-hidden" style={{ maxHeight: open === i ? 400 : 0, transition: "max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                      <p style={{ fontSize: "clamp(14px, 1vw, 17px)", fontWeight: 400, lineHeight: 1.75, color: "#6b7280", paddingBottom: "clamp(18px, 2vw, 28px)", maxWidth: 580 }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Sticky image column — single image (reuse hero) */}
          <div
            className="lg:col-span-5 hidden lg:block"
            style={{ alignSelf: "start", position: "sticky", top: "clamp(80px, 8vw, 120px)" }}
          >
            <RevealOnScroll direction="right">
              <div style={{ borderRadius: "clamp(14px, 1.5vw, 20px)", overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src="/products/instant-high-quality-printing/instant%20high%20quality%20prints%201.jpg"
                  alt="Instant high quality prints"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>

        </div>

        {/* Mobile-only: image below FAQ */}
        <div className="flex flex-col lg:hidden" style={{ gap: "clamp(14px, 3vw, 20px)", marginTop: "clamp(40px, 6vw, 64px)" }}>
          <RevealOnScroll>
            <div style={{ borderRadius: "clamp(14px, 1.5vw, 20px)", overflow: "hidden", aspectRatio: "4/3" }}>
              <img
                src="/products/instant-high-quality-printing/instant%20high%20quality%20prints%201.jpg"
                alt="Instant high quality prints"
                className="w-full h-full object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
}

// ─── READY TO BOOK CTA ─────────────────────────────────────────────────────────

function ReadyToBook() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", textAlign: "center" }}>
        <AnimatedText
          as="h2"
          className="font-heading"
          style={{ fontSize: "clamp(40px, 6vw, 90px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(12px, 1.5vw, 20px)" }}
          stagger={90}
        >
          <AnimLine>Ready to Book?</AnimLine>
        </AnimatedText>
        <RevealOnScroll delay={150}>
          <p style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "#6b7280", lineHeight: 1.7, marginBottom: "clamp(32px, 4vw, 52px)" }}>
            Reach out and secure your date today!
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "clamp(14px, 1.5vw, 18px) clamp(36px, 3vw, 52px)",
              background: "#FF6B35",
              color: "#fff",
              borderRadius: 60,
              fontSize: "clamp(14px, 1vw, 16px)",
              fontWeight: 700,
              fontFamily: "dm-sans, sans-serif",
              textDecoration: "none",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Book Now
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function InstantHighQualityPrintingPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Pricing />
        <FAQSection />
        <ReadyToBook />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const includedItems = [
  { icon: "/icons/product-pages/data-capture.svg", label: "Data Capture" },
  { icon: "/icons/product-pages/set-up-and-take-down.svg", label: "Set up and Take Down" },
];

const pricingTiers = [
  { label: "Half Day", price: "$149" },
  { label: "Full Day", price: "$199" },
];

const faqs = [
  {
    q: "What is an Audio GuestBook?",
    a: "An Audio GuestBook is a specially set-up telephone that guests pick up and speak into, leaving a recorded voice message for the guest of honour. Think of it as a voicemail guestbook — but far more personal and memorable than a written card.",
  },
  {
    q: "Is it easy for guests of all ages to use?",
    a: "Absolutely. Pick up the phone, wait for the tone, leave a message. That's it. Even guests who aren't comfortable with technology will have no trouble — it's as simple as making a phone call.",
  },
  {
    q: "What style of phone will be used?",
    a: "We're in the process of adding a beautiful vintage-style rotary or classic handset telephone. It's designed to be a gorgeous event prop as well as a functional recording device — guests are drawn to it naturally.",
  },
  {
    q: "How do we receive the messages after the event?",
    a: "All recordings are compiled into a single audio file and delivered to you digitally after your event — typically within 1–2 business days. You'll be able to listen, share, and treasure them forever.",
  },
  {
    q: "How many messages can guests leave?",
    a: "Unlimited! Every package includes unlimited messages for the full rental duration, so no guest is left out.",
  },
  {
    q: "What events is the Audio GuestBook best for?",
    a: "Weddings, milestone birthdays (50th, 60th, 80th), baby showers, graduations, retirement parties, anniversary celebrations — any occasion where the words of loved ones mean everything.",
  },
  {
    q: "Can we personalize the greeting message?",
    a: "Yes — we can set up a custom outgoing message that plays before guests record, tailored to your event. For example: \"You've reached Sarah & Tom's wedding line — leave us a message!\"",
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
            src="/products/audio-guestbook/audio%20guestbook%201.jpg"
            alt="Audio GuestBook vintage telephone at an event"
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
              Audio
              <svg
                aria-hidden="true"
                viewBox="0 0 180 14"
                preserveAspectRatio="none"
                style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible" }}
              >
                <path
                  ref={underlineRef}
                  d="M3 10 C24 3, 60 13, 90 7 C120 1, 156 11, 177 6"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <em style={{ fontStyle: "italic" }}>GuestBook.</em>
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
              Their Voices. Your Forever. A Keepsake Like No Other.
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
                src="/products/audio-guestbook/audio%20guestbook2.png"
                alt="Audio GuestBook guests leaving a voice message"
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
                <AnimLine>A keepsake</AnimLine>
                <AnimLine>
                  <span style={{ position: "relative", display: "inline-block" }}>
                    unlike
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 128 56"
                      preserveAspectRatio="none"
                      style={{ position: "absolute", top: "-0.06em", bottom: "-0.08em", left: "-0.1em", right: "-0.1em", width: "calc(100% + 0.2em)", height: "calc(100% + 0.14em)", overflow: "visible", pointerEvents: "none" }}
                    >
                      <path
                        ref={circleRef}
                        d="M64 3 C88 1, 116 12, 121 28 C125 42, 114 52, 96 55 C78 58, 44 56, 24 50 C6 44, 3 30, 7 18 C13 7, 38 1, 64 3"
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {" "}any <em style={{ fontStyle: "italic" }}>other.</em>
                </AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 20 }}>
                Some things are simply better said out loud. The Audio GuestBook gives every guest the chance to pick up the phone and leave a heartfelt voice message — a personal story, a favourite memory, a tearful congratulations, or a laugh you&apos;ll replay for years.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8 }}>
                Simple enough for grandma, charming enough to become the unexpected highlight of the evening. While photos capture moments, the Audio GuestBook captures the voices, emotions, and words that make those moments truly meaningful.
              </p>
              <p style={{ fontSize: "clamp(14px,1vw,17px)", color: "#9ca3af", lineHeight: 1.75, marginTop: 20 }}>
                <em>Coming Soon — We&apos;re adding a beautiful vintage-style telephone handset to complete this experience. It&apos;s going to be a gorgeous conversation starter at your event!</em>
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}

// ─── WHAT'S INCLUDED ───────────────────────────────────────────────────────────

function WhatsIncluded() {
  const underlineRef = useAnimatedPath();

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        <AnimatedText
          as="h2"
          className="font-heading"
          style={{
            fontSize: "clamp(40px, 6vw, 90px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#1a1a2e",
            textAlign: "center",
            marginBottom: "clamp(56px, 7vw, 88px)",
          }}
          stagger={90}
        >
          <AnimLine>What&apos;s</AnimLine>
          <AnimLine>
            <span style={{ position: "relative", display: "inline-block" }}>
              Included.
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

        <div
          className="grid grid-cols-2 sm:grid-cols-2"
          style={{ gap: "clamp(40px, 5vw, 72px) clamp(16px, 2vw, 32px)", maxWidth: 560, margin: "0 auto" }}
        >
          {includedItems.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 55} className="h-full">
              <div style={{
                background: "#fff",
                borderRadius: 16,
                padding: "clamp(20px, 2vw, 28px) clamp(12px, 1.5vw, 20px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
              }}>
                <div style={{ width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, flexShrink: 0 }}>
                  <img
                    src={item.icon}
                    alt={item.label}
                    style={{ width: 64, height: 64, objectFit: "contain", display: "block" }}
                  />
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", lineHeight: 1.45, letterSpacing: "0.01em" }}>
                  {item.label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── PRICING ───────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
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
                Includes unlimited messages. Starting at $149+ taxes.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={150}>
            <div style={{ borderRadius: "clamp(16px, 1.5vw, 20px)", overflow: "hidden", border: "1px solid #e5e7eb" }}>
              <div
                className="grid grid-cols-2"
                style={{ background: "#141414", padding: "clamp(16px, 1.5vw, 20px) clamp(24px, 2.5vw, 36px)" }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Package</span>
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
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9" }}>
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
                  src="/products/audio-guestbook/audio%20guestbook%201.jpg"
                  alt="Audio GuestBook at an event"
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
                src="/products/audio-guestbook/audio%20guestbook%201.jpg"
                alt="Audio GuestBook at an event"
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
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
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

export default function AudioGuestBookPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <WhatsIncluded />
        <Pricing />
        <FAQSection />
        <ReadyToBook />
      </main>
      <Footer />
    </>
  );
}

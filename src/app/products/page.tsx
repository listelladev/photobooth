"use client";

import { useState, useEffect, useRef } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";
import StickerReveal from "@/components/StickerReveal";
import CircleHighlight from "@/components/CircleHighlight";
import BookingCTA from "@/components/BookingCTA";

function stickerStyle(popped: boolean): React.CSSProperties {
  return {
    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
    transform: popped ? "scale(1) rotate(0deg)" : "scale(0) rotate(-18deg)",
    opacity: popped ? 1 : 0,
    transformOrigin: "center center",
  };
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function ProductsHero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const [sticker1, setSticker1] = useState(false);
  const [sticker2, setSticker2] = useState(false);
  const [sticker3, setSticker3] = useState(false);
  const circleRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const revealLine = (ref: React.RefObject<HTMLSpanElement | null>, ms: number) => {
      setTimeout(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }, ms);
    };
    revealLine(line1Ref, 100);
    revealLine(line2Ref, 230);
    revealLine(line3Ref, 360);
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
    setTimeout(() => setSticker1(true), 480);
    setTimeout(() => setSticker2(true), 850);
    setTimeout(() => setSticker3(true), 1150);
  }, []);

  return (
    <section style={{ padding: "clamp(8px, 1vw, 16px)", minHeight: "70vh", display: "flex" }}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "clamp(12px, 1.5vw, 24px)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/products-hero.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.70) 100%)",
            }}
          />
        </div>

        {/* Camera sticker */}
        <div className="absolute" style={{ top: "14%", right: "7%", zIndex: 5 }}>
          <div style={stickerStyle(sticker1)}>
            <img
              src="/icons/hero-camera.svg"
              alt=""
              style={{ width: "clamp(52px, 7vw, 104px)", height: "auto" }}
            />
          </div>
        </div>

        {/* Twinkle sticker */}
        <div className="absolute" style={{ bottom: "22%", left: "5%", zIndex: 5 }}>
          <div style={stickerStyle(sticker2)}>
            <img
              src="/icons/hero-twinkle.svg"
              alt=""
              style={{ width: "clamp(28px, 3.5vw, 56px)", height: "auto" }}
            />
          </div>
        </div>

        {/* Content */}
        <div
          className="relative z-10 text-center"
          style={{ padding: "clamp(48px, 6vw, 100px)" }}
        >
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(44px, 7.5vw, 110px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: 0,
            }}
          >
            {/* Line 1 */}
            <span style={{ display: "block" }}>
              <span
                ref={line1Ref}
                style={{
                  display: "block",
                  transform: "translateY(110%)",
                  opacity: 0,
                  transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Every Moment
              </span>
            </span>
            {/* Line 2 */}
            <span style={{ display: "block", paddingBottom: "0.3em" }}>
              <span
                ref={line2Ref}
                style={{
                  display: "block",
                  transform: "translateY(110%)",
                  opacity: 0,
                  transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s",
                }}
              >
                Deserves a{" "}
                <CircleHighlight
                  text="Frame."
                  circleRef={circleRef}
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth={3}
                  pathD="M100 5 C132 2, 170 12, 188 30 C200 44, 198 66, 186 80 C172 93, 144 98, 104 97 C66 96, 36 89, 18 76 C4 64, 4 40, 14 26 C26 10, 58 3, 82 4 C90 4, 96 5, 106 4"
                />
              </span>
            </span>
          </h2>

          {/* H1 subtext */}
          <h1
            style={{
              overflow: "hidden",
              display: "block",
              paddingBottom: "0.18em",
              marginBottom: "-0.18em",
              marginTop: "clamp(20px, 2.5vw, 36px)",
            }}
          >
            <span
              ref={line3Ref}
              style={{
                display: "block",
                transform: "translateY(110%)",
                opacity: 0,
                transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.24s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.24s",
                fontSize: "clamp(16px, 1.4vw, 22px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.65)",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Choose from Calgary&apos;s Best Selection of Photo Booths and Add-Ons
            </span>
          </h1>

        </div>
      </div>
    </section>
  );
}

// ─── BOOTH PRICING ────────────────────────────────────────────────────────────
const booths = [
  {
    name: "Compact Pole PhotoBooth",
    href: "/products/compact-pole-photobooth",
    icon: "/icons/pool-of-icons/hero-camera.svg",
    image: "/products/compact-pole-photobooth/Compact%20Pole%20PhotoBooth%201.jpg",
    startingAt: "250",
    accent: "#FFD6E8",
    accentDark: "#E84393",
    note: "Minimum 2 hours",
    tiers: [
      { label: "2 hours", price: "$250" },
      { label: "3 hours", price: "$350" },
      { label: "4 hours", price: "$450" },
    ],
    extra: "$100 / additional hour",
    description:
      "A sleek, space-saving pole booth that delivers big on fun. Perfect for intimate gatherings and venues where space is at a premium.",
  },
  {
    name: "Premium Pole PhotoBooth",
    href: "/products/premium-pole-photobooth",
    icon: "/icons/pool-of-icons/Asset%203photo-stand.svg",
    image: "/products/premium-backdrops/Premium%20Pole%20PhotoBooth1.jpg",
    startingAt: "350",
    accent: "#FDE8C8",
    accentDark: "#F59E0B",
    note: "Minimum 2 hours",
    tiers: [
      { label: "2 hours", price: "$350" },
      { label: "3 hours", price: "$475" },
      { label: "4 hours", price: "$600" },
    ],
    extra: "$125 / additional hour",
    description:
      "Premium hardware, polished finish, and crisp high-quality prints. Elevate your event with the best classic booth experience.",
  },
  {
    name: "AI PhotoBooth",
    href: "/products/ai-photobooth",
    icon: "/icons/pool-of-icons/unforgettable-2.svg",
    image: "/products/ai-photobooth/ai%20photobooth%201.jpg",
    startingAt: "350",
    accent: "#C8E6FF",
    accentDark: "#1a73e8",
    note: "Minimum 2 hours",
    tiers: [
      { label: "2 hours", price: "$350" },
      { label: "3 hours", price: "$475" },
      { label: "4 hours", price: "$600" },
    ],
    extra: "$125 / additional hour",
    description:
      "Next-generation AI-powered booth with stunning artistic portrait generation and instant digital sharing.",
  },
  {
    name: "360 VideoBooth",
    href: "/products/360-videobooth",
    icon: "/icons/360-photobooth.svg",
    image: "/products/360-videobooth/360%20video%20booth%201.jpg",
    startingAt: "400",
    accent: "#D4F4A0",
    accentDark: "#00B894",
    note: "Minimum 2 hours",
    tiers: [
      { label: "2 hours", price: "$400" },
      { label: "3 hours", price: "$550" },
      { label: "4 hours", price: "$700" },
    ],
    extra: "$150 / additional hour",
    description:
      "The ultimate social media showstopper. Cinematic 360° slow-motion videos that guests will share for days.",
  },
  {
    name: "Mirror PhotoBooth",
    href: "/products/mirror-photobooth",
    icon: "/icons/mirror.svg",
    image: "/products/mirror-photobooth/mirror%20photobooth%201.jpg",
    startingAt: "499",
    accent: "#E8D6FF",
    accentDark: "#6C5CE7",
    note: "Minimum 2 hours",
    tiers: [
      { label: "2 hours", price: "$499" },
      { label: "3 hours", price: "$699" },
      { label: "4 hours", price: "$899" },
    ],
    extra: "$199 / additional hour",
    description:
      "Elegant, interactive, and endlessly entertaining. The full-length mirror display turns every photo into a moment.",
  },
  {
    name: "Audio GuestBook",
    href: "/products/audio-guestbook",
    icon: "/icons/pool-of-icons/Asset%202music-note.svg",
    image: "/products/audio-guestbook/audio%20guestbook%201.jpg",
    startingAt: "80",
    accent: "#C8F5E8",
    accentDark: "#10B981",
    note: "Add-on or with Platinum",
    tiers: [
      { label: "With Platinum Package", price: "Free" },
      { label: "Add-on (any booking)", price: "$80" },
    ],
    extra: "Includes unlimited messages",
    description:
      "Record heartfelt audio messages and well-wishes from guests. A timeless keepsake for any celebration.",
  },
  {
    name: "Premium Backdrops",
    href: "/products/premium-backdrops",
    icon: "/icons/backdrops.svg",
    image: "/products/premium-backdrops/premium%20backdrops%201.jpg",
    startingAt: "50",
    accent: "#FFD6D6",
    accentDark: "#EF4444",
    note: "Add-on or standalone",
    tiers: [
      { label: "With Gold or Platinum", price: "Free" },
      { label: "Standalone add-on", price: "$50" },
    ],
    extra: "2.60m × 2.60m professional backdrops",
    description:
      "Vibrant, high-quality backdrop collection. Flowers, glitter, abstract, balloons, and more — contact us for the full catalogue.",
  },
  {
    name: "Instant High Quality Printing",
    href: "/products/instant-high-quality-printing",
    icon: "/icons/unlimited-prints.svg",
    image: "/products/instant-high-quality-printing/instant%20high%20quality%20prints%201.jpg",
    startingAt: "120",
    accent: "#FFF3C8",
    accentDark: "#D97706",
    note: "Add-on to any booth",
    tiers: [
      { label: "With Gold or Platinum", price: "✓" },
      { label: '2×6" unlimited prints', price: "$120" },
      { label: '4×6" unlimited prints', price: "$150" },
    ],
    extra: "Unlimited prints per session",
    description:
      "Walk away with lab-quality prints in seconds. Vibrant, professional-grade photos your guests take home instantly.",
  },
];

function BoothCard({ booth, index }: { booth: (typeof booths)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [stickerPopped, setStickerPopped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStickerPopped(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealOnScroll delay={index * 130} className="h-full">
      <div
        ref={cardRef}
        style={{ position: "relative", height: "100%" }}
        onMouseEnter={() => {
          setHovered(true);
          if (!stickerPopped) setStickerPopped(true);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icon sticker */}
        <div
          style={{
            position: "absolute",
            top: -22,
            right: 24,
            zIndex: 10,
          }}
        >
          <div style={stickerStyle(stickerPopped)}>
            <img
              src={booth.icon}
              alt=""
              style={{ width: "clamp(60px, 6vw, 80px)", height: "auto" }}
            />
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "clamp(16px, 2vw, 24px)",
            border: "1.5px solid #ebebeb",
            overflow: "hidden",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s",
            transform: hovered ? "translateY(-6px)" : "translateY(0)",
            boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.10)" : "0 4px 20px rgba(0,0,0,0.05)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Thumbnail image */}
          <a href={booth.href} style={{ display: "block", position: "relative", overflow: "hidden", flexShrink: 0, textDecoration: "none" }}>
            <img
              src={booth.image}
              alt={booth.name}
              style={{
                width: "100%",
                height: "clamp(160px, 18vw, 240px)",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            {/* Accent tint overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: booth.accentDark,
                opacity: hovered ? 0.18 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          </a>

          <div style={{ padding: "clamp(18px, 2vw, 28px)", flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ marginBottom: "clamp(10px, 1.2vw, 16px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <h3
                className="font-heading"
                style={{
                  fontSize: "clamp(22px, 2vw, 30px)",
                  letterSpacing: "-0.025em",
                  color: "#1a1a2e",
                  marginBottom: 8,
                }}
              >
                {booth.name}
              </h3>
              <p
                style={{
                  fontSize: "clamp(13px, 1vw, 15px)",
                  color: "#6b7280",
                  lineHeight: 1.65,
                }}
              >
                {booth.description}
              </p>
            </div>

            {/* Price */}
            <div
              style={{
                background: booth.accent,
                borderRadius: 14,
                padding: "clamp(12px, 1.4vw, 18px)",
                marginBottom: "clamp(12px, 1.5vw, 20px)",
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: booth.accentDark, marginBottom: 4 }}>
                Starting at
              </p>
              <div className="flex items-end" style={{ gap: 4 }}>
                <span
                  className="font-heading"
                  style={{
                    fontSize: "clamp(44px, 4.5vw, 64px)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "#1a1a2e",
                  }}
                >
                  ${booth.startingAt}
                </span>
                <span style={{ fontSize: 13, color: "#6b7280", paddingBottom: 6 }}>+ taxes</span>
              </div>
              <p style={{ fontSize: 12, fontWeight: 500, color: booth.accentDark, marginTop: 4 }}>
                {booth.note}
              </p>
            </div>

            {/* Tier list */}
            <div style={{ marginBottom: "clamp(14px, 1.8vw, 20px)", minHeight: 200 }}>
              {booth.tiers.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-center justify-between"
                  style={{
                    padding: "7px 0",
                    borderBottom: "1px solid #f3f3f3",
                  }}
                >
                  <div className="flex items-center" style={{ gap: 10 }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: booth.accentDark,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: "clamp(14px, 1vw, 16px)", fontWeight: 500, color: "#1a1a2e" }}>
                      {tier.label}
                    </span>
                  </div>
                  <span
                    className="font-heading"
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 20px)",
                      letterSpacing: "-0.02em",
                      color: "#1a1a2e",
                    }}
                  >
                    {tier.price}
                  </span>
                </div>
              ))}
              <p style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af", marginTop: 12 }}>
                &#43; {booth.extra}
              </p>
            </div>

            {/* CTA */}
            <a
              href={booth.href}
              className="block text-center transition-all duration-300 hover:opacity-80"
              style={{
                fontSize: 15,
                fontWeight: 700,
                padding: "clamp(13px, 1.4vw, 16px) 28px",
                background: "#1a1a2e",
                color: "#fff",
                borderRadius: 60,
                textDecoration: "none",
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

function BoothPricing() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const path = underlineRef.current;
    if (!el || !path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    const lines = el.querySelectorAll<HTMLElement>(".draw-line");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      lines.forEach((line, i) => setTimeout(() => { line.style.transform = "translateY(0)"; line.style.opacity = "1"; }, i * 100));
      setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        path.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
        path.style.strokeDashoffset = "0";
      })), 650);
      observer.unobserve(el);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="booths"
      style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff", position: "relative", overflow: "hidden" }}
    >
      {/* Blob accent */}
      <StickerReveal
        delay={300}
        style={{ position: "absolute", left: "-6vw", top: "5%", zIndex: 0, pointerEvents: "none" }}
      >
        <img
          src="/icons/blob-behind-everydetail.svg"
          alt=""
          style={{ width: "clamp(260px, 38vw, 580px)", height: "auto", opacity: 0.45 }}
        />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <h2
            ref={headRef}
            className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
          >
            <span style={{ display: "block" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Pick Your
              </span>
            </span>
            <span style={{ display: "block", paddingBottom: "0.3em" }}>
              <span className="draw-line" style={{ display: "inline-flex", alignItems: "center", gap: "0.2em", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
                <span style={{ position: "relative", display: "inline-block" }}>
                  <em style={{ fontStyle: "italic" }}>Booth.</em>
                  <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
                    <path ref={underlineRef} d="M2 4 C30 1, 70 11, 100 5 C130 0, 168 11, 198 5" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  </svg>
                </span>
                <StickerReveal delay={900} style={{ display: "inline-block", verticalAlign: "middle" }}>
                  <img src="/icons/choose-your--product.svg" alt="" style={{ width: "clamp(44px, 5vw, 72px)", height: "auto" }} />
                </StickerReveal>
              </span>
            </span>
          </h2>

          <RevealOnScroll delay={200}>
            <p style={{ fontSize: "clamp(16px, 1.2vw, 20px)", color: "#6b7280", maxWidth: 460, lineHeight: 1.75, marginTop: "clamp(16px, 2vw, 24px)" }}>
              All booths include setup, takedown, a professional attendant, unlimited prints, and a custom photo frame.
              Prices exclude applicable taxes.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(20px, 2.5vw, 32px)", alignItems: "stretch" }}>
          {booths.filter(b => b.name !== "Mirror PhotoBooth").map((booth, i) => (
            <BoothCard key={booth.name} booth={booth} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BACKDROPS GALLERY ────────────────────────────────────────────────────────
const backdropItems = [
  { name: "Abstract", src: "/backdrop-images/Abstract.jpeg" },
  { name: "Balloons 2", src: "/backdrop-images/Balloons%202.jpg" },
  { name: "Balloons", src: "/backdrop-images/Balloons.jpg" },
  { name: "Black & Gold Glitter", src: "/backdrop-images/black%20and%20gold%20glitter.jpg" },
  { name: "Flowers 1", src: "/backdrop-images/flowers%201.jpg" },
  { name: "Flowers 2", src: "/backdrop-images/flowers%202.jpg" },
  { name: "Flowers 3", src: "/backdrop-images/flowers%203.jpg" },
  { name: "Flowers 4", src: "/backdrop-images/flowers%204.png" },
  { name: "Glitter", src: "/backdrop-images/glitter.jpg" },
  { name: "Party", src: "/backdrop-images/party.jpg" },
  { name: "Christmas 1", src: "/backdrop-images/Christmas%201.jpg" },
  { name: "Christmas 2", src: "/backdrop-images/Christmas%202.jpg" },
  { name: "Black", src: "/backdrop-images/Black.png" },
  { name: "White", src: "/backdrop-images/White.png" },
  { name: "Other", src: "/backdrop-images/other%20backdrop.jpg" },
];

function BackdropsGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const SCROLL_AMOUNT = 320;

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };
  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <section
      id="backdrops"
      style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>
        {/* Heading row + arrows */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ marginBottom: "clamp(40px, 5vw, 64px)", gap: "clamp(16px, 2vw, 24px)" }}
        >
          <div>
            <AnimatedText
              as="h2"
              className="font-heading"
              style={{
                fontSize: "clamp(40px, 7vw, 100px)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "#1a1a2e",
                paddingRight: "0.08em",
              }}
              stagger={90}
            >
              <AnimLine>Backdrop</AnimLine>
              <AnimLine>
                <em style={{ fontStyle: "italic" }}>Library.</em>
              </AnimLine>
            </AnimatedText>
          </div>

          <RevealOnScroll direction="right">
            <div style={{ maxWidth: 340 }}>
              <StickerReveal delay={400} style={{ marginBottom: 12 }}>
                <img src="/icons/backdrops.svg" alt="" style={{ width: "clamp(52px, 5.5vw, 76px)", height: "auto" }} />
              </StickerReveal>
              <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#6b7280", lineHeight: 1.7 }}>
                Every backdrop is 2.60 m × 2.60 m. Need something specific?{" "}
                <a href="#book" style={{ color: "#FF6B35", fontWeight: 600 }}>Let us know.</a>
              </p>

              {/* Arrow nav buttons */}
              <div className="flex items-center" style={{ gap: 12, marginTop: 24 }}>
                <button
                  onClick={scrollPrev}
                  aria-label="Scroll left"
                  className="cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#1a1a2e",
                    border: "2.5px solid #1a1a2e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transform: "rotate(-4deg)",
                    boxShadow: "3px 3px 0 #FF6B35",
                    padding: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={scrollNext}
                  aria-label="Scroll right"
                  className="cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#FF6B35",
                    border: "2.5px solid #FF6B35",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transform: "rotate(3deg)",
                    boxShadow: "3px 3px 0 #1a1a2e",
                    padding: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Scrollable film strip */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "clamp(12px, 1.5vw, 18px)",
          overflowX: "auto",
          padding: "0 clamp(24px, 5vw, 80px) clamp(20px, 2vw, 28px)",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {backdropItems.map((item, i) => (
          <RevealOnScroll key={item.name} delay={i * 60} direction="scale">
            <div
              style={{
                flexShrink: 0,
                width: "clamp(180px, 22vw, 280px)",
                borderRadius: "clamp(12px, 1.5vw, 20px)",
                overflow: "hidden",
                background: "#fff",
                border: "1.5px solid #ebebeb",
                transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px) scale(1.02)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ aspectRatio: "1/1", overflow: "hidden", position: "relative" }}>
                <img
                  src={item.src}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                />
              </div>
              <div style={{ padding: "clamp(12px, 1.5vw, 16px)" }}>
                <p
                  className="font-heading"
                  style={{ fontSize: "clamp(14px, 1.1vw, 17px)", letterSpacing: "-0.01em", color: "#1a1a2e" }}
                >
                  {item.name}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

// ─── PACKAGES COMPARISON ──────────────────────────────────────────────────────
const packageFeatures = [
  { label: "Delivery, Setup & Takedown" },
  { label: "Custom Photo Template" },
  { label: "Digital Media Sharing" },
  { label: "Unlimited Printing" },
  { label: "Premium Backdrop" },
  { label: "Wide Variety of Props" },
  { label: "Audio Guest Book" },
  { label: "Red Carpet" },
  { label: "Velvet Rope Stanchions" },
  { label: "Theme Decorated Background" },
];

const packageTiers = [
  {
    name: "Basic",
    desc: "Everything you need to get started",
    includes: [true, true, true, false, false, false, false, false, false, false],
    bg: "#2e2e2e",
    highlight: false,
    light: false,
  },
  {
    name: "Gold",
    desc: "The most popular choice for any event",
    includes: [true, true, true, true, true, true, false, false, false, false],
    bg: "#141414",
    highlight: true,
    light: false,
  },
  {
    name: "Platinum",
    desc: "The complete luxury experience",
    includes: [true, true, true, true, true, true, true, true, true, true],
    bg: "#efefef",
    highlight: false,
    light: true,
  },
];

function PackageColumn({
  tier,
  index,
  features,
}: {
  tier: (typeof packageTiers)[0];
  index: number;
  features: { label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        background: tier.bg,
        borderRadius: "clamp(16px, 2vw, 24px)",
        padding: "clamp(28px, 3vw, 44px) clamp(20px, 2.5vw, 36px)",
        border: tier.highlight ? "1.5px solid rgba(255,107,53,0.45)" : tier.light ? "1.5px solid rgba(0,0,0,0.1)" : "1.5px solid rgba(255,255,255,0.06)",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {tier.highlight && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#FF6B35",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            padding: "4px 16px",
            borderRadius: 60,
            whiteSpace: "nowrap",
          }}
        >
          Most Popular
        </div>
      )}

      <h3
        className="font-heading"
        style={{
          fontSize: "clamp(26px, 2.5vw, 38px)",
          letterSpacing: "-0.03em",
          color: tier.light ? "#1a1a2e" : "#fff",
          marginBottom: 8,
        }}
      >
        {tier.name}
      </h3>
      <p style={{ fontSize: 14, color: tier.light ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.4)", lineHeight: 1.55, marginBottom: "clamp(24px, 3vw, 36px)" }}>
        {tier.desc}
      </p>

      <div style={{ height: 1, background: tier.light ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.07)", marginBottom: "clamp(20px, 2.5vw, 30px)" }} />

      <ul style={{ flex: 1 }}>
        {features.map((feature, fi) => {
          const included = tier.includes[fi];
          return (
            <li
              key={feature.label}
              className="flex items-center"
              style={{
                gap: 12,
                padding: "clamp(9px, 1.1vw, 13px) 0",
                borderBottom: tier.light ? "1px solid rgba(0,0,0,0.07)" : "1px solid rgba(255,255,255,0.05)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${fi * 55 + 200}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${fi * 55 + 200}ms`,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: included ? "rgba(255,107,53,0.18)" : tier.light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 12,
                  color: included ? "#FF6B35" : tier.light ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
                  fontWeight: 700,
                }}
              >
                {included ? "✓" : "×"}
              </span>
              <span
                style={{
                  fontSize: "clamp(13px, 1vw, 15px)",
                  fontWeight: 400,
                  color: included ? (tier.light ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.75)") : (tier.light ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)"),
                  textDecoration: included ? "none" : "none",
                }}
              >
                {feature.label}
              </span>
            </li>
          );
        })}
      </ul>

      <a
        href="#book"
        className="block text-center transition-all duration-300 hover:opacity-80"
        style={{
          marginTop: "clamp(24px, 3vw, 36px)",
          padding: "clamp(13px, 1.4vw, 16px) 28px",
          background: tier.highlight ? "#FF6B35" : tier.light ? "#1a1a2e" : "rgba(255,255,255,0.1)",
          color: "#fff",
          borderRadius: 60,
          fontSize: 15,
          fontWeight: 700,
          textDecoration: "none",
          border: tier.highlight ? "none" : tier.light ? "none" : "1px solid rgba(255,255,255,0.12)",
        }}
      >
        Book Now
      </a>
    </div>
  );
}

function PackagesComparison() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const circleRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const path = circleRef.current;
    if (!el || !path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    const lines = el.querySelectorAll<HTMLElement>(".draw-line");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      lines.forEach((line, i) => setTimeout(() => { line.style.transform = "translateY(0)"; line.style.opacity = "1"; }, i * 100));
      setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        path.style.transition = "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)";
        path.style.strokeDashoffset = "0";
      })), 700);
      observer.unobserve(el);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="packages"
      style={{
        background: "#141414",
        padding: "clamp(80px, 12vw, 180px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blob */}
      <StickerReveal
        delay={200}
        style={{ position: "absolute", right: "-6vw", top: "10%", zIndex: 0, pointerEvents: "none" }}
      >
        <img
          src="/icons/blob-behind-pricing.svg"
          alt=""
          style={{ width: "clamp(280px, 40vw, 620px)", height: "auto" }}
        />
      </StickerReveal>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ marginBottom: "clamp(56px, 7vw, 88px)", gap: "clamp(20px, 3vw, 32px)" }}
        >
          <h2
            ref={headRef}
            className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#fff" }}
          >
            <span style={{ display: "block" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Find Your
              </span>
            </span>
            <span style={{ display: "block", paddingBottom: "0.3em" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
                Perfect{" "}
                <CircleHighlight
                  text="Package."
                  circleRef={circleRef}
                  stroke="rgba(255,255,255,0.8)"
                  pathD="M98 0 C126 -5, 165 -1, 188 16 C198 28, 198 54, 190 69 C180 85, 154 89, 112 88 C74 87, 38 83, 18 68 C4 55, 4 29, 12 15 C22 0, 54 -3, 80 -3 C88 -4, 94 -2, 106 -2"
                />
              </span>
            </span>
          </h2>

          <RevealOnScroll direction="right">
            <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 320, lineHeight: 1.7 }}>
              Every package includes setup, takedown, a professional on-site attendant, and custom photo templates.
            </p>
          </RevealOnScroll>
        </div>

        {/* 3-column package cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "clamp(16px, 2vw, 24px)", alignItems: "stretch" }}
        >
          {packageTiers.map((tier, i) => (
            <PackageColumn
              key={tier.name}
              tier={tier}
              index={i}
              features={packageFeatures}
            />
          ))}
        </div>

        <RevealOnScroll>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", marginTop: "clamp(32px, 4vw, 56px)" }}>
            Don&apos;t see exactly what you need?{" "}
            <a
              href="#book"
              style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              Let&apos;s build a custom package.
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── WHAT'S INCLUDED ──────────────────────────────────────────────────────────
const includedFeatures = [
  {
    icon: "/icons/setup-takedown.svg",
    title: "Setup & Takedown",
    body: "Our team handles complete installation and dismantling at no extra cost. Your rental time is 100% yours — setup and teardown are entirely on us.",
    accent: "#D4F4A0",
    accentText: "#00B894",
    wide: false,
  },
  {
    icon: "/icons/unlimited-prints.svg",
    title: "Unlimited Photo Prints",
    body: "Print up to 400 standard-sized photos (10×15 cm) or 800 photo strips — enough for every single guest to take a keepsake home.",
    accent: "#FFD6E8",
    accentText: "#E84393",
    wide: false,
  },
  {
    icon: "/icons/props.svg",
    title: "Props for Every Occasion",
    body: "Hats, glasses, mustaches, lip-on-sticks, and a curated selection of themed accessories. Fun guaranteed.",
    accent: "#E8D6FF",
    accentText: "#6C5CE7",
    wide: false,
  },
  {
    icon: "/icons/cutsom-photo-frames.svg",
    title: "Personalized Photo Frames",
    body: "Our graphic designers craft a custom frame tailored to your event theme, logo, or vision. Included with every rental.",
    accent: "#FFF3D4",
    accentText: "#F7C948",
    wide: false,
  },
  {
    icon: "/icons/digitalcopies.svg",
    title: "High-Quality Digital Copies",
    body: "All event photos delivered via a secure download link after your event. Professional-grade quality, ready to share with family and friends.",
    accent: "#D4E8FF",
    accentText: "#0984E3",
    wide: false,
  },
  {
    icon: "/icons/love-by-clients.svg",
    title: "Additional Options",
    body: "Free delivery within 200 km. Backdrop add-ons available for a small fee. Backdrops are 2.60 m × 2.60 m — perfect for any event space.",
    accent: "#FFE4D6",
    accentText: "#FF6B35",
    wide: false,
  },
];

function WhatsIncluded() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const underline1Ref = useRef<SVGPathElement>(null);
  const underline2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const p1 = underline1Ref.current;
    const p2 = underline2Ref.current;
    if (!el || !p1 || !p2) return;
    [p1, p2].forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    const lines = el.querySelectorAll<HTMLElement>(".draw-line");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      lines.forEach((line, i) => setTimeout(() => { line.style.transform = "translateY(0)"; line.style.opacity = "1"; }, i * 100));
      setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        p1.style.transition = "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)";
        p1.style.strokeDashoffset = "0";
      })), 650);
      setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        p2.style.transition = "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)";
        p2.style.strokeDashoffset = "0";
      })), 870);
      observer.unobserve(el);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="included"
      style={{
        background: "#fff",
        padding: "clamp(80px, 12vw, 180px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StickerReveal
        delay={300}
        style={{ position: "absolute", right: "-5vw", bottom: "5%", zIndex: 0, pointerEvents: "none" }}
      >
        <img
          src="/icons/blob-half-behind-premium-backdrops.svg"
          alt=""
          style={{ width: "clamp(260px, 38vw, 580px)", height: "auto", opacity: 0.5 }}
        />
      </StickerReveal>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <div
          className="flex flex-col md:flex-row md:items-start md:justify-between"
          style={{ marginBottom: "clamp(56px, 7vw, 88px)", gap: "clamp(24px, 3vw, 40px)" }}
        >
          <h2
            ref={headRef}
            className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
          >
            <span style={{ display: "block" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Everything
              </span>
            </span>
            <span style={{ display: "block", paddingBottom: "0.35em" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
                <span style={{ position: "relative", display: "inline-block" }}>
                  <em style={{ fontStyle: "italic" }}>Included.</em>
                  <svg aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "20px", overflow: "visible" }}>
                    <path ref={underline1Ref} d="M2 4 C30 1, 70 10, 100 5 C130 0, 168 10, 198 5" fill="none" stroke="#6C5CE7" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                    <path ref={underline2Ref} d="M2 12 C30 9, 70 18, 100 13 C130 8, 168 18, 198 13" fill="none" stroke="#6C5CE7" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  </svg>
                </span>
              </span>
            </span>
          </h2>

          <RevealOnScroll direction="right">
            <div style={{ maxWidth: 380, paddingTop: "clamp(8px, 1vw, 16px)" }}>
              <StickerReveal delay={500} style={{ marginBottom: 16 }}>
                <img src="/icons/book-now-main.svg" alt="" style={{ width: "clamp(56px, 6vw, 80px)", height: "auto" }} />
              </StickerReveal>
              <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#6b7280", lineHeight: 1.75 }}>
                No hidden surprises. Every rental comes packed with everything you need for an unforgettable event.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(14px, 1.8vw, 22px)" }}
        >
          {includedFeatures.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 80}>
              <div
                style={{
                  background: feature.accent,
                  borderRadius: "clamp(16px, 2vw, 24px)",
                  padding: "clamp(28px, 3vw, 44px) clamp(24px, 2.5vw, 36px)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(16px, 2vw, 24px)",
                  transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  const h3 = (e.currentTarget as HTMLElement).querySelector<HTMLElement>("h3");
                  if (h3) h3.style.transform = "rotate(-3deg) translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  const h3 = (e.currentTarget as HTMLElement).querySelector<HTMLElement>("h3");
                  if (h3) h3.style.transform = "rotate(0deg) translateX(0)";
                }}
              >
                <StickerReveal delay={i * 100 + 300}>
                  <img
                    src={feature.icon}
                    alt=""
                    style={{ width: "clamp(48px, 5vw, 64px)", height: "auto" }}
                  />
                </StickerReveal>
                <div>
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: "clamp(18px, 1.6vw, 24px)",
                      letterSpacing: "-0.02em",
                      color: "#1a1a2e",
                      marginBottom: 10,
                      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      display: "inline-block",
                      transformOrigin: "left center",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(14px, 1vw, 16px)",
                      color: "#374151",
                      lineHeight: 1.7,
                      fontWeight: 400,
                    }}
                  >
                    {feature.body}
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const productFaqs = [
  {
    q: "Is installation and dismantling included in my Calgary photo booth rental?",
    a: "Absolutely! Our professional team handles complete installation and dismantling at no additional cost. Everything is set up flawlessly so you can enjoy your Calgary event stress-free.",
  },
  {
    q: "Do Calgary photo booth rentals include unlimited printing?",
    a: "Yes! All our Calgary photo booth rentals include unlimited printing — up to 400 standard-sized photos (10×15 cm) or 800 photo strips during your event.",
  },
  {
    q: "What kind of props do you provide?",
    a: "We bring a wide selection: hats, glasses, mustaches, lip-on-sticks, and themed accessories designed to create fun and unforgettable moments.",
  },
  {
    q: "Can I customize the photo frames for my Calgary photo booth rental?",
    a: "Absolutely. Every Calgary photo booth rental includes a custom-designed photo frame. Pick your logo, text, and design style — our graphic designers bring it to life.",
  },
  {
    q: "Will I get digital copies of the photos after my event?",
    a: "Yes! After your event, you'll receive high-quality digital copies of all photos via a secure download link, ready to share with family and friends.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Visa, MasterCard, and cash. Full payment details are provided upon booking confirmation. Our team is happy to assist with any payment questions.",
  },
];

function ProductsFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq-products"
      style={{
        background: "#f9f9f9",
        padding: "clamp(80px, 12vw, 180px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StickerReveal
        delay={200}
        style={{ position: "absolute", left: "-5vw", top: "10%", zIndex: 0, pointerEvents: "none" }}
      >
        <img
          src="/icons/blob-behind-faq.svg"
          alt=""
          style={{ width: "clamp(260px, 40vw, 640px)", height: "auto", opacity: 0.5 }}
        />
      </StickerReveal>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(20px, 2.5vw, 32px)" }}>
          <StickerReveal delay={200}>
            <img src="/icons/questions-answers.svg" alt="" style={{ width: "clamp(64px, 7vw, 96px)", height: "auto" }} />
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
          <AnimLine>Good</AnimLine>
          <AnimLine>
            <em style={{ fontStyle: "italic" }}>Questions.</em>
          </AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, margin: "0 auto", borderTop: "1px solid #e5e7eb" }}>
          {productFaqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 50}>
              <div style={{ borderBottom: "1px solid #e5e7eb" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
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
                  <p
                    style={{
                      fontSize: "clamp(15px, 1.1vw, 18px)",
                      fontWeight: 400,
                      lineHeight: 1.75,
                      color: "#6b7280",
                      paddingBottom: "clamp(20px, 2.5vw, 32px)",
                      maxWidth: 640,
                    }}
                  >
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

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function ProductsCTA() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const path = underlineRef.current;
    if (!el || !path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    const lines = el.querySelectorAll<HTMLElement>(".draw-line");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      lines.forEach((line, i) => setTimeout(() => { line.style.transform = "translateY(0)"; line.style.opacity = "1"; }, i * 100));
      setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        path.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
        path.style.strokeDashoffset = "0";
      })), 650);
      observer.unobserve(el);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(80px, 12vw, 160px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blob — full opacity, left side */}
      <StickerReveal
        delay={200}
        style={{ position: "absolute", left: "-5vw", bottom: "-10%", zIndex: 0, pointerEvents: "none" }}
      >
        <img
          src="/icons/Asset%201new-blob.svg"
          alt=""
          style={{ width: "clamp(260px, 40vw, 600px)", height: "auto", filter: "hue-rotate(155deg) saturate(0.8)" }}
        />
      </StickerReveal>

      {/* Off-center icon — floated top-right, not centered */}
      <StickerReveal
        delay={400}
        style={{ position: "absolute", top: "8%", right: "6%", zIndex: 2, pointerEvents: "none" }}
      >
        <img
          src="/icons/Asset%203photo-stand.svg"
          alt=""
          style={{ width: "clamp(64px, 8vw, 112px)", height: "auto", transform: "rotate(12deg)" }}
        />
      </StickerReveal>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <h2
          ref={headRef}
          className="font-heading"
          style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(24px, 3vw, 40px)" }}
        >
          <span style={{ display: "block" }}>
            <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
              Ready to make
            </span>
          </span>
          <span style={{ display: "block", paddingBottom: "0.3em" }}>
            <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
              <span style={{ position: "relative", display: "inline-block" }}>
                <em style={{ fontStyle: "italic" }}>memories?</em>
                <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
                  <path ref={underlineRef} d="M2 4 C30 1, 70 11, 100 5 C130 0, 168 11, 198 5" fill="none" stroke="#1a1a2e" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                </svg>
              </span>
            </span>
          </span>
        </h2>

        <RevealOnScroll delay={200}>
          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 21px)",
              color: "#6b7280",
              maxWidth: 500,
              margin: "0 auto clamp(36px, 4.5vw, 60px)",
              lineHeight: 1.75,
            }}
          >
            From intimate birthdays to grand weddings, we&apos;re here to make every moment in Calgary unforgettable.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={350}>
          <a
            href="#book"
            className="transition-all duration-300 hover:opacity-80"
            style={{
              display: "inline-block",
              fontSize: "clamp(15px, 1.1vw, 17px)",
              fontWeight: 700,
              padding: "clamp(14px, 1.5vw, 18px) clamp(36px, 4.5vw, 64px)",
              background: "#FF6B35",
              color: "#fff",
              borderRadius: 60,
              textDecoration: "none",
            }}
          >
            Book Your Booth
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <ProductsHero />
        <BoothPricing />
        <BackdropsGallery />
        <PackagesComparison />
        <WhatsIncluded />
        <ProductsFAQ />
        <BookingCTA headingLine1="Get an Instant Calgary" headingLine2={<em style={{ fontStyle: "italic" }}>Photo Booth Rental Quote</em>} />
        <ProductsCTA />
      </main>
      <Footer />
    </>
  );
}

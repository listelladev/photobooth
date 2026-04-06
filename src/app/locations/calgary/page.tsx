"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";
import StickerReveal from "@/components/StickerReveal";
import BookingCTA from "@/components/BookingCTA";
import CircleHighlight from "@/components/CircleHighlight";

// ─── HERO ──────────────────────────────────────────────────────────────────────
function CalgaryHero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<SVGPathElement>(null);
  const [sticker1, setSticker1] = useState(false);
  const [sticker2, setSticker2] = useState(false);

  useEffect(() => {
    const reveal = (ref: React.RefObject<HTMLSpanElement | null>, ms: number) => {
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.transform = "translateY(0)";
        ref.current.style.opacity = "1";
      }, ms);
    };
    reveal(line1Ref, 100);
    reveal(line2Ref, 240);

    setTimeout(() => {
      if (subRef.current) {
        subRef.current.style.transform = "translateY(0)";
        subRef.current.style.opacity = "1";
      }
    }, 540);

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
    setTimeout(() => setSticker2(true), 950);
  }, []);

  return (
    <section style={{ padding: "clamp(8px, 1vw, 16px)", minHeight: "70vh", display: "flex" }}>
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: "clamp(12px, 1.5vw, 24px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/SalsaPromoHighRes148-scaled-1.png"
            alt="Photo booth rental Calgary"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(125deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.68) 100%)" }} />
        </div>

        {/* Sticker 1 */}
        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker1 ? "scale(1) rotate(-6deg)" : "scale(0) rotate(-18deg)", opacity: sticker1 ? 1 : 0 }}>
            <img src="/icons/love-by-clients.svg" alt="" style={{ width: "clamp(64px, 7vw, 108px)", height: "auto" }} />
          </div>
        </div>

        {/* Sticker 2 */}
        <div className="absolute" style={{ bottom: "20%", right: "5%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker2 ? "scale(1) rotate(8deg)" : "scale(0) rotate(20deg)", opacity: sticker2 ? 1 : 0 }}>
            <img src="/icons/hero-twinkle.svg" alt="" style={{ width: "clamp(44px, 5vw, 76px)", height: "auto" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px, 9vw, 116px) clamp(28px, 6vw, 100px) clamp(8px, 1vw, 12px)" }}>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(48px, 7.5vw, 110px)", lineHeight: 0.96, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(24px, 2.5vw, 36px)" }}
          >
            {/* Line 1 — "Photo Booth" */}
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line1Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Photo Booth
              </span>
            </span>
            {/* Line 2 — "Rental in Calgary." — NO overflow:hidden so the circle SVG is never clipped.
                No whiteSpace:nowrap so it wraps naturally on mobile. Opacity:0 hides the off-screen start. */}
            <span style={{ display: "block", paddingTop: "0.08em", marginTop: "-0.08em", paddingBottom: "0.3em", marginBottom: "-0.3em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.16em", marginRight: "-0.16em" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s" }}>
                Rental in{" "}
                <CircleHighlight
                  text="Calgary."
                  circleRef={circleRef}
                  stroke="rgba(255,107,53,0.9)"
                  pathD="M100 -3 C130 -7, 168 2, 188 20 C202 34, 200 58, 190 72 C176 87, 148 91, 108 90 C68 89, 38 82, 18 68 C4 56, 4 32, 14 17 C26 1, 60 -6, 84 -5 C92 -5, 96 -4, 108 -4"
                />
              </span>
            </span>
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{ fontSize: "clamp(16px, 1.3vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", maxWidth: 620, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}
            >
              Serving Calgary and surrounding areas — from downtown venues to community halls across NW, NE, SW, and SE. Setup, attendant, and digital delivery always included.
            </p>
          </div>

          <div style={{ overflow: "hidden", marginTop: "clamp(28px, 3.5vw, 48px)" }}>
            <RevealOnScroll direction="up">
              <div className="flex flex-wrap" style={{ gap: 14 }}>
                <a
                  href="#book"
                  style={{ display: "inline-block", padding: "clamp(13px, 1.4vw, 16px) clamp(28px, 2.5vw, 36px)", background: "#FF6B35", color: "#fff", borderRadius: 60, fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif", textDecoration: "none", transition: "opacity 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Book in Calgary
                </a>
                <a
                  href="/locations"
                  style={{ display: "inline-block", padding: "clamp(13px, 1.4vw, 16px) clamp(28px, 2.5vw, 36px)", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 60, fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif", textDecoration: "none", border: "1px solid rgba(255,255,255,0.18)", transition: "background 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                >
                  All Locations
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BIG TEXT + PHOTO ─────────────────────────────────────────────────────────
function EditorialSection() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff", overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(48px, 7vw, 100px)", alignItems: "center" }}
        >
          {/* Left — large editorial text */}
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6B35", marginBottom: 24 }}>
                Calgary&apos;s Photo Booth Experts
              </p>
              <AnimatedText
                as="h2"
                className="font-heading"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.03, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(28px, 3vw, 44px)" }}
                stagger={90}
              >
                <AnimLine>Calgary events,</AnimLine>
                <AnimLine>captured the way</AnimLine>
                <AnimLine>they <em style={{ fontStyle: "italic" }}>deserve</em></AnimLine>
                <AnimLine>to be.</AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 20, maxWidth: 500 }}>
                We&apos;ve set up photo booths at hundreds of Calgary events — from intimate birthdays in Beltline lofts to 500-person galas at the Telus Convention Centre. Every event gets the same level of care: custom frames, on-site attendant, and clean professional setup.
              </p>
              <p style={{ fontSize: "clamp(14px, 1vw, 17px)", color: "#9ca3af", lineHeight: 1.8, maxWidth: 500 }}>
                Whether you&apos;re in NW Calgary near the mountains or deep SE by Mahogany — we know the venues, we know the city, and we show up ready to make your event memorable.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap" style={{ gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(36px, 4vw, 52px)" }}>
                {[
                  { num: "500+", label: "Calgary events" },
                  { num: "3", label: "Booth options" },
                  { num: "24hr", label: "Digital delivery" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{ padding: "clamp(16px, 1.8vw, 22px) clamp(20px, 2.2vw, 30px)", background: "#f9f9f9", borderRadius: "clamp(12px, 1.2vw, 16px)", minWidth: 110 }}
                  >
                    <p className="font-heading" style={{ fontSize: "clamp(26px, 2.8vw, 38px)", letterSpacing: "-0.04em", color: "#1a1a2e", lineHeight: 1 }}>
                      {stat.num}
                    </p>
                    <p style={{ fontSize: "clamp(12px, 0.9vw, 14px)", color: "#9ca3af", fontWeight: 500, marginTop: 4, letterSpacing: "0.02em" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — tall photo */}
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "clamp(16px, 2vw, 28px)",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  position: "relative",
                }}
              >
                <img
                  src="/mirror.jpeg"
                  alt="Photo booth at a Calgary event"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.3) 100%)" }} />
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCTS SLIDER ──────────────────────────────────────────────────────────
const sliderProducts = [
  {
    name: "360 PhotoBooth",
    tagline: "The show-stopper",
    desc: "Immerse your guests in an unforgettable slow-motion video experience. Capture every angle, share instantly, and give your Calgary event a moment people won't stop talking about.",
    image: "/360.jpeg",
    accent: "#D4F4A0",
    accentText: "#3d6b00",
    icon: "/icons/360-photobooth.svg",
  },
  {
    name: "Mirror PhotoBooth",
    tagline: "Elegant & interactive",
    desc: "A full-length mirror that doubles as a photo booth. Guests interact with a touch-screen interface, add digital props, sign their name, and walk away with a premium instant print.",
    image: "/mirror.jpeg",
    accent: "#E8D6FF",
    accentText: "#5b21b6",
    icon: "/icons/mirror.svg",
  },
  {
    name: "Salsa PhotoBooth",
    tagline: "Classic & reliable",
    desc: "The original photo booth experience, elevated. Unlimited prints, custom frames, and a curated prop collection — everything your Calgary guests need to capture the night.",
    image: "/salsa.jpeg",
    accent: "#FFD6E8",
    accentText: "#be185d",
    icon: "/icons/salsa-photobooth.svg",
  },
  {
    name: "Premium Backdrops",
    tagline: "Set the scene",
    desc: "Choose from our curated backdrop library or go fully custom. From glam sequins to floral walls — the perfect backdrop transforms your photo into a keepsake worth framing.",
    image: "/SalsaPromoHighRes148-scaled-1.png",
    accent: "#FFD6D6",
    accentText: "#be3535",
    icon: "/icons/backdrops.svg",
  },
];

function ProductsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const headRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  // Sync active dot from scroll position
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild
      ? (track.firstElementChild as HTMLElement).offsetWidth + 24
      : 0;
    const idx = Math.round(track.scrollLeft / cardWidth);
    setActive(Math.max(0, Math.min(sliderProducts.length - 1, idx)));
  }, []);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    setActive(i);
  };

  const prev = () => scrollToIndex(Math.max(0, active - 1));
  const next = () => scrollToIndex(Math.min(sliderProducts.length - 1, active + 1));

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = track.scrollLeft;
    track.style.cursor = "grabbing";
    track.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = dragStartScroll.current - (e.clientX - dragStartX.current);
  };
  const onMouseUp = () => {
    setIsDragging(false);
    const track = trackRef.current;
    if (track) { track.style.cursor = "grab"; track.style.userSelect = ""; }
  };

  // Section heading draw-on animation
  useEffect(() => {
    const el = headRef.current;
    const ul = underlineRef.current;
    if (!el || !ul) return;
    const len = ul.getTotalLength();
    ul.style.strokeDasharray = `${len}`;
    ul.style.strokeDashoffset = `${len}`;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const lines = el.querySelectorAll<HTMLElement>(".draw-line");
      lines.forEach((l, i) => {
        setTimeout(() => { l.style.transform = "translateY(0)"; l.style.opacity = "1"; }, i * 120);
      });
      setTimeout(() => {
        ul.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)";
        ul.style.strokeDashoffset = "0";
      }, 360);
      observer.unobserve(el);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9", overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* Heading row */}
        <div
          style={{
            padding: "0 clamp(24px, 5vw, 80px)",
            marginBottom: "clamp(40px, 5vw, 64px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <h2
            ref={headRef}
            className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Our{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  products.
                  <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible", pointerEvents: "none" }}>
                    <path ref={underlineRef} d="M2 9 C28 3, 72 13, 100 7 C130 1, 168 12, 198 6" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  </svg>
                </span>
              </span>
            </span>
          </h2>

          {/* Arrow buttons — desktop */}
          <div className="hidden md:flex" style={{ gap: 10, paddingBottom: 8 }}>
            {[
              { dir: "prev", onClick: prev, disabled: active === 0, path: "M15 8H1M7 2L1 8l6 6" },
              { dir: "next", onClick: next, disabled: active === sliderProducts.length - 1, path: "M1 8h14M9 2l6 6-6 6" },
            ].map(({ dir, onClick, disabled, path }) => (
              <button
                key={dir}
                onClick={onClick}
                disabled={disabled}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1.5px solid #e5e7eb",
                  background: disabled ? "#f9f9f9" : "#fff",
                  cursor: disabled ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: disabled ? 0.35 : 1,
                  transition: "background 0.2s, opacity 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { if (!disabled) (e.currentTarget.style.borderColor = "#1a1a2e"); }}
                onMouseLeave={e => { (e.currentTarget.style.borderColor = "#e5e7eb"); }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d={path} stroke="#1a1a2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll track */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            display: "flex",
            gap: 24,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
            paddingBottom: 24,
            cursor: "grab",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {sliderProducts.map((product) => (
            <div
              key={product.name}
              style={{
                flexShrink: 0,
                width: "clamp(280px, 40vw, 440px)",
                scrollSnapAlign: "start",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "clamp(16px, 2vw, 24px)",
                  overflow: "hidden",
                  border: "1px solid #ebebeb",
                  height: "100%",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    draggable={false}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 100%)" }} />

                  {/* Tagline badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: product.accent,
                      color: product.accentText,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      padding: "5px 14px",
                      borderRadius: 60,
                    }}
                  >
                    {product.tagline}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "clamp(20px, 2.5vw, 28px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: product.accent, border: "1.5px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                    <h3 className="font-heading" style={{ fontSize: "clamp(20px, 1.8vw, 26px)", letterSpacing: "-0.025em", color: "#1a1a2e", lineHeight: 1.1 }}>
                      {product.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: "clamp(14px, 1vw, 16px)", fontWeight: 400, lineHeight: 1.7, color: "#6b7280", marginBottom: 20 }}>
                    {product.desc}
                  </p>
                  <a
                    href="#book"
                    className="inline-flex items-center"
                    style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", gap: 6, textDecoration: "none", transition: "opacity 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Book Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8, padding: "0 clamp(24px, 5vw, 80px)" }}>
          {sliderProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? "#1a1a2e" : "#d1d5db",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const calgaryFaqs = [
  {
    q: "Do you serve all areas of Calgary?",
    a: "Yes — we cover all quadrants of Calgary, including NW, NE, SW, SE, downtown, and everything in between. Whether you're hosting at a venue in Kensington, a hall in Auburn Bay, or an event space in Bridgeland, we'll be there.",
  },
  {
    q: "How far in advance should I book for a Calgary event?",
    a: "We recommend booking at least 3–4 weeks in advance. For weekend dates in summer (June–September) and around the holidays, 6–8 weeks is safer — Calgary's event season is busy and popular dates go fast.",
  },
  {
    q: "What Calgary venues have you worked at?",
    a: "We've set up at a wide range of Calgary venues — hotel ballrooms, community centres, golf clubs, warehouses, rooftop patios, and private residences. We coordinate directly with your venue coordinator to ensure a smooth setup that fits the space.",
  },
  {
    q: "What's included in every Calgary rental?",
    a: "Every rental includes your choice of photo booth, a professional on-site attendant for the full duration, complete setup and takedown, unlimited instant prints, a curated props collection, and a custom-designed photo frame. Digital delivery of all photos is included within 24 hours.",
  },
  {
    q: "Do you charge travel fees for Calgary events?",
    a: "No travel fees within the Calgary city limits. For events in surrounding communities like Airdrie, Cochrane, or Okotoks, a small travel fee may apply — reach out and we'll confirm pricing upfront.",
  },
  {
    q: "Can I customize the photo frame for my Calgary event?",
    a: "Absolutely. Our in-house designers create a fully custom photo frame tailored to your event theme, colour palette, logo, or message — included at no extra cost with every package.",
  },
  {
    q: "Which photo booth is best for my Calgary event?",
    a: "It depends on the vibe you want. The Mirror Booth brings elegance — great for weddings and corporate galas. The 360° Booth is a social media hit for birthdays and festivals. The Salsa Booth is the reliable classic for any event. We're happy to help you choose during your consultation.",
  },
];

function CalgaryFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff", position: "relative", overflow: "hidden" }}>
      <StickerReveal delay={200} style={{ position: "absolute", left: "-5vw", top: "15%", zIndex: 0, pointerEvents: "none" }}>
        <img src="/icons/blob-behind-faq.svg" alt="" style={{ width: "clamp(280px, 42vw, 660px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(16px, 2vw, 24px)" }}>
          <StickerReveal delay={200}>
            <img src="/icons/questions-answers.svg" alt="" style={{ width: "clamp(72px, 7vw, 100px)", height: "auto" }} />
          </StickerReveal>
        </div>

        <AnimatedText
          as="h2"
          className="font-heading"
          style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(48px, 6vw, 80px)", textAlign: "center" }}
          stagger={90}
        >
          <AnimLine>Calgary</AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Questions.</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {calgaryFaqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 50}>
              <div style={{ borderBottom: "1px solid #e5e7eb" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                  style={{ padding: "clamp(20px, 2.5vw, 32px) 0", background: "none", border: "none" }}
                >
                  <span className="font-heading" style={{ fontSize: "clamp(17px, 1.3vw, 22px)", color: "#1a1a2e", paddingRight: 32, letterSpacing: "-0.01em" }}>
                    {faq.q}
                  </span>
                  <span style={{ flexShrink: 0, transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)", transform: open === i ? "rotate(45deg)" : "none", fontSize: 24, color: "#1a1a2e", lineHeight: 1 }}>
                    +
                  </span>
                </button>
                <div className="overflow-hidden" style={{ maxHeight: open === i ? 400 : 0, transition: "max-height 0.6s cubic-bezier(0.22,1,0.36,1)" }}>
                  <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", fontWeight: 400, lineHeight: 1.75, color: "#6b7280", paddingBottom: "clamp(20px, 2.5vw, 32px)", maxWidth: 640 }}>
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

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function CalgaryPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <CalgaryHero />
        <EditorialSection />
        <ProductsSlider />
        <CalgaryFAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

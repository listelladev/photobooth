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

// ── Types ──────────────────────────────────────────────────────────────────────
export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "bullets"; items: string[] };

export interface LocationData {
  /** City name — used in hero circle, headings, and CTA. E.g. "Airdrie" */
  city: string;
  /** Meta description also used as hero subtitle */
  heroSubtitle: string;
  /** Paragraphs for the intro (editorial section), before the event-type bullet list */
  introParagraphs: string[];
  /** Bullet list: event types served in this city */
  eventTypes: string[];
  /** Paragraph after the bullet list */
  introClosure: string;
  /** Blog-style content blocks for the section below the products slider */
  contentBlocks: ContentBlock[];
  /** FAQ items */
  faqs: Array<{ q: string; a: string }>;
  /** Three-sentence CTA body text */
  ctaSubtext: string;
  /** Path to the location's featured image (used in hero bg + editorial column) */
  image: string;
}

// ── Products slider data (identical across all location pages) ─────────────────
const sliderProducts = [
  {
    name: "Compact Pole PhotoBooth",
    tagline: "Space-saving & fun",
    desc: "A sleek, space-saving pole booth that delivers big on fun. Perfect for intimate gatherings and venues where space is at a premium — prints, props, and smiles included.",
    image: "/salsa.jpeg",
    accent: "#FFD6E8",
    accentText: "#be185d",
    icon: "/icons/salsa-photobooth.svg",
  },
  {
    name: "Premium Pole PhotoBooth",
    tagline: "Polished & premium",
    desc: "Upgrade the classic booth experience with premium hardware and a polished finish. Crisp, high-quality prints paired with a sleek stand that looks as great as the photos it produces.",
    image: "/salsa-photobooth.jpg",
    accent: "#FDE8C8",
    accentText: "#c2410c",
    icon: "/icons/salsa-photobooth.svg",
  },
  {
    name: "AI PhotoBooth",
    tagline: "Next-generation",
    desc: "Next-generation booth powered by AI. Generate stunning, personalized digital portraits with unique artistic styles and instant sharing — the most talked-about booth at any event.",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1200&auto=format&fit=crop",
    accent: "#C8E6FF",
    accentText: "#1e40af",
    icon: "/icons/360-photobooth.svg",
  },
  {
    name: "360 VideoBooth",
    tagline: "The show-stopper",
    desc: "Immerse your guests in an unforgettable experience by renting a 360-degree video booth for your event or celebration! Capture every angle, create stunning videos, and make lasting memories.",
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
    name: "Audio GuestBook",
    tagline: "Capture every voice",
    desc: "Give your guests a voice. Record heartfelt audio messages, well-wishes, and memories that you can listen back to for years to come — a truly timeless keepsake for any celebration.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    accent: "#C8F5E8",
    accentText: "#065f46",
    icon: "/icons/backdrops.svg",
  },
  {
    name: "Premium Backdrops",
    tagline: "Set the scene",
    desc: "Add a touch of celebration to your event with our vibrant collection of high quality photo booth backdrops. Create a fun and festive atmosphere while capturing unforgettable memories.",
    image: "/SalsaPromoHighRes148-scaled-1.png",
    accent: "#FFD6D6",
    accentText: "#be3535",
    icon: "/icons/backdrops.svg",
  },
  {
    name: "Instant High Quality Printing",
    tagline: "Take it home",
    desc: "Walk away with a tangible memory in seconds. Our professional-grade printers deliver vibrant, lab-quality prints that guests can take home from your event — no waiting, no compromise.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    accent: "#FFF3C8",
    accentText: "#92400e",
    icon: "/icons/unlimited-prints.svg",
  },
];

// ── Hero ───────────────────────────────────────────────────────────────────────
function LocationHero({ city, subtitle, image }: { city: string; subtitle: string; image: string }) {
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
        <div className="absolute inset-0">
          <img
            src={image}
            alt={`Photo booth rental ${city}`}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(125deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.68) 100%)" }} />
        </div>

        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker1 ? "scale(1) rotate(-6deg)" : "scale(0) rotate(-18deg)", opacity: sticker1 ? 1 : 0 }}>
            <img src="/icons/love-by-clients.svg" alt="" style={{ width: "clamp(64px, 7vw, 108px)", height: "auto" }} />
          </div>
        </div>

        <div className="absolute" style={{ bottom: "20%", right: "5%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker2 ? "scale(1) rotate(8deg)" : "scale(0) rotate(20deg)", opacity: sticker2 ? 1 : 0 }}>
            <img src="/icons/hero-twinkle.svg" alt="" style={{ width: "clamp(44px, 5vw, 76px)", height: "auto" }} />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px, 9vw, 116px) clamp(28px, 6vw, 100px) clamp(8px, 1vw, 12px)" }}>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(48px, 7.5vw, 110px)", lineHeight: 0.96, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(24px, 2.5vw, 36px)" }}
          >
            <span style={{ display: "block", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.3em", marginBottom: "-0.3em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.16em", marginRight: "-0.16em" }}>
              <span ref={line1Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                <CircleHighlight
                  text={city}
                  circleRef={circleRef}
                  stroke="rgba(255,107,53,0.9)"
                  pathD="M100 -3 C130 -7, 168 2, 188 20 C202 34, 200 58, 190 72 C176 87, 148 91, 108 90 C68 89, 38 82, 18 68 C4 56, 4 32, 14 17 C26 1, 60 -6, 84 -5 C92 -5, 96 -4, 108 -4"
                />
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.08em", marginTop: "-0.08em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s" }}>
                Photo Booth Rental.
              </span>
            </span>
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{ fontSize: "clamp(16px, 1.3vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", maxWidth: 620, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}
            >
              {subtitle}
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
                  Book in {city}
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

// ── Editorial section ──────────────────────────────────────────────────────────
const editorialPool = [
  "/pool/Create_an_image_using_the_atta (1).jpg",
  "/pool/Create_an_image_using_the_atta (2).jpg",
  "/pool/Create_an_image_using_the_atta (5).jpg",
  "/pool/Create_an_image_using_the_atta (7).jpg",
  "/pool/Create_an_image_using_the_atta (8).jpg",
  "/pool/Create_an_image_using_the_atta (9).jpg",
  "/pool/Create_an_image_using_the_atta (13).jpg",
  "/pool/birthday-featured.jpg",
  "/pool/Create_an_image_using_the_atta (13).jpg",
  "/pool/Create_an_image_using_the_atta (14).jpg",
  "/pool/gender-reveal.jpg",
  "/pool/Create_an_image_using_the_atta (16).jpg",
  "/pool/Create_an_image_using_the_atta (17).jpg",
  "/pool/Create_an_image_using_the_atta (18).jpg",
  "/pool/Create_an_image_using_the_atta (19).jpg",
  "/pool/Create_an_image_using_the_atta (20).jpg",
  "/pool/Create_an_image_using_the_atta (21).jpg",
  "/pool/Create_an_image_using_the_atta.jpg",
  "/pool/remove_the__a_night_to_remembe.jpg",
  "/pool/remove_the_text_on_the_pointer.jpg",
  "/pool/remove_the_word__backdrop__any.jpg",
];

function EditorialSection({ data }: { data: LocationData }) {
  const editorialImage = editorialPool[
    data.city.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % editorialPool.length
  ];
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff", overflow: "clip" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(48px, 7vw, 100px)", alignItems: "start" }}
        >
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6B35", marginBottom: 24 }}>
                {data.city}&apos;s Photo Booth Experts
              </p>
              <AnimatedText
                as="h2"
                className="font-heading"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.03, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(28px, 3vw, 44px)" }}
                stagger={90}
              >
                <AnimLine>{data.city} Photo</AnimLine>
                <AnimLine>Booth <em style={{ fontStyle: "italic" }}>Rentals</em></AnimLine>
              </AnimatedText>

              {data.introParagraphs.map((para, i) => (
                <p key={i} style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 16, maxWidth: 500 }}>
                  {para}
                </p>
              ))}

              <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 8, maxWidth: 500 }}>
                {data.city === "Calgary"
                  ? "We provide photo booth rentals across Calgary for:"
                  : `Photobooth Experience provides photo booth rentals throughout ${data.city} for:`}
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "clamp(18px, 2vw, 24px)", marginBottom: 16, maxWidth: 500 }}>
                {data.eventTypes.map(item => (
                  <li key={item} style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#6b7280", lineHeight: 1.8 }}>{item}</li>
                ))}
              </ul>
              <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#6b7280", lineHeight: 1.8, maxWidth: 500 }}>
                {data.introClosure}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={150} className="lg:sticky lg:top-24">
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "clamp(16px, 2vw, 28px)", overflow: "hidden", aspectRatio: "3/4", position: "relative" }}>
                <img
                  src={editorialImage}
                  alt={`Photo booth at a ${data.city} event`}
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

// ── Products slider ────────────────────────────────────────────────────────────
function ProductsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const headRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

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
        <div style={{ padding: "0 clamp(24px, 5vw, 80px)", marginBottom: "clamp(40px, 5vw, 64px)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <h2 ref={headRef} className="font-heading" style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}>
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
          <div className="hidden md:flex" style={{ gap: 10, paddingBottom: 8 }}>
            {[
              { dir: "prev", onClick: prev, disabled: active === 0, path: "M15 8H1M7 2L1 8l6 6" },
              { dir: "next", onClick: next, disabled: active === sliderProducts.length - 1, path: "M1 8h14M9 2l6 6-6 6" },
            ].map(({ dir, onClick, disabled, path }) => (
              <button key={dir} onClick={onClick} disabled={disabled}
                style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid #e5e7eb", background: disabled ? "#f9f9f9" : "#fff", cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: disabled ? 0.35 : 1, transition: "background 0.2s, opacity 0.2s, border-color 0.2s" }}
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

        <div
          ref={trackRef}
          onScroll={onScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{ display: "flex", gap: 24, overflowX: "auto", scrollSnapType: "x mandatory", paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)", paddingBottom: 24, cursor: "grab", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {sliderProducts.map((product) => (
            <div key={product.name} style={{ flexShrink: 0, width: "clamp(280px, 40vw, 440px)", scrollSnapAlign: "start" }}>
              <div style={{ background: "#fff", borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", border: "1px solid #ebebeb", height: "100%" }}>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover"
                    style={{ transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    draggable={false}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 100%)" }} />
                  <span style={{ position: "absolute", top: 16, left: 16, background: product.accent, color: product.accentText, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "5px 14px", borderRadius: 60 }}>
                    {product.tagline}
                  </span>
                </div>
                <div style={{ padding: "clamp(20px, 2.5vw, 28px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: product.accent, border: "1.5px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                    <h3 className="font-heading" style={{ fontSize: "clamp(20px, 1.8vw, 26px)", letterSpacing: "-0.025em", color: "#1a1a2e", lineHeight: 1.1 }}>{product.name}</h3>
                  </div>
                  <p style={{ fontSize: "clamp(14px, 1vw, 16px)", fontWeight: 400, lineHeight: 1.7, color: "#6b7280", marginBottom: 20 }}>{product.desc}</p>
                  <a href="#book" className="inline-flex items-center"
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

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8, padding: "0 clamp(24px, 5vw, 80px)" }}>
          {sliderProducts.map((_, i) => (
            <button key={i} onClick={() => scrollToIndex(i)}
              style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? "#1a1a2e" : "#d1d5db", border: "none", padding: 0, cursor: "pointer", transition: "width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s" }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Content section ────────────────────────────────────────────────────────────
function ContentSection({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        {blocks.map((block, i) => {
          const nextIsH2 = blocks[i + 1]?.type === "h2";
          if (block.type === "h2") {
            return (
              <RevealOnScroll key={i}>
                <h2 className="font-heading" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.03em", color: "#141414", marginBottom: "clamp(16px, 2vw, 24px)", marginTop: i === 0 ? 0 : "clamp(48px, 6vw, 72px)", lineHeight: 1.1 }}>
                  {block.text}
                </h2>
              </RevealOnScroll>
            );
          }
          if (block.type === "h3") {
            return (
              <h3 key={i} className="font-heading" style={{ fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: "-0.02em", color: "#141414", marginBottom: 10, marginTop: 32, lineHeight: 1.2 }}>
                {block.text}
              </h3>
            );
          }
          if (block.type === "p") {
            return (
              <p key={i} style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: nextIsH2 ? 0 : 20 }}>
                {block.text}
              </p>
            );
          }
          if (block.type === "bullets") {
            return (
              <ul key={i} style={{ listStyle: "disc", paddingLeft: "clamp(18px, 2vw, 24px)", marginBottom: 20 }}>
                {block.items.map(item => (
                  <li key={item} style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8 }}>{item}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────────
function LocationFAQ({ city, faqs }: { city: string; faqs: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  const headRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff", position: "relative", overflow: "hidden" }}>
      <StickerReveal delay={200} style={{ position: "absolute", left: "-5vw", top: "15%", zIndex: 0, pointerEvents: "none" }}>
        <img src="/icons/blob-behind-faq.svg" alt="" style={{ width: "clamp(280px, 42vw, 660px)", height: "auto" }} />
      </StickerReveal>

      <div ref={headRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>
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
          <AnimLine>{city} Photo Booth</AnimLine>
          <AnimLine>Rental <em style={{ fontStyle: "italic" }}>FAQ</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {faqs.map((faq, i) => (
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

// ── Page export ────────────────────────────────────────────────────────────────
export default function LocationPage({ data }: { data: LocationData }) {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <LocationHero city={data.city} subtitle={data.heroSubtitle} image={data.image} />
        <EditorialSection data={data} />
        <ProductsSlider />
        <ContentSection blocks={data.contentBlocks} />
        <LocationFAQ city={data.city} faqs={data.faqs} />
        <BookingCTA
          headingLine1={`Book Your ${data.city}`}
          headingLine2={<em style={{ fontStyle: "italic" }}>Photo Booth Rental.</em>}
          subtext={data.ctaSubtext}
        />
      </main>
      <Footer />
    </>
  );
}

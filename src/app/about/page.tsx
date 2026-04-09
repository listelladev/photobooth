"use client";

import { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";
import StickerReveal from "@/components/StickerReveal";
import CircleHighlight from "@/components/CircleHighlight";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";

// ─── HERO ──────────────────────────────────────────────────────────────────────
function AboutHero() {
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
            src="/about-hero.webp.png"
            alt="About Photobooth Experience"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.74) 100%)" }} />
        </div>

        <div className="absolute" style={{ top: "12%", right: "8%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker1 ? "scale(1) rotate(0deg)" : "scale(0) rotate(-18deg)", opacity: sticker1 ? 1 : 0 }}>
            <img src="/icons/hero-camera.svg" alt="" style={{ width: "clamp(52px, 7vw, 100px)", height: "auto" }} />
          </div>
        </div>

        <div className="absolute" style={{ bottom: "18%", right: "6%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker2 ? "scale(1) rotate(6deg)" : "scale(0) rotate(-18deg)", opacity: sticker2 ? 1 : 0 }}>
            <img src="/icons/unforgettable.svg" alt="" style={{ width: "clamp(72px, 8vw, 116px)", height: "auto" }} />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px, 9vw, 116px) clamp(28px, 6vw, 100px) clamp(8px, 1vw, 12px)" }}>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(48px, 7.5vw, 110px)", lineHeight: 0.96, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(24px, 2.5vw, 36px)" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line1Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Our
              </span>
            </span>
            <span style={{ display: "block", paddingTop: "0.08em", marginTop: "-0.08em", paddingBottom: "0.3em", marginBottom: "-0.3em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.16em", marginRight: "-0.16em" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s" }}>
                <CircleHighlight
                  text="Story."
                  circleRef={circleRef}
                  stroke="rgba(255,107,53,0.9)"
                  pathD="M76 0 C98 -5, 136 1, 155 16 C163 28, 163 54, 154 70 C142 84, 116 89, 86 88 C56 87, 28 80, 12 66 C1 52, 1 28, 9 14 C18 0, 46 -4, 64 -3 C72 -4, 75 -1, 86 -1"
                />
              </span>
            </span>
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{ fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", maxWidth: 600, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}
            >
              Premium photo booth rentals built on one belief — every moment deserves to be remembered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BRAND STORY — image LEFT, text RIGHT ─────────────────────────────────────
function BrandStory() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(56px, 8vw, 140px)", alignItems: "center" }}>

          {/* Image — LEFT */}
          <RevealOnScroll direction="left">
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "clamp(16px, 2vw, 28px)", overflow: "hidden", aspectRatio: "4/5" }}>
                <img
                  src="/SalsaPromoHighRes148-scaled-1.png"
                  alt="Photobooth Experience in action"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </div>
          </RevealOnScroll>

          {/* Text — RIGHT */}
          <RevealOnScroll direction="right" delay={150}>
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6B35", marginBottom: 20 }}>
                Who We Are
              </p>
              <AnimatedText
                as="h2"
                className="font-heading"
                style={{ fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 1.03, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(28px, 3vw, 40px)" }}
                stagger={90}
              >
                <AnimLine>Built for the</AnimLine>
                <AnimLine>moments that</AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>matter most.</em></AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 24, maxWidth: 480 }}>
                Photobooth Experience was founded right here in Calgary with a simple mission: to bring premium, professionally curated photo booth experiences to events across Southern Alberta.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8, maxWidth: 480 }}>
                From intimate backyard celebrations to large-scale corporate gatherings, we show up fully prepared — with top-tier equipment, a dedicated attendant, and a genuine love for what we do.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}

// ─── POPULAR PRODUCTS — 3 cards + View All ────────────────────────────────────
const featuredProducts = [
  {
    name: "360 VideoBooth",
    description: "Immerse your guests in an unforgettable experience — capture every angle, create stunning slow-motion videos, and make lasting memories with this interactive addition.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    accent: "#D4F4A0",
    iconSrc: "/icons/360-photobooth.svg",
  },
  {
    name: "Mirror PhotoBooth",
    description: "A touch of elegance and fun — guests interact with a sleek full-length mirror that captures unique moments and prints stunning keepsakes on the spot.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    accent: "#E8D6FF",
    iconSrc: "/icons/mirror.svg",
  },
  {
    name: "Premium Pole PhotoBooth",
    description: "The classic photo booth experience, elevated. Unlimited instant prints, custom frames, and a curated props collection — everything your guests need to have a blast.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop",
    accent: "#FDE8C8",
    iconSrc: "/icons/salsa-photobooth.svg",
  },
];

function PopularProducts() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9", position: "relative", overflow: "hidden" }}>
      <StickerReveal
        delay={400}
        style={{ position: "absolute", right: "-5vw", bottom: "5%", zIndex: 0, pointerEvents: "none" }}
      >
        <img src="/icons/blob-half-behind-premium-backdrops.svg" alt="" style={{ width: "clamp(280px, 40vw, 620px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <AnimatedText
            as="h2"
            className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
            stagger={90}
          >
            <AnimLine>Our most</AnimLine>
            <AnimLine><em style={{ fontStyle: "italic" }}>popular</em> booths.</AnimLine>
          </AnimatedText>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {featuredProducts.map((product, i) => (
            <RevealOnScroll key={product.name} delay={i * 100}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid #ebebeb",
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                    />
                  </div>
                  <div style={{ padding: "clamp(20px, 2.5vw, 28px)" }}>
                    <div className="flex items-center" style={{ gap: 10, marginBottom: 10 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: product.accent, border: "1.5px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 1.8vw, 26px)", letterSpacing: "-0.025em", color: "#1a1a2e" }}>{product.name}</h3>
                    </div>
                    <p style={{ fontSize: "clamp(14px, 1vw, 16px)", fontWeight: 400, lineHeight: 1.7, color: "#6b7280", marginBottom: 20 }}>{product.description}</p>
                    <a href="/contact" className="inline-flex items-center transition-opacity duration-300 hover:opacity-70" style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", gap: 6, textDecoration: "none" }}>
                      Book Now
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* View All — centered orange button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(36px, 4vw, 56px)" }}>
          <a
            href="/products"
            className="transition-all duration-300 hover:opacity-80"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, padding: "14px 44px", background: "#FF6B35", color: "#fff", borderRadius: 60, textDecoration: "none" }}
          >
            View All Products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── OUR VALUES (dark editorial panel) ───────────────────────────────────────
const values = [
  {
    num: "01",
    accent: "#FFD6E8",
    accentText: "#be185d",
    title: "Premium Equipment",
    body: "We invest in the best-in-class hardware and software so your photos look stunning — whether printed on the spot or shared digitally.",
  },
  {
    num: "02",
    accent: "#D4F4A0",
    accentText: "#3d6b00",
    title: "Hassle-Free Service",
    body: "From setup to takedown, our professional team handles everything. You focus on your guests — we handle the rest.",
  },
  {
    num: "03",
    accent: "#E8D6FF",
    accentText: "#5b21b6",
    title: "True Customization",
    body: "Every event is unique. We customize frames, backdrops, and layouts to match your theme — always with a design preview before your event.",
  },
  {
    num: "04",
    accent: "#B5F0FF",
    accentText: "#0369a1",
    title: "Southern Alberta Proud",
    body: "We're a local Calgary business. We know these venues, these roads, and we take pride in serving our community.",
  },
];

function OurValues() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        <RevealOnScroll>
          <div style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
            <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6B35", marginBottom: 20 }}>
              What We Stand For
            </p>
            <AnimatedText
              as="h2"
              className="font-heading"
              style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
              stagger={90}
            >
              <AnimLine>Our values,</AnimLine>
              <AnimLine><em style={{ fontStyle: "italic" }}>your experience.</em></AnimLine>
            </AnimatedText>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {values.map((card, i) => (
            <RevealOnScroll key={card.num} delay={i * 70}>
              <div
                style={{
                  background: "#f9f9f9",
                  borderRadius: "clamp(16px, 1.8vw, 22px)",
                  padding: "clamp(24px, 2.5vw, 36px)",
                  border: "1px solid #f0f0f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  height: "100%",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    background: card.accent,
                    color: card.accentText,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    padding: "4px 12px",
                    borderRadius: 60,
                  }}
                >
                  {card.num}
                </span>
                <h3 className="font-heading" style={{ fontSize: "clamp(17px, 1.4vw, 20px)", letterSpacing: "-0.025em", color: "#1a1a2e", lineHeight: 1.2, margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#6b7280", lineHeight: 1.75, margin: 0 }}>
                  {card.body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY — 3-col square grid ──────────────────────────────────────────────
const galleryImages = [
  { src: "/backdrops/Abstract.jpeg", alt: "Abstract backdrop" },
  { src: "/backdrops/Flowers 1.jpeg", alt: "Floral backdrop" },
  { src: "/backdrops/Black & Gold Glitter.jpeg", alt: "Black and gold glitter backdrop" },
  { src: "/backdrops/Balloons.jpeg", alt: "Balloon backdrop" },
  { src: "/SalsaPromoHighRes148-scaled-1.png", alt: "Photo booth in action" },
  { src: "/backdrops/Glitter.jpeg", alt: "Glitter backdrop" },
  { src: "/backdrops/Flowers 2.jpeg", alt: "Floral backdrop 2" },
  { src: "/backdrops/Party.jpeg", alt: "Party backdrop" },
  { src: "/backdrops/Flowers 3.jpeg", alt: "Floral backdrop 3" },
];

function Gallery() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        <RevealOnScroll>
          <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
            <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6B35", marginBottom: 20 }}>
              Gallery
            </p>
            <AnimatedText
              as="h2"
              className="font-heading"
              style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
              stagger={90}
            >
              <AnimLine>Every shot,</AnimLine>
              <AnimLine><em style={{ fontStyle: "italic" }}>a memory.</em></AnimLine>
            </AnimatedText>
          </div>
        </RevealOnScroll>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(8px, 1vw, 16px)",
          }}
        >
          {galleryImages.map((img, i) => (
            <RevealOnScroll key={img.src} delay={i * 50}>
              <div
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "clamp(8px, 1vw, 16px)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section style={{ padding: "0 clamp(8px, 1vw, 16px)", paddingBottom: "clamp(8px, 1vw, 16px)" }}>
      <RevealOnScroll>
        <div
          style={{
            background: "#141414",
            borderRadius: "clamp(12px, 1.5vw, 24px)",
            padding: "clamp(56px, 9vw, 120px) clamp(28px, 6vw, 100px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <StickerReveal delay={300} style={{ position: "absolute", left: "5vw", top: "50%", transform: "translateY(-50%)", zIndex: 0, pointerEvents: "none" }}>
            <img src="/icons/unforgettable-2.svg" alt="" style={{ width: "clamp(80px, 10vw, 140px)", height: "auto" }} />
          </StickerReveal>
          <StickerReveal delay={500} style={{ position: "absolute", right: "5vw", top: "50%", transform: "translateY(-50%)", zIndex: 0, pointerEvents: "none" }}>
            <img src="/icons/hero-camera.svg" alt="" style={{ width: "clamp(80px, 10vw, 140px)", height: "auto" }} />
          </StickerReveal>

          <div style={{ position: "relative", zIndex: 1 }}>
            <StickerReveal delay={200} style={{ display: "inline-block", marginBottom: 24 }}>
              <img src="/icons/letsgo.svg" alt="" style={{ width: "clamp(56px, 5vw, 80px)", height: "auto" }} />
            </StickerReveal>
            <AnimatedText
              as="h2"
              className="font-heading"
              style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#fff", marginBottom: "clamp(24px, 2.5vw, 36px)" }}
              stagger={90}
            >
              <AnimLine>Ready to make</AnimLine>
              <AnimLine>memories<em style={{ fontStyle: "italic" }}>?</em></AnimLine>
            </AnimatedText>
            <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto clamp(36px, 4vw, 56px)" }}>
              Let&apos;s chat about your event. We&apos;ll help you find the right package, confirm your date, and take care of everything from there.
            </p>
            <a
              href="/contact"
              className="transition-all duration-300 hover:opacity-80"
              style={{ display: "inline-block", fontSize: "clamp(15px, 1.1vw, 17px)", fontWeight: 700, padding: "clamp(14px, 1.5vw, 18px) clamp(36px, 4vw, 56px)", background: "#FF6B35", color: "#fff", borderRadius: 60, textDecoration: "none" }}
            >
              Book Now
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <AboutHero />
        <BrandStory />
        <Benefits />
        <PopularProducts />
        <Testimonials />
        <OurValues />
        <AboutCTA />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}

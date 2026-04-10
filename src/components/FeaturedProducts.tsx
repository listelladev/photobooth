"use client";

import { useState, useEffect, useRef } from "react";
import RevealOnScroll from "./RevealOnScroll";
import StickerReveal from "./StickerReveal";
import CircleHighlight from "./CircleHighlight";

function stickerStyle(popped: boolean): React.CSSProperties {
  return {
    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
    transform: popped ? "scale(1) rotate(0deg)" : "scale(0) rotate(-18deg)",
    opacity: popped ? 1 : 0,
    transformOrigin: "center center",
  };
}

type StickerPlacement =
  | "above-card"   // absolute on outer wrapper (can clip card edge)
  | "inside-image" // absolute inside the overflow:hidden image div
  | "image-bottom"; // absolute on image-area wrapper, outside image overflow:hidden (straddles image bottom)

const products = [
  {
    name: "Compact Pole PhotoBooth",
    href: "/products/compact-pole-photobooth",
    description:
      "A sleek, space-saving pole booth that delivers big on fun. Perfect for intimate gatherings and venues where space is at a premium — prints, props, and smiles included.",
    images: [
      "/products/compact-pole-photobooth/Compact%20Pole%20PhotoBooth%201.jpg",
      "/products/compact-pole-photobooth/Compact%20Pole%20PhotoBooth%202.jpg",
    ],
    iconSrc: "/icons/pool-of-icons/hero-camera.svg",
    accent: "#FFD6E8",
    iconPlacement: "image-bottom" as StickerPlacement,
    iconPos: { bottom: -28, left: 14 } as React.CSSProperties,
  },
  {
    name: "Premium Pole PhotoBooth",
    href: "/products/premium-pole-photobooth",
    description:
      "Upgrade the classic booth experience with premium hardware and a polished finish. Crisp, high-quality prints paired with a sleek stand that looks as great as the photos it produces.",
    images: [
      "/products/premium-backdrops/Premium%20Pole%20PhotoBooth1.jpg",
      "/products/premium-backdrops/premium%20pole%20photobooth%202.jpg",
    ],
    iconSrc: "/icons/pool-of-icons/Asset%203photo-stand.svg",
    accent: "#FDE8C8",
    iconPlacement: "above-card" as StickerPlacement,
    iconPos: { top: -18, left: -10 } as React.CSSProperties,
  },
  {
    name: "AI PhotoBooth",
    href: "/products/ai-photobooth",
    description:
      "Next-generation booth powered by AI. Generate stunning, personalized digital portraits with unique artistic styles and instant sharing — the most talked-about booth at any event.",
    images: [
      "/products/ai-photobooth/ai%20photobooth%201.jpg",
      "/products/ai-photobooth/ai%20photobooth%202.jpg",
    ],
    iconSrc: "/icons/pool-of-icons/unforgettable-2.svg",
    accent: "#C8E6FF",
    iconPlacement: "above-card" as StickerPlacement,
    iconPos: { top: "20%", left: -10 } as React.CSSProperties,
  },
  {
    name: "360 VideoBooth",
    href: "/products/360-videobooth",
    description:
      "Immerse your guests in an unforgettable experience by renting a 360-degree video booth for your event or celebration! Capture every angle, create stunning videos, and make lasting memories.",
    images: [
      "/products/360-videobooth/360%20video%20booth%201.jpg",
      "/products/360-videobooth/360%20videobooth%202.jpeg",
    ],
    iconSrc: "/icons/360-photobooth.svg",
    accent: "#D4F4A0",
    iconPlacement: "inside-image" as StickerPlacement,
    iconPos: { bottom: 118, right: 14 } as React.CSSProperties,
  },
  {
    name: "Mirror PhotoBooth",
    href: "/products/mirror-photobooth",
    description:
      "Immerse yourself in the captivating experience of a photo mirror at your special event. This interactive and innovative feature brings a touch of elegance and fun, allowing guests to capture unique moments with a simple touch.",
    images: [
      "/products/mirror-photobooth/mirror%20photobooth%201.jpg",
      "/products/mirror-photobooth/mirror%20photobooth%202.jpg",
    ],
    iconSrc: "/icons/mirror.svg",
    accent: "#E8D6FF",
    iconPlacement: "above-card" as StickerPlacement,
    iconPos: { top: -18, left: -10 } as React.CSSProperties,
  },
  {
    name: "Audio GuestBook",
    href: "/products/audio-guestbook",
    description:
      "Give your guests a voice. Record heartfelt audio messages, well-wishes, and memories that you can listen back to for years to come — a truly timeless keepsake for any celebration.",
    images: [
      "/products/audio-guestbook/audio%20guestbook%201.jpg",
      "/products/audio-guestbook/audio%20guestbook2.png",
    ],
    iconSrc: "/icons/pool-of-icons/Asset%202music-note.svg",
    accent: "#C8F5E8",
    iconPlacement: "image-bottom" as StickerPlacement,
    iconPos: { bottom: -28, left: 14 } as React.CSSProperties,
  },
  {
    name: "Premium Backdrops",
    href: "/products/premium-backdrops",
    description:
      "Add a touch of celebration to your event with our vibrant collection of high quality photo booth backdrops! Create a fun and festive atmosphere while capturing unforgettable memories. Contact us for backdrop catalogue.",
    images: [
      "/products/premium-backdrops/premium%20backdrops%201.jpg",
      "/products/premium-backdrops/premium%20backdrops%202.jpg",
    ],
    iconSrc: "/icons/backdrops.svg",
    accent: "#FFD6D6",
    iconPlacement: "above-card" as StickerPlacement,
    iconPos: { top: "20%", left: -10 } as React.CSSProperties,
  },
  {
    name: "Instant High Quality Printing",
    href: "/products/instant-high-quality-printing",
    description:
      "Walk away with a tangible memory in seconds. Our professional-grade printers deliver vibrant, lab-quality prints that guests can take home from your event — no waiting, no compromise.",
    images: [
      "/products/instant-high-quality-printing/instant%20high%20quality%20prints%201.jpg",
      "/products/instant-high-quality-printing/instant%20high%20quality%20prints%202.jpg",
    ],
    iconSrc: "/icons/unlimited-prints.svg",
    accent: "#FFF3C8",
    iconPlacement: "inside-image" as StickerPlacement,
    iconPos: { bottom: 118, right: 14 } as React.CSSProperties,
  },
];

function ProductsHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGPathElement>(null);
  const [smileyPopped, setSmileyPopped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ul = underlineRef.current;
    const cl = circleRef.current;
    if (ul) { const len = ul.getTotalLength(); ul.style.strokeDasharray = `${len}`; ul.style.strokeDashoffset = `${len}`; }
    if (cl) { const len = cl.getTotalLength(); cl.style.strokeDasharray = `${len}`; cl.style.strokeDashoffset = `${len}`; }

    const lines = el.querySelectorAll<HTMLElement>(".anim-line");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        lines.forEach((line, i) => {
          setTimeout(() => { line.style.transform = "translateY(0)"; line.style.opacity = "1"; }, i * 100);
        });
        setTimeout(() => {
          const u = underlineRef.current;
          if (!u) return;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            u.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
            u.style.strokeDashoffset = "0";
          }));
        }, 650);
        setTimeout(() => {
          const c = circleRef.current;
          if (!c) return;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            c.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)";
            c.style.strokeDashoffset = "0";
          }));
        }, 1150);
        setTimeout(() => setSmileyPopped(true), 800);
        observer.unobserve(el);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: "relative", marginBottom: "clamp(48px, 6vw, 80px)" }}>
      <h2
        ref={ref}
        className="font-heading"
        style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
      >
        <span style={{ overflow: "hidden", display: "block", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
          <span className="anim-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
            Choose your{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <em style={{ fontStyle: "italic" }}>product,</em>
              <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-8px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
                <path ref={underlineRef} d="M2 4 C30 1, 70 11, 100 5 C130 0, 168 11, 198 5" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
              </svg>
            </span>
          </span>
        </span>
        {/* No overflow:hidden — CircleHighlight SVG must not be clipped */}
        <span style={{ display: "block", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
          <span className="anim-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
            make it{" "}
            <CircleHighlight
              text="yours."
              circleRef={circleRef}
              stroke="#6C5CE7"
              strokeWidth={4.5}
              pathD="M102 -6 C142 -9, 182 2, 192 32 C198 50, 192 70, 170 80 C148 88, 104 86, 68 80 C34 74, 8 60, 6 38 C4 16, 26 -2, 62 -6 C74 -8, 88 -7, 102 -6"
            />
          </span>
        </span>
      </h2>

      {/* Smiley sticker */}
      <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
        <div style={stickerStyle(smileyPopped)}>
          <img src="/icons/choose-your--product.svg" alt="" style={{ width: "clamp(56px, 6vw, 80px)", height: "auto" }} />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [activeImg, setActiveImg] = useState(0);
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

  const mainImg = product.images[activeImg];
  const thumbImg = product.images[activeImg === 0 ? 1 : 0];

  const stickerEl = (
    <div style={stickerStyle(stickerPopped)}>
      <img src={product.iconSrc} alt="" style={{ width: "clamp(72px, 7vw, 96px)", height: "auto" }} />
    </div>
  );

  return (
    <div
      ref={cardRef}
      style={{ position: "relative" }}
      onMouseEnter={() => { if (!stickerPopped) setStickerPopped(true); }}
    >
      {/* above-card: positioned on outer wrapper, can overflow card boundary */}
      {product.iconPlacement === "above-card" && (
        <div style={{ position: "absolute", zIndex: 10, ...product.iconPos }}>
          {stickerEl}
        </div>
      )}

      <div
        className="group"
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
        {/*
         * Image-area wrapper: position relative, NO overflow:hidden
         * This lets the "image-bottom" sticker clip the image edge from outside,
         * and "inside-image" sticker sits within the nested overflow:hidden div.
         */}
        <div style={{ position: "relative" }}>
          <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
            <a href={product.href} style={{ display: "block", width: "100%", height: "100%" }}>
              <img
                key={mainImg}
                src={mainImg}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ animation: "fadeIn 0.4s ease-out" }}
              />
            </a>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "rgba(0,0,0,0.06)" }} />

            {/* inside-image: sits inside overflow:hidden, clipped to image bounds */}
            {product.iconPlacement === "inside-image" && (
              <div style={{ position: "absolute", zIndex: 10, ...product.iconPos }}>
                {stickerEl}
              </div>
            )}

            <button
              onClick={() => setActiveImg(activeImg === 0 ? 1 : 0)}
              className="absolute cursor-pointer overflow-hidden"
              style={{ bottom: 14, right: 14, width: 72, height: 54, borderRadius: 8, border: "2.5px solid rgba(255,255,255,0.9)", padding: 0, background: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.25)", transition: "transform 0.3s, box-shadow 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)"; }}
              aria-label="Switch photo"
            >
              <img src={thumbImg} alt={`${product.name} alternate`} className="w-full h-full object-cover" />
            </button>
          </div>

          {/* image-bottom: outside image overflow:hidden, straddles the image's bottom edge */}
          {product.iconPlacement === "image-bottom" && (
            <div style={{ position: "absolute", zIndex: 10, ...product.iconPos }}>
              {stickerEl}
            </div>
          )}
        </div>

        <div style={{ padding: "clamp(20px, 2.5vw, 28px)" }}>
          <div className="flex items-center" style={{ gap: 10, marginBottom: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: product.accent, border: "1.5px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
            <h3 className="font-heading" style={{ fontSize: "clamp(20px, 1.8vw, 26px)", letterSpacing: "-0.025em", color: "#1a1a2e" }}>{product.name}</h3>
          </div>
          <p style={{ fontSize: "clamp(14px, 1vw, 16px)", fontWeight: 400, lineHeight: 1.7, color: "#6b7280", marginBottom: 20 }}>{product.description}</p>
          <a href={product.href ?? "#book"} className="inline-flex items-center transition-opacity duration-300 hover:opacity-70" style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", gap: 6 }}>
            Learn More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="products" style={{ padding: "clamp(80px, 12vw, 180px) 0", position: "relative", overflow: "hidden" }}>
      {/* Background blob — behind premium backdrops card (bottom-right) */}
      <StickerReveal
        delay={400}
        style={{ position: "absolute", right: "-5vw", bottom: "5%", zIndex: 0, pointerEvents: "none" }}
      >
        <img src="/icons/blob-half-behind-premium-backdrops.svg" alt="" style={{ width: "clamp(280px, 40vw, 620px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>
        <ProductsHeading />
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {products.map((product, i) => (
            <RevealOnScroll key={product.name} delay={i * 100}>
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

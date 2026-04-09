"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";
import StickerReveal from "@/components/StickerReveal";
import BookingCTA from "@/components/BookingCTA";
import CircleHighlight from "@/components/CircleHighlight";

// ─── LOCATIONS DATA ────────────────────────────────────────────────────────────
const locations = [
  { name: "Calgary", slug: "calgary-photo-booth-rental", image: "/locations/calgary.jpg" },
  { name: "Airdrie", slug: "airdrie-photo-booth-rental", image: "/locations/airdrie.jpg" },
  { name: "Cochrane", slug: "cochrane-photo-booth-rental", image: "/locations/Cochrane.jpg" },
  { name: "Okotoks", slug: "okotoks-photo-booth-rental", image: "/locations/Okotoks.jpg" },
  { name: "Strathmore", slug: "strathmore-photo-booth-rental", image: "/locations/Strathmore.jpg" },
  { name: "Chestermere", slug: "chestermere-photo-booth-rental", image: "/locations/Chestermere.jpg" },
  { name: "Canmore", slug: "canmore-photo-booth-rental", image: "/locations/canmore.jpg" },
  { name: "Banff", slug: "banff-photo-booth-rental", image: "/locations/banff.jpg" },
  { name: "Drumheller", slug: "drumheller-photo-booth-rental", image: "/locations/Drumheller.jpg" },
  { name: "Olds", slug: "olds-photo-booth-rental", image: "/locations/olds.jpg" },
  { name: "Didsbury", slug: "didsbury-photo-booth-rental", image: "/locations/Didsbury.jpg" },
  { name: "Carstairs", slug: "carstairs-photo-booth-rental", image: "/locations/Carstairs.jpg" },
  { name: "Turner Valley", slug: "turner-valley-photo-booth-rental", image: "/locations/Turner Valley.jpg" },
  { name: "Nanton", slug: "nanton-photo-booth-rental", image: "/locations/nanton.jpg" },
  { name: "Crossfield", slug: "crossfield-photo-booth-rental", image: "/locations/Crossfield.jpg" },
  { name: "Three Hills", slug: "three-hills-photo-booth-rental", image: "/locations/Three Hills.jpg" },
  { name: "Vulcan", slug: "vulcan-photo-booth-rental", image: "/locations/vulcan.jpg" },
  { name: "Claresholm", slug: "claresholm-photo-booth-rental", image: "/locations/Claresholm.jpg" },
  { name: "Sundre", slug: "sundre-photo-booth-rental", image: "/locations/sundre.jpeg" },
  { name: "Bragg Creek", slug: "bragg-creek-photo-booth-rental", image: "/locations/bragg creek.jpg" },
  { name: "Milo", slug: "milo-photo-booth-rental", image: "/locations/milo.jpg" },
  { name: "Longview", slug: "longview-photo-booth-rental", image: "/locations/longview.jpg" },
];

// ─── HERO ──────────────────────────────────────────────────────────────────────
function LocationsHero() {
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
    reveal(line2Ref, 230);

    setTimeout(() => {
      if (subRef.current) {
        subRef.current.style.transform = "translateY(0)";
        subRef.current.style.opacity = "1";
      }
    }, 520);

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
    }, 680);

    setTimeout(() => setSticker1(true), 480);
    setTimeout(() => setSticker2(true), 900);
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
            src="/locations/calgary.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.74) 100%)" }} />
        </div>

        {/* Sticker 1 */}
        <div className="absolute" style={{ top: "12%", right: "8%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker1 ? "scale(1) rotate(0deg)" : "scale(0) rotate(-18deg)", opacity: sticker1 ? 1 : 0 }}>
            <img src="/icons/hero-camera.svg" alt="" style={{ width: "clamp(52px, 7vw, 100px)", height: "auto" }} />
          </div>
        </div>

        {/* Sticker 2 */}
        <div className="absolute" style={{ bottom: "18%", right: "6%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker2 ? "scale(1) rotate(6deg)" : "scale(0) rotate(-18deg)", opacity: sticker2 ? 1 : 0 }}>
            <img src="/icons/unforgettable.svg" alt="" style={{ width: "clamp(72px, 8vw, 116px)", height: "auto" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(48px, 8vw, 120px) clamp(28px, 6vw, 100px)" }}>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(48px, 7.5vw, 110px)", lineHeight: 0.96, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(28px, 3vw, 44px)" }}
          >
            {/* Line 1 */}
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line1Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                We Cover
              </span>
            </span>
            {/* Line 2 */}
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.28em", marginBottom: "-0.28em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.13s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.13s" }}>
                <CircleHighlight
                  text="Southern"
                  circleRef={circleRef}
                  stroke="rgba(255,107,53,0.85)"
                  pathD="M96 8 C122 3, 162 9, 185 24 C196 36, 196 62, 186 78 C174 92, 146 97, 108 96 C70 95, 36 88, 16 74 C2 60, 2 36, 12 22 C22 8, 56 4, 80 5 C90 4, 94 7, 108 7"
                />
                {" "}Alberta.
              </span>
            </span>
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{ fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", maxWidth: 600, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}
            >
              We cover all areas within a 200km radius of Calgary — bringing the photobooth experience to every corner of Southern Alberta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION CARD ────────────────────────────────────────────────────────────
function LocationCard({ location, index }: { location: (typeof locations)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealOnScroll delay={index * 40}>
      <Link
        href={`/locations/${location.slug}`}
        style={{ display: "block", textDecoration: "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "clamp(12px, 1.5vw, 18px)",
            overflow: "hidden",
            aspectRatio: "4/3",
            boxShadow: hovered ? "0 20px 56px rgba(0,0,0,0.18)" : "0 2px 16px rgba(0,0,0,0.08)",
            transition: "box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: hovered ? "translateY(-5px)" : "translateY(0)",
          }}
        >
          {/* Image */}
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover absolute inset-0"
            style={{
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: hovered
                ? "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.65) 100%)"
                : "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)",
              transition: "background 0.45s ease",
            }}
          />

          {/* Location name */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 2vw, 22px)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <span
              className="font-heading"
              style={{
                fontSize: "clamp(17px, 1.6vw, 22px)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {location.name}
            </span>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: hovered ? "#FF6B35" : "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.35s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                transform: hovered ? "scale(1.12)" : "scale(1)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </RevealOnScroll>
  );
}

// ─── LOCATIONS GRID ───────────────────────────────────────────────────────────
function LocationsGrid() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const underline = underlineRef.current;
    if (!el || !underline) return;

    const len = underline.getTotalLength();
    underline.style.strokeDasharray = `${len}`;
    underline.style.strokeDashoffset = `${len}`;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const lines = el.querySelectorAll<HTMLElement>(".draw-line");
        lines.forEach((l, i) => {
          setTimeout(() => { l.style.transform = "translateY(0)"; l.style.opacity = "1"; }, i * 120);
        });
        setTimeout(() => {
          underline.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
          underline.style.strokeDashoffset = "0";
        }, 360);
        observer.unobserve(el);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Section heading */}
        <div style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
          <h2
            ref={headRef}
            className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
          >
            <span style={{ display: "block" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Find your{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  location.
                  <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible", pointerEvents: "none" }}>
                    <path ref={underlineRef} d="M2 9 C28 3, 72 13, 100 7 C130 1, 168 12, 198 6" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  </svg>
                </span>
              </span>
            </span>
          </h2>
          <RevealOnScroll direction="right">
            <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "rgba(26,26,46,0.45)", maxWidth: 420, lineHeight: 1.7, marginTop: "clamp(18px, 2vw, 28px)" }}>
              {locations.length} locations across Southern Alberta. Don&apos;t see yours?{" "}
              <a href="#book" style={{ color: "#FF6B35", textDecoration: "underline", fontWeight: 600 }}>
                Contact us
              </a>
              {" "}— we may still cover your area.
            </p>
          </RevealOnScroll>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(14px, 2vw, 24px)" }}
        >
          {locations.map((location, i) => (
            <LocationCard key={location.slug} location={location} index={i} />
          ))}
        </div>

        {/* "Not listed" note */}
        <RevealOnScroll>
          <div
            style={{
              marginTop: "clamp(48px, 6vw, 72px)",
              padding: "clamp(24px, 3vw, 36px) clamp(28px, 4vw, 48px)",
              background: "#f9f9f9",
              borderRadius: "clamp(16px, 2vw, 24px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div>
              <p className="font-heading" style={{ fontSize: "clamp(18px, 1.6vw, 24px)", letterSpacing: "-0.02em", color: "#1a1a2e", marginBottom: 6 }}>
                If your city is not listed, please feel free to Contact Us.
              </p>
              <p style={{ fontSize: "clamp(14px, 1vw, 16px)", color: "#6b7280", lineHeight: 1.6 }}>
                We&apos;re always expanding our service area and may be able to accommodate your location.
              </p>
            </div>
            <a
              href="#book"
              style={{ display: "inline-block", padding: "14px 36px", background: "#FF6B35", color: "#fff", borderRadius: 60, fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif", textDecoration: "none", flexShrink: 0, transition: "opacity 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Contact Us
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: "/icons/setup-takedown.svg",
    title: "Assembly and Disassembly",
    desc: "The Photobooth Experience team provides seamless service by handling the full setup and takedown of the photo booth at no extra cost.",
  },
  {
    icon: "/icons/unlimited-prints.svg",
    title: "Unlimited HQ Printing",
    desc: "Guests can snap unlimited photos and receive instant prints throughout the event, creating unforgettable keepsakes and lasting memories for everyone to cherish.",
  },
  {
    icon: "/icons/cutsom-photo-frames.svg",
    title: "Customized Photo Frame",
    desc: "Our expert graphic designers craft fully customized photo frames, perfectly tailored to your brand, style, and message, ensuring a one-of-a-kind and personalized touch for your event.",
  },
];

function BenefitsSection() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const underline = underlineRef.current;
    if (!el || !underline) return;

    const len = underline.getTotalLength();
    underline.style.strokeDasharray = `${len}`;
    underline.style.strokeDashoffset = `${len}`;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const lines = el.querySelectorAll<HTMLElement>(".draw-line");
        lines.forEach((l, i) => {
          setTimeout(() => { l.style.transform = "translateY(0)"; l.style.opacity = "1"; }, i * 120);
        });
        setTimeout(() => {
          underline.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
          underline.style.strokeDashoffset = "0";
        }, 360);
        observer.unobserve(el);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9", position: "relative", overflow: "hidden" }}>
      <StickerReveal delay={200} style={{ position: "absolute", right: "-4vw", top: "10%", zIndex: 0, pointerEvents: "none" }}>
        <img src="/icons/blob-behind-everydetail.svg" alt="" style={{ width: "clamp(280px, 40vw, 600px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>
        <h2
          ref={headRef}
          className="font-heading"
          style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(48px, 6vw, 72px)" }}
        >
          <span style={{ display: "block" }}>
            <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
              What&apos;s{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                included,
                <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "14px", overflow: "visible", pointerEvents: "none" }}>
                  <path ref={underlineRef} d="M2 6 C30 1, 72 11, 100 5 C130 0, 168 10, 198 5" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                </svg>
              </span>
            </span>
          </span>
          <span style={{ display: "block", paddingBottom: "0.3em" }}>
            <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s" }}>
              <em style={{ fontStyle: "italic" }}>everywhere we go.</em>
            </span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(32px, 4vw, 52px)" }}>
          {benefits.map((benefit, i) => (
            <RevealOnScroll key={benefit.title} delay={i * 100}>
              <div>
                <StickerReveal delay={i * 100 + 200} style={{ marginBottom: 24 }}>
                  <img src={benefit.icon} alt="" style={{ width: "clamp(44px, 4.5vw, 60px)", height: "auto" }} />
                </StickerReveal>
                <h3 className="font-heading" style={{ fontSize: "clamp(18px, 1.5vw, 23px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 12, lineHeight: 1.2 }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: "clamp(14px, 1vw, 16px)", color: "#6b7280", lineHeight: 1.75 }}>
                  {benefit.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function LocationsPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <LocationsHero />
        <LocationsGrid />
        <BenefitsSection />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

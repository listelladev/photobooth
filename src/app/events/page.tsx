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

// ─── HERO ──────────────────────────────────────────────────────────────────────
function EventsHero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
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
      const p = underlineRef.current;
      if (!p) return;
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          p.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
          p.style.strokeDashoffset = "0";
        }),
      );
    }, 620);

    setTimeout(() => setSticker1(true), 500);
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
            src="/activities-hero.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.72) 100%)" }} />
        </div>

        {/* Camera sticker */}
        <div className="absolute" style={{ top: "12%", right: "8%", zIndex: 5 }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker1 ? "scale(1) rotate(0deg)" : "scale(0) rotate(-18deg)", opacity: sticker1 ? 1 : 0, transformOrigin: "center center" }}>
            <img src="/icons/pool-of-icons/props.svg" alt="" style={{ width: "clamp(52px, 7vw, 100px)", height: "auto" }} />
          </div>
        </div>

        {/* Unforgettable sticker */}
        <div className="absolute" style={{ bottom: "18%", right: "6%", zIndex: 5 }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker2 ? "scale(1) rotate(6deg)" : "scale(0) rotate(-18deg)", opacity: sticker2 ? 1 : 0, transformOrigin: "center center" }}>
            <img src="/icons/pool-of-icons/unforgettable-2.svg" alt="" style={{ width: "clamp(72px, 8vw, 116px)", height: "auto" }} />
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
                Calgary Photo Booths
              </span>
            </span>
            {/* Line 2 — "Every" gets a wavy underline, "Occasion." on same line */}
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.22em", marginBottom: "-0.22em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.13s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.13s" }}>
                for{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <em style={{ fontStyle: "italic" }}>Every</em>
                  <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
                    <path ref={underlineRef} d="M2 8 C30 3, 70 13, 100 6 C130 1, 168 12, 198 6" fill="none" stroke="rgba(255,107,53,0.85)" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  </svg>
                </span>
                {" "}Event.
              </span>
            </span>
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{ fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.7, transform: "translateY(0)", opacity: 1 }}
            >
              From intimate gatherings to grand celebrations — we bring laughter, energy, and lasting keepsakes to every Calgary photo booth rental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EVENT CARDS ───────────────────────────────────────────────────────────────
const events = [
  {
    slug: "calgary-wedding-photo-booth",
    badge: "Most Popular",
    badgeColor: "#E84393",
    title: "Weddings",
    desc: "Transform your reception into an unforgettable celebration. Our mirror and classic photo booths bring elegance, laughter, and instant keepsakes to your special day.",
    image: "/weddings-featured-image.jpg",
    accentColor: "#E84393",
  },
  {
    slug: "calgary-baby-shower-photo-booth",
    badge: null,
    badgeColor: null,
    title: "Baby Showers",
    desc: "Celebrate new life with playful props, pastel-ready backdrops, and instant prints your guests will treasure long after the party ends.",
    image: "/baby-shower.jpg",
    accentColor: "#6C5CE7",
  },
  {
    slug: "calgary-birthday-photo-booth",
    badge: null,
    badgeColor: null,
    title: "Birthday Parties",
    desc: "Whether it's a sweet 16 or the big 5-0 — a photo booth turns any birthday into a highlight reel packed with candid, hilarious memories.",
    image: "/birthday-featured.jpg",
    accentColor: "#F7C948",
  },
  {
    slug: "calgary-gender-reveal-photo-booth",
    badge: "Trending",
    badgeColor: "#0984E3",
    title: "Gender Reveals",
    desc: "Capture the excitement of the big reveal with Team Boy or Team Girl props, themed backdrops, and instant social sharing for the whole room.",
    image: "/gender-reveal.jpg",
    accentColor: "#0984E3",
  },
  {
    slug: "calgary-festival-photo-booth",
    badge: null,
    badgeColor: null,
    title: "Festivals & Events",
    desc: "From outdoor festivals to community activations — custom-branded photo booths with unlimited prints keep your brand front and centre all day long.",
    image: "/festivals-and-events.jpg",
    accentColor: "#FF6B35",
  },
  {
    slug: "calgary-corporate-photo-booth",
    badge: null,
    badgeColor: null,
    title: "Corporate Parties",
    desc: "Elevate your team event, product launch, or holiday party with a branded photo experience that gets people laughing and sharing.",
    image: "/corporate.jpg",
    accentColor: "#00B894",
  },
];

function EventCard({ event, index }: { event: (typeof events)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealOnScroll delay={index * 80}>
      <Link
        href={`/events/${event.slug}`}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1)", transform: hovered ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.12)" : "0 2px 16px rgba(0,0,0,0.05)", borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", background: "#fff" }}>

          {/* Image */}
          <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              style={{ transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)", transform: hovered ? "scale(1.04)" : "scale(1)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)" }} />
            {event.badge && (
              <span style={{ position: "absolute", top: 16, left: 16, background: event.badgeColor || "#FF6B35", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 60 }}>
                {event.badge}
              </span>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "clamp(24px, 2.5vw, 32px) clamp(24px, 2.5vw, 32px) clamp(28px, 3vw, 36px)" }}>
            <h3 className="font-heading" style={{ fontSize: "clamp(22px, 2vw, 30px)", letterSpacing: "-0.03em", color: "#1a1a2e", marginBottom: 10, lineHeight: 1.1 }}>
              {event.title}
            </h3>
            <p style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "#6b7280", lineHeight: 1.7, marginBottom: "clamp(20px, 2vw, 28px)" }}>
              {event.desc}
            </p>
            <span
              className="inline-flex items-center font-heading"
              style={{ fontSize: 15, fontWeight: 700, color: event.accentColor, gap: 6, transition: "gap 0.3s", letterSpacing: "-0.01em" }}
            >
              Learn More
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </RevealOnScroll>
  );
}

function EventsGrid() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const circleRef = useRef<SVGPathElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const circle = circleRef.current;
    const underline = underlineRef.current;
    if (!el || !circle || !underline) return;

    for (const path of [circle, underline]) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    }

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
        setTimeout(() => {
          circle.style.transition = "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)";
          circle.style.strokeDashoffset = "0";
        }, 500);
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
            {/* Line 1 — underline on "celebration" */}
            <span style={{ display: "block" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                Your{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  celebration,
                  <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible", pointerEvents: "none" }}>
                    <path ref={underlineRef} d="M2 9 C28 3, 72 13, 100 7 C130 1, 168 12, 198 6" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  </svg>
                </span>
              </span>
            </span>
            {/* Line 2 — circle around "specialty." */}
            <span style={{ display: "block", paddingBottom: "0.3em" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s" }}>
                our{" "}
                <CircleHighlight
                  text="specialty."
                  circleRef={circleRef}
                  stroke="#FF6B35"
                  pathD="M96 8 C122 3, 162 9, 185 24 C196 36, 196 62, 186 78 C174 92, 146 97, 108 96 C70 95, 36 88, 16 74 C2 60, 2 36, 12 22 C22 8, 56 4, 80 5 C90 4, 94 7, 108 7"
                />
              </span>
            </span>
          </h2>
          <RevealOnScroll direction="right">
            <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "rgba(26,26,46,0.45)", maxWidth: 380, lineHeight: 1.7, marginTop: 4 }}>
              Six Calgary events. One seamless experience. Setup and takedown always included.
            </p>
          </RevealOnScroll>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(20px, 2.5vw, 32px)" }}>
          {events.map((event, i) => (
            <EventCard key={event.slug} event={event} index={i} />
          ))}
        </div>

        {/* Catch-all note */}
        <RevealOnScroll delay={100}>
          <p style={{ fontSize: "clamp(14px, 1vw, 16px)", color: "#6b7280", lineHeight: 1.75, marginTop: "clamp(32px, 4vw, 48px)", textAlign: "center" }}>
            Don&apos;t see your event type? We offer our Calgary photo booth services for all event types and celebrations, even if it&apos;s not listed.{" "}
            <Link href="/contact" style={{ fontWeight: 700, color: "#1a1a2e", textDecoration: "underline", textUnderlineOffset: 3 }}>Contact us</Link>
            {" "}to discuss your event!
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE SECTION ────────────────────────────────────────────────────────
const perks = [
  { icon: "/icons/cutsom-photo-frames.svg", title: "Custom Frames & Backdrops", desc: "Every event gets its own personalized photo frame — your text, your logo, your colours." },
  { icon: "/icons/unlimited-prints.svg", title: "Unlimited Instant Prints", desc: "Photos print automatically on the spot. Every guest walks away with a physical keepsake." },
  { icon: "/icons/digitalcopies.svg", title: "Digital Delivery After", desc: "All photos are delivered digitally after the event so every moment is preserved and shareable." },
  { icon: "/icons/setup-takedown.svg", title: "Setup & Takedown Included", desc: "Our team arrives early, sets up, stays throughout, and handles everything on the way out." },
];

function WhyChooseSection() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const underline1Ref = useRef<SVGPathElement>(null);
  const underline2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = headRef.current;
    const u1 = underline1Ref.current;
    const u2 = underline2Ref.current;
    if (!el || !u1 || !u2) return;
    for (const p of [u1, u2]) {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const lines = el.querySelectorAll<HTMLElement>(".draw-line");
        lines.forEach((l, i) => {
          setTimeout(() => { l.style.transform = "translateY(0)"; l.style.opacity = "1"; }, i * 120);
        });
        setTimeout(() => {
          u1.style.transition = "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)";
          u1.style.strokeDashoffset = "0";
        }, 300);
        setTimeout(() => {
          u2.style.transition = "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)";
          u2.style.strokeDashoffset = "0";
        }, 440);
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
          {/* Line 1 — double underline on "need" */}
          <span style={{ display: "block" }}>
            <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
              Everything you{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                need,
                <svg aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-12px", left: "-2%", width: "104%", height: "20px", overflow: "visible", pointerEvents: "none" }}>
                  <path ref={underline1Ref} d="M2 6 C30 1, 72 11, 100 5 C130 0, 168 10, 198 5" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  <path ref={underline2Ref} d="M2 14 C30 9, 72 19, 100 13 C130 8, 168 18, 198 13" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                </svg>
              </span>
            </span>
          </span>
          {/* Line 2 */}
          <span style={{ display: "block", paddingBottom: "0.3em" }}>
            <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s" }}>
              <em style={{ fontStyle: "italic" }}>nothing you don&apos;t.</em>
            </span>
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(28px, 3vw, 40px)" }}>
          {perks.map((perk, i) => (
            <RevealOnScroll key={perk.title} delay={i * 90}>
              <div>
                <StickerReveal delay={i * 90 + 200} style={{ marginBottom: 20 }}>
                  <img src={perk.icon} alt="" style={{ width: "clamp(44px, 4.5vw, 60px)", height: "auto" }} />
                </StickerReveal>
                <h3 className="font-heading" style={{ fontSize: "clamp(17px, 1.4vw, 21px)", letterSpacing: "-0.02em", color: "#1a1a2e", marginBottom: 10, lineHeight: 1.2 }}>
                  {perk.title}
                </h3>
                <p style={{ fontSize: "clamp(14px, 1vw, 16px)", color: "#6b7280", lineHeight: 1.7 }}>
                  {perk.desc}
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
export default function EventsPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <EventsHero />
        <EventsGrid />
        <WhyChooseSection />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

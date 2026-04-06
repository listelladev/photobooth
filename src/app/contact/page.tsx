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

// ─── HERO ──────────────────────────────────────────────────────────────────────
function ContactHero() {
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
            src="/contact-page-hero.jpg"
            alt="Contact Photobooth Experience"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.72) 100%)" }} />
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
                Say
              </span>
            </span>
            <span style={{ display: "block", paddingTop: "0.08em", marginTop: "-0.08em", paddingBottom: "0.3em", marginBottom: "-0.3em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.16em", marginRight: "-0.16em" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s" }}>
                <CircleHighlight
                  text="Hello."
                  circleRef={circleRef}
                  stroke="rgba(255,107,53,0.9)"
                  pathD="M96 8 C122 3, 162 9, 185 24 C196 36, 196 62, 186 78 C174 92, 146 97, 108 96 C70 95, 36 88, 16 74 C2 60, 2 36, 12 22 C22 8, 56 4, 80 5 C90 4, 94 7, 108 7"
                />
              </span>
            </span>
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p
              ref={subRef}
              style={{ fontSize: "clamp(15px, 1.3vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", maxWidth: 600, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}
            >
              Have a question, want to book, or just want to chat about your event? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "dm-sans, sans-serif",
    color: "#1a1a2e",
    outline: "none",
    borderRadius: 0,
    transition: "border-color 0.3s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: 8,
    marginTop: 28,
  };

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(56px, 8vw, 140px)" }}>

          {/* Left — info */}
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6B35", marginBottom: 20 }}>
                Get in Touch
              </p>
              <AnimatedText
                as="h2"
                className="font-heading"
                style={{ fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 1.03, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(28px, 3vw, 40px)" }}
                stagger={90}
              >
                <AnimLine>We&apos;re here</AnimLine>
                <AnimLine>to make your</AnimLine>
                <AnimLine>event <em style={{ fontStyle: "italic" }}>perfect.</em></AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 48, maxWidth: 440 }}>
                Fill out the form and someone from our team will reach out within 24 hours to discuss your event, confirm availability, and help you find the right package.
              </p>

              <div className="flex flex-col" style={{ gap: 28 }}>
                {[
                  {
                    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
                    label: "Phone", value: "(403) 555-0123",
                  },
                  {
                    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
                    label: "Email", value: "info@photoboothexperience.ca",
                  },
                  {
                    icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
                    label: "Service Area", value: "Calgary & Southern Alberta",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start" style={{ gap: 16 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5" style={{ marginTop: 2, flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                    </svg>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 4 }}>{c.label}</p>
                      <p style={{ fontSize: 17, fontWeight: 500, color: "#1a1a2e" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — form */}
          <RevealOnScroll direction="right" delay={150}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", paddingTop: "clamp(32px, 4vw, 64px)" }}>
                <StickerReveal delay={100}>
                  <img src="/icons/unforgettable.svg" alt="" style={{ width: "clamp(64px, 6vw, 88px)", height: "auto", marginBottom: 24 }} />
                </StickerReveal>
                <h3 className="font-heading" style={{ fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-0.03em", color: "#1a1a2e", marginBottom: 16, lineHeight: 1.1 }}>
                  Message sent!
                </h3>
                <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.7, maxWidth: 360 }}>
                  Thanks for reaching out. We&apos;ll be in touch within 24 hours to chat about your event.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 clamp(24px, 3vw, 40px)" }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Full name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="(403) 555-0000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="pricing">Pricing</option>
                      <option value="custom">Custom Package</option>
                      <option value="availability">Check Availability</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea name="message" rows={4} required value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: "none" as const }} placeholder="Tell us about your event..." />
                </div>
                <button
                  type="submit"
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  style={{ fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif", padding: "16px 48px", background: "#FF6B35", color: "#fff", border: "none", borderRadius: 60, marginTop: 40 }}
                >
                  Send Message
                </button>
                <p style={{ fontSize: 14, color: "#9ca3af", marginTop: 16 }}>We typically respond within 24 hours.</p>
              </form>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── WHAT'S INCLUDED ──────────────────────────────────────────────────────────
const includedCards = [
  {
    num: "01",
    accent: "#FFD6E8",
    accentText: "#be185d",
    title: "Why Rent a Photo Booth?",
    body: "Make your event truly unforgettable with our premium photo booth rentals! Whether it's a wedding, corporate gathering, or birthday celebration, a photo booth adds an interactive and entertaining element that guests will love.",
  },
  {
    num: "02",
    accent: "#D4F4A0",
    accentText: "#3d6b00",
    title: "How It Works",
    body: "Booking is easy — simply contact us to reserve your date, and our professional team handles the setup and operation for a completely hassle-free experience. Personalize your booth with custom backgrounds and layouts to perfectly match your theme.",
  },
  {
    num: "03",
    accent: "#E8D6FF",
    accentText: "#5b21b6",
    title: "Why Choose Us?",
    body: "We pride ourselves on top-tier service with high-quality equipment, expert assistance, and extensive customization options. Our goal is to create an unforgettable experience tailored to your event, capturing memories that last a lifetime.",
  },
  {
    num: "04",
    accent: "#FFE4B5",
    accentText: "#92400e",
    title: "Custom Photo Frames",
    body: "Design your own personalized photo frame with your logo, style, and custom text. Our graphic designers can match the frame to your event theme or invitation. Already have a design? Send it over — a preview is always sent for your approval before finalization.",
  },
  {
    num: "05",
    accent: "#B5F0FF",
    accentText: "#0369a1",
    title: "Instant Digital Photos",
    body: "All event photos are available digitally right after your event via a secure download link. Choose between framed or unframed versions — our high-resolution cameras guarantee exceptional quality for both digital albums and prints.",
  },
  {
    num: "06",
    accent: "#FFD6D6",
    accentText: "#be3535",
    title: "Unlimited Printing",
    body: "Our rentals allow for up to 400 high-quality prints (10×15 cm) or 800 photo strips, ensuring every guest leaves with a physical keepsake they'll actually keep.",
  },
  {
    num: "07",
    accent: "#D4F4A0",
    accentText: "#3d6b00",
    title: "Fun Props for Every Occasion",
    body: "Enhance your photos with our exciting collection of props — hats, glasses, mustaches, and playful stick accessories. These fun additions bring creativity and personality to every snapshot.",
  },
  {
    num: "08",
    accent: "#E8D6FF",
    accentText: "#5b21b6",
    title: "Accepted Payment Methods",
    body: "We accept both online payments through our secure portal and cash payments. Our Book Now, Pay Later option is available when cash is the primary payment method.",
  },
];

const additionalInfo = [
  "Unlimited photos with our green screen booth",
  "Transparent pricing — compare before you book",
  "Pricing varies based on package selection",
  "Most photo prints come in a round format",
  "Perfect for weddings, parties & special events",
  "Polaroid-style instant captures available",
  "Digital copies easily added to your collection",
  "Stunning digital albums with unlimited uploads",
  "Photo column or pole setup for dynamic memories",
  "Customize photos with fun effects & enhancements",
];

function WhatsIncluded() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

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
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9", position: "relative", overflow: "hidden" }}>
      <StickerReveal delay={200} style={{ position: "absolute", right: "-4vw", top: "8%", zIndex: 0, pointerEvents: "none" }}>
        <img src="/icons/blob-behind-everydetail.svg" alt="" style={{ width: "clamp(280px, 40vw, 600px)", height: "auto" }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
          <h2
            ref={headRef}
            className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                What&apos;s{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  included
                  <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible", pointerEvents: "none" }}>
                    <path ref={underlineRef} d="M2 9 C28 3, 72 13, 100 7 C130 1, 168 12, 198 6" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }} />
                  </svg>
                </span>
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.22em", marginBottom: "-0.22em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span className="draw-line" style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s" }}>
                <em style={{ fontStyle: "italic" }}>when you rent.</em>
              </span>
            </span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {includedCards.map((card, i) => (
            <RevealOnScroll key={card.num} delay={i * 60}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "clamp(16px, 1.8vw, 22px)",
                  padding: "clamp(24px, 2.5vw, 32px)",
                  height: "100%",
                  border: "1px solid #f0f0f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
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

        {/* Additional info */}
        <RevealOnScroll delay={100}>
          <div
            style={{
              marginTop: "clamp(48px, 6vw, 72px)",
              background: "#141414",
              borderRadius: "clamp(16px, 2vw, 28px)",
              padding: "clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)",
            }}
          >
            <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#FF6B35", marginBottom: 28 }}>
              Additional Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0" }}>
              {additionalInfo.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "clamp(12px, 1.2vw, 16px) 0",
                    borderBottom: i < additionalInfo.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#FF6B35", flexShrink: 0, lineHeight: 1 }}>✦</span>
                  <span style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "rgba(255,255,255,0.75)", fontWeight: 400, lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What's included in every photo booth rental?",
    a: "Every rental includes your choice of photo booth, a professional on-site attendant for the full duration, complete setup and takedown, unlimited instant prints, a curated props collection, and a custom-designed photo frame. All photos are delivered digitally after the event.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept online payments through our secure portal as well as cash. Our Book Now, Pay Later option is available when cash is the chosen payment method.",
  },
  {
    q: "How do I book a photo booth?",
    a: "Simply fill out the contact form above or reach out directly by phone or email. Our team will confirm availability, walk you through our packages, and get your date locked in — the whole process is quick and hassle-free.",
  },
  {
    q: "Can I customize the photo frames and backdrop?",
    a: "Absolutely. Our in-house designers create a fully personalized photo frame incorporating your logo, preferred style, and custom text — matching your invitation or event theme. A preview is sent for your approval before finalization. Backdrop customization is also available.",
  },
  {
    q: "When will I receive my digital photos?",
    a: "All event photos are available digitally right after your event via a secure download link. You can choose between framed or unframed versions, and our high-resolution cameras ensure exceptional quality.",
  },
  {
    q: "How many prints are included?",
    a: "Our rentals include up to 400 high-quality prints (10×15 cm) or 800 photo strips, so every guest leaves with a keepsake in hand.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 3–4 weeks in advance. For summer weekends and holidays, 6–8 weeks is ideal as those dates fill up quickly.",
  },
  {
    q: "Do you serve areas outside Calgary?",
    a: "Yes — we cover all of Southern Alberta within a 200km radius of Calgary, including Airdrie, Cochrane, Okotoks, Canmore, Banff, and many more. Travel fees may apply beyond city limits.",
  },
];

function ContactFAQ() {
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
          <AnimLine>Questions &amp;</AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Answers.</em></AnimLine>
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

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
        <WhatsIncluded />
        <ContactFAQ />
      </main>
      <Footer />
    </>
  );
}

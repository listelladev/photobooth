"use client";

import { useEffect, useRef, useState } from "react";
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
function WeddingHero() {
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
      if (subRef.current) { subRef.current.style.transform = "translateY(0)"; subRef.current.style.opacity = "1"; }
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

    setTimeout(() => setSticker1(true), 500);
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
            src="/weddings-featured-image.jpg"
            alt="Wedding photo booth setup"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(125deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.65) 100%)" }} />
        </div>

        {/* Love sticker */}
        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5 }}>
          <div style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease", transform: sticker1 ? "scale(1) rotate(-6deg)" : "scale(0) rotate(-18deg)", opacity: sticker1 ? 1 : 0 }}>
            <img src="/icons/love-by-clients.svg" alt="" style={{ width: "clamp(64px, 7vw, 108px)", height: "auto" }} />
          </div>
        </div>

        {/* Twinkle sticker */}
        <div className="absolute" style={{ bottom: "20%", right: "5%", zIndex: 5 }}>
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
            {/* Line 1 — "Wedding Photo Booth" with circle around "Wedding" */}
            <span style={{ display: "block", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line1Ref} style={{ display: "block", whiteSpace: "nowrap", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
                <CircleHighlight
                  text="Wedding"
                  circleRef={circleRef}
                  stroke="rgba(232,67,147,0.9)"
                  pathD="M100 4 C140 1, 180 12, 192 32 C200 46, 196 62, 180 74 C160 84, 134 86, 100 85 C66 84, 38 78, 18 66 C4 56, 4 32, 12 18 C26 5, 60 0, 84 1 C92 1, 96 3, 100 4"
                />{" "}Photo Booth
              </span>
            </span>
            {/* Line 2 */}
            <span style={{ display: "block", overflow: "hidden", paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.22em", marginBottom: "-0.22em", paddingLeft: "0.08em", marginLeft: "-0.08em", paddingRight: "0.12em", marginRight: "-0.12em" }}>
              <span ref={line2Ref} style={{ display: "block", transform: "translateY(110%)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.14s" }}>
                Rental Calgary.
              </span>
            </span>
          </h1>

          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p ref={subRef} style={{ fontSize: "clamp(16px, 1.3vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}>
              Photo booth rentals designed for Calgary weddings — from intimate ceremonies to grand receptions. Setup, attendant, and digital delivery always included.
            </p>
          </div>

          <div style={{ overflow: "hidden", marginTop: "clamp(28px, 3.5vw, 48px)" }}>
            <RevealOnScroll direction="up">
              <div className="flex flex-wrap" style={{ gap: 14 }}>
                <a href="#book" style={{ display: "inline-block", padding: "clamp(13px, 1.4vw, 16px) clamp(28px, 2.5vw, 36px)", background: "#E84393", color: "#fff", borderRadius: 60, fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif", textDecoration: "none", transition: "opacity 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Book Your Wedding Booth
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INTRO ─────────────────────────────────────────────────────────────────────
function WeddingIntro() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>
                Wedding Photo Booths
              </p>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e" }} stagger={90}>
                <AnimLine>Your wedding day</AnimLine>
                <AnimLine>deserves more than</AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>photographs.</em></AnimLine>
              </AnimatedText>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ paddingTop: "clamp(0px, 2vw, 40px)" }}>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                A photo booth turns your reception into an experience — one where guests laugh with props, take home a printed memory, and share moments instantly. It's the entertainment that runs itself while you enjoy your night.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", color: "#9ca3af", lineHeight: 1.8 }}>
                We've set up at venues across Calgary and Alberta, from intimate ceremonies of 30 to grand receptions of 400. Every rental comes with a professional on-site attendant, custom-designed photo frames, unlimited prints, and full digital delivery after the event.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── ALTERNATING SECTIONS ──────────────────────────────────────────────────────
type SectionData = {
  bg: string;
  imageLeft: boolean;
  image: string;
  imageAlt: string;
  label: string;
  heading: React.ReactNode;
  body: string;
  body2?: string;
};

function AlternatingSection({ section }: { section: SectionData }) {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: section.bg, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px, 7vw, 100px)", alignItems: "center" }}>

          {/* Image */}
          <RevealOnScroll
            direction={section.imageLeft ? "left" : "right"}
            className={section.imageLeft ? "" : "lg:order-last"}
          >
            <div style={{ borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
              <img
                src={section.image}
                alt={section.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)" }} />
            </div>
          </RevealOnScroll>

          {/* Text */}
          <RevealOnScroll
            direction={section.imageLeft ? "right" : "left"}
            className={section.imageLeft ? "" : "lg:order-first"}
            delay={150}
          >
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>
                {section.label}
              </p>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(20px, 2.5vw, 28px)" }} stagger={80}>
                {section.heading}
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: section.body2 ? 20 : 0 }}>
                {section.body}
              </p>
              {section.body2 && (
                <p style={{ fontSize: "clamp(15px, 1.1vw, 18px)", color: "#6b7280", lineHeight: 1.8 }}>
                  {section.body2}
                </p>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

const weddingSections: SectionData[] = [
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/wedding-page/Create_an_image_using_the_atta (16).jpg",
    imageAlt: "Guests enjoying the photo booth at a Calgary wedding reception",
    label: "The Experience",
    heading: (
      <>
        <AnimLine>Elegance that</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>entertains.</em></AnimLine>
      </>
    ),
    body: "A photo booth adds energy and excitement to your reception without you having to lift a finger. Guests snap endless selfies with fun props alongside loved ones — and the laughter fills the room naturally. Our mirror booth brings a particular touch of glamour, drawing guests in from cocktail hour to the last dance.",
    body2: "Choose from our classic photo booth, interactive mirror booth, or immersive 360° video booth. Each option is styled to complement your wedding aesthetic, not compete with it.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/wedding-page/Create_an_image_using_the_atta (19).jpg",
    imageAlt: "Mirror photo booth with couple at a wedding",
    label: "For Your Guests",
    heading: (
      <>
        <AnimLine>Every guest takes</AnimLine>
        <AnimLine>home a{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <em style={{ fontStyle: "italic" }}>memory.</em>
            <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-8px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
              <path d="M2 10 C28 3, 70 13, 100 6 C132 0, 170 11, 198 5" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 0 }} />
            </svg>
          </span>
        </AnimLine>
      </>
    ),
    body: "With unlimited prints included in every package, every snapshot becomes a physical keepsake your guests actually keep. No hunting through a shared album days later — they walk away with it in hand.",
    body2: "For guests who prefer digital, our instant social sharing connects directly to Instagram and Facebook. Every photo is yours — no watermarks, no subscriptions.",
  },
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/wedding-page/Create_an_image_using_the_atta (5).jpg",
    imageAlt: "Custom photo frame with wedding monogram and branding",
    label: "The Details",
    heading: (
      <>
        <AnimLine>Personalized</AnimLine>
        <AnimLine>to match your</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>style.</em></AnimLine>
      </>
    ),
    body: "From monogrammed photo frames to custom backdrops that reflect your colour palette, every detail is tailored to your wedding theme. Our designers create your custom frame — included at no extra cost — so every print feels like an extension of your day.",
    body2: "Our backdrop library includes over 20 options, or we can source a custom backdrop to match your florals, colour palette, or venue aesthetic. Your photos will look like they belong at your wedding, because they do.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/wedding-page/salsa-photobooth.jpg",
    imageAlt: "360 degree photo booth at a wedding",
    label: "Hassle-Free",
    heading: (
      <>
        <AnimLine>Seamless setup,</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>digital</em> delivery.</AnimLine>
      </>
    ),
    body: "We coordinate directly with your venue. Our team arrives at least an hour before your event, sets up in your chosen space, and stays for the entire rental period to ensure everything runs flawlessly. When the night ends, we handle teardown — you don't touch a thing.",
    body2: "All photos are delivered to you digitally within 48 hours of the event, organized and ready to share. Every special moment, preserved.",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const weddingFaqs = [
  {
    q: "How far in advance should I book a photo booth for my wedding?",
    a: "We recommend booking at least 6–8 weeks in advance for weddings, particularly for dates between May and October when demand is highest. Popular venues book quickly — the earlier, the better.",
  },
  {
    q: "What types of photo booths work best for weddings?",
    a: "Our mirror booth is the most popular choice for weddings — it adds an elegant, interactive element that photographs beautifully. The classic Salsa Photo Booth is perfect for higher-volume events. The 360° video booth is a show-stopper for larger receptions.",
  },
  {
    q: "Can I customize the photo frames with our wedding monogram?",
    a: "Absolutely. Custom-designed photo frames are included in every package at no extra cost. Send us your wedding colours, monogram, or theme inspiration and our design team takes care of the rest.",
  },
  {
    q: "How much space does the photo booth require at the venue?",
    a: "Standard and mirror booths require a minimum 8' × 8' area with a standard power outlet nearby. The 360° video booth needs approximately 10' × 10'. We recommend placing the booth in a central or dedicated space for easy guest access throughout the night.",
  },
  {
    q: "Can guests share photos directly to social media from the booth?",
    a: "Yes. Our booths support instant sharing to Instagram and Facebook. Guests can text or email their photos directly from the booth, and all photos are also delivered to you digitally after the event.",
  },
  {
    q: "What's included in a wedding photo booth rental?",
    a: "Every wedding rental includes your choice of photo booth, a professional on-site attendant for the full rental period, complete setup and takedown, unlimited instant prints, a curated props collection, and a custom-designed photo frame. Digital delivery of all photos is included after the event.",
  },
  {
    q: "Do you travel to venues outside Calgary?",
    a: "Yes. We regularly serve Banff, Canmore, Airdrie, Cochrane, Okotoks, and the greater Calgary region. Travel fees may apply for venues beyond a certain distance — reach out to confirm availability and pricing for your location.",
  },
];

function WeddingFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#f9f9f9", position: "relative", overflow: "hidden" }}>
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
          <AnimLine>Wedding</AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Questions.</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {weddingFaqs.map((faq, i) => (
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
                  <span style={{ flexShrink: 0, transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)", transform: open === i ? "rotate(45deg)" : "none", fontSize: 24, color: "#1a1a2e", lineHeight: 1 }}>
                    +
                  </span>
                </button>
                <div className="overflow-hidden" style={{ maxHeight: open === i ? 320 : 0, transition: "max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}>
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
export default function WeddingPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <WeddingHero />
        <WeddingIntro />
        {weddingSections.map((section, i) => (
          <AlternatingSection key={i} section={section} />
        ))}
        <WeddingFAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

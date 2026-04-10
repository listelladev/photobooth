"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";
import StickerReveal from "@/components/StickerReveal";
import BookingCTA from "@/components/BookingCTA";
import ActivityHero from "@/components/ActivityHero";

// ─── INTRO ─────────────────────────────────────────────────────────────────────
function BabyShowerIntro() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>
                Calgary Baby Shower Photo Booth Rental
              </p>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e" }} stagger={90}>
                <AnimLine>Sweet moments</AnimLine>
                <AnimLine>deserve to be</AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>remembered.</em></AnimLine>
              </AnimatedText>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ paddingTop: "clamp(0px, 2vw, 40px)" }}>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                A Calgary baby shower photo booth rental turns your celebration into something everyone remembers long after the cake is cut. Guests step in, pick their props, and walk away with a printed memory in hand — it runs itself while you enjoy your celebration.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", color: "#9ca3af", lineHeight: 1.8 }}>
                We've set up Calgary baby shower photo booth rentals at intimate gatherings and large celebrations alike. Every rental includes a professional on-site attendant, custom photo frames themed to your shower, unlimited prints, and full digital delivery after the event.
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
          <RevealOnScroll direction={section.imageLeft ? "left" : "right"} className={section.imageLeft ? "" : "lg:order-last"}>
            <div style={{ borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
              <img src={section.image} alt={section.imageAlt} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)" }} />
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction={section.imageLeft ? "right" : "left"} className={section.imageLeft ? "" : "lg:order-first"} delay={150}>
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

const babyShowerSections: SectionData[] = [
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/salsa.jpeg",
    imageAlt: "Guests enjoying the photo booth at a Calgary baby shower",
    label: "The Experience",
    heading: (
      <>
        <AnimLine>Playful props,</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>guaranteed smiles.</em></AnimLine>
      </>
    ),
    body: "Our colorful prop collections are handpicked to match the joy of a baby shower — from silly sticks to sweet keepsake signs. Guests of every age dive in, and the laughter takes care of itself. Whether you're hosting 20 or 120, our Calgary baby shower photo booth rental keeps the energy high.",
    body2: "Choose from our classic Salsa Photo Booth, interactive mirror booth, or 360° video booth. Each is styled to complement your shower theme, not compete with it.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/mirror.jpeg",
    imageAlt: "Mirror photo booth at a baby shower in Calgary",
    label: "For Your Guests",
    heading: (
      <>
        <AnimLine>Every guest takes</AnimLine>
        <AnimLine>home a{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <em style={{ fontStyle: "italic" }}>keepsake.</em>
            <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-8px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
              <path d="M2 10 C28 3, 70 13, 100 6 C132 0, 170 11, 198 5" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 0 }} />
            </svg>
          </span>
        </AnimLine>
      </>
    ),
    body: "With unlimited prints included in every Calgary baby shower photo booth rental, every guest walks away with a physical photo in hand — not a link to check later. It's the party favour that actually means something.",
    body2: "Instant social sharing is also built in — guests can send their photos straight to Instagram, Facebook, or their phone. Every image is delivered to you digitally after the event, no watermarks, no subscriptions.",
  },
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/SalsaPromoHighRes148-scaled-1.png",
    imageAlt: "Custom baby shower themed photo frame in Calgary",
    label: "The Details",
    heading: (
      <>
        <AnimLine>Themed to match</AnimLine>
        <AnimLine>your <em style={{ fontStyle: "italic" }}>shower.</em></AnimLine>
      </>
    ),
    body: "Custom photo frames designed around your shower theme are included in every Calgary photo booth rental at no extra cost. Pastel colours, gender-neutral palettes, baby names — whatever fits your vision, our design team handles it.",
    body2: "Our backdrop library offers over 20 options, or we can source something that perfectly matches your florals, colour palette, or venue aesthetic. Your photos will look like they belong at your shower, because they do.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/360.jpeg",
    imageAlt: "Photo booth setup at a Calgary baby shower venue",
    label: "Hassle-Free",
    heading: (
      <>
        <AnimLine>We handle setup,</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>you celebrate.</em></AnimLine>
      </>
    ),
    body: "Our team coordinates directly with your venue, arrives early to set up in your chosen space, and stays for the entire rental period. When the event ends, we handle teardown — you don't lift a finger.",
    body2: "All photos are delivered digitally within 48 hours of your event, organized and ready to share. Every precious moment from your shower, preserved and yours to keep.",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const babyShowerFaqs = [
  {
    q: "How far in advance should I book a Calgary baby shower photo booth rental?",
    a: "We recommend booking 3–4 weeks in advance to ensure your preferred date and booth style are available. Weekend dates during spring and summer fill up quickly, so earlier is always better.",
  },
  {
    q: "Can the photo frames be customized for a baby shower theme?",
    a: "Absolutely. Custom-designed photo frames are included in every Calgary baby shower photo booth rental at no extra cost. Share your colour palette, theme, or any baby name details and our design team will create a frame that feels personal.",
  },
  {
    q: "What props are included for a baby shower?",
    a: "Our prop collections include a mix of playful baby-themed signs, fun stick props, and accessories that suit guests of all ages. We also accommodate custom prop requests — just let us know what you have in mind when booking your Calgary photo booth rental.",
  },
  {
    q: "How much space does the booth need at the venue?",
    a: "Our standard and mirror booths need a minimum 8' × 8' space with a nearby power outlet. The 360° video booth requires approximately 10' × 10'. We recommend placing the booth in a central area so guests naturally gravitate toward it.",
  },
  {
    q: "Can guests share photos on social media from the booth?",
    a: "Yes. Our Calgary photo booth rentals support instant sharing to Instagram and Facebook, and guests can also text or email photos directly. You'll also receive a full digital gallery of all photos within 48 hours of the event.",
  },
  {
    q: "What's included in a Calgary baby shower photo booth rental?",
    a: "Every rental includes your choice of photo booth, a professional on-site attendant, full setup and takedown, unlimited instant prints, a curated props collection, a custom-designed photo frame, and digital delivery of all photos after the event.",
  },
  {
    q: "Do you serve baby shower venues outside of Calgary?",
    a: "Yes — we regularly serve Airdrie, Cochrane, Okotoks, Canmore, and the greater Calgary region. Travel fees may apply for venues beyond a certain distance. Reach out to confirm availability for your location.",
  },
];

function BabyShowerFAQ() {
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
          <AnimLine><span style={{ fontSize: "0.5em", letterSpacing: "-0.02em" }}>Calgary Baby Shower Photo Booth Rental</span></AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Questions.</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {babyShowerFaqs.map((faq, i) => (
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
export default function BabyShowerPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <ActivityHero
          line1="Calgary"
          circleWord="Baby Showers"
          circleStroke="rgba(108,92,231,0.9)"
          circlePathD="M100 0 C140 -2, 180 8, 192 28 C200 42, 196 58, 180 70 C160 80, 134 82, 100 81 C66 80, 38 74, 18 62 C4 52, 4 28, 12 14 C26 1, 60 -4, 84 -3 C92 -3, 96 -1, 100 0"
          line2Suffix=" Photo Booth Rental."
          subtext="Bring fun, laughter, and lasting memories to your Calgary baby shower — with custom-themed props, unlimited prints, and a professional setup that lets you enjoy every moment."
          ctaText="Book Your Baby Shower Booth"
          ctaColor="#6C5CE7"
          bgSrc="/baby-shower.jpg"
          bgAlt="Calgary baby shower photo booth setup"
          sticker1Src="/icons/Asset 9pink-soother.svg"
          sticker1Rotation="6deg"
          sticker2Src="/icons/Asset 8blue-soother.svg"
          sticker2Rotation="8deg"
        />
        <BabyShowerIntro />
        {babyShowerSections.map((section, i) => (
          <AlternatingSection key={i} section={section} />
        ))}
        <BabyShowerFAQ />
        <BookingCTA
          headingLine1="Book Your Calgary"
          headingLine2={<em>Baby Shower Photo Booth Rental</em>}
        />
      </main>
      <Footer />
    </>
  );
}

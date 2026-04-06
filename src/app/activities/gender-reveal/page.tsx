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
function GenderRevealIntro() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>
                Gender Reveal Photo Booths
              </p>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e" }} stagger={90}>
                <AnimLine>The moment</AnimLine>
                <AnimLine>everyone is</AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>waiting for.</em></AnimLine>
              </AnimatedText>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ paddingTop: "clamp(0px, 2vw, 40px)" }}>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                A gender reveal is one of the most anticipated moments in a family's story. Our photo booth captures the excitement, the surprise, and the joy — with themed props and backdrops that make every photo feel part of the celebration.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", color: "#9ca3af", lineHeight: 1.8 }}>
                From intimate family gatherings to large celebrations, we bring the energy. Every rental includes exclusive Team Boy and Team Girl prop options, custom-designed photo frames, unlimited prints, and full digital delivery so nothing is missed.
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

const genderRevealSections: SectionData[] = [
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/salsa.jpeg",
    imageAlt: "Guests celebrating at a gender reveal photo booth in Calgary",
    label: "The Experience",
    heading: (
      <>
        <AnimLine>Celebrate in style,</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>capture the surprise.</em></AnimLine>
      </>
    ),
    body: "Our photo booth adds an interactive, festive element to your gender reveal that guests remember long after the big moment. With Team Boy and Team Girl props, vibrant backdrops, and unlimited prints, the whole party becomes part of the announcement.",
    body2: "Choose from our classic Salsa Photo Booth, interactive mirror booth, or immersive 360° video booth. Each is set up to complement your reveal's look and feel, not compete with it.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/mirror.jpeg",
    imageAlt: "Mirror photo booth at a gender reveal party",
    label: "Themed Props",
    heading: (
      <>
        <AnimLine>Team Boy or Team Girl —</AnimLine>
        <AnimLine>everyone{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <em style={{ fontStyle: "italic" }}>picks a side.</em>
            <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-8px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
              <path d="M2 10 C28 3, 70 13, 100 6 C132 0, 170 11, 198 5" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 0 }} />
            </svg>
          </span>
        </AnimLine>
      </>
    ),
    body: "Our exclusive Team Boy and Team Girl stick props turn every photo into a statement. Guests jump in with their prediction, snap a photo, and walk away with a print that captures the anticipation of the moment.",
    body2: "Beyond the reveal props, our full collection of colorful accessories adds extra fun and keeps guests of all ages engaged throughout the celebration.",
  },
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/SalsaPromoHighRes148-scaled-1.png",
    imageAlt: "Custom gender reveal themed photo frame with pink and blue colors",
    label: "The Details",
    heading: (
      <>
        <AnimLine>Backdrops and frames</AnimLine>
        <AnimLine>built for the <em style={{ fontStyle: "italic" }}>reveal.</em></AnimLine>
      </>
    ),
    body: "Custom photo frames themed to your gender reveal are included in every package at no extra cost. Pink, blue, gender-neutral — whatever direction you're going, our design team creates frames that fit the moment.",
    body2: "Our backdrop library includes vibrant colour options and themed designs perfect for a gender reveal. Or we can source a custom backdrop that matches your balloon arch, floral colours, or venue aesthetic exactly.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/360.jpeg",
    imageAlt: "360 photo booth capturing a gender reveal celebration",
    label: "Share the Joy",
    heading: (
      <>
        <AnimLine>Instant sharing,</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>digital</em> delivery.</AnimLine>
      </>
    ),
    body: "Our booths support instant sharing to Instagram and Facebook — guests can post their Team Boy or Team Girl photos in real time and spread the excitement far beyond the party room.",
    body2: "All photos are delivered to you digitally within 48 hours of the event. Every reaction, every surprise, every joyful moment — preserved and ready to share with family who couldn't be there.",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const genderRevealFaqs = [
  {
    q: "How far in advance should I book a photo booth for a gender reveal?",
    a: "We recommend booking 3–4 weeks in advance. Gender reveals are time-sensitive events, so the sooner you secure your date, the better. Weekend availability fills up quickly.",
  },
  {
    q: "Do you have Team Boy and Team Girl props?",
    a: "Yes — our gender reveal prop collection includes exclusive Team Boy and Team Girl stick props, along with a range of colorful accessories and themed signs. Custom prop requests are also welcome when booking.",
  },
  {
    q: "Can the photo frames be customized with pink and blue colours?",
    a: "Absolutely. Custom-designed frames are included in every package at no extra cost. Share your colour palette, theme, and any text or names you'd like and our design team will take it from there.",
  },
  {
    q: "What types of photo booths work best for a gender reveal?",
    a: "Our classic Salsa Photo Booth and mirror booth both work beautifully for gender reveals. The 360° video booth is especially popular for capturing the big reveal moment itself — the reaction footage is priceless.",
  },
  {
    q: "How much space does the booth need at the venue?",
    a: "Standard and mirror booths need a minimum 8' × 8' space with a nearby power outlet. The 360° video booth requires approximately 10' × 10'. We recommend a central location for easy guest access.",
  },
  {
    q: "Can guests share photos to social media from the booth?",
    a: "Yes. Our booths support instant sharing to Instagram and Facebook. Guests can also text or email photos directly from the booth. You'll receive a complete digital gallery within 48 hours of the event.",
  },
  {
    q: "What's included in a gender reveal photo booth rental?",
    a: "Every rental includes your choice of photo booth, a professional on-site attendant, full setup and takedown, unlimited instant prints, a themed props collection including Team Boy and Team Girl options, a custom-designed photo frame, and digital delivery of all photos.",
  },
];

function GenderRevealFAQ() {
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
          <AnimLine>Gender Reveal</AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Questions.</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {genderRevealFaqs.map((faq, i) => (
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
export default function GenderRevealPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <ActivityHero
          line1="Photo Booth"
          circleWord="Gender Reveal"
          circleStroke="rgba(9,132,227,0.9)"
          circlePathD="M100 4 C140 1, 180 12, 192 32 C200 46, 196 62, 180 74 C160 84, 134 86, 100 85 C66 84, 38 78, 18 66 C4 56, 4 32, 12 18 C26 5, 60 0, 84 1 C92 1, 96 3, 100 4"
          line2Suffix=" Rental Calgary."
          subtext="Capture the excitement and surprise of your gender reveal — with themed props, vibrant backdrops, and instant prints to commemorate the moment everyone's been waiting for."
          ctaText="Book Your Gender Reveal Booth"
          ctaColor="#0984E3"
          bgSrc="/gender-reveal.jpg"
          bgAlt="Gender reveal photo booth setup"
          sticker1Src="/icons/unforgettable.svg"
          sticker1Rotation="-6deg"
          sticker2Src="/icons/hero-twinkle.svg"
          sticker2Rotation="8deg"
        />
        <GenderRevealIntro />
        {genderRevealSections.map((section, i) => (
          <AlternatingSection key={i} section={section} />
        ))}
        <GenderRevealFAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

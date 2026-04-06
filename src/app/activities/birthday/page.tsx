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
function BirthdayIntro() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>
                Birthday Photo Booths
              </p>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e" }} stagger={90}>
                <AnimLine>Your birthday,</AnimLine>
                <AnimLine>your moment to</AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>shine.</em></AnimLine>
              </AnimatedText>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ paddingTop: "clamp(0px, 2vw, 40px)" }}>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                A photo booth is the party entertainment that runs itself — guests grab props, jump in, and walk away with a physical print that actually means something. It creates energy in any room and keeps guests engaged all night long.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", color: "#9ca3af", lineHeight: 1.8 }}>
                Whether it's a milestone birthday for 20 or a blowout celebration for 300, every rental includes a professional on-site attendant, custom-designed photo frames, unlimited prints, and full digital delivery. We make it easy — you just show up and celebrate.
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

const birthdaySections: SectionData[] = [
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/birthday-page/Create_an_image_using_the_atta (14).jpg",
    imageAlt: "Guests enjoying a photo booth at a Calgary birthday party",
    label: "The Experience",
    heading: (
      <>
        <AnimLine>Interactive, engaging,</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>unforgettable.</em></AnimLine>
      </>
    ),
    body: "Our photo booth creates a lively atmosphere that pulls people together — it's the activity guests actually look forward to. With a wide variety of props and our friendly on-site attendant keeping things moving, the energy stays high from the first click to the last.",
    body2: "Choose from our classic Salsa Photo Booth, interactive mirror booth, or 360° video booth. Each is tailored to match your party's vibe, whether it's an intimate dinner or a full-floor celebration.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/birthday-page/Create_an_image_using_the_atta (18).jpg",
    imageAlt: "Mirror photo booth at a birthday party",
    label: "Props & Fun",
    heading: (
      <>
        <AnimLine>Spark creativity,</AnimLine>
        <AnimLine>capture the{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <em style={{ fontStyle: "italic" }}>moment.</em>
            <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-8px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
              <path d="M2 10 C28 3, 70 13, 100 6 C132 0, 170 11, 198 5" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 9999, strokeDashoffset: 0 }} />
            </svg>
          </span>
        </AnimLine>
      </>
    ),
    body: "Our prop collections are curated to spark creativity and bring out the personality in every guest. From over-the-top birthday signs to themed accessories, every photo ends up being one people actually want to keep.",
    body2: "Unlimited prints are included in every package — every guest walks away with something in hand. No links to check, no apps to download. Just a real photo, right then and there.",
  },
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/birthday-page/full-image-home.jpg",
    imageAlt: "Custom birthday themed photo frame",
    label: "Personalized",
    heading: (
      <>
        <AnimLine>Frames designed</AnimLine>
        <AnimLine>for your <em style={{ fontStyle: "italic" }}>party.</em></AnimLine>
      </>
    ),
    body: "Custom-designed photo frames are included in every package at no extra cost. Tell us your theme, colours, and any text you want — our design team takes it from there and creates something that feels like it was made for your night.",
    body2: "Our backdrop library features over 20 options, or we can source a custom backdrop to match your party aesthetic. Your photos will look like they belong at your event — because they do.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/birthday-page/updated omage 2.jpg",
    imageAlt: "360 photo booth at a Calgary birthday event",
    label: "Seamless",
    heading: (
      <>
        <AnimLine>Professional setup,</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>instant</em> sharing.</AnimLine>
      </>
    ),
    body: "Our team handles everything — coordination with your venue, full setup before guests arrive, and staffing for the entire rental period. When the party ends, we pack up. You don't touch a thing.",
    body2: "Guests can share photos instantly to Instagram and Facebook directly from the booth. All images are delivered to you digitally within 48 hours of the event — organized, unbranded, and ready to share.",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const birthdayFaqs = [
  {
    q: "How far in advance should I book a photo booth for a birthday party?",
    a: "We recommend booking 3–4 weeks in advance. For milestone birthdays or larger events, 6–8 weeks ahead is ideal to secure your preferred date and booth style.",
  },
  {
    q: "Can photo frames be customized for a birthday theme?",
    a: "Yes — custom-designed frames are included in every package at no extra cost. Share your theme, colour palette, or any text you'd like and our design team will create something that fits your party perfectly.",
  },
  {
    q: "What types of photo booths work best for birthday parties?",
    a: "Our classic Salsa Photo Booth handles high volume well and keeps queues moving. The mirror booth adds a premium, interactive feel for more intimate celebrations. The 360° video booth is a show-stopper for larger events and works especially well for milestone birthdays.",
  },
  {
    q: "How much space does the booth need at the venue?",
    a: "Standard and mirror booths need a minimum 8' × 8' space with a nearby power outlet. The 360° video booth requires approximately 10' × 10'. A central location helps guests discover and use the booth throughout the event.",
  },
  {
    q: "Can guests share photos on social media from the booth?",
    a: "Yes. Our booths support instant sharing to Instagram and Facebook, and guests can text or email photos directly. You'll also receive a full digital gallery of all photos within 48 hours.",
  },
  {
    q: "What's included in a birthday photo booth rental?",
    a: "Every rental includes your choice of photo booth, a professional on-site attendant for the full rental period, full setup and takedown, unlimited instant prints, a curated props collection, a custom-designed photo frame, and digital delivery of all photos.",
  },
  {
    q: "Do you travel to venues outside Calgary?",
    a: "Yes — we regularly serve Airdrie, Cochrane, Okotoks, Canmore, Banff, and the greater Calgary region. Travel fees may apply for venues beyond a certain distance. Reach out to confirm availability for your location.",
  },
];

function BirthdayFAQ() {
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
          <AnimLine>Birthday</AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Questions.</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {birthdayFaqs.map((faq, i) => (
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
export default function BirthdayPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <ActivityHero
          line1="Photo Booth"
          circleWord="Birthdays"
          circleStroke="rgba(247,201,72,0.95)"
          circlePathD="M100 0 C140 -2, 180 8, 192 28 C200 42, 196 58, 180 70 C160 80, 134 82, 100 81 C66 80, 38 74, 18 62 C4 52, 4 28, 12 14 C26 1, 60 -4, 84 -3 C92 -3, 96 -1, 100 0"
          line2Suffix=" Rental Calgary."
          subtext="Make your birthday unforgettable — with a photo booth that keeps guests entertained, unlimited prints to take home, and memories that last long after the cake is gone."
          ctaText="Book Your Birthday Booth"
          ctaColor="#F7C948"
          ctaTextColor="#1a1a2e"
          bgSrc="/birthday-featured.jpg"
          bgAlt="Birthday party photo booth setup"
          sticker1Src="/icons/hero-camera.svg"
          sticker1Rotation="-8deg"
          sticker2Src="/icons/hero-twinkle.svg"
          sticker2Rotation="8deg"
        />
        <BirthdayIntro />
        {birthdaySections.map((section, i) => (
          <AlternatingSection key={i} section={section} />
        ))}
        <BirthdayFAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

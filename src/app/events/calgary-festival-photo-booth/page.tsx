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
function FestivalIntro() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>
                Calgary Festival Photo Booth Rental
              </p>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e" }} stagger={90}>
                <AnimLine>Give your crowd</AnimLine>
                <AnimLine>something to</AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>remember.</em></AnimLine>
              </AnimatedText>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ paddingTop: "clamp(0px, 2vw, 40px)" }}>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                A Calgary festival photo booth rental draws people in, keeps them engaged, and gives every attendee a tangible memory to take home. From quirky props to colorful branded backdrops, our booth becomes one of the highlights of the day.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", color: "#9ca3af", lineHeight: 1.8 }}>
                Whether you're running a local Calgary community event, a music festival, or a cultural celebration, we bring a professional setup that handles high volume with ease. Custom branding, unlimited prints, and instant social sharing — all included.
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

const festivalSections: SectionData[] = [
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/festival-page/activities-hero.jpg",
    imageAlt: "Festival attendees enjoying the photo booth in Calgary",
    label: "The Experience",
    heading: (
      <>
        <AnimLine>Interactive fun</AnimLine>
        <AnimLine>that brings people <em style={{ fontStyle: "italic" }}>together.</em></AnimLine>
      </>
    ),
    body: "Our Calgary festival photo booth rental is designed to engage festival-goers and bring strangers together through shared fun. It creates a natural gathering point on the grounds — guests find it, use it, and come back. The energy it generates spreads through the whole event.",
    body2: "Choose from our classic Salsa Photo Booth for high-volume throughput, the interactive mirror booth for a premium touch, or the 360° video booth as a showstopping installation in the middle of it all.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/festival-page/Create_an_image_using_the_atta.jpg",
    imageAlt: "Branded mirror photo booth at a Calgary festival",
    label: "Brand Your Event",
    heading: (
      <>
        <AnimLine>Custom frames that</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>promote</em> your brand.</AnimLine>
      </>
    ),
    body: "Every photo becomes a branded touchpoint. Custom photo frames and backgrounds featuring your festival logo, sponsors, or theme turn each print into a keepsake that also promotes your Calgary event — long after the gates close.",
    body2: "Instant social sharing means attendees post their photos in real time, extending your festival's reach organically on Instagram, Facebook, and beyond. Every share is free advertising.",
  },
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/festival-page/festivals-and-events.jpg",
    imageAlt: "Festival-themed photo props and accessories in Calgary",
    label: "Props & Prints",
    heading: (
      <>
        <AnimLine>Colorful props,</AnimLine>
        <AnimLine>unlimited <em style={{ fontStyle: "italic" }}>prints.</em></AnimLine>
      </>
    ),
    body: "Our wide selection of colorful props adds creativity and spontaneity to every photo. Festival-goers love diving into the collection — it's one of those moments where people let go and have genuine fun.",
    body2: "Every guest can print as many photos as they want. No limits, no upsells — unlimited prints are included in every Calgary festival photo booth rental package.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/festival-page/remove_the_word__backdrop__any.jpg",
    imageAlt: "360 degree video booth at a Calgary festival",
    label: "Professional Setup",
    heading: (
      <>
        <AnimLine>Seamless from</AnimLine>
        <AnimLine>setup to <em style={{ fontStyle: "italic" }}>last call.</em></AnimLine>
      </>
    ),
    body: "Our team handles everything — coordinating with your Calgary event logistics, arriving early, setting up in your chosen location, and staffing the booth for the full duration. No headaches, no surprises.",
    body2: "All photos are delivered digitally within 48 hours of your event. A complete gallery of every moment, ready to use for post-event marketing, social content, and attendee recaps.",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const festivalFaqs = [
  {
    q: "How far in advance should I book a Calgary festival photo booth rental?",
    a: "For Calgary festivals and larger events, we recommend booking 6–8 weeks in advance, particularly for summer dates. Multi-day festivals or events requiring multiple booths should reach out even earlier.",
  },
  {
    q: "Can the Calgary photo booth be branded with our festival's logo?",
    a: "Yes — custom photo frames featuring your festival branding, sponsors, or theme are included in every Calgary festival photo booth rental at no extra cost. We can also create custom backdrop options to match your event's visual identity.",
  },
  {
    q: "Can the booth handle high foot traffic at a large Calgary festival?",
    a: "Absolutely. Our classic Salsa Photo Booth is built for high-volume events and moves guests through efficiently. For larger Calgary festivals, we can discuss running multiple booths to ensure no one waits too long.",
  },
  {
    q: "How much space does the booth need on the festival grounds?",
    a: "Standard and mirror booths require a minimum 8' × 8' area with a standard power outlet nearby. The 360° video booth needs approximately 10' × 10'. We recommend a high-traffic, visible location for maximum engagement.",
  },
  {
    q: "Can guests share photos to social media directly from the Calgary photo booth?",
    a: "Yes. Our booths support instant sharing to Instagram, Facebook, and more. Guests can text or email their photos on the spot. This drives real-time social coverage of your Calgary event organically.",
  },
  {
    q: "What's included in a Calgary festival photo booth rental?",
    a: "Every rental includes your choice of photo booth, a professional on-site attendant, full setup and takedown, unlimited instant prints, a curated props collection, custom-branded photo frames, and digital delivery of all photos after the event.",
  },
  {
    q: "Do you do multi-day Calgary festivals or outdoor events?",
    a: "Yes — we accommodate multi-day events and outdoor setups across Calgary and Alberta. Reach out with your event details and we'll put together a package that fits your specific requirements, including weather considerations for outdoor venues.",
  },
];

function FestivalFAQ() {
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
          <AnimLine><span style={{ fontSize: "0.5em", letterSpacing: "-0.02em" }}>Calgary Festival Photo Booth Rental</span></AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Questions.</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {festivalFaqs.map((faq, i) => (
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
export default function FestivalPage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <ActivityHero
          line1="Calgary"
          circleWord="Festivals"
          circleStroke="rgba(255,107,53,0.95)"
          circlePathD="M100 4 C140 1, 180 12, 192 32 C200 46, 196 62, 180 74 C160 84, 134 86, 100 85 C66 84, 38 78, 18 66 C4 56, 4 32, 12 18 C26 5, 60 0, 84 1 C92 1, 96 3, 100 4"
          line2Suffix=" Photo Booth Rental."
          subtext="Add an extra layer of excitement to your Calgary festival — with vibrant props, branded frames, unlimited prints, and an experience your attendees will be talking about long after the last set ends."
          ctaText="Book Your Festival Booth"
          ctaColor="#FF6B35"
          bgSrc="/festivals-and-events.jpg"
          bgAlt="Calgary festival photo booth setup"
          sticker1Src="/icons/Asset 3disco-ball.svg"
          sticker1Rotation="8deg"
          sticker2Src="/icons/Asset 2music-note.svg"
          sticker2Rotation="-10deg"
          sticker2Size="clamp(64px, 7vw, 100px)"
        />
        <FestivalIntro />
        {festivalSections.map((section, i) => (
          <AlternatingSection key={i} section={section} />
        ))}
        <FestivalFAQ />
        <BookingCTA
          headingLine1="Book Your Calgary"
          headingLine2={<em>Festival Photo Booth Rental</em>}
        />
      </main>
      <Footer />
    </>
  );
}

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
function CorporateIntro() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <RevealOnScroll direction="left">
            <div>
              <p style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>
                Corporate Photo Booths
              </p>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e" }} stagger={90}>
                <AnimLine>Your brand,</AnimLine>
                <AnimLine>your team, your</AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>moment.</em></AnimLine>
              </AnimatedText>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ paddingTop: "clamp(0px, 2vw, 40px)" }}>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                A photo booth at your company event breaks down walls, gets colleagues laughing together, and creates a shared experience people actually talk about the next day. It's engagement that doesn't feel forced — it just happens naturally.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", color: "#9ca3af", lineHeight: 1.8 }}>
                From holiday parties and team celebrations to product launches and conferences, we bring a professional setup that reflects your brand. Custom frames featuring your logo, branded backgrounds, and instant social sharing — all handled by our on-site team.
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

const corporateSections: SectionData[] = [
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/corporate-page/Create_an_image_using_the_atta (20).jpg",
    imageAlt: "Colleagues enjoying the photo booth at a Calgary corporate event",
    label: "Team Engagement",
    heading: (
      <>
        <AnimLine>Bring your team</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>together.</em></AnimLine>
      </>
    ),
    body: "Our photo booth encourages interaction and genuine fun among colleagues — without anyone having to organize a team-building exercise. People gravitate toward it naturally, jump in with each other, and leave with a shared memory. It creates the lively atmosphere that makes company events worth attending.",
    body2: "Choose from our classic Salsa Photo Booth for high-volume events, the interactive mirror booth for a premium experience, or the 360° video booth as a centerpiece installation your team won't stop talking about.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/corporate-page/Create_an_image_using_the_atta.jpg",
    imageAlt: "Branded mirror photo booth at a corporate event",
    label: "Brand Exposure",
    heading: (
      <>
        <AnimLine>Every print is a</AnimLine>
        <AnimLine><em style={{ fontStyle: "italic" }}>branded</em> takeaway.</AnimLine>
      </>
    ),
    body: "Custom photo frames featuring your company logo, event name, or sponsor branding turn every print into a branded keepsake. Colleagues take them home, display them, and your brand stays top of mind long after the party ends.",
    body2: "Instant social sharing to Instagram, Facebook, and LinkedIn means your event gets organic coverage in real time. Every post extends your reach without a single paid impression.",
  },
  {
    bg: "#f9f9f9",
    imageLeft: true,
    image: "/corporate-page/festivals-and-events.jpg",
    imageAlt: "Custom corporate branded photo frame and backdrop",
    label: "Custom Branding",
    heading: (
      <>
        <AnimLine>Backdrops and frames</AnimLine>
        <AnimLine>that match your <em style={{ fontStyle: "italic" }}>brand.</em></AnimLine>
      </>
    ),
    body: "From branded backdrops featuring your company colours to fully custom frame designs, every element of the booth can reflect your corporate identity. Share your brand guidelines and our design team takes it from there.",
    body2: "Our backdrop library offers over 20 options, or we can source a fully custom backdrop. Whether it's a holiday party or a product launch, the booth looks like it belongs — because it was built for your event.",
  },
  {
    bg: "#fff",
    imageLeft: false,
    image: "/corporate-page/remove_the_text_on_the_pointer.jpg",
    imageAlt: "360 degree video booth at a corporate Calgary event",
    label: "Seamless Execution",
    heading: (
      <>
        <AnimLine>Professional from</AnimLine>
        <AnimLine>start to <em style={{ fontStyle: "italic" }}>finish.</em></AnimLine>
      </>
    ),
    body: "Our team coordinates directly with your event organizer or venue, arrives early to set up, and staffs the booth professionally for the entire rental period. No disruptions, no fumbling — just a clean, seamless experience that reflects well on your company.",
    body2: "All photos are delivered digitally within 48 hours. Use them for internal comms, social media recaps, or employee recognition content. Everything organized, unbranded, and ready to use.",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const corporateFaqs = [
  {
    q: "How far in advance should I book a photo booth for a corporate event?",
    a: "We recommend booking 4–6 weeks in advance. For large conferences, holiday parties, or events with specific branding requirements, 8 weeks ahead gives us enough time to execute custom frames and backdrops properly.",
  },
  {
    q: "Can the photo booth be fully branded with our company logo?",
    a: "Yes — custom photo frames featuring your logo, event name, or sponsor branding are included in every package at no extra cost. Custom backdrops with your brand identity are also available. Share your brand guidelines when booking.",
  },
  {
    q: "What types of photo booths work best for corporate events?",
    a: "Our mirror booth is popular for corporate events — it feels premium and interactive, which suits a professional setting well. The classic Salsa Photo Booth handles high volume efficiently. The 360° video booth works especially well as a centerpiece for product launches or large conferences.",
  },
  {
    q: "How much space does the booth need at the venue?",
    a: "Standard and mirror booths require a minimum 8' × 8' space with a standard power outlet. The 360° video booth needs approximately 10' × 10'. A visible, central location maximizes guest engagement throughout the event.",
  },
  {
    q: "Can employees share photos to LinkedIn and other social platforms?",
    a: "Yes. Our booths support instant sharing to Instagram, Facebook, and guests can text or email photos directly. LinkedIn sharing can be done manually from any shared photo. All images are delivered digitally within 48 hours for your internal use as well.",
  },
  {
    q: "What's included in a corporate photo booth rental?",
    a: "Every rental includes your choice of photo booth, a professional on-site attendant, full setup and takedown, unlimited instant prints, a curated props collection, custom-branded photo frames, and digital delivery of all photos after the event.",
  },
  {
    q: "Do you work with event planners and corporate venues?",
    a: "Yes — we regularly work alongside event planners and coordinate directly with corporate venues across Calgary and Alberta. We're experienced at working within venue load-in windows and AV setups. Reach out with your event details and we'll take it from there.",
  },
];

function CorporateFAQ() {
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
          <AnimLine>Corporate</AnimLine>
          <AnimLine><em style={{ fontStyle: "italic" }}>Questions.</em></AnimLine>
        </AnimatedText>

        <div style={{ maxWidth: 900, borderTop: "1px solid #e5e7eb", margin: "0 auto" }}>
          {corporateFaqs.map((faq, i) => (
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
export default function CorporatePage() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <ActivityHero
          line1="Photo Booth"
          circleWord="Corporate"
          circleStroke="rgba(0,184,148,0.9)"
          circlePathD="M100 0 C140 -2, 180 8, 192 28 C200 42, 196 58, 180 70 C160 80, 134 82, 100 81 C66 80, 38 74, 18 62 C4 52, 4 28, 12 14 C26 1, 60 -4, 84 -3 C92 -3, 96 -1, 100 0"
          line2Suffix=" Rental Calgary."
          subtext="Elevate your company event with a branded photo booth experience — custom frames, instant social sharing, and unlimited prints that double as branded take-homes for every attendee."
          ctaText="Book Your Corporate Booth"
          ctaColor="#00B894"
          bgSrc="/corporate.jpg"
          bgAlt="Corporate event photo booth setup"
          sticker1Src="/icons/hero-camera.svg"
          sticker1Rotation="-6deg"
          sticker2Src="/icons/hero-twinkle.svg"
          sticker2Rotation="8deg"
        />
        <CorporateIntro />
        {corporateSections.map((section, i) => (
          <AlternatingSection key={i} section={section} />
        ))}
        <CorporateFAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

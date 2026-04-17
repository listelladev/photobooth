"use client";
import { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";

const includedItems = [
  { icon: "/icons/product-pages/still-photos.svg", label: "Still Photos" },
  { icon: "/icons/product-pages/pro-quality-on-site-printing.svg", label: "Pro-Quality On Site Printing" },
  { icon: "/icons/product-pages/social-sharing-airdrops-and-qr-codes.svg", label: "Social Sharing, Airdrops & QR Codes" },
  { icon: "/icons/product-pages/custom-branding-and-frames.svg", label: "Custom Branding & Frames" },
  { icon: "/icons/product-pages/data-capture.svg", label: "Data Capture" },
  { icon: "/icons/product-pages/face-swap.svg", label: "Face Swap" },
  { icon: "/icons/product-pages/background-removal.svg", label: "Background Removal" },
];

const pricingTiers = [
  { label: "2 Hours", price: "$350" },
  { label: "3 Hours", price: "$475" },
  { label: "4 Hours", price: "$600" },
  { label: "5+ Hours", price: "$600 + $125/hr", muted: true },
];

const faqs = [
  { q: "How does the AI PhotoBooth work?", a: "Guests step in front of the camera and choose from a selection of AI art styles. In seconds, the AI analyzes the photo and generates a stunning artistic portrait — whether that's a watercolour painting, a bold digital illustration, or a cinematic portrait style." },
  { q: "Do guests keep their original photo as well?", a: "Yes — guests receive both the original photo and the AI-transformed version, delivered instantly via QR code to their phone." },
  { q: "What AI styles are available?", a: "Styles are updated regularly and include painterly portraits, graphic art, fantasy themes, editorial fashion styles, and more. We'll confirm the available styles for your event date." },
  { q: "Can the booth do face swap?", a: "Yes — face swap is one of the popular features available, letting guests swap faces with each other or with pre-loaded fun characters." },
  { q: "Is printing available?", a: "Yes — add our Instant Printing add-on to give guests a physical keepsake of their AI portrait." },
  { q: "What events work best with the AI PhotoBooth?", a: "It's a showstopper at weddings, corporate events, product launches, brand activations, grad parties, and any event where you want guests buzzing and posting." },
  { q: "How do guests access their photos?", a: "Each session ends with a QR code the guest scans with their phone — photos are in their hands within seconds, ready to share wherever they like." },
  { q: "Is this booth suitable for all ages?", a: "Absolutely. The AI booth is intuitive and endlessly entertaining for guests of all ages — from kids who love the fun styles to adults wowed by the portrait quality." },
];

function useAnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    const el = pathRef.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const len = el.getTotalLength(); el.style.strokeDasharray = `${len}`; el.style.strokeDashoffset = `${len}`;
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)"; el.style.strokeDashoffset = "0"; }));
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return pathRef;
}

function Hero() {
  const subRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => { if (subRef.current) { subRef.current.style.transform = "translateY(0)"; subRef.current.style.opacity = "1"; } }, 540);
    setTimeout(() => {
      const c = underlineRef.current; if (!c) return;
      const len = c.getTotalLength(); c.style.strokeDasharray = `${len}`; c.style.strokeDashoffset = `${len}`;
      requestAnimationFrame(() => requestAnimationFrame(() => { c.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)"; c.style.strokeDashoffset = "0"; }));
    }, 700);
    setTimeout(() => setS1(true), 500);
    setTimeout(() => setS2(true), 950);
  }, []);
  const sa = (a: boolean, r: number): React.CSSProperties => ({ transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1),opacity 0.25s ease", transform: a ? `scale(1) rotate(${r}deg)` : "scale(0) rotate(-18deg)", opacity: a ? 1 : 0 });
  return (
    <section style={{ padding: "clamp(8px,1vw,16px)", minHeight: "70vh", display: "flex" }}>
      <div className="relative w-full overflow-hidden" style={{ borderRadius: "clamp(12px,1.5vw,24px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="absolute inset-0">
          <img src="/products/ai-photobooth/ai%20photobooth%201.jpg" alt="AI PhotoBooth" className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(125deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.52) 55%,rgba(0,0,0,0.70) 100%)" }} />
        </div>
        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5 }}><div style={sa(s1, -6)}><img src="/icons/pool-of-icons/unforgettable-2.svg" alt="" style={{ width: "clamp(60px,7vw,108px)", height: "auto" }} /></div></div>
        <div className="absolute" style={{ bottom: "18%", right: "5%", zIndex: 5 }}><div style={sa(s2, 8)}><img src="/icons/pool-of-icons/choose-your--product.svg" alt="" style={{ width: "clamp(44px,5vw,76px)", height: "auto" }} /></div></div>
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px,9vw,116px) clamp(28px,6vw,100px) clamp(8px,1vw,12px)" }}>
          <h1 className="font-heading" style={{ fontSize: "clamp(44px,7vw,106px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(20px,2.5vw,32px)", opacity: visible ? 1 : 0, transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
            <span style={{ position: "relative", display: "inline-block" }}>AI Photo
              <svg aria-hidden="true" viewBox="0 0 260 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible" }}>
                <path ref={underlineRef} d="M4 10 C40 3,100 13,160 7 C220 1,260 11,256 6" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span><br /><em style={{ fontStyle: "italic" }}>Booth.</em>
          </h1>
          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p ref={subRef} style={{ fontSize: "clamp(16px,1.3vw,20px)", fontWeight: 400, color: "rgba(255,255,255,0.65)", maxWidth: 600, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s,opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}>
              Next-Generation AI Portraits. Real-Time. Stunning. Instantly Shareable.
            </p>
          </div>
          <div style={{ overflow: "hidden", marginTop: "clamp(28px,3.5vw,48px)" }}>
            <RevealOnScroll direction="up">
              <a href="/contact" style={{ display: "inline-block", padding: "clamp(13px,1.4vw,16px) clamp(28px,2.5vw,36px)", background: "#FF6B35", color: "#fff", borderRadius: 60, fontSize: 15, fontWeight: 700, fontFamily: "dm-sans,sans-serif", textDecoration: "none", transition: "opacity 0.3s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>Book Now</a>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const circleRef = useAnimatedPath();
  return (
    <section style={{ padding: "clamp(80px,12vw,180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px,7vw,100px)", alignItems: "center" }}>
          <RevealOnScroll direction="left" className="order-2 lg:order-1">
            <div style={{ borderRadius: "clamp(16px,2vw,24px)", overflow: "hidden", aspectRatio: "4/3" }}>
              <img src="/products/ai-photobooth/ai%20photobooth%202.jpg" alt="AI PhotoBooth in action" className="w-full h-full object-cover" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150} className="order-1 lg:order-2">
            <div>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px,4vw,60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(20px,2.5vw,32px)" }} stagger={90}>
                <AnimLine>Photos <span style={{ position: "relative", display: "inline-block" }}>unlike
                  <svg aria-hidden="true" viewBox="0 0 150 56" preserveAspectRatio="none" style={{ position: "absolute", top: "-0.06em", bottom: "-0.08em", left: "-0.1em", right: "-0.1em", width: "calc(100% + 0.2em)", height: "calc(100% + 0.14em)", overflow: "visible", pointerEvents: "none" }}>
                    <path ref={circleRef} d="M75 3 C105 1,138 12,143 28 C147 42,138 52,118 55 C98 58,52 56,32 50 C12 44,5 30,10 18 C16 7,42 1,75 3" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span></AnimLine>
                <AnimLine>anything <em style={{ fontStyle: "italic" }}>before.</em></AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px,1.1vw,18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 20 }}>The AI PhotoBooth isn&apos;t just a photo booth — it&apos;s a creative experience unlike anything your guests have encountered before. Using cutting-edge artificial intelligence, the booth transforms ordinary photos into extraordinary artistic portraits in real time, choosing from a range of stunning visual styles that leave every guest amazed.</p>
              <p style={{ fontSize: "clamp(15px,1.1vw,18px)", color: "#6b7280", lineHeight: 1.8 }}>From vibrant digital art to elegant painterly portraits, every image is one-of-a-kind, delivered instantly, and designed to be shared. It&apos;s the booth that generates buzz during the event — and keeps generating it on social media for days after.</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function WhatsIncluded() {
  const underlineRef = useAnimatedPath();
  return (
    <section style={{ padding: "clamp(80px,12vw,180px) 0", background: "#f9f9f9" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(40px,6vw,90px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e", textAlign: "center", marginBottom: "clamp(56px,7vw,88px)" }} stagger={90}>
          <AnimLine>What&apos;s</AnimLine>
          <AnimLine><span style={{ position: "relative", display: "inline-block" }}>Included.
            <svg aria-hidden="true" viewBox="0 0 260 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
              <path ref={underlineRef} d="M3 9 C36 3,90 13,130 7 C170 1,224 11,257 6" fill="none" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span></AnimLine>
        </AnimatedText>
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "clamp(16px,2vw,24px)" }}>
          {includedItems.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 55} className="h-full">
              <div style={{ background: "#fff", borderRadius: 16, padding: "clamp(20px,2vw,28px) clamp(12px,1.5vw,20px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
                <div style={{ width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, flexShrink: 0 }}>
                  <img src={item.icon} alt={item.label} style={{ width: 64, height: 64, objectFit: "contain", display: "block" }} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", lineHeight: 1.45, letterSpacing: "0.01em" }}>{item.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section style={{ padding: "clamp(80px,12vw,180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(48px,7vw,100px)", alignItems: "start" }}>
          <RevealOnScroll direction="left">
            <div>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(36px,5vw,76px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: "#1a1a2e" }} stagger={90}>
                <AnimLine>Pricing.</AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(14px,1vw,16px)", color: "#9ca3af", marginTop: "clamp(16px,2vw,24px)", lineHeight: 1.7 }}>Minimum booking: 2 hours. Starting at $299+ taxes.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150}>
            <div style={{ borderRadius: "clamp(16px,1.5vw,20px)", overflow: "hidden", border: "1px solid #e5e7eb" }}>
              <div className="grid grid-cols-2" style={{ background: "#141414", padding: "clamp(16px,1.5vw,20px) clamp(24px,2.5vw,36px)" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Package</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "right" }}>Price</span>
              </div>
              {pricingTiers.map((tier, i) => (
                <div key={i} className="grid grid-cols-2" style={{ padding: "clamp(18px,1.8vw,24px) clamp(24px,2.5vw,36px)", borderTop: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#fafafa", alignItems: "center" }}>
                  <span style={{ fontSize: "clamp(14px,1.1vw,17px)", fontWeight: tier.muted ? 400 : 500, color: tier.muted ? "#9ca3af" : "#1a1a2e" }}>{tier.label}</span>
                  <span className="font-heading" style={{ fontSize: "clamp(20px,2vw,30px)", letterSpacing: "-0.03em", color: tier.muted ? "#9ca3af" : "#FF6B35", textAlign: "right" }}>{tier.price}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const underlineRef = useAnimatedPath();
  return (
    <section style={{ padding: "clamp(80px,12vw,180px) 0", background: "#f9f9f9" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(48px,6vw,80px)", alignItems: "start" }}>
          <div className="lg:col-span-7">
            <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(40px,5vw,64px)" }} stagger={90}>
              <AnimLine>Frequently asked</AnimLine>
              <AnimLine><span style={{ position: "relative", display: "inline-block" }}><em style={{ fontStyle: "italic" }}>questions.</em>
                <svg aria-hidden="true" viewBox="0 0 260 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
                  <path ref={underlineRef} d="M3 9 C36 3,90 13,130 7 C170 1,224 11,257 6" fill="none" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span></AnimLine>
            </AnimatedText>
            <div style={{ borderTop: "1px solid #e5e7eb" }}>
              {faqs.map((faq, i) => (
                <RevealOnScroll key={i} delay={i * 40}>
                  <div style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between text-left cursor-pointer" style={{ padding: "clamp(18px,2vw,28px) 0", background: "none", border: "none" }}>
                      <span className="font-heading" style={{ fontSize: "clamp(16px,1.2vw,20px)", color: "#1a1a2e", paddingRight: 24, letterSpacing: "-0.01em" }}>{faq.q}</span>
                      <span style={{ flexShrink: 0, transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)", transform: open === i ? "rotate(45deg)" : "none", fontSize: 24, color: "#1a1a2e", lineHeight: 1 }}>+</span>
                    </button>
                    <div className="overflow-hidden" style={{ maxHeight: open === i ? 400 : 0, transition: "max-height 0.6s cubic-bezier(0.22,1,0.36,1)" }}>
                      <p style={{ fontSize: "clamp(14px,1vw,17px)", lineHeight: 1.75, color: "#6b7280", paddingBottom: "clamp(18px,2vw,28px)", maxWidth: 580 }}>{faq.a}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block" style={{ alignSelf: "start", position: "sticky", top: "clamp(80px,8vw,120px)" }}>
            <RevealOnScroll direction="right">
              <div style={{ borderRadius: "clamp(14px,1.5vw,20px)", overflow: "hidden", aspectRatio: "4/3" }}>
                <img src="/products/ai-photobooth/ai%20photobooth%201.jpg" alt="AI PhotoBooth" className="w-full h-full object-cover" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
        <div className="flex flex-col lg:hidden" style={{ gap: "clamp(14px,3vw,20px)", marginTop: "clamp(40px,6vw,64px)" }}>
          <RevealOnScroll>
            <div style={{ borderRadius: "clamp(14px,1.5vw,20px)", overflow: "hidden", aspectRatio: "4/3" }}>
              <img src="/products/ai-photobooth/ai%20photobooth%201.jpg" alt="AI PhotoBooth" className="w-full h-full object-cover" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function ReadyToBook() {
  return (
    <section style={{ padding: "clamp(80px,12vw,180px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", textAlign: "center" }}>
        <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(40px,6vw,90px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(12px,1.5vw,20px)" }} stagger={90}>
          <AnimLine>Ready to Book?</AnimLine>
        </AnimatedText>
        <RevealOnScroll delay={150}>
          <p style={{ fontSize: "clamp(16px,1.3vw,20px)", color: "#6b7280", lineHeight: 1.7, marginBottom: "clamp(32px,4vw,52px)" }}>Reach out and secure your date today!</p>
          <a href="/contact" style={{ display: "inline-block", padding: "clamp(14px,1.5vw,18px) clamp(36px,3vw,52px)", background: "#FF6B35", color: "#fff", borderRadius: 60, fontSize: "clamp(14px,1vw,16px)", fontWeight: 700, fontFamily: "dm-sans,sans-serif", textDecoration: "none", transition: "opacity 0.3s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>Book Now</a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default function AIPhotoBoothPage() {
  return (
    <><SmoothScroll /><CursorTag /><Navbar />
      <main><Hero /><Intro /><WhatsIncluded /><Pricing /><FAQSection /><ReadyToBook /></main>
      <Footer />
    </>
  );
}

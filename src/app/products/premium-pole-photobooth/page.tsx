"use client";
import { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";

const includedItems = [
  { icon: "/icons/product-pages/still-photos.svg", label: "Still DSLR Photos" },
  { icon: "/icons/product-pages/animated-gif.svg", label: "Animated GIF" },
  { icon: "/icons/product-pages/boomerang-gif.svg", label: "Boomerang GIF" },
  { icon: "/icons/product-pages/pro-quality-on-site-printing.svg", label: "Pro-Quality On Site Printing" },
  { icon: "/icons/product-pages/social-sharing-airdrops-and-qr-codes.svg", label: "Social Sharing, Airdrops & QR Codes" },
  { icon: "/icons/product-pages/custom-branding-and-frames.svg", label: "Custom Branding & Frames" },
  { icon: "/icons/product-pages/data-capture.svg", label: "Data Capture" },
  { icon: "/icons/product-pages/set-up-and-take-down.svg", label: "Set up and Take Down" },
  { icon: "/icons/product-pages/props.svg", label: "Props" },
];

const pricingTiers = [
  { label: "2 Hours", price: "$349" },
  { label: "3 Hours", price: "$449" },
  { label: "4 Hours", price: "$549" },
  { label: "Additional Hour", price: "$109 / hr", muted: true },
];

const faqs = [
  { q: "What makes this different from the Compact Booth?", a: "The key difference is the camera. The Premium Booth uses a professional DSLR camera, which produces noticeably sharper images with better depth and colour accuracy — especially in indoor lighting conditions common at events." },
  { q: "Is this booth available right now?", a: "We're in the final stages of launching this premium option. Reach out to us to get on the waitlist and secure your date — we'll confirm availability as soon as it's ready." },
  { q: "Can we still customize templates and branding?", a: "Absolutely. Custom branding, colour themes, and event-specific templates are all included — just like our other booth packages." },
  { q: "Does this booth include printing?", a: "Printing is available as an add-on with our Instant High Quality Printing package, which delivers professional dye-sublimation prints in seconds." },
  { q: "What events is the Premium Booth best suited for?", a: "It's ideal for weddings, corporate galas, award ceremonies, luxury birthday parties, and any event where guests expect a high-end experience." },
  { q: "Is an attendant included?", a: "Yes — a professional attendant is included with every rental to manage the booth and keep your guests' experience seamless." },
  { q: "How much space is required?", a: "The Premium Pole Booth has a similarly compact footprint, needing roughly 5×5 ft of floor space — easy to accommodate in most venues." },
];

function useAnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.strokeDashoffset = "0";
        }));
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
      requestAnimationFrame(() => requestAnimationFrame(() => { c.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)"; c.style.strokeDashoffset = "0"; }));
    }, 700);
    setTimeout(() => setS1(true), 500);
    setTimeout(() => setS2(true), 950);
  }, []);
  const sa = (a: boolean, r: number): React.CSSProperties => ({ transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1),opacity 0.25s ease", transform: a ? `scale(1) rotate(${r}deg)` : "scale(0) rotate(-18deg)", opacity: a ? 1 : 0 });
  return (
    <section style={{ padding: "clamp(8px,1vw,16px)", minHeight: "70vh", display: "flex" }}>
      <div className="relative w-full overflow-hidden" style={{ borderRadius: "clamp(12px,1.5vw,24px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="absolute inset-0">
          <img src="/products/premium-backdrops/Premium%20Pole%20PhotoBooth1.jpg" alt="Premium Pole PhotoBooth" className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(125deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.52) 55%,rgba(0,0,0,0.70) 100%)" }} />
        </div>
        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5 }}><div style={sa(s1, -6)}><img src="/icons/pool-of-icons/Asset%203photo-stand.svg" alt="" style={{ width: "clamp(60px,7vw,108px)", height: "auto" }} /></div></div>
        <div className="absolute" style={{ bottom: "18%", right: "5%", zIndex: 5 }}><div style={sa(s2, 8)}><img src="/icons/pool-of-icons/hero-camera.svg" alt="" style={{ width: "clamp(44px,5vw,76px)", height: "auto" }} /></div></div>
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px,9vw,116px) clamp(28px,6vw,100px) clamp(8px,1vw,12px)" }}>
          <h1 className="font-heading" style={{ fontSize: "clamp(44px,7vw,106px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(20px,2.5vw,32px)", opacity: visible ? 1 : 0, transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
            <span style={{ position: "relative", display: "inline-block" }}>Premium Pole
              <svg aria-hidden="true" viewBox="0 0 320 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible" }}>
                <path ref={underlineRef} d="M4 10 C40 3,100 13,160 7 C220 1,280 11,316 6" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span><br /><em style={{ fontStyle: "italic" }}>PhotoBooth.</em>
          </h1>
          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p ref={subRef} style={{ fontSize: "clamp(16px,1.3vw,20px)", fontWeight: 400, color: "rgba(255,255,255,0.65)", maxWidth: 600, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s,opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}>
              Professional DSLR Quality. Polished Finish. Unforgettable Prints.
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
              <img src="/products/premium-backdrops/premium%20pole%20photobooth%202.jpg" alt="Premium Pole PhotoBooth" className="w-full h-full object-cover" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150} className="order-1 lg:order-2">
            <div>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px,4vw,60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(20px,2.5vw,32px)" }} stagger={90}>
                <AnimLine>The classic booth,</AnimLine>
                <AnimLine><span style={{ position: "relative", display: "inline-block" }}>elevated.
                  <svg aria-hidden="true" viewBox="0 0 200 72" preserveAspectRatio="none" style={{ position: "absolute", top: "-0.06em", bottom: "-0.08em", left: "-0.1em", right: "-0.1em", width: "calc(100% + 0.2em)", height: "calc(100% + 0.14em)", overflow: "visible", pointerEvents: "none" }}>
                    <path ref={circleRef} d="M100 4 C138 1,178 14,193 34 C204 50,196 66,174 73 C150 80,116 80,86 78 C54 74,16 62,6 44 C-4 28,8 10,30 5 C52 0,76 1,100 4" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span></AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px,1.1vw,18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 20 }}>The Premium Pole PhotoBooth is the classic booth experience — elevated. Powered by a professional DSLR camera, this booth captures razor-sharp images with rich colour, stunning depth, and the kind of quality that simply can't be replicated by a smartphone or tablet camera.</p>
              <p style={{ fontSize: "clamp(15px,1.1vw,18px)", color: "#6b7280", lineHeight: 1.8 }}>With its sleek, polished hardware and premium finish, this booth is built for events where aesthetics matter as much as the experience — upscale weddings, galas, corporate functions, and milestone celebrations where only the best will do.</p>
              <p style={{ fontSize: "clamp(14px,1vw,17px)", color: "#9ca3af", lineHeight: 1.75, marginTop: 20 }}>
                <em>Coming Soon — We&apos;re putting the finishing touches on this premium offering. Book now to lock in your date and be among the first to experience it!</em>
              </p>
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
        <div className="grid grid-cols-3 sm:grid-cols-5" style={{ gap: "clamp(40px,5vw,72px) clamp(16px,2vw,32px)" }}>
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
              <p style={{ fontSize: "clamp(14px,1vw,16px)", color: "#9ca3af", marginTop: "clamp(16px,2vw,24px)", lineHeight: 1.7 }}>Minimum booking: 2 hours. Starting at $249+ taxes.</p>
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
                <img src="/products/premium-backdrops/Premium%20Pole%20PhotoBooth1.jpg" alt="Premium Pole PhotoBooth" className="w-full h-full object-cover" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
        <div className="flex flex-col lg:hidden" style={{ gap: "clamp(14px,3vw,20px)", marginTop: "clamp(40px,6vw,64px)" }}>
          <RevealOnScroll>
            <div style={{ borderRadius: "clamp(14px,1.5vw,20px)", overflow: "hidden", aspectRatio: "4/3" }}>
              <img src="/products/premium-backdrops/Premium%20Pole%20PhotoBooth1.jpg" alt="Premium Pole PhotoBooth" className="w-full h-full object-cover" />
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

export default function PremiumPolePhotoBoothPage() {
  return (
    <><SmoothScroll /><CursorTag /><Navbar />
      <main><Hero /><Intro /><WhatsIncluded /><Pricing /><FAQSection /><ReadyToBook /></main>
      <Footer />
    </>
  );
}

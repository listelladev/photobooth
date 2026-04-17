"use client";
import { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedText, { AnimLine } from "@/components/AnimatedText";

const includedItems = [
  { icon: "/icons/product-pages/slow-motion-video.svg", label: "Slow Motion Video" },
  { icon: "/icons/product-pages/social-sharing-airdrops-and-qr-codes.svg", label: "Social Sharing, Airdrops & QR Codes" },
  { icon: "/icons/product-pages/custom-branding-and-frames.svg", label: "Custom Branding & Frames" },
  { icon: "/icons/product-pages/music.svg", label: "Music" },
  { icon: "/icons/product-pages/data-capture.svg", label: "Data Capture" },
  { icon: "/icons/product-pages/set-up-and-take-down.svg", label: "Set up and Take Down" },
];

const pricingTiers = [
  { label: "2 Hours", price: "$400" },
  { label: "3 Hours", price: "$550" },
  { label: "4 Hours", price: "$700" },
  { label: "5+ Hours", price: "$700 + $150/hr", muted: true },
];

const faqs = [
  { q: "What exactly is a 360 VideoBooth?", a: "It's a rotating camera platform where guests stand on a circular base while an arm-mounted camera revolves around them, recording a smooth, slow-motion 360° video — typically 15–30 seconds long — that's perfect for sharing on social media." },
  { q: "How many people can be in a 360 video at once?", a: "Most setups comfortably fit 2–4 people, though larger groups can participate with a bit of creative positioning. It's a great way to capture group moments!" },
  { q: "How do guests get their videos?", a: "Once recorded, the video is sent directly to guests via QR code or AirDrop — ready to share on Instagram Reels, TikTok, or WhatsApp within seconds." },
  { q: "Can we add music to the videos?", a: "Yes — every video is set to a music track. Guests can choose from our curated royalty-free library, or you can request a specific style to match your event vibe." },
  { q: "Can the videos be branded with our event logo or hashtag?", a: "Absolutely. We add a custom branded intro/outro and can include your event hashtag, logo, or personalized text overlays." },
  { q: "How much space does the 360 booth need?", a: "We recommend a 10×10 ft area minimum to ensure safe, smooth rotation and comfortable guest experience. We'll confirm exact requirements when you book." },
  { q: "How long does setup take?", a: "Setup typically takes 45–60 minutes. Our team arrives ahead of time so the booth is fully operational before your event begins." },
  { q: "Is this booth suitable for outdoor events?", a: "Yes, with the right conditions. We'll discuss venue specifics with you at booking to ensure a safe and seamless setup outdoors." },
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

// Autoplay video that handles iOS low power mode gracefully
function AutoVideo({ src, poster, style }: { src: string; poster?: string; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => {
      video.play().catch(() => {
        // Low power mode / blocked autoplay — retry on user gesture
        const handler = () => { video.play().catch(() => {}); document.removeEventListener("touchstart", handler); document.removeEventListener("click", handler); };
        document.addEventListener("touchstart", handler, { passive: true });
        document.addEventListener("click", handler, { once: true });
      });
    };
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) tryPlay(); }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video ref={videoRef} autoPlay loop muted playsInline preload="auto" poster={poster} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}>
      <source src={src} type="video/mp4" />
    </video>
  );
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
          <img src="/products/360-videobooth/360%20video%20booth%201.jpg" alt="360 VideoBooth" className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(125deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.52) 55%,rgba(0,0,0,0.70) 100%)" }} />
        </div>
        <div className="absolute" style={{ top: "12%", right: "7%", zIndex: 5 }}><div style={sa(s1, -6)}><img src="/icons/360-photobooth.svg" alt="" style={{ width: "clamp(60px,7vw,108px)", height: "auto" }} /></div></div>
        <div className="absolute" style={{ bottom: "18%", right: "5%", zIndex: 5 }}><div style={sa(s2, 8)}><img src="/icons/pool-of-icons/unforgettable-2.svg" alt="" style={{ width: "clamp(44px,5vw,76px)", height: "auto" }} /></div></div>
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(72px,9vw,116px) clamp(28px,6vw,100px) clamp(8px,1vw,12px)" }}>
          <h1 className="font-heading" style={{ fontSize: "clamp(44px,7vw,106px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(20px,2.5vw,32px)", opacity: visible ? 1 : 0, transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>
            <span style={{ position: "relative", display: "inline-block" }}>360 Video
              <svg aria-hidden="true" viewBox="0 0 280 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-10px", left: "-1%", width: "102%", height: "14px", overflow: "visible" }}>
                <path ref={underlineRef} d="M4 10 C40 3,120 13,180 7 C240 1,276 11,276 6" fill="none" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span><br /><em style={{ fontStyle: "italic" }}>Booth.</em>
          </h1>
          <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <p ref={subRef} style={{ fontSize: "clamp(16px,1.3vw,20px)", fontWeight: 400, color: "rgba(255,255,255,0.65)", maxWidth: 600, lineHeight: 1.7, transform: "translateY(20px)", opacity: 0, transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s,opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s" }}>
              Your Moment. Every Angle. Pure Cinematic Magic.
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
            <div style={{ borderRadius: "clamp(16px,2vw,24px)", overflow: "hidden", aspectRatio: "9/16", position: "relative" }}>
              <AutoVideo src="/products/360-videobooth/360%20video%20booth%201.mp4" poster="/products/360-videobooth/360%20video%20booth%201.jpg" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={150} className="order-1 lg:order-2">
            <div>
              <AnimatedText as="h2" className="font-heading" style={{ fontSize: "clamp(32px,4vw,60px)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1a1a2e", marginBottom: "clamp(20px,2.5vw,32px)" }} stagger={90}>
                <AnimLine>The <span style={{ position: "relative", display: "inline-block" }}>undisputed
                  <svg aria-hidden="true" viewBox="0 0 240 14" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-8px", left: "-2%", width: "104%", height: "14px", overflow: "visible" }}>
                    <path ref={circleRef} d="M3 9 C36 3,90 13,120 7 C150 1,210 11,237 6" fill="none" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span></AnimLine>
                <AnimLine><em style={{ fontStyle: "italic" }}>showstopper.</em></AnimLine>
              </AnimatedText>
              <p style={{ fontSize: "clamp(15px,1.1vw,18px)", color: "#6b7280", lineHeight: 1.8, marginBottom: 20 }}>The 360 VideoBooth is the undisputed showstopper of any event. Guests step onto the platform, strike their best pose, and watch as the rotating arm sweeps around them — capturing a breathtaking slow-motion 360° video set to music. The result is a cinematic clip that looks like it came straight off a movie set.</p>
              <p style={{ fontSize: "clamp(15px,1.1vw,18px)", color: "#6b7280", lineHeight: 1.8 }}>These aren&apos;t just videos — they&apos;re social media moments waiting to happen. Guests share them instantly, and your event gets the kind of organic reach that no ad budget can buy. Perfect for weddings, corporate events, product launches, brand activations, and any occasion where you want to create unforgettable memories.</p>
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
        <div className="grid grid-cols-3" style={{ gap: "clamp(40px,5vw,72px) clamp(16px,2vw,32px)" }}>
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
              <p style={{ fontSize: "clamp(14px,1vw,16px)", color: "#9ca3af", marginTop: "clamp(16px,2vw,24px)", lineHeight: 1.7 }}>Minimum booking: 1 hour. Starting at $399+ taxes.</p>
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
          {/* Desktop: video stacked on top, image below */}
          <div className="lg:col-span-5 hidden lg:block" style={{ alignSelf: "start", position: "sticky", top: "clamp(80px,8vw,120px)" }}>
            <RevealOnScroll direction="right">
              <div style={{ borderRadius: "clamp(14px,1.5vw,20px)", overflow: "hidden", aspectRatio: "3/4", marginBottom: "clamp(16px,1.5vw,20px)" }}>
                <AutoVideo src="/products/360-videobooth/360%20video%20booth%203.mp4" poster="/products/360-videobooth/360%20video%20booth%201.jpg" />
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" delay={150}>
              <div style={{ borderRadius: "clamp(14px,1.5vw,20px)", overflow: "hidden", aspectRatio: "4/3" }}>
                <img src="/products/360-videobooth/360%20videobooth%202.jpeg" alt="360 VideoBooth" className="w-full h-full object-cover" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
        {/* Mobile */}
        <div className="flex flex-col lg:hidden" style={{ gap: "clamp(14px,3vw,20px)", marginTop: "clamp(40px,6vw,64px)" }}>
          <RevealOnScroll>
            <div style={{ borderRadius: "clamp(14px,1.5vw,20px)", overflow: "hidden", aspectRatio: "3/4" }}>
              <AutoVideo src="/products/360-videobooth/360%20video%20booth%203.mp4" poster="/products/360-videobooth/360%20video%20booth%201.jpg" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <div style={{ borderRadius: "clamp(14px,1.5vw,20px)", overflow: "hidden", aspectRatio: "4/3" }}>
              <img src="/products/360-videobooth/360%20videobooth%202.jpeg" alt="360 VideoBooth" className="w-full h-full object-cover" />
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

export default function VideoBoothPage() {
  return (
    <><SmoothScroll /><CursorTag /><Navbar />
      <main><Hero /><Intro /><WhatsIncluded /><Pricing /><FAQSection /><ReadyToBook /></main>
      <Footer />
    </>
  );
}

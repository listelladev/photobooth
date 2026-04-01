"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

export default function BookingCTA() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", eventType: "", boothType: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <section id="book" style={{ background: "#f9f9f9", padding: "clamp(80px, 12vw, 180px) 0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Heading + WooHoo sticker */}
        <div style={{ position: "relative", marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <AnimatedText
            as="h2"
            className="font-heading"
            style={{
              fontSize: "clamp(40px, 7vw, 100px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#1a1a2e",
            }}
            stagger={90}
          >
            <AnimLine>
              Ready to create
            </AnimLine>
            <AnimLine>
              something <em style={{ fontStyle: "italic" }}>special?</em>
            </AnimLine>
          </AnimatedText>

          {/* WooHoo sticker — top right of the heading block */}
          <StickerReveal
            delay={500}
            style={{
              position: "absolute",
              right: 0,
              top: "10%",
            }}
          >
            <img
              src="/icons/something-special.svg"
              alt=""
              style={{ width: "clamp(80px, 8vw, 120px)", height: "auto" }}
            />
          </StickerReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(56px, 8vw, 140px)" }}>
          {/* Left — contact info */}
          <RevealOnScroll>
            <div>
              <p style={{ fontSize: "clamp(16px, 1.2vw, 20px)", fontWeight: 400, color: "#6b7280", maxWidth: 420, lineHeight: 1.75, marginBottom: 48 }}>
                Fill out the form and one of our team members will reach out
                to discuss details, confirm availability, and help you choose
                the perfect package.
              </p>

              <div className="flex flex-col" style={{ gap: 32 }}>
                {[
                  { icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", label: "Phone", value: "(403) 555-0123" },
                  { icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", label: "Email", value: "info@photoboothexperience.ca" },
                  { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", label: "Service Area", value: "Calgary & Surrounding Areas" },
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

          {/* Right — Form */}
          <RevealOnScroll delay={200}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 clamp(24px, 3vw, 40px)" }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 8, marginTop: 24 }}>Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Full name" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 8, marginTop: 24 }}>Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="your@email.com" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 8, marginTop: 24 }}>Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="(403) 555-0000" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 8, marginTop: 24 }}>Event Date *</label>
                  <input type="date" name="date" required value={formData.date} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 8, marginTop: 24 }}>Event Type</label>
                  <select name="eventType" value={formData.eventType} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                    <option value="">Select type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="birthday">Birthday</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="gender-reveal">Gender Reveal</option>
                    <option value="festival">Festival</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 8, marginTop: 24 }}>Booth Type</label>
                  <select name="boothType" value={formData.boothType} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                    <option value="">Select booth</option>
                    <option value="classic">Classic Photo Booth</option>
                    <option value="mirror">Mirror Photo Booth</option>
                    <option value="360">360° Video Booth</option>
                    <option value="unsure">Not Sure Yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#9ca3af", marginBottom: 8, marginTop: 24 }}>Message</label>
                <textarea name="message" rows={3} value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: "none" as const }} placeholder="Tell us about your event..." />
              </div>

              <button
                type="submit"
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "dm-sans, sans-serif",
                  padding: "16px 48px",
                  background: "#FF6B35",
                  color: "#fff",
                  border: "none",
                  borderRadius: 60,
                  marginTop: 40,
                }}
              >
                Send Inquiry
              </button>
              <p style={{ fontSize: 14, fontWeight: 400, color: "#9ca3af", marginTop: 16 }}>
                We typically respond within 24 hours.
              </p>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

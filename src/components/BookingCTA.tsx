"use client";

import { useState, useEffect, useRef } from "react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

// ─── Data ────────────────────────────────────────────────────────────────────

const BOOTHS = [
  { id: "compact-pole", label: "Compact Pole PhotoBooth", icon: "📸" },
  { id: "premium-pole", label: "Premium Pole PhotoBooth", icon: "✨" },
  { id: "ai-booth", label: "AI PhotoBooth", icon: "🤖" },
  { id: "360-video", label: "360 VideoBooth", icon: "🎥" },
  { id: "mirror", label: "Mirror PhotoBooth", icon: "🪞" },
  { id: "audio-guestbook", label: "Audio GuestBook", icon: "🎙️" },
  { id: "premium-backdrops", label: "Premium Backdrops", icon: "🎨" },
  { id: "instant-printing", label: "Instant High Quality Printing", icon: "🖨️" },
];

const BACKDROPS = [
  "Abstract", "Balloons", "Balloons 2", "Black & Gold Glitter",
  "Flowers 1", "Flowers 2", "Flowers 3", "Flowers 4", "Glitter", "Party",
];

const DURATIONS = [
  { value: "1", label: "1 Hour" },
  { value: "2", label: "2 Hours" },
  { value: "3", label: "3 Hours" },
  { value: "4", label: "4 Hours" },
  { value: "5", label: "5+ Hours" },
];

const PRINT_SIZES = [
  { value: "2x6", label: '2×6"', desc: "Classic strip" },
  { value: "4x6", label: '4×6"', desc: "Standard photo" },
];

interface FormState {
  booth: string;
  date: string;
  hours: string;
  printing: boolean;
  printSize: string;
  backdrop: boolean;
  backdropChoice: string;
  audioGuestbook: boolean;
  attendant: boolean;
  address: string;
  postalCode: string;
  name: string;
  email: string;
  phone: string;
}

const defaultForm: FormState = {
  booth: "",
  date: "",
  hours: "2",
  printing: false,
  printSize: "",
  backdrop: false,
  backdropChoice: "",
  audioGuestbook: false,
  attendant: false,
  address: "",
  postalCode: "",
  name: "",
  email: "",
  phone: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "#9ca3af",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "#fff",
  border: "1.5px solid #e5e7eb",
  fontSize: 15,
  fontWeight: 400,
  fontFamily: "dm-sans, sans-serif",
  color: "#1a1a2e",
  outline: "none",
  borderRadius: 10,
  transition: "border-color 0.2s",
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center" style={{ gap: 8, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: i < current ? 28 : i === current ? 28 : 8,
              height: 8,
              borderRadius: 99,
              background: i < current ? "#1a1a2e" : i === current ? "#FF6B35" : "#e5e7eb",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              flexShrink: 0,
            }}
          />
        </div>
      ))}
      <span style={{ fontSize: 13, color: "#9ca3af", marginLeft: 4, fontWeight: 500 }}>
        Step {current + 1} of {total}
      </span>
    </div>
  );
}

function SelectCard({
  selected,
  onClick,
  children,
  accent,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        padding: "clamp(8px, 1.2vw, 14px) clamp(10px, 1.5vw, 16px)",
        borderRadius: 12,
        border: selected ? `2px solid ${accent || "#FF6B35"}` : "1.5px solid #e5e7eb",
        background: selected ? (accent ? `${accent}18` : "#FFF3EE") : "#fff",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
        fontFamily: "dm-sans, sans-serif",
      }}
    >
      {children}
    </button>
  );
}

function ToggleYesNo({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex" style={{ gap: 8 }}>
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          style={{
            padding: "10px 24px",
            borderRadius: 60,
            border: value === v ? "2px solid #FF6B35" : "1.5px solid #e5e7eb",
            background: value === v ? "#FFF3EE" : "#fff",
            color: value === v ? "#FF6B35" : "#6b7280",
            fontWeight: 700,
            fontSize: 14,
            fontFamily: "dm-sans, sans-serif",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {v ? "Yes" : "No"}
        </button>
      ))}
    </div>
  );
}

function estimatePrice(form: FormState): number {
  const boothBase: Record<string, number> = {
    "compact-pole": 199,
    "premium-pole": 249,
    "ai-booth": 299,
    "360-video": 399,
    "mirror": 499,
    "audio-guestbook": 149,
    "premium-backdrops": 99,
    "instant-printing": 79,
  };
  const hours = parseInt(form.hours) || 2;
  const base = (boothBase[form.booth] || 199) * Math.max(hours / 2, 1);
  let addons = 0;
  if (form.printing) addons += 50;
  if (form.backdrop) addons += 80;
  if (form.audioGuestbook) addons += 149;
  if (form.attendant) addons += 100;
  return Math.round(base + addons);
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function Step1({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Which booth do you need?
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "clamp(12px, 2vw, 24px)", lineHeight: 1.5 }}>
        Select the booth that best fits your event.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 7 }}>
        {BOOTHS.map((b) => (
          <SelectCard
            key={b.id}
            selected={form.booth === b.id}
            onClick={() => setForm({ ...form, booth: b.id })}
          >
            <span style={{ fontSize: 15, marginRight: 8 }}>{b.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{b.label}</span>
          </SelectCard>
        ))}
      </div>
    </div>
  );
}

function Step2({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 8 }}>
        Duration & Date
      </h3>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>
        How many hours do you need the booth for?
      </p>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Event Date *</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Duration</label>
        <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 10 }}>
          {DURATIONS.map((d) => (
            <SelectCard
              key={d.value}
              selected={form.hours === d.value}
              onClick={() => setForm({ ...form, hours: d.value })}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>{d.label}</span>
            </SelectCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 8 }}>
        Add-ons
      </h3>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>
        Customize your experience with these optional extras.
      </p>

      {/* Printing */}
      <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #f0f0f0" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>Printing</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>Instant on-site photo prints</p>
          </div>
          <ToggleYesNo value={form.printing} onChange={(v) => setForm({ ...form, printing: v, printSize: v ? form.printSize : "" })} />
        </div>
        {form.printing && (
          <div>
            <label style={{ ...labelStyle, marginTop: 16 }}>Select print size</label>
            <div className="grid grid-cols-2" style={{ gap: 10 }}>
              {PRINT_SIZES.map((s) => (
                <SelectCard
                  key={s.value}
                  selected={form.printSize === s.value}
                  onClick={() => setForm({ ...form, printSize: s.value })}
                >
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{s.label}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>{s.desc}</p>
                    <div
                      style={{
                        marginTop: 10,
                        background: "#f5f5f5",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        aspectRatio: s.value === "2x6" ? "2/6" : "4/6",
                        maxHeight: 80,
                        fontSize: 11,
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </SelectCard>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #f0f0f0" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>Premium Backdrop</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>2.60m × 2.60m professional backdrop</p>
          </div>
          <ToggleYesNo value={form.backdrop} onChange={(v) => setForm({ ...form, backdrop: v, backdropChoice: v ? form.backdropChoice : "" })} />
        </div>
        {form.backdrop && (
          <div>
            <label style={{ ...labelStyle, marginTop: 16 }}>Choose a backdrop</label>
            <select
              value={form.backdropChoice}
              onChange={(e) => setForm({ ...form, backdropChoice: e.target.value })}
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
            >
              <option value="">Select backdrop...</option>
              {BACKDROPS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Audio GuestBook */}
      <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #f0f0f0" }}>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>Audio GuestBook</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>Record heartfelt voice messages</p>
          </div>
          <ToggleYesNo value={form.audioGuestbook} onChange={(v) => setForm({ ...form, audioGuestbook: v })} />
        </div>
      </div>

      {/* On-site Attendant */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>On-site Attendant</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>Dedicated attendant for your entire event</p>
          </div>
          <ToggleYesNo value={form.attendant} onChange={(v) => setForm({ ...form, attendant: v })} />
        </div>
      </div>
    </div>
  );
}

function Step4({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 8 }}>
        Event Location
      </h3>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>
        Final pricing is calculated based on your postal code.
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Event Address *</label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          style={inputStyle}
          placeholder="123 Main St, Calgary, AB"
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Postal Code *</label>
        <input
          type="text"
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value.toUpperCase() })}
          style={inputStyle}
          placeholder="T2P 0A1"
          required
          maxLength={7}
        />
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
          Used to calculate travel distance and final pricing.
        </p>
      </div>
    </div>
  );
}

function QuoteStep({ form, setForm, onSubmit, submitted, onBack }: {
  form: FormState;
  setForm: (f: FormState) => void;
  onSubmit: () => void;
  submitted: boolean;
  onBack: () => void;
}) {
  const booth = BOOTHS.find((b) => b.id === form.booth);
  const estimate = estimatePrice(form);

  const lineItems = [
    { label: `${booth?.label || "Booth"} — ${form.hours}hr`, value: "" },
    form.printing ? { label: `Printing (${form.printSize || "TBD"})`, value: "+$50" } : null,
    form.backdrop ? { label: `Backdrop${form.backdropChoice ? ` — ${form.backdropChoice}` : ""}`, value: "+$80" } : null,
    form.audioGuestbook ? { label: "Audio GuestBook", value: "+$149" } : null,
    form.attendant ? { label: "On-site Attendant", value: "+$100" } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (submitted) {
      // Trigger fade-in on next frame
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [submitted]);

  if (submitted) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "clamp(40px, 6vw, 72px) 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 20, animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both" }}>🎉</div>
        <h3
          className="font-heading"
          style={{
            fontSize: "clamp(26px, 3.5vw, 44px)",
            letterSpacing: "-0.03em",
            color: "#1a1a2e",
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Thank you for submitting!
        </h3>
        <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "#6b7280", lineHeight: 1.75, maxWidth: 360, margin: "0 auto 28px" }}>
          We&apos;ll be in touch shortly to confirm your date and finalize everything.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: "#f0f9f0",
            borderRadius: 60,
            border: "1.5px solid #bbf0bb",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Inquiry received</span>
        </div>
        <style>{`
          @keyframes popIn {
            from { transform: scale(0) rotate(-20deg); opacity: 0; }
            to   { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 8 }}>
        Your Instant Quote
      </h3>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>
        Review your selections and send your enquiry. We&apos;ll confirm availability and finalize your booking.
      </p>

      {/* Quote summary */}
      <div style={{ background: "#f9f9f9", borderRadius: 14, padding: "clamp(16px, 2vw, 24px)", marginBottom: 24 }}>
        {lineItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between"
            style={{
              padding: "8px 0",
              borderBottom: i < lineItems.length - 1 ? "1px solid #efefef" : "none",
              fontSize: 14,
            }}
          >
            <span style={{ color: "#4b5563", fontWeight: 500 }}>{item.label}</span>
            {item.value && <span style={{ color: "#1a1a2e", fontWeight: 700 }}>{item.value}</span>}
          </div>
        ))}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 16, paddingTop: 16, borderTop: "1.5px solid #e5e7eb" }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af" }}>
            Estimated Total
          </span>
          <span className="font-heading" style={{ fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.04em", color: "#1a1a2e" }}>
            ${estimate.toLocaleString()}
          </span>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
          Final pricing confirmed after booking. + taxes. Travel fees may apply.
        </p>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 clamp(16px, 2vw, 24px)" }}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Your Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            placeholder="Full name"
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            placeholder="your@email.com"
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
            placeholder="(403) 555-0000"
          />
        </div>
      </div>

      <div className="flex items-center" style={{ gap: 12, marginTop: 16, flexWrap: "wrap" as const }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "dm-sans, sans-serif",
            color: "#6b7280",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!form.name || !form.email}
          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
          style={{
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "dm-sans, sans-serif",
            padding: "16px 48px",
            background: !form.name || !form.email ? "#d1d5db" : "#FF6B35",
            color: "#fff",
            border: "none",
            borderRadius: 60,
            cursor: !form.name || !form.email ? "not-allowed" : "pointer",
          }}
        >
          Submit
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 12 }}>
        We typically respond within 24 hours.
      </p>
    </div>
  );
}

// ─── Contact Form Panel ───────────────────────────────────────────────────────

function ContactFormPanel() {
  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (contactSubmitted) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [contactSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  if (contactSubmitted) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "clamp(40px, 6vw, 72px) 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 20, animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both" }}>🎉</div>
        <h3 className="font-heading" style={{ fontSize: "clamp(26px, 3.5vw, 44px)", letterSpacing: "-0.03em", color: "#1a1a2e", marginBottom: 16, lineHeight: 1.1 }}>
          Message sent!
        </h3>
        <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "#6b7280", lineHeight: 1.75, maxWidth: 360, margin: "0 auto 28px" }}>
          Thanks for reaching out. We&apos;ll be in touch within 24 hours to chat about your event.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#f0f9f0", borderRadius: 60, border: "1.5px solid #bbf0bb" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Message received</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }}>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 clamp(16px, 2vw, 24px)" }}>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Name *</label>
          <input type="text" name="name" required value={contactForm.name} onChange={handleChange} style={inputStyle} placeholder="Full name" />
        </div>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Email *</label>
          <input type="email" name="email" required value={contactForm.email} onChange={handleChange} style={inputStyle} placeholder="your@email.com" />
        </div>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Phone</label>
          <input type="tel" name="phone" value={contactForm.phone} onChange={handleChange} style={inputStyle} placeholder="(403) 555-0000" />
        </div>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Subject</label>
          <select name="subject" value={contactForm.subject} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
            <option value="">Select a topic</option>
            <option value="booking">Booking Inquiry</option>
            <option value="pricing">Pricing</option>
            <option value="custom">Custom Package</option>
            <option value="availability">Check Availability</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 4 }}>
        <label style={labelStyle}>Message *</label>
        <textarea name="message" rows={4} required value={contactForm.message} onChange={handleChange} style={{ ...inputStyle, resize: "none" as const }} placeholder="Tell us about your event..." />
      </div>
      <div style={{ marginTop: 28 }}>
        <button
          type="submit"
          disabled={!contactForm.name || !contactForm.email || !contactForm.message}
          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
          style={{
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "dm-sans, sans-serif",
            padding: "16px 48px",
            background: !contactForm.name || !contactForm.email || !contactForm.message ? "#d1d5db" : "#FF6B35",
            color: "#fff",
            border: "none",
            borderRadius: 60,
            cursor: !contactForm.name || !contactForm.email || !contactForm.message ? "not-allowed" : "pointer",
          }}
        >
          Send Message
        </button>
        <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 12 }}>We typically respond within 24 hours.</p>
      </div>
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TOTAL_STEPS = 5; // 0=booth, 1=date/duration, 2=addons, 3=location, 4=quote

interface BookingCTAProps {
  headingLine1?: string;
  headingLine2?: React.ReactNode;
  subtext?: string;
}

export default function BookingCTA({ headingLine1, headingLine2, subtext }: BookingCTAProps = {}) {
  const [tab, setTab] = useState<"quote" | "contact">("quote");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  // Scroll to the top of the form card when the user advances a step or submits — mobile only.
  // Skip the initial mount so navigating to the page doesn't auto-scroll to the form.
  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    if (!formCardRef.current) return;
    if (window.innerWidth >= 768) return;
    const top = formCardRef.current.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }, [step, submitted]);

  const canAdvance = () => {
    if (step === 0) return !!form.booth;
    if (step === 1) return !!form.date && !!form.hours;
    if (step === 3) return !!form.address && !!form.postalCode;
    return true;
  };

  const handleSubmit = () => {
    // Future: send to Resend API
    setSubmitted(true);
  };

  return (
    <section id="book" data-no-cursor-tag style={{ background: "#f9f9f9", padding: "clamp(40px, 12vw, 180px) 0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Heading */}
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
              {headingLine1 ?? "Get a quote"}
            </AnimLine>
            <AnimLine>
              {headingLine2 ?? <em style={{ fontStyle: "italic" }}>instantly.</em>}
            </AnimLine>
          </AnimatedText>

          <StickerReveal
            delay={500}
            style={{ position: "absolute", right: 0, top: "10%" }}
          >
            <img
              src="/icons/something-special.svg"
              alt=""
              style={{ width: "clamp(80px, 8vw, 120px)", height: "auto" }}
            />
          </StickerReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]" style={{ gap: "clamp(40px, 5vw, 80px)" }}>

          {/* Left — contact info */}
          <RevealOnScroll>
            <div>
              <p style={{ fontSize: "clamp(16px, 1.2vw, 20px)", fontWeight: 400, color: "#6b7280", maxWidth: 420, lineHeight: 1.75, marginBottom: 48 }}>
                {subtext ?? "Answer a few quick questions to get an instant estimate. Send your enquiry and we\u2019ll confirm your booking with a final quote."}
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

          {/* Right — multi-step form */}
          <RevealOnScroll delay={200}>
            <div
              ref={formCardRef}
              style={{
                background: "#fff",
                borderRadius: "clamp(16px, 2vw, 24px)",
                border: "1.5px solid #ebebeb",
                padding: "clamp(24px, 3vw, 44px)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.05)",
              }}
            >
              {/* Tab toggle */}
              <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 10, padding: 4, marginBottom: 28 }}>
                {(["quote", "contact"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setTab(t); setStep(0); }}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 7,
                      border: "none",
                      background: tab === t ? "#fff" : "transparent",
                      color: tab === t ? "#1a1a2e" : "#9ca3af",
                      fontFamily: "dm-sans, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: "0.01em",
                      cursor: "pointer",
                      boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {t === "quote" ? "Instant Quote" : "Contact Us"}
                  </button>
                ))}
              </div>

              {tab === "contact" ? (
                <ContactFormPanel />
              ) : (
                <>
                  <StepIndicator current={step} total={TOTAL_STEPS} />

                  {step === 0 && <Step1 form={form} setForm={setForm} />}
                  {step === 1 && <Step2 form={form} setForm={setForm} />}
                  {step === 2 && <Step3 form={form} setForm={setForm} />}
                  {step === 3 && <Step4 form={form} setForm={setForm} />}
                  {step === 4 && (
                    <QuoteStep form={form} setForm={setForm} onSubmit={handleSubmit} submitted={submitted} onBack={() => setStep(3)} />
                  )}
                </>
              )}

              {/* Navigation */}
              {tab === "quote" && step < 4 && (
                <div className="flex items-center justify-between" style={{ marginTop: 32 }}>
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: "dm-sans, sans-serif",
                        color: "#6b7280",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: 0,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    onClick={() => { if (canAdvance()) setStep(step + 1); }}
                    disabled={!canAdvance()}
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: "dm-sans, sans-serif",
                      padding: "14px 36px",
                      background: canAdvance() ? "#FF6B35" : "#d1d5db",
                      color: "#fff",
                      border: "none",
                      borderRadius: 60,
                      cursor: canAdvance() ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "all 0.2s",
                    }}
                  >
                    {step === 3 ? "See Quote" : "Continue"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

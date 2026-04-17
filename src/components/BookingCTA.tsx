"use client";

import { useState, useEffect, useRef } from "react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

// ─── Types ────────────────────────────────────────────────────────────────────

type BoothId = "compact" | "premium" | "ai" | "360";
type PackageId = "basic" | "gold" | "platinum" | "custom";
type PrintSize = "2x6" | "4x6";
type StepId = "booth" | "duration" | "package" | "bundle" | "printSize" | "backdrop" | "location" | "summary" | "contact";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BOOTHS: { id: BoothId; label: string; emoji: string; tagline: string }[] = [
  { id: "compact", label: "Compact Pole PhotoBooth", emoji: "📸", tagline: "Space-saving & fun" },
  { id: "premium", label: "Premium Pole PhotoBooth", emoji: "✨", tagline: "Classic, elevated" },
  { id: "ai",      label: "AI PhotoBooth",           emoji: "🤖", tagline: "Next-gen AI portraits" },
  { id: "360",     label: "360 VideoBooth",           emoji: "🎥", tagline: "Cinematic slow-motion" },
];

const BASE_PRICING: Record<BoothId, Record<number, number>> = {
  compact: { 2: 250, 3: 350, 4: 450, 5: 550, 6: 650, 7: 750, 8: 750 },
  premium: { 2: 350, 3: 475, 4: 600, 5: 725, 6: 850, 7: 975, 8: 1100 },
  ai:      { 2: 350, 3: 475, 4: 600, 5: 725, 6: 850, 7: 975, 8: 1100 },
  "360":   { 2: 400, 3: 550, 4: 700, 5: 850, 6: 1000, 7: 1150, 8: 1300 },
};

const EXTRA_RATES: Record<BoothId, number> = {
  compact: 100, premium: 125, ai: 125, "360": 150,
};

const PACKAGES: {
  id: PackageId; label: string; badge?: string;
  accentBg: string; accentBorder: string;
  items: string[];
}[] = [
  {
    id: "basic", label: "Basic Package",
    accentBg: "#fafafa", accentBorder: "#e5e7eb",
    items: ["Delivery, setup & takedown", "Custom photo template", "Digital sharing (QR / email)"],
  },
  {
    id: "gold", label: "Gold Package", badge: "Most Popular",
    accentBg: "#FFFBEB", accentBorder: "#FDE68A",
    items: ["Everything in Basic", "Unlimited printing (2×6 default)", "Premium backdrop", "Props"],
  },
  {
    id: "platinum", label: "Platinum Package",
    accentBg: "#FAF5FF", accentBorder: "#C4B5FD",
    items: ["Everything in Gold", "Audio GuestBook", "Red carpet", "Velvet rope stanchions", "Themed backdrop", "Attendant (included)"],
  },
  {
    id: "custom", label: "Build Your Own",
    accentBg: "#F0FDF4", accentBorder: "#86EFAC",
    items: ["Choose exactly what you want", "Pay only for what you need"],
  },
];

const CUSTOM_ADDONS: {
  id: string; label: string; priceLabel: string;
  flatPrice: number | null; durationBased?: boolean; notFor360?: boolean; note?: string;
}[] = [
  { id: "props",           label: "Props",                   priceLabel: "$40",        flatPrice: 40 },
  { id: "redCarpet",       label: "Red Carpet",              priceLabel: "$25",        flatPrice: 25 },
  { id: "stanchions",      label: "Velvet Rope Stanchions",  priceLabel: "$25",        flatPrice: 25 },
  { id: "themedBackdrop",  label: "Themed Backdrop",         priceLabel: "$125",       flatPrice: 125, notFor360: true },
  { id: "printing",        label: "Unlimited Printing",      priceLabel: "from $120",  flatPrice: null, notFor360: true, note: "Size selectable next step" },
  { id: "premiumBackdrop", label: "Premium Backdrop",        priceLabel: "$50",        flatPrice: 50,  notFor360: true },
  { id: "guestbook",       label: "Audio GuestBook",         priceLabel: "$80",        flatPrice: 80 },
  { id: "attendant",       label: "Attendant",               priceLabel: "$20/hr",     flatPrice: null, durationBased: true },
];

const BACKDROPS = [
  { name: "Abstract",             src: "/backdrop-images/Abstract.jpeg" },
  { name: "Balloons",             src: "/backdrop-images/Balloons.jpg" },
  { name: "Balloons 2",           src: "/backdrop-images/Balloons%202.jpg" },
  { name: "Black & Gold Glitter", src: "/backdrop-images/black%20and%20gold%20glitter.jpg" },
  { name: "Flowers 1",            src: "/backdrop-images/flowers%201.jpg" },
  { name: "Flowers 2",            src: "/backdrop-images/flowers%202.jpg" },
  { name: "Flowers 3",            src: "/backdrop-images/flowers%203.jpg" },
  { name: "Flowers 4",            src: "/backdrop-images/flowers%204.png" },
  { name: "Glitter",              src: "/backdrop-images/glitter.jpg" },
  { name: "Party",                src: "/backdrop-images/party.jpg" },
  { name: "Christmas 1",         src: "/backdrop-images/Christmas%201.jpg" },
  { name: "Christmas 2",         src: "/backdrop-images/Christmas%202.jpg" },
  { name: "Black",               src: "/backdrop-images/Black.png" },
  { name: "White",               src: "/backdrop-images/White.png" },
  { name: "Other",               src: "/backdrop-images/other%20backdrop.jpg" },
];

// ─── Form state ───────────────────────────────────────────────────────────────

interface QuoteForm {
  booth: BoothId | "";
  date: string;
  duration: number;
  package: PackageId | "";
  customAddons: string[];
  printSize: PrintSize;
  backdropChoice: string;
  address: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const DEFAULT_FORM: QuoteForm = {
  booth: "", date: "", duration: 2,
  package: "", customAddons: [], printSize: "2x6",
  backdropChoice: "", address: "",
  name: "", email: "", phone: "", notes: "",
};

// ─── Pricing ──────────────────────────────────────────────────────────────────

function getBasePrice(booth: BoothId | "", duration: number): number {
  if (!booth) return 0;
  return BASE_PRICING[booth]?.[Math.min(duration, 8)] ?? 0;
}

function getPrintPrice(size: PrintSize): number {
  return size === "4x6" ? 150 : 120;
}

function getAddonLineItems(form: QuoteForm): { label: string; price: number }[] {
  const is360 = form.booth === "360";
  const items: { label: string; price: number }[] = [];

  if (form.package === "basic" || form.package === "") return [];

  if (form.package === "gold") {
    if (!is360) {
      items.push(
        { label: `Printing (${form.printSize})`, price: getPrintPrice(form.printSize) },
        { label: "Premium backdrop", price: 50 },
        { label: "Props", price: 40 },
      );
    } else {
      items.push({ label: "Props", price: 40 });
    }
  }

  if (form.package === "platinum") {
    if (!is360) {
      items.push(
        { label: `Printing (${form.printSize})`, price: getPrintPrice(form.printSize) },
        { label: "Premium backdrop", price: 50 },
        { label: "Props", price: 40 },
        { label: "Audio GuestBook", price: 80 },
        { label: "Red carpet", price: 25 },
        { label: "Velvet rope stanchions", price: 25 },
        { label: "Themed backdrop", price: 125 },
      );
    } else {
      items.push(
        { label: "Props", price: 40 },
        { label: "Audio GuestBook", price: 80 },
        { label: "Red carpet", price: 25 },
        { label: "Velvet rope stanchions", price: 25 },
      );
    }
  }

  if (form.package === "custom") {
    form.customAddons.forEach(id => {
      const addon = CUSTOM_ADDONS.find(a => a.id === id);
      if (!addon) return;
      if (is360 && addon.notFor360) return;
      if (id === "printing") {
        items.push({ label: `Printing (${form.printSize})`, price: getPrintPrice(form.printSize) });
      } else if (id === "attendant") {
        items.push({ label: `Attendant (${form.duration}h × $20)`, price: 20 * form.duration });
      } else if (addon.flatPrice !== null) {
        items.push({ label: addon.label, price: addon.flatPrice });
      }
    });
  }

  return items;
}

function getTotalPrice(form: QuoteForm): number {
  return getBasePrice(form.booth, form.duration) +
    getAddonLineItems(form).reduce((s, a) => s + a.price, 0);
}

// ─── Active steps ─────────────────────────────────────────────────────────────

function getActiveSteps(form: QuoteForm): StepId[] {
  const steps: StepId[] = ["booth", "duration", "package"];
  const is360 = form.booth === "360";

  if (form.package === "custom") steps.push("bundle");

  const hasPrinting = !is360 && (
    form.package === "gold" || form.package === "platinum" ||
    (form.package === "custom" && form.customAddons.includes("printing"))
  );
  if (hasPrinting) steps.push("printSize");

  const hasBackdrop = !is360 && (
    form.package === "gold" || form.package === "platinum" ||
    (form.package === "custom" && (
      form.customAddons.includes("premiumBackdrop") ||
      form.customAddons.includes("themedBackdrop")
    ))
  );
  if (hasBackdrop) steps.push("backdrop");

  steps.push("location", "summary", "contact");
  return steps;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.07em", textTransform: "uppercase",
  color: "#9ca3af", marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", background: "#fff",
  border: "1.5px solid #e5e7eb", fontSize: 15, fontWeight: 400,
  fontFamily: "dm-sans, sans-serif", color: "#1a1a2e", outline: "none",
  borderRadius: 10, transition: "border-color 0.2s",
};

// ─── StepIndicator ────────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center" style={{ gap: 5, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 7, borderRadius: 99, flexShrink: 0,
          width: i === current ? 22 : 7,
          background: i < current ? "#1a1a2e" : i === current ? "#FF6B35" : "#e5e7eb",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }} />
      ))}
      <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 4, fontWeight: 500 }}>
        Step {current + 1} of {total}
      </span>
    </div>
  );
}

// ─── Step 1: Booth ────────────────────────────────────────────────────────────

function StepBooth({ form, setForm }: { form: QuoteForm; setForm: (f: QuoteForm) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Choose Your Photo Booth
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        Select one — your choice determines pricing and available add-ons.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 8 }}>
        {BOOTHS.map(b => {
          const sel = form.booth === b.id;
          return (
            <button key={b.id} type="button" onClick={() => setForm({ ...form, booth: b.id })}
              style={{
                padding: "14px 16px", borderRadius: 12, textAlign: "left", cursor: "pointer",
                border: sel ? "2px solid #FF6B35" : "1.5px solid #e5e7eb",
                background: sel ? "#FFF3EE" : "#fff",
                transition: "all 0.2s", fontFamily: "dm-sans, sans-serif",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{b.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 1 }}>{b.label}</p>
                <p style={{ fontSize: 11, color: "#9ca3af" }}>{b.tagline}</p>
              </div>
              {sel && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="12" fill="#FF6B35" />
                  <path d="M7 12l4 4 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Duration ─────────────────────────────────────────────────────────

function StepDuration({ form, setForm }: { form: QuoteForm; setForm: (f: QuoteForm) => void }) {
  const booth = BOOTHS.find(b => b.id === form.booth);
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Duration &amp; Date
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        Minimum 2 hours. Prices shown for {booth?.label ?? "your booth"}.
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Event Date *</label>
        <input type="date" value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          style={inputStyle} required />
      </div>

      <div>
        <label style={labelStyle}>Duration</label>
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 8 }}>
          {[2, 3, 4, 5, 6, 7, 8].map(h => {
            const price = form.booth ? getBasePrice(form.booth, h) : null;
            const sel = form.duration === h;
            return (
              <button key={h} type="button" onClick={() => setForm({ ...form, duration: h })}
                style={{
                  padding: "11px 8px", borderRadius: 12, textAlign: "center", cursor: "pointer",
                  border: sel ? "2px solid #FF6B35" : "1.5px solid #e5e7eb",
                  background: sel ? "#FFF3EE" : "#fff",
                  transition: "all 0.2s", fontFamily: "dm-sans, sans-serif",
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>
                  {h === 8 ? "8+ hrs" : `${h} hrs`}
                </p>
                {price !== null && (
                  <p style={{ fontSize: 11, fontWeight: 600, color: sel ? "#FF6B35" : "#9ca3af" }}>
                    ${price.toLocaleString()}{h === 8 ? "+" : ""}
                  </p>
                )}
              </button>
            );
          })}
        </div>
        {form.booth && form.duration === 8 && (
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
            Base shown for 8 hrs. Extra hours: +${EXTRA_RATES[form.booth as BoothId]}/hr — noted in your final quote.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Step 3: Package ──────────────────────────────────────────────────────────

function StepPackage({ form, setForm }: { form: QuoteForm; setForm: (f: QuoteForm) => void }) {
  const [expanded, setExpanded] = useState<PackageId | null>(null);
  const is360 = form.booth === "360";

  const displayPrice = (pkg: typeof PACKAGES[0]) => {
    if (pkg.id === "basic") return "Included";
    if (pkg.id === "custom") return "Build custom";
    if (pkg.id === "gold") return is360 ? "+$40" : "+$210";
    if (pkg.id === "platinum") return is360 ? "+$170" : "+$465";
    return "";
  };

  const packageItems = (pkg: typeof PACKAGES[0]): string[] => {
    if (is360 && pkg.id === "gold")
      return ["Everything in Basic", "Props", "✗ Printing (N/A — video booth)", "✗ Backdrop (N/A — video booth)"];
    if (is360 && pkg.id === "platinum")
      return ["Everything in Gold (360 adjusted)", "Audio GuestBook", "Red carpet", "Velvet rope stanchions", "Attendant (always included for 360)", "✗ Themed backdrop (N/A — video booth)"];
    return pkg.items;
  };

  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Choose Your Package
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>
        All packages stack on top of your base booth price and include delivery, setup &amp; takedown.
      </p>
      {is360 && (
        <div style={{ background: "#F0F9FF", border: "1px solid #BAE6FD", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#0369A1" }}>
          360 VideoBooth: Printing &amp; backdrop add-ons are not applicable. Package prices reflect this.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PACKAGES.map(pkg => {
          const sel = form.package === pkg.id;
          const open = expanded === pkg.id;
          return (
            <div key={pkg.id} style={{
              border: sel ? "2px solid #FF6B35" : `1.5px solid ${pkg.accentBorder}`,
              borderRadius: 12, background: sel ? "#FFF3EE" : pkg.accentBg,
              overflow: "hidden", transition: "border-color 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", padding: "13px 14px", gap: 8 }}>
                <button type="button" onClick={() => setForm({ ...form, package: pkg.id })}
                  style={{ flex: 1, border: "none", background: "transparent", textAlign: "left", cursor: "pointer", padding: 0, fontFamily: "dm-sans, sans-serif" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{pkg.label}</span>
                    {pkg.badge && (
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", background: "#FF6B35", color: "#fff", borderRadius: 99, padding: "2px 7px", whiteSpace: "nowrap" }}>
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: sel ? "#FF6B35" : "#6b7280" }}>
                    {displayPrice(pkg)}
                  </span>
                </button>
                {pkg.id !== "custom" && (
                  <button type="button"
                    onClick={() => setExpanded(open ? null : pkg.id)}
                    style={{
                      padding: "4px 10px", borderRadius: 6, border: "none",
                      background: "rgba(0,0,0,0.05)", cursor: "pointer",
                      fontSize: 11, fontWeight: 700, color: "#6b7280",
                      fontFamily: "dm-sans, sans-serif", display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
                    }}
                  >
                    {open ? "Hide" : "Details"}
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none"
                      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                {sel && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="12" fill="#FF6B35" />
                    <path d="M7 12l4 4 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {open && (
                <div style={{ padding: "0 14px 12px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {packageItems(pkg).map((item, i) => {
                      const isNa = item.startsWith("✗");
                      return (
                        <li key={i} style={{ fontSize: 12, color: isNa ? "#9ca3af" : "#4b5563", display: "flex", alignItems: "flex-start", gap: 6 }}>
                          <span style={{ color: isNa ? "#d1d5db" : "#22c55e", flexShrink: 0, marginTop: 1 }}>
                            {isNa ? "✗" : "✓"}
                          </span>
                          <span>{isNa ? item.slice(2) : item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 4: Custom Bundle ────────────────────────────────────────────────────

function StepBundle({ form, setForm }: { form: QuoteForm; setForm: (f: QuoteForm) => void }) {
  const is360 = form.booth === "360";

  const toggle = (id: string) => {
    const has = form.customAddons.includes(id);
    setForm({ ...form, customAddons: has ? form.customAddons.filter(a => a !== id) : [...form.customAddons, id] });
  };

  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Build Your Bundle
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        Select any add-ons. Prices are on top of your base booth price.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {CUSTOM_ADDONS.map(addon => {
          const na = is360 && addon.notFor360;
          const attendantIncluded = is360 && addon.id === "attendant";
          const sel = form.customAddons.includes(addon.id);

          return (
            <button key={addon.id} type="button"
              disabled={na || attendantIncluded}
              onClick={() => { if (!na && !attendantIncluded) toggle(addon.id); }}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 12, textAlign: "left",
                border: attendantIncluded ? "1.5px solid #86EFAC" : sel ? "2px solid #FF6B35" : "1.5px solid #e5e7eb",
                background: attendantIncluded ? "#F0FDF4" : sel ? "#FFF3EE" : na ? "#fafafa" : "#fff",
                opacity: na ? 0.45 : 1, cursor: na || attendantIncluded ? "default" : "pointer",
                transition: "all 0.2s", fontFamily: "dm-sans, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: na ? "#9ca3af" : "#1a1a2e" }}>{addon.label}</span>
                {addon.note && !na && (
                  <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 8 }}>{addon.note}</span>
                )}
                {na && <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 8 }}>N/A for 360 video</span>}
                {attendantIncluded && <span style={{ fontSize: 11, color: "#16a34a", marginLeft: 8 }}>Always included with 360</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: sel ? "#FF6B35" : "#6b7280" }}>
                  {attendantIncluded
                    ? "Included"
                    : addon.durationBased
                      ? `$${20 * form.duration} (${form.duration}h × $20)`
                      : addon.priceLabel}
                </span>
                {!na && !attendantIncluded && (
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                    border: sel ? "none" : "2px solid #d1d5db",
                    background: sel ? "#FF6B35" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {sel && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 5: Print Size ───────────────────────────────────────────────────────

function StepPrintSize({ form, setForm }: { form: QuoteForm; setForm: (f: QuoteForm) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Print Size
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        {form.package !== "custom"
          ? "Your package includes unlimited printing — choose your preferred size."
          : "Choose your print size."}{" "}
        Default is 2×6.
      </p>
      <div className="grid grid-cols-2" style={{ gap: 12 }}>
        {(["2x6", "4x6"] as PrintSize[]).map(size => {
          const sel = form.printSize === size;
          return (
            <button key={size} type="button" onClick={() => setForm({ ...form, printSize: size })}
              style={{
                padding: 14, borderRadius: 12, textAlign: "left", cursor: "pointer",
                border: sel ? "2px solid #FF6B35" : "1.5px solid #e5e7eb",
                background: sel ? "#FFF3EE" : "#fff",
                transition: "all 0.2s", fontFamily: "dm-sans, sans-serif",
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>
                {size === "2x6" ? '2×6"' : '4×6"'}
              </p>
              <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>
                {size === "2x6" ? "Classic strip" : "Standard photo"}
              </p>
              <img
                src={size === "2x6" ? "/2 x 6 classic strip.jpeg" : "/4 x 6 standard photo.jpeg"}
                alt={size}
                style={{
                  width: size === "2x6" ? "50%" : "100%",
                  margin: size === "2x6" ? "0 auto" : "0",
                  borderRadius: 6, display: "block",
                }}
              />
              <p style={{ fontSize: 13, fontWeight: 700, color: sel ? "#FF6B35" : "#6b7280", marginTop: 10, textAlign: "center" }}>
                ${getPrintPrice(size)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 6: Backdrop ─────────────────────────────────────────────────────────

function StepBackdrop({ form, setForm }: { form: QuoteForm; setForm: (f: QuoteForm) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Choose Your Backdrop
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        Pick a style. Our team will confirm availability closer to your event date.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {BACKDROPS.map(b => {
          const sel = form.backdropChoice === b.name;
          return (
            <button key={b.name} type="button" title={b.name}
              onClick={() => setForm({ ...form, backdropChoice: b.name })}
              style={{
                padding: 0, border: sel ? "2.5px solid #FF6B35" : "2px solid transparent",
                borderRadius: 10, overflow: "hidden", cursor: "pointer",
                background: "none", transition: "transform 0.2s", aspectRatio: "1/1", outline: "none", position: "relative",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; (e.currentTarget as HTMLElement).style.zIndex = "10"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.zIndex = "1"; }}
            >
              <img src={b.src} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
            </button>
          );
        })}
      </div>
      {form.backdropChoice ? (
        <p style={{ fontSize: 13, color: "#FF6B35", fontWeight: 600, marginTop: 10 }}>
          Selected: {form.backdropChoice}
        </p>
      ) : (
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 10 }}>
          No selection yet — you can skip and we&apos;ll discuss options when we confirm your booking.
        </p>
      )}
    </div>
  );
}

// ─── Step 7: Location ─────────────────────────────────────────────────────────

function StepLocation({ form, setForm }: { form: QuoteForm; setForm: (f: QuoteForm) => void }) {
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Event Location
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        We serve Calgary and surrounding areas. Travel within Calgary is free.
      </p>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Event Address *</label>
        <input type="text" value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          style={inputStyle} placeholder="123 Main St, Calgary, AB" required />
      </div>
      <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 16px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#4b5563", marginBottom: 6 }}>Travel Fee Policy</p>
        <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7 }}>
          Within Calgary (≤ 200 km from downtown): <strong>Free</strong><br />
          Outside Calgary: $0.40/km — our team calculates and confirms the exact fee with your final quote.
        </p>
      </div>
    </div>
  );
}

// ─── Step 8: Summary ──────────────────────────────────────────────────────────

function StepSummary({ form }: { form: QuoteForm }) {
  const booth = BOOTHS.find(b => b.id === form.booth);
  const pkg = PACKAGES.find(p => p.id === form.package);
  const base = getBasePrice(form.booth, form.duration);
  const addons = getAddonLineItems(form);
  const total = getTotalPrice(form);

  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Your Quote Summary
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        Review your selections before submitting.
      </p>

      <div style={{ background: "#f9f9f9", borderRadius: 14, padding: "clamp(16px, 2vw, 22px)" }}>
        <div style={{ paddingBottom: 12, borderBottom: "1px solid #efefef", marginBottom: 12 }}>
          <Row label="Booth" value={booth?.label ?? ""} />
          <Row label="Duration" value={form.duration === 8 ? "8+ hrs" : `${form.duration} hrs`} />
          <Row label="Date" value={form.date || "TBD"} />
          <Row label="Base Price" value={`$${base.toLocaleString()}`} bold />
        </div>

        <div style={{ paddingBottom: 12, borderBottom: "1px solid #efefef", marginBottom: 12 }}>
          <Row label="Package" value={pkg?.label ?? ""} />
          {addons.length > 0 && (
            <div style={{ paddingLeft: 12, marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
              {addons.map((a, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>— {a.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}>+${a.price}</span>
                </div>
              ))}
            </div>
          )}
          {addons.length === 0 && form.package === "basic" && (
            <p style={{ fontSize: 12, color: "#9ca3af", paddingLeft: 12, marginTop: 4 }}>No add-ons (Basic Package)</p>
          )}
        </div>

        {(form.backdropChoice || form.printSize) && (
          <div style={{ paddingBottom: 12, borderBottom: "1px solid #efefef", marginBottom: 12 }}>
            {form.backdropChoice && <Row label="Backdrop" value={form.backdropChoice} />}
            {form.booth !== "360" && (form.package === "gold" || form.package === "platinum" || (form.package === "custom" && form.customAddons.includes("printing"))) && (
              <Row label="Print Size" value={form.printSize === "2x6" ? '2×6" classic strip' : '4×6" standard photo'} />
            )}
          </div>
        )}

        {form.address && (
          <div style={{ paddingBottom: 12, borderBottom: "1px solid #efefef", marginBottom: 12 }}>
            <Row label="Location" value={form.address} small />
            <Row label="Travel Fee" value="Confirmed at booking" muted />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#9ca3af" }}>
            Estimated Total
          </span>
          <span className="font-heading" style={{ fontSize: "clamp(30px, 3.5vw, 44px)", letterSpacing: "-0.04em", color: "#1a1a2e" }}>
            ${total.toLocaleString()}
          </span>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
          + taxes. Travel fee may apply. Final confirmed by our team.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, bold, muted, small }: { label: string; value: string; bold?: boolean; muted?: boolean; small?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
      <span style={{ fontSize: 12, color: muted ? "#9ca3af" : "#6b7280" }}>{label}</span>
      <span style={{ fontSize: small ? 11 : 13, fontWeight: bold ? 700 : 600, color: muted ? "#9ca3af" : "#1a1a2e", maxWidth: "60%", textAlign: "right" }}>{value}</span>
    </div>
  );
}

// ─── Step 9: Contact + Submit ─────────────────────────────────────────────────

function StepContact({
  form, setForm, onSubmit, submitted,
}: { form: QuoteForm; setForm: (f: QuoteForm) => void; onSubmit: () => void; submitted: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (submitted) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [submitted]);

  if (submitted) {
    return (
      <div style={{
        textAlign: "center", padding: "clamp(40px, 6vw, 72px) 0",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ fontSize: 60, marginBottom: 20, animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both" }}>🎉</div>
        <h3 className="font-heading" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", letterSpacing: "-0.03em", color: "#1a1a2e", marginBottom: 16, lineHeight: 1.1 }}>
          Quote request received!
        </h3>
        <p style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "#6b7280", lineHeight: 1.75, maxWidth: 380, margin: "0 auto 28px" }}>
          Thanks, we&apos;ve received your quote request. Our team will review your details and follow up to confirm availability and finalize your booking.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#f0f9f0", borderRadius: 60, border: "1.5px solid #bbf0bb" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Inquiry received</span>
        </div>
        <style>{`@keyframes popIn { from { transform: scale(0) rotate(-20deg); opacity: 0; } to { transform: scale(1) rotate(0deg); opacity: 1; } }`}</style>
      </div>
    );
  }

  const canSubmit = !!form.name && !!form.email;
  return (
    <div>
      <h3 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.025em", color: "#1a1a2e", marginBottom: 4 }}>
        Almost there!
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
        Enter your contact details and we&apos;ll follow up to confirm availability and finalize your booking.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 16px" }}>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Name *</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="Full name" required />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Email *</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="your@email.com" required />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Phone</label>
          <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} placeholder="(403) 555-0000" />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Event Notes (optional)</label>
        <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
          style={{ ...inputStyle, resize: "none" }} placeholder="Any special requests or details about your event..." />
      </div>
      <button type="button" onClick={onSubmit} disabled={!canSubmit}
        className="transition-all duration-300 hover:opacity-80"
        style={{
          width: "100%", fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif",
          padding: "16px 32px", borderRadius: 60, border: "none", color: "#fff",
          background: canSubmit ? "#FF6B35" : "#d1d5db",
          cursor: canSubmit ? "pointer" : "not-allowed", transition: "background 0.2s",
        }}
      >
        Get My Quote &amp; Check Availability →
      </button>
      <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 10, textAlign: "center" }}>
        We typically respond within 24 hours.
      </p>
    </div>
  );
}

// ─── Contact Form Panel ───────────────────────────────────────────────────────

function ContactFormPanel() {
  const [cf, setCf] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (submitted) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [submitted]);

  if (submitted) {
    return (
      <div style={{
        textAlign: "center", padding: "clamp(40px, 6vw, 72px) 0",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ fontSize: 60, marginBottom: 20, animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both" }}>🎉</div>
        <h3 className="font-heading" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", letterSpacing: "-0.03em", color: "#1a1a2e", marginBottom: 16, lineHeight: 1.1 }}>
          Message sent!
        </h3>
        <p style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "#6b7280", lineHeight: 1.75, maxWidth: 360, margin: "0 auto 28px" }}>
          Thanks for reaching out. We&apos;ll be in touch within 24 hours.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#f0f9f0", borderRadius: 60, border: "1.5px solid #bbf0bb" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Message received</span>
        </div>
        <style>{`@keyframes popIn { from { transform: scale(0) rotate(-20deg); opacity: 0; } to { transform: scale(1) rotate(0deg); opacity: 1; } }`}</style>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 clamp(16px, 2vw, 24px)" }}>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Name *</label>
          <input type="text" name="name" required value={cf.name} onChange={e => setCf({ ...cf, name: e.target.value })} style={inputStyle} placeholder="Full name" />
        </div>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Email *</label>
          <input type="email" name="email" required value={cf.email} onChange={e => setCf({ ...cf, email: e.target.value })} style={inputStyle} placeholder="your@email.com" />
        </div>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Phone</label>
          <input type="tel" name="phone" value={cf.phone} onChange={e => setCf({ ...cf, phone: e.target.value })} style={inputStyle} placeholder="(403) 555-0000" />
        </div>
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Subject</label>
          <select name="subject" value={cf.subject} onChange={e => setCf({ ...cf, subject: e.target.value })} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
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
        <textarea name="message" rows={4} required value={cf.message} onChange={e => setCf({ ...cf, message: e.target.value })} style={{ ...inputStyle, resize: "none" as const }} placeholder="Tell us about your event..." />
      </div>
      <div style={{ marginTop: 28 }}>
        <button type="submit"
          disabled={!cf.name || !cf.email || !cf.message}
          className="transition-all duration-300 hover:opacity-80"
          style={{
            fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif",
            padding: "16px 48px", borderRadius: 60, border: "none", color: "#fff",
            background: !cf.name || !cf.email || !cf.message ? "#d1d5db" : "#FF6B35",
            cursor: !cf.name || !cf.email || !cf.message ? "not-allowed" : "pointer",
          }}
        >
          Send Message
        </button>
        <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 12 }}>We typically respond within 24 hours.</p>
      </div>
    </form>
  );
}

// ─── QuotePanel ───────────────────────────────────────────────────────────────

function QuotePanel() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteForm>(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);
  const hasMounted = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeSteps = getActiveSteps(form);
  const currentStepId = activeSteps[step] as StepId;

  useEffect(() => {
    if (step >= activeSteps.length) setStep(Math.max(0, activeSteps.length - 1));
  }, [activeSteps.length, step]);

  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    if (!panelRef.current || window.innerWidth >= 768) return;
    const top = panelRef.current.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }, [step, submitted]);

  const canAdvance = (): boolean => {
    if (currentStepId === "booth") return !!form.booth;
    if (currentStepId === "duration") return !!form.date;
    if (currentStepId === "package") return !!form.package;
    if (currentStepId === "location") return !!form.address;
    return true;
  };

  return (
    <div ref={panelRef}>
      <StepIndicator current={step} total={activeSteps.length} />

      {currentStepId === "booth"     && <StepBooth     form={form} setForm={setForm} />}
      {currentStepId === "duration"  && <StepDuration  form={form} setForm={setForm} />}
      {currentStepId === "package"   && <StepPackage   form={form} setForm={setForm} />}
      {currentStepId === "bundle"    && <StepBundle    form={form} setForm={setForm} />}
      {currentStepId === "printSize" && <StepPrintSize form={form} setForm={setForm} />}
      {currentStepId === "backdrop"  && <StepBackdrop  form={form} setForm={setForm} />}
      {currentStepId === "location"  && <StepLocation  form={form} setForm={setForm} />}
      {currentStepId === "summary"   && <StepSummary   form={form} />}
      {currentStepId === "contact"   && <StepContact   form={form} setForm={setForm} onSubmit={() => setSubmitted(true)} submitted={submitted} />}

      {step > 0 && !submitted && (
        <div className="flex items-center justify-between" style={{ marginTop: 28 }}>
          <button type="button" onClick={() => setStep(step - 1)}
            style={{ fontSize: 12, fontWeight: 700, fontFamily: "dm-sans, sans-serif", color: "#6b7280", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          {currentStepId !== "contact" && (
            <button type="button" onClick={() => { if (canAdvance()) setStep(step + 1); }}
              disabled={!canAdvance()}
              style={{
                fontSize: 15, fontWeight: 700, fontFamily: "dm-sans, sans-serif",
                padding: "14px 32px", borderRadius: 60, border: "none", color: "#fff",
                background: canAdvance() ? "#FF6B35" : "#d1d5db",
                cursor: canAdvance() ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
              }}
            >
              Continue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
      {step === 0 && currentStepId !== "contact" && (
        <div className="flex items-center justify-end" style={{ marginTop: 28 }}>
          <button type="button" onClick={() => { if (canAdvance()) setStep(step + 1); }}
            disabled={!canAdvance()}
            style={{
              fontSize: 13, fontWeight: 700, fontFamily: "dm-sans, sans-serif",
              padding: "14px 32px", borderRadius: 60, border: "none", color: "#fff",
              background: canAdvance() ? "#FF6B35" : "#d1d5db",
              cursor: canAdvance() ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
            }}
          >
            Continue
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface BookingCTAProps {
  headingLine1?: string;
  headingLine2?: React.ReactNode;
  subtext?: string;
  defaultTab?: "quote" | "contact";
  sectionBackground?: string;
}

export default function BookingCTA({
  headingLine1, headingLine2, subtext,
  defaultTab = "quote", sectionBackground = "#f9f9f9",
}: BookingCTAProps = {}) {
  const [tab, setTab] = useState<"quote" | "contact">(defaultTab);

  const tabOrder = defaultTab === "contact"
    ? (["contact", "quote"] as const)
    : (["quote", "contact"] as const);

  return (
    <section id="book" data-no-cursor-tag style={{ background: sectionBackground, padding: "clamp(40px, 12vw, 180px) 0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <AnimatedText as="h2" className="font-heading"
            style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#1a1a2e" }}
            stagger={90}
          >
            <AnimLine>{headingLine1 ?? "Get a quote"}</AnimLine>
            <AnimLine>{headingLine2 ?? <em style={{ fontStyle: "italic" }}>instantly.</em>}</AnimLine>
          </AnimatedText>
          <StickerReveal delay={500} style={{ position: "absolute", right: 0, top: "10%" }}>
            <img src="/icons/something-special.svg" alt="" style={{ width: "clamp(80px, 8vw, 120px)", height: "auto" }} />
          </StickerReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]" style={{ gap: "clamp(40px, 5vw, 80px)" }}>

          {/* Left — contact info */}
          <RevealOnScroll>
            <div>
              <p style={{ fontSize: "clamp(16px, 1.2vw, 20px)", fontWeight: 400, color: "#6b7280", maxWidth: 420, lineHeight: 1.75, marginBottom: 48 }}>
                {subtext ?? "Answer a few quick questions to get an instant estimate. We\u2019ll confirm your booking with a final quote."}
              </p>
              <div className="flex flex-col" style={{ gap: 32 }}>
                {[
                  { icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", label: "Phone", value: "(403) 555-0123" },
                  { icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", label: "Email", value: "info@photoboothexperience.ca" },
                  { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", label: "Service Area", value: "Calgary & Surrounding Areas" },
                ].map(c => (
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

          {/* Right — form card */}
          <RevealOnScroll delay={200}>
            <div style={{
              background: "#fff", borderRadius: "clamp(16px, 2vw, 24px)",
              border: "1.5px solid #ebebeb", padding: "clamp(24px, 3vw, 44px)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.05)",
            }}>
              {/* Tab toggle */}
              <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 10, padding: 4, marginBottom: 28 }}>
                {tabOrder.map(t => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    style={{
                      flex: 1, padding: "9px 0", borderRadius: 7, border: "none",
                      background: tab === t ? "#fff" : "transparent",
                      color: tab === t ? "#1a1a2e" : "#9ca3af",
                      fontFamily: "dm-sans, sans-serif", fontWeight: 700, fontSize: 13,
                      cursor: "pointer",
                      boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {t === "quote" ? "Instant Quote" : "Contact Us"}
                  </button>
                ))}
              </div>

              {tab === "contact" ? <ContactFormPanel /> : <QuotePanel />}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

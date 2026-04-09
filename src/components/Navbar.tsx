"use client";

import { useState, useEffect, useRef } from "react";

const activityItems = [
  { label: "Weddings",       href: "/activities/wedding",       emoji: "💍", accent: "#E84393" },
  { label: "Baby Showers",   href: "/activities/baby-shower",   emoji: "🍼", accent: "#6C5CE7" },
  { label: "Birthdays",      href: "/activities/birthday",      emoji: "🎂", accent: "#F7C948" },
  { label: "Gender Reveals", href: "/activities/gender-reveal", emoji: "🎉", accent: "#0984E3" },
  { label: "Festivals",      href: "/activities/festival",      emoji: "🎪", accent: "#FF6B35" },
  { label: "Corporate",      href: "/activities/corporate",     emoji: "🏢", accent: "#00B894" },
];

// ─── DESKTOP DROPDOWN ─────────────────────────────────────────────────────────
function ActivitiesDropdown({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 14px)",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0) scale(1)"
          : "translateX(-50%) translateY(-10px) scale(0.96)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
        transformOrigin: "top center",
        width: 460,
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 8px 48px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06)",
        padding: "10px 10px 8px",
        zIndex: 100,
      }}
    >
      <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, background: "#fff", borderRadius: 2, rotate: "45deg", boxShadow: "-2px -2px 6px rgba(0,0,0,0.04)" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {activityItems.map((item, i) => (
          <ActivityDropdownItem key={item.href} item={item} delay={i * 28} visible={visible} />
        ))}
      </div>
      <div style={{ marginTop: 8, borderTop: "1px solid #f3f4f6", paddingTop: 8 }}>
        <a
          href="/activities"
          className="flex items-center justify-between"
          style={{ padding: "10px 14px", borderRadius: 12, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f9f9f9")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", fontFamily: "dm-sans, sans-serif", letterSpacing: "0.01em" }}>View All Occasions</span>
          <span style={{ fontSize: 13, color: "#FF6B35", fontWeight: 700 }}>→</span>
        </a>
      </div>
    </div>
  );
}

function ActivityDropdownItem({ item, delay, visible }: { item: (typeof activityItems)[0]; delay: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.href}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 14,
        textDecoration: "none",
        background: hovered ? item.accent + "10" : "transparent",
        transition: "background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        width: 38, height: 38, borderRadius: 11,
        background: hovered ? item.accent : item.accent + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
        transition: "background 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
      }}>
        {item.emoji}
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, color: hovered ? item.accent : "#1a1a2e", fontFamily: "epilogue, sans-serif", letterSpacing: "-0.01em", transition: "color 0.2s", whiteSpace: "nowrap" }}>
        {item.label}
      </span>
    </a>
  );
}

// ─── MOBILE ACTIVITY CARD ─────────────────────────────────────────────────────
function MobileActivityItem({ item, index, visible, onClick }: { item: (typeof activityItems)[0]; index: number; visible: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.href}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 14,
        textDecoration: "none",
        background: hovered ? item.accent + "12" : item.accent + "08",
        transition: "background 0.2s, opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
        transitionDelay: visible ? `${index * 35}ms` : "0ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        width: 34, height: 34, borderRadius: 10,
        background: hovered ? item.accent : item.accent + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, flexShrink: 0,
        transition: "background 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1)",
      }}>
        {item.emoji}
      </span>
      <span style={{ fontSize: 13, fontWeight: 700, color: hovered ? item.accent : "#1a1a2e", fontFamily: "epilogue, sans-serif", letterSpacing: "-0.01em", transition: "color 0.2s" }}>
        {item.label}
      </span>
    </a>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export default function Navbar({ forceDark = false }: { forceDark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [activitiesMobileOpen, setActivitiesMobileOpen] = useState(false);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setOverLight(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivitiesOpen(true);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActivitiesOpen(false), 120);
  };

  const isDark = forceDark || overLight;
  // On mobile when menu is open, always use dark text (nav bar turns white)
  const textColor = (isDark || menuOpen) ? "#1a1a2e" : "#fff";
  const textColorMuted = isDark ? "rgba(26,26,46,0.7)" : "rgba(255,255,255,0.85)";

  const navLinks = [
    { label: "Products",  href: "/products" },
    { label: "Locations", href: "/locations" },
    { label: "About",     href: "/about" },
    { label: "Contact",   href: "/contact" },
  ];

  return (
    <>
      {/* Backdrop overlay — mobile only, behind the menu card */}
      <div
        className="md:hidden fixed inset-0"
        style={{
          background: "rgba(0,0,0,0.45)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
          zIndex: 49,
        }}
        onClick={() => { setMenuOpen(false); setActivitiesMobileOpen(false); }}
      />

      <header className="fixed left-0 right-0 z-50 transition-all duration-500" style={{ top: "clamp(8px, 1vw, 16px)" }}>

        {/* Mobile nav bar white background — connects header to dropdown card */}
        <div
          className="md:hidden absolute"
          style={{
            top: 0,
            left: "clamp(8px, 1vw, 16px)",
            right: "clamp(8px, 1vw, 16px)",
            height: 78, // nav height (72) + gap to card (6)
            background: menuOpen ? "#fff" : "transparent",
            borderRadius: "20px 20px 0 0",
            transition: "background 0.25s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
          <nav className="flex items-center justify-between" style={{ height: 72 }}>
            <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {/* White logo on dark bg, black logo on light bg */}
              <img
                src={isDark || menuOpen ? "/main-logo-black.png" : "/main-logo-white.png"}
                alt="Photobooth Experience"
                style={{
                  height: "clamp(56px, 6vw, 80px)",
                  width: "auto",
                  transition: "opacity 0.4s ease",
                  display: "block",
                }}
              />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center" style={{ gap: "clamp(24px, 3vw, 44px)" }}>
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ fontSize: 15, fontWeight: 500, color: textColorMuted, transition: "color 0.4s ease, opacity 0.3s" }}
                  className="transition-all duration-300 hover:opacity-50"
                >
                  {item.label}
                </a>
              ))}
              <div ref={activitiesRef} style={{ position: "relative" }} onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <a
                  href="/activities"
                  style={{ fontSize: 15, fontWeight: 500, color: textColorMuted, transition: "color 0.4s ease, opacity 0.3s", display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}
                  className="transition-all duration-300 hover:opacity-50"
                >
                  Activities
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: activitiesOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.6 }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <ActivitiesDropdown visible={activitiesOpen} />
              </div>
              <a
                href="/contact"
                className="transition-all duration-300 hover:opacity-80"
                style={{ fontSize: 14, fontWeight: 700, padding: "10px 28px", background: "#FF6B35", color: "#fff", borderRadius: 60, textDecoration: "none" }}
              >
                Book Now
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => { setMenuOpen(!menuOpen); if (menuOpen) setActivitiesMobileOpen(false); }}
              className="md:hidden cursor-pointer"
              style={{ fontSize: 15, fontWeight: 600, color: textColor, background: "none", border: "none", padding: 0, transition: "color 0.4s ease" }}
              aria-label="Menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </nav>
        </div>

        {/* ── Mobile menu card ── */}
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: "clamp(8px, 1vw, 16px)",
            right: "clamp(8px, 1vw, 16px)",
            background: "#fff",
            borderRadius: "0 0 20px 20px",
            boxShadow: "0 12px 56px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.06)",
            overflow: "hidden",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.97)",
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            transformOrigin: "top center",
          }}
        >
          <div style={{ padding: "8px 10px 10px" }}>
            {/* Nav links */}
            {navLinks.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex", alignItems: "center", padding: "11px 14px", borderRadius: 14,
                  textDecoration: "none", fontSize: 15, fontWeight: 700, color: "#1a1a2e",
                  fontFamily: "epilogue, sans-serif", letterSpacing: "-0.01em",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.2s",
                  transitionDelay: menuOpen ? `${i * 35}ms` : "0ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f9f9f9")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {item.label}
              </a>
            ))}

            <div style={{ height: 1, background: "#f3f4f6", margin: "4px 4px" }} />

            {/* Activities accordion */}
            <div>
              <button
                onClick={() => setActivitiesMobileOpen(!activitiesMobileOpen)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "11px 14px", borderRadius: 14,
                  background: activitiesMobileOpen ? "#f9f9f9" : "transparent",
                  border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#1a1a2e",
                  fontFamily: "epilogue, sans-serif", letterSpacing: "-0.01em",
                  transition: "background 0.2s, opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(6px)",
                  transitionDelay: menuOpen ? `${navLinks.length * 35}ms` : "0ms",
                }}
              >
                Activities
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                  style={{ transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)", transform: activitiesMobileOpen ? "rotate(180deg)" : "rotate(0deg)", color: "#9ca3af", flexShrink: 0 }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div style={{ maxHeight: activitiesMobileOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
                <div style={{ padding: "6px 0 4px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {activityItems.map((item, i) => (
                    <MobileActivityItem key={item.href} item={item} index={i} visible={activitiesMobileOpen} onClick={() => setMenuOpen(false)} />
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #f3f4f6", margin: "4px 0 0" }}>
                  <a
                    href="/activities"
                    onClick={() => setMenuOpen(false)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 12, textDecoration: "none", transition: "background 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f9f9f9")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", fontFamily: "dm-sans, sans-serif" }}>View All Occasions</span>
                    <span style={{ fontSize: 13, color: "#FF6B35", fontWeight: 700 }}>→</span>
                  </a>
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: "#f3f4f6", margin: "4px 4px 8px" }} />

            {/* Book Now */}
            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block", textAlign: "center", fontSize: 15, fontWeight: 700,
                color: "#fff", background: "#FF6B35", padding: "14px 28px", borderRadius: 14,
                textDecoration: "none",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: menuOpen ? `${(navLinks.length + 1) * 35}ms` : "0ms",
              }}
            >
              Book Now
            </a>
          </div>
        </div>

      </header>
    </>
  );
}

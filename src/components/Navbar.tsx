"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // true = we're past the dark hero and now over a light section
  const [overLight, setOverLight] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hero is ~100vh tall; switch to dark text once 85% scrolled past it
      setOverLight(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = overLight ? "#1a1a2e" : "#fff";
  const textColorMuted = overLight ? "rgba(26,26,46,0.7)" : "rgba(255,255,255,0.85)";

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-500"
      style={{ top: "clamp(8px, 1vw, 16px)" }}
      // No background ever — transparent at all times
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        <nav className="flex items-center justify-between" style={{ height: 72 }}>
          <a
            href="/"
            className="font-heading"
            style={{
              fontSize: "clamp(18px, 1.4vw, 22px)",
              color: textColor,
              letterSpacing: "-0.02em",
              transition: "color 0.4s ease",
            }}
          >
            Photobooth Experience
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center" style={{ gap: "clamp(24px, 3vw, 44px)" }}>
            {["Products", "Pricing", "About", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-all duration-300 hover:opacity-50"
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: textColorMuted,
                  transition: "color 0.4s ease, opacity 0.3s",
                }}
              >
                {item}
              </a>
            ))}
            <a
              href="#book"
              className="transition-all duration-300 hover:opacity-80"
              style={{
                fontSize: 14,
                fontWeight: 700,
                padding: "10px 28px",
                background: "#FF6B35",
                color: "#fff",
                borderRadius: 60,
              }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden cursor-pointer"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: textColor,
              background: "none",
              border: "none",
              padding: 0,
              transition: "color 0.4s ease",
            }}
            aria-label="Menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown — keeps its own background since it needs to be readable */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? 380 : 0,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: menuOpen ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{ padding: "24px clamp(24px, 5vw, 80px)" }} className="flex flex-col">
          {["Products", "Pricing", "About", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "#1a1a2e",
                padding: "14px 0",
                borderBottom: "1px solid #f5f5f5",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            className="text-center"
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              background: "#FF6B35",
              padding: "14px 28px",
              marginTop: 20,
              borderRadius: 60,
            }}
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}

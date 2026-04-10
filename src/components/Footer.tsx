"use client";

import { useState } from "react";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

export default function Footer() {
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <footer style={{ padding: "0 clamp(8px, 1vw, 16px)" }}>
      <div style={{ background: "#141414", borderRadius: "clamp(12px, 1.5vw, 24px) clamp(12px, 1.5vw, 24px) 0 0", padding: "clamp(80px, 10vw, 140px) 0 clamp(40px, 5vw, 60px)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Big footer heading with flame + exploding stickers */}
        <div style={{ position: "relative", marginBottom: "clamp(56px, 8vw, 100px)" }}>
          <AnimatedText
            as="h2"
            className="font-heading"
            style={{
              fontSize: "clamp(36px, 6vw, 88px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#fff",
            }}
            stagger={90}
          >
            <AnimLine>
              {/* Flame emoji inline after "your" */}
              Let&apos;s make your{" "}
              <StickerReveal
                delay={400}
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <img
                  src="/icons/unforgettable.svg"
                  alt=""
                  style={{ width: "clamp(36px, 4.5vw, 68px)", height: "auto" }}
                />
              </StickerReveal>
            </AnimLine>
            <AnimLine>
              next event{" "}
              <em style={{ fontStyle: "italic" }}>unforgettable.</em>
            </AnimLine>
          </AnimatedText>

          {/* Exploding / burst sticker — right side */}
          <StickerReveal
            delay={700}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <img
              src="/icons/unforgettable-2.svg"
              alt=""
              style={{ width: "clamp(56px, 6vw, 88px)", height: "auto" }}
            />
          </StickerReveal>
        </div>

        {/* Footer grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-4"
          style={{
            gap: "clamp(32px, 4vw, 56px)",
            paddingTop: "clamp(36px, 4vw, 56px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="md:col-span-2">
            <h3
              className="font-heading"
              style={{ fontSize: 20, color: "#fff", marginBottom: 14 }}
            >
              Photobooth Experience
            </h3>
            <p style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: "rgba(255,255,255,0.4)", maxWidth: 340 }}>
              Premium photo booth rentals for weddings, corporate events,
              and celebrations across Calgary and surrounding areas.
            </p>
            <div className="flex items-center" style={{ gap: 20, marginTop: 28 }}>
              {[
                { label: "Instagram", href: "https://www.instagram.com/photobooth_experience/", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { label: "Facebook", href: "https://www.facebook.com/photoboothxperience", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/photobooth-experience/", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="transition-opacity duration-300 hover:opacity-60" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-heading"
              style={{ fontSize: 12, letterSpacing: "0.06em", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}
            >
              QUICK LINKS
            </h4>
            <div className="flex flex-col" style={{ gap: 14 }}>
              {[
                { label: "Products", href: "/products" },
                { label: "Locations", href: "/locations" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Book Now", href: "/contact" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="transition-opacity duration-300 hover:opacity-60" style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-heading"
              style={{ fontSize: 12, letterSpacing: "0.06em", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}
            >
              SERVICE AREAS
            </h4>
            <div className="flex flex-col" style={{ gap: 14 }}>
              {["Calgary", "Banff", "Canmore", "Airdrie", "Cochrane", "Okotoks"].map((a) => (
                <a key={a} href={`/locations/${a.toLowerCase()}`} className="transition-opacity duration-300 hover:opacity-60" style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{a}</a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, marginTop: 56, gap: 16 }}
        >
          <p style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} Photobooth Experience. All rights reserved.
          </p>
          <div className="flex items-center" style={{ gap: 20 }}>
            <a href="/terms" className="transition-opacity duration-300 hover:opacity-60" style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>
              Terms &amp; Conditions
            </a>
            <button
              onClick={() => setLocationOpen((o) => !o)}
              style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.2)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              Location info
            </button>
          </div>
        </div>

        {/* Location info accordion */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: locationOpen ? 600 : 0,
            transition: "max-height 0.4s ease",
            marginTop: locationOpen ? 24 : 0,
          }}
        >
          <div style={{ color: "#ffffff", fontSize: 13, lineHeight: 1.7, paddingBottom: 8 }}>
            <iframe
              src="https://www.google.com/maps?q=99+Copperstone+Park+SE,+Calgary,+AB+T2Z+5C9&output=embed"
              width="600"
              height="200"
              style={{ border: 0, display: "block", maxWidth: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div itemScope itemType="https://schema.org/LocalBusiness" style={{ marginTop: 16 }}>
              <div itemProp="name">Photobooth Experience</div>
              <div>Email: <span itemProp="email">info@photoboothexperience.ca</span></div>
              <div>Phone: <span itemProp="telephone">+1 403-448-4048</span></div>
              <div>Url: <span itemProp="url">https://photoboothexperience.ca/</span></div>
              <div itemProp="description" style={{ marginTop: 8 }}>
                At Photobooth Experience, we bring fun, style, and lasting memories to every event with our premium Calgary photo booth rentals, serving Calgary and surrounding areas. Whether you&apos;re hosting a wedding, birthday, corporate event, or community celebration, our modern photo booths, high-quality prints, and interactive props create the perfect guest experience. Serving clients within a 200km radius of Calgary, we take pride in our sleek setups, professional service, and engaging entertainment for all ages. Book your photo booth today with Photobooth Experience and turn your special moments into unforgettable keepsakes.
              </div>
              <div itemType="https://schema.org/PostalAddress" itemScope itemProp="address" style={{ marginTop: 8 }}>
                <div itemProp="streetAddress">99 Copperstone Park SE</div>
                <div>
                  <span itemProp="addressLocality">Calgary</span>,{" "}
                  <span itemProp="addressRegion">AB</span>{" "}
                  <span itemProp="postalCode">T2Z 5C9</span>,{" "}
                  <span itemProp="addressCountry">CA</span>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>Facebook: <span itemProp="sameAs">https://www.facebook.com/photoboothxperience</span></div>
              <div>LinkedIn: <span itemProp="sameAs">https://www.linkedin.com/company/photobooth-experience/</span></div>
              <div>Instagram: <span itemProp="sameAs">https://www.instagram.com/photobooth_experience/</span></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

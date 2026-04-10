"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedText, { AnimLine } from "./AnimatedText";
import StickerReveal from "./StickerReveal";

const reviews = [
  {
    quote: "Thank you so much for the wonderful experience at our twins' 10th birthday party! From start to finish, the entire booking process was seamless and stress-free. The photo booth was a huge hit—both the children and the parents had a great time using it and making memories. Thank you again for helping make our twins' milestone birthday so special and memorable.",
    name: "T. Quach",
    event: "Birthday Party",
    rating: 5,
    image: "/t.quach-review.webp",
  },
  {
    quote: "We used Photobooth Experience for our wedding and they were perfect! Harry was professional, responsive, and on time. The photobooth itself was easy to use and exactly what we wanted. We also received a digital copy of all the photos and they are amazing. We honestly weren't sure this was a real company as it resembles a company in Europe, but a quick call with Harry confirmed that he was legit and we definitely recommend him to anyone.",
    name: "Keith Letendre",
    event: "Wedding",
    rating: 5,
    image: null,
  },
  {
    quote: "We used Photobooth Experience for our grad party and they were perfect! Harry was professional, responsive, and on time. The photobooth itself was easy to use and exactly what we wanted. We also received a digital copy of all the photos and they are amazing. We honestly weren't sure this was a real company as it resembles a company in Europe, but a quick call with Harry confirmed that he was legit and we definitely recommend him to anyone.",
    name: "Sara Stephen",
    event: "Grad Party",
    rating: 5,
    image: null,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex" style={{ gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function ReviewImageThumb({ src }: { src: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <button
        onClick={() => setOpen(true)}
        aria-label="View photo"
        style={{
          flexShrink: 0,
          width: 56,
          height: 56,
          borderRadius: 10,
          overflow: "hidden",
          border: "2px solid #e5e7eb",
          padding: 0,
          cursor: "pointer",
          alignSelf: "flex-start",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(0,0,0,0.14)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        <img src={src} alt="Review photo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </button>

      {/* Popup card — fixed, floats over everything */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "popBgIn 0.2s ease",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
              animation: "popCardIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              maxWidth: "min(480px, 90vw)",
            }}
          >
            <img
              src={src}
              alt="Review photo"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: 8,
              }}
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#1a1a2e",
                border: "none",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popBgIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popCardIn { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </>
  );
}

export default function Testimonials({ blobFilter }: { blobFilter?: string } = {}) {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 180px) 0", position: "relative", overflow: "hidden" }}>
      {/* Background blob */}
      <StickerReveal
        delay={200}
        style={{ position: "absolute", right: "-6vw", top: "10%", zIndex: 0, pointerEvents: "none" }}
      >
        <img src="/icons/Asset%201new-blob.svg" alt="" style={{ width: "clamp(300px, 44vw, 680px)", height: "auto", filter: blobFilter }} />
      </StickerReveal>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Heading row */}
        <div style={{ position: "relative", marginBottom: "clamp(40px, 5vw, 64px)" }}>
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
              Loved by our
            </AnimLine>
            <AnimLine>
              <em style={{ fontStyle: "italic" }}>clients.</em>{" "}
              <StickerReveal
                delay={500}
                style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "0.1em" }}
              >
                <img
                  src="/icons/love-by-clients.svg"
                  alt=""
                  style={{ width: "clamp(44px, 5vw, 70px)", height: "auto" }}
                />
              </StickerReveal>
            </AnimLine>
          </AnimatedText>

          {/* Google rating badge */}
          <RevealOnScroll delay={300}>
            <div className="flex items-center" style={{ gap: 12, marginTop: "clamp(20px, 2.5vw, 32px)" }}>
              <GoogleIcon />
              <div className="flex items-center" style={{ gap: 8 }}>
                <span className="font-heading" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.03em", color: "#1a1a2e" }}>
                  5.0
                </span>
                <StarRating count={5} />
                <span style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#6b7280", fontWeight: 500 }}>
                  Google Reviews
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb" }}>
          {reviews.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 120}>
              <div
                className="grid grid-cols-1 md:grid-cols-12"
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "clamp(32px, 4vw, 56px) 0",
                  gap: "clamp(16px, 2vw, 32px)",
                }}
              >
                <div className="md:col-span-3">
                  <p className="font-heading" style={{ fontSize: 12, color: "#FF6B35", letterSpacing: "0.08em", marginBottom: 12 }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  {/* On mobile: name + thumbnail on the same row */}
                  <div className="flex items-start justify-between md:block">
                    <div>
                      <p className="font-heading" style={{ fontSize: 18, color: "#1a1a2e", marginBottom: 4 }}>
                        {t.name}
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#9ca3af", marginBottom: 8 }}>
                        {t.event}
                      </p>
                      <StarRating count={t.rating} />
                    </div>
                    {/* Thumbnail: visible only on mobile here */}
                    {t.image && (
                      <div className="md:hidden" style={{ flexShrink: 0 }}>
                        <ReviewImageThumb src={t.image} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-9">
                  <div className="flex items-start" style={{ gap: 16 }}>
                    <p
                      style={{
                        fontSize: "clamp(18px, 1.8vw, 28px)",
                        fontWeight: 400,
                        lineHeight: 1.55,
                        color: "#1a1a2e",
                        letterSpacing: "-0.01em",
                        flex: 1,
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    {/* Thumbnail: visible only on desktop here */}
                    {t.image && (
                      <div className="hidden md:block" style={{ flexShrink: 0 }}>
                        <ReviewImageThumb src={t.image} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* See all reviews button */}
        <RevealOnScroll delay={200}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)", display: "flex", justifyContent: "center" }}>
            <a
              href="https://share.google/KYq5PWkjvqfDhVRzb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-all duration-300 hover:opacity-80"
              style={{
                gap: 10,
                padding: "14px 32px",
                border: "1.5px solid #e5e7eb",
                borderRadius: 60,
                fontSize: 15,
                fontWeight: 700,
                color: "#1a1a2e",
                background: "#fff",
                textDecoration: "none",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <GoogleIcon />
              See All Reviews
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

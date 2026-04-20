"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=14035550123&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "clamp(16px, 3vw, 24px)",
        right: "clamp(16px, 3vw, 24px)",
        zIndex: 40,
        width: "clamp(48px, 7vw, 60px)",
        height: "clamp(48px, 7vw, 60px)",
        borderRadius: "50%",
        display: "block",
        flexShrink: 0,
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/whatsapp.svg"
        alt="WhatsApp"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </a>
  );
}

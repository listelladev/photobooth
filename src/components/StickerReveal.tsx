"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a sticker and pops it in when it enters the viewport.
 *
 * Uses CSS transition (not animation) so there is zero flash — the
 * element stays at scale(0)/opacity(0) until React flips the state,
 * then the transition interpolates from the hidden state.
 *
 * The elastic easing cubic-bezier(0.34, 1.56, 0.64, 1) has y > 1,
 * which makes scale overshoot past 1 before snapping back — that IS
 * the bouncy "sticker pop" feel, no keyframes required.
 */
export default function StickerReveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setPopped(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    // Outer div: holds all positioning / layout styles (position, top, left, etc.)
    <div ref={ref} className={className} style={style}>
      {/* Inner div: owns ONLY the pop transition — no transform conflict */}
      <div
        style={{
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
          transform: popped ? "scale(1) rotate(0deg)" : "scale(0) rotate(-18deg)",
          opacity: popped ? 1 : 0,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

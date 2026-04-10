"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "fade";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(reveal, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(el);

    // On back navigation the browser restores scroll position after mount,
    // leaving elements hidden because the observer never fires for already-visible
    // or already-scrolled-past elements. After two rAF cycles (enough time for
    // scroll restoration), reveal anything that's already in or above the viewport.
    let raf1: number, raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            reveal();
            observer.unobserve(el);
          }
        }
      });
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [delay]);

  const directionClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
        ? "reveal-right"
        : direction === "scale"
          ? "reveal-scale"
          : direction === "fade"
            ? "reveal-fade"
            : "reveal";

  return (
    <div ref={ref} className={`${directionClass} ${className}`}>
      {children}
    </div>
  );
}

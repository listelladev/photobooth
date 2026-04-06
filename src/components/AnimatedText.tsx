"use client";

import { useEffect, useRef } from "react";

/*
  Splits text into individual lines (by <br/> or children),
  then reveals each line sliding up with a stagger when visible.
*/
export default function AnimatedText({
  children,
  as: Tag = "div",
  className = "",
  style,
  delay = 0,
  stagger = 80,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lines = el.querySelectorAll<HTMLElement>(".anim-line");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lines.forEach((line, i) => {
            setTimeout(() => {
              line.style.transform = "translateY(0)";
              line.style.opacity = "1";
            }, delay + i * stagger);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}

/* Wrap each logical line in this */
export function AnimLine({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`anim-line block ${className}`}
      style={{
        overflow: "hidden",
        display: "block",
        /* Extra padding so descenders/ascenders and wide glyphs aren't clipped */
        paddingTop: "0.1em",
        marginTop: "-0.1em",
        paddingBottom: "0.18em",
        marginBottom: "-0.18em",
        paddingLeft: "0.08em",
        marginLeft: "-0.08em",
        paddingRight: "0.12em",
        marginRight: "-0.12em",
        ...style,
      }}
    >
      <span
        className="anim-line"
        style={{
          display: "block",
          transform: "translateY(110%)",
          opacity: 0,
          transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </span>
    </span>
  );
}

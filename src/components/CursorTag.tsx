"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVES = [
  "a",
  "button",
  '[role="button"]',
  "input[type=submit]",
  "input[type=button]",
  "label[for]",
  ".cursor-tag-target",
].join(", ");

export default function CursorTag() {
  const tagRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const lerpPos = useRef({ x: -200, y: -200 });
  const hovered = useRef(false);
  const rafId = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const tag = tagRef.current;
    if (!tag) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("[data-no-cursor-tag]")) return;
      if (target.closest(INTERACTIVES)) {
        hovered.current = true;
        tag.style.transform = "translate(-50%, -110%) scale(1)";
        tag.style.opacity = "1";
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(INTERACTIVES)) {
        const relatedTarget = e.relatedTarget as Element | null;
        if (!relatedTarget || !relatedTarget.closest(INTERACTIVES)) {
          hovered.current = false;
          tag.style.transform = "translate(-50%, -110%) scale(0)";
          tag.style.opacity = "0";
        }
      }
    };

    const onMouseLeave = () => {
      hovered.current = false;
      tag.style.transform = "translate(-50%, -110%) scale(0)";
      tag.style.opacity = "0";
      setVisible(false);
    };

    function tick() {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      lerpPos.current.x = lerp(lerpPos.current.x, pos.current.x, 0.12);
      lerpPos.current.y = lerp(lerpPos.current.y, pos.current.y, 0.12);

      if (tag) {
        tag.style.left = `${lerpPos.current.x}px`;
        tag.style.top = `${lerpPos.current.y}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={tagRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        zIndex: 9999,
        pointerEvents: "none",
        left: -200,
        top: -200,
        transform: "translate(-50%, -110%) scale(0)",
        opacity: 0,
        transformOrigin: "center bottom",
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
        willChange: "transform, left, top",
      }}
    >
      <span
        style={{
          display: "inline-block",
          background: "#D9B8FF",
          color: "#1a1a2e",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: '"dm-sans", sans-serif',
          letterSpacing: "-0.01em",
          padding: "5px 13px",
          borderRadius: 60,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        click
      </span>
    </div>
  );
}

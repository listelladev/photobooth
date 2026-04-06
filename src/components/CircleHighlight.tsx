"use client";

import { useRef, useLayoutEffect, useCallback } from "react";

/**
 * Renders italic text with an SVG scribble circle sized to the actual ink bounds
 * of the rendered glyphs — NOT the line box / line-height box.
 *
 * Uses canvas.measureText() actualBoundingBoxAscent/Descent so the circle
 * hugs the visible text regardless of font-size, line-height, or font metrics.
 */
interface CircleHighlightProps {
  text: string;
  pathD: string;
  circleRef: React.RefObject<SVGPathElement | null>;
  stroke?: string;
  strokeWidth?: number;
  /** Extra horizontal padding in em (fraction of font-size). Default 0.1 */
  padXRatio?: number;
  /** Extra vertical padding in em (fraction of font-size). Default 0.06 */
  padYRatio?: number;
}

export default function CircleHighlight({
  text,
  pathD,
  circleRef,
  stroke = "#FF6B35",
  strokeWidth = 3.5,
  padXRatio = 0.1,
  padYRatio = 0.06,
}: CircleHighlightProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    const svg = svgRef.current;
    if (!wrapper || !svg) return;

    const em = wrapper.firstElementChild as HTMLElement;
    if (!em) return;

    const style = getComputedStyle(em);
    const fontSize = parseFloat(style.fontSize);
    if (!fontSize || fontSize === 0) return;

    const rect = em.getBoundingClientRect();
    if (rect.width === 0) return; // not yet in view / hidden

    // ── Canvas measurement ───────────────────────────────────────────────────
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match the exact computed font (includes weight, style, family, size)
    ctx.font = style.font;
    const m = ctx.measureText(text);

    // fontBoundingBoxAscent: distance from BASELINE to top of em square (font-level, not glyph-level)
    // This gives us the baseline position within the element's line box.
    const fontAscent =
      m.fontBoundingBoxAscent !== undefined ? m.fontBoundingBoxAscent : fontSize * 0.8;

    // actualBoundingBoxAscent/Descent: distance from baseline to actual highest/lowest ink pixel.
    // These are the true visible glyph bounds we want to wrap.
    const glyphAscent =
      m.actualBoundingBoxAscent !== undefined ? m.actualBoundingBoxAscent : fontSize * 0.7;
    const glyphDescent =
      m.actualBoundingBoxDescent !== undefined ? m.actualBoundingBoxDescent : fontSize * 0.18;

    // ── Position calculation ─────────────────────────────────────────────────
    // The wrapper is display:inline-block; lineHeight:1; so wrapper height ≈ fontSize.
    // Baseline position from wrapper top = fontAscent (same as em square top offset).
    // Top of highest glyph ink from wrapper top = fontAscent - glyphAscent
    const inkTop = fontAscent - glyphAscent;
    const inkHeight = glyphAscent + glyphDescent;

    const padX = fontSize * padXRatio;
    const padY = fontSize * padYRatio;

    svg.style.position = "absolute";
    svg.style.left = `${-padX}px`;
    svg.style.top = `${inkTop - padY}px`;
    svg.style.width = `${rect.width + padX * 2}px`;
    svg.style.height = `${inkHeight + padY * 2}px`;
    svg.style.overflow = "visible";
    svg.style.pointerEvents = "none";
  }, [text, padXRatio, padYRatio]);

  useLayoutEffect(() => {
    // Run after fonts are loaded (critical: font metrics affect glyph bounds)
    document.fonts.ready.then(measure);

    // Re-measure on viewport/container resize
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <span
      ref={wrapperRef}
      style={{ position: "relative", display: "inline-block", lineHeight: 1 }}
    >
      <em style={{ fontStyle: "italic" }}>{text}</em>
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        style={{
          // Initial state before JS measurement runs — zero size, no flash
          position: "absolute",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <path
          ref={circleRef}
          d={pathD}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
        />
      </svg>
    </span>
  );
}

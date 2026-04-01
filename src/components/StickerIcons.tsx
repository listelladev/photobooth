/*
  Truus-style sticker icons:
  - Background shape is an offset silhouette of the icon (traces the content outline)
  - Thick hand-drawn line art on top
  - 2 colors per sticker: silhouette bg + line art
*/

export function CameraSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows camera shape */}
      <path
        d="M22 38c-2-4 0-10 4-14 2-2 6-6 12-8l6-4c4-2 10-2 14 0l6 4c6 2 10 6 12 8 4 4 6 10 4 14l1 6c1 6 0 14-4 20-4 4-10 8-18 10-4 1-8 1-12 0-8-2-14-6-18-10-4-6-5-14-4-20z"
        fill="#2d2d2d"
      />
      {/* Camera body */}
      <rect x="28" y="40" width="40" height="28" rx="5" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Viewfinder */}
      <path d="M39 40v-7c0-2 2-4 4-4h10c2 0 4 2 4 4v7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lens */}
      <circle cx="48" cy="54" r="8" stroke="#fff" strokeWidth="3" />
      <circle cx="48" cy="54" r="3" fill="#fff" />
      {/* Flash */}
      <circle cx="60" cy="46" r="2" fill="#fff" />
    </svg>
  );
}

export function SmileySticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Circle silhouette offset — slightly larger wobbly circle */}
      <circle cx="50" cy="50" r="44" fill="#7B8CFF" />
      {/* Inner face circle */}
      <circle cx="50" cy="50" r="36" stroke="#D4F4A0" strokeWidth="3" fill="none" />
      {/* Eyes */}
      <ellipse cx="39" cy="44" rx="4" ry="6.5" fill="#D4F4A0" />
      <ellipse cx="61" cy="44" rx="4" ry="6.5" fill="#D4F4A0" />
      {/* Smile */}
      <path d="M35 58c4 10 26 10 30 0" stroke="#D4F4A0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function StarCursorSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows star/cursor shape */}
      <path
        d="M38 78l-4-6 6-20-18-14c-4-3-2-6 1-6l20-1 10-20c2-4 5-4 7 0l8 20 20 1c4 0 5 3 2 6L72 52l4 20c1 4-2 6-5 4L56 66l-14 10c-3 2-6 0-4-4z"
        fill="#FFD6E8"
      />
      {/* Star cursor line art */}
      <path
        d="M44 70l4-16-14-10 16-1 8-18 6 18 16 1-12 10 2 16-12-8z"
        stroke="#5B6BF5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      {/* Sparkle */}
      <path d="M68 24l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#5B6BF5" />
      {/* Small circles */}
      <circle cx="28" cy="48" r="3.5" stroke="#5B6BF5" strokeWidth="2.5" />
      <circle cx="74" cy="62" r="2.5" stroke="#5B6BF5" strokeWidth="2.5" />
    </svg>
  );
}

export function ThumbsUpSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows thumb shape */}
      <path
        d="M26 80c-6-2-10-8-10-16v-14c0-4 2-8 5-10l12-16c2-3 6-6 10-6 4 0 6 2 6 6v8h12c6 0 12 2 14 8l2 6c2 6 2 14-1 20-2 6-6 10-12 12l-14 4c-8 2-16 0-24-2z"
        fill="#D4F4A0"
      />
      {/* Thumb line art */}
      <path
        d="M40 74v-24h-6c-3 0-5-2-5-5v-6c0-2 1-4 3-6l10-14c1-2 3-2 5-1v14h12c4 0 7 3 6 7l-4 18c-1 3-3 6-6 6H40"
        stroke="#7A2E50" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Sparkle */}
      <path d="M66 22l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#7A2E50" />
    </svg>
  );
}

export function GoodVibesSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 130 90" fill="none" className={className}>
      {/* Silhouette offset — follows the text block shape, like a rounded blob around the words */}
      <path
        d="M14 50c-4-10-4-22 4-32 6-8 16-12 28-12h36c12 0 22 4 28 12 8 10 8 22 4 32-4 10-14 20-28 24-8 2-20 4-30 2-14-2-26-10-34-18-4-4-6-6-8-8z"
        fill="#E8734A"
      />
      {/* Bubbly text */}
      <text
        x="65"
        y="40"
        textAnchor="middle"
        fontFamily="epilogue, sans-serif"
        fontWeight="900"
        fontSize="22"
        fontStyle="italic"
        fill="#FFD6D6"
      >
        Good
      </text>
      <text
        x="65"
        y="64"
        textAnchor="middle"
        fontFamily="epilogue, sans-serif"
        fontWeight="900"
        fontSize="22"
        fontStyle="italic"
        fill="#FFD6D6"
      >
        Vibes
      </text>
    </svg>
  );
}

export function HeartSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows heart shape */}
      <path
        d="M50 84S10 60 10 34C10 18 22 8 36 8c8 0 14 4 14 4s6-4 14-4c14 0 26 10 26 26 0 26-40 50-40 50z"
        fill="#fff"
      />
      {/* Heart fill */}
      <path
        d="M50 76S18 56 18 36c0-12 8-20 18-20 6 0 10 3 14 6 4-3 8-6 14-6 10 0 18 8 18 20 0 20-32 40-32 40z"
        fill="#7A2E50"
      />
      {/* Sparkles */}
      <path d="M30 30l2 3 3 2-3 2-2 3-2-3-3-2 3-2z" fill="#fff" />
      <path d="M72 60l2 3 3 2-3 2-2 3-2-3-3-2 3-2z" fill="#fff" />
    </svg>
  );
}

export function FistBumpSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows fist shape */}
      <path
        d="M24 64c-4-6-6-14-4-22 2-8 6-14 14-18 4-2 8-4 14-4 4 0 8 2 10 4 2-2 4-4 8-4 6 0 10 4 10 8 2-2 4-2 6-2 6 0 10 4 10 10v16c0 12-8 22-20 26-6 2-12 2-18 0-10-2-20-8-26-14h-4z"
        fill="#5B6BF5"
      />
      {/* Fist line art */}
      <path
        d="M38 60c0-4 2-7 6-7h3c2 0 3-1 4-3v-6c0-3 2-5 5-5s5 2 5 5v-4c0-3 2-5 5-5s5 2 5 5v-2c0-3 2-5 5-5s5 2 5 5v18c0 10-6 16-14 16h-6c-8 0-14-6-14-14z"
        stroke="#FFD6E8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Impact lines */}
      <path d="M28 50l-8-4" stroke="#FFD6E8" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 60l-8 0" stroke="#FFD6E8" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 70l-8 4" stroke="#FFD6E8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function MirrorSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows mirror oval + stand shape */}
      <path
        d="M50 6c-20 0-32 14-32 34s10 28 22 30v6c-8 1-16 4-16 8 0 6 12 8 26 8s26-2 26-8c0-4-8-7-16-8v-6c12-2 22-10 22-30S70 6 50 6z"
        fill="#E8D6FF"
      />
      {/* Mirror oval */}
      <ellipse cx="50" cy="42" rx="18" ry="26" stroke="#5B6BF5" strokeWidth="3.5" fill="none" />
      {/* Stand */}
      <line x1="50" y1="68" x2="50" y2="78" stroke="#5B6BF5" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M38 78c0 0 5-2 12-2s12 2 12 2" stroke="#5B6BF5" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Shine arc */}
      <path d="M40 32c2-6 6-8 12-8" stroke="#5B6BF5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Sparkle */}
      <path d="M72 24l2 3 3 2-3 2-2 3-2-3-3-2 3-2z" fill="#5B6BF5" />
    </svg>
  );
}

export function Video360Sticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — round to match 360/orbit shape */}
      <circle cx="50" cy="50" r="42" fill="#D4F4A0" />
      {/* 360 text */}
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontFamily="epilogue, sans-serif"
        fontWeight="900"
        fontSize="26"
        fill="#2d2d2d"
      >
        360°
      </text>
      {/* Orbit ring — follows text contour */}
      <ellipse cx="50" cy="56" rx="30" ry="10" stroke="#2d2d2d" strokeWidth="2.5" strokeDasharray="5 4" fill="none" />
      {/* Sparkle */}
      <path d="M76 26l2 3 3 2-3 2-2 3-2-3-3-2 3-2z" fill="#2d2d2d" />
    </svg>
  );
}

export function PrintSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows photo rectangle shape */}
      <path
        d="M20 22c-2 0-6 2-6 8v40c0 6 4 10 10 10h48c6 0 10-4 10-10V30c0-6-4-8-6-8l-8-6c-2-2-6-2-8 0l-4 4h-16l-4-4c-2-2-6-2-8 0z"
        fill="#FFD6E8"
      />
      {/* Photo frame */}
      <rect x="26" y="28" width="44" height="44" rx="3" stroke="#7A2E50" strokeWidth="3.5" strokeLinecap="round" />
      {/* Mountain scene */}
      <path d="M26 60l12-12 10 8 12-16 14 20" stroke="#7A2E50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sun */}
      <circle cx="58" cy="40" r="5" stroke="#7A2E50" strokeWidth="2.5" />
    </svg>
  );
}

export function ShareSticker({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Silhouette offset — follows the arrow/send shape */}
      <path
        d="M22 44c-2-10 2-22 12-30 8-6 18-8 26-4l24 14c8 5 12 14 10 24s-10 18-20 22l-14 4c-10 2-20-1-28-8-6-6-8-12-10-22z"
        fill="#7B8CFF"
      />
      {/* Upload/share arrow */}
      <path d="M48 68V44" stroke="#D4F4A0" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M38 54l10-12 10 12" stroke="#D4F4A0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Base arc */}
      <path d="M34 62c0 8 6 14 14 14s14-6 14-14" stroke="#D4F4A0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export { StarCursorSticker as StarSticker };

"use client";

export default function VayiraCrest({ size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="VAYIRA Royal Crest"
    >
      <defs>
        <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B49A61" />
          <stop offset="35%" stopColor="#EAD8B0" />
          <stop offset="70%" stopColor="#CBB27A" />
          <stop offset="100%" stopColor="#7F6430" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Royal Arch / Shield Frame */}
      <path
        d="M50 5 C28 5 12 22 12 46 C12 70 34 88 50 95 C66 88 88 70 88 46 C88 22 72 5 50 5 Z"
        stroke="url(#crestGold)"
        strokeWidth="1.6"
        fill="none"
        strokeDasharray="1 0"
      />

      {/* Inner Architectural Trefoil Arch */}
      <path
        d="M50 14 C36 14 20 28 20 48 C20 66 36 80 50 86 C64 80 80 66 80 48 C80 28 64 14 50 14 Z"
        stroke="url(#crestGold)"
        strokeWidth="0.8"
        strokeOpacity="0.6"
        fill="none"
      />

      {/* Royal Crown / Kalash Finial Top */}
      <circle cx="50" cy="10" r="2.2" fill="url(#crestGold)" />
      <path
        d="M44 19 C48 14 52 14 56 19 C54 22 46 22 44 19 Z"
        fill="url(#crestGold)"
      />

      {/* Stylized Indian Peacock (Mayil) Crest Center */}
      {/* Left Peacock Wing / Arch */}
      <path
        d="M50 32 C41 32 32 40 32 50 C32 60 41 68 50 74"
        stroke="url(#crestGold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Right Peacock Wing / Arch */}
      <path
        d="M50 32 C59 32 68 40 68 50 C68 60 59 68 50 74"
        stroke="url(#crestGold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Central Regal Lotus Blossom & Spire */}
      <path
        d="M50 38 L50 64"
        stroke="url(#crestGold)"
        strokeWidth="1.4"
      />
      <circle cx="50" cy="48" r="4.5" stroke="url(#crestGold)" strokeWidth="1" />
      <circle cx="50" cy="48" r="1.8" fill="url(#crestGold)" />

      {/* Delicate Symmetrical Feather Plumage Dots */}
      <circle cx="42" cy="42" r="1.2" fill="url(#crestGold)" />
      <circle cx="58" cy="42" r="1.2" fill="url(#crestGold)" />
      <circle cx="37" cy="52" r="1.2" fill="url(#crestGold)" />
      <circle cx="63" cy="52" r="1.2" fill="url(#crestGold)" />
      <circle cx="43" cy="62" r="1.2" fill="url(#crestGold)" />
      <circle cx="57" cy="62" r="1.2" fill="url(#crestGold)" />

      {/* VAYIRA 'V' Monogram Emblem Bottom */}
      <path
        d="M42 76 L50 86 L58 76"
        stroke="url(#crestGold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

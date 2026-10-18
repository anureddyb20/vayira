"use client";

import { useMemo } from "react";
import VayiraCrest from "@/components/ui/VayiraCrest";

export default function SareeCanvas({ config }) {
  // Extract configuration parameters
  const bodyColorHex = config.bodyColor?.hex || "#35131D";
  const zariColor = config.zariType?.color || "#B49A61";
  const zariHighlight = config.zariType?.highlight || "#EAD8B0";
  const motifType = config.bodyMotif?.id || "plain";
  const borderMotif = config.borderStyle?.motif || "gopuram";
  const borderWidthMultiplier = config.borderWidth?.multiplier || 1.0;
  const palluId = config.palluStyle?.id || "grand-jaal";
  const blouseColorHex = config.blouseStyle?.id === "contrast-pallu" ? "#4A1827" : bodyColorHex;

  // Base border height in SVG units
  const baseBorderHeight = Math.round(55 * borderWidthMultiplier);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      minHeight: "560px",
      display: "flex",
      flexDirection: "column",
      borderRadius: "4px",
      overflow: "hidden",
      border: "1px solid rgba(180, 154, 97, 0.4)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.85)",
      background: "#140409",
      position: "relative"
    }}>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Zari Linear Gradient */}
          <linearGradient id="zariMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={zariColor} />
            <stop offset="50%" stopColor={zariHighlight} />
            <stop offset="100%" stopColor={zariColor} />
          </linearGradient>

          {/* Silk Sheen Lighting Overlay */}
          <radialGradient id="silkSheen" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
          </radialGradient>

          {/* Saree Draping Folds Filter */}
          <filter id="drapeShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
          </filter>

          {/* Reusable Mango / Paisley Motif Pattern */}
          <pattern id="patternMango" width="70" height="70" patternUnits="userSpaceOnUse">
            <path
              d="M35 15 C45 20 48 35 40 45 C32 55 20 50 22 38 C24 28 30 22 35 15 Z"
              fill="none"
              stroke="url(#zariMetallic)"
              strokeWidth="1.2"
            />
            <circle cx="35" cy="35" r="2.5" fill="url(#zariMetallic)" />
          </pattern>

          {/* Reusable Rudraksh Motif Pattern */}
          <pattern id="patternRudraksh" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="5" stroke="url(#zariMetallic)" strokeWidth="1.4" fill="none" />
            <circle cx="30" cy="30" r="1.8" fill="url(#zariMetallic)" />
            <path d="M25 30 L35 30 M30 25 L30 35" stroke="url(#zariMetallic)" strokeWidth="0.8" />
          </pattern>

          {/* Reusable Gold Coin (Kasu) Pattern */}
          <pattern id="patternCoin" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="5.5" fill="none" stroke="url(#zariMetallic)" strokeWidth="1.2" />
            <circle cx="25" cy="25" r="3.2" fill="url(#zariMetallic)" opacity="0.6" />
          </pattern>

          {/* Reusable Floral Jaal Pattern */}
          <pattern id="patternJaal" width="90" height="90" patternUnits="userSpaceOnUse">
            <path
              d="M0 45 Q45 0 90 45 Q45 90 0 45 Z"
              fill="none"
              stroke="url(#zariMetallic)"
              strokeWidth="0.9"
            />
            <circle cx="45" cy="45" r="4" fill="url(#zariMetallic)" />
          </pattern>
        </defs>

        {/* ============================================================ */}
        {/* 1. SAREE PALLU (Top 180 units) */}
        {/* ============================================================ */}
        <g id="saree-pallu">
          {/* Pallu Base (Rich Wine/Contrasting or Coordinated) */}
          <rect x="0" y="0" width="800" height="175" fill={bodyColorHex} />
          
          {/* Pallu Zari Brocade Background Texture */}
          <rect
            x="0"
            y="0"
            width="800"
            height="175"
            fill="url(#zariMetallic)"
            opacity={palluId === "grand-jaal" ? "0.22" : "0.15"}
          />

          {/* Pallu Decorative Zari Bands */}
          <line x1="0" y1="20" x2="800" y2="20" stroke="url(#zariMetallic)" strokeWidth="3" />
          <line x1="0" y1="30" x2="800" y2="30" stroke="url(#zariMetallic)" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="0" y1="155" x2="800" y2="155" stroke="url(#zariMetallic)" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="0" y1="165" x2="800" y2="165" stroke="url(#zariMetallic)" strokeWidth="3" />

          {/* Central Pallu Narrative Art */}
          {palluId === "grand-jaal" && (
            <g transform="translate(180, 42)">
              {/* Grand Floral Jaal & Peacock Crests */}
              <rect x="0" y="0" width="440" height="95" fill="url(#patternJaal)" />
              <path
                d="M220 15 C180 15 150 45 150 75 L290 75 C290 45 260 15 220 15 Z"
                fill="none"
                stroke="url(#zariMetallic)"
                strokeWidth="2"
              />
              <circle cx="220" cy="45" r="14" stroke="url(#zariMetallic)" strokeWidth="1.5" fill="none" />
              <circle cx="220" cy="45" r="6" fill="url(#zariMetallic)" />
            </g>
          )}

          {palluId === "peacock-procession" && (
            <g transform="translate(120, 45)">
              {/* Stylized Royal Peacocks facing center */}
              <path
                d="M100 65 C80 30 110 15 140 35 C170 55 190 75 160 80 Z"
                fill="none"
                stroke="url(#zariMetallic)"
                strokeWidth="2.2"
              />
              <circle cx="115" cy="30" r="4" fill="url(#zariMetallic)" />
              <path
                d="M460 65 C480 30 450 15 420 35 C390 55 370 75 400 80 Z"
                fill="none"
                stroke="url(#zariMetallic)"
                strokeWidth="2.2"
              />
              <circle cx="445" cy="30" r="4" fill="url(#zariMetallic)" />
              {/* Center Temple Spire */}
              <polygon points="280,15 295,45 265,45" fill="url(#zariMetallic)" />
              <rect x="272" y="45" width="16" height="30" stroke="url(#zariMetallic)" strokeWidth="1.5" fill="none" />
            </g>
          )}

          {palluId === "architectural-bands" && (
            <g>
              <line x1="0" y1="60" x2="800" y2="60" stroke="url(#zariMetallic)" strokeWidth="4" />
              <line x1="0" y1="80" x2="800" y2="80" stroke="url(#zariMetallic)" strokeWidth="12" />
              <line x1="0" y1="105" x2="800" y2="105" stroke="url(#zariMetallic)" strokeWidth="2" />
              <line x1="0" y1="125" x2="800" y2="125" stroke="url(#zariMetallic)" strokeWidth="6" />
            </g>
          )}

          {/* Tassels at Pallu Hem (Top edge) */}
          {Array.from({ length: 16 }).map((_, i) => (
            <circle
              key={i}
              cx={25 + i * 50}
              cy="6"
              r="3.5"
              fill="url(#zariMetallic)"
            />
          ))}
        </g>

        {/* ============================================================ */}
        {/* 2. TOP BORDER (Narrower upper border) */}
        {/* ============================================================ */}
        <g id="top-border">
          <rect
            x="0"
            y="175"
            width="800"
            height={Math.round(baseBorderHeight * 0.6)}
            fill="url(#zariMetallic)"
            opacity="0.88"
          />
          <line
            x1="0"
            y1={175 + Math.round(baseBorderHeight * 0.6)}
            x2="800"
            y2={175 + Math.round(baseBorderHeight * 0.6)}
            stroke="#160308"
            strokeWidth="1.5"
          />
        </g>

        {/* ============================================================ */}
        {/* 3. SAREE BODY (With selected fabric color & butta pattern) */}
        {/* ============================================================ */}
        <g id="saree-body">
          {/* Foundation Silk Base */}
          <rect
            x="0"
            y={175 + Math.round(baseBorderHeight * 0.6)}
            width="800"
            height={600 - (175 + Math.round(baseBorderHeight * 0.6) + baseBorderHeight)}
            fill={bodyColorHex}
          />

          {/* Motif Scatter Overlay */}
          {motifType === "mango" && (
            <rect
              x="0"
              y={175 + Math.round(baseBorderHeight * 0.6)}
              width="800"
              height={600 - (175 + Math.round(baseBorderHeight * 0.6) + baseBorderHeight)}
              fill="url(#patternMango)"
            />
          )}

          {motifType === "rudraksh" && (
            <rect
              x="0"
              y={175 + Math.round(baseBorderHeight * 0.6)}
              width="800"
              height={600 - (175 + Math.round(baseBorderHeight * 0.6) + baseBorderHeight)}
              fill="url(#patternRudraksh)"
            />
          )}

          {motifType === "coin" && (
            <rect
              x="0"
              y={175 + Math.round(baseBorderHeight * 0.6)}
              width="800"
              height={600 - (175 + Math.round(baseBorderHeight * 0.6) + baseBorderHeight)}
              fill="url(#patternCoin)"
            />
          )}

          {motifType === "floral-jaal" && (
            <rect
              x="0"
              y={175 + Math.round(baseBorderHeight * 0.6)}
              width="800"
              height={600 - (175 + Math.round(baseBorderHeight * 0.6) + baseBorderHeight)}
              fill="url(#patternJaal)"
            />
          )}

          {/* Silk Sheen Radial Glow */}
          <rect
            x="0"
            y={175 + Math.round(baseBorderHeight * 0.6)}
            width="800"
            height={600 - (175 + Math.round(baseBorderHeight * 0.6) + baseBorderHeight)}
            fill="url(#silkSheen)"
          />

          {/* Draping Pleats Curves */}
          <path
            d="M0 240 Q400 270 800 240 M0 330 Q400 360 800 330 M0 420 Q400 450 800 420"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.22"
            strokeWidth="3"
          />
        </g>

        {/* ============================================================ */}
        {/* 4. MAIN BOTTOM BORDER (Custom motif & width) */}
        {/* ============================================================ */}
        <g id="bottom-border" transform={`translate(0, ${600 - baseBorderHeight})`}>
          {/* Border Metallic Base */}
          <rect
            x="0"
            y="0"
            width="800"
            height={baseBorderHeight}
            fill="url(#zariMetallic)"
          />

          {/* Interlocking Korvai Motif Rows */}
          {borderMotif === "gopuram" && (
            <g>
              {/* Gopuram / Sacred Temple Spire Pyramids */}
              {Array.from({ length: 20 }).map((_, i) => (
                <polygon
                  key={i}
                  points={`${i * 40},0 ${i * 40 + 20},-${Math.min(baseBorderHeight * 0.45, 25)} ${i * 40 + 40},0`}
                  fill="url(#zariMetallic)"
                />
              ))}
              <line x1="0" y1="12" x2="800" y2="12" stroke="#160308" strokeWidth="1.5" />
              <line x1="0" y1={baseBorderHeight - 12} x2="800" y2={baseBorderHeight - 12} stroke="#160308" strokeWidth="1.5" />
            </g>
          )}

          {borderMotif === "peacock" && (
            <g>
              {Array.from({ length: 16 }).map((_, i) => (
                <circle
                  key={i}
                  cx={25 + i * 50}
                  cy={baseBorderHeight / 2}
                  r={Math.min(baseBorderHeight * 0.28, 14)}
                  stroke="#160308"
                  strokeWidth="1.4"
                  fill="none"
                />
              ))}
            </g>
          )}

          {borderMotif === "creeper" && (
            <path
              d={`M0 ${baseBorderHeight / 2} Q100 10 200 ${baseBorderHeight / 2} T400 ${baseBorderHeight / 2} T600 ${baseBorderHeight / 2} T800 ${baseBorderHeight / 2}`}
              fill="none"
              stroke="#160308"
              strokeWidth="2.5"
            />
          )}

          {borderMotif === "ribbon" && (
            <g>
              <line x1="0" y1={baseBorderHeight * 0.3} x2="800" y2={baseBorderHeight * 0.3} stroke="#160308" strokeWidth="2" />
              <line x1="0" y1={baseBorderHeight * 0.7} x2="800" y2={baseBorderHeight * 0.7} stroke="#160308" strokeWidth="2" />
            </g>
          )}
        </g>
      </svg>

      {/* Live Specifications Overlay Tag */}
      <div style={{
        position: "absolute",
        bottom: "1rem",
        left: "1rem",
        right: "1rem",
        background: "rgba(22, 5, 11, 0.9)",
        backdropFilter: "blur(12px)",
        padding: "10px 16px",
        borderRadius: "2px",
        borderLeft: "2px solid var(--color-gold)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: bodyColorHex, border: "1px solid var(--color-gold)" }} />
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.85rem", color: "var(--color-ivory)" }}>
            {config.bodyColor?.name} • {config.bodyFabric?.name?.split(" ")[0]}
          </span>
        </div>

        <span style={{ fontSize: "0.72rem", color: "var(--color-gold-light)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          ✦ Atelier Live Vector Drape
        </span>
      </div>
    </div>
  );
}

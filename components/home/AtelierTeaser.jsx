"use client";

import { useState } from "react";
import Link from "next/link";
import { Palette, ArrowRight, Sparkles } from "lucide-react";
import VayiraCrest from "@/components/ui/VayiraCrest";
import styles from "./AtelierTeaser.module.css";

const teaserSwatches = [
  { name: "Royal Burgundy", hex: "#35131D" },
  { name: "Deep Wine", hex: "#4A1827" },
  { name: "Heritage Emerald", hex: "#173D32" },
  { name: "Midnight Navy", hex: "#121C2B" },
  { name: "Auspicious Vermilion", hex: "#8A1E29" },
  { name: "Mustard Gold", hex: "#B88E3E" },
];

export default function AtelierTeaser() {
  const [activeColor, setActiveColor] = useState(teaserSwatches[0]);

  return (
    <section className={styles.section} aria-label="Design Your Saree Atelier Studio">
      <div className="container">
        <div className={styles.grid}>
          {/* Left: Interactive Canvas Demonstration */}
          <div className={styles.interactiveStage}>
            <div className={styles.canvasPreview}>
              {/* Pallu Top Band */}
              <div className={styles.palluBand}>
                <VayiraCrest size={54} className={styles.palluMotifIcon} />
                <span style={{ 
                  position: "absolute", 
                  bottom: 8, 
                  fontSize: "0.68rem", 
                  letterSpacing: "0.22em", 
                  textTransform: "uppercase", 
                  color: "#B49A61" 
                }}>
                  Grand Zari Pallu
                </span>
              </div>

              {/* Body Fabric with Live Selected Color & Butta Pattern */}
              <div className={styles.bodyArea} style={{ backgroundColor: activeColor.hex }}>
                <div className={styles.buttaPattern} />
                <div style={{
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                  padding: "1rem",
                  background: "rgba(22, 5, 11, 0.7)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "2px",
                  border: "1px solid rgba(180, 154, 97, 0.4)"
                }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)" }}>
                    Selected Shade
                  </span>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-ivory)", marginTop: 2 }}>
                    {activeColor.name}
                  </p>
                </div>
              </div>

              {/* Bottom Border */}
              <div className={styles.borderBand}>
                <span>✦ Temple Gopuram ✦</span>
                <span>✦ Antique Zari ✦</span>
                <span>✦ 4.5 Inches ✦</span>
              </div>
            </div>

            {/* Quick Interactive Color Swatch Bar */}
            <div className={styles.swatchBar}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-stone)" }}>
                Try Color:
              </span>
              {teaserSwatches.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  title={swatch.name}
                  className={`${styles.swatchBtn} ${activeColor.name === swatch.name ? styles.active : ""}`}
                  style={{ backgroundColor: swatch.hex }}
                  onClick={() => setActiveColor(swatch)}
                  aria-label={`Select ${swatch.name}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className={styles.storyCol}>
            <span className="editorial-label">
              <Palette size={14} className="text-gold" />
              <span>Bespoke Customization</span>
            </span>

            <h2 className={styles.heading}>
              Your Vision. Your Colours. Your Saree.
            </h2>

            <p className={styles.subheading}>
              “From the body colour to the zari border, begin with an idea and make it your own.”
            </p>

            <p className={styles.desc}>
              Step into the virtual VAYIRA Saree Atelier. Choose your foundation silk, curate bespoke color pairings, select ancient motifs from our pattern archives, and determine border widths down to the inch. Our master weavers then bring your bespoke vision to life on traditional wooden pit looms.
            </p>

            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/atelier" className="btn-primary">
                <Palette size={16} />
                <span>Launch Design Studio</span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/atelier" className="btn-outline">
                <span>View Customizer Options</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

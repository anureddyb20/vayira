"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./CraftsmanshipSection.module.css";

export default function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className={styles.section} aria-label="Loom and Silk Craftsmanship">
      <div className="container">
        {/* Header */}
        <div className={styles.headerBlock}>
          <span className="editorial-label">Master Weaver Atelier</span>
          <h2 className={styles.heading}>The Sanctity of Handloom</h2>
          <p className={styles.subtitle}>
            “Before a saree reaches the body, it lives inside the mind and hands of master artisans who have preserved these sacred techniques for half a century.”
          </p>
        </div>

        {/* Feature Row with Master Weaver Loom Photo */}
        <div className={styles.craftFeatureRow}>
          <div className={styles.loomImageCard}>
            <Image
              src="/images/craftsmanship-loom.jpg"
              alt="Indian Master Weaver operating traditional pit loom with crimson silk and pure gold zari"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={styles.loomImg}
            />
          </div>

          {/* Handloom Pillars */}
          <div className={styles.stepGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>Stage 01 — Three-Ply Filament Mulberry</span>
              <h3 className={styles.stepTitle}>The Foundation Warp & Weft</h3>
              <p className={styles.stepDesc}>
                We select the finest grade 3-ply Mulberry silk, degummed and dyed with rich mineral and botanical mordants to achieve deep aristocratic wine, emerald, and burgundy hues that never bleed or fade.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>Stage 02 — Ancient Korvai Weaving</span>
              <h3 className={styles.stepTitle}>Interlocking Temple Borders</h3>
              <p className={styles.stepDesc}>
                The Korvai technique requires two weavers at the same loom, manually interlocking separate shuttles for the border and body. The joint is so seamless that both sides are completely structural without adhesive or stitching.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>Stage 03 — Bullion & Gilt Zari</span>
              <h3 className={styles.stepTitle}>Tested 0.6% Silver-Gold Metallurgy</h3>
              <p className={styles.stepDesc}>
                Unlike modern electroplated synthetic threads, our zari is spun from pure silver ribbon electro-gilded with 24K gold, imparting that unmistakable antique golden warmth that matures with grace over generations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

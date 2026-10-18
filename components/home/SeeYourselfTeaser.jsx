"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import styles from "./SeeYourselfTeaser.module.css";

export default function SeeYourselfTeaser() {
  const [viewState, setViewState] = useState("draped"); // 'original' | 'draped'

  return (
    <section className={styles.section} aria-label="See Yourself in Silk AI Virtual Try-On">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Editorial Copy */}
          <div className={styles.storyCol}>
            <span className="editorial-label">
              <Sparkles size={14} className="text-gold" />
              <span>Signature Innovation</span>
            </span>

            <h2 className={styles.heading}>
              A Saree, Reimagined on You.
            </h2>

            <p className={styles.subheading}>
              “Discover how a VAYIRA creation might look on you before making it yours.”
            </p>

            <p className={styles.desc}>
              Experience our private AI Virtual Try-On consultation. Upload a photograph to visualize the rich fall, zari lustre, and pallu drape of any heirloom saree from our atelier with respectful precision.
            </p>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureBullet} />
                <span>Upload your portrait in a dignified, privacy-guaranteed studio</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureBullet} />
                <span>Neural draping of pure Kanjeevaram & Banarasi silk weaves</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureBullet} />
                <span>Realistic metallic reflection of pure antique gold zari</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/try-on" className="btn-primary">
                <Sparkles size={16} />
                <span>Enter Try-On Studio</span>
                <ArrowRight size={16} />
              </Link>

              <span style={{ fontSize: "0.78rem", color: "var(--color-stone)", fontStyle: "italic" }}>
                *Photographic simulation. Private & temporary preview.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Demonstration Comparison */}
          <div className={styles.previewStage}>
            <div className={styles.comparisonBox}>
              {/* Toggle Switch */}
              <div className={styles.toggleBar}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${viewState === "original" ? styles.active : ""}`}
                  onClick={() => setViewState("original")}
                >
                  Portrait
                </button>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${viewState === "draped" ? styles.active : ""}`}
                  onClick={() => setViewState("draped")}
                >
                  In VAYIRA Silk
                </button>
              </div>

              {/* Image Preview */}
              <Image
                src={viewState === "draped" ? "/images/tryon-result.jpg" : "/images/tryon-user.jpg"}
                alt={viewState === "draped" ? "VAYIRA Virtual Try-On Result" : "Customer Upload Portrait"}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                style={{ objectFit: "cover", transition: "opacity 0.4s ease" }}
              />

              {/* Badge Overlay */}
              <div className={styles.badgeOverlay}>
                <span>
                  {viewState === "draped" ? "Padma Mayil Royal Burgundy" : "Client Reference Image"}
                </span>
                <ShieldCheck size={16} className="text-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

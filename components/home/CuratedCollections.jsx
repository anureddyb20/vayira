"use client";

import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./CuratedCollections.module.css";

export default function CuratedCollections() {
  return (
    <section id="collections" className={styles.section} aria-label="Curated Silk Collections">
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <span className="editorial-label">Order Step 03 • The Royal Silk Collections</span>
            <h2 className={styles.heading}>The Curated Collections</h2>
            <p style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "1.2rem",
              color: "var(--color-champagne)",
              marginTop: "4px"
            }}>
              Explore 8 distinct royal textile legacies, handwoven across India's master loom regions.
            </p>
          </div>
          <Link href="/collections" className="btn-outline">
            <span>Explore All 8 Archives</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Dynamic 8-Collection Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "2rem"
        }}>
          {collections.map((col) => (
            <div key={col.id} style={{ height: "460px", position: "relative" }}>
              <Link href={`/collections/${col.slug}`} className={styles.collectionCard}>
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.gradientScrim} />
                <div className={styles.cardContent}>
                  <span className={styles.regionTag}>{col.region}</span>
                  <h3 className={styles.cardTitle}>{col.name}</h3>
                  <p className={styles.cardSubtitle}>{col.subtitle}</p>
                  <div className={styles.cardAction}>
                    <span>Discover ({col.featuredCount})</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

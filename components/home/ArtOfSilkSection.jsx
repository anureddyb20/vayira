"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Feather } from "lucide-react";
import styles from "./ArtOfSilkSection.module.css";

export default function ArtOfSilkSection() {
  return (
    <section id="philosophy" className={styles.section} aria-label="The Art of Silk">
      <div className="container">
        <div className={styles.grid}>
          {/* Visual Column: Fabric Detail & Macro Weave */}
          <div className={styles.visualCol}>
            <div className={styles.imageCard}>
              <Image
                src="/images/atelier-silk.jpg"
                alt="Close-up of Royal Burgundy Mulberry Silk and Antique Gold Zari Weave"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.fabricImg}
              />
              <div className={styles.cardCornerTag}>
                <span>Archival Mulberry Silk</span>
                <strong>Korvai Weft Technique</strong>
              </div>
            </div>
          </div>

          {/* Editorial Story Column */}
          <div className={styles.storyCol}>
            <span className="editorial-label">Philosophy of the House</span>
            
            <h2 className={styles.heading}>
              A Legacy Woven in Every Thread
            </h2>

            <p className={styles.leadText}>
              In India, a saree is never merely six yards of fabric. It is an enduring emotional sanctuary, an intimate heirloom handed down from mother to daughter across generations.
            </p>

            <p className={styles.bodyText}>
              At VAYIRA, we honor this revered lineage. We work exclusively with certified master weavers across the historic loom belts of Kanchipuram, Varanasi, and Mysore. Each creation is born from pure three-ply mulberry silk and tested silver-gilt zari, spun patiently on traditional wooden pit looms over weeks of unhurried human dedication.
            </p>

            <div className={styles.pillarGrid}>
              <div className={styles.pillarItem}>
                <Feather size={20} className="text-gold" />
                <div>
                  <h4 className={styles.pillarTitle}>Pure Filament Silk</h4>
                  <p className={styles.pillarDesc}>Natural mulberry cocoons spun into resilient, lustrous three-ply yarns.</p>
                </div>
              </div>

              <div className={styles.pillarItem}>
                <Compass size={20} className="text-gold" />
                <div>
                  <h4 className={styles.pillarTitle}>Tested Zari Provenance</h4>
                  <p className={styles.pillarDesc}>Silver threads gilded in pure gold, burnished for an authentic antique patina.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2.5rem" }}>
              <Link href="/collections" className="btn-outline">
                <span>Explore the Heritage Archive</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

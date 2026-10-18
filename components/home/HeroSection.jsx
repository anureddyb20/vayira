"use client";

import Image from "next/image";
import Link from "next/link";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="VAYIRA Royal Silk House Hero">
      {/* Editorial Saree Background Visual */}
      <div className={styles.heroBackground}>
        <Image
          src="/images/hero-saree.jpg"
          alt="Regal Indian Silk Saree in Heritage Royal Palace"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroVignette} />
      </div>

      {/* Main Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.brandSuper}>
          <VayiraCrest size={48} className={styles.crestIcon} />
        </div>

        <h1 className={styles.heroTitle}>VAYIRA</h1>
        <p className={styles.heroSubtitle}>A Royal Indian Silk House</p>

        <p className={styles.heroQuote}>
          “Some traditions are not worn. They are inherited.”
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/collections" className="btn-primary">
            <span>Discover the Collection</span>
            <ArrowRight size={16} />
          </Link>

          <Link href="/atelier" className="btn-outline">
            <Sparkles size={16} className="text-gold" />
            <span>Create Your Saree</span>
          </Link>
        </div>
      </div>

      {/* Ambient Scroll Cue */}
      <div className={styles.scrollIndicator}>
        <span>The Silk Journey</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

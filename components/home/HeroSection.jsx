"use client";

import Image from "next/image";
import Link from "next/link";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { ArrowRight, Sparkles, KeyRound } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const scrollToDemo = () => {
    const el = document.getElementById("patron-access");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero} aria-label="VAYIRA Royal Silk House Introduction and Hero">
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

      {/* Main Hero Introduction Content */}
      <div className={styles.heroContent}>
        <div className={styles.brandSuper}>
          <VayiraCrest size={48} className={styles.crestIcon} />
        </div>

        <h1 className={styles.heroTitle}>VAYIRA</h1>
        <p className={styles.heroSubtitle}>A Royal Indian Silk House</p>

        {/* Clear Brand Introduction */}
        <p className={styles.heroQuote}>
          “Some traditions are not worn. They are inherited.”
        </p>

        <p style={{
          fontFamily: "var(--font-editorial)",
          fontStyle: "italic",
          fontSize: "1.2rem",
          color: "var(--color-champagne)",
          maxWidth: "680px",
          lineHeight: 1.6,
          marginBottom: "2.5rem",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)"
        }}>
          Where India's timeless silk traditions meet personal expression. Handwoven by certified master artisans across the royal loom belts of Kanchipuram, Varanasi, Paithan, and Mysore.
        </p>

        <div className={styles.ctaGroup}>
          <button
            type="button"
            onClick={scrollToDemo}
            className="btn-primary"
          >
            <KeyRound size={16} />
            <span>Sign In with Demo</span>
            <ArrowRight size={16} />
          </button>

          <Link href="/collections" className="btn-outline">
            <span>Explore Collections</span>
          </Link>

          <Link href="/atelier" className="btn-outline">
            <Sparkles size={16} className="text-gold" />
            <span>Saree Atelier</span>
          </Link>
        </div>
      </div>

      {/* Ambient Scroll Cue */}
      <div className={styles.scrollIndicator}>
        <span>Scroll to Explore</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

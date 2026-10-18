"use client";

import { useState } from "react";
import Link from "next/link";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { ArrowRight, ShieldCheck, Sparkles, Award } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Brand Statement Banner */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="editorial-label">A Royal Indian Silk House</span>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)", 
            letterSpacing: "0.18em", 
            marginTop: "1rem", 
            marginBottom: "0.5rem",
            color: "var(--color-gold)"
          }}>
            VAYIRA
          </h2>
          <p style={{ 
            fontFamily: "var(--font-editorial)", 
            fontStyle: "italic", 
            fontSize: "1.25rem", 
            color: "var(--color-champagne)" 
          }}>
            “Woven in heritage. Designed for you.”
          </p>
        </div>

        {/* Footer Navigation Columns */}
        <div className={styles.footerGrid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.brandHeader}>
              <VayiraCrest size={36} />
              <div>
                <span className={styles.brandTitle}>VAYIRA</span>
                <p className={styles.brandSubtitle}>A Royal Indian Silk House</p>
              </div>
            </div>
            <p className={styles.brandBio}>
              “Where India's timeless silk traditions meet personal expression. Handwoven by master artisans on traditional pit looms.”
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className={styles.colTitle}>Curated Collections</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/collections/kanjeevaram" className={styles.footerLink}>
                  The Kanjeevaram Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/banarasi" className={styles.footerLink}>
                  The Banarasi Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/mysore" className={styles.footerLink}>
                  The Mysore Silk Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/bridal" className={styles.footerLink}>
                  The Bridal Heirlooms Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/contemporary" className={styles.footerLink}>
                  The Contemporary Silk Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Signature Studios */}
          <div>
            <h4 className={styles.colTitle}>Signature Experiences</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/atelier" className={styles.footerLink}>
                  <Sparkles size={14} className="text-gold" />
                  <span>Saree Custom Atelier</span>
                </Link>
              </li>
              <li>
                <Link href="/try-on" className={styles.footerLink}>
                  <Sparkles size={14} className="text-gold" />
                  <span>See Yourself in Silk (AI Studio)</span>
                </Link>
              </li>
              <li>
                <Link href="/#craftsmanship" className={styles.footerLink}>
                  Master Pit Looms & Weaving
                </Link>
              </li>
              <li>
                <Link href="/#craftsmanship" className={styles.footerLink}>
                  Pure Silver-Gilt Zari Provenance
                </Link>
              </li>
              <li>
                <Link href="/admin" className={styles.footerLink}>
                  Atelier Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={styles.colTitle}>Royal Atelier Gazette</h4>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-stone)", marginBottom: "1rem", lineHeight: "1.5" }}>
              Receive private invitations to newly unloomed heirlooms and archival releases.
            </p>
            {subscribed ? (
              <p className={styles.newsletterMsg}>
                ✓ Your address has been entered into the Royal Gazette.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Certifications Bar */}
        <div className={styles.certificationsRow}>
          <div className={styles.certItem}>
            <Award size={18} className="text-gold" />
            <span>100% Pure Mulberry Silk Mark Certified</span>
          </div>
          <div className={styles.certItem}>
            <ShieldCheck size={18} className="text-gold" />
            <span>Government Handloom Mark & GI Tagged</span>
          </div>
          <div className={styles.certItem}>
            <Sparkles size={18} className="text-gold" />
            <span>Complimentary Insured White-Glove Royal Delivery</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} VAYIRA — A Royal Indian Silk House. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Heirloom Preservation Care</span>
            <span>Atelier Privacy Charter</span>
            <span>Master Weaver Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

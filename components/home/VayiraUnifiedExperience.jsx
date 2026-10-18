"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import VayiraCrest from "@/components/ui/VayiraCrest";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AtelierSidebar from "@/components/portal/AtelierSidebar";
import ArtOfSilkSection from "@/components/home/ArtOfSilkSection";
import CraftsmanshipSection from "@/components/home/CraftsmanshipSection";
import CuratedCollections from "@/components/home/CuratedCollections";
import CuratedProductsSection from "@/components/home/CuratedProductsSection";
import AtelierTeaser from "@/components/home/AtelierTeaser";
import SeeYourselfTeaser from "@/components/home/SeeYourselfTeaser";
import { useAuth } from "@/lib/authContext";
import { useCart } from "@/lib/cartContext";
import { 
  Sparkles, 
  ArrowRight, 
  KeyRound, 
  Crown, 
  ShieldCheck, 
  RotateCcw,
  Palette,
  Layers,
  Compass,
  ShoppingBag,
  CheckCircle2
} from "lucide-react";
import styles from "./VayiraUnified.module.css";

export default function VayiraUnifiedExperience() {
  const { user, signIn, signOut } = useAuth();
  const { totalCount, setIsOpen: setCartOpen } = useCart();

  // Stage: 'reveal' (opening curtain) | 'intro' (brand introduction & sign-in) | 'atelier' (workspace with left sidebar)
  const [stage, setStage] = useState("reveal");
  const [parted, setParted] = useState(false);
  
  // Left Sidebar active section: 'heritage' | 'collections' | 'atelier' | 'tryon' | 'cart' | 'portfolio'
  const [activeSection, setActiveSection] = useState("heritage");

  // Custom demo input
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  // Handler: Enter from Opening Reveal
  const handleEnterFromReveal = () => {
    setParted(true);
    setTimeout(() => {
      setStage("intro");
      setParted(false);
    }, 1200);
  };

  // Handler: 1-Click Demo Login and Enter Atelier
  const handleDemoLogin = async (name, email, targetSection = "collections") => {
    try {
      await signIn(email, "demo123");
    } catch (e) {
      // ignore
    }
    setActiveSection(targetSection);
    setStage("atelier");
  };

  const handleCustomLogin = async (e) => {
    e.preventDefault();
    if (!customEmail) return;
    try {
      await signIn(customEmail, "demo123");
    } catch (e) {
      // ignore
    }
    setActiveSection("collections");
    setStage("atelier");
  };

  return (
    <div className={styles.rootWrapper}>
      {/* ============================================================ */}
      {/* 1. THE OPENING PAGE — THE ROYAL REVEAL                      */}
      {/* ============================================================ */}
      {stage === "reveal" && (
        <div className={`${styles.revealScreen} ${parted ? styles.parted : ""}`}>
          <div className={styles.lightBeam} />
          <div className={styles.curtainLeft} />
          <div className={styles.curtainRight} />

          <div className={styles.revealCenter}>
            <div className={styles.crestPulse}>
              <VayiraCrest size={76} />
            </div>

            <h1 className={styles.brandTitle}>VAYIRA</h1>
            <p className={styles.brandSubtitle}>A Royal Indian Silk House</p>
            <p className={styles.brandQuote}>“An enduring art, woven in silk.”</p>

            <div className={styles.revealActions}>
              <button
                type="button"
                onClick={handleEnterFromReveal}
                className="btn-primary"
                style={{ padding: "16px 40px", fontSize: "0.92rem", letterSpacing: "0.22em" }}
                autoFocus
              >
                <span>Enter VAYIRA</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. THE INTRODUCTION & DEMO SIGN-IN PAGE                    */}
      {/* ============================================================ */}
      {stage === "intro" && (
        <div className={styles.introScreen}>
          <Header />

          {/* Hero Brand Introduction */}
          <section className={styles.introHero}>
            <div className={styles.introHeroBg}>
              <Image
                src="/images/hero-saree.jpg"
                alt="VAYIRA Royal Heritage Palace Editorial"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 25%", filter: "brightness(0.68)" }}
              />
              <div className={styles.heroOverlay} />
            </div>

            <div className={`container ${styles.introContent}`}>
              <div style={{ marginBottom: "1.25rem" }}>
                <VayiraCrest size={52} />
              </div>

              <span className="editorial-label">Welcome to the Silk House</span>
              <h1 className={styles.heroHeading}>VAYIRA</h1>
              <p className={styles.heroSubheading}>A Royal Indian Silk House</p>

              <p className={styles.heroPhilosophy}>
                “Some traditions are not worn. They are inherited.”
              </p>

              <div className={styles.introStoryBox}>
                <p>
                  Where India's timeless silk traditions meet personal expression. Born from the ancient loom belts of Kanchipuram, Varanasi, Paithan, and Mysore, VAYIRA preserves the sacred craft of pure three-ply mulberry weaves and tested silver-gilt antique zari.
                </p>
              </div>

              {/* Step 1: Sign In With Demo Card */}
              <div id="sign-in-section" className={styles.signInCard}>
                <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                  <span className="editorial-label" style={{ color: "var(--color-gold)" }}>
                    <KeyRound size={13} className="text-gold" />
                    <span>Order Step 01 • Patron Authentication</span>
                  </span>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--color-ivory)", marginTop: "0.5rem" }}>
                    Sign In with Demo Access
                  </h2>
                  <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "1.1rem" }}>
                    To explore the collections, saree atelier, and virtual try-on studio, enter with 1-click demo access below:
                  </p>
                </div>

                {/* 1-Click Preset Personas */}
                <div className={styles.personaGrid}>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("Maharani Radhika Devi", "radhika.devi@vayira.com", "collections")}
                    className={styles.personaBtn}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className={styles.personaTag}>1-Click Demo Sign In</span>
                      <Crown size={16} className="text-gold" />
                    </div>
                    <strong className={styles.personaName}>Maharani Radhika Devi</strong>
                    <span className={styles.personaRole}>Royal Patron Persona (radhika.devi@vayira.com)</span>
                    <span className={styles.personaAction}>
                      <span>Enter Atelier with Left Sidebar</span>
                      <ArrowRight size={14} />
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin("Senior Master Curator", "curator@vayira.com", "collections")}
                    className={styles.personaBtn}
                    style={{ borderColor: "rgba(23, 61, 50, 0.8)" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className={styles.personaTag} style={{ color: "#86efac" }}>1-Click Demo Sign In</span>
                      <ShieldCheck size={16} className="text-gold" />
                    </div>
                    <strong className={styles.personaName}>Senior Master Curator</strong>
                    <span className={styles.personaRole}>Atelier Concierge (curator@vayira.com)</span>
                    <span className={styles.personaAction} style={{ color: "#86efac" }}>
                      <span>Enter Atelier with Left Sidebar</span>
                      <ArrowRight size={14} />
                    </span>
                  </button>
                </div>

                {/* Custom Name / Email Option */}
                <form onSubmit={handleCustomLogin} className={styles.customForm}>
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Maharani Priyadarshini)"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className={styles.customInput}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className={styles.customInput}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: "12px 24px" }}>
                    <span>Enter Atelier</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
                  <button
                    type="button"
                    onClick={() => setStage("reveal")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-stone)",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <RotateCcw size={12} />
                    <span>Re-open Opening Screen</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. THE ROYAL ATELIER WORKSPACE (WITH LEFT SIDEBAR)          */}
      {/* ============================================================ */}
      {stage === "atelier" && (
        <div className={styles.atelierLayout}>
          {/* THE LEFT SIDEBAR */}
          <AtelierSidebar
            activeSection={activeSection}
            onSelectSection={(sec) => {
              if (sec === "cart") {
                setCartOpen(true);
              } else {
                setActiveSection(sec);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            onReplayReveal={() => setStage("reveal")}
            onReturnToIntro={() => setStage("intro")}
          />

          {/* MAIN CONTENT AREA CONTROLLED BY SIDEBAR */}
          <main className={styles.mainContent}>
            {/* Top Bar with Status and Quick Links */}
            <div className={styles.topUtilityBar}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="editorial-label" style={{ fontSize: "0.7rem", margin: 0 }}>
                  Active Workspace
                </span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--color-gold-light)" }}>
                  {activeSection === "heritage" && "2. Heritage & Loom Traditions"}
                  {activeSection === "collections" && "3. Royal Silk Collections (8 Archives)"}
                  {activeSection === "atelier" && "4. The VAYIRA Saree Custom Atelier"}
                  {activeSection === "tryon" && "5. See Yourself in Silk (AI Try-On Studio)"}
                  {activeSection === "portfolio" && "Royal Patron Portfolio & Saved Designs"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link href="/cart" className="btn-outline" style={{ padding: "6px 14px", fontSize: "0.75rem" }}>
                  <ShoppingBag size={14} />
                  <span>Cart ({totalCount})</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setStage("intro")}
                  style={{ background: "none", border: "none", color: "var(--color-stone)", fontSize: "0.78rem", cursor: "pointer" }}
                >
                  Exit Workspace
                </button>
              </div>
            </div>

            {/* View 1: HERITAGE (2. Heritage) */}
            {activeSection === "heritage" && (
              <div>
                <ArtOfSilkSection />
                <CraftsmanshipSection />
              </div>
            )}

            {/* View 2: COLLECTIONS (3. Collections) */}
            {activeSection === "collections" && (
              <div>
                <CuratedCollections />
                <CuratedProductsSection />
              </div>
            )}

            {/* View 3: SAREE ATELIER (4. Saree Atelier) */}
            {activeSection === "atelier" && (
              <div>
                <AtelierTeaser />
                <div style={{ padding: "4rem 2rem", textAlign: "center", background: "#16040A" }}>
                  <Link href="/atelier" className="btn-primary" style={{ padding: "16px 36px", fontSize: "0.95rem" }}>
                    <Palette size={18} />
                    <span>Open Full Dedicated Customizer Studio Screen</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            )}

            {/* View 4: SEE YOURSELF IN SILK (5. See Yourself) */}
            {activeSection === "tryon" && (
              <div>
                <SeeYourselfTeaser />
                <div style={{ padding: "4rem 2rem", textAlign: "center", background: "#16040A" }}>
                  <Link href="/try-on" className="btn-primary" style={{ padding: "16px 36px", fontSize: "0.95rem" }}>
                    <Sparkles size={18} />
                    <span>Open Full Virtual Try-On Fitting Room Screen</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            )}

            {/* View 5: PORTFOLIO */}
            {activeSection === "portfolio" && (
              <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                <span className="editorial-label">Patron Portfolio</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--color-ivory)", margin: "1rem 0" }}>
                  Saved Heirlooms & Loom Reservations
                </h2>
                <p style={{ color: "var(--color-champagne)", fontStyle: "italic", marginBottom: "2rem" }}>
                  View your saved custom creations and active loom weaver enquiries.
                </p>
                <Link href="/account" className="btn-primary">
                  Open Account Dossier
                </Link>
              </div>
            )}

            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}

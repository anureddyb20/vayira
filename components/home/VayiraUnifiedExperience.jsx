"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VayiraCrest from "@/components/ui/VayiraCrest";
import Footer from "@/components/layout/Footer";
import AtelierSidebar from "@/components/portal/AtelierSidebar";
import WorkspaceHeritageView from "@/components/portal/WorkspaceHeritageView";
import WorkspaceCollectionsView from "@/components/portal/WorkspaceCollectionsView";
import WorkspaceAtelierView from "@/components/portal/WorkspaceAtelierView";
import WorkspaceTryOnView from "@/components/portal/WorkspaceTryOnView";
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
  CheckCircle2,
  BookOpen,
  Feather
} from "lucide-react";
import styles from "./VayiraUnified.module.css";

export default function VayiraUnifiedExperience() {
  const { user, signIn, signOut } = useAuth();
  const { totalCount, setIsOpen: setCartOpen } = useCart();

  // EXACT USER-REQUESTED FLOW:
  // 1. 'reveal'    -> Luxurious Opening Page with Silk Curtains & Crest
  // 2. 'intro'     -> Dedicated Brand Introduction about VAYIRA
  // 3. 'signin'    -> Patron Sign In Page to explore options (1-Click Demo)
  // 4. 'workspace' -> Silk House Workspace with LEFT SIDEBAR containing all features
  const [stage, setStage] = useState("reveal");
  const [parted, setParted] = useState(false);
  
  // Left Sidebar active section: 'heritage' (2) | 'collections' (3) | 'atelier' (4) | 'tryon' (5) | 'portfolio'
  const [activeSection, setActiveSection] = useState("collections");

  // Custom login state
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  // Step 1 -> Step 2: Curtain reveal transition
  const handleEnterFromReveal = () => {
    setParted(true);
    setTimeout(() => {
      setStage("intro");
      setParted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  // Step 2 -> Step 3: Proceed to explore / Sign In
  const handleProceedToSignIn = () => {
    setStage("signin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3 -> Step 4: 1-Click Demo Sign In and enter Workspace with Left Sidebar
  const handleDemoSignIn = async (name, email, defaultSection = "collections") => {
    try {
      await signIn(email, "demo123");
    } catch (e) {
      // Local fallback handled in authContext
    }
    setActiveSection(defaultSection);
    setStage("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3 -> Step 4: Custom Sign In
  const handleCustomSignIn = async (e) => {
    e.preventDefault();
    if (!customEmail) return;
    try {
      await signIn(customEmail, "demo123");
    } catch (e) {
      // Local fallback handled in authContext
    }
    setActiveSection("collections");
    setStage("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.rootWrapper}>
      {/* ============================================================ */}
      {/* STEP 1: THE LUXURIOUS OPENING PAGE (THE ROYAL REVEAL)        */}
      {/* ============================================================ */}
      {stage === "reveal" && (
        <div className={`${styles.revealScreen} ${parted ? styles.parted : ""}`}>
          <div className={styles.lightBeam} />
          <div className={styles.curtainLeft} />
          <div className={styles.curtainRight} />

          <div className={styles.revealCenter}>
            <div className={styles.crestPulse}>
              <VayiraCrest size={80} />
            </div>

            <h1 className={styles.brandTitle}>VAYIRA</h1>
            <p className={styles.brandSubtitle}>A Royal Indian Silk House</p>
            <p className={styles.brandQuote}>“Some traditions are not worn. They are inherited.”</p>

            <div className={styles.revealActions}>
              <button
                type="button"
                onClick={handleEnterFromReveal}
                className="btn-primary"
                style={{ padding: "16px 44px", fontSize: "0.95rem", letterSpacing: "0.22em" }}
                autoFocus
              >
                <span>Enter VAYIRA</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-stone)", textTransform: "uppercase" }}>
                Pure Mulberry Silk • Tested Silver Zari • Handloom Certified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STEP 2: THE INTRODUCTION ABOUT VAYIRA (BRAND STORY PAGE)     */}
      {/* ============================================================ */}
      {stage === "intro" && (
        <div className={styles.introScreen}>
          {/* Header */}
          <header className={styles.introHeader}>
            <div className={`container ${styles.introHeaderInner}`}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <VayiraCrest size={40} />
                <div>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", letterSpacing: "0.15em", color: "var(--color-ivory)", display: "block" }}>
                    VAYIRA
                  </span>
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--color-gold)", textTransform: "uppercase" }}>
                    A Royal Indian Silk House
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setStage("reveal")}
                  className="btn-outline"
                  style={{ padding: "8px 16px", fontSize: "0.75rem" }}
                >
                  <RotateCcw size={13} />
                  <span>Replay Curtain Opening</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToSignIn}
                  className="btn-primary"
                  style={{ padding: "8px 20px", fontSize: "0.8rem" }}
                >
                  <KeyRound size={14} />
                  <span>Sign In (Demo)</span>
                </button>
              </div>
            </div>
          </header>

          {/* Hero Editorial Introduction */}
          <section className={styles.introHero}>
            <div className={styles.introHeroBg}>
              <Image
                src="/images/hero-saree.jpg"
                alt="VAYIRA Royal Heritage Palace Editorial"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 25%", filter: "brightness(0.65)" }}
              />
              <div className={styles.heroOverlay} />
            </div>

            <div className={`container ${styles.introContent}`}>
              <div style={{ marginBottom: "1.25rem" }}>
                <VayiraCrest size={56} />
              </div>

              <span className="editorial-label">Introduction to the Silk House</span>
              <h1 className={styles.heroHeading}>VAYIRA</h1>
              <p className={styles.heroSubheading}>A Royal Indian Silk House</p>

              <p className={styles.heroPhilosophy}>
                “Some traditions are not worn. They are inherited.”
              </p>

              <div className={styles.introStoryBox}>
                <p>
                  Where India's timeless silk traditions meet personal expression. Born from the historic loom sanctuaries of <strong>Kanchipuram, Varanasi, Paithan, and Mysore</strong>, VAYIRA preserves the sacred craft of pure three-ply mulberry silk and tested silver-gilt antique zari.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  Each creation is born from unhurried human dedication—requiring up to 45 days on traditional wooden pit looms. We present our curated archives alongside a real-time bespoke digital customizer and an AI virtual drape fitting room.
                </p>
              </div>

              {/* Four Pillars Grid */}
              <div className={styles.pillarsIntroGrid}>
                <div className={styles.pillarCard}>
                  <Compass size={24} className="text-gold" />
                  <h4>2. Heritage & Lineage</h4>
                  <p>Ancient weaving traditions, Silk Mark certified pure filaments, and tested silver zari assaying.</p>
                </div>

                <div className={styles.pillarCard}>
                  <Layers size={24} className="text-gold" />
                  <h4>3. Royal Collections</h4>
                  <p>8 regional archives featuring authentic Kanjeevaram, Banarasi, Mysore, Bridal, and Paithani silks.</p>
                </div>

                <div className={styles.pillarCard}>
                  <Palette size={24} className="text-gold" />
                  <h4>4. Saree Atelier</h4>
                  <p>Interactive bespoke customizer to choose silk fabric, color, zari type, and border architecture.</p>
                </div>

                <div className={styles.pillarCard}>
                  <Sparkles size={24} className="text-gold" />
                  <h4>5. See Yourself in Silk</h4>
                  <p>AI Virtual Try-On Studio allowing patrons to visualize royal handloom drapes on their own portrait.</p>
                </div>
              </div>

              {/* The Gateway CTA Button to proceed to Sign In */}
              <div className={styles.introCtaBox}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-ivory)", marginBottom: "0.5rem" }}>
                  Ready to Explore the Silk House?
                </h3>
                <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "1.1rem", marginBottom: "1.75rem" }}>
                  To access our 8 collections, custom saree atelier, and AI virtual try-on studio, proceed to royal patron access:
                </p>
                
                <button
                  type="button"
                  onClick={handleProceedToSignIn}
                  className="btn-primary"
                  style={{ padding: "18px 48px", fontSize: "1rem", letterSpacing: "0.18em" }}
                >
                  <span>Explore Our Collections & Atelier</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}

      {/* ============================================================ */}
      {/* STEP 3: THE SIGN IN PAGE (DEMO ACCESS TO EXPLORE OPTIONS)    */}
      {/* ============================================================ */}
      {stage === "signin" && (
        <div className={styles.signInScreen}>
          {/* Top navigation */}
          <div className={styles.signInTopNav}>
            <button
              type="button"
              onClick={() => setStage("intro")}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-champagne)",
                cursor: "pointer",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <span>← Back to Introduction</span>
            </button>

            <button
              type="button"
              onClick={() => setStage("reveal")}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-stone)",
                cursor: "pointer",
                fontSize: "0.78rem",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <RotateCcw size={12} />
              <span>Replay Opening Screen</span>
            </button>
          </div>

          <div className={`container ${styles.signInContainer}`}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ display: "inline-block", marginBottom: "1rem" }}>
                <VayiraCrest size={56} />
              </div>
              <span className="editorial-label" style={{ color: "var(--color-gold)" }}>
                <KeyRound size={14} className="text-gold" />
                <span>Order Step 01 • Royal Patron Authentication</span>
              </span>
              <h2 className={styles.signInHeading}>
                Sign In to Explore VAYIRA
              </h2>
              <p className={styles.signInSubheading}>
                Select a 1-Click Demo persona below to unlock the full Silk House workspace with Left Sidebar navigation:
              </p>
            </div>

            {/* 1-Click Preset Personas */}
            <div className={styles.personaGrid}>
              {/* Persona 1: Maharani Radhika Devi */}
              <div className={styles.personaCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span className={styles.personaTag}>Royal Patron Persona</span>
                  <Crown size={22} className="text-gold" />
                </div>
                <h3 className={styles.personaName}>Maharani Radhika Devi</h3>
                <span className={styles.personaRole}>radhika.devi@vayira.com</span>
                <p className={styles.personaDesc}>
                  Full royal patron access to bridal heirlooms, bespoke customizer commissions, and AI digital try-on studio.
                </p>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn("Maharani Radhika Devi", "radhika.devi@vayira.com", "collections")}
                  className="btn-primary"
                  style={{ width: "100%", padding: "14px", marginTop: "1.25rem" }}
                >
                  <KeyRound size={16} />
                  <span>Sign In as Maharani Radhika Devi</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Persona 2: Senior Master Curator */}
              <div className={styles.personaCard} style={{ borderColor: "rgba(23, 61, 50, 0.9)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span className={styles.personaTag} style={{ color: "#86efac", background: "rgba(23, 61, 50, 0.4)" }}>
                    Atelier Concierge Persona
                  </span>
                  <ShieldCheck size={22} className="text-gold" />
                </div>
                <h3 className={styles.personaName}>Senior Master Curator</h3>
                <span className={styles.personaRole}>curator@vayira.com</span>
                <p className={styles.personaDesc}>
                  Atelier oversight access to inspect all 8 collection archives, fabric technical parameters, and loom weave schedules.
                </p>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn("Senior Master Curator", "curator@vayira.com", "collections")}
                  className="btn-primary"
                  style={{ width: "100%", padding: "14px", marginTop: "1.25rem", background: "linear-gradient(135deg, #173d32 0%, #0d241d 100%)", borderColor: "#86efac" }}
                >
                  <KeyRound size={16} />
                  <span>Sign In as Master Curator</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Custom Name / Email Option */}
            <div className={styles.customFormBox}>
              <span className="editorial-label" style={{ fontSize: "0.72rem", marginBottom: "0.75rem", display: "block", textAlign: "center" }}>
                Or Sign In with Your Custom Name & Email
              </span>
              <form onSubmit={handleCustomSignIn} className={styles.customForm}>
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
                <button type="submit" className="btn-primary" style={{ padding: "12px 24px", whiteSpace: "nowrap" }}>
                  <span>Enter Workspace</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STEP 4: SILK HOUSE WORKSPACE WITH LEFT SIDEBAR              */}
      {/* ============================================================ */}
      {stage === "workspace" && (
        <div className={styles.workspaceLayout}>
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

          {/* MAIN WORKSPACE CONTENT PANE (CONTROLLED BY LEFT SIDEBAR) */}
          <main className={styles.workspaceMain}>
            {/* Top Workspace Header Bar */}
            <div className={styles.workspaceTopBar}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="editorial-label" style={{ fontSize: "0.7rem", margin: 0 }}>
                  Active Workspace
                </span>
                <span className={styles.activeSectionTitle}>
                  {activeSection === "heritage" && "2. Heritage & Loom Traditions"}
                  {activeSection === "collections" && "3. Royal Collections (8 Archives)"}
                  {activeSection === "atelier" && "4. Saree Atelier (Bespoke Customizer)"}
                  {activeSection === "tryon" && "5. See Yourself in Silk (AI Try-On Studio)"}
                  {activeSection === "portfolio" && "Royal Patron Portfolio & Saved Designs"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="btn-outline"
                  style={{ padding: "6px 14px", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 6 }}
                >
                  <ShoppingBag size={14} />
                  <span>Reservations ({totalCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStage("intro")}
                  className="text-stone"
                  style={{ background: "none", border: "none", fontSize: "0.78rem", cursor: "pointer" }}
                >
                  Exit to Intro
                </button>
              </div>
            </div>

            {/* View 2: HERITAGE & CRAFT */}
            {activeSection === "heritage" && (
              <WorkspaceHeritageView
                onGoToCollections={() => setActiveSection("collections")}
                onGoToAtelier={() => setActiveSection("atelier")}
              />
            )}

            {/* View 3: COLLECTIONS (8 ARCHIVES) */}
            {activeSection === "collections" && (
              <WorkspaceCollectionsView
                onSelectTryOn={() => setActiveSection("tryon")}
                onSelectAtelier={() => setActiveSection("atelier")}
              />
            )}

            {/* View 4: SAREE ATELIER (FULL BESPOKE CUSTOMIZER EMBEDDED) */}
            {activeSection === "atelier" && (
              <WorkspaceAtelierView
                onGoToTryOn={() => setActiveSection("tryon")}
              />
            )}

            {/* View 5: SEE YOURSELF IN SILK (FULL AI TRY-ON STUDIO EMBEDDED) */}
            {activeSection === "tryon" && (
              <WorkspaceTryOnView
                onGoToAtelier={() => setActiveSection("atelier")}
              />
            )}

            {/* View: PATRON PORTFOLIO */}
            {activeSection === "portfolio" && (
              <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                <span className="editorial-label">Patron Portfolio</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--color-ivory)", margin: "1rem 0" }}>
                  Saved Heirlooms & Loom Reservations
                </h2>
                <p style={{ color: "var(--color-champagne)", fontStyle: "italic", marginBottom: "2rem" }}>
                  Logged in as {user?.email || "Maharani Radhika Devi"}. Your bespoke commissions are preserved with the master weavers.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                  <button
                    type="button"
                    onClick={() => setActiveSection("atelier")}
                    className="btn-primary"
                  >
                    <span>Create New Bespoke Design</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}

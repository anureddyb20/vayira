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
  Feather,
  Mail,
  Lock,
  User,
  AlertCircle,
  X
} from "lucide-react";
import styles from "./VayiraUnified.module.css";

export default function VayiraUnifiedExperience() {
  const { user, signIn, signUp, signOut } = useAuth();
  const { totalCount, setIsOpen: setCartOpen } = useCart();

  // STAGE FLOW:
  // 1. 'reveal'    -> Luxurious Opening Page with Silk Curtains & Crest
  // 2. 'intro'     -> Dedicated Brand Introduction about VAYIRA
  // 3. 'workspace' -> Silk House Workspace with LEFT SIDEBAR containing all features
  const [stage, setStage] = useState("reveal");
  const [parted, setParted] = useState(false);
  
  // Left Sidebar active section: 'heritage' | 'collections' | 'atelier' | 'tryon' | 'portfolio'
  const [activeSection, setActiveSection] = useState("collections");

  // Sign In To Explore Modal state & Demo Credentials
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [authTab, setAuthTab] = useState("signin"); // "signin" | "register"
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Step 1 -> Step 2: Curtain reveal transition
  const handleEnterFromReveal = () => {
    setParted(true);
    setTimeout(() => {
      setStage("intro");
      setParted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  // Open the Sign In to Explore Modal
  const handleProceedToSignIn = () => {
    setIsSignInOpen(true);
  };

  // 1-Click Demo Credentials Autofill
  const handleFillDemoCredentials = () => {
    setLoginEmail("radhika.devi@vayira.com");
    setLoginPassword("demo123");
    setDemoLoaded(true);
    setLoginError("");
  };

  // Form Submit Sign In
  const handleModalSignIn = async (e) => {
    if (e) e.preventDefault();
    if (!loginEmail) return;
    setLoginLoading(true);
    setLoginError("");

    try {
      await signIn(loginEmail, loginPassword || "demo123", "Maharani Radhika Devi");
      setIsSignInOpen(false);
      setActiveSection("collections");
      setStage("workspace");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setLoginError(err.message || "Authentication error occurred");
    } finally {
      setLoginLoading(false);
    }
  };

  // Instant 1-Click Demo Login
  const handleQuickDemoAccess = async (name = "Maharani Radhika Devi", email = "radhika.devi@vayira.com") => {
    setLoginLoading(true);
    setLoginError("");
    try {
      await signIn(email, "demo123", name);
      setIsSignInOpen(false);
      setActiveSection("collections");
      setStage("workspace");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setLoginError(err.message || "Failed to log in as demo patron");
    } finally {
      setLoginLoading(false);
    }
  };

  // Registration handler
  const handleModalRegister = async (e) => {
    e.preventDefault();
    if (!loginEmail) return;
    setLoginLoading(true);
    setLoginError("");

    try {
      await signUp(loginEmail, loginPassword || "demo123", registerName || "Royal Patron");
      setIsSignInOpen(false);
      setActiveSection("collections");
      setStage("workspace");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setLoginError(err.message || "Registration error occurred");
    } finally {
      setLoginLoading(false);
    }
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
      {/* SIGN IN TO EXPLORE MODAL (WITH 1-CLICK DEMO CREDENTIALS)     */}
      {/* ============================================================ */}
      {isSignInOpen && (
        <div 
          className={styles.modalBackdrop}
          onClick={() => setIsSignInOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className={styles.signInModal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsSignInOpen(false)}
              className={styles.modalCloseBtn}
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalCrest}>
                <VayiraCrest size={48} />
              </div>
              <div className={styles.modalBadge}>
                <KeyRound size={13} className="text-gold" />
                <span>Order Step 01 • Royal Patron Authentication</span>
              </div>
              <h2 className={styles.modalTitle}>Sign In to Explore VAYIRA</h2>
              <p className={styles.modalSubtitle}>
                Unlock all 8 royal collections, bespoke saree atelier customizer, and AI virtual try-on fitting studio.
              </p>
            </div>

            {/* Auth Tab Switcher */}
            <div className={styles.authTabs}>
              <button
                type="button"
                className={`${styles.authTabBtn} ${authTab === "signin" ? styles.activeTab : ""}`}
                onClick={() => { setAuthTab("signin"); setLoginError(""); }}
              >
                <KeyRound size={15} />
                <span>Patron Sign In</span>
              </button>
              <button
                type="button"
                className={`${styles.authTabBtn} ${authTab === "register" ? styles.activeTab : ""}`}
                onClick={() => { setAuthTab("register"); setLoginError(""); }}
              >
                <Sparkles size={15} />
                <span>New Registration</span>
              </button>
            </div>

            {loginError && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#fca5a5",
                fontSize: "0.82rem",
                borderRadius: "3px",
                marginBottom: "1rem"
              }}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            {/* SIGN IN TAB */}
            {authTab === "signin" && (
              <div>
                {/* 1-Click Demo Credentials Button Banner */}
                <div className={styles.demoBanner}>
                  <div className={styles.demoBannerInfo}>
                    <Crown size={18} className="text-gold" />
                    <div>
                      <strong>Quick Patron Access</strong>
                      <span>Explore effortlessly with demo credentials</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemoCredentials}
                    className={styles.demoFillBtn}
                    id="btn-demo-credentials"
                  >
                    <KeyRound size={14} />
                    <span>Demo Credentials</span>
                  </button>
                </div>

                {demoLoaded && (
                  <div className={styles.demoIndicatorAlert}>
                    <CheckCircle2 size={16} />
                    <span>Demo credentials loaded: Maharani Radhika Devi (Patron Access)</span>
                  </div>
                )}

                <form onSubmit={handleModalSignIn}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Patron Email Address</label>
                    <div className={styles.inputFieldWrapper}>
                      <Mail size={16} className="text-stone" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. radhika.devi@vayira.com"
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                          setDemoLoaded(false);
                        }}
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Security Password</label>
                    <div className={styles.inputFieldWrapper}>
                      <Lock size={16} className="text-stone" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className={`btn-primary ${styles.submitBtn}`}
                  >
                    <span>{loginLoading ? "Authenticating Patron..." : "Sign In & Enter Silk House"}</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                {/* 1-Click Instant Enter Link */}
                <button
                  type="button"
                  onClick={() => handleQuickDemoAccess("Maharani Radhika Devi", "radhika.devi@vayira.com")}
                  className={styles.quickInstantBtn}
                >
                  ⚡ Or 1-Click Instant Enter as Maharani Radhika Devi
                </button>
              </div>
            )}

            {/* REGISTRATION TAB */}
            {authTab === "register" && (
              <form onSubmit={handleModalRegister}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Patron Full Name</label>
                  <div className={styles.inputFieldWrapper}>
                    <User size={16} className="text-stone" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharani Priyadarshini"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Patron Email Address</label>
                  <div className={styles.inputFieldWrapper}>
                    <Mail size={16} className="text-stone" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@heritage.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Security Password</label>
                  <div className={styles.inputFieldWrapper}>
                    <Lock size={16} className="text-stone" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className={`btn-primary ${styles.submitBtn}`}
                >
                  <span>{loginLoading ? "Registering Patron..." : "Create Account & Enter Silk House"}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
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

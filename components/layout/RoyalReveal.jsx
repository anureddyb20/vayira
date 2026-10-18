"use client";

import { useState, useEffect } from "react";
import VayiraCrest from "@/components/ui/VayiraCrest";
import styles from "./RoyalReveal.module.css";
import { Sparkles, ArrowRight } from "lucide-react";

export default function RoyalReveal() {
  const [revealed, setRevealed] = useState(true); // default true for SSR safety
  const [parted, setParted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user already saw reveal in this browser session
    const seen = sessionStorage.getItem("vayira_reveal_seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || prefersReducedMotion) {
      setRevealed(true);
    } else {
      setRevealed(false);
    }
  }, []);

  const handleEnter = () => {
    setParted(true);
    sessionStorage.setItem("vayira_reveal_seen", "true");

    // Wait for the curtain parting animation to complete, then hide overlay
    setTimeout(() => {
      setRevealed(true);
    }, 1400);
  };

  const handleSkip = () => {
    sessionStorage.setItem("vayira_reveal_seen", "true");
    setRevealed(true);
  };

  if (!isClient || revealed) return null;

  return (
    <div className={`${styles.revealOverlay} ${parted ? styles.parted : ""}`} role="dialog" aria-modal="true" aria-label="Welcome to VAYIRA">
      {/* Light Shaft */}
      <div className={styles.lightBeam} />

      {/* Layered Silk Curtain Panels */}
      <div className={styles.curtainLeft} />
      <div className={styles.curtainRight} />

      {/* Centerpiece Stage */}
      <div className={styles.contentStage}>
        <div className={styles.crestWrapper}>
          <VayiraCrest size={68} />
        </div>

        <h1 className={styles.royalTitle}>VAYIRA</h1>
        <p className={styles.royalDescriptor}>A Royal Indian Silk House</p>
        
        <p className={styles.royalQuote}>
          An enduring art, woven in silk
        </p>

        <div className={styles.actionRow}>
          <button 
            type="button" 
            onClick={handleEnter} 
            className={styles.enterBtn}
            autoFocus
          >
            <span>Enter VAYIRA</span>
            <ArrowRight size={16} />
          </button>

          <button 
            type="button" 
            onClick={handleSkip} 
            className={styles.skipBtn}
          >
            Explore Directly
          </button>
        </div>
      </div>
    </div>
  );
}

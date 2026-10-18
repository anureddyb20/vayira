"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { products } from "@/data/products";
import { useCart } from "@/lib/cartContext";
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  ShieldCheck, 
  Trash2, 
  RefreshCw, 
  ShoppingBag, 
  Palette, 
  CheckCircle2, 
  AlertCircle,
  Eye
} from "lucide-react";
import styles from "./page.module.css";

function TryOnStudioContent() {
  const searchParams = useSearchParams();
  const sareeQuery = searchParams.get("saree");
  const { addToCart } = useCart();

  const [selectedSaree, setSelectedSaree] = useState(
    products.find((p) => p.id === sareeQuery) || products[0]
  );
  const [userImage, setUserImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [resultData, setResultData] = useState(null);
  const [activeView, setActiveView] = useState("draped"); // 'original' | 'draped'
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  // Available try-on supported sarees
  const tryOnSarees = products.filter((p) => p.tryOnSupported);

  useEffect(() => {
    if (sareeQuery) {
      const match = products.find((p) => p.id === sareeQuery);
      if (match) setSelectedSaree(match);
    }
  }, [sareeQuery]);

  // Handle local image upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image file exceeds the 5MB maximum limit.");
      return;
    }

    setErrorMessage("");
    const reader = new FileReader();
    reader.onload = (event) => {
      setUserImage(event.target.result);
      setResultData(null);
    };
    reader.readAsDataURL(file);
  };

  // Quick Demo portrait button
  const handleUseDemo = () => {
    setErrorMessage("");
    setUserImage("/images/tryon-user.jpg");
    setResultData(null);
  };

  // Run the AI Try-On process
  const handleGenerate = async () => {
    if (!userImage) {
      setErrorMessage("Please select or upload a portrait first.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");
    setProcessingStep(1);

    // Multi-phase progress ticker for luxury feedback
    const step1 = setTimeout(() => setProcessingStep(2), 700);
    const step2 = setTimeout(() => setProcessingStep(3), 1400);

    try {
      const res = await fetch("/api/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sareeId: selectedSaree.id,
          userImageBase64: userImage.startsWith("data:") ? userImage : null
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Simulation failed");
      }

      setResultData(data);
      setActiveView("draped");
    } catch (err) {
      setErrorMessage(err.message || "Failed to generate preview. Please try again.");
    } finally {
      clearTimeout(step1);
      clearTimeout(step2);
      setIsProcessing(false);
    }
  };

  const handleResetImage = () => {
    setUserImage(null);
    setResultData(null);
    setErrorMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container">
      <div className={styles.studioGrid}>
        {/* Left Column: Saree Selection Drawer */}
        <aside className={styles.selectorSidebar}>
          <div className={styles.sidebarTitle}>
            <Sparkles size={16} />
            <span>Select Saree for Drape</span>
          </div>

          <div className={styles.sareeList}>
            {tryOnSarees.map((saree) => {
              const isSelected = selectedSaree.id === saree.id;
              return (
                <div
                  key={saree.id}
                  onClick={() => {
                    setSelectedSaree(saree);
                    if (resultData) {
                      // Trigger re-render with new saree if already synthesized
                      handleGenerate();
                    }
                  }}
                  className={`${styles.sareeCard} ${isSelected ? styles.activeSaree : ""}`}
                  role="button"
                  tabIndex={0}
                >
                  <Image
                    src={saree.primaryImage}
                    alt={saree.name}
                    width={55}
                    height={75}
                    className={styles.sareeThumb}
                  />
                  <div className={styles.sareeInfo}>
                    <span className={styles.sareeCollection}>{saree.collectionName}</span>
                    <strong className={styles.sareeName}>{saree.name}</strong>
                    <span className={styles.sareePrice}>{saree.priceFormatted}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Stage: Interactive Try-On Studio */}
        <main className={styles.stageContainer}>
          {errorMessage && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5",
              borderRadius: "2px",
              marginBottom: "1.5rem",
              fontSize: "0.85rem"
            }}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Phase 1: Upload or Portrait Selection */}
          {!userImage && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
              <div 
                className={styles.dropzone}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <Upload size={48} className="text-gold" style={{ marginBottom: "1.25rem", opacity: 0.85 }} />
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--color-ivory)", marginBottom: "0.5rem" }}>
                  Upload Your Portrait for Virtual Drape
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--color-stone)", maxWidth: "420px", marginBottom: "1.5rem" }}>
                  Drag and drop a portrait or click to browse. For best results, use a well-lit, front-facing photograph.
                </p>
                
                <span className="btn-outline" style={{ pointerEvents: "none" }}>
                  Choose File from Device
                </span>
              </div>

              {/* Fast Demo Option */}
              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--color-stone)", marginRight: "10px" }}>
                  Or test the experience instantly:
                </span>
                <button
                  type="button"
                  onClick={handleUseDemo}
                  style={{
                    background: "rgba(180, 154, 97, 0.15)",
                    border: "1px solid var(--color-gold)",
                    color: "var(--color-gold-light)",
                    padding: "8px 16px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600
                  }}
                >
                  ✦ Use Editorial Demo Model
                </button>
              </div>

              {/* Privacy Charter */}
              <div className={styles.privacyBanner}>
                <ShieldCheck size={16} />
                <span>
                  <strong>Strict Privacy Guarantee:</strong> Your photograph is processed in real time and never stored permanently or used for model training.
                </span>
              </div>
            </div>
          )}

          {/* Phase 2: Processing Pipeline */}
          {userImage && isProcessing && (
            <div className={styles.processingView}>
              <div className={styles.spinnerCrest}>
                <VayiraCrest size={80} />
              </div>

              <span className="editorial-label" style={{ marginBottom: "0.75rem" }}>
                Neural Atelier Synthesis
              </span>

              <h3 className={styles.stepIndicator}>
                {processingStep === 1 && "Analyzing posture & torso geometry..."}
                {processingStep === 2 && "Draping pure silk pleats & pallu..."}
                {processingStep === 3 && "Harmonizing antique gold zari reflection..."}
              </h3>

              <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "1.1rem" }}>
                Reimagining {selectedSaree.name} on your silhouette
              </p>
            </div>
          )}

          {/* Phase 3: Preview Ready Before Generation */}
          {userImage && !isProcessing && !resultData && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
              <div style={{ position: "relative", width: 280, height: 380, borderRadius: "2px", overflow: "hidden", border: "1px solid var(--color-gold)" }}>
                <Image
                  src={userImage}
                  alt="Uploaded portrait"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--color-ivory)", marginBottom: "0.25rem" }}>
                  Selected Saree: <span className="text-gold">{selectedSaree.name}</span>
                </p>
                <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "0.95rem" }}>
                  {selectedSaree.collectionName} • {selectedSaree.priceFormatted}
                </p>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="btn-primary"
                  style={{ padding: "14px 36px" }}
                >
                  <Sparkles size={16} />
                  <span>Synthesize Silk Drape</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetImage}
                  className="btn-outline"
                >
                  <Trash2 size={16} />
                  <span>Choose Another Photo</span>
                </button>
              </div>
            </div>
          )}

          {/* Phase 4: Generated Result & Comparison View */}
          {resultData && !isProcessing && (
            <div className={styles.resultStage}>
              {/* Toggle Switch */}
              <div className={styles.viewToggleRow}>
                <button
                  type="button"
                  className={`btn-outline ${activeView === "original" ? "bg-gold" : ""}`}
                  style={{
                    backgroundColor: activeView === "original" ? "var(--color-gold)" : "transparent",
                    color: activeView === "original" ? "var(--color-ink-deep)" : "var(--color-ivory)",
                    padding: "8px 20px"
                  }}
                  onClick={() => setActiveView("original")}
                >
                  Your Original Portrait
                </button>

                <button
                  type="button"
                  className={`btn-outline ${activeView === "draped" ? "bg-gold" : ""}`}
                  style={{
                    backgroundColor: activeView === "draped" ? "var(--color-gold)" : "transparent",
                    color: activeView === "draped" ? "var(--color-ink-deep)" : "var(--color-ivory)",
                    padding: "8px 20px"
                  }}
                  onClick={() => setActiveView("draped")}
                >
                  <Sparkles size={14} />
                  <span>Draped in {selectedSaree.name.split(" ")[0]}</span>
                </button>
              </div>

              {/* Comparison Canvas Frame */}
              <div className={styles.compareFrame}>
                <Image
                  src={activeView === "draped" ? resultData.resultImageUrl : userImage}
                  alt={activeView === "draped" ? "AI Draped Silk Saree" : "Original Portrait"}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  style={{ objectFit: "cover" }}
                />

                <div style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  right: "1rem",
                  background: "rgba(22, 5, 11, 0.88)",
                  backdropFilter: "blur(10px)",
                  padding: "10px 16px",
                  borderRadius: "2px",
                  borderLeft: "2px solid var(--color-gold)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--color-ivory)", display: "block" }}>
                      {selectedSaree.name}
                    </strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--color-champagne)", fontStyle: "italic" }}>
                      {selectedSaree.collectionName} • {selectedSaree.priceFormatted}
                    </span>
                  </div>

                  <span style={{ fontSize: "0.72rem", color: "var(--color-gold-light)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    ✓ Preview Ready
                  </span>
                </div>
              </div>

              {/* Disclaimer Notice */}
              <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--color-stone)", fontStyle: "italic", maxWidth: "600px", margin: "0 auto" }}>
                *{resultData.disclaimer}
              </p>

              {/* Result Actions */}
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => addToCart(selectedSaree, 1)}
                  className="btn-primary"
                >
                  <ShoppingBag size={16} />
                  <span>Acquire This Saree ({selectedSaree.priceFormatted})</span>
                </button>

                <Link
                  href={`/atelier?saree=${selectedSaree.id}`}
                  className="btn-outline"
                >
                  <Palette size={16} className="text-gold" />
                  <span>Customise Similar in Atelier</span>
                </Link>

                <button
                  type="button"
                  onClick={handleResetImage}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-stone)",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete Uploaded Photo</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function TryOnPage() {
  return (
    <>
      <Header />

      <div className={styles.studioWrapper}>
        <div className={styles.banner}>
          <div className="container">
            <span className="editorial-label">Private Digital Fitting Atelier</span>
            <h1 className={styles.heading}>See Yourself in Silk</h1>
            <p className={styles.subtitle}>
              “A Saree, Reimagined on You. Discover how a VAYIRA creation might look on you before making it yours.”
            </p>
          </div>
        </div>

        <Suspense fallback={<div style={{ textAlign: "center", padding: "5rem" }}>Loading Atelier Studio...</div>}>
          <TryOnStudioContent />
        </Suspense>
      </div>

      <Footer />
    </>
  );
}

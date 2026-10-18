"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/lib/cartContext";
import { 
  Sparkles, 
  Upload, 
  ShieldCheck, 
  RotateCcw, 
  ShoppingBag, 
  Palette, 
  AlertCircle,
  Eye,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import styles from "./WorkspaceTryOnView.module.css";

export default function WorkspaceTryOnView({ onGoToAtelier }) {
  const { addToCart, setIsOpen: setCartOpen } = useCart();

  const tryOnSarees = products.filter((p) => p.tryOnSupported);
  const [selectedSaree, setSelectedSaree] = useState(tryOnSarees[0]);
  const [userImage, setUserImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [resultData, setResultData] = useState(null);
  const [activeView, setActiveView] = useState("draped"); // 'original' | 'draped'
  const [errorMessage, setErrorMessage] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(false);
  const fileInputRef = useRef(null);

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
      setErrorMessage(err.message || "Failed to generate drape simulation. Please try again.");
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

  const handleAddToCart = () => {
    addToCart(selectedSaree, 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
    setCartOpen(true);
  };

  return (
    <div className={styles.tryOnWrapper}>
      {/* Editorial Header */}
      <div className={styles.headerArea}>
        <span className="editorial-label">5. AI Digital Fitting Atelier</span>
        <h2 className={styles.title}>See Yourself in Silk</h2>
        <p className={styles.description}>
          Experience how our pure Kanjeevaram, Banarasi, and Mysore silk heirlooms drape upon you before commissioning.
        </p>
      </div>

      <div className={styles.studioGrid}>
        {/* Left Column: Saree Selector */}
        <aside className={styles.selectorSidebar}>
          <div className={styles.sidebarTitle}>
            <Sparkles size={16} className="text-gold" />
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
                      handleGenerate();
                    }
                  }}
                  className={`${styles.sareeCard} ${isSelected ? styles.activeSaree : ""}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.thumbWrapper}>
                    <Image
                      src={saree.primaryImage}
                      alt={saree.name}
                      fill
                      sizes="55px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.sareeInfo}>
                    <span className={styles.sareeCollection}>{saree.collectionName}</span>
                    <strong className={styles.sareeName}>{saree.name}</strong>
                    <span className={styles.sareePrice}>{saree.priceFormatted}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {onGoToAtelier && (
            <div className={styles.atelierPromoBox}>
              <span style={{ fontSize: "0.78rem", color: "var(--color-champagne)", fontStyle: "italic" }}>
                Want a custom weave?
              </span>
              <button
                type="button"
                onClick={onGoToAtelier}
                className="btn-outline"
                style={{ padding: "6px 12px", fontSize: "0.75rem", width: "100%", marginTop: "6px" }}
              >
                <Palette size={13} />
                <span>4. Open Saree Atelier</span>
              </button>
            </div>
          )}
        </aside>

        {/* Right Column: Fitting Stage */}
        <main className={styles.stageContainer}>
          {errorMessage && (
            <div className={styles.errorAlert}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Phase 1: Upload or Demo Selection */}
          {!userImage && (
            <div className={styles.emptyStage}>
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
                <Upload size={44} className="text-gold" style={{ marginBottom: "1rem", opacity: 0.85 }} />
                <h3 className={styles.dropTitle}>Upload Your Portrait for Virtual Drape</h3>
                <p className={styles.dropDesc}>
                  Upload a clear portrait to drape the selected <strong>{selectedSaree.name}</strong> ({selectedSaree.priceFormatted}).
                </p>
                <span className="btn-outline" style={{ pointerEvents: "none" }}>
                  Choose Photo from Device
                </span>
              </div>

              {/* Fast Demo Option */}
              <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--color-stone)", marginRight: "10px" }}>
                  Or test immediately with our model:
                </span>
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className={styles.demoBtn}
                >
                  ✦ Use Editorial Demo Model
                </button>
              </div>

              {/* Privacy Banner */}
              <div className={styles.privacyBanner}>
                <ShieldCheck size={16} className="text-gold" />
                <span>
                  <strong>Strict Privacy Guarantee:</strong> Your photograph is processed in real-time memory and never stored permanently or used for model training.
                </span>
              </div>
            </div>
          )}

          {/* Phase 2: Processing Pipeline */}
          {userImage && isProcessing && (
            <div className={styles.processingView}>
              <div className={styles.crestSpin}>
                <Sparkles size={42} className="text-gold" />
              </div>
              <h3 className={styles.processingTitle}>Draping in Royal Silk...</h3>
              <p className={styles.processingSubtitle}>
                Harmonizing pure zari weft reflections with your silhouette
              </p>

              <div className={styles.stepsList}>
                <div className={`${styles.stepItem} ${processingStep >= 1 ? styles.stepDone : ""}`}>
                  <div className={styles.stepDot}>{processingStep > 1 ? "✓" : "1"}</div>
                  <span>Facial topology and shoulder alignment analysis</span>
                </div>
                <div className={`${styles.stepItem} ${processingStep >= 2 ? styles.stepDone : ""}`}>
                  <div className={styles.stepDot}>{processingStep > 2 ? "✓" : "2"}</div>
                  <span>Mapping authentic {selectedSaree.silkType} pleats & pallu drape</span>
                </div>
                <div className={`${styles.stepItem} ${processingStep >= 3 ? styles.stepDone : ""}`}>
                  <div className={styles.stepDot}>3</div>
                  <span>Rendering pure silver zari micro-reflections</span>
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Interactive Fitting Room Ready to Drape */}
          {userImage && !isProcessing && !resultData && (
            <div className={styles.readyStage}>
              <div className={styles.previewImageContainer}>
                <Image
                  src={userImage}
                  alt="Your Portrait"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className={styles.readyCard}>
                <div>
                  <span className="editorial-label" style={{ fontSize: "0.72rem", margin: 0 }}>
                    Selected for Drape
                  </span>
                  <strong style={{ display: "block", color: "var(--color-ivory)", fontSize: "1.1rem" }}>
                    {selectedSaree.name}
                  </strong>
                  <span style={{ color: "var(--color-gold)", fontSize: "0.9rem", fontWeight: 600 }}>
                    {selectedSaree.priceFormatted} • {selectedSaree.silkType}
                  </span>
                </div>

                <div className={styles.readyActions}>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="btn-primary"
                    style={{ padding: "14px 28px" }}
                  >
                    <Sparkles size={16} />
                    <span>✦ Generate Virtual Silk Drape</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetImage}
                    className="btn-outline"
                    style={{ padding: "14px 20px" }}
                  >
                    <RotateCcw size={16} />
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Phase 4: Drape Result View */}
          {userImage && !isProcessing && resultData && (
            <div className={styles.resultStage}>
              <div className={styles.resultViewBox}>
                <div className={styles.resultImageWrapper}>
                  <Image
                    src={activeView === "draped" ? (resultData.resultImageUrl || "/images/tryon-result.jpg") : userImage}
                    alt={activeView === "draped" ? "Virtual Drape Result" : "Original Portrait"}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                  <div className={styles.viewBadge}>
                    {activeView === "draped" ? "VAYIRA Virtual Drape Result" : "Original Portrait"}
                  </div>
                </div>

                {/* View Switcher Toggle */}
                <div className={styles.viewToggleBar}>
                  <button
                    type="button"
                    className={`${styles.toggleBtn} ${activeView === "draped" ? styles.toggleActive : ""}`}
                    onClick={() => setActiveView("draped")}
                  >
                    <Sparkles size={15} />
                    <span>Draped View</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.toggleBtn} ${activeView === "original" ? styles.toggleActive : ""}`}
                    onClick={() => setActiveView("original")}
                  >
                    <Eye size={15} />
                    <span>Original Photo</span>
                  </button>
                </div>
              </div>

              {/* Saree Details & Action Bar */}
              <div className={styles.resultMetaCard}>
                <div className={styles.metaInfo}>
                  <span className="editorial-label" style={{ fontSize: "0.72rem", margin: 0 }}>
                    Successfully Fitted Creation
                  </span>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-ivory)", margin: "0.25rem 0" }}>
                    {selectedSaree.name}
                  </h4>
                  <span style={{ color: "var(--color-gold)", fontSize: "1.1rem", fontWeight: 700 }}>
                    {selectedSaree.priceFormatted}
                  </span>
                  <p style={{ fontSize: "0.82rem", color: "var(--color-champagne)", fontStyle: "italic", marginTop: "0.35rem" }}>
                    {selectedSaree.silkType} • {selectedSaree.zariType} • {selectedSaree.origin}
                  </p>
                </div>

                <div className={styles.resultActions}>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-primary"
                    style={{ padding: "12px 24px" }}
                  >
                    <ShoppingBag size={18} />
                    <span>{addedFeedback ? "Added to Cart!" : "Reserve This Saree"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResultData(null);
                    }}
                    className="btn-outline"
                    style={{ padding: "12px 18px" }}
                  >
                    <RotateCcw size={16} />
                    <span>Try Another Saree</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import SareeCanvas from "@/components/atelier/SareeCanvas";
import EnquiryModal from "@/components/atelier/EnquiryModal";
import { atelierOptions, calculateAtelierPrice } from "@/data/customizationOptions";
import { products } from "@/data/products";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { saveAtelierDesign } from "@/lib/supabase";
import { 
  Palette, 
  Sparkles, 
  ShoppingBag, 
  Bookmark, 
  RotateCcw, 
  Check, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import styles from "./WorkspaceAtelierView.module.css";

export default function WorkspaceAtelierView({ onGoToTryOn }) {
  const { addToCart, setIsOpen: setCartOpen } = useCart();
  const { user } = useAuth();

  // Studio Customization State
  const [activeTab, setActiveTab] = useState("fabric"); // 'fabric' | 'border' | 'pallu' | 'blouse'
  
  const [bodyFabric, setBodyFabric] = useState(atelierOptions.bodyFabrics[0]);
  const [bodyColor, setBodyColor] = useState(atelierOptions.bodyColors[0]);
  const [bodyMotif, setBodyMotif] = useState(atelierOptions.bodyMotifs[0]);
  const [zariType, setZariType] = useState(atelierOptions.zariTypes[0]);
  const [borderStyle, setBorderStyle] = useState(atelierOptions.borderStyles[0]);
  const [borderWidth, setBorderWidth] = useState(atelierOptions.borderWidths[1]); // Classic
  const [palluStyle, setPalluStyle] = useState(atelierOptions.palluStyles[0]);
  const [blouseStyle, setBlouseStyle] = useState(atelierOptions.blouseStyles[0]);

  const [designTitle, setDesignTitle] = useState("My Bespoke Royal Silk Saree");
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Active configuration object
  const currentConfig = useMemo(() => ({
    bodyFabric,
    bodyColor,
    bodyMotif,
    zariType,
    borderStyle,
    borderWidth,
    palluStyle,
    blouseStyle,
    title: designTitle
  }), [bodyFabric, bodyColor, bodyMotif, zariType, borderStyle, borderWidth, palluStyle, blouseStyle, designTitle]);

  // Pricing calculation
  const pricing = useMemo(() => {
    return calculateAtelierPrice({
      fabricId: bodyFabric.id,
      motifId: bodyMotif.id,
      zariId: zariType.id,
      borderId: borderStyle.id,
      borderWidthId: borderWidth.id,
      palluId: palluStyle.id,
      blouseId: blouseStyle.id
    });
  }, [bodyFabric, bodyMotif, zariType, borderStyle, borderWidth, palluStyle, blouseStyle]);

  // Reset to defaults
  const handleReset = () => {
    setBodyFabric(atelierOptions.bodyFabrics[0]);
    setBodyColor(atelierOptions.bodyColors[0]);
    setBodyMotif(atelierOptions.bodyMotifs[0]);
    setZariType(atelierOptions.zariTypes[0]);
    setBorderStyle(atelierOptions.borderStyles[0]);
    setBorderWidth(atelierOptions.borderWidths[1]);
    setPalluStyle(atelierOptions.palluStyles[0]);
    setBlouseStyle(atelierOptions.blouseStyles[0]);
  };

  // Save design
  const handleSaveDesign = async () => {
    const res = await saveAtelierDesign({
      userId: user?.id || null,
      title: designTitle,
      designConfig: currentConfig,
      estimatedPrice: pricing.total,
      previewData: bodyColor.hex
    });

    if (res.success) {
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 3000);
    }
  };

  // Add custom design to Cart
  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-saree-${Date.now()}`,
      slug: "bespoke-atelier-creation",
      name: `${designTitle} (${bodyColor.name} ${bodyFabric.name.split(" ")[0]})`,
      collectionName: "Bespoke Atelier Commission",
      price: pricing.total,
      priceFormatted: pricing.formatted,
      primaryImage: "/images/hero-saree.jpg",
      silkType: bodyFabric.name,
      origin: "VAYIRA Master Loom",
      zariType: zariType.name
    };

    addToCart(customProduct, 1, currentConfig);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
    setCartOpen(true);
  };

  return (
    <div className={styles.atelierWrapper}>
      {/* Editorial Header */}
      <div className={styles.headerArea}>
        <span className="editorial-label">4. Private Bespoke Atelier</span>
        <h2 className={styles.title}>The Royal Saree Customizer</h2>
        <p className={styles.description}>
          Compose your personal heirloom with master handloom weavers. Adjust silk weave, zari purity, border architecture, and pallu grandeur in real time.
        </p>
      </div>

      <div className={styles.atelierGrid}>
        {/* Left: Dynamic Real-time Canvas Stage */}
        <div className={styles.canvasStage}>
          <SareeCanvas config={currentConfig} />

          {/* Quick Info Bar underneath Canvas */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.82rem", color: "var(--color-stone)" }}>
              <Clock size={16} className="text-gold" />
              <span>Loom Weaving Schedule: ~{pricing.estimatedDays} Days</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-stone"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: 5 }}
            >
              <RotateCcw size={12} />
              <span>Reset Configuration</span>
            </button>
          </div>

          {/* Cross-feature Try-On Bridge */}
          {onGoToTryOn && (
            <div className={styles.bridgeCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Sparkles size={20} className="text-gold" />
                <div>
                  <strong style={{ display: "block", color: "var(--color-ivory)", fontSize: "0.9rem" }}>
                    Drape This Custom Creation in AI Studio
                  </strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-champagne)", fontStyle: "italic" }}>
                    See how your chosen {bodyColor.name} silk looks on you before ordering.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onGoToTryOn}
                className="btn-outline"
                style={{ padding: "8px 18px", fontSize: "0.8rem", whiteSpace: "nowrap" }}
              >
                <span>5. Try-On Studio</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Right: Bespoke Customization Controls */}
        <div className={styles.controlsPanel}>
          {/* Customizer Tabs */}
          <div className={styles.tabNav} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "fabric"}
              className={`${styles.tabBtn} ${activeTab === "fabric" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("fabric")}
            >
              1. Fabric & Color
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "border"}
              className={`${styles.tabBtn} ${activeTab === "border" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("border")}
            >
              2. Border & Zari
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "pallu"}
              className={`${styles.tabBtn} ${activeTab === "pallu" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("pallu")}
            >
              3. Pallu Art
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "blouse"}
              className={`${styles.tabBtn} ${activeTab === "blouse" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("blouse")}
            >
              4. Blouse Piece
            </button>
          </div>

          {/* TAB 1: FABRIC & COLOR */}
          {activeTab === "fabric" && (
            <div className={styles.tabContent}>
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>Select Base Silk Heritage</label>
                <div className={styles.cardsGrid}>
                  {atelierOptions.bodyFabrics.map((fabric) => {
                    const isSelected = bodyFabric.id === fabric.id;
                    return (
                      <div
                        key={fabric.id}
                        onClick={() => setBodyFabric(fabric)}
                        className={`${styles.selectCard} ${isSelected ? styles.selectedCard : ""}`}
                        role="button"
                        tabIndex={0}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <strong className={styles.cardTitle}>{fabric.name}</strong>
                          {isSelected && <Check size={16} className="text-gold" />}
                        </div>
                        <p className={styles.cardDesc}>{fabric.description}</p>
                        <span className={styles.cardOrigin}>{fabric.origin}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Body Color Picker */}
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>
                  Royal Silk Body Color: <span className="text-gold">{bodyColor.name}</span>
                </label>
                <div className={styles.colorSwatches}>
                  {atelierOptions.bodyColors.map((color) => {
                    const isSelected = bodyColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setBodyColor(color)}
                        className={`${styles.swatchBtn} ${isSelected ? styles.selectedSwatch : ""}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      >
                        {isSelected && <Check size={16} color={color.hex === "#EED9B3" ? "#1A060D" : "#FFF"} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body Motifs (Buttas) */}
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>Weft Body Motifs (Buttas)</label>
                <div className={styles.chipsRow}>
                  {atelierOptions.bodyMotifs.map((motif) => {
                    const isSelected = bodyMotif.id === motif.id;
                    return (
                      <button
                        key={motif.id}
                        type="button"
                        onClick={() => setBodyMotif(motif)}
                        className={`${styles.chipBtn} ${isSelected ? styles.selectedChip : ""}`}
                      >
                        {motif.name}
                        {motif.surcharge > 0 && <span className={styles.chipPrice}>+₹{motif.surcharge.toLocaleString("en-IN")}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BORDER & ZARI */}
          {activeTab === "border" && (
            <div className={styles.tabContent}>
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>Zari Purity & Patina</label>
                <div className={styles.cardsGrid}>
                  {atelierOptions.zariTypes.map((zari) => {
                    const isSelected = zariType.id === zari.id;
                    return (
                      <div
                        key={zari.id}
                        onClick={() => setZariType(zari)}
                        className={`${styles.selectCard} ${isSelected ? styles.selectedCard : ""}`}
                        role="button"
                        tabIndex={0}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <strong className={styles.cardTitle}>{zari.name}</strong>
                          {isSelected && <Check size={16} className="text-gold" />}
                        </div>
                        <p className={styles.cardDesc}>{zari.description}</p>
                        <span className={styles.cardOrigin}>{zari.certification}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Border Architecture */}
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>Border Motif Architecture</label>
                <div className={styles.chipsRow}>
                  {atelierOptions.borderStyles.map((bStyle) => {
                    const isSelected = borderStyle.id === bStyle.id;
                    return (
                      <button
                        key={bStyle.id}
                        type="button"
                        onClick={() => setBorderStyle(bStyle)}
                        className={`${styles.chipBtn} ${isSelected ? styles.selectedChip : ""}`}
                      >
                        {bStyle.name}
                        {bStyle.surcharge > 0 && <span className={styles.chipPrice}>+₹{bStyle.surcharge.toLocaleString("en-IN")}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Border Width */}
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>Border Width Scale</label>
                <div className={styles.chipsRow}>
                  {atelierOptions.borderWidths.map((bWidth) => {
                    const isSelected = borderWidth.id === bWidth.id;
                    return (
                      <button
                        key={bWidth.id}
                        type="button"
                        onClick={() => setBorderWidth(bWidth)}
                        className={`${styles.chipBtn} ${isSelected ? styles.selectedChip : ""}`}
                      >
                        {bWidth.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PALLU ART */}
          {activeTab === "pallu" && (
            <div className={styles.tabContent}>
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>Pallu Architecture & Grandeur</label>
                <div className={styles.cardsGrid}>
                  {atelierOptions.palluStyles.map((pallu) => {
                    const isSelected = palluStyle.id === pallu.id;
                    return (
                      <div
                        key={pallu.id}
                        onClick={() => setPalluStyle(pallu)}
                        className={`${styles.selectCard} ${isSelected ? styles.selectedCard : ""}`}
                        role="button"
                        tabIndex={0}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <strong className={styles.cardTitle}>{pallu.name}</strong>
                          {isSelected && <Check size={16} className="text-gold" />}
                        </div>
                        <p className={styles.cardDesc}>{pallu.description}</p>
                        {pallu.surcharge > 0 && (
                          <span className={styles.chipPrice} style={{ marginTop: "0.5rem", display: "inline-block" }}>
                            +₹{pallu.surcharge.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLOUSE PIECE */}
          {activeTab === "blouse" && (
            <div className={styles.tabContent}>
              <div className={styles.optionGroup}>
                <label className={styles.groupLabel}>Coordinating Blouse Fabric Style</label>
                <div className={styles.cardsGrid}>
                  {atelierOptions.blouseStyles.map((blouse) => {
                    const isSelected = blouseStyle.id === blouse.id;
                    return (
                      <div
                        key={blouse.id}
                        onClick={() => setBlouseStyle(blouse)}
                        className={`${styles.selectCard} ${isSelected ? styles.selectedCard : ""}`}
                        role="button"
                        tabIndex={0}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <strong className={styles.cardTitle}>{blouse.name}</strong>
                          {isSelected && <Check size={16} className="text-gold" />}
                        </div>
                        <p className={styles.cardDesc}>{blouse.description}</p>
                        {blouse.surcharge > 0 && (
                          <span className={styles.chipPrice} style={{ marginTop: "0.5rem", display: "inline-block" }}>
                            +₹{blouse.surcharge.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Transparent Live Price Calculation & Commission Actions */}
          <div className={styles.pricingSection}>
            <div className={styles.priceRow}>
              <div>
                <span className="editorial-label" style={{ fontSize: "0.75rem", margin: 0 }}>
                  Estimated Atelier Price
                </span>
                <span className={styles.totalPrice}>{pricing.formatted}</span>
              </div>
              <div style={{ textAlign: "right", fontSize: "0.8rem", color: "var(--color-stone)" }}>
                <span>Inclusive of certified pure silk & zari</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtonGroup}>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, padding: "14px 20px" }}
              >
                <ShoppingBag size={18} />
                <span>{addedFeedback ? "Reserved to Cart!" : "Reserve on Loom"}</span>
              </button>

              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="btn-outline"
                style={{ padding: "14px 20px" }}
              >
                <span>Curator Enquiry</span>
              </button>
            </div>

            {/* Save to Portfolio */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
              <button
                type="button"
                onClick={handleSaveDesign}
                style={{
                  background: "none",
                  border: "none",
                  color: savedFeedback ? "#86efac" : "var(--color-gold)",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <Bookmark size={14} />
                <span>{savedFeedback ? "Saved in Your Royal Dossier!" : "Save Design to Portfolio"}</span>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--color-stone)" }}>
                <ShieldCheck size={14} className="text-gold" />
                <span>100% Silk Mark Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curator Consultation Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          config={currentConfig}
          pricing={pricing}
        />
      )}
    </div>
  );
}

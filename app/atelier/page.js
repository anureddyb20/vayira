"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  ChevronRight
} from "lucide-react";
import styles from "./page.module.css";

function AtelierStudioContent() {
  const searchParams = useSearchParams();
  const sareeQuery = searchParams.get("saree");
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Initial reference saree if passed
  const initialSaree = products.find((p) => p.id === sareeQuery);

  // Studio Customization State
  const [activeTab, setActiveTab] = useState("fabric"); // 'fabric' | 'border' | 'pallu' | 'blouse'
  
  const [bodyFabric, setBodyFabric] = useState(atelierOptions.bodyFabrics[0]);
  const [bodyColor, setBodyColor] = useState(
    initialSaree
      ? atelierOptions.bodyColors.find((c) => c.name.toLowerCase().includes(initialSaree.colorFamily.toLowerCase())) || atelierOptions.bodyColors[0]
      : atelierOptions.bodyColors[0]
  );
  const [bodyMotif, setBodyMotif] = useState(atelierOptions.bodyMotifs[0]);
  const [zariType, setZariType] = useState(atelierOptions.zariTypes[0]);
  const [borderStyle, setBorderStyle] = useState(atelierOptions.borderStyles[0]);
  const [borderWidth, setBorderWidth] = useState(atelierOptions.borderWidths[1]); // Classic
  const [palluStyle, setPalluStyle] = useState(atelierOptions.palluStyles[0]);
  const [blouseStyle, setBlouseStyle] = useState(atelierOptions.blouseStyles[0]);

  const [designTitle, setDesignTitle] = useState("My Bespoke Royal Silk Saree");
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

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

  // Transparent pricing calculation
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

  // Reset to Atelier defaults
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

  // Save design to Supabase or local storage
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
  };

  return (
    <div className="container">
      <div className={styles.atelierGrid}>
        {/* Left: Dynamic Real-time Canvas Stage */}
        <div className={styles.canvasStage}>
          <SareeCanvas config={currentConfig} />

          {/* Quick Controls Bar underneath Canvas */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.82rem", color: "var(--color-stone)" }}>
              <Clock size={16} className="text-gold" />
              <span>Loom Weaving Schedule: ~{pricing.estimatedDays} Days</span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-stone)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.78rem",
                textDecoration: "underline"
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Atelier Defaults</span>
            </button>
          </div>
        </div>

        {/* Right: Customization Controls Panel */}
        <div className={styles.controlsPanel}>
          {/* Tab Navigation */}
          <div className={styles.tabNav}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "fabric" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("fabric")}
            >
              1. Fabric & Color
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "border" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("border")}
            >
              2. Border & Zari
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "pallu" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("pallu")}
            >
              3. Pallu & Motifs
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "blouse" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("blouse")}
            >
              4. Blouse Piece
            </button>
          </div>

          {/* TAB 1: Foundation Silk & Color */}
          {activeTab === "fabric" && (
            <div>
              <span className="editorial-label">Silk Foundation</span>
              <div className={styles.optionGrid}>
                {atelierOptions.bodyFabrics.map((fabric) => (
                  <div
                    key={fabric.id}
                    className={`${styles.optionCard} ${bodyFabric.id === fabric.id ? styles.activeOption : ""}`}
                    onClick={() => setBodyFabric(fabric)}
                  >
                    <div>
                      <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--color-ivory)", display: "block" }}>
                        {fabric.name}
                      </strong>
                      <span style={{ fontSize: "0.8rem", color: "var(--color-stone)" }}>
                        {fabric.description}
                      </span>
                    </div>
                    {bodyFabric.id === fabric.id && <Check size={18} className="text-gold" />}
                  </div>
                ))}
              </div>

              {/* Color Swatches */}
              <div style={{ marginTop: "2rem" }}>
                <span className="editorial-label">Aristocratic Color Palette</span>
                <p style={{ fontSize: "0.82rem", color: "var(--color-champagne)", marginTop: "4px" }}>
                  Selected: <strong>{bodyColor.name}</strong> ({bodyColor.category})
                </p>
                <div className={styles.swatchGrid}>
                  {atelierOptions.bodyColors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      title={`${color.name} (${color.category})`}
                      className={`${styles.swatchBtn} ${bodyColor.id === color.id ? styles.activeSwatch : ""}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setBodyColor(color)}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Border & Zari */}
          {activeTab === "border" && (
            <div>
              {/* Zari Metallurgy */}
              <span className="editorial-label">Zari Metallurgy & Tone</span>
              <div className={styles.optionGrid}>
                {atelierOptions.zariTypes.map((zari) => (
                  <div
                    key={zari.id}
                    className={`${styles.optionCard} ${zariType.id === zari.id ? styles.activeOption : ""}`}
                    onClick={() => setZariType(zari)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: zari.color, border: "1px solid #ffffff" }} />
                      <div>
                        <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--color-ivory)", display: "block" }}>
                          {zari.name}
                        </strong>
                        <span style={{ fontSize: "0.78rem", color: "var(--color-stone)" }}>
                          {zari.description}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.82rem", color: "var(--color-gold)", fontWeight: 600 }}>
                      {zari.priceDelta === 0 ? "Included" : `+₹${zari.priceDelta.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Border Motif Style */}
              <div style={{ marginTop: "2rem" }}>
                <span className="editorial-label">Korvai Border Architecture</span>
                <div className={styles.optionGrid}>
                  {atelierOptions.borderStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`${styles.optionCard} ${borderStyle.id === style.id ? styles.activeOption : ""}`}
                      onClick={() => setBorderStyle(style)}
                    >
                      <div>
                        <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--color-ivory)", display: "block" }}>
                          {style.name}
                        </strong>
                        <span style={{ fontSize: "0.78rem", color: "var(--color-stone)" }}>
                          {style.description}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.82rem", color: "var(--color-gold)", fontWeight: 600 }}>
                        +₹{style.priceDelta.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Width Scale */}
              <div style={{ marginTop: "2rem" }}>
                <span className="editorial-label">Border Width Dimension</span>
                <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
                  {atelierOptions.borderWidths.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setBorderWidth(w)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        fontSize: "0.82rem",
                        background: borderWidth.id === w.id ? "var(--color-gold)" : "rgba(22, 5, 11, 0.6)",
                        color: borderWidth.id === w.id ? "var(--color-ink-deep)" : "var(--color-ivory)",
                        border: borderWidth.id === w.id ? "1px solid var(--color-gold)" : "1px solid rgba(180, 154, 97, 0.25)",
                        borderRadius: "2px",
                        cursor: "pointer",
                        fontWeight: borderWidth.id === w.id ? 700 : 500
                      }}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Pallu & Motifs */}
          {activeTab === "pallu" && (
            <div>
              <span className="editorial-label">Grand Pallu Tapestry</span>
              <div className={styles.optionGrid}>
                {atelierOptions.palluStyles.map((pallu) => (
                  <div
                    key={pallu.id}
                    className={`${styles.optionCard} ${palluStyle.id === pallu.id ? styles.activeOption : ""}`}
                    onClick={() => setPalluStyle(pallu)}
                  >
                    <div>
                      <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--color-ivory)", display: "block" }}>
                        {pallu.name}
                      </strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--color-stone)" }}>
                        {pallu.description}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.82rem", color: "var(--color-gold)", fontWeight: 600 }}>
                      +₹{pallu.priceDelta.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Body Motifs / Buttas */}
              <div style={{ marginTop: "2rem" }}>
                <span className="editorial-label">Body Butta Engravings</span>
                <div className={styles.optionGrid}>
                  {atelierOptions.bodyMotifs.map((motif) => (
                    <div
                      key={motif.id}
                      className={`${styles.optionCard} ${bodyMotif.id === motif.id ? styles.activeOption : ""}`}
                      onClick={() => setBodyMotif(motif)}
                    >
                      <div>
                        <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--color-ivory)", display: "block" }}>
                          {motif.name}
                        </strong>
                      </div>
                      <span style={{ fontSize: "0.82rem", color: "var(--color-gold)", fontWeight: 600 }}>
                        {motif.priceDelta === 0 ? "Standard" : `+₹${motif.priceDelta.toLocaleString("en-IN")}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Blouse Piece */}
          {activeTab === "blouse" && (
            <div>
              <span className="editorial-label">Blouse Piece Styling (0.8m - 1.0m Pure Silk)</span>
              <div className={styles.optionGrid}>
                {atelierOptions.blouseStyles.map((blouse) => (
                  <div
                    key={blouse.id}
                    className={`${styles.optionCard} ${blouseStyle.id === blouse.id ? styles.activeOption : ""}`}
                    onClick={() => setBlouseStyle(blouse)}
                  >
                    <div>
                      <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--color-ivory)", display: "block" }}>
                        {blouse.name}
                      </strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--color-stone)" }}>
                        {blouse.description}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.82rem", color: "var(--color-gold)", fontWeight: 600 }}>
                      {blouse.priceDelta === 0 ? "Coordinated" : `+₹${blouse.priceDelta.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transparent Pricing & Actions */}
          <div className={styles.pricingBox}>
            <div className={styles.priceHeader}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.85rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-stone)" }}>
                Estimated Loom Investment
              </span>
              <span className={styles.totalPrice}>{pricing.formatted}</span>
            </div>

            {/* Price breakdown summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.78rem", color: "var(--color-stone)", borderTop: "1px solid rgba(180, 154, 97, 0.15)", paddingTop: "8px" }}>
              {pricing.breakdown.filter(b => b.price > 0).map((b, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{b.item}</span>
                  <span style={{ color: "var(--color-ivory)" }}>₹{b.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={styles.actionRow}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setEnquiryModalOpen(true)}
              >
                <span>Commission Master Weaver Consultation</span>
                <ChevronRight size={16} />
              </button>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ flex: 1 }}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={handleSaveDesign}
                  title="Save to My Account"
                >
                  <Bookmark size={16} className={savedFeedback ? "text-gold" : ""} />
                  <span>{savedFeedback ? "Saved!" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Submission Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          config={currentConfig}
          pricing={pricing}
          onClose={() => setEnquiryModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function AtelierPage() {
  return (
    <>
      <Header />

      <main className={styles.studioWrapper}>
        <div className={styles.banner}>
          <div className="container">
            <span className="editorial-label">Bespoke Handloom Customization</span>
            <h1 className={styles.heading}>The VAYIRA Saree Atelier</h1>
            <p className={styles.subtitle}>
              “Your Vision. Your Colours. Your Saree. From the body colour to the zari border, begin with an idea and make it your own.”
            </p>
          </div>
        </div>

        <Suspense fallback={<div style={{ textAlign: "center", padding: "5rem" }}>Loading Atelier Engine...</div>}>
          <AtelierStudioContent />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

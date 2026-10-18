"use client";

import { useState } from "react";
import Image from "next/image";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import QuickViewModal from "@/components/catalogue/QuickViewModal";
import { useCart } from "@/lib/cartContext";
import { 
  Sparkles, 
  Palette, 
  ShoppingBag, 
  Eye, 
  Check, 
  Filter, 
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import styles from "./WorkspaceCollectionsView.module.css";

export default function WorkspaceCollectionsView({ onSelectTryOn, onSelectAtelier }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const { addToCart, setIsOpen: setCartOpen } = useCart();

  const filterTabs = [
    { id: "all", label: "All 12 Heirlooms" },
    { id: "kanjeevaram", label: "Kanjeevaram" },
    { id: "banarasi", label: "Banarasi" },
    { id: "mysore", label: "Mysore Silk" },
    { id: "bridal", label: "Bridal Heirlooms" },
    { id: "paithani", label: "Royal Paithani" },
    { id: "chanderi", label: "Chanderi Tissue" },
    { id: "tussar-muga", label: "Assam Muga" },
    { id: "contemporary", label: "Contemporary" },
  ];

  const filteredProducts = selectedFilter === "all"
    ? products
    : products.filter((p) => p.collectionId === selectedFilter);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
    setCartOpen(true);
  };

  return (
    <div className={styles.collectionsWrapper}>
      {/* Editorial Header */}
      <div className={styles.headerArea}>
        <span className="editorial-label">3. The Royal Silk Collections</span>
        <h2 className={styles.title}>8 Archives of Timeless Handloom</h2>
        <p className={styles.description}>
          Every VAYIRA saree is crafted from three-ply mulberry silk with certified tested zari, spun over weeks on authentic wooden pit looms.
        </p>
      </div>

      {/* 8 Regional Archives Showcase */}
      <div className={styles.archivesScroll}>
        {collections.map((col) => (
          <div 
            key={col.id} 
            className={`${styles.archivePill} ${selectedFilter === col.id ? styles.activeArchivePill : ""}`}
            onClick={() => setSelectedFilter(selectedFilter === col.id ? "all" : col.id)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.archivePillImg}>
              <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="50px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <strong className={styles.archivePillName}>{col.name}</strong>
              <span className={styles.archivePillOrigin}>{col.origin}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs Bar */}
      <div className={styles.filtersBar}>
        <div className={styles.filterTabsList}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === tab.id ? styles.activeFilter : ""}`}
              onClick={() => setSelectedFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--color-stone)", whiteSpace: "nowrap" }}>
          Showing {filteredProducts.length} certified sarees
        </span>
      </div>

      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageStage}>
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImg}
                />
                
                {/* Provenance Badge */}
                <span className={styles.originTag}>
                  {product.origin?.split(",")[0] || "Handloom"}
                </span>

                {/* Quick Action Overlay */}
                <div className={styles.actionOverlay}>
                  <button
                    type="button"
                    onClick={() => setActiveQuickView(product)}
                    className={styles.overlayBtn}
                    title="Quick Details"
                  >
                    <Eye size={15} />
                    <span>Quick View</span>
                  </button>

                  {onSelectTryOn && (
                    <button
                      type="button"
                      onClick={() => onSelectTryOn(product)}
                      className={`${styles.overlayBtn} ${styles.overlayBtnGold}`}
                      title="Try On in AI Studio"
                    >
                      <Sparkles size={15} />
                      <span>5. Try On</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className={styles.cardBody}>
                <span className={styles.collectionTitle}>{product.collectionName}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                
                <div className={styles.specsRow}>
                  <span>{product.silkType}</span>
                  <span>•</span>
                  <span>{product.zariType?.split(" ")[0]} Zari</span>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.price}>{product.priceFormatted}</span>

                  <div style={{ display: "flex", gap: "6px" }}>
                    {onSelectAtelier && (
                      <button
                        type="button"
                        onClick={() => onSelectAtelier(product)}
                        className={styles.iconActionBtn}
                        title="Customize in Atelier"
                        aria-label="Customize in Atelier"
                      >
                        <Palette size={16} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={styles.cartActionBtn}
                      title="Reserve Saree"
                    >
                      <ShoppingBag size={15} />
                      <span>{addedId === product.id ? "Reserved" : "Reserve"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {activeQuickView && (
        <QuickViewModal
          product={activeQuickView}
          onClose={() => setActiveQuickView(null)}
          onSelectTryOn={onSelectTryOn}
        />
      )}
    </div>
  );
}

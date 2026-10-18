"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/catalogue/ProductCard";
import QuickViewModal from "@/components/catalogue/QuickViewModal";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CuratedProductsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeQuickView, setActiveQuickView] = useState(null);

  const filterTabs = [
    { id: "all", label: "All Heirlooms" },
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

  return (
    <section className="section" style={{ padding: "6rem 0 8rem", background: "#170409" }} aria-label="Curated Silk Heirlooms">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="editorial-label">Selected Atelier Creations</span>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            letterSpacing: "0.14em",
            color: "var(--color-ivory)",
            marginTop: "0.75rem",
            marginBottom: "1rem"
          }}>
            The Curated Heirlooms Archive
          </h2>
          <p style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "var(--color-champagne)",
            maxWidth: "640px",
            margin: "0 auto"
          }}>
            “Each creation is unrepeatable, possessing the warmth of the artisan hands that formed it.”
          </p>

          {/* Filter Pills */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
            marginTop: "2.5rem"
          }}>
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  background: selectedFilter === tab.id ? "var(--color-gold)" : "rgba(32, 7, 15, 0.6)",
                  color: selectedFilter === tab.id ? "var(--color-ink-deep)" : "var(--color-stone)",
                  border: selectedFilter === tab.id ? "1px solid var(--color-gold)" : "1px solid rgba(180, 154, 97, 0.25)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontWeight: selectedFilter === tab.id ? 700 : 500,
                  transition: "all 0.3s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "2.5rem",
          marginBottom: "4rem"
        }}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setActiveQuickView(p)}
            />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/collections" className="btn-outline">
            <span>Explore All Certified Silk Heirlooms</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {activeQuickView && (
        <QuickViewModal
          product={activeQuickView}
          onClose={() => setActiveQuickView(null)}
        />
      )}
    </section>
  );
}

"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalogue/ProductCard";
import QuickViewModal from "@/components/catalogue/QuickViewModal";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter } from "lucide-react";

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [selectedSilkType, setSelectedSilkType] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique silk types & color families
  const silkTypes = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.silkType)));
  }, []);

  const colorFamilies = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.colorFamily)));
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCol = p.collectionName.toLowerCase().includes(q);
          const matchSilk = p.silkType.toLowerCase().includes(q);
          const matchOrigin = p.origin?.toLowerCase().includes(q);
          if (!matchName && !matchCol && !matchSilk && !matchOrigin) return false;
        }

        // Collection filter
        if (selectedCollection !== "all" && p.collectionId !== selectedCollection) {
          return false;
        }

        // Silk Type filter
        if (selectedSilkType !== "all" && p.silkType !== selectedSilkType) {
          return false;
        }

        // Color filter
        if (selectedColor !== "all" && p.colorFamily !== selectedColor) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0; // default featured order
      });
  }, [searchQuery, selectedCollection, selectedSilkType, selectedColor, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCollection("all");
    setSelectedSilkType("all");
    setSelectedColor("all");
    setSortBy("featured");
  };

  const hasActiveFilters = searchQuery || selectedCollection !== "all" || selectedSilkType !== "all" || selectedColor !== "all";

  return (
    <>
      <Header />

      <main style={{ paddingTop: "var(--header-height)", minHeight: "100vh", background: "#16040A" }}>
        {/* Editorial Banner */}
        <div style={{
          padding: "5rem 0 3.5rem",
          background: "linear-gradient(180deg, #220710 0%, #16040A 100%)",
          borderBottom: "1px solid rgba(180, 154, 97, 0.2)",
          textAlign: "center"
        }}>
          <div className="container">
            <span className="editorial-label">The Complete Textile Archive</span>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              letterSpacing: "0.14em",
              color: "var(--color-ivory)",
              marginTop: "0.75rem",
              marginBottom: "1rem"
            }}>
              Curated Silk Heirlooms
            </h1>
            <p style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: "var(--color-champagne)",
              maxWidth: "680px",
              margin: "0 auto"
            }}>
              “Explore authentic Kanjeevaram, Banarasi, and Mysore handloom silks certified by the Silk Mark Organisation of India.”
            </p>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="container" style={{ padding: "2.5rem 2rem 4rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid rgba(180, 154, 97, 0.2)",
            marginBottom: "2.5rem"
          }}>
            {/* Search Input */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(32, 7, 15, 0.8)",
              border: "1px solid rgba(180, 154, 97, 0.35)",
              borderRadius: "2px",
              padding: "10px 16px",
              minWidth: "280px",
              flex: "1 1 320px",
              maxWidth: "480px"
            }}>
              <Search size={16} className="text-stone" />
              <input
                type="text"
                placeholder="Search by silk, motif, region or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-ivory)",
                  outline: "none",
                  width: "100%",
                  fontSize: "0.85rem"
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", color: "var(--color-stone)", cursor: "pointer" }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              {/* Collection Filter */}
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                style={{
                  background: "rgba(32, 7, 15, 0.8)",
                  border: "1px solid rgba(180, 154, 97, 0.35)",
                  color: "var(--color-ivory)",
                  padding: "10px 14px",
                  borderRadius: "2px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  outline: "none"
                }}
              >
                <option value="all">All Collections</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>

              {/* Color Filter */}
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                style={{
                  background: "rgba(32, 7, 15, 0.8)",
                  border: "1px solid rgba(180, 154, 97, 0.35)",
                  color: "var(--color-ivory)",
                  padding: "10px 14px",
                  borderRadius: "2px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  outline: "none"
                }}
              >
                <option value="all">All Colors</option>
                {colorFamilies.map((color) => (
                  <option key={color} value={color}>
                    {color} Palette
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: "rgba(32, 7, 15, 0.8)",
                  border: "1px solid rgba(180, 154, 97, 0.35)",
                  color: "var(--color-gold-light)",
                  padding: "10px 14px",
                  borderRadius: "2px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  outline: "none",
                  fontWeight: 600
                }}
              >
                <option value="featured">Featured Heirlooms</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-stone)",
                    fontSize: "0.78rem",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Result Count Status */}
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--color-stone)", letterSpacing: "0.08em" }}>
              Showing {filteredProducts.length} certified silk {filteredProducts.length === 1 ? "heirloom" : "heirlooms"}
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 2rem", background: "rgba(32, 7, 15, 0.3)", borderRadius: "4px", border: "1px dashed rgba(180, 154, 97, 0.3)" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-ivory)", marginBottom: "0.5rem" }}>
                No sarees found matching your criteria
              </p>
              <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Try modifying your search or resetting the selected filters.
              </p>
              <button type="button" onClick={clearAllFilters} className="btn-primary">
                View All Heirlooms
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2.5rem"
            }}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setActiveQuickView(p)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Quick View Modal */}
      {activeQuickView && (
        <QuickViewModal
          product={activeQuickView}
          onClose={() => setActiveQuickView(null)}
        />
      )}

      <Footer />
    </>
  );
}

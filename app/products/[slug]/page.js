"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalogue/ProductCard";
import QuickViewModal from "@/components/catalogue/QuickViewModal";
import { products } from "@/data/products";
import { useCart } from "@/lib/cartContext";
import { 
  Sparkles, 
  ShoppingBag, 
  Palette, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Award, 
  Truck, 
  Clock,
  ArrowRight
} from "lucide-react";
import styles from "./page.module.css";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(
    product ? product.primaryImage : "/images/hero-saree.jpg"
  );
  const [openAccordion, setOpenAccordion] = useState("specs");
  const [activeQuickView, setActiveQuickView] = useState(null);

  if (!product) {
    notFound();
  }

  const galleryImages = product.gallery?.length ? product.gallery : [product.primaryImage];
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.collectionId === product.collectionId || p.colorFamily === product.colorFamily))
    .slice(0, 3);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <>
      <Header />

      <main className={styles.pageWrapper}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className={styles.breadcrumbBar}>
            <Link href="/" className={styles.breadcrumbLink}>VAYIRA</Link>
            <span>/</span>
            <Link href="/collections" className={styles.breadcrumbLink}>Collections</Link>
            <span>/</span>
            <Link href={`/collections/${product.collectionId}`} className={styles.breadcrumbLink}>
              {product.collectionName}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--color-ivory)" }}>{product.name}</span>
          </div>

          {/* Main Product Layout */}
          <div className={styles.productLayout}>
            {/* Gallery Column */}
            <div className={styles.galleryCol}>
              <div className={styles.mainStage}>
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={styles.mainImg}
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className={styles.thumbRow}>
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.thumbBtn} ${selectedImage === img ? styles.activeThumb : ""}`}
                      onClick={() => setSelectedImage(img)}
                      aria-label={`View angle ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        sizes="90px"
                        className={styles.thumbImg}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Certified Trust Badges */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1.5rem",
                padding: "1.25rem",
                background: "rgba(32, 7, 15, 0.4)",
                border: "1px solid rgba(180, 154, 97, 0.2)",
                borderRadius: "2px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.78rem", color: "var(--color-stone-light)" }}>
                  <Award size={18} className="text-gold" />
                  <span>{product.markCertified}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.78rem", color: "var(--color-stone-light)" }}>
                  <Clock size={18} className="text-gold" />
                  <span>{product.weavingDuration}</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className={styles.infoCol}>
              <span className={styles.collectionTag}>{product.collectionName}</span>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <div className={styles.priceTag}>{product.priceFormatted}</div>

              {product.editorialQuote && (
                <div className={styles.editorialQuote}>
                  “{product.editorialQuote}”
                </div>
              )}

              <p className={styles.description}>
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className={styles.actionGrid}>
                {/* 1. Add to Cart */}
                <button
                  type="button"
                  onClick={() => addToCart(product, 1)}
                  className="btn-primary"
                  style={{ width: "100%", padding: "16px", fontSize: "0.92rem" }}
                >
                  <ShoppingBag size={18} />
                  <span>Acquire Heirloom & Reserve Loom</span>
                </button>

                {/* 2. AI Try-On Studio Direct Link */}
                <Link
                  href={`/try-on?saree=${product.id}`}
                  className="btn-outline"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <Sparkles size={18} className="text-gold" />
                  <span>See Yourself in this Saree (AI Try-On)</span>
                </Link>

                {/* 3. Reimagine in Atelier */}
                <Link
                  href={`/atelier?saree=${product.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: "var(--color-stone)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "8px 0"
                  }}
                >
                  <Palette size={14} className="text-gold" />
                  <span>Reimagine this Weave in the Atelier Studio</span>
                </Link>
              </div>

              {/* Specifications & Craft Accordion Dossier */}
              <div className={styles.specsAccordion}>
                {/* Item 1: Specifications */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion("specs")}
                  >
                    <span>Textile Specifications & Dimensions</span>
                    {openAccordion === "specs" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openAccordion === "specs" && (
                    <div className={styles.accordionBody}>
                      {product.specifications?.map((spec, i) => (
                        <div key={i} className={styles.specRow}>
                          <span style={{ color: "var(--color-stone)" }}>{spec.label}</span>
                          <strong>{spec.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Item 2: Zari & Weave Craft */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion("craft")}
                  >
                    <span>Zari Metallics & Loom Heritage</span>
                    {openAccordion === "craft" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openAccordion === "craft" && (
                    <div className={styles.accordionBody}>
                      <div className={styles.specRow}>
                        <span>Zari Specification</span>
                        <strong>{product.zariType}</strong>
                      </div>
                      <div className={styles.specRow}>
                        <span>Zari Weight (Tested)</span>
                        <strong>{product.zariWeight || "Authentic Weight Certified"}</strong>
                      </div>
                      <div className={styles.specRow}>
                        <span>Border Dimension</span>
                        <strong>{product.borderWidth}</strong>
                      </div>
                      <div className={styles.specRow}>
                        <span>Pallu Design</span>
                        <strong>{product.palluPattern}</strong>
                      </div>
                      <div className={styles.specRow}>
                        <span>Blouse Piece Included</span>
                        <strong>{product.blouseIncluded ? "Yes (0.8m Pure Silk with Zari Border)" : "No"}</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Item 3: Care & Heirloom Preservation */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion("care")}
                  >
                    <span>Heirloom Preservation & Care</span>
                    {openAccordion === "care" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openAccordion === "care" && (
                    <div className={styles.accordionBody}>
                      <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: 8 }}>
                        {product.careInstructions?.map((care, i) => (
                          <li key={i}>{care}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Item 4: Royal Insured Delivery */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion("shipping")}
                  >
                    <span>White-Glove Royal Delivery</span>
                    {openAccordion === "shipping" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openAccordion === "shipping" && (
                    <div className={styles.accordionBody}>
                      <p>
                        Every VAYIRA acquisition is insured in transit and presented in our signature aromatic cedar box lined with hand-spun unbleached muslin wrap. Delivered within 3-5 business days across India via dedicated white-glove courier.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Heirlooms */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "4rem", paddingTop: "4rem", borderTop: "1px solid rgba(180, 154, 97, 0.2)" }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <span className="editorial-label">Complementary Silks</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-ivory)", marginTop: "0.5rem" }}>
                  Heirlooms of Similar Lineage
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2.5rem" }}>
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={(prod) => setActiveQuickView(prod)}
                  />
                ))}
              </div>
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Eye, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const hoverImg = product.gallery?.[1] || product.primaryImage;

  return (
    <div className={styles.card}>
      {/* Product Image Stage */}
      <div className={styles.imageWrapper}>
        <Link href={`/products/${product.slug}`} style={{ display: "block", width: "100%", height: "100%", position: "relative" }}>
          <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.mainImage}
          />
          {hoverImg && (
            <Image
              src={hoverImg}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.hoverImage}
            />
          )}
        </Link>

        {/* Origin / Provenance Tag */}
        <div className={styles.badgeTopLeft}>
          <span>{product.origin?.split(",")[0] || "Handloom"}</span>
        </div>

        {/* Hover Action Bar */}
        <div className={styles.quickActions}>
          <button
            type="button"
            className={styles.quickBtn}
            onClick={(e) => {
              e.preventDefault();
              onQuickView?.(product);
            }}
            title="Quick Textile View"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>

          <Link
            href={`/try-on?saree=${product.id}`}
            className={styles.quickBtn}
            title="Try this Saree with AI"
          >
            <Sparkles size={14} className="text-gold" />
            <span>AI Try-On</span>
          </Link>
        </div>
      </div>

      {/* Details Block */}
      <div className={styles.details}>
        <span className={styles.collectionLabel}>{product.collectionName}</span>
        
        <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        <p className={styles.specsSnippet}>
          {product.silkType} • {product.zariWeight || "Antique Gold Zari"}
        </p>

        <div className={styles.priceRow}>
          <span className={styles.price}>{product.priceFormatted}</span>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--color-gold)",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
              fontWeight: 600
            }}
          >
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

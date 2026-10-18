"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(16, 4, 8, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 1500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "840px",
          maxHeight: "90vh",
          backgroundColor: "#1D060F",
          border: "1px solid rgba(180, 154, 97, 0.4)",
          borderRadius: "4px",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(22, 5, 11, 0.8)",
            border: "1px solid rgba(180, 154, 97, 0.3)",
            borderRadius: "50%",
            color: "var(--color-ivory)",
            padding: "8px",
            cursor: "pointer",
            zIndex: 10
          }}
          aria-label="Close Quick View"
        >
          <X size={20} />
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          {/* Visual Column */}
          <div style={{ position: "relative", height: "480px", background: "#130307" }}>
            <Image
              src={product.primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Details Column */}
          <div style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column" }}>
            <span className="editorial-label" style={{ alignSelf: "flex-start", marginBottom: "0.5rem" }}>
              {product.collectionName}
            </span>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-ivory)", lineHeight: 1.25, marginBottom: "0.75rem" }}>
              {product.name}
            </h3>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.45rem", fontWeight: 700, color: "var(--color-gold)", marginBottom: "1.25rem" }}>
              {product.priceFormatted}
            </p>

            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--color-champagne)", marginBottom: "1.5rem", lineHeight: 1.5 }}>
              “{product.editorialQuote || product.description?.slice(0, 140) + '...'}”
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem", color: "var(--color-stone)", marginBottom: "2rem", borderTop: "1px solid rgba(180, 154, 97, 0.2)", paddingTop: "1rem" }}>
              <div><strong>Fabric:</strong> {product.silkType}</div>
              <div><strong>Loom:</strong> {product.weaveType}</div>
              <div><strong>Zari:</strong> {product.zariType}</div>
              <div><strong>Duration:</strong> {product.weavingDuration}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginTop: "auto" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    addToCart(product, 1);
                    onClose();
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </button>

                <Link
                  href={`/try-on?saree=${product.id}`}
                  className="btn-outline"
                  onClick={onClose}
                  title="Virtual Try-On"
                >
                  <Sparkles size={16} className="text-gold" />
                  <span>Try On</span>
                </Link>
              </div>

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  color: "var(--color-stone)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "8px 0"
                }}
              >
                <span>View Full Textile Catalogue Dossier</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

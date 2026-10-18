"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalogue/ProductCard";
import QuickViewModal from "@/components/catalogue/QuickViewModal";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { useState } from "react";
import { ArrowLeft, Sparkles, MapPin, Feather, Award } from "lucide-react";

export default function SingleCollectionPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const collection = collections.find((c) => c.slug === slug);
  const [activeQuickView, setActiveQuickView] = useState(null);

  if (!collection) {
    notFound();
  }

  const collectionProducts = products.filter(
    (p) => p.collectionId === collection.id
  );

  return (
    <>
      <Header />

      <main style={{ paddingTop: "var(--header-height)", minHeight: "100vh", background: "#140308" }}>
        {/* Collection Hero Banner */}
        <div style={{ position: "relative", minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 20%", filter: "brightness(0.7)" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(20,4,8,0.4) 0%, rgba(18,3,7,0.85) 75%, #140308 100%)"
          }} />

          <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "4rem 1.5rem" }}>
            <Link
              href="/collections"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--color-stone)",
                fontSize: "0.78rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "1.5rem"
              }}
            >
              <ArrowLeft size={14} />
              <span>All Collections</span>
            </Link>

            <span className="editorial-label" style={{ display: "block", marginBottom: "0.75rem" }}>
              {collection.region}
            </span>

            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
              letterSpacing: "0.12em",
              color: "var(--color-ivory)",
              lineHeight: 1.15,
              marginBottom: "1rem"
            }}>
              {collection.name}
            </h1>

            <p style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "1.45rem",
              color: "var(--color-champagne)",
              maxWidth: "720px",
              margin: "0 auto 1.5rem"
            }}>
              “{collection.subtitle}”
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2rem",
              background: "rgba(25, 6, 12, 0.7)",
              backdropFilter: "blur(10px)",
              padding: "10px 24px",
              borderRadius: "2px",
              border: "1px solid rgba(180, 154, 97, 0.3)",
              fontSize: "0.82rem",
              color: "var(--color-stone-light)",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              <div><strong>Weave:</strong> {collection.weaveType}</div>
              <div><strong>Zari:</strong> {collection.zariType}</div>
              <div><strong>Estimated Investment:</strong> {collection.priceRange}</div>
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="container" style={{ padding: "4rem 2rem" }}>
          <div style={{
            maxWidth: "840px",
            margin: "0 auto 4rem",
            textAlign: "center",
            padding: "2rem",
            background: "rgba(32, 7, 15, 0.4)",
            border: "1px solid rgba(180, 154, 97, 0.2)",
            borderRadius: "4px"
          }}>
            <p style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "1.25rem",
              lineHeight: 1.7,
              color: "var(--color-ivory)"
            }}>
              {collection.description}
            </p>
          </div>

          {/* Product Cards for this Collection */}
          <div style={{ marginBottom: "2rem" }}>
            <span className="editorial-label">In Atelier Possession</span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-ivory)", marginTop: "0.5rem" }}>
              Heirlooms from {collection.name}
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2.5rem"
          }}>
            {collectionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setActiveQuickView(p)}
              />
            ))}
          </div>
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./CuratedCollections.module.css";

export default function CuratedCollections() {
  const kanjeevaram = collections.find((c) => c.id === "kanjeevaram");
  const banarasi = collections.find((c) => c.id === "banarasi");
  const mysore = collections.find((c) => c.id === "mysore");
  const bridal = collections.find((c) => c.id === "bridal");
  const contemporary = collections.find((c) => c.id === "contemporary");

  return (
    <section className={styles.section} aria-label="Curated Silk Collections">
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <span className="editorial-label">Textile Provenance</span>
            <h2 className={styles.heading}>The Curated Collections</h2>
          </div>
          <Link href="/collections" className="btn-outline">
            <span>View All Archives</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Editorial Layout */}
        <div className={styles.editorialLayout}>
          {/* 1. Kanjeevaram (Large Hero Panel) */}
          {kanjeevaram && (
            <div className={styles.colKanjeevaram}>
              <Link href={`/collections/${kanjeevaram.slug}`} className={styles.collectionCard}>
                <Image
                  src={kanjeevaram.image}
                  alt={kanjeevaram.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={styles.cardImage}
                />
                <div className={styles.gradientScrim} />
                <div className={styles.cardContent}>
                  <span className={styles.regionTag}>{kanjeevaram.region}</span>
                  <h3 className={styles.cardTitle}>{kanjeevaram.name}</h3>
                  <p className={styles.cardSubtitle}>{kanjeevaram.subtitle}</p>
                  <div className={styles.cardAction}>
                    <span>Discover Heirlooms ({kanjeevaram.featuredCount})</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* 2. Banarasi (5 Columns) */}
          {banarasi && (
            <div className={styles.colBanarasi}>
              <Link href={`/collections/${banarasi.slug}`} className={styles.collectionCard}>
                <Image
                  src={banarasi.image}
                  alt={banarasi.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={styles.cardImage}
                />
                <div className={styles.gradientScrim} />
                <div className={styles.cardContent}>
                  <span className={styles.regionTag}>{banarasi.region}</span>
                  <h3 className={styles.cardTitle}>{banarasi.name}</h3>
                  <p className={styles.cardSubtitle}>{banarasi.subtitle}</p>
                  <div className={styles.cardAction}>
                    <span>Discover Heirlooms ({banarasi.featuredCount})</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* 3. Mysore Silk */}
          {mysore && (
            <div className={styles.colMysore}>
              <Link href={`/collections/${mysore.slug}`} className={styles.collectionCard}>
                <Image
                  src={mysore.image}
                  alt={mysore.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.gradientScrim} />
                <div className={styles.cardContent}>
                  <span className={styles.regionTag}>{mysore.region}</span>
                  <h3 className={styles.cardTitle}>{mysore.name}</h3>
                  <p className={styles.cardSubtitle}>{mysore.subtitle}</p>
                  <div className={styles.cardAction}>
                    <span>Explore ({mysore.featuredCount})</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* 4. Bridal Heirlooms */}
          {bridal && (
            <div className={styles.colBridal}>
              <Link href={`/collections/${bridal.slug}`} className={styles.collectionCard}>
                <Image
                  src={bridal.image}
                  alt={bridal.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.gradientScrim} />
                <div className={styles.cardContent}>
                  <span className={styles.regionTag}>{bridal.region}</span>
                  <h3 className={styles.cardTitle}>{bridal.name}</h3>
                  <p className={styles.cardSubtitle}>{bridal.subtitle}</p>
                  <div className={styles.cardAction}>
                    <span>Explore Bridal ({bridal.featuredCount})</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* 5. Contemporary Silk */}
          {contemporary && (
            <div className={styles.colContemporary}>
              <Link href={`/collections/${contemporary.slug}`} className={styles.collectionCard}>
                <Image
                  src={contemporary.image}
                  alt={contemporary.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.gradientScrim} />
                <div className={styles.cardContent}>
                  <span className={styles.regionTag}>{contemporary.region}</span>
                  <h3 className={styles.cardTitle}>{contemporary.name}</h3>
                  <p className={styles.cardSubtitle}>{contemporary.subtitle}</p>
                  <div className={styles.cardAction}>
                    <span>Explore Modern ({contemporary.featuredCount})</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

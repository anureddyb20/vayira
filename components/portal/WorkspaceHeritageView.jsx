"use client";

import Image from "next/image";
import { 
  Compass, 
  Feather, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Palette
} from "lucide-react";
import styles from "./WorkspaceHeritageView.module.css";

export default function WorkspaceHeritageView({ onGoToCollections, onGoToAtelier }) {
  return (
    <div className={styles.heritageWrapper}>
      {/* Header Area */}
      <div className={styles.headerArea}>
        <span className="editorial-label">2. Sacred Textile Lineage</span>
        <h2 className={styles.title}>The Art of Royal Indian Silk</h2>
        <p className={styles.description}>
          “Some traditions are not worn. They are inherited.” Exploring centuries of Indian handloom mastery preserved through undivided human dedication.
        </p>
      </div>

      {/* Main Feature Grid */}
      <div className={styles.editorialGrid}>
        <div className={styles.imageCol}>
          <div className={styles.heroImgWrapper}>
            <Image
              src="/images/craftsmanship-loom.jpg"
              alt="Traditional Indian Handloom Pit Loom with Master Weaver"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div className={styles.imgTag}>
              <span>Traditional Pit Loom</span>
              <strong>Varanasi & Kanchipuram Belt</strong>
            </div>
          </div>
        </div>

        <div className={styles.storyCol}>
          <h3 className={styles.storyTitle}>A Legacy Woven in Every Thread</h3>
          <p className={styles.leadPara}>
            In Indian royal courts, a handwoven silk saree was never merely clothing. It was an investment of time, a conduit of spiritual grace, and an intimate generational treasure passed from grandmother to granddaughter.
          </p>
          <p className={styles.bodyPara}>
            At VAYIRA, our master weavers work exclusively with unadulterated three-ply mulberry filament silk and tested silver-gilt zari. No high-speed power looms. No synthetic threads. Every motif is tied and lifted by hand, requiring up to 45 days of unhurried labor for a single ceremonial masterpiece.
          </p>

          <div className={styles.pillarsList}>
            <div className={styles.pillarItem}>
              <Feather size={20} className="text-gold" style={{ flexShrink: 0 }} />
              <div>
                <strong>Three-Ply Pure Mulberry Filament</strong>
                <p>Natural grade-A cocoons twisted into ultra-durable weft yarns with unmatched natural drape.</p>
              </div>
            </div>

            <div className={styles.pillarItem}>
              <ShieldCheck size={20} className="text-gold" style={{ flexShrink: 0 }} />
              <div>
                <strong>Assayed Silver-Gilt Zari Provenance</strong>
                <p>Real silver electroplated with 24-karat gold, burnished to give an antique royal sheen that never tarnishes.</p>
              </div>
            </div>

            <div className={styles.pillarItem}>
              <Compass size={20} className="text-gold" style={{ flexShrink: 0 }} />
              <div>
                <strong>Interlocking Korvai Technique</strong>
                <p>Ancient two-weaver technique fusing contrasting borders seamlessly without weak structural seams.</p>
              </div>
            </div>
          </div>

          <div className={styles.ctaRow}>
            {onGoToCollections && (
              <button
                type="button"
                onClick={onGoToCollections}
                className="btn-primary"
                style={{ padding: "12px 24px" }}
              >
                <span>Explore 3. Collections</span>
                <ArrowRight size={16} />
              </button>
            )}

            {onGoToAtelier && (
              <button
                type="button"
                onClick={onGoToAtelier}
                className="btn-outline"
                style={{ padding: "12px 20px" }}
              >
                <Palette size={16} />
                <span>4. Open Saree Atelier</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

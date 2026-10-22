"use client";

import Image from "next/image";
import { 
  Crown, 
  Clock, 
  ArrowRight, 
  Palette
} from "lucide-react";
import { sareeStories } from "@/data/sareeStories";
import styles from "./WorkspaceHeritageView.module.css";

export default function WorkspaceHeritageView({ onGoToCollections, onGoToAtelier }) {
  return (
    <div className={styles.heritageWrapper}>
      {/* Title Only as requested in Pic 2 */}
      <div className={styles.headerArea}>
        <h2 className={styles.title}>The Story of Indian Sarees &amp; Their Heritage</h2>
      </div>

      {/* Saree Stories Stack: Saree Picture on LEFT, Story on RIGHT */}
      <div className={styles.storiesList}>
        {sareeStories.map((story) => (
          <article key={story.id} className={styles.storyRow} id={`story-${story.id}`}>
            {/* LEFT COLUMN: Pure Saree Still Life Picture (No models, perfectly balanced height) */}
            <div className={styles.imageColumn}>
              <div className={styles.imageFrame}>
                <Image
                  src={story.image}
                  alt={`${story.name} pure handloom saree still life`}
                  fill
                  sizes="(max-width: 960px) 100vw, 380px"
                  className={styles.sareeImg}
                  priority={story.id === "kanjeevaram"}
                />
                
                {/* Integrated Overlay Craft Details (No dead space below) */}
                <div className={styles.imageOverlayTag}>
                  <div className={styles.imageOverlayDuration}>
                    <Clock size={12} className="text-gold" />
                    <span>{story.duration}</span>
                  </div>
                  <div className={styles.imageOverlayZari}>
                    <span>{story.zariType}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Streamlined Story & Historical Significance */}
            <div className={styles.storyColumn}>
              {/* Header */}
              <div className={styles.storyHeader}>
                <div className={styles.originPill}>
                  <Crown size={12} />
                  <span>{story.epoch} • {story.origin}</span>
                </div>
                <h3 className={styles.sareeName}>{story.name}</h3>
                <p className={styles.sareeSubtitle}>{story.subtitle}</p>
              </div>

              {/* Concise Narrative Blocks */}
              <div className={styles.storyTextSection}>
                <div className={styles.narrativeBlock}>
                  <strong>Historical Significance &amp; Royal Dynasty Story</strong>
                  <p>{story.storySummary}</p>
                </div>

                <div className={styles.narrativeBlock}>
                  <strong>The Sacred Weaving Tradition &amp; Craft</strong>
                  <p>{story.craftSummary}</p>
                </div>
              </div>

              {/* Sacred Motifs */}
              <div className={styles.motifsWrap}>
                <span className={styles.motifsLabel}>Sacred Motifs:</span>
                {story.motifList.map((m, i) => (
                  <span key={i} className={styles.motifTag}>
                    {m}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className={styles.storyActionRow}>
                {onGoToCollections && (
                  <button
                    type="button"
                    onClick={onGoToCollections}
                    className={styles.storyBtnPrimary}
                  >
                    <span>View in 3. Collections</span>
                    <ArrowRight size={13} />
                  </button>
                )}

                {onGoToAtelier && (
                  <button
                    type="button"
                    onClick={onGoToAtelier}
                    className={styles.storyBtnOutline}
                  >
                    <Palette size={13} />
                    <span>Customize in Atelier</span>
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Compass, 
  Feather, 
  Crown, 
  Layers, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Palette, 
  BookOpen
} from "lucide-react";
import { sareeStories } from "@/data/sareeStories";
import styles from "./WorkspaceHeritageView.module.css";

export default function WorkspaceHeritageView({ onGoToCollections, onGoToAtelier }) {
  const [selectedSareeId, setSelectedSareeId] = useState("all");

  // Filter stories by dropdown selection
  const filteredStories = useMemo(() => {
    if (selectedSareeId === "all") {
      return sareeStories;
    }
    return sareeStories.filter((s) => s.id === selectedSareeId);
  }, [selectedSareeId]);

  return (
    <div className={styles.heritageWrapper}>
      {/* Editorial Header */}
      <div className={styles.headerArea}>
        <span className="editorial-label">
          <Compass size={14} className="text-gold" />
          <span>2. Sacred Textile Lineages & Handloom Traditions</span>
        </span>
        <h2 className={styles.title}>The Story of Indian Sarees & Their Heritage</h2>
        <p className={styles.description}>
          “Some traditions are not worn. They are inherited.” Journey through the authentic history, royal dynasties, sacred loom crafts, and the living traditions of India&rsquo;s most revered handwoven sarees.
        </p>
      </div>

      {/* Clean Dropdown Controls Bar (Not a big top box) */}
      <div className={styles.controlsBar}>
        <div className={styles.controlsLeft}>
          <span className={styles.controlsCount}>
            {selectedSareeId === "all" 
              ? `Displaying All ${sareeStories.length} Traditional Saree Stories across India`
              : `Focusing on ${filteredStories[0]?.name}`}
          </span>
        </div>

        <div className={styles.controlsRight}>
          <label htmlFor="saree-filter-dropdown" className={styles.dropdownLabel}>
            Select Saree Story:
          </label>
          <select
            id="saree-filter-dropdown"
            value={selectedSareeId}
            onChange={(e) => setSelectedSareeId(e.target.value)}
            className={styles.sareeDropdown}
          >
            <option value="all">All Saree Stories Across India (11 Masterpieces)</option>
            {sareeStories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.origin}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Saree Storybook Rows: Picture on LEFT, Story on RIGHT */}
      <div className={styles.storiesList}>
        {filteredStories.map((story) => (
          <article key={story.id} className={styles.storyRow} id={`story-${story.id}`}>
            {/* LEFT COLUMN: Pure Saree Still Life Picture (No models) */}
            <div className={styles.imageColumn}>
              <div className={styles.imageFrame}>
                <Image
                  src={story.image}
                  alt={`${story.name} handwoven still life textile photograph`}
                  fill
                  sizes="(max-width: 1080px) 100vw, 460px"
                  className={styles.sareeImg}
                  priority={story.id === "kanjeevaram"}
                />
              </div>

              {/* Realistic Handloom Caption */}
              <div className={styles.imageCaptionBox}>
                <Feather size={14} className="text-gold" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{story.imageCaption}</span>
              </div>

              {/* Quick Craft Facts Under Image */}
              <div className={styles.quickSpecsBadgeGrid}>
                <div className={styles.specItem}>
                  <Clock size={13} className="text-gold" />
                  <span><strong>Loom Craft:</strong> {story.loomFact}</span>
                </div>
                <div className={styles.specItem}>
                  <Sparkles size={13} className="text-gold" />
                  <span><strong>Zari Quality:</strong> {story.zariFact}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Story & Historical Significance */}
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

              {/* Lead Philosophical Quote */}
              <div className={styles.leadQuoteBox}>
                <p className={styles.leadQuoteText}>{story.leadQuote}</p>
              </div>

              {/* Chapter 1: The Royal Dynasty History & Historical Significance */}
              <div className={styles.storyChapter}>
                <h4 className={styles.chapterTitle}>
                  <BookOpen size={15} />
                  <span>The Historical Significance & Royal Dynasty Story</span>
                </h4>
                <p className={styles.chapterParagraph}>
                  {story.historicalStory}
                </p>
              </div>

              {/* Chapter 2: The Sacred Weaving Tradition & Craft */}
              <div className={styles.storyChapter}>
                <h4 className={styles.chapterTitle}>
                  <Layers size={15} />
                  <span>The Sacred Weaving Tradition & Craftsmanship</span>
                </h4>
                <p className={styles.chapterParagraph}>
                  {story.traditionCraft}
                </p>
              </div>

              {/* Motif Symbolism */}
              <div className={styles.motifBox}>
                <h5 className={styles.motifBoxHeader}>Sacred Motifs & Cultural Symbolism</h5>
                <p className={styles.motifBoxContent}>{story.motifSymbolism}</p>
              </div>

              {/* Action Buttons */}
              <div className={styles.storyActionRow}>
                {onGoToCollections && (
                  <button
                    type="button"
                    onClick={onGoToCollections}
                    className={styles.storyBtnPrimary}
                  >
                    <span>View Heirlooms in 3. Collections</span>
                    <ArrowRight size={14} />
                  </button>
                )}

                {onGoToAtelier && (
                  <button
                    type="button"
                    onClick={onGoToAtelier}
                    className={styles.storyBtnOutline}
                  >
                    <Palette size={14} />
                    <span>Customize in Saree Atelier</span>
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

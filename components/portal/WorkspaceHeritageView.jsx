"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { 
  MapPin, 
  Compass, 
  Layers, 
  Feather, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Palette, 
  Search, 
  X, 
  CheckCircle2, 
  Flame,
  Crown
} from "lucide-react";
import { regionFilters, stateTraditions } from "@/data/stateTraditions";
import styles from "./WorkspaceHeritageView.module.css";

export default function WorkspaceHeritageView({ onGoToCollections, onGoToAtelier }) {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalTradition, setActiveModalTradition] = useState(null);

  // Filter state traditions by region & search query
  const filteredTraditions = useMemo(() => {
    return stateTraditions.filter((t) => {
      const matchesRegion = selectedRegion === "all" || t.region === selectedRegion;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesRegion;
      
      const matchesSearch = 
        t.state.toLowerCase().includes(query) ||
        t.sareeName.toLowerCase().includes(query) ||
        t.cluster.toLowerCase().includes(query) ||
        t.weaveTechnique.toLowerCase().includes(query) ||
        t.motifs.some((m) => m.toLowerCase().includes(query));

      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div className={styles.heritageWrapper}>
      {/* Editorial Header */}
      <div className={styles.headerArea}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.5rem" }}>
          <span className="editorial-label">
            <Compass size={14} className="text-gold" />
            <span>2. Pan-India Sacred Handloom Lineage</span>
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--color-gold)", background: "rgba(180, 154, 97, 0.15)", padding: "2px 8px", borderRadius: "12px", border: "1px solid rgba(180, 154, 97, 0.3)" }}>
            14 States Documented
          </span>
        </div>
        <h2 className={styles.title}>All-India Saree Handloom Traditions & Making</h2>
        <p className={styles.description}>
          “Some traditions are not worn. They are inherited.” Explore the centuries-old weaving techniques, indigenous looms, and iconic saree traditions famous across every state in India.
        </p>
      </div>

      {/* Royal Stats Ribbon */}
      <div className={styles.statsRibbon}>
        <div className={styles.statItem}>
          <Crown size={26} className="text-gold" />
          <div>
            <span className={styles.statNumber}>14</span>
            <span className={styles.statLabel}>State Weaving Clusters</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <ShieldCheck size={26} className="text-gold" />
          <div>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Certified Handloom Silk</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <Sparkles size={26} className="text-gold" />
          <div>
            <span className={styles.statNumber}>0.6%</span>
            <span className={styles.statLabel}>Real Gold-Silver Zari Assaying</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <Clock size={26} className="text-gold" />
          <div>
            <span className={styles.statNumber}>240</span>
            <span className={styles.statLabel}>Days Max Handloom Weaving</span>
          </div>
        </div>
      </div>

      {/* Region Filter & Search Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <div className={styles.filterTitle}>
            <MapPin size={16} className="text-gold" />
            <span>Filter Traditions by Region or State</span>
          </div>

          <div className={styles.searchInputWrapper}>
            <Search size={16} className="text-stone" />
            <input
              type="text"
              placeholder="Search by state (e.g. Tamil Nadu, Gujarat) or saree (e.g. Patola, Paithani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery("")}
                style={{ background: "none", border: "none", color: "var(--color-stone)", cursor: "pointer" }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Region Pills */}
        <div className={styles.pillsRow}>
          {regionFilters.map((rf) => (
            <button
              key={rf.id}
              type="button"
              className={`${styles.pillBtn} ${selectedRegion === rf.id ? styles.activePill : ""}`}
              onClick={() => setSelectedRegion(rf.id)}
            >
              {rf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Showing count indicator */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--color-stone)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Displaying {filteredTraditions.length} of {stateTraditions.length} Regional Saree Lineages
        </span>

        {selectedRegion !== "all" && (
          <button
            type="button"
            onClick={() => { setSelectedRegion("all"); setSearchQuery(""); }}
            style={{ background: "none", border: "none", color: "var(--color-gold)", fontSize: "0.78rem", cursor: "pointer", textDecoration: "underline" }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Pan-India Traditions Cards Grid */}
      <div className={styles.traditionsGrid}>
        {filteredTraditions.map((tradition) => (
          <article key={tradition.id} className={styles.traditionCard}>
            {/* Top Bar: State & Duration */}
            <div className={styles.cardTopHeader}>
              <div className={styles.stateBadge}>
                <MapPin size={14} className="text-gold" />
                <span>{tradition.state}</span>
              </div>
              <div className={styles.durationPill}>
                <Clock size={12} className="text-gold" />
                <span>{tradition.durationDays}</span>
              </div>
            </div>

            {/* Visual Banner with Floating Loom Tag */}
            <div className={styles.cardImgWrapper}>
              <Image
                src={tradition.image}
                alt={`${tradition.sareeName} from ${tradition.state}`}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className={styles.cardImg}
              />
              <div className={styles.loomFloatingTag}>
                <Compass size={14} className="text-gold" />
                <span>Loom: <strong>{tradition.loomType}</strong></span>
              </div>
            </div>

            {/* Content Body */}
            <div className={styles.cardBody}>
              {/* Saree Title & Cluster */}
              <div className={styles.titleArea}>
                <h3 className={styles.sareeTitle}>{tradition.sareeName}</h3>
                <span className={styles.clusterSubtitle}>{tradition.cluster}</span>
                <p className={styles.sareeTagline}>“{tradition.tagline}”</p>
              </div>

              {/* The Weaving Technique Deep-Dive Box */}
              <div className={styles.techniqueBox}>
                <div className={styles.techniqueHeader}>
                  <Layers size={14} className="text-gold" />
                  <span>How It Is Made: {tradition.weaveTechnique}</span>
                </div>
                <p className={styles.techniqueSummaryText}>
                  {tradition.techniqueSummary}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className={styles.specsGrid}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>🧵 Yarn Architecture:</span>
                  <span className={styles.specValue}>{tradition.yarnSpec}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>✨ Zari Purity:</span>
                  <span className={styles.specValue}>{tradition.zariSpec}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>🏛️ Royal Lineage:</span>
                  <span className={styles.specValue}>{tradition.historicalPatronage}</span>
                </div>
              </div>

              {/* Iconic Motifs */}
              <div className={styles.motifsContainer}>
                <span className={styles.motifsLabel}>Iconic Sacred Motifs:</span>
                <div className={styles.motifsWrap}>
                  {tradition.motifs.map((motif, i) => (
                    <span key={i} className={styles.motifTag}>
                      {motif}
                    </span>
                  ))}
                </div>
              </div>

              {/* Curator's Note */}
              <div className={styles.curatorBox}>
                <Feather size={16} className="text-gold" style={{ flexShrink: 0, marginTop: 2 }} />
                <p className={styles.curatorQuote}>
                  {tradition.curatorNote}
                </p>
              </div>
            </div>

            {/* Card Actions */}
            <div className={styles.cardActions}>
              <button
                type="button"
                className={styles.inspectBtn}
                onClick={() => setActiveModalTradition(tradition)}
              >
                <Compass size={14} />
                <span>Inspect 5-Stage Loom Anatomy</span>
              </button>

              <div className={styles.subActionRow}>
                {onGoToCollections && (
                  <button
                    type="button"
                    onClick={onGoToCollections}
                    className={styles.subActionBtn}
                  >
                    <span>View in 3. Collections</span>
                    <ArrowRight size={13} />
                  </button>
                )}

                {onGoToAtelier && (
                  <button
                    type="button"
                    onClick={onGoToAtelier}
                    className={styles.subActionBtn}
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

      {filteredTraditions.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(22, 5, 11, 0.5)", borderRadius: "4px", border: "1px solid rgba(180, 154, 97, 0.2)" }}>
          <p style={{ color: "var(--color-champagne)", fontFamily: "var(--font-editorial)", fontSize: "1.2rem", fontStyle: "italic" }}>
            No handloom traditions matched your search &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => { setSelectedRegion("all"); setSearchQuery(""); }}
            className="btn-outline"
            style={{ marginTop: "1rem" }}
          >
            View All 14 State Traditions
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5-STAGE LOOM ANATOMY & MAKING PROCESS MODAL                  */}
      {/* ============================================================ */}
      {activeModalTradition && (
        <div 
          className={styles.modalBackdrop}
          onClick={() => setActiveModalTradition(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setActiveModalTradition(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div style={{ borderBottom: "1px solid rgba(180, 154, 97, 0.25)", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <MapPin size={15} className="text-gold" />
                <span style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)" }}>
                  {activeModalTradition.state} Handloom Masterclass
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-ivory)", margin: "0.25rem 0" }}>
                {activeModalTradition.sareeName}
              </h3>
              <p style={{ color: "var(--color-champagne)", fontStyle: "italic", fontSize: "0.95rem" }}>
                Detailed technical breakdown of the traditional making process in {activeModalTradition.cluster}.
              </p>
            </div>

            <div className={styles.stepPipeline}>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <strong>Stage 1: Sericulture & Filament Harvesting</strong>
                  <p>
                    Reeling unadulterated cocoon filaments. For {activeModalTradition.sareeName}, weavers select {activeModalTradition.yarnSpec}. The raw silk is degummed in natural warm water baths to reveal its high-luster protein fibroin.
                  </p>
                </div>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <strong>Stage 2: Sacred Pre-Weave Dyeing & Math Calculations</strong>
                  <p>
                    Yarns are stretched on wooden pegs and immersed in boiling vegetable or Swiss azo-free vat dyes. In traditions like Patola and Sambalpuri, yarns undergo multi-stage resist-tying with cotton strings before dyeing.
                  </p>
                </div>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <strong>Stage 3: Setting Up the {activeModalTradition.loomType}</strong>
                  <p>
                    Over 5,000 to 12,000 individual warp threads are threaded through heald eyes and reed dents by hand. Traditional Jala or Jacquard punch cards are drafted to translate motifs like {activeModalTradition.motifs.slice(0, 3).join(", ")}.
                  </p>
                </div>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <strong>Stage 4: {activeModalTradition.weaveTechnique}</strong>
                  <p>
                    {activeModalTradition.techniqueSummary} Dedicated hand throwing ensures uniform beaten tension without uneven warp pull.
                  </p>
                </div>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>5</div>
                <div className={styles.stepContent}>
                  <strong>Stage 5: Silver-Gold Assaying & Silk Mark Certification</strong>
                  <p>
                    The metallic zari ({activeModalTradition.zariSpec}) is burnished with smooth agate stone to reveal pure golden luster. Each completed heirloom receives a government Silk Mark authenticity QR tag.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", borderTop: "1px solid rgba(180, 154, 97, 0.2)", paddingTop: "1.25rem" }}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setActiveModalTradition(null)}
                style={{ padding: "10px 20px", fontSize: "0.8rem" }}
              >
                Close Masterclass
              </button>

              {onGoToAtelier && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setActiveModalTradition(null);
                    onGoToAtelier();
                  }}
                  style={{ padding: "10px 22px", fontSize: "0.8rem" }}
                >
                  <Palette size={15} />
                  <span>Customize in Atelier</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

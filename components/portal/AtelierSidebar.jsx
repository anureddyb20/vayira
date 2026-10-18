"use client";

import VayiraCrest from "@/components/ui/VayiraCrest";
import { useAuth } from "@/lib/authContext";
import { useCart } from "@/lib/cartContext";
import { 
  Compass, 
  Layers, 
  Palette, 
  Sparkles, 
  ShoppingBag, 
  Bookmark, 
  LogOut, 
  Crown,
  RotateCcw
} from "lucide-react";
import styles from "./AtelierSidebar.module.css";

export default function AtelierSidebar({ activeSection, onSelectSection, onReplayReveal, onReturnToIntro }) {
  const { user, signOut } = useAuth();
  const { totalCount } = useCart();

  const menuItems = [
    { id: "heritage", label: "2. Heritage & Craft", icon: Compass, badge: null },
    { id: "collections", label: "3. Royal Collections", icon: Layers, badge: "8 Archives" },
    { id: "atelier", label: "4. Saree Atelier", icon: Palette, badge: "Bespoke" },
    { id: "tryon", label: "5. See Yourself in Silk", icon: Sparkles, badge: "AI Studio" },
    { id: "cart", label: "Loom Reservations", icon: ShoppingBag, badge: totalCount > 0 ? `${totalCount}` : null },
    { id: "portfolio", label: "My Saved Portfolio", icon: Bookmark, badge: null },
  ];

  return (
    <aside className={styles.sidebar} aria-label="Atelier Left Navigation">
      {/* Brand Header */}
      <div className={styles.brandArea}>
        <VayiraCrest size={36} />
        <div>
          <span className={styles.brandTitle}>VAYIRA</span>
          <span className={styles.brandSubtitle}>A Royal Indian Silk House</span>
        </div>
      </div>

      {/* Royal Patron Badge */}
      <div className={styles.patronBadge}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <Crown size={20} className="text-gold" style={{ flexShrink: 0 }} />
          <div className={styles.patronInfo}>
            <span className={styles.patronName}>
              {user?.user_metadata?.full_name || "Maharani Radhika Devi"}
            </span>
            <span className={styles.patronRole}>
              Royal Patron • Demo Active
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navMenu}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              onClick={() => onSelectSection(item.id)}
            >
              <Icon size={18} className={isActive ? "text-gold" : "text-stone"} />
              <span>{item.label}</span>
              {item.badge && <span className={styles.badgeTag}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className={styles.footerActions}>
        <button
          type="button"
          onClick={onReturnToIntro}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-stone)",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            cursor: "pointer",
            textAlign: "center",
            padding: "4px 0"
          }}
        >
          ← Return to Brand Introduction
        </button>

        <button
          type="button"
          onClick={onReplayReveal}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-gold)",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            cursor: "pointer",
            textAlign: "center",
            padding: "4px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4
          }}
        >
          <RotateCcw size={12} />
          <span>Replay Royal Reveal Opening</span>
        </button>

        <button
          type="button"
          onClick={() => {
            signOut();
            onReturnToIntro();
          }}
          className={styles.signOutBtn}
        >
          <LogOut size={14} />
          <span>Exit / Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

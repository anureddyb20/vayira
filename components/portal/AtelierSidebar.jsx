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
  RotateCcw,
  Undo2
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
      {/* Brand Header - Crest Icon with Hover Tooltip */}
      <div className={styles.brandArea} onClick={onReturnToIntro} title="VAYIRA — A Royal Indian Silk House">
        <VayiraCrest size={34} />
        <div className={styles.brandTooltip}>
          <span>VAYIRA • Royal Silk House</span>
        </div>
      </div>

      {/* Royal Patron Badge - Crown Icon with Hover Tooltip */}
      <div className={styles.patronBadge}>
        <Crown size={20} className="text-gold" />
        <div className={styles.patronTooltip}>
          <span className={styles.patronTooltipName}>
            {user?.user_metadata?.full_name || "Maharani Radhika Devi"}
          </span>
          <span className={styles.patronTooltipRole}>
            Royal Patron • Verified
          </span>
        </div>
      </div>

      {/* Navigation Menu - Icon Only with Hover Tooltip showing Tab Name */}
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
              aria-label={item.label}
            >
              <Icon size={21} className={isActive ? "text-gold" : "text-stone"} />
              
              {/* Notification badge if any */}
              {item.badge && item.id === "cart" && (
                <span className={styles.notificationBadge}>{item.badge}</span>
              )}

              {/* Tooltip visible when cursor is on the icon */}
              <div className={styles.itemTooltip}>
                <span>{item.label}</span>
                {item.badge && <span className={styles.tooltipBadge}>{item.badge}</span>}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Actions - Icons Only with Hover Tooltips */}
      <div className={styles.footerActions}>
        {/* Return to Intro */}
        <button
          type="button"
          onClick={onReturnToIntro}
          className={styles.actionBtn}
          aria-label="Return to Brand Introduction"
        >
          <Undo2 size={17} />
          <div className={styles.itemTooltip}>
            <span>Return to Brand Introduction</span>
          </div>
        </button>

        {/* Replay Royal Reveal */}
        <button
          type="button"
          onClick={onReplayReveal}
          className={styles.actionBtn}
          aria-label="Replay Royal Reveal Opening"
        >
          <RotateCcw size={16} />
          <div className={styles.itemTooltip}>
            <span>Replay Royal Reveal Opening</span>
          </div>
        </button>

        {/* Exit / Sign Out */}
        <button
          type="button"
          onClick={() => {
            signOut();
            onReturnToIntro();
          }}
          className={styles.signOutBtn}
          aria-label="Exit / Sign Out"
        >
          <LogOut size={16} />
          <div className={styles.itemTooltip} style={{ borderColor: "#ef4444" }}>
            <span style={{ color: "#fca5a5" }}>Exit / Sign Out</span>
          </div>
        </button>
      </div>
    </aside>
  );
}

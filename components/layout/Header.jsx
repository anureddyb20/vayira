"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Palette,
  Compass,
  ArrowRight
} from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount, setIsOpen: setCartOpen } = useCart();
  const { user, setAuthModalOpen } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.headerInner}`}>
          {/* Brand Wordmark & Crest */}
          <Link href="/" className={styles.brandLink}>
            <VayiraCrest size={40} />
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>VAYIRA</span>
              <span className={styles.brandSubtitle}>A Royal Indian Silk House</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navDesktop} aria-label="Main Navigation">
            <Link href="/collections" className={styles.navLink}>
              Collections
            </Link>
            
            <Link href="/atelier" className={styles.navLink}>
              <span>Saree Atelier</span>
              <span className={styles.navBadge}>Bespoke</span>
            </Link>

            <Link href="/try-on" className={styles.navLink}>
              <span>See Yourself in Silk</span>
              <span className={styles.navBadge}>AI Studio</span>
            </Link>

            <Link href="/#craftsmanship" className={styles.navLink}>
              Craftsmanship
            </Link>

            <Link href="/#heritage" className={styles.navLink}>
              Heritage
            </Link>
          </nav>

          {/* Action Icons */}
          <div className={styles.actionsRight}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => {
                if (user) {
                  window.location.href = "/account";
                } else {
                  setAuthModalOpen(true);
                }
              }}
              title={user ? `Signed in as ${user.email}` : "Sign In / Royal Account"}
              aria-label="Account"
            >
              <User size={20} />
            </button>

            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping Cart, ${totalCount} items`}
            >
              <ShoppingBag size={20} />
              {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
            </button>

            <button
              type="button"
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileHeader}>
            <div className={styles.brandLink}>
              <VayiraCrest size={34} />
              <div className={styles.brandText}>
                <span className={styles.brandTitle}>VAYIRA</span>
                <span className={styles.brandSubtitle}>A Royal Indian Silk House</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className={styles.mobileNavLinks} aria-label="Mobile Navigation">
            <Link href="/collections" className={styles.mobileNavLink}>
              <span>Curated Collections</span>
              <ArrowRight size={18} />
            </Link>

            <Link href="/atelier" className={styles.mobileNavLink}>
              <span>Saree Custom Atelier</span>
              <Palette size={18} className="text-gold" />
            </Link>

            <Link href="/try-on" className={styles.mobileNavLink}>
              <span>See Yourself in Silk (AI Try-On)</span>
              <Sparkles size={18} className="text-gold" />
            </Link>

            <Link href="/#craftsmanship" className={styles.mobileNavLink}>
              <span>Loom & Zari Craftsmanship</span>
              <Compass size={18} />
            </Link>

            <Link href="/#heritage" className={styles.mobileNavLink}>
              <span>The House of VAYIRA</span>
              <ArrowRight size={18} />
            </Link>

            <Link href="/account" className={styles.mobileNavLink}>
              <span>My Royal Account & Saved Designs</span>
              <User size={18} />
            </Link>
          </nav>

          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(180, 154, 97, 0.2)", paddingTop: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "0.95rem" }}>
              “Where India's timeless silk traditions meet personal expression.”
            </p>
          </div>
        </div>
      )}
    </>
  );
}

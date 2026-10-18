"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { X, Plus, Minus, ShoppingBag, Gift, ArrowRight, ShieldCheck } from "lucide-react";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    giftBoxSelected, 
    setGiftBoxSelected 
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)} role="dialog" aria-modal="true" aria-label="Shopping Cart">
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingBag size={20} className="text-gold" />
            <h3 className={styles.title}>Atelier Cart ({items.length})</h3>
          </div>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag size={48} className="text-stone" strokeWidth={1} />
            <h4 className={styles.emptyTitle}>Your Cart is Empty</h4>
            <p className={styles.emptyText}>
              “No heirlooms selected yet. Explore our royal silk creations handwoven for generations.”
            </p>
            <Link 
              href="/collections" 
              onClick={() => setIsOpen(false)}
              className="btn-primary"
              style={{ marginTop: "1rem" }}
            >
              Discover the Collection
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <div style={{ position: "relative", width: 80, height: 105, flexShrink: 0 }}>
                    <Image
                      src={item.product.primaryImage || "/images/hero-saree.jpg"}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className={styles.itemThumb}
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.product.name}</h4>
                    <span className={styles.itemCollection}>{item.product.collectionName}</span>
                    <span className={styles.itemPrice}>
                      ₹{((item.product.price || 0) * item.quantity).toLocaleString("en-IN")}
                    </span>

                    {item.customization && (
                      <span style={{ fontSize: "0.72rem", color: "var(--color-gold-light)" }}>
                        ✦ Custom Atelier Specifications Included
                      </span>
                    )}

                    <div className={styles.qtyRow}>
                      <div className={styles.qtyControl}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              {/* Complimentary Gift Box Checkbox */}
              <label className={styles.giftBoxOption}>
                <input
                  type="checkbox"
                  checked={giftBoxSelected}
                  onChange={(e) => setGiftBoxSelected(e.target.checked)}
                  style={{ accentColor: "var(--color-gold)" }}
                />
                <Gift size={16} className="text-gold" />
                <span>Complimentary Royal Cedar Box & Pure Muslin Wrap</span>
              </label>

              {/* Subtotal */}
              <div className={styles.subtotalRow}>
                <span className={styles.subtotalLabel}>Estimated Subtotal</span>
                <span className={styles.subtotalValue}>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--color-stone)" }}>
                <ShieldCheck size={14} className="text-gold" />
                <span>Insured White-Glove Royal Delivery Included Across India</span>
              </div>

              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Proceed to Loom Reservation</span>
                <ArrowRight size={18} />
              </Link>

              <p style={{ fontSize: "0.72rem", color: "var(--color-stone)", textAlign: "center", fontStyle: "italic" }}>
                *No online payment required. Reservations are confirmed via private consultation with our master weaver atelier.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

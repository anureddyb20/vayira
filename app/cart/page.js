"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { useCart } from "@/lib/cartContext";
import { submitEnquiry } from "@/lib/supabase";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Gift, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import styles from "./page.module.css";

export default function CartPage() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    giftBoxSelected, 
    setGiftBoxSelected 
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitEnquiry({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        enquiry_type: "product_consultation",
        estimated_amount: subtotal,
        customer_notes: `Delivery City: ${deliveryCity}. Items: ${items.map(i => `${i.product.name} (Qty: ${i.quantity})`).join(", ")}. Notes: ${notes}`,
        preferred_contact_mode: "phone"
      });

      if (result.success) {
        setReferenceCode(result.referenceCode);
        setSubmitted(true);
        clearCart();
      }
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className={styles.pageWrapper}>
        <div className={styles.banner}>
          <div className="container">
            <span className="editorial-label">Atelier Acquisition</span>
            <h1 className={styles.heading}>Atelier Cart & Loom Reservation</h1>
            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "1.2rem" }}>
              “Every VAYIRA creation is reserved via private artisan consultation to ensure perfect provenance.”
            </p>
          </div>
        </div>

        <div className="container">
          {submitted ? (
            <div style={{
              maxWidth: "640px",
              margin: "5rem auto 8rem",
              textAlign: "center",
              padding: "3.5rem 2.5rem",
              background: "rgba(32, 7, 15, 0.6)",
              border: "1px solid rgba(180, 154, 97, 0.4)",
              borderRadius: "4px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)"
            }}>
              <CheckCircle2 size={58} className="text-gold" style={{ marginBottom: "1rem" }} />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.85rem", color: "var(--color-ivory)", marginBottom: "0.5rem" }}>
                Royal Loom Reservation Confirmed
              </h2>
              <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--color-champagne)", marginBottom: "1.5rem" }}>
                Your Atelier Acquisition Dossier Reference:
              </p>
              <div style={{
                display: "inline-block",
                background: "rgba(180, 154, 97, 0.15)",
                border: "1px solid var(--color-gold)",
                padding: "12px 30px",
                borderRadius: "2px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                letterSpacing: "0.14em",
                color: "var(--color-gold-light)",
                marginBottom: "2rem"
              }}>
                {referenceCode}
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--color-stone)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                Our senior textile curator will contact you at <strong>{customerPhone}</strong> to verify the loom status, confirm custom blouse sizing, and coordinate insured white-glove delivery.
              </p>
              <Link href="/collections" className="btn-primary">
                Explore More Heirlooms
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "8rem 2rem" }}>
              <ShoppingBag size={54} className="text-stone" strokeWidth={1} style={{ marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-ivory)", marginBottom: "0.5rem" }}>
                Your Cart is Empty
              </h2>
              <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "1.15rem", marginBottom: "2rem" }}>
                “No sarees reserved in your atelier dossier.”
              </p>
              <Link href="/collections" className="btn-primary">
                Discover Curated Collections
              </Link>
            </div>
          ) : (
            <div className={styles.cartGrid}>
              {/* Left Column: Cart Items */}
              <div className={styles.itemsCol}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(180, 154, 97, 0.2)", paddingBottom: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-ivory)" }}>
                    Reserved Heirlooms ({items.length})
                  </span>
                  <button
                    type="button"
                    onClick={clearCart}
                    style={{ background: "none", border: "none", color: "var(--color-stone)", fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer" }}
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImageStage}>
                      <Image
                        src={item.product.primaryImage || "/images/hero-saree.jpg"}
                        alt={item.product.name}
                        fill
                        sizes="110px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className={styles.itemInfo}>
                      <span className={styles.itemCollection}>{item.product.collectionName}</span>
                      <h3 className={styles.itemTitle}>{item.product.name}</h3>
                      <div className={styles.itemPrice}>
                        ₹{((item.product.price || 0) * item.quantity).toLocaleString("en-IN")}
                      </div>

                      {item.customization && (
                        <div style={{ marginTop: "6px", fontSize: "0.78rem", color: "var(--color-gold-light)" }}>
                          ✦ Bespoke Atelier Specifications Included ({item.customization.bodyColor?.name})
                        </div>
                      )}

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "1rem" }}>
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
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--color-stone)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: "0.78rem"
                          }}
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Heirloom Preservation Packaging Option */}
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "1.25rem",
                  background: "rgba(32, 7, 15, 0.4)",
                  border: "1px solid rgba(180, 154, 97, 0.25)",
                  borderRadius: "2px",
                  cursor: "pointer"
                }}>
                  <input
                    type="checkbox"
                    checked={giftBoxSelected}
                    onChange={(e) => setGiftBoxSelected(e.target.checked)}
                    style={{ accentColor: "var(--color-gold)", width: 18, height: 18 }}
                  />
                  <Gift size={20} className="text-gold" />
                  <div>
                    <strong style={{ fontFamily: "var(--font-serif)", fontSize: "0.92rem", color: "var(--color-ivory)", display: "block" }}>
                      Complimentary Royal Heirloom Presentation Chest
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-stone)" }}>
                      Includes aromatic red cedar keepsake box, pure unbleached muslin wrap, and Master Weaver certificate.
                    </span>
                  </div>
                </label>
              </div>

              {/* Right Column: Reservation & Loom Booking Form */}
              <div className={styles.summaryCol}>
                <h3 className={styles.summaryTitle}>Loom Reservation Summary</h3>

                <div className={styles.summaryRow}>
                  <span>Heirloom Subtotal</span>
                  <span style={{ color: "var(--color-ivory)", fontWeight: 600 }}>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>White-Glove Insured Delivery</span>
                  <span style={{ color: "var(--color-gold)" }}>Complimentary</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Heirloom Preservation Kit</span>
                  <span style={{ color: "var(--color-gold)" }}>Included</span>
                </div>

                <div className={styles.totalRow}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-ivory)" }}>
                    Estimated Total
                  </span>
                  <span className={styles.totalVal}>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Client Consultation Booking Form */}
                <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                  <span className="editorial-label">Client Verification</span>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                      Full Name
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "8px 12px", background: "rgba(22, 5, 11, 0.7)" }}>
                      <User size={15} className="text-stone" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Devi"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                      Email Address
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "8px 12px", background: "rgba(22, 5, 11, 0.7)" }}>
                      <Mail size={15} className="text-stone" />
                      <input
                        type="email"
                        required
                        placeholder="name@heritage.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                      Contact Phone
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "8px 12px", background: "rgba(22, 5, 11, 0.7)" }}>
                      <Phone size={15} className="text-stone" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                      Destination City & Pincode
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "8px 12px", background: "rgba(22, 5, 11, 0.7)" }}>
                      <MapPin size={15} className="text-stone" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bangalore 560001"
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: "100%", marginTop: "0.75rem", padding: "14px" }}
                  >
                    {loading ? "Registering Loom Reservation..." : "Confirm Loom Reservation & Consultation"}
                  </button>

                  <p style={{ fontSize: "0.72rem", color: "var(--color-stone)", textAlign: "center", fontStyle: "italic" }}>
                    *No online payment gateway active in this phase. Reservations are guaranteed via private concierge consultation.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

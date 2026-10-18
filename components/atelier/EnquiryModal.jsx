"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Calendar, Phone, Mail, User, AlertCircle } from "lucide-react";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { submitEnquiry } from "@/lib/supabase";

export default function EnquiryModal({ config, pricing, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consultationMode, setConsultationMode] = useState("video");
  const [consultationDate, setConsultationDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await submitEnquiry({
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        enquiry_type: "bespoke_atelier",
        design_config: config,
        estimated_amount: pricing.total,
        customer_notes: notes,
        preferred_contact_mode: consultationMode,
        preferred_consultation_date: consultationDate || null
      });

      if (result.success) {
        setRefCode(result.referenceCode);
        setSubmitted(true);
      } else {
        throw new Error("Failed to register enquiry");
      }
    } catch (err) {
      setError(err.message || "Failed to submit enquiry. Please check your information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(16, 4, 8, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          maxHeight: "92vh",
          backgroundColor: "#1E0610",
          border: "1px solid rgba(180, 154, 97, 0.4)",
          borderRadius: "4px",
          padding: "2.5rem 2rem",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "none",
            border: "none",
            color: "var(--color-stone)",
            cursor: "pointer"
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <CheckCircle2 size={54} className="text-gold" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-ivory)", marginBottom: "0.5rem" }}>
              Bespoke Loom Reservation Received
            </h3>
            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--color-champagne)", marginBottom: "1.5rem" }}>
              Your Master Weaver Consultation Reference Code:
            </p>
            <div style={{
              display: "inline-block",
              background: "rgba(180, 154, 97, 0.15)",
              border: "1px solid var(--color-gold)",
              padding: "10px 24px",
              borderRadius: "2px",
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              letterSpacing: "0.14em",
              color: "var(--color-gold-light)",
              marginBottom: "1.5rem"
            }}>
              {refCode}
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--color-stone)", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 2rem" }}>
              Our senior atelier curator will connect with you via your preferred channel within 24 hours to review your yarn dyeing schedule and loom allocation.
            </p>
            <button type="button" onClick={onClose} className="btn-primary">
              Return to Atelier
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <VayiraCrest size={42} />
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", color: "var(--color-gold)", letterSpacing: "0.12em", marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                Commission Master Weaver Consultation
              </h3>
              <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "0.95rem" }}>
                Estimated Commission: {pricing.formatted} • Approx. {pricing.estimatedDays} Weaving Days
              </p>
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", backgroundColor: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#fca5a5", fontSize: "0.82rem", borderRadius: "2px", marginBottom: "1.25rem" }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                  Your Full Name
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "10px 14px", background: "rgba(32, 7, 15, 0.6)" }}>
                  <User size={16} className="text-stone" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharani Gayatri Devi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                    Email Address
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "10px 14px", background: "rgba(32, 7, 15, 0.6)" }}>
                    <Mail size={16} className="text-stone" />
                    <input
                      type="email"
                      required
                      placeholder="name@heritage.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                    Contact Phone
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "10px 14px", background: "rgba(32, 7, 15, 0.6)" }}>
                    <Phone size={16} className="text-stone" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                  Preferred Consultation Mode
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { id: "video", label: "Private Video Consultation" },
                    { id: "phone", label: "Phone Call" },
                    { id: "whatsapp", label: "WhatsApp Atelier Chat" }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setConsultationMode(mode.id)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        fontSize: "0.75rem",
                        background: consultationMode === mode.id ? "var(--color-gold)" : "rgba(32, 7, 15, 0.6)",
                        color: consultationMode === mode.id ? "var(--color-ink-deep)" : "var(--color-stone)",
                        border: consultationMode === mode.id ? "1px solid var(--color-gold)" : "1px solid rgba(180, 154, 97, 0.25)",
                        borderRadius: "2px",
                        cursor: "pointer",
                        fontWeight: consultationMode === mode.id ? 700 : 500
                      }}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "4px" }}>
                  Artisan Notes / Custom Inscription (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Auspicious wedding date, family initials to be woven into pallu, or custom border preference..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(32, 7, 15, 0.6)",
                    border: "1px solid rgba(180, 154, 97, 0.35)",
                    borderRadius: "2px",
                    color: "var(--color-ivory)",
                    padding: "10px",
                    fontSize: "0.85rem",
                    outline: "none",
                    fontFamily: "var(--font-sans)"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", marginTop: "0.5rem" }}
              >
                {loading ? "Registering Loom Reservation..." : "Submit Bespoke Commission"}
              </button>
            </form>

            <p style={{ marginTop: "1rem", fontSize: "0.72rem", color: "var(--color-stone)", textAlign: "center", fontStyle: "italic" }}>
              *No payment required now. Commission details are finalized after private consultation with our master weaver.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

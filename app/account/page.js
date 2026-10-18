"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { useAuth } from "@/lib/authContext";
import { 
  User, 
  Bookmark, 
  Calendar, 
  LogOut, 
  Palette, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function AccountPage() {
  const { user, signOut, setAuthModalOpen } = useAuth();
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    // Load local saved designs and enquiries
    try {
      const designs = JSON.parse(localStorage.getItem("vayira_saved_designs") || "[]");
      setSavedDesigns(designs);

      const enqs = JSON.parse(localStorage.getItem("vayira_enquiries") || "[]");
      setEnquiries(enqs);
    } catch (e) {
      console.warn("Storage load error:", e);
    }
  }, []);

  return (
    <>
      <Header />

      <main style={{ paddingTop: "var(--header-height)", minHeight: "100vh", background: "#140308", color: "var(--color-ivory)" }}>
        {/* Banner */}
        <div style={{
          padding: "4rem 0 3rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(180, 154, 97, 0.2)",
          background: "linear-gradient(180deg, #220710 0%, #140308 100%)"
        }}>
          <div className="container">
            <span className="editorial-label">Royal Patronage</span>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--color-ivory)", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              My Atelier Portfolio
            </h1>
            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "1.2rem" }}>
              {user ? `Welcome, ${user.user_metadata?.full_name || user.email}` : "Guest Atelier Session"}
            </p>
          </div>
        </div>

        <div className="container" style={{ padding: "4rem 2rem 6rem" }}>
          {/* User Header Card */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2rem",
            background: "rgba(32, 7, 15, 0.6)",
            border: "1px solid rgba(180, 154, 97, 0.3)",
            borderRadius: "4px",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(180, 154, 97, 0.15)", border: "1px solid var(--color-gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <VayiraCrest size={34} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-ivory)" }}>
                  {user ? (user.user_metadata?.full_name || "Royal Patron") : "Guest Patron"}
                </h3>
                <span style={{ fontSize: "0.82rem", color: "var(--color-stone)" }}>
                  {user ? user.email : "Local session active"}
                </span>
              </div>
            </div>

            <div>
              {user ? (
                <button
                  type="button"
                  onClick={signOut}
                  className="btn-outline"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px" }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: "10px 24px" }}
                >
                  <span>Sign In / Create Account</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 1: Saved Saree Atelier Designs */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
              <div>
                <span className="editorial-label">Bespoke Creations</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-ivory)", marginTop: "4px" }}>
                  Saved Saree Designs ({savedDesigns.length})
                </h2>
              </div>
              <Link href="/atelier" className="btn-outline" style={{ fontSize: "0.78rem", padding: "8px 16px" }}>
                <Palette size={14} className="text-gold" />
                <span>Launch Atelier</span>
              </Link>
            </div>

            {savedDesigns.length === 0 ? (
              <div style={{ padding: "3rem", background: "rgba(32, 7, 15, 0.3)", border: "1px dashed rgba(180, 154, 97, 0.25)", borderRadius: "4px", textAlign: "center" }}>
                <Bookmark size={36} className="text-stone" style={{ marginBottom: "0.75rem" }} />
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-ivory)", marginBottom: "4px" }}>
                  No saved designs yet
                </p>
                <p style={{ color: "var(--color-stone)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                  Create a custom saree in the VAYIRA Atelier and save your personal specifications.
                </p>
                <Link href="/atelier" className="btn-primary">
                  Design Your Saree Now
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {savedDesigns.map((design) => (
                  <div key={design.id} style={{ padding: "1.5rem", background: "rgba(32, 7, 15, 0.5)", border: "1px solid rgba(180, 154, 97, 0.25)", borderRadius: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: design.previewData || "#35131D", border: "1px solid var(--color-gold)" }} />
                      <strong style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-ivory)" }}>
                        {design.title}
                      </strong>
                    </div>

                    <div style={{ fontSize: "0.82rem", color: "var(--color-stone)", display: "flex", flexDirection: "column", gap: 4, marginBottom: "1.25rem" }}>
                      <div>Fabric: {design.designConfig?.bodyFabric?.name || "Pure Silk"}</div>
                      <div>Shade: {design.designConfig?.bodyColor?.name}</div>
                      <div>Border: {design.designConfig?.borderStyle?.name}</div>
                      <div>Zari: {design.designConfig?.zariType?.name}</div>
                      <div style={{ color: "var(--color-gold)", fontWeight: 700, marginTop: 4 }}>
                        Est: ₹{design.estimatedPrice?.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <Link href="/atelier" className="btn-outline" style={{ width: "100%", justifyContent: "center", fontSize: "0.78rem" }}>
                      <span>Re-open in Atelier</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Active Loom Reservations & Enquiries */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="editorial-label">Master Loom Commissions</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-ivory)", marginTop: "4px" }}>
                Loom Reservations & Enquiries ({enquiries.length})
              </h2>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ padding: "3rem", background: "rgba(32, 7, 15, 0.3)", border: "1px dashed rgba(180, 154, 97, 0.25)", borderRadius: "4px", textAlign: "center" }}>
                <Calendar size={36} className="text-stone" style={{ marginBottom: "0.75rem" }} />
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-ivory)", marginBottom: "4px" }}>
                  No active loom reservations
                </p>
                <p style={{ color: "var(--color-stone)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                  Items reserved through the Atelier Cart or custom enquiries will appear here.
                </p>
                <Link href="/collections" className="btn-outline">
                  Browse Curated Heirlooms
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {enquiries.map((enq, idx) => (
                  <div key={idx} style={{ padding: "1.5rem", background: "rgba(32, 7, 15, 0.5)", border: "1px solid rgba(180, 154, 97, 0.25)", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "4px" }}>
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-gold-light)" }}>
                          Ref: {enq.reference_code}
                        </span>
                        <span style={{ fontSize: "0.72rem", background: "rgba(180, 154, 97, 0.2)", border: "1px solid var(--color-gold)", padding: "2px 8px", borderRadius: "2px", textTransform: "uppercase", color: "var(--color-gold)" }}>
                          {enq.status || "Received"}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "var(--color-ivory)" }}>
                        {enq.enquiry_type === "bespoke_atelier" ? "Bespoke Saree Loom Commission" : "Product Consultation"}
                      </p>
                      <span style={{ fontSize: "0.78rem", color: "var(--color-stone)" }}>
                        Submitted {new Date(enq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", fontWeight: 700, color: "var(--color-gold)" }}>
                        ₹{enq.estimated_amount?.toLocaleString("en-IN")}
                      </span>
                      <p style={{ fontSize: "0.78rem", color: "var(--color-stone-light)", fontStyle: "italic" }}>
                        Atelier Concierge Assigned
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

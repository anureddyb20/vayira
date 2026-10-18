"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { products as initialProducts } from "@/data/products";
import { collections } from "@/data/collections";
import { useAuth } from "@/lib/authContext";
import { 
  ShieldCheck, 
  Package, 
  Layers, 
  FileText, 
  Sparkles, 
  Palette, 
  Search, 
  Check, 
  Clock, 
  AlertCircle,
  Eye,
  Settings
} from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("enquiries"); // 'enquiries' | 'products' | 'collections' | 'services'
  const [productsList, setProductsList] = useState(initialProducts);
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const savedEnqs = JSON.parse(localStorage.getItem("vayira_enquiries") || "[]");
      setEnquiries(savedEnqs);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleToggleStock = (productId) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStatus = p.stockStatus === "In Atelier" ? "Loom Reserved" : "In Atelier";
          return { ...p, stockStatus: newStatus };
        }
        return p;
      })
    );
  };

  return (
    <>
      <Header />

      <main style={{ paddingTop: "var(--header-height)", minHeight: "100vh", background: "#140308", color: "var(--color-ivory)" }}>
        {/* Banner */}
        <div style={{
          padding: "4rem 0 3rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(180, 154, 97, 0.2)",
          background: "linear-gradient(180deg, #240812 0%, #140308 100%)"
        }}>
          <div className="container">
            <span className="editorial-label">
              <ShieldCheck size={14} className="text-gold" />
              <span>Administrative Atelier Desk</span>
            </span>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--color-ivory)", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              VAYIRA Atelier Administration
            </h1>
            <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "1.2rem" }}>
              Heirloom inventory, loom commissions, and AI service orchestration
            </p>
          </div>
        </div>

        <div className="container" style={{ padding: "3rem 2rem 6rem" }}>
          {/* Navigation Tabs */}
          <div style={{
            display: "flex",
            gap: "10px",
            borderBottom: "1px solid rgba(180, 154, 97, 0.2)",
            paddingBottom: "1rem",
            marginBottom: "2.5rem",
            overflowX: "auto"
          }}>
            {[
              { id: "enquiries", label: "Loom Enquiries & Commissions", count: enquiries.length },
              { id: "products", label: "Catalogue Heirlooms", count: productsList.length },
              { id: "collections", label: "Regional Collections", count: collections.length },
              { id: "services", label: "AI Try-On & Storage Engine", count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "var(--color-gold)" : "rgba(32, 7, 15, 0.6)",
                  color: activeTab === tab.id ? "var(--color-ink-deep)" : "var(--color-ivory)",
                  border: activeTab === tab.id ? "1px solid var(--color-gold)" : "1px solid rgba(180, 154, 97, 0.2)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 18px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  whiteSpace: "nowrap"
                }}
              >
                {tab.label} {tab.count !== null && `(${tab.count})`}
              </button>
            ))}
          </div>

          {/* TAB 1: Enquiries & Commissions */}
          {activeTab === "enquiries" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-ivory)" }}>
                    Received Customer Commissions
                  </h3>
                  <span style={{ fontSize: "0.82rem", color: "var(--color-stone)" }}>
                    Direct reservations from Atelier Cart and Bespoke Saree Studio
                  </span>
                </div>
              </div>

              {enquiries.length === 0 ? (
                <div style={{ padding: "4rem 2rem", background: "rgba(32, 7, 15, 0.3)", border: "1px dashed rgba(180, 154, 97, 0.25)", borderRadius: "4px", textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--color-ivory)", marginBottom: "4px" }}>
                    No customer commissions registered yet
                  </p>
                  <p style={{ color: "var(--color-stone)", fontSize: "0.85rem" }}>
                    When visitors submit loom reservations or bespoke commissions, they will populate here in real time.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {enquiries.map((enq, idx) => (
                    <div key={idx} style={{ padding: "1.75rem", background: "rgba(32, 7, 15, 0.55)", border: "1px solid rgba(180, 154, 97, 0.25)", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(180, 154, 97, 0.15)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
                        <div>
                          <strong style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--color-gold-light)" }}>
                            {enq.reference_code}
                          </strong>
                          <span style={{ marginLeft: "12px", fontSize: "0.78rem", color: "var(--color-champagne)", textTransform: "uppercase" }}>
                            {enq.enquiry_type?.replace("_", " ")}
                          </span>
                        </div>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", fontWeight: 700, color: "var(--color-gold)" }}>
                          ₹{enq.estimated_amount?.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", fontSize: "0.85rem", color: "var(--color-stone)" }}>
                        <div><strong>Client:</strong> {enq.customer_name}</div>
                        <div><strong>Email:</strong> {enq.customer_email}</div>
                        <div><strong>Phone:</strong> {enq.customer_phone}</div>
                        <div><strong>Mode:</strong> {enq.preferred_contact_mode || "Phone"}</div>
                      </div>

                      {enq.customer_notes && (
                        <div style={{ marginTop: "1rem", padding: "10px", background: "rgba(22, 5, 11, 0.7)", borderRadius: "2px", fontSize: "0.82rem", color: "var(--color-stone-light)", fontStyle: "italic" }}>
                          Notes: {enq.customer_notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Catalogue Heirlooms */}
          {activeTab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-ivory)" }}>
                    Inventory Status & Pricing
                  </h3>
                  <span style={{ fontSize: "0.82rem", color: "var(--color-stone)" }}>
                    Manage availability across all active handloom creations
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {productsList.map((product) => (
                  <div key={product.id} style={{ padding: "1.25rem 1.5rem", background: "rgba(32, 7, 15, 0.55)", border: "1px solid rgba(180, 154, 97, 0.2)", borderRadius: "2px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: product.colorHex || "#B49A61" }} />
                      <div>
                        <strong style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-ivory)", display: "block" }}>
                          {product.name}
                        </strong>
                        <span style={{ fontSize: "0.78rem", color: "var(--color-champagne)" }}>
                          {product.collectionName} • {product.silkType}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-gold)" }}>
                        {product.priceFormatted}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleStock(product.id)}
                        style={{
                          background: product.stockStatus === "In Atelier" ? "rgba(23, 61, 50, 0.6)" : "rgba(180, 154, 97, 0.2)",
                          border: `1px solid ${product.stockStatus === "In Atelier" ? "#173D32" : "var(--color-gold)"}`,
                          color: product.stockStatus === "In Atelier" ? "#86efac" : "var(--color-gold-light)",
                          padding: "6px 14px",
                          borderRadius: "2px",
                          fontSize: "0.75rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          fontWeight: 600
                        }}
                      >
                        {product.stockStatus}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Collections */}
          {activeTab === "collections" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {collections.map((col) => (
                <div key={col.id} style={{ padding: "1.75rem", background: "rgba(32, 7, 15, 0.55)", border: "1px solid rgba(180, 154, 97, 0.25)", borderRadius: "4px" }}>
                  <span className="editorial-label" style={{ marginBottom: "0.5rem" }}>{col.region}</span>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-ivory)", marginBottom: "4px" }}>
                    {col.name}
                  </h4>
                  <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--color-champagne)", marginBottom: "1rem" }}>
                    {col.tagline}
                  </p>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-stone)", display: "flex", flexDirection: "column", gap: 4 }}>
                    <div><strong>Weave:</strong> {col.weaveType}</div>
                    <div><strong>Zari:</strong> {col.zariType}</div>
                    <div><strong>Archival Count:</strong> {col.featuredCount}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Services Status & Supabase Diagnostic */}
          {activeTab === "services" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ padding: "1.75rem", background: "rgba(32, 7, 15, 0.55)", border: "1px solid rgba(180, 154, 97, 0.25)", borderRadius: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
                  <Sparkles size={20} className="text-gold" />
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--color-ivory)" }}>
                    AI Virtual Try-On Provider Status
                  </h4>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-stone)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  Active Provider: <strong>VAYIRA Neural Atelier Engine (Demo Simulation Mode)</strong>
                  <br />
                  To switch to production models (e.g., Replicate IDM-VTON, Fal.ai, or Kolors), configure <code>VTON_PROVIDER</code> and <code>VTON_API_KEY</code> in <code>.env.local</code>.
                </p>
                <div style={{ display: "inline-block", background: "rgba(23, 61, 50, 0.3)", border: "1px solid #173D32", padding: "6px 14px", borderRadius: "2px", fontSize: "0.75rem", color: "#86efac" }}>
                  ● Operational — Draping pipeline responding
                </div>
              </div>

              <div style={{ padding: "1.75rem", background: "rgba(32, 7, 15, 0.55)", border: "1px solid rgba(180, 154, 97, 0.25)", borderRadius: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
                  <ShieldCheck size={20} className="text-gold" />
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--color-ivory)" }}>
                    Supabase PostgreSQL & Auth Connection
                  </h4>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-stone)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  Schema file ready at <code>supabase/schema.sql</code>. Complete step-by-step connection guide is available in <code>supabase/README.md</code>.
                </p>
                <div style={{ display: "inline-block", background: "rgba(180, 154, 97, 0.2)", border: "1px solid var(--color-gold)", padding: "6px 14px", borderRadius: "2px", fontSize: "0.75rem", color: "var(--color-gold-light)" }}>
                  ● Local Resilience Layer Active (localStorage fallback ready)
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

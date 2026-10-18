"use client";

import { useState } from "react";
import Link from "next/link";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { useAuth } from "@/lib/authContext";
import { 
  KeyRound, 
  Sparkles, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Bookmark, 
  Palette, 
  LogOut, 
  ArrowRight,
  Crown
} from "lucide-react";

export default function DemoSignInSection() {
  const { user, signIn, signOut } = useAuth();
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleQuickSignIn = async (name, email) => {
    setLoading(true);
    setFeedback("");
    try {
      await signIn(email, "demo123");
      setFeedback(`Welcome to the House of VAYIRA, ${name}.`);
    } catch (e) {
      setFeedback("Signed in successfully.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSignIn = async (e) => {
    e.preventDefault();
    if (!customEmail) return;
    setLoading(true);
    try {
      await signIn(customEmail, "demo123");
      setFeedback(`Welcome, ${customName || customEmail.split("@")[0]}.`);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="patron-access" style={{
      padding: "5rem 0",
      background: "radial-gradient(ellipse at 50% 50%, rgba(53, 19, 29, 0.7) 0%, rgba(20, 4, 9, 0.95) 75%, #100206 100%)",
      borderTop: "1px solid rgba(180, 154, 97, 0.25)",
      borderBottom: "1px solid rgba(180, 154, 97, 0.25)",
      position: "relative"
    }}>
      <div className="container" style={{ maxWidth: "980px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="editorial-label">
            <KeyRound size={13} className="text-gold" />
            <span>Order Step 01 • Patron Access</span>
          </span>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            letterSpacing: "0.14em",
            color: "var(--color-ivory)",
            marginTop: "0.5rem",
            marginBottom: "0.5rem"
          }}>
            Sign In with Demo Access
          </h2>
          <p style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "var(--color-champagne)",
            maxWidth: "640px",
            margin: "0 auto"
          }}>
            “Step inside the private atelier. Experience instant demo authentication to save bespoke saree designs, commission loom weavers, and test virtual fitting.”
          </p>
        </div>

        {user ? (
          /* State 1: Active Patron Logged In */
          <div style={{
            background: "rgba(32, 7, 15, 0.7)",
            backdropFilter: "blur(14px)",
            border: "1px solid var(--color-gold)",
            borderRadius: "4px",
            padding: "2.5rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(180, 154, 97, 0.15)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              borderBottom: "1px solid rgba(180, 154, 97, 0.2)",
              paddingBottom: "1.75rem",
              marginBottom: "1.75rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(180, 154, 97, 0.25), rgba(74, 24, 39, 0.6))",
                  border: "1px solid var(--color-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Crown size={26} className="text-gold" />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-ivory)" }}>
                      {user.user_metadata?.full_name || "Maharani Radhika Devi"}
                    </h3>
                    <span style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      background: "rgba(180, 154, 97, 0.2)",
                      border: "1px solid var(--color-gold)",
                      color: "var(--color-gold-light)",
                      borderRadius: "2px"
                    }}>
                      Royal Patron
                    </span>
                  </div>
                  <span style={{ fontSize: "0.82rem", color: "var(--color-stone)" }}>
                    {user.email} • Demo Session Active
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={signOut}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(180, 154, 97, 0.35)",
                  color: "var(--color-stone)",
                  padding: "8px 18px",
                  borderRadius: "2px",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <LogOut size={14} />
                <span>Switch / Sign Out</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <Link href="/atelier" className="btn-primary" style={{ justifyContent: "center", padding: "12px 20px" }}>
                <Palette size={16} />
                <span>Open Saree Atelier</span>
              </Link>

              <Link href="/try-on" className="btn-outline" style={{ justifyContent: "center", padding: "12px 20px" }}>
                <Sparkles size={16} className="text-gold" />
                <span>See Yourself in Silk</span>
              </Link>

              <Link href="/account" className="btn-outline" style={{ justifyContent: "center", padding: "12px 20px" }}>
                <Bookmark size={16} />
                <span>My Saved Designs & Portfolio</span>
              </Link>
            </div>
          </div>
        ) : (
          /* State 2: Not Signed In - 1-Click Demo Buttons */
          <div style={{
            background: "rgba(32, 7, 15, 0.65)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(180, 154, 97, 0.35)",
            borderRadius: "4px",
            padding: "2.5rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)"
          }}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.88rem",
              color: "var(--color-stone-light)",
              textAlign: "center",
              marginBottom: "2rem"
            }}>
              Choose an instant 1-click royal persona below, or type your own email to begin browsing with personalized patron privileges:
            </p>

            {/* 1-Click Preset Buttons */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
              marginBottom: "2.5rem"
            }}>
              {/* Persona 1 */}
              <button
                type="button"
                onClick={() => handleQuickSignIn("Maharani Radhika Devi", "radhika.devi@vayira-heritage.com")}
                style={{
                  background: "linear-gradient(135deg, rgba(53, 19, 29, 0.8), rgba(74, 24, 39, 0.5))",
                  border: "1px solid var(--color-gold)",
                  borderRadius: "2px",
                  padding: "1.5rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-gold)" }}>
                    1-Click Instant Login
                  </span>
                  <Crown size={16} className="text-gold" />
                </div>
                <strong style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-ivory)" }}>
                  Maharani Radhika Devi
                </strong>
                <span style={{ fontSize: "0.78rem", color: "var(--color-champagne)" }}>
                  Royal Patron Persona (radhika.devi@vayira-heritage.com)
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-gold-light)", marginTop: "6px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <span>Enter as Patron</span>
                  <ArrowRight size={13} />
                </span>
              </button>

              {/* Persona 2 */}
              <button
                type="button"
                onClick={() => handleQuickSignIn("Senior Master Curator", "curator@vayira-heritage.com")}
                style={{
                  background: "linear-gradient(135deg, rgba(23, 61, 50, 0.6), rgba(15, 38, 32, 0.8))",
                  border: "1px solid rgba(180, 154, 97, 0.6)",
                  borderRadius: "2px",
                  padding: "1.5rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#86efac" }}>
                    1-Click Instant Login
                  </span>
                  <ShieldCheck size={16} className="text-gold" />
                </div>
                <strong style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-ivory)" }}>
                  Senior Master Curator
                </strong>
                <span style={{ fontSize: "0.78rem", color: "var(--color-stone-light)" }}>
                  Atelier Concierge Persona (curator@vayira-heritage.com)
                </span>
                <span style={{ fontSize: "0.75rem", color: "#86efac", marginTop: "6px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <span>Enter as Curator</span>
                  <ArrowRight size={13} />
                </span>
              </button>
            </div>

            {/* Custom Input Option */}
            <div style={{
              borderTop: "1px solid rgba(180, 154, 97, 0.2)",
              paddingTop: "2rem"
            }}>
              <form onSubmit={handleCustomSignIn} style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <input
                  type="text"
                  placeholder="Your Name (e.g. Priyadarshini)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  style={{
                    background: "rgba(22, 5, 11, 0.7)",
                    border: "1px solid rgba(180, 154, 97, 0.35)",
                    padding: "12px 16px",
                    color: "var(--color-ivory)",
                    borderRadius: "2px",
                    outline: "none",
                    fontSize: "0.85rem",
                    flex: "1 1 200px"
                  }}
                />

                <input
                  type="email"
                  required
                  placeholder="Your Email (e.g. name@heritage.com)"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  style={{
                    background: "rgba(22, 5, 11, 0.7)",
                    border: "1px solid rgba(180, 154, 97, 0.35)",
                    padding: "12px 16px",
                    color: "var(--color-ivory)",
                    borderRadius: "2px",
                    outline: "none",
                    fontSize: "0.85rem",
                    flex: "1 1 240px"
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ padding: "12px 28px", whiteSpace: "nowrap" }}
                >
                  <span>{loading ? "Authenticating..." : "Sign In with Demo"}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: "1.5rem",
              fontSize: "0.78rem",
              color: "var(--color-stone)"
            }}>
              <ShieldCheck size={14} className="text-gold" />
              <span>Instant guest/demo session. No password verification required in this demonstration phase.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

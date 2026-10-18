"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import VayiraCrest from "@/components/ui/VayiraCrest";
import { X, Lock, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, signIn, signUp, isConfigured } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        setSuccess(isConfigured ? "Please check your email to confirm your account!" : "Welcome to VAYIRA! Demo account created.");
      } else {
        await signIn(email, password);
        setSuccess("Welcome back to VAYIRA.");
      }
      setTimeout(() => {
        setAuthModalOpen(false);
      }, 1000);
    } catch (err) {
      setError(err.message || "Authentication error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(16, 4, 8, 0.8)",
        backdropFilter: "blur(10px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}
      onClick={() => setAuthModalOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div 
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#1F0710",
          border: "1px solid rgba(180, 154, 97, 0.4)",
          borderRadius: "4px",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.9)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setAuthModalOpen(false)}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "transparent",
            border: "none",
            color: "var(--color-stone)",
            cursor: "pointer"
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <VayiraCrest size={44} />
          <h3 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "1.45rem", 
            letterSpacing: "0.14em", 
            color: "var(--color-gold)", 
            marginTop: "0.75rem",
            marginBottom: "0.25rem" 
          }}>
            {isSignUp ? "Create Royal Account" : "Enter the World of VAYIRA"}
          </h3>
          <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "var(--color-champagne)", fontSize: "0.95rem" }}>
            {isSignUp ? "Save your custom saree atelier creations and bridal consultations" : "Sign in to access your saved heirlooms and loom reservations"}
          </p>
        </div>

        {error && (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 8, 
            padding: "10px 14px", 
            backgroundColor: "rgba(239, 68, 68, 0.15)", 
            border: "1px solid rgba(239, 68, 68, 0.4)", 
            color: "#fca5a5", 
            fontSize: "0.82rem", 
            borderRadius: "2px", 
            marginBottom: "1.25rem" 
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 8, 
            padding: "10px 14px", 
            backgroundColor: "rgba(34, 197, 94, 0.15)", 
            border: "1px solid rgba(34, 197, 94, 0.4)", 
            color: "#86efac", 
            fontSize: "0.82rem", 
            borderRadius: "2px", 
            marginBottom: "1.25rem" 
          }}>
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {isSignUp && (
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "6px" }}>
                Full Name
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "10px 14px", background: "rgba(32, 7, 15, 0.6)" }}>
                <User size={16} className="text-stone" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Devi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.88rem" }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "6px" }}>
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
                style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.88rem" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(180, 154, 97, 0.35)", borderRadius: "2px", padding: "10px 14px", background: "rgba(32, 7, 15, 0.6)" }}>
              <Lock size={16} className="text-stone" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: "transparent", border: "none", color: "var(--color-ivory)", outline: "none", width: "100%", fontSize: "0.88rem" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            {loading ? "Authenticating..." : isSignUp ? "Create Account" : "Sign In to VAYIRA"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.82rem", color: "var(--color-stone)" }}>
          {isSignUp ? (
            <p>
              Already possess an account?{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setError(""); }}
                style={{ background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer", textDecoration: "underline" }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              First visit to the House of VAYIRA?{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setError(""); }}
                style={{ background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer", textDecoration: "underline" }}
              >
                Register Here
              </button>
            </p>
          )}
        </div>

        {!isConfigured && (
          <p style={{ marginTop: "1rem", fontSize: "0.7rem", color: "var(--color-stone)", textAlign: "center", fontStyle: "italic" }}>
            *Local demonstration mode active. Instant guest authentication enabled.
          </p>
        )}
      </div>
    </div>
  );
}

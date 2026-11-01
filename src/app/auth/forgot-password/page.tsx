"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--stone)",
    border: "1px solid rgba(201,168,76,0.15)",
    padding: "0.85rem 1rem",
    color: "var(--parchment)",
    fontSize: "1rem",
    fontFamily: "Crimson Pro, serif",
    outline: "none",
    boxSizing: "border-box",
    WebkitAppearance: "none",
    borderRadius: 0,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem 1rem",
        background: "var(--stone)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link
            href="/"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.1rem, 5vw, 1.5rem)",
              fontWeight: 900,
              letterSpacing: "0.3em",
              color: "var(--gold)",
              textDecoration: "none",
            }}
          >
            THE EXCELSUS
          </Link>
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "Cinzel, serif",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--iron)",
            }}
          >
            Reclaim Your Access
          </p>
        </div>

        <div
          style={{
            border: "1px solid rgba(201,168,76,0.15)",
            padding: "clamp(1.5rem, 5vw, 2.5rem)",
            background: "var(--stone2)",
          }}
        >
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
              margin:
                "clamp(-1.5rem, -5vw, -2.5rem) clamp(-1.5rem, -5vw, -2.5rem) 2.5rem",
            }}
          />

          {sent ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚔</div>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Dispatch Sent
              </p>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--parchment-dim)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                If an account exists for{" "}
                <strong style={{ color: "var(--parchment)" }}>{email}</strong>,
                a reset link has been dispatched. Check your inbox — and your
                spam folder.
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--iron)",
                  lineHeight: 1.6,
                }}
              >
                Links expire after 1 hour. If you don't receive it, try again or
                contact{" "}
                <a
                  href="mailto:support@excelsus.live"
                  style={{ color: "var(--gold)", textDecoration: "none" }}
                >
                  support@excelsus.live
                </a>
              </p>
              <Link
                href="/auth/login"
                style={{
                  display: "inline-block",
                  marginTop: "1.5rem",
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  textDecoration: "none",
                  border: "1px solid rgba(201,168,76,0.15)",
                  padding: "0.6rem 1.5rem",
                }}
              >
                ← Back to Login
              </Link>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--parchment-dim)",
                  lineHeight: 1.7,
                  marginBottom: "1.75rem",
                }}
              >
                Enter the email address on your account. We'll send you a link
                to reset your password.
              </p>

              {error && (
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#B22222",
                    background: "rgba(139,26,26,0.1)",
                    border: "1px solid rgba(139,26,26,0.2)",
                    padding: "0.75rem",
                    marginBottom: "1.25rem",
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </p>
              )}

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--iron)",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    background: loading ? "var(--gold-dim)" : "var(--gold)",
                    color: "#0F0D0B",
                    padding: "1rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    width: "100%",
                    minHeight: "48px",
                  }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "1.5rem",
                  fontSize: "0.88rem",
                  color: "var(--iron)",
                }}
              >
                Remembered it?{" "}
                <Link
                  href="/auth/login"
                  style={{ color: "var(--gold)", textDecoration: "none" }}
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

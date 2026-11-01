"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  }

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
            Return to the Forge
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
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
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
                style={inputStyle}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.5rem",
                }}
              >
                <label
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--iron)",
                  }}
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold-dim)",
                    textDecoration: "none",
                  }}
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
                transition: "background 0.2s",
                width: "100%",
                minHeight: "48px",
              }}
            >
              {loading ? "Entering..." : "Enter the Forge"}
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
            New to the brotherhood?{" "}
            <Link
              href="/auth/signup"
              style={{ color: "var(--gold)", textDecoration: "none" }}
            >
              Begin your ascent
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

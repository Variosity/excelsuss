"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateUsername } from "@/lib/utils/contentFilter";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Username validation
    const usernameCheck = validateUsername(username);
    if (!usernameCheck.ok) {
      setError(usernameCheck.reason || "Invalid username.");
      return;
    }

    setLoading(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, selected_plan: "free" } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      // Fire signup notification — non-blocking, don't await
      fetch("/api/auth/signup-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }),
      }).catch(() => {}); // silently ignore if it fails
      router.push("/dashboard");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "var(--stone)",
    border: "1px solid rgba(201,168,76,0.2)",
    color: "var(--white)",
    fontFamily: "Crimson Pro, serif",
    fontSize: "1rem",
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
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
            Begin Your Ascent — Free
          </p>
        </div>

        <div
          style={{
            border: "1px solid rgba(201,168,76,0.15)",
            padding: "clamp(1.25rem, 5vw, 2.5rem)",
            background: "var(--stone2)",
          }}
        >
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
              margin:
                "clamp(-1.25rem, -5vw, -2.5rem) clamp(-1.25rem, -5vw, -2.5rem) 2rem",
            }}
          />

          {/* Founding member callout */}
          <div
            style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "0.875rem 1rem",
              marginBottom: "1.75rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.25rem",
              }}
            >
              Founding Member Access
            </p>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--iron)",
                lineHeight: 1.5,
              }}
            >
              Create your account free. Upgrade anytime from your dashboard.
            </p>
          </div>

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
            onSubmit={handleSignup}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  marginBottom: "0.5rem",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Your name, brother"
                autoComplete="username"
                style={inputStyle}
              />
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "var(--iron)",
                  marginTop: "0.3rem",
                }}
              >
                Letters, numbers, underscores, hyphens. 3–30 characters.
              </p>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
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
                placeholder="your@email.com"
                autoComplete="email"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "1rem",
                background: loading ? "rgba(201,168,76,0.3)" : "var(--gold)",
                color: "var(--stone)",
                fontFamily: "Cinzel, serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                width: "100%",
                minHeight: "48px",
              }}
            >
              {loading ? "Entering the forge..." : "Enter the Forge — Free"}
            </button>
          </form>

          <p
            style={{
              marginTop: "1.75rem",
              textAlign: "center",
              fontSize: "0.88rem",
              color: "var(--iron)",
            }}
          >
            Already a member?{" "}
            <Link
              href="/auth/login"
              style={{ color: "var(--gold)", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Tier preview */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.5rem",
          }}
        >
          {[
            { name: "Discipulus", price: "$29", label: "Core access" },
            { name: "Miles", price: "$79", label: "Brotherhood cells" },
            { name: "Excelsus", price: "$197", label: "Elite network" },
          ].map((tier) => (
            <div
              key={tier.name}
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "0.875rem 0.5rem",
                background: "var(--stone2)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "clamp(0.5rem, 2vw, 0.65rem)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.25rem",
                }}
              >
                {tier.name}
              </p>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "clamp(0.85rem, 3vw, 1.1rem)",
                  fontWeight: 900,
                  color: "var(--white)",
                }}
              >
                {tier.price}
                <span style={{ fontSize: "0.6rem", color: "var(--iron)" }}>
                  /mo
                </span>
              </p>
              <p
                style={{
                  fontSize: "0.6rem",
                  color: "var(--iron)",
                  marginTop: "0.2rem",
                }}
              >
                {tier.label}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "var(--iron)",
            marginTop: "0.75rem",
            opacity: 0.6,
            lineHeight: 1.5,
          }}
        >
          Upgrade anytime from your dashboard. No card required to join.
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "var(--stone)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "var(--gold)",
              fontFamily: "Cinzel, serif",
              letterSpacing: "0.2em",
            }}
          >
            LOADING...
          </p>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}

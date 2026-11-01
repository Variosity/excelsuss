"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Supabase sends the recovery token as a fragment (#access_token=..&type=recovery)
  // The client SDK handles this automatically on load — we just need to detect it
  useEffect(() => {
    async function checkSession() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      // Listen for the SIGNED_IN event that fires after recovery token is consumed
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event: string) => {
        if (event === "PASSWORD_RECOVERY") {
          setSessionReady(true);
        }
      });
      // Also check if already in a recovery session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setSessionReady(true);
      return () => subscription.unsubscribe();
    }
    checkSession();
  }, []);

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

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
    setTimeout(() => router.push("/dashboard"), 2500);
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
            Set New Password
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

          {done ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚔</div>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.75rem",
                }}
              >
                Password Updated
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--parchment-dim)",
                  lineHeight: 1.7,
                }}
              >
                Your credentials have been forged anew. Redirecting you to the
                dashboard...
              </p>
            </div>
          ) : !sessionReady ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                }}
              >
                Verifying your link...
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--iron)",
                  marginTop: "1rem",
                  lineHeight: 1.6,
                }}
              >
                If this takes more than a few seconds, your link may have
                expired.{" "}
                <Link
                  href="/auth/forgot-password"
                  style={{ color: "var(--gold)", textDecoration: "none" }}
                >
                  Request a new one.
                </Link>
              </p>
            </div>
          ) : (
            <>
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
                onSubmit={handleReset}
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
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    style={inputStyle}
                  />
                </div>
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
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Repeat your new password"
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
                  {loading ? "Updating..." : "Set New Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
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
      <ResetPasswordForm />
    </Suspense>
  );
}

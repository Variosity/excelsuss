export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    token_hash?: string;
    type?: string;
    next?: string;
    error?: string;
    error_description?: string;
  }>;
}

export default async function ConfirmPage({ searchParams }: Props) {
  const params = await searchParams;
  const { token_hash, type, next, error, error_description } = params;

  // If there's a token, verify it
  if (token_hash && type) {
    const supabase = await createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "signup" | "recovery" | "email_change",
    });
    if (!verifyError) {
      redirect(next || "/dashboard");
    }
  }

  // Error state
  const hasError = error || (token_hash && !type);
  const message =
    error_description ||
    error ||
    "Something went wrong with your confirmation link.";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--stone)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "480px", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "1.5rem",
            fontWeight: 900,
            letterSpacing: "0.3em",
            color: "var(--gold)",
            textDecoration: "none",
          }}
        >
          THE EXCELSUS
        </Link>

        {hasError ? (
          <div
            style={{
              marginTop: "3rem",
              border: "1px solid rgba(139,26,26,0.3)",
              padding: "2.5rem",
              background: "var(--stone2)",
            }}
          >
            <div
              style={{
                height: "2px",
                background:
                  "linear-gradient(90deg,transparent,#8B1A1A,transparent)",
                margin: "-2.5rem -2.5rem 2.5rem",
              }}
            />
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#B22222",
                marginBottom: "1rem",
              }}
            >
              Confirmation Failed
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--parchment-dim)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              {message}
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--iron)",
                marginBottom: "1.5rem",
              }}
            >
              Your link may have expired. Links are valid for 24 hours.
            </p>
            <Link
              href="/auth/login"
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "var(--gold)",
                color: "#0F0D0B",
                padding: "0.75rem 2rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <div
            style={{
              marginTop: "3rem",
              border: "1px solid rgba(201,168,76,0.15)",
              padding: "2.5rem",
              background: "var(--stone2)",
            }}
          >
            <div
              style={{
                height: "2px",
                background:
                  "linear-gradient(90deg,transparent,var(--gold),transparent)",
                margin: "-2.5rem -2.5rem 2.5rem",
              }}
            />
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚔</div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Welcome, Brother
            </p>
            <h1
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "1rem",
              }}
            >
              Your Path Begins Here
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--parchment-dim)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Your account has been confirmed. The forge is open. Enter and
              begin your ascent.
            </p>
            <div
              style={{
                borderTop: "1px solid rgba(201,168,76,0.12)",
                borderBottom: "1px solid rgba(201,168,76,0.12)",
                padding: "1rem",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.72rem",
                  fontStyle: "italic",
                  color: "var(--gold-dim)",
                }}
              >
                Aut viam inveniam aut faciam
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--iron)",
                  marginTop: "0.25rem",
                }}
              >
                "I shall find a way or make one." — Hannibal
              </p>
            </div>
            <Link
              href="/dashboard"
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "var(--gold)",
                color: "#0F0D0B",
                padding: "0.9rem 2.5rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Enter the Forge
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

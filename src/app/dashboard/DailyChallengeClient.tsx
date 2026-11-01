"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Challenge {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  pillar: string;
}

const PILLAR_COLORS: Record<string, string> = {
  stoicism: "#8B9467",
  warrior: "#8B1A1A",
  wealth: "var(--gold-dim)",
  psychology: "#6B3A6B",
  physical: "#3A7A5A",
  spirituality: "#C9A84C",
  legacy: "#6B4A3A",
  social: "#3A6B8B",
};

export default function DailyChallengeClient({
  challenge,
  userId,
  alreadyCompleted,
}: {
  challenge: Challenge | null;
  userId: string;
  alreadyCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [modalOpen, setModalOpen] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [xpFlash, setXpFlash] = useState(false);
  const router = useRouter();

  if (!challenge) return null;

  const pillarColor = PILLAR_COLORS[challenge.pillar] || "var(--gold-dim)";

  async function markComplete() {
    if (completed || completing || !challenge) return;
    const c = challenge;
    setCompleting(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    // Check if already completed (prevents double XP)
    const { data: existing } = await supabase
      .from("challenge_completions")
      .select("challenge_id")
      .eq("user_id", userId)
      .eq("challenge_id", c.id)
      .maybeSingle();

    if (existing) {
      // Already done — update UI only, no XP
      setCompleted(true);
      setCompleting(false);
      setModalOpen(false);
      return;
    }

    // Fresh completion — insert row
    const { error: insertError } = await supabase
      .from("challenge_completions")
      .insert({ challenge_id: c.id, user_id: userId });

    if (insertError) {
      console.error("Completion insert failed:", insertError.message);
      setCompleting(false);
      return;
    }

    // Award XP only on successful fresh insert
    await supabase.rpc("award_xp", {
      p_user_id: userId,
      p_xp: c.xp_reward,
    });
    // Also update streak
    await fetch("/api/streak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: new Date().toLocaleDateString("en-CA") }),
    });
    setCompleted(true);
    setCompleting(false);
    setModalOpen(false);
    setXpFlash(true);
    setTimeout(() => setXpFlash(false), 3000);
    router.refresh();
  }

  return (
    <>
      <div
        style={{
          border: `1px solid ${completed ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.15)"}`,
          padding: "1.5rem",
          background: "var(--stone2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {completed && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg,transparent,var(--gold),transparent)",
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Daily Challenge
            </p>
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: pillarColor,
                border: `1px solid ${pillarColor}40`,
                padding: "0.1rem 0.4rem",
              }}
            >
              {challenge.pillar}
            </span>
          </div>
          <h3
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: completed ? "var(--iron)" : "var(--white)",
              marginBottom: "0.35rem",
            }}
          >
            {challenge.title}
          </h3>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--iron)",
              lineHeight: 1.6,
            }}
          >
            {challenge.description.length > 120
              ? challenge.description.slice(0, 120) + "..."
              : challenge.description}
          </p>
        </div>
        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.4rem",
              fontWeight: 900,
              color: completed ? "var(--iron)" : "var(--gold)",
              marginBottom: "0.5rem",
            }}
          >
            +{challenge.xp_reward} XP
          </div>
          {completed ? (
            <div
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                border: "1px solid rgba(201,168,76,0.3)",
                padding: "0.6rem 1.25rem",
              }}
            >
              ✓ Complete
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.68rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "var(--gold)",
                color: "#0F0D0B",
                padding: "0.75rem 1.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                minHeight: "44px",
              }}
            >
              Begin
            </button>
          )}
        </div>
      </div>

      {/* XP flash */}
      {xpFlash && (
        <div
          style={{
            position: "fixed",
            top: "5rem",
            right: "2rem",
            zIndex: 200,
            background: "var(--stone2)",
            border: "1px solid var(--gold)",
            padding: "1rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "var(--gold)",
              lineHeight: 1,
            }}
          >
            +{challenge.xp_reward}
          </div>
          <div
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--iron)",
              marginTop: "0.25rem",
            }}
          >
            XP Earned
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "var(--stone2)",
              border: `1px solid ${pillarColor}40`,
              padding: "2.5rem",
            }}
          >
            <div
              style={{
                height: "2px",
                background: `linear-gradient(90deg,transparent,${pillarColor},transparent)`,
                margin: "-2.5rem -2.5rem 2.5rem",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: pillarColor,
                }}
              >
                {challenge.pillar}
              </span>
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                +{challenge.xp_reward} XP
              </span>
            </div>

            <h2
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "1.25rem",
                lineHeight: 1.2,
              }}
            >
              {challenge.title}
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--parchment-dim)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {challenge.description}
            </p>

            <div
              style={{
                borderTop: "1px solid rgba(201,168,76,0.1)",
                paddingTop: "1.5rem",
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "var(--iron)",
                  padding: "0.7rem 1.5rem",
                  border: "1px solid rgba(201,168,76,0.15)",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Later
              </button>
              <button
                onClick={markComplete}
                disabled={completing}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: completing ? "var(--gold-dim)" : "var(--gold)",
                  color: "#0F0D0B",
                  padding: "0.7rem 2rem",
                  border: "none",
                  cursor: completing ? "not-allowed" : "pointer",
                  minHeight: "44px",
                }}
              >
                {completing ? "Marking..." : "I Completed This ✓"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

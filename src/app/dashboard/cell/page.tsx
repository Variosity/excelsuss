export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";

export default async function CellPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  const isSoldierPlus = ["miles", "excelsus"].includes(
    profile?.membership_tier || "",
  );

  return (
    <div style={{ padding: "clamp(1rem, 4vw, 2.5rem)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-dim)",
            }}
          >
            Brotherhood
          </span>
          <h1
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              fontWeight: 700,
              color: "var(--white)",
              margin: "0.5rem 0 0.35rem",
            }}
          >
            My Accountability Cell
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--iron)",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Five men. One standard. No excuses. The accountability cell is where
            brotherhood becomes action.
          </p>
        </div>

        {!isSoldierPlus ? (
          /* Upsell for Discipulus */
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "clamp(1.5rem, 5vw, 3rem)",
              background: "var(--stone2)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: "2px",
                background:
                  "linear-gradient(90deg,transparent,var(--gold),transparent)",
                margin:
                  "clamp(-1.5rem, -5vw, -3rem) clamp(-1.5rem, -5vw, -3rem) clamp(1.5rem, 5vw, 3rem)",
              }}
            />
            <div
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "3rem",
                color: "var(--gold)",
                marginBottom: "1.5rem",
                opacity: 0.3,
              }}
            >
              ❧
            </div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Miles Tier Required
            </p>
            <h2
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              The Brotherhood Lives
              <br />
              in the Cell
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--iron)",
                lineHeight: 1.7,
                maxWidth: "480px",
                margin: "0 auto 2rem",
              }}
            >
              Accountability cells are the highest-retention feature in The
              Excelsus. Five men who meet weekly, hold each other accountable,
              and refuse to let each other quit. Men who've been in a cell for 6
              months don't leave.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.75rem",
                maxWidth: "480px",
                margin: "0 auto 2rem",
                textAlign: "left",
              }}
            >
              {[
                "Weekly cell meetings",
                "5-man maximum",
                "Shared goal tracking",
                "War council access",
                "Cell leaderboard",
                "Private channel",
              ].map((f) => (
                <div
                  key={f}
                  style={{
                    border: "1px solid rgba(201,168,76,0.1)",
                    padding: "0.75rem",
                    fontSize: "0.78rem",
                    color: "var(--parchment-dim)",
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ color: "var(--gold)", marginRight: "0.4rem" }}>
                    ✦
                  </span>
                  {f}
                </div>
              ))}
            </div>

            <a
              href="/dashboard/upgrade"
              style={{
                display: "inline-block",
                fontFamily: "Cinzel, serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "var(--gold)",
                color: "#0F0D0B",
                padding: "1rem 2rem",
                textDecoration: "none",
                minHeight: "48px",
              }}
            >
              Upgrade to Miles — $79/mo
            </a>
          </div>
        ) : (
          /* Cell management for Miles+ */
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                padding: "1.5rem",
                background: "var(--stone2)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Cell Status
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--parchment-dim)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.6,
                }}
              >
                You are not currently in an accountability cell. Join an
                existing cell or create your own.
              </p>
              <div
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <button
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    background: "var(--gold)",
                    color: "#0F0D0B",
                    padding: "0.875rem 1.5rem",
                    border: "none",
                    cursor: "pointer",
                    minHeight: "44px",
                  }}
                >
                  Create a Cell
                </button>
                <button
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    background: "transparent",
                    color: "var(--gold)",
                    padding: "0.875rem 1.5rem",
                    border: "1px solid rgba(201,168,76,0.3)",
                    cursor: "pointer",
                    minHeight: "44px",
                  }}
                >
                  Browse Open Cells
                </button>
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "1.5rem",
                background: "var(--stone2)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1.25rem",
                }}
              >
                The Cell Protocol
              </p>
              {[
                {
                  step: "01",
                  title: "Form or Join",
                  desc: "Maximum 5 men per cell. A cell closes when full.",
                },
                {
                  step: "02",
                  title: "Set Your Standard",
                  desc: "Each cell sets weekly commitments — workouts, lessons, goals. Non-negotiable.",
                },
                {
                  step: "03",
                  title: "Weekly War Council",
                  desc: "Meet every week. Report in. What did you do? What didn't you? Why?",
                },
                {
                  step: "04",
                  title: "Enforce the Standard",
                  desc: "The cell holds each member accountable. Excuses are not accepted.",
                },
                {
                  step: "05",
                  title: "Rise Together",
                  desc: "Cell leaderboards. Group XP. When the weakest man rises, the whole cell rises.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid rgba(201,168,76,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "1.1rem",
                      fontWeight: 900,
                      color: "rgba(201,168,76,0.2)",
                      flexShrink: 0,
                      width: "2rem",
                    }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "var(--white)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--iron)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const incomeModels = [
  {
    icon: "◉",
    title: "Service Business",
    desc: "Agency, freelancing, consulting. Trade skill for money first. Fastest path to $5k/mo.",
    time: "0–6 months",
  },
  {
    icon: "◈",
    title: "AI-Powered Products",
    desc: "No-code SaaS, AI tools, automation. Build once, sell repeatedly.",
    time: "3–12 months",
  },
  {
    icon: "❧",
    title: "Content & Community",
    desc: "This platform. Newsletter. Course. Audience becomes revenue.",
    time: "6–18 months",
  },
  {
    icon: "Σ",
    title: "Investment Architecture",
    desc: "Index funds, real estate, crypto. Money making money.",
    time: "Ongoing",
  },
  {
    icon: "Δ",
    title: "Business Acquisition",
    desc: "Buy existing cashflowing businesses with no money down.",
    time: "12–24 months",
  },
];

const aiTools = [
  {
    name: "Claude / ChatGPT",
    use: "Content creation, code generation, business strategy",
  },
  {
    name: "Make / Zapier",
    use: "Automation workflows — replace $50k/yr VA with $20/mo tool",
  },
  {
    name: "Midjourney / Runway",
    use: "Marketing visuals, video content at scale",
  },
  { name: "ElevenLabs", use: "Voice cloning for content, courses, podcasts" },
  {
    name: "Cursor / GitHub Copilot",
    use: "Build software products without being a full developer",
  },
  { name: "n8n", use: "Self-hosted automation — own your systems" },
];

const TIER_COLORS: Record<string, string> = {
  discipulus: "var(--iron)",
  miles: "var(--gold)",
  excelsus: "#B22222",
};

export default async function WealthPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select(
      "id, slug, title, subtitle, tier_required, total_lessons, duration_hours, latin_quote",
    )
    .eq("pillar", "wealth")
    .order("order_index", { ascending: true });

  const wealthCourses = courses || [];
  const builtCourses = wealthCourses.filter((c) => (c.total_lessons || 0) > 0);
  const comingSoon = wealthCourses.filter((c) => (c.total_lessons || 0) === 0);

  return (
    <div
      style={{
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
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
          Financial Mastery
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
          Wealth Architecture
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--iron)",
            lineHeight: 1.7,
            maxWidth: "640px",
          }}
        >
          Wealth is not luck. It is architecture. You design income streams the
          same way an engineer designs a system — with intention, redundancy,
          and scale.
        </p>
        <div
          style={{
            marginTop: "1.25rem",
            borderLeft: "2px solid var(--gold-dim)",
            paddingLeft: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.75rem",
              fontStyle: "italic",
              color: "var(--gold-dim)",
            }}
          >
            Fortuna audaces iuvat
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--iron)" }}>
            "Fortune favors the bold." — Virgil
          </p>
        </div>
      </div>

      {/* Income Models */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "var(--white)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          Five Income Architectures
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {incomeModels.map((model, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1rem",
                alignItems: "center",
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "1.25rem",
                background: "var(--stone2)",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "1.2rem",
                  color: "var(--gold)",
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {model.icon}
              </span>
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {model.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--iron)",
                    lineHeight: 1.5,
                  }}
                >
                  {model.desc}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold-dim)",
                  whiteSpace: "nowrap",
                  border: "1px solid rgba(201,168,76,0.2)",
                  padding: "0.25rem 0.6rem",
                  flexShrink: 0,
                }}
              >
                {model.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "var(--white)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          AI Leverage Stack
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "0.75rem",
          }}
        >
          {aiTools.map((tool) => (
            <div
              key={tool.name}
              style={{
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "1.25rem",
                background: "var(--stone2)",
                minWidth: 0,
              }}
            >
              <h3
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                  marginBottom: "0.35rem",
                }}
              >
                {tool.name}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--iron)",
                  lineHeight: 1.5,
                }}
              >
                {tool.use}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wealth Courses */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "1.25rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--white)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Wealth Courses
          </h2>
          <Link
            href="/dashboard/courses"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View All →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "1rem",
          }}
        >
          {/* Available courses */}
          {builtCourses.map((course) => {
            const tierColor =
              TIER_COLORS[course.tier_required] || "var(--iron)";
            return (
              <Link
                key={course.id}
                href={`/dashboard/courses/${course.slug}`}
                style={{
                  textDecoration: "none",
                  border: "1px solid rgba(201,168,76,0.12)",
                  padding: "1.5rem",
                  background: "var(--stone2)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: tierColor,
                    border: `1px solid ${tierColor}60`,
                    padding: "0.15rem 0.5rem",
                    display: "inline-block",
                    width: "fit-content",
                    marginBottom: "0.75rem",
                  }}
                >
                  {course.tier_required}
                </span>
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    margin: "0 0 0.35rem",
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    fontStyle: "italic",
                    color: "var(--parchment-dim)",
                    marginBottom: "0.5rem",
                    flex: 1,
                  }}
                >
                  {course.subtitle}
                </p>
                <p style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                  {course.total_lessons} lessons · {course.duration_hours}h
                </p>
                {course.latin_quote && (
                  <div
                    style={{
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid rgba(201,168,76,0.08)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.63rem",
                        fontStyle: "italic",
                        color: "var(--gold-dim)",
                      }}
                    >
                      ❝ {course.latin_quote}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}

          {/* Coming soon — greyed, non-clickable */}
          {comingSoon.map((course) => (
            <div
              key={course.id}
              style={{
                border: "1px solid rgba(201,168,76,0.06)",
                padding: "1.5rem",
                background: "var(--stone)",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                opacity: 0.5,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "rgba(107,58,107,0.6)",
                  color: "rgba(255,255,255,0.7)",
                  padding: "0.2rem 0.6rem",
                }}
              >
                Coming Soon
              </div>
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TIER_COLORS[course.tier_required] || "var(--iron)",
                  border: `1px solid ${TIER_COLORS[course.tier_required] || "var(--iron)"}40`,
                  padding: "0.15rem 0.5rem",
                  display: "inline-block",
                  width: "fit-content",
                  marginBottom: "0.75rem",
                }}
              >
                {course.tier_required}
              </span>
              <h3
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "var(--iron)",
                  margin: "0 0 0.35rem",
                  lineHeight: 1.3,
                }}
              >
                {course.title}
              </h3>
              <p
                style={{
                  fontSize: "0.78rem",
                  fontStyle: "italic",
                  color: "var(--iron)",
                  flex: 1,
                }}
              >
                {course.subtitle}
              </p>
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "var(--iron)",
                  marginTop: "0.5rem",
                }}
              >
                {course.duration_hours}h planned
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

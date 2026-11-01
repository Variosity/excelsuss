// dashboard/sovereignty/page.tsx
export const dynamic = "force-dynamic";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const countries = [
  {
    name: "UAE (Dubai)",
    tax: "0% income tax",
    visa: "Freelancer / Investor Visa",
    cost: "~$5k setup",
    notes:
      "No income tax, world-class infrastructure, banking, safety. Best overall.",
    highlight: true,
  },
  {
    name: "Portugal",
    tax: "NHR scheme",
    visa: "D8 / D7 / Golden Visa",
    cost: "€500k+ (Golden)",
    notes: "EU access, NHR tax regime, good lifestyle. Slower but solid.",
  },
  {
    name: "Paraguay",
    tax: "Territorial only",
    visa: "Permanent residency",
    cost: "$5k",
    notes: "Cheapest second residency on earth. Fast. Territorial tax system.",
  },
  {
    name: "Georgia (Tbilisi)",
    tax: "1% flat on foreign income",
    visa: "Virtual Zone / 365-day stay",
    cost: "Minimal",
    notes: "Easiest banking, lowest tax, growing expat community.",
  },
  {
    name: "Panama",
    tax: "Territorial only",
    visa: "Friendly Nations Visa",
    cost: "$5k",
    notes:
      "Strong banking secrecy, Friendly Nations list, no tax on foreign income.",
  },
  {
    name: "Thailand",
    tax: "LTR Visa scheme",
    visa: "Long Term Resident",
    cost: "$80k/yr income req.",
    notes: "Southeast Asia hub, low cost, excellent quality of life.",
  },
];

const TIER_COLORS: Record<string, string> = {
  discipulus: "var(--iron)",
  miles: "var(--gold)",
  excelsus: "#B22222",
};

export default async function SovereigntyPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select(
      "id, slug, title, subtitle, tier_required, total_lessons, duration_hours, latin_quote",
    )
    .eq("pillar", "sovereignty")
    .order("order_index", { ascending: true });

  const sovCourses = courses || [];
  const builtCourses = sovCourses.filter((c) => (c.total_lessons || 0) > 0);
  const comingSoon = sovCourses.filter((c) => (c.total_lessons || 0) === 0);

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
            color: "#6B8B9A",
          }}
        >
          Legal Sovereignty
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
          Free Movement. Sovereign Wealth.
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--iron)",
            lineHeight: 1.7,
            maxWidth: "640px",
          }}
        >
          The nation-state is not your prison. Tax is not destiny. A free man
          structures his life across jurisdictions — legally — and keeps what he
          earns.
        </p>
        <div
          style={{
            marginTop: "1.25rem",
            borderLeft: "2px solid #6B8B9A",
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
            Ubi bene, ibi patria
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--iron)" }}>
            "Where it is well, there is my homeland." — Ancient Latin
          </p>
        </div>
      </div>

      {/* Flag Theory */}
      <div
        style={{
          border: "1px solid rgba(107,139,154,0.25)",
          padding: "2rem",
          background: "var(--stone2)",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "var(--white)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Flag Theory: The Framework
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              flag: "Flag 1",
              label: "Citizenship",
              desc: "Where your passport is from",
            },
            {
              flag: "Flag 2",
              label: "Residency",
              desc: "Where you legally live (tax home)",
            },
            {
              flag: "Flag 3",
              label: "Business",
              desc: "Where your company is incorporated",
            },
            {
              flag: "Flag 4",
              label: "Banking",
              desc: "Where your money is held",
            },
            {
              flag: "Flag 5",
              label: "Investments",
              desc: "Where your assets are structured",
            },
            {
              flag: "Flag 6",
              label: "Digital",
              desc: "Where your online presence operates",
            },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                border: "1px solid rgba(107,139,154,0.15)",
                padding: "1rem",
                background: "var(--stone3)",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#6B8B9A",
                  marginBottom: "0.35rem",
                }}
              >
                {f.label}
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--iron)",
                  lineHeight: 1.5,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--iron)",
            marginTop: "1rem",
            lineHeight: 1.65,
          }}
        >
          Separate these across jurisdictions strategically and you can legally
          minimize taxes to near zero while living in the country you choose.
        </p>
      </div>

      {/* Country Cards */}
      <div style={{ marginBottom: "2.5rem" }}>
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
          Best Countries for Free Men (2026)
        </h2>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {countries.map((c) => (
            <div
              key={c.name}
              style={{
                border: c.highlight
                  ? "1px solid rgba(107,139,154,0.4)"
                  : "1px solid rgba(107,139,154,0.15)",
                padding: "1.25rem 1.5rem",
                background: c.highlight ? "var(--stone3)" : "var(--stone2)",
                position: "relative",
              }}
            >
              {c.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg,transparent,#6B8B9A,transparent)",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  marginBottom: "0.6rem",
                  flexWrap: "wrap",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    lineHeight: 1.2,
                  }}
                >
                  {c.name}
                </h3>
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    color: "var(--iron)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    padding: "0.15rem 0.6rem",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {c.cost}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    color: "var(--gold)",
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    padding: "0.2rem 0.65rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.tax}
                </span>
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    color: "#6B8B9A",
                    background: "rgba(107,139,154,0.08)",
                    border: "1px solid rgba(107,139,154,0.2)",
                    padding: "0.2rem 0.65rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.visa}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--iron)",
                  lineHeight: 1.6,
                }}
              >
                {c.notes}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--iron)",
            marginTop: "0.75rem",
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          * Always consult a tax attorney before restructuring. This is
          education, not legal advice.
        </p>
      </div>

      {/* Sovereignty Courses */}
      <div>
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
          Sovereignty Courses
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "1rem",
          }}
        >
          {/* Built courses */}
          {builtCourses.map((course) => {
            const tierColor = TIER_COLORS[course.tier_required] || "#6B8B9A";
            return (
              <Link
                key={course.id}
                href={`/dashboard/courses/${course.slug}`}
                style={{
                  textDecoration: "none",
                  border: "1px solid rgba(107,139,154,0.2)",
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
                      borderTop: "1px solid rgba(107,139,154,0.12)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.65rem",
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
                border: "1px solid rgba(107,139,154,0.08)",
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
                  background: "rgba(107,139,154,0.5)",
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
                  color: TIER_COLORS[course.tier_required] || "#6B8B9A",
                  border: `1px solid ${TIER_COLORS[course.tier_required] || "#6B8B9A"}40`,
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

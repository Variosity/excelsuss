export const dynamic = "force-dynamic";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const books = [
  {
    title: "48 Laws of Power",
    author: "Robert Greene",
    insight: "Power is amoral. Ignorance of its laws makes you prey.",
    color: "#8B1A1A",
  },
  {
    title: "The Art of Seduction",
    author: "Robert Greene",
    insight: "Seduction bypasses resistance through desire — in every domain.",
    color: "#6B3A6B",
  },
  {
    title: "Mastery",
    author: "Robert Greene",
    insight:
      "Your Life's Task exists. Find it. The apprenticeship phase is sacred.",
    color: "#3A5A8B",
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    insight: "Supreme excellence: breaking resistance without fighting.",
    color: "#3A7A5A",
  },
  {
    title: "Influence",
    author: "Robert Cialdini",
    insight: "Six weapons are being used against you daily. Name them.",
    color: "#7A6A3A",
  },
  {
    title: "The Prince",
    author: "Machiavelli",
    insight: "Power does not apologize. It is better to be feared than loved.",
    color: "#5A3A3A",
  },
  {
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    insight: "Understand people's drives before they understand yours.",
    color: "#3A4A6B",
  },
];

const darkPrinciples = [
  {
    number: "1",
    title: "Frame Control",
    text: "Every interaction has a frame. The man who sets it, wins. Never enter someone else's frame unconsciously.",
  },
  {
    number: "2",
    title: "Social Proof Architecture",
    text: "People follow the crowd. Build visible proof that others already follow you — before they decide.",
  },
  {
    number: "3",
    title: "Scarcity and Urgency",
    text: "What is rare is desired. What is abundant is ignored. Control access to yourself.",
  },
  {
    number: "4",
    title: "Reciprocity Loop",
    text: "Give strategically. The urge to reciprocate is primal. Create debts that serve you.",
  },
  {
    number: "5",
    title: "The Long Game",
    text: "Most men react. The dangerous man plays three moves ahead while appearing to react.",
  },
  {
    number: "6",
    title: "Controlled Vulnerability",
    text: "Selective disclosure creates intimacy and trust. Never reveal what you haven't chosen to reveal.",
  },
];

const TIER_COLORS: Record<string, string> = {
  discipulus: "var(--iron)",
  miles: "var(--gold)",
  excelsus: "#B22222",
};

export default async function PsychologyPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select(
      "id, slug, title, subtitle, tier_required, total_lessons, duration_hours, latin_quote",
    )
    .eq("pillar", "psychology")
    .order("order_index", { ascending: true });

  const psychCourses = courses || [];
  const builtCourses = psychCourses.filter((c) => (c.total_lessons || 0) > 0);
  const comingSoon = psychCourses.filter((c) => (c.total_lessons || 0) === 0);

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
            color: "#6B3A6B",
          }}
        >
          Dark Psychology
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
          The Hidden Mechanics of Power
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--iron)",
            lineHeight: 1.7,
            maxWidth: "640px",
          }}
        >
          The world runs on power. All of it — business, relationships, social
          dynamics — is a game being played whether you see the rules or not.
          This pillar teaches you the rules.
        </p>
        <div
          style={{
            marginTop: "1.25rem",
            borderLeft: "2px solid #6B3A6B",
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
            Scientia potentia est
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--iron)" }}>
            "Knowledge is power." — Francis Bacon
          </p>
        </div>
      </div>

      {/* Dark Principles */}
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
          Six Laws of the Dark Game
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1rem",
          }}
        >
          {darkPrinciples.map((p) => (
            <div
              key={p.number}
              style={{
                border: "1px solid rgba(107,58,107,0.2)",
                padding: "1.5rem",
                background: "var(--stone2)",
                display: "flex",
                gap: "1rem",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "rgba(107,58,107,0.4)",
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                {p.number}
              </div>
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--iron)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Required Reading */}
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
          The Canon
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {books.map((book) => (
            <div
              key={book.title}
              style={{
                display: "flex",
                gap: "1rem",
                border: `1px solid ${book.color}30`,
                padding: "1rem 1.25rem",
                background: "var(--stone2)",
                alignItems: "flex-start",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "3px",
                  background: book.color,
                  flexShrink: 0,
                  borderRadius: "2px",
                  alignSelf: "stretch",
                }}
              />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.5rem",
                    marginBottom: "0.25rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--white)",
                    }}
                  >
                    {book.title}
                  </h4>
                  <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                    — {book.author}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--iron)",
                    lineHeight: 1.6,
                  }}
                >
                  {book.insight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses — available */}
      <div
        style={{
          marginBottom:
            builtCourses.length > 0 && comingSoon.length > 0 ? "2rem" : 0,
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
            marginBottom: "1.25rem",
          }}
        >
          Psychology Courses
        </h2>

        {builtCourses.length === 0 && (
          <div
            style={{
              border: "1px solid rgba(107,58,107,0.12)",
              padding: "2rem",
              textAlign: "center",
              background: "var(--stone2)",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.78rem",
                color: "var(--iron)",
              }}
            >
              Courses are being forged. Check back soon.
            </p>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "1rem",
          }}
        >
          {builtCourses.map((course) => {
            const tierColor =
              TIER_COLORS[course.tier_required] || "var(--iron)";
            return (
              <Link
                key={course.id}
                href={`/dashboard/courses/${course.slug}`}
                style={{
                  textDecoration: "none",
                  border: "1px solid rgba(107,58,107,0.2)",
                  padding: "1.5rem",
                  background: "var(--stone2)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                    alignItems: "center",
                    flexWrap: "wrap",
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
                      whiteSpace: "nowrap",
                    }}
                  >
                    {course.tier_required}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "0.35rem",
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
                      borderTop: "1px solid rgba(107,58,107,0.15)",
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
                border: "1px solid rgba(107,58,107,0.08)",
                padding: "1.5rem",
                background: "var(--stone)",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                opacity: 0.5,
                position: "relative",
                overflow: "hidden",
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
                  marginBottom: "0.35rem",
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

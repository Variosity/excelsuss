"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COURSES, PILLARS, LATIN_QUOTES } from "@/lib/data/curriculum";

function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-600"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${10 + ((i * 4.5) % 80)}%`,
            bottom: "0",
            opacity: 0,
            animation: `ember-rise ${3 + (i % 5)}s ease-out ${(i * 0.4) % 6}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function QuoteTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % LATIN_QUOTES.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);
  const q = LATIN_QUOTES[idx];
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        background: "var(--stone2)",
        padding: "0.5rem 1rem",
        textAlign: "center",
        fontSize: "0.7rem",
        letterSpacing: "0.15em", // was 0.2em — too wide on mobile
        textTransform: "uppercase",
        overflow: "hidden", // ADD
        whiteSpace: "nowrap", // ADD
        textOverflow: "ellipsis", // ADD
      }}
    >
      <span
        style={{
          fontFamily: "Cinzel, serif",
          color: "var(--gold)",
          fontStyle: "italic",
        }}
      >
        {q.quote}
      </span>
      <span style={{ margin: "0 0.75rem", color: "var(--iron)" }}>—</span>
      <span style={{ color: "var(--parchment-dim)" }}>{q.translation}</span>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem clamp(1.25rem, 4vw, 2.5rem)",
          background:
            scrolled || mobileOpen
              ? "rgba(15,13,11,0.97)"
              : "rgba(15,13,11,0.85)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          backdropFilter: "blur(12px)",
          transition: "background 0.4s ease",
        }}
      >
        <div
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "1.15rem",
            fontWeight: 900,
            letterSpacing: "0.3em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          The Excelsus
        </div>

        {/* Desktop Links */}
        <ul
          className="hidden md:flex"
          style={{ gap: "2rem", listStyle: "none", alignItems: "center" }}
        >
          {["Curriculum", "Psychology", "Brotherhood", "Membership"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--parchment-dim)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--parchment-dim)")
                  }
                >
                  {item}
                </a>
              </li>
            ),
          )}
          <li>
            <Link
              href="/auth/signup"
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "var(--gold)",
                color: "#0F0D0B",
                padding: "0.6rem 1.4rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--gold-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--gold)")
              }
            >
              Enter the Forge
            </Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "1px solid rgba(201,168,76,0.2)",
            padding: "0.4rem 0.75rem",
            color: "var(--gold)",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            background: "rgba(15,13,11,0.98)",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            padding: "2rem 1.5rem",
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            backdropFilter: "blur(12px)",
          }}
        >
          {["Curriculum", "Psychology", "Brotherhood", "Membership"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.85rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(201,168,76,0.1)",
                  paddingBottom: "1rem",
                }}
              >
                {item}
              </a>
            ),
          )}
          <Link
            href="/auth/signup"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "var(--gold)",
              color: "#0F0D0B",
              padding: "0.9rem",
              textAlign: "center",
              textDecoration: "none",
              marginTop: "0.5rem",
            }}
          >
            Enter the Forge
          </Link>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "8rem 1.5rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ pointerEvents: "none", position: "absolute", inset: 0 }}>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            background:
              "radial-gradient(ellipse at bottom, rgba(180,60,20,0.2) 0%, rgba(201,168,76,0.07) 40%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)",
          }}
        />
      </div>
      <Embers />
      <p
        className="animate-rise"
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.65rem",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "1.25rem",
          opacity: 0,
        }}
      >
        Brotherhood of Earned Excellence
      </p>
      <div
        className="animate-rise"
        style={{
          width: "8rem",
          height: "1px",
          margin: "0 auto 1.5rem",
          background:
            "linear-gradient(90deg,transparent,var(--gold),transparent)",
          opacity: 0,
          animationDelay: "0.15s",
        }}
      />
      <h1
        className="animate-rise"
        style={{
          fontFamily: "Cinzel, serif",
          fontWeight: 900,
          lineHeight: 0.88,
          letterSpacing: "0.06em",
          color: "var(--white)",
          marginBottom: "1.5rem",
          fontSize: "clamp(3rem,9vw,7rem)",
          textShadow: "0 0 80px rgba(201,168,76,0.12)",
          opacity: 0,
          animationDelay: "0.25s",
        }}
      >
        THE
        <br />
        <span className="gold-shimmer">EXCELSUS</span>
      </h1>
      <p
        className="animate-rise"
        style={{
          fontSize: "1.2rem",
          fontWeight: 300,
          fontStyle: "italic",
          color: "var(--parchment-dim)",
          maxWidth: "540px",
          lineHeight: 1.6,
          marginBottom: "0.5rem",
          opacity: 0,
          animationDelay: "0.4s",
        }}
      >
        A holistic forge for mind, body, and soul. Giving men the tools to
        conquer their time and their life.
      </p>
      <p
        className="animate-rise"
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.68rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--iron)",
          marginBottom: "2.5rem",
          opacity: 0,
          animationDelay: "0.5s",
        }}
      >
        Stoicism · Warrior Mindset · Dark Psychology · Financial Sovereignty
      </p>
      <div
        className="animate-rise"
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: 0,
          animationDelay: "0.6s",
          padding: "0 1rem",
        }}
      >
        <Link
          href="/auth/signup"
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
            transition: "background 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          Enter the Forge
        </Link>
        <a
          href="#curriculum"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "var(--gold)",
            padding: "0.9rem 2.5rem",
            textDecoration: "none",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          Explore Curriculum
        </a>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.3,
        }}
      >
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--iron)",
          }}
        >
          Descend
        </span>
        <div
          className="animate-flicker"
          style={{
            width: "1px",
            height: "3rem",
            background: "linear-gradient(to bottom, var(--gold), transparent)",
          }}
        />
      </div>
    </section>
  );
}

function ManifestoBanner({ quote, cite }: { quote: string; cite: string }) {
  return (
    <div
      style={{
        padding: "clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 1.5rem)",
        textAlign: "center",
        background: "var(--stone2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(139,26,26,0.08) 0%, transparent 70%)",
        }}
      />
      <blockquote
        style={{
          fontFamily: "Cinzel, serif",
          position: "relative",
          zIndex: 1,
          fontSize: "clamp(1rem,2.5vw,1.5rem)",
          fontWeight: 400,
          color: "var(--white)",
          maxWidth: "750px",
          margin: "0 auto",
          lineHeight: 1.65,
          letterSpacing: "0.03em",
        }}
      >
        {quote}
      </blockquote>
      <cite
        style={{
          display: "block",
          marginTop: "1.25rem",
          fontFamily: "Cinzel, serif",
          fontSize: "0.65rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--gold-dim)",
          fontStyle: "normal",
        }}
      >
        {cite}
      </cite>
    </div>
  );
}

function PillarsSection() {
  const icons = PILLARS.map((p) => p.icon);
  return (
    <section id="curriculum" style={{ padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            The Nine Pillars
          </span>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.8rem,4vw,3rem)",
              fontWeight: 700,
              color: "var(--white)",
              marginBottom: "1rem",
            }}
          >
            What We Forge You Into
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--parchment-dim)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Every track, every lesson, every interaction is built around one
            mission: men of total excellence.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", // FIXED
            gap: "1px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.id}
              className="pillar-card"
              style={{
                background: "var(--stone)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "background 0.3s",
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "1.5rem",
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {icons[i]}
              </span>
              <h3
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--white)",
                  marginBottom: "0.75rem",
                }}
              >
                {pillar.label}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--iron)",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  marginBottom: "1.25rem",
                }}
              >
                {pillar.description}
              </p>
              <div
                style={{
                  borderTop: "1px solid rgba(201,168,76,0.1)",
                  paddingTop: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.7rem",
                    fontStyle: "italic",
                    color: "var(--gold-dim)",
                  }}
                >
                  {pillar.greek}
                </p>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--iron)",
                    marginTop: "0.35rem",
                    lineHeight: 1.5,
                  }}
                >
                  {pillar.translation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered =
    activeFilter === "all"
      ? COURSES
      : COURSES.filter((c) => c.pillar === activeFilter);
  const tierColors: Record<string, { color: string; border: string }> = {
    discipulus: { color: "var(--iron)", border: "var(--iron)" },
    miles: { color: "var(--gold)", border: "var(--gold)" },
    excelsus: { color: "#B22222", border: "#B22222" },
  };
  return (
    <section style={{ padding: "7rem 1.5rem", background: "var(--stone2)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            The Curriculum
          </span>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.8rem,4vw,3rem)",
              fontWeight: 700,
              color: "var(--white)",
            }}
          >
            Your Ascension Path
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          {["all", ...PILLARS.map((p) => p.id)].map((p) => (
            <button
              key={p}
              onClick={() => setActiveFilter(p)}
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.45rem 1rem",
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeFilter === p ? "var(--gold)" : "transparent",
                color: activeFilter === p ? "#0F0D0B" : "var(--iron)",
                borderColor:
                  activeFilter === p ? "var(--gold)" : "rgba(201,168,76,0.2)",
              }}
            >
              {p === "all"
                ? "All Tracks"
                : PILLARS.find((pl) => pl.id === p)?.label || p}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", // FIXED
            gap: "1.25rem",
          }}
        >
          {filtered.map((course) => {
            const tc = tierColors[course.tier_required];
            return (
              <div
                key={course.id}
                className="course-card"
                style={{
                  border: "1px solid rgba(201,168,76,0.12)",
                  background: "var(--stone)",
                  padding: "1.5rem",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
              >
                {course.is_featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      background: "var(--gold)",
                      color: "#0F0D0B",
                      padding: "0.25rem 0.75rem",
                    }}
                  >
                    Featured
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: tc.color,
                      border: `1px solid ${tc.border}`,
                      padding: "0.2rem 0.5rem",
                    }}
                  >
                    {course.tier_required}
                  </span>
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--iron)",
                    }}
                  >
                    {PILLARS.find((p) => p.id === course.pillar)?.label}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    fontStyle: "italic",
                    color: "var(--parchment-dim)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {course.subtitle}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--iron)",
                    lineHeight: 1.65,
                    marginBottom: "1.25rem",
                  }}
                >
                  {course.description}
                </p>
                {course.latin_quote && (
                  <div
                    style={{
                      borderTop: "1px solid rgba(201,168,76,0.1)",
                      paddingTop: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.68rem",
                        fontStyle: "italic",
                        color: "var(--gold-dim)",
                      }}
                    >
                      ❝ {course.latin_quote}
                    </p>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--iron)",
                        marginTop: "0.25rem",
                      }}
                    >
                      {course.latin_translation}
                    </p>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(201,168,76,0.08)",
                  }}
                >
                  <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                    {course.total_lessons} lessons
                  </span>
                  <span style={{ color: "var(--iron)" }}>·</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                    {course.duration_hours}h
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PsychologySection() {
  const books = [
    {
      title: "48 Laws of Power",
      author: "Robert Greene",
      insight:
        "Power is amoral. Understanding its laws doesn't make you evil — ignorance of them makes you prey.",
    },
    {
      title: "The Art of Seduction",
      author: "Robert Greene",
      insight:
        "Seduction is the highest form of persuasion. It bypasses resistance entirely — through desire.",
    },
    {
      title: "Mastery",
      author: "Robert Greene",
      insight:
        "Find your Life's Task. The apprenticeship phase is sacred. Revert to a feeling of inferiority to learn faster.",
    },
    {
      title: "The Art of War",
      author: "Sun Tzu",
      insight:
        "Supreme excellence is breaking the enemy's resistance without fighting. Know the terrain. Know yourself.",
    },
    {
      title: "Influence",
      author: "Robert Cialdini",
      insight:
        "Six weapons of influence are being deployed against you daily. Name them, disarm them, then deploy them yourself.",
    },
    {
      title: "The Prince",
      author: "Machiavelli",
      insight:
        "Power does not apologize. It is better to be feared than loved — if you cannot be both simultaneously.",
    },
  ];
  return (
    <section
      id="psychology"
      style={{
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(139,26,26,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", // FIXED
            gap: "clamp(2rem, 5vw, 5rem)", // ADJUSTED
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#B22222",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Dark Psychology
            </span>
            <h2
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "1.5rem",
                lineHeight: 1.1,
              }}
            >
              The Hidden
              <br />
              Mechanics of Power
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 300,
                color: "var(--parchment-dim)",
                lineHeight: 1.75,
                marginBottom: "1rem",
              }}
            >
              The world runs on power. Institutions, corporations, relationships
              — all of it is a game being played whether you know the rules or
              not.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 300,
                color: "var(--parchment-dim)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              We study Greene, Sun Tzu, Cialdini, and Machiavelli. Not to make
              you manipulative — to make you impossible to manipulate.
            </p>
            <div
              style={{
                borderLeft: "2px solid #8B1A1A",
                paddingLeft: "1.25rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.82rem",
                  fontStyle: "italic",
                  color: "var(--gold-dim)",
                }}
              >
                Scientia potentia est
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--iron)",
                  marginTop: "0.25rem",
                }}
              >
                "Knowledge is power." — Francis Bacon
              </p>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {books.map((book) => (
              <div
                key={book.title}
                className="book-card"
                style={{
                  display: "flex",
                  gap: "1rem",
                  border: "1px solid rgba(139,26,26,0.2)",
                  padding: "1rem 1.25rem",
                  background: "var(--stone2)",
                  transition: "border-color 0.2s",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: "3px",
                    background: "#8B1A1A",
                    flexShrink: 0,
                    borderRadius: "2px",
                  }}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.5rem",
                      marginBottom: "0.35rem",
                      flexWrap: "wrap", // ADDED
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "var(--white)",
                      }}
                    >
                      {book.title}
                    </h4>
                    <span style={{ fontSize: "0.7rem", color: "var(--iron)" }}>
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
      </div>
    </section>
  );
}

function BrotherhoodSection() {
  const stats = [
    { num: "9", label: "Pillars" },
    { num: "5", label: "Man Cells" },
    { num: "200+", label: "Lessons" },
    { num: "$0", label: "Excuses" },
  ];
  return (
    <section
      id="brotherhood"
      style={{
        padding: "7rem 1.5rem",
        background: "var(--stone2)",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", // FIXED
          gap: "clamp(2rem, 5vw, 5rem)", // ADJUSTED
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            The Brotherhood
          </span>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 700,
              color: "var(--white)",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
            }}
          >
            You Rise With the
            <br />
            Men Around You
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--parchment-dim)",
              lineHeight: 1.75,
              marginBottom: "1rem",
            }}
          >
            The Excelsus is not a course. It is a standard. Excelsus — always
            elevated, never finished. Men who come through this platform don't
            just become wealthy — they become the men other men look to.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            {[
              {
                icon: "⊕",
                text: "Five-man accountability cells — meet weekly, hold each other to account",
              },
              {
                icon: "◉",
                text: "Monthly war councils — live sessions with Excelsus members and mentors",
              },
              {
                icon: "◈",
                text: "Private deal network — members-only opportunities, referrals, partnerships",
              },
              {
                icon: "❧",
                text: "Annual IRL mastermind — Excelsus tier, in-person, undisclosed location",
              },
            ].map((item) => (
              <div
                key={item.icon}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: "var(--gold)",
                    fontSize: "1.1rem",
                    marginTop: "0.1rem",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </span>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--parchment-dim)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", // FIXED
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  border: "1px solid rgba(201,168,76,0.12)",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--iron)",
                    marginTop: "0.5rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.12)",
              padding: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.72rem",
                fontStyle: "italic",
                color: "var(--gold-dim)",
                marginBottom: "0.5rem",
              }}
            >
              ❝ Ἀγωγή — The Agoge
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--parchment-dim)",
                lineHeight: 1.65,
              }}
            >
              The Agoge was Sparta's training system. Boys entered at seven. Men
              emerged at eighteen. It was not education — it was transformation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    {
      key: "discipulus",
      name: "Discipulus",
      sub: "The Pupil",
      price: 29,
      features: [
        "Full curriculum access (43 courses)",
        "Brotherhood community",
        "Weekly challenges",
        "Goal tracker + Workbook",
        "Mobile app access",
      ],
      locked: [
        "5-man accountability cell",
        "Live war councils",
        "Deal network",
      ],
    },
    {
      key: "miles",
      name: "Miles",
      sub: "The Soldier",
      price: 79,
      features: [
        "Everything in Discipulus",
        "5-man accountability cell",
        "Monthly live war council",
        "Wealth & Sovereignty deep access",
        "Member deal network",
        "Psychology mastery courses",
      ],
      locked: ["1-on-1 mentorship"],
    },
    {
      key: "excelsus",
      name: "Excelsus",
      sub: "The Elevated",
      price: 197,
      features: [
        "Everything in Miles",
        "1-on-1 mentor sessions",
        "Private Excelsus council",
        "Early access to all new content",
        "IRL mastermind events",
        "Direct network introductions",
      ],
      locked: [],
    },
  ];
  return (
    <section id="membership" style={{ padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Membership
          </span>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.8rem,4vw,3rem)",
              fontWeight: 700,
              color: "var(--white)",
              marginBottom: "1rem",
            }}
          >
            Choose Your Rank
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--parchment-dim)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Every tier grants access to the brotherhood. What separates them is
            the depth of the forge.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", // FIXED
            gap: "1px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {tiers.map((tier) => {
            const isFeatured = tier.key === "miles";
            return (
              <div
                key={tier.key}
                style={{
                  padding: "2.5rem 2rem",
                  background: isFeatured ? "var(--stone3)" : "var(--stone)",
                  position: "relative",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {isFeatured && (
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
                {isFeatured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-1px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      background: "var(--gold)",
                      color: "#0F0D0B",
                      padding: "0.25rem 1rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most Chosen
                  </div>
                )}
                <p
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--iron)",
                    marginBottom: "0.25rem",
                    marginTop: "1.5rem",
                  }}
                >
                  {tier.name}
                </p>
                <p
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: "var(--iron)",
                    marginBottom: "0.75rem",
                    fontStyle: "italic",
                  }}
                >
                  {tier.sub}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: "0.25rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "1.1rem",
                      color: "var(--gold)",
                      marginTop: "0.6rem",
                    }}
                  >
                    $
                  </span>
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "3.5rem",
                      fontWeight: 900,
                      color: "var(--white)",
                      lineHeight: 1,
                    }}
                  >
                    {tier.price}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--iron)",
                    marginBottom: "2rem",
                  }}
                >
                  Per Month
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    marginBottom: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    textAlign: "left",
                    flex: 1,
                  }}
                >
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        fontSize: "0.85rem",
                        color: "var(--parchment-dim)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--gold)",
                          fontSize: "0.6rem",
                          marginTop: "0.3rem",
                          flexShrink: 0,
                        }}
                      >
                        ✦
                      </span>
                      {f}
                    </li>
                  ))}
                  {tier.locked.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        fontSize: "0.85rem",
                        color: "var(--iron)",
                        textDecoration: "line-through",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--stone4)",
                          fontSize: "0.6rem",
                          marginTop: "0.3rem",
                          flexShrink: 0,
                        }}
                      >
                        ✦
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/auth/signup?plan=${tier.key}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "0.9rem",
                    marginTop: "auto",
                    border: isFeatured
                      ? "1px solid var(--gold)"
                      : "1px solid rgba(201,168,76,0.3)",
                    background: isFeatured ? "var(--gold)" : "transparent",
                    color: isFeatured ? "#0F0D0B" : "var(--gold)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Begin as {tier.name}
                </Link>
              </div>
            );
          })}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--iron)",
            marginTop: "1.25rem",
            letterSpacing: "0.05em",
          }}
        >
          Cancel anytime. No excuses accepted on the path.
        </p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      style={{
        padding: "9rem 1.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center bottom, rgba(180,60,20,0.15) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)",
        }}
      />
      <Embers />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "1.5rem",
          }}
        >
          The Excelsus Awaits
        </p>
        <h2
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(2.5rem,7vw,5.5rem)",
            fontWeight: 900,
            color: "var(--white)",
            lineHeight: 0.9,
            marginBottom: "1.5rem",
          }}
        >
          The Fire Does Not
          <br />
          Wait for You
        </h2>
        <p
          style={{
            fontSize: "1.15rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--parchment-dim)",
            maxWidth: "500px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.65,
          }}
        >
          Every day you delay is a day another man gets further ahead.
        </p>
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.15)",
            borderBottom: "1px solid rgba(201,168,76,0.15)",
            padding: "2rem",
            marginBottom: "3rem",
            maxWidth: "420px",
            margin: "0 auto 3rem",
          }}
        >
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--gold)",
            }}
          >
            Aut viam inveniam aut faciam
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--iron)",
              marginTop: "0.5rem",
            }}
          >
            "I shall find a way or make one." — Hannibal
          </p>
        </div>
        <Link
          href="/auth/signup"
          style={{
            display: "inline-block",
            fontFamily: "Cinzel, serif",
            fontSize: "0.85rem",
            fontWeight: 900,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "var(--gold)",
            color: "#0F0D0B",
            padding: "1.1rem 3.5rem",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          Enter the Forge Now
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  const legalPages: Record<string, string> = {
    Privacy: "/legal/privacy",
    Terms: "/legal/terms",
    Refunds: "/legal/refunds",
    Cookies: "/legal/cookies",
  };
  const companyPages: Record<string, string> = {
    About: "/about",
    Manifesto: "/manifesto",
    Mentors: "/mentors",
    Contact: "/contact",
  };
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(201,168,76,0.1)",
        padding: "3.5rem 1.5rem",
        background: "var(--stone2)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", // FIXED
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Platform
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[
                { label: "Curriculum", href: "#curriculum" },
                { label: "Membership", href: "#membership" },
                { label: "Brotherhood", href: "#brotherhood" },
                { label: "Psychology", href: "#psychology" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--iron)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--iron)")
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Pillars
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {PILLARS.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <a
                    href="#curriculum"
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--iron)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--iron)")
                    }
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Company
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {Object.entries(companyPages).map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--iron)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--iron)")
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Legal
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {Object.entries(legalPages).map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--iron)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--iron)")
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.08)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap", // ADDED
            gap: "1rem", // ADDED
          }}
        >
          <div
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              letterSpacing: "0.25em",
              color: "var(--gold)",
            }}
          >
            THE EXCELSUS
          </div>
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--iron)",
              letterSpacing: "0.08em",
            }}
          >
            © {new Date().getFullYear()} The Excelsus. Excelsus — always
            elevated.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <QuoteTicker />
      <Nav />
      <main>
        <Hero />
        <ManifestoBanner
          quote='"The obstacle is the way. The fire does not ask whether you are ready. The Excelsus does not wait for the man you plan to become — it builds him."'
          cite="— The Excelsus Creed"
        />
        <PillarsSection />
        <CoursesSection />
        <ManifestoBanner
          quote='"The Spartans did not ask if the training was hard. They asked only if it was enough."'
          cite="— The Excelsus Curriculum Preface"
        />
        <PsychologySection />
        <BrotherhoodSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

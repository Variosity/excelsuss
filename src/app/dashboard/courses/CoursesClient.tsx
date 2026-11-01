// src/app/dashboard/courses/CoursesClient.tsx
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { PILLARS } from "@/lib/data/curriculum";

const TIER_ORDER: Record<string, number> = {
  discipulus: 1,
  miles: 2,
  excelsus: 3,
};
const TIER_COLORS: Record<string, string> = {
  discipulus: "var(--iron)",
  miles: "var(--gold)",
  excelsus: "#B22222",
};

export default function CoursesClient({
  initialCourses,
  userTier,
}: {
  initialCourses: any[];
  userTier: string;
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(true);

  const deduped = useMemo(() => {
    const seen = new Set<string>();
    return initialCourses.filter((c) => {
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    });
  }, [initialCourses]);

  const filtered = useMemo(() => {
    return deduped
      .filter((c) => filter === "all" || c.pillar === filter)
      .filter((c) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          c.title?.toLowerCase().includes(q) ||
          c.subtitle?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.pillar?.toLowerCase().includes(q)
        );
      })
      .filter((c) => {
        // If hiding coming soon, only show built courses
        if (!showComingSoon) return (c.total_lessons || 0) > 0;
        return true;
      });
  }, [deduped, filter, search, showComingSoon]);

  const pillarsInUse = useMemo(() => {
    const used = new Set(deduped.map((c) => c.pillar));
    return PILLARS.filter((p) => used.has(p.id));
  }, [deduped]);

  const builtCount = useMemo(
    () => deduped.filter((c) => (c.total_lessons || 0) > 0).length,
    [deduped],
  );
  const comingSoonCount = deduped.length - builtCount;

  function canAccess(courseRequiredTier: string) {
    return (TIER_ORDER[userTier] || 1) >= (TIER_ORDER[courseRequiredTier] || 1);
  }

  function isBuilt(course: any) {
    return (course.total_lessons || 0) > 0;
  }

  return (
    <div style={{ padding: "clamp(1.25rem,4vw,2.5rem)" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.25rem,4vw,1.75rem)",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "0.35rem",
          }}
        >
          Curriculum
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "0.88rem", color: "var(--iron)" }}>
            {builtCount} courses available across {pillarsInUse.length} pillars
          </p>
          {comingSoonCount > 0 && (
            <button
              onClick={() => setShowComingSoon(!showComingSoon)}
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.15)",
                color: showComingSoon ? "var(--gold-dim)" : "var(--iron)",
                padding: "0.25rem 0.75rem",
                cursor: "pointer",
              }}
            >
              {showComingSoon
                ? `Hide ${comingSoonCount} coming soon`
                : `Show ${comingSoonCount} coming soon`}
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          marginBottom: "1.25rem",
          position: "relative",
          maxWidth: "480px",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--iron)",
            fontSize: "0.85rem",
            pointerEvents: "none",
          }}
        >
          ⊕
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses, pillars, topics..."
          style={{
            width: "100%",
            background: "var(--stone2)",
            border: "1px solid rgba(201,168,76,0.15)",
            padding: "0.7rem 1rem 0.7rem 2.5rem",
            color: "var(--parchment)",
            fontSize: "0.9rem",
            fontFamily: "Crimson Pro, serif",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "var(--iron)",
              cursor: "pointer",
              fontSize: "1rem",
              padding: "0.25rem",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Pillar filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "2rem",
        }}
      >
        {["all", ...pillarsInUse.map((p) => p.id)].map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.35rem 0.85rem",
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.15s",
              background: filter === p ? "var(--gold)" : "transparent",
              color: filter === p ? "#0F0D0B" : "var(--iron)",
              borderColor:
                filter === p ? "var(--gold)" : "rgba(201,168,76,0.2)",
            }}
          >
            {p === "all"
              ? `All (${deduped.length})`
              : PILLARS.find((pl) => pl.id === p)?.label || p}
          </button>
        ))}
      </div>

      {search && (
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--iron)",
            marginBottom: "1rem",
            fontFamily: "Cinzel, serif",
            letterSpacing: "0.08em",
          }}
        >
          {filtered.length === 0
            ? "No courses found"
            : `${filtered.length} course${filtered.length !== 1 ? "s" : ""} found`}
        </p>
      )}

      {filtered.length === 0 ? (
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.1)",
            padding: "3rem",
            textAlign: "center",
            background: "var(--stone2)",
          }}
        >
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.82rem",
              color: "var(--iron)",
            }}
          >
            No courses match your search. Broaden your query.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(min(280px,100%),1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((course) => {
            const pillar = PILLARS.find((p) => p.id === course.pillar);
            const tierColor =
              TIER_COLORS[course.tier_required] || "var(--iron)";
            const accessible = canAccess(course.tier_required);
            const built = isBuilt(course);

            // Coming soon: not clickable, dimmed, special badge
            if (!built) {
              return (
                <div
                  key={course.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(201,168,76,0.06)",
                    background: "var(--stone)",
                    padding: "1.25rem",
                    opacity: 0.6,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                  }}
                >
                  {/* Coming Soon badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.5rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: "rgba(107,58,107,0.8)",
                      color: "rgba(255,255,255,0.8)",
                      padding: "0.2rem 0.6rem",
                    }}
                  >
                    Coming Soon
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                      paddingRight: "5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.54rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: tierColor,
                        border: `1px solid ${tierColor}60`,
                        padding: "0.15rem 0.45rem",
                      }}
                    >
                      {course.tier_required}
                    </span>
                    {pillar && (
                      <span
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.54rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--iron)",
                        }}
                      >
                        {pillar.icon} {pillar.label}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--iron)",
                      marginBottom: "0.3rem",
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
                      marginBottom: "0.5rem",
                    }}
                  >
                    {course.subtitle}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--iron)",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {course.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid rgba(201,168,76,0.06)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                      {course.duration_hours}h planned
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.62rem",
                        color: "rgba(107,58,107,0.7)",
                        fontFamily: "Cinzel, serif",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      In the forge...
                    </span>
                  </div>
                </div>
              );
            }

            // Available course — existing card behaviour
            return (
              <div
                key={course.id}
                style={{ position: "relative", height: "100%" }}
              >
                <Link
                  href={
                    accessible
                      ? `/dashboard/courses/${course.slug}`
                      : "/dashboard/upgrade"
                  }
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: `1px solid ${accessible ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)"}`,
                    background: accessible ? "var(--stone2)" : "var(--stone)",
                    padding: "1.25rem",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    opacity: accessible ? 1 : 0.75,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {!accessible && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        right: "0.6rem",
                        background: "rgba(15,13,11,0.85)",
                        border: `1px solid ${tierColor}60`,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <span style={{ color: tierColor, fontSize: "0.6rem" }}>
                        🔒
                      </span>
                      <span
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.52rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: tierColor,
                        }}
                      >
                        {course.tier_required}
                      </span>
                    </div>
                  )}
                  {course.is_featured && accessible && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.5rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "var(--gold)",
                        color: "#0F0D0B",
                        padding: "0.2rem 0.55rem",
                      }}
                    >
                      Featured
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                      paddingRight: accessible ? "0" : "3.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.54rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: tierColor,
                        border: `1px solid ${tierColor}60`,
                        padding: "0.15rem 0.45rem",
                      }}
                    >
                      {course.tier_required}
                    </span>
                    {pillar && (
                      <span
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.54rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--iron)",
                        }}
                      >
                        {pillar.icon} {pillar.label}
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: accessible ? "var(--white)" : "var(--iron)",
                      marginBottom: "0.3rem",
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
                    }}
                  >
                    {course.subtitle}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--iron)",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {course.description}
                  </p>
                  {course.latin_quote && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(201,168,76,0.08)",
                        paddingTop: "0.75rem",
                        marginTop: "0.75rem",
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
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid rgba(201,168,76,0.06)",
                    }}
                  >
                    <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                      {course.total_lessons} lessons
                    </span>
                    <span style={{ color: "var(--iron)" }}>·</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                      {course.duration_hours}h
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.7rem",
                        color: accessible ? "var(--gold)" : "var(--iron)",
                        fontFamily: "Cinzel, serif",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {accessible ? "Enter →" : "Unlock →"}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

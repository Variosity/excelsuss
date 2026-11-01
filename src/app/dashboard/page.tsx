export const dynamic = "force-dynamic";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PILLARS, LATIN_QUOTES } from "@/lib/data/curriculum";
import {
  xpToLevel,
  xpProgress,
  getLevelTitle,
  xpForLevel,
  xpForNextLevel,
  LEVEL_MILESTONES,
} from "@/lib/utils/xp";
import type { Profile } from "@/types";
import DailyChallengeClient from "./DailyChallengeClient";

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  const isLong = typeof value === "string" && value.length > 6;
  return (
    <div
      style={{
        border: "1px solid rgba(201,168,76,0.12)",
        padding: "1.25rem",
        background: "var(--stone2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: 0,
      }}
    >
      <p
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--iron)",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: isLong ? "1rem" : "1.75rem",
          fontWeight: 900,
          color: "var(--gold)",
          lineHeight: 1.2,
          wordBreak: "break-word",
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--iron)",
            marginTop: "0.35rem",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [{ data: profileRaw }, { data: progress }] = await Promise.all([
    supabase.from("profiles").select("*").eq("user_id", user!.id).single(),
    supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user!.id)
      .eq("completed", true),
  ]);
  const profile = profileRaw as Profile;
  const completedCount = progress?.length ?? 0;
  const level = xpToLevel(profile?.xp ?? 0);
  const progressPct = xpProgress(profile?.xp ?? 0);
  const dailyQuote = LATIN_QUOTES[new Date().getDate() % LATIN_QUOTES.length];

  const progressByCourse: Record<string, number> = {};
  progress?.forEach((p: any) => {
    if (p.completed) {
      progressByCourse[p.course_id] = (progressByCourse[p.course_id] || 0) + 1;
    }
  });

  // Fetch daily challenge + DB courses in parallel
  const [{ data: allChallenges }, { data: dbCourses }] = await Promise.all([
    supabase
      .from("daily_challenges")
      .select("*")
      .order("created_at", { ascending: true }),
    supabase.from("courses").select("*"),
  ]);

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );

  // Pick today's challenge by rotating through all real DB challenges
  const todayChallenge =
    allChallenges && allChallenges.length > 0
      ? allChallenges[dayOfYear % allChallenges.length]
      : null;

  // Check completion using the real DB uuid — no fake IDs
  let alreadyCompleted = false;
  if (todayChallenge?.id) {
    const { data: completion } = await supabase
      .from("challenge_completions")
      .select("challenge_id")
      .eq("user_id", user!.id)
      .eq("challenge_id", todayChallenge.id)
      .maybeSingle();
    alreadyCompleted = !!completion;
  }

  // Featured courses: DB only, built (total_lessons > 0), max 3
  const featuredCourses = (dbCourses || [])
    .filter((c: any) => c.is_featured && (c.total_lessons || 0) > 0)
    .slice(0, 3);

  return (
    <div style={{ padding: "clamp(1rem, 4vw, 2.5rem)" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(1.25rem,5vw,1.75rem)",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "0.35rem",
                lineHeight: 1.2,
              }}
            >
              Welcome back,{" "}
              <span style={{ color: "var(--gold)" }}>
                {profile?.display_name || profile?.username || "Brother"}
              </span>
            </h1>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--iron)",
              }}
            >
              {profile?.membership_tier?.toUpperCase()} · Level {level}
            </p>
          </div>
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.15)",
              padding: "1rem 1.25rem",
              textAlign: "center",
              background: "var(--stone2)",
              flex: "1 1 220px",
              maxWidth: "320px",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.7rem",
                fontStyle: "italic",
                color: "var(--gold-dim)",
                marginBottom: "0.35rem",
                lineHeight: 1.5,
              }}
            >
              ❝ {dailyQuote.quote}
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--iron)" }}>
              {dailyQuote.translation}
            </p>
          </div>
        </div>
        {/* XP bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--iron)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Lvl {level}
          </span>
          <div
            style={{
              flex: 1,
              height: "4px",
              background: "var(--stone4)",
              borderRadius: "2px",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: `${progressPct}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg,var(--gold-dim),var(--gold))",
                transition: "width 0.5s ease",
                borderRadius: "2px",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--iron)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {(profile?.xp ?? 0).toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          label="Streak"
          value={`${profile?.streak_days ?? 0}d`}
          sub="Days active"
        />
        <StatCard label="Lessons" value={completedCount} sub="Completed" />
        <StatCard
          label="XP"
          value={(profile?.xp ?? 0).toLocaleString()}
          sub="Total earned"
        />
        <StatCard
          label="Rank"
          value={
            profile?.membership_tier
              ? profile.membership_tier.charAt(0).toUpperCase() +
                profile.membership_tier.slice(1)
              : "Discipulus"
          }
          sub="Current tier"
        />
      </div>

      {/* Rank Progression */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.15)",
            background: "var(--stone2)",
            padding: "1.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  marginBottom: "0.35rem",
                }}
              >
                Current Rank
              </p>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {getLevelTitle(level)}
              </p>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  marginTop: "0.25rem",
                }}
              >
                Level {level}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  marginBottom: "0.35rem",
                }}
              >
                Next Milestone
              </p>
              {(() => {
                const milestoneKeys = Object.keys(LEVEL_MILESTONES)
                  .map(Number)
                  .sort((a, b) => a - b);
                const nextMilestone = milestoneKeys.find((k) => k > level);
                if (!nextMilestone)
                  return (
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.85rem",
                        color: "var(--gold)",
                      }}
                    >
                      Max Rank Reached
                    </p>
                  );
                const needed = xpForLevel(nextMilestone) - (profile?.xp ?? 0);
                return (
                  <>
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--white)",
                      }}
                    >
                      Lv {nextMilestone} —{" "}
                      {LEVEL_MILESTONES[nextMilestone].title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--iron)",
                        marginTop: "0.15rem",
                      }}
                    >
                      {needed.toLocaleString()} XP needed
                    </p>
                  </>
                );
              })()}
            </div>
          </div>

          {/* All ranks grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(min(120px,100%),1fr))",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            {(
              Object.entries(LEVEL_MILESTONES) as [
                string,
                { title: string; bonus: string },
              ][]
            )
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([lvl, data]) => {
                const milestoneLevel = Number(lvl);
                const isUnlocked = level >= milestoneLevel;
                const isCurrent =
                  level >= milestoneLevel &&
                  level <
                    (Object.keys(LEVEL_MILESTONES)
                      .map(Number)
                      .sort((a, b) => a - b)
                      .find((k) => k > milestoneLevel) ?? 999);
                return (
                  <div
                    key={lvl}
                    style={{
                      border: `1px solid ${isCurrent ? "rgba(201,168,76,0.4)" : isUnlocked ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.06)"}`,
                      padding: "0.6rem 0.75rem",
                      background: isCurrent
                        ? "rgba(201,168,76,0.08)"
                        : isUnlocked
                          ? "var(--stone3)"
                          : "var(--stone)",
                      opacity: isUnlocked ? 1 : 0.45,
                      position: "relative",
                    }}
                  >
                    {isCurrent && (
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
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: isCurrent
                          ? "var(--gold)"
                          : isUnlocked
                            ? "var(--gold-dim)"
                            : "var(--iron)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Lv {lvl} {isUnlocked ? "✓" : ""}
                    </p>
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: isCurrent
                          ? "var(--white)"
                          : isUnlocked
                            ? "var(--parchment-dim)"
                            : "var(--iron)",
                        lineHeight: 1.2,
                      }}
                    >
                      {data.title}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Featured Courses */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--white)",
            }}
          >
            Continue Your Path
          </h2>
          <a
            href="/dashboard/courses"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            All Courses →
          </a>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(min(220px,100%),1fr))",
            gap: "0.75rem",
          }}
        >
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/dashboard/courses/${course.slug}`}
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "1.25rem",
                background: "var(--stone2)",
                textDecoration: "none",
                display: "block",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.4rem",
                }}
              >
                {PILLARS.find((p) => p.id === course.pillar)?.label}
              </p>
              <h3
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.85rem",
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
                  color: "var(--iron)",
                  marginBottom: "0.875rem",
                }}
              >
                {course.total_lessons} lessons · {course.duration_hours}h
              </p>
              <div
                style={{
                  height: "3px",
                  background: "var(--stone4)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    width: `${Math.round(Math.min(100, ((progressByCourse[course.id] || 0) / Math.max(1, course.total_lessons || 1)) * 100))}%`,
                    height: "100%",
                    background: "var(--gold)",
                    borderRadius: "2px",
                    transition: "width 0.5s",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Daily Challenge — now functional */}
      <DailyChallengeClient
        challenge={todayChallenge}
        userId={user!.id}
        alreadyCompleted={alreadyCompleted}
      />
    </div>
  );
}

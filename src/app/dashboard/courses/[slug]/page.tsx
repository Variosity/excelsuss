// src/app/dashboard/courses/[slug]/page.tsx
export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonViewer from "./[lesson]/LessonViewer";

const TIER_ORDER: Record<string, number> = {
  discipulus: 1,
  miles: 2,
  excelsus: 3,
};
const LESSON_TYPE_LABELS: Record<string, string> = {
  concept: "Concept",
  exercise: "Exercise",
  reflection: "Reflection",
  assessment: "Assessment",
  meditation: "Meditation",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Always fetch from DB — no static fallback needed
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();
  if (!course) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();
  const userTierLevel =
    TIER_ORDER[profile?.membership_tier || "discipulus"] || 1;
  const requiredTierLevel = TIER_ORDER[course.tier_required] || 1;
  const hasAccess = userTierLevel >= requiredTierLevel;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .order("order_index", { ascending: true });

  const { data: progress } = await supabase
    .from("user_progress")
    .select("lesson_id, completed")
    .eq("user_id", user!.id)
    .eq("course_id", course.id);

  const completedIds = new Set(
    progress?.filter((p: any) => p.completed).map((p: any) => p.lesson_id) ||
      [],
  );
  const completedCount = completedIds.size;
  const totalLessons = lessons?.length || 0;
  const pct =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const TIER_COLORS: Record<string, string> = {
    discipulus: "var(--iron)",
    miles: "var(--gold)",
    excelsus: "#B22222",
  };
  const TIER_NAMES: Record<string, string> = {
    discipulus: "Discipulus",
    miles: "Miles",
    excelsus: "Excelsus",
  };

  return (
    <div style={{ padding: "2.5rem", maxWidth: "900px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/dashboard/courses"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--iron)",
            textDecoration: "none",
          }}
        >
          ← Curriculum
        </Link>
      </div>

      {/* Course header */}
      <div
        style={{
          border: "1px solid rgba(201,168,76,0.15)",
          padding: "2.5rem",
          background: "var(--stone2)",
          marginBottom: "2rem",
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
            gap: "1.5rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-dim)",
              }}
            >
              {course.pillar}
            </span>
            <h1
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--white)",
                margin: "0.5rem 0 0.5rem",
                lineHeight: 1.2,
              }}
            >
              {course.title}
            </h1>
            <p
              style={{
                fontSize: "1rem",
                fontStyle: "italic",
                color: "var(--parchment-dim)",
                marginBottom: "1rem",
              }}
            >
              {course.subtitle}
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--iron)",
                lineHeight: 1.7,
                maxWidth: "540px",
              }}
            >
              {course.description}
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "2rem",
                fontWeight: 900,
                color: pct === 100 ? "var(--gold)" : "var(--white)",
                lineHeight: 1,
              }}
            >
              {pct}%
            </div>
            <div
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--iron)",
                marginBottom: "0.75rem",
              }}
            >
              Complete
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--iron)" }}>
              {completedCount} / {totalLessons} lessons
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            height: "3px",
            background: "var(--stone4)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "linear-gradient(90deg,var(--gold-dim),var(--gold))",
              transition: "width 0.5s",
              borderRadius: "2px",
            }}
          />
        </div>
        {course.latin_quote && (
          <div
            style={{
              marginTop: "1.5rem",
              borderTop: "1px solid rgba(201,168,76,0.1)",
              paddingTop: "1rem",
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
              ❝ {course.latin_quote}
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--iron)",
                marginTop: "0.25rem",
              }}
            >
              {course.latin_translation}
            </p>
          </div>
        )}
      </div>

      {/* Tier gate */}
      {!hasAccess ? (
        <div
          style={{
            border: `1px solid ${TIER_COLORS[course.tier_required]}40`,
            padding: "3rem",
            background: "var(--stone2)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: TIER_COLORS[course.tier_required],
              marginBottom: "1rem",
            }}
          >
            {TIER_NAMES[course.tier_required]} Required
          </div>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "var(--white)",
              marginBottom: "0.75rem",
            }}
          >
            This course is locked
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--iron)",
              lineHeight: 1.65,
              maxWidth: "400px",
              margin: "0 auto 2rem",
            }}
          >
            Upgrade to {TIER_NAMES[course.tier_required]} to unlock this course
            and every other {course.tier_required}+ title in the curriculum.
          </p>
          <Link
            href="/dashboard/upgrade"
            style={{
              display: "inline-block",
              fontFamily: "Cinzel, serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "var(--gold)",
              color: "#0F0D0B",
              padding: "0.9rem 2rem",
              textDecoration: "none",
            }}
          >
            Upgrade to {TIER_NAMES[course.tier_required]}
          </Link>
        </div>
      ) : (
        <>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--white)",
              marginBottom: "1.25rem",
            }}
          >
            Lessons
          </h2>
          {!lessons || lessons.length === 0 ? (
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "3rem",
                textAlign: "center",
                background: "var(--stone2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.75rem",
                }}
              >
                Under Construction
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--iron)",
                  lineHeight: 1.7,
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                This course is being forged. Content drops soon.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {lessons.map((lesson: any, idx: number) => {
                const isCompleted = completedIds.has(lesson.id);
                const isLocked =
                  idx > 0 &&
                  !completedIds.has(lessons[idx - 1].id) &&
                  !lesson.is_free_preview;
                return (
                  <div key={lesson.id}>
                    {isLocked ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          border: "1px solid rgba(201,168,76,0.06)",
                          padding: "1.25rem 1.5rem",
                          background: "var(--stone2)",
                          opacity: 0.5,
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            border: "1px solid rgba(201,168,76,0.15)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.65rem",
                              color: "var(--iron)",
                            }}
                          >
                            🔒
                          </span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontFamily: "Cinzel, serif",
                              fontSize: "0.85rem",
                              color: "var(--iron)",
                            }}
                          >
                            {lesson.title}
                          </p>
                          <p
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--iron)",
                              marginTop: "0.2rem",
                            }}
                          >
                            Complete previous lesson to unlock
                          </p>
                        </div>
                        <span
                          style={{ fontSize: "0.72rem", color: "var(--iron)" }}
                        >
                          {lesson.duration_minutes}m
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={`/dashboard/courses/${slug}/${lesson.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          textDecoration: "none",
                          border: `1px solid ${isCompleted ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.12)"}`,
                          padding: "1.25rem 1.5rem",
                          background: "var(--stone2)",
                          transition: "border-color 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isCompleted
                              ? "rgba(201,168,76,0.15)"
                              : "transparent",
                            border: `2px solid ${isCompleted ? "var(--gold)" : "rgba(201,168,76,0.25)"}`,
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.72rem",
                            color: isCompleted ? "var(--gold)" : "var(--iron)",
                          }}
                        >
                          {isCompleted ? "✓" : idx + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              marginBottom: "0.2rem",
                              flexWrap: "wrap",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "Cinzel, serif",
                                fontSize: "0.88rem",
                                fontWeight: 700,
                                color: isCompleted
                                  ? "var(--iron)"
                                  : "var(--white)",
                              }}
                            >
                              {lesson.title}
                            </p>
                            <span
                              style={{
                                fontFamily: "Cinzel, serif",
                                fontSize: "0.55rem",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "var(--iron)",
                                border: "1px solid rgba(201,168,76,0.15)",
                                padding: "0.1rem 0.4rem",
                              }}
                            >
                              {LESSON_TYPE_LABELS[lesson.lesson_type] ||
                                lesson.lesson_type}
                            </span>
                            {lesson.is_free_preview && (
                              <span
                                style={{
                                  fontFamily: "Cinzel, serif",
                                  fontSize: "0.52rem",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--gold)",
                                  border: "1px solid rgba(201,168,76,0.3)",
                                  padding: "0.1rem 0.4rem",
                                }}
                              >
                                Free
                              </span>
                            )}
                          </div>
                          <p
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--iron)",
                            }}
                          >
                            {lesson.duration_minutes} min · +{lesson.xp_reward}{" "}
                            XP
                          </p>
                        </div>
                        <span
                          style={{ color: "var(--gold)", fontSize: "1rem" }}
                        >
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

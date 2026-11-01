"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareButton from "@/components/ShareButton";

const TYPE_COLORS: Record<string, string> = {
  concept: "var(--iron)",
  exercise: "#3A7A5A",
  reflection: "#6B3A6B",
  meditation: "#3A5A8B",
  assessment: "#8B6B3A",
};

export default function LessonViewer({
  course,
  lesson,
  lessons,
  completedIds,
  isCompleted,
  prevLesson,
  nextLesson,
  userId,
  courseSlug,
}: {
  course: any;
  lesson: any;
  lessons: any[];
  completedIds: string[];
  isCompleted: boolean;
  prevLesson: any;
  nextLesson: any;
  userId: string;
  courseSlug: string;
}) {
  const [completed, setCompleted] = useState(isCompleted);
  const [completing, setCompleting] = useState(false);
  const [xpFlash, setXpFlash] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const completedSet = new Set([
    ...completedIds,
    ...(completed ? [lesson.id] : []),
  ]);

  async function markComplete() {
    if (completed || completing) return;
    setCompleting(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        lesson_id: lesson.id,
        course_id: course.id,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" },
    );
    // Award XP via RPC
    await supabase.rpc("award_xp", {
      p_user_id: userId,
      p_amount: lesson.xp_reward,
    });
    setCompleted(true);
    setCompleting(false);
    setXpFlash(true);
    setTimeout(() => setXpFlash(false), 3000);
    // Update streak — pass client local date to avoid server timezone mismatch
    fetch("/api/streak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: new Date().toLocaleDateString("en-CA") }),
    }).catch(() => {}); // non-blocking, silent fail
    router.refresh();
  }

  async function completeAndNext() {
    await markComplete();
    if (nextLesson) {
      router.push(`/dashboard/courses/${courseSlug}/${nextLesson.slug}`);
    } else {
      router.push(`/dashboard/courses/${courseSlug}`);
    }
  }

  const completedCount = lessons.filter((l: any) =>
    completedSet.has(l.id),
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--stone)",
      }}
    >
      {/* Lesson sidebar */}
      <div
        style={{
          width: sidebarOpen ? "280px" : "0",
          flexShrink: 0,
          overflow: "hidden",
          borderRight: "1px solid rgba(201,168,76,0.08)",
          background: "var(--stone2)",
          transition: "width 0.3s ease",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "1.5rem", minWidth: "280px" }}>
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.5rem",
            }}
          >
            {course.title}
          </p>
          <div
            style={{
              height: "2px",
              background: "var(--stone4)",
              borderRadius: "2px",
              overflow: "hidden",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                width: `${lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0}%`,
                height: "100%",
                background: "var(--gold)",
                transition: "width 0.5s",
              }}
            />
          </div>
          {lessons.map((l: any, idx: number) => {
            const isDone = completedSet.has(l.id);
            const isCurrent = l.id === lesson.id;
            return (
              <Link
                key={l.id}
                href={`/dashboard/courses/${courseSlug}/${l.slug}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.65rem 0.5rem",
                  textDecoration: "none",
                  borderRadius: "2px",
                  marginBottom: "0.1rem",
                  background: isCurrent
                    ? "rgba(201,168,76,0.06)"
                    : "transparent",
                  borderLeft: isCurrent
                    ? "2px solid var(--gold)"
                    : "2px solid transparent",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginTop: "0.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${isDone ? "var(--gold)" : "rgba(201,168,76,0.2)"}`,
                    background: isDone ? "rgba(201,168,76,0.1)" : "transparent",
                    fontSize: "0.6rem",
                    color: isDone ? "var(--gold)" : "var(--iron)",
                  }}
                >
                  {isDone ? "✓" : idx + 1}
                </div>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: isCurrent
                      ? "var(--white)"
                      : isDone
                        ? "var(--iron)"
                        : "var(--parchment-dim)",
                    lineHeight: 1.4,
                  }}
                >
                  {l.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          maxWidth: "760px",
          margin: "0 auto",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Top nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.15)",
                color: "var(--iron)",
                padding: "0.4rem 0.75rem",
                cursor: "pointer",
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
              }}
            >
              {sidebarOpen ? "✕ Close" : "☰ Lessons"}
            </button>
            <Link
              href={`/dashboard/courses/${courseSlug}`}
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--iron)",
                textDecoration: "none",
              }}
            >
              ← {course.title}
            </Link>
          </div>
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              color: "var(--iron)",
            }}
          >
            {completedCount} / {lessons.length} complete
          </span>
        </div>

        {/* Lesson header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: TYPE_COLORS[lesson.lesson_type] || "var(--iron)",
                border: `1px solid ${TYPE_COLORS[lesson.lesson_type] || "rgba(201,168,76,0.2)"}30`,
                padding: "0.2rem 0.6rem",
              }}
            >
              {lesson.lesson_type}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--iron)" }}>
              {lesson.duration_minutes} min · +{lesson.xp_reward} XP
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.5rem,3vw,2.25rem)",
              fontWeight: 700,
              color: "var(--white)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            {lesson.title}
          </h1>
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg,var(--gold-dim),transparent)",
              width: "200px",
            }}
          />
        </div>

        {/* Video if exists */}
        {lesson.video_url && (
          <div
            style={{
              marginBottom: "2.5rem",
              aspectRatio: "16/9",
              background: "var(--stone2)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <iframe
              src={lesson.video_url
                .replace("watch?v=", "embed/")
                .replace("youtu.be/", "www.youtube.com/embed/")}
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Lesson content */}
        <div
          className="lesson-body"
          style={{
            color: "var(--parchment-dim)",
            lineHeight: 1.85,
            fontSize: "1.05rem",
            fontFamily: "Crimson Pro, Georgia, serif",
          }}
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        {/* Share on completion */}
        {completed && (
          <ShareButton
            lessonTitle={lesson.title}
            courseTitle={course.title}
            xpEarned={lesson.xp_reward}
          />
        )}

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
              animation: "riseUp 0.4s ease-out",
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
              +{lesson.xp_reward}
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

        {/* Bottom navigation */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(201,168,76,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            {prevLesson && (
              <Link
                href={`/dashboard/courses/${courseSlug}/${prevLesson.slug}`}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  textDecoration: "none",
                }}
              >
                ← Previous
              </Link>
            )}
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {completed ? (
              nextLesson ? (
                <Link
                  href={`/dashboard/courses/${courseSlug}/${nextLesson.slug}`}
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    background: "var(--gold)",
                    color: "#0F0D0B",
                    padding: "0.8rem 2rem",
                    textDecoration: "none",
                  }}
                >
                  Next Lesson →
                </Link>
              ) : (
                <Link
                  href={`/dashboard/courses/${courseSlug}`}
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    background: "var(--gold)",
                    color: "#0F0D0B",
                    padding: "0.8rem 2rem",
                    textDecoration: "none",
                  }}
                >
                  Course Complete ✓
                </Link>
              )
            ) : (
              <button
                onClick={completeAndNext}
                disabled={completing}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: completing ? "var(--gold-dim)" : "var(--gold)",
                  color: "#0F0D0B",
                  padding: "0.8rem 2rem",
                  border: "none",
                  cursor: completing ? "not-allowed" : "pointer",
                }}
              >
                {completing
                  ? "Marking..."
                  : nextLesson
                    ? "Complete & Continue →"
                    : "Complete Course ✓"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Global lesson content styles */}
      <style>{`
        .lesson-body h2 {
          font-family: Cinzel, serif; font-size: 1.15rem; font-weight: 700;
          color: var(--white); margin: 2.5rem 0 1rem; letter-spacing: 0.02em;
        }
        .lesson-body p { margin-bottom: 1.25rem; }
        .lesson-body p.lesson-lead {
          font-size: 1.2rem; color: var(--parchment); font-style: italic;
          border-left: 3px solid var(--gold-dim); padding-left: 1.25rem;
          margin-bottom: 1.75rem; line-height: 1.75;
        }
        .lesson-body blockquote {
          border-left: 3px solid var(--gold); padding: 1rem 1.5rem;
          margin: 2rem 0; background: rgba(201,168,76,0.04);
        }
        .lesson-body blockquote p {
          font-size: 1.05rem; color: var(--parchment); font-style: italic;
          margin-bottom: 0.5rem; line-height: 1.7;
        }
        .lesson-body blockquote cite {
          font-size: 0.8rem; color: var(--iron); font-style: normal;
          font-family: Cinzel, serif; letter-spacing: 0.05em;
        }
        .lesson-body strong { color: var(--white); font-weight: 600; }
        .lesson-body em { color: var(--parchment); }
        .lesson-body .lesson-practice {
          background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.2);
          padding: 1.5rem 2rem; margin-top: 2.5rem;
        }
        .lesson-body .lesson-practice h3 {
          font-family: Cinzel, serif; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .lesson-body .lesson-practice p {
          font-size: 0.95rem; color: var(--parchment-dim); line-height: 1.75;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}

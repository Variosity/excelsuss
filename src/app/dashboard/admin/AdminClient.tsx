"use client";
import { useState } from "react";

type Tab = "stats" | "users" | "content" | "lessons";

const TIER_OPTIONS = ["discipulus", "miles", "excelsus"];
const STATUS_OPTIONS = ["active", "inactive", "canceled", "trialing"];
const LESSON_TYPES = [
  "concept",
  "exercise",
  "reflection",
  "meditation",
  "assessment",
];
const PILLARS = [
  "stoicism",
  "warrior",
  "spirituality",
  "wealth",
  "sovereignty",
  "psychology",
  "physical",
  "social",
  "legacy",
];

export default function AdminClient({
  users,
  courses,
  lessons,
  stats,
}: {
  users: any[];
  courses: any[];
  lessons: any[];
  stats: {
    userCount: number;
    activeCount: number;
    progressCount: number;
    tierCounts: Record<string, number>;
  };
}) {
  const [tab, setTab] = useState<Tab>("stats");
  const [userSearch, setUserSearch] = useState("");
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseList, setCourseList] = useState<any[]>(courses);
  const [lessonList, setLessonList] = useState<any[]>(lessons);
  const [courseForm, setCourseForm] = useState({
    id: "",
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    pillar: "stoicism",
    tier_required: "discipulus",
    duration_hours: 1,
    is_featured: false,
    latin_quote: "",
    latin_translation: "",
  });
  const [lessonForm, setLessonForm] = useState({
    title: "",
    slug: "",
    lesson_type: "concept",
    duration_minutes: 15,
    xp_reward: 50,
    is_free_preview: false,
    video_url: "",
    content: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [courseSaved, setCourseSaved] = useState(false);
  const [courseError, setCourseError] = useState("");

  // User management
  async function updateUserTier(userId: string, tier: string, status: string) {
    setUpdatingUser(userId);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ membership_tier: tier, membership_status: status })
      .eq("user_id", userId);
    setUpdatingUser(null);
  }

  // Course creation
  async function addCourse(e: React.FormEvent) {
    e.preventDefault();
    setCourseError("");
    if (!courseForm.title || !courseForm.pillar) return;
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const slug =
      courseForm.slug ||
      courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const id = courseForm.id || `${courseForm.pillar}-${slug}`;
    const { error } = await supabase.from("courses").insert({
      id,
      slug,
      title: courseForm.title,
      subtitle: courseForm.subtitle || null,
      description: courseForm.description || null,
      pillar: courseForm.pillar,
      tier_required: courseForm.tier_required,
      total_lessons: 0,
      duration_hours: Number(courseForm.duration_hours),
      is_featured: courseForm.is_featured,
      latin_quote: courseForm.latin_quote || null,
      latin_translation: courseForm.latin_translation || null,
    });
    if (error) {
      setCourseError(error.message);
      setSaving(false);
      return;
    }
    setCourseList((prev) => [
      ...prev,
      {
        id,
        slug,
        title: courseForm.title,
        pillar: courseForm.pillar,
        tier_required: courseForm.tier_required,
        total_lessons: 0,
      },
    ]);
    setSaving(false);
    setCourseSaved(true);
    setCourseForm({
      id: "",
      slug: "",
      title: "",
      subtitle: "",
      description: "",
      pillar: "stoicism",
      tier_required: "discipulus",
      duration_hours: 1,
      is_featured: false,
      latin_quote: "",
      latin_translation: "",
    });
    setTimeout(() => {
      setCourseSaved(false);
      setShowAddCourse(false);
    }, 2000);
  }

  // Lesson creation
  async function addLesson(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourseId || !lessonForm.title) return;
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const existingLessons = lessonList.filter(
      (l) => l.course_id === selectedCourseId,
    );
    const { data: newLesson, error } = await supabase
      .from("lessons")
      .insert({
        course_id: selectedCourseId,
        title: lessonForm.title,
        slug:
          lessonForm.slug ||
          lessonForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        content: lessonForm.content,
        lesson_type: lessonForm.lesson_type,
        order_index: existingLessons.length + 1,
        duration_minutes: Number(lessonForm.duration_minutes),
        xp_reward: Number(lessonForm.xp_reward),
        is_free_preview: lessonForm.is_free_preview,
        video_url: lessonForm.video_url || null,
      })
      .select()
      .single();
    if (newLesson) setLessonList((prev) => [...prev, newLesson]);
    // Update course lesson count
    await supabase
      .from("courses")
      .update({ total_lessons: existingLessons.length + 1 })
      .eq("id", selectedCourseId);
    setSaving(false);
    setSaved(true);
    setLessonForm({
      title: "",
      slug: "",
      lesson_type: "concept",
      duration_minutes: 15,
      xp_reward: 50,
      is_free_preview: false,
      video_url: "",
      content: "",
    });
    setTimeout(() => {
      setSaved(false);
      setShowAddLesson(false);
    }, 2000);
  }

  // Delete lesson
  async function deleteLesson(lessonId: string) {
    if (!confirm("Delete this lesson? This cannot be undone.")) return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.from("lessons").delete().eq("id", lessonId);
    setLessonList((prev) => prev.filter((l) => l.id !== lessonId));
  }

  const filteredUsers = users.filter(
    (u) =>
      !userSearch ||
      u.username?.includes(userSearch) ||
      u.email?.includes(userSearch) ||
      u.display_name?.includes(userSearch),
  );
  const courseLessons = lessonList.filter(
    (l) => l.course_id === selectedCourseId,
  );

  const inputStyle = {
    width: "100%",
    background: "var(--stone)",
    border: "1px solid rgba(201,168,76,0.15)",
    padding: "0.6rem 0.9rem",
    color: "var(--parchment)",
    fontSize: "0.88rem",
    fontFamily: "Crimson Pro, serif",
    outline: "none",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontFamily: "Cinzel, serif",
    fontSize: "0.6rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--iron)",
    display: "block",
    marginBottom: "0.35rem",
  };
  const selectStyle = { ...inputStyle, cursor: "pointer" };

  return (
    <div style={{ padding: "2.5rem", maxWidth: "1100px" }}>
      {/* Header */}
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
          Administration
        </span>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--white)",
            margin: "0.5rem 0 0.35rem",
          }}
        >
          Command Panel
        </h1>
        <p style={{ fontSize: "0.9rem", color: "var(--iron)" }}>
          Manage users, content, and platform settings.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.25rem",
          marginBottom: "2rem",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          paddingBottom: "0",
        }}
      >
        {(["stats", "users", "content", "lessons"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.6rem 1.25rem",
              background: "transparent",
              color: tab === t ? "var(--gold)" : "var(--iron)",
              border: "none",
              borderBottom:
                tab === t ? "2px solid var(--gold)" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: "-1px",
            }}
          >
            {t === "stats"
              ? "Overview"
              : t === "users"
                ? "Members"
                : t === "content"
                  ? "Courses"
                  : "Lessons"}
          </button>
        ))}
      </div>

      {/* STATS TAB */}
      {tab === "stats" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: "1rem",
          }}
        >
          {[
            { label: "Total Members", value: stats.userCount },
            { label: "Active Members", value: stats.activeCount },
            { label: "Lessons Completed", value: stats.progressCount },
            { label: "Discipulus", value: stats.tierCounts.discipulus || 0 },
            { label: "Miles", value: stats.tierCounts.miles || 0 },
            { label: "Excelsus", value: stats.tierCounts.excelsus || 0 },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "1.5rem",
                background: "var(--stone2)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  marginBottom: "0.5rem",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* USERS TAB */}
      {tab === "users" && (
        <div>
          <input
            type="text"
            placeholder="Search by username or email..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            style={{ ...inputStyle, marginBottom: "1.5rem", maxWidth: "400px" }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {filteredUsers.map((u) => (
              <div
                key={u.user_id}
                style={{
                  border: "1px solid rgba(201,168,76,0.1)",
                  padding: "1.25rem 1.5rem",
                  background: "var(--stone2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "150px" }}>
                  <p
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--white)",
                    }}
                  >
                    {u.display_name || u.username}
                  </p>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--iron)",
                      marginTop: "0.15rem",
                    }}
                  >
                    {u.user_id?.slice(0, 8)}… · {u.xp || 0} XP ·{" "}
                    {u.streak_days || 0}d streak
                  </p>
                </div>
                <select
                  defaultValue={u.membership_tier}
                  onChange={(e) =>
                    updateUserTier(
                      u.user_id,
                      e.target.value,
                      u.membership_status,
                    )
                  }
                  style={{ ...selectStyle, width: "140px" }}
                >
                  {TIER_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  defaultValue={u.membership_status}
                  onChange={(e) =>
                    updateUserTier(u.user_id, u.membership_tier, e.target.value)
                  }
                  style={{ ...selectStyle, width: "130px" }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {updatingUser === u.user_id && (
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.62rem",
                      color: "var(--gold)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Saving…
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COURSES TAB */}
      {tab === "content" && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--iron)",
              }}
            >
              {courseList.length} courses in database
            </p>
            <button
              onClick={() => setShowAddCourse(!showAddCourse)}
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: showAddCourse ? "transparent" : "var(--gold)",
                color: showAddCourse ? "var(--iron)" : "#0F0D0B",
                padding: "0.6rem 1.5rem",
                border: showAddCourse
                  ? "1px solid rgba(201,168,76,0.2)"
                  : "none",
                cursor: "pointer",
              }}
            >
              {showAddCourse ? "Cancel" : "+ New Course"}
            </button>
          </div>

          {/* Add Course Form */}
          {showAddCourse && (
            <form
              onSubmit={addCourse}
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                padding: "2rem",
                background: "var(--stone2)",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg,transparent,var(--gold),transparent)",
                  margin: "-2rem -2rem 2rem",
                }}
              />
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--white)",
                  marginBottom: "1.5rem",
                }}
              >
                New Course
              </p>
              {courseError && (
                <p
                  style={{
                    color: "#E57373",
                    fontSize: "0.8rem",
                    marginBottom: "1rem",
                    fontFamily: "Cinzel, serif",
                  }}
                >
                  ⚠ {courseError}
                </p>
              )}
              {courseSaved && (
                <p
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.7rem",
                    color: "var(--gold)",
                    marginBottom: "1rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ✓ Course created successfully
                </p>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Title *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm((f) => ({ ...f, title: e.target.value }))
                    }
                    style={inputStyle}
                    placeholder="Meditations Decoded"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Subtitle</label>
                  <input
                    type="text"
                    value={courseForm.subtitle}
                    onChange={(e) =>
                      setCourseForm((f) => ({ ...f, subtitle: e.target.value }))
                    }
                    style={inputStyle}
                    placeholder="Marcus Aurelius for Modern Men"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Pillar *</label>
                  <select
                    value={courseForm.pillar}
                    onChange={(e) =>
                      setCourseForm((f) => ({ ...f, pillar: e.target.value }))
                    }
                    style={selectStyle}
                  >
                    {PILLARS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Tier Required</label>
                  <select
                    value={courseForm.tier_required}
                    onChange={(e) =>
                      setCourseForm((f) => ({
                        ...f,
                        tier_required: e.target.value,
                      }))
                    }
                    style={selectStyle}
                  >
                    {TIER_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Duration (hours)</label>
                  <input
                    type="number"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={courseForm.duration_hours}
                    onChange={(e) =>
                      setCourseForm((f) => ({
                        ...f,
                        duration_hours: parseFloat(e.target.value),
                      }))
                    }
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <label style={labelStyle}>
                    Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={courseForm.slug}
                    onChange={(e) =>
                      setCourseForm((f) => ({ ...f, slug: e.target.value }))
                    }
                    style={inputStyle}
                    placeholder="meditations-decoded"
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Course ID (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={courseForm.id}
                    onChange={(e) =>
                      setCourseForm((f) => ({ ...f, id: e.target.value }))
                    }
                    style={inputStyle}
                    placeholder="stoicism-101"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    fontFamily: "Crimson Pro, serif",
                  }}
                  placeholder="What this course teaches and why it matters..."
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Latin Quote (optional)</label>
                  <input
                    type="text"
                    value={courseForm.latin_quote}
                    onChange={(e) =>
                      setCourseForm((f) => ({
                        ...f,
                        latin_quote: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    placeholder="Memento mori"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Translation</label>
                  <input
                    type="text"
                    value={courseForm.latin_translation}
                    onChange={(e) =>
                      setCourseForm((f) => ({
                        ...f,
                        latin_translation: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    placeholder="Remember that you will die"
                  />
                </div>
              </div>

              <label
                style={{
                  ...labelStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  marginBottom: "1.5rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={courseForm.is_featured}
                  onChange={(e) =>
                    setCourseForm((f) => ({
                      ...f,
                      is_featured: e.target.checked,
                    }))
                  }
                />
                Feature on Command Center dashboard
              </label>

              <button
                type="submit"
                disabled={saving}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: saving ? "var(--gold-dim)" : "var(--gold)",
                  color: "#0F0D0B",
                  padding: "0.85rem 2.5rem",
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Creating Course..." : "Create Course"}
              </button>
            </form>
          )}

          {/* Course List */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {courseList.map((course) => (
              <div
                key={course.id}
                style={{
                  border: "1px solid rgba(201,168,76,0.1)",
                  padding: "1.25rem 1.5rem",
                  background: "var(--stone2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--white)",
                    }}
                  >
                    {course.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--iron)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {course.pillar} · {course.tier_required} ·{" "}
                    {course.total_lessons} lessons · ID: {course.id}
                  </p>
                </div>
                <a
                  href={`/dashboard/courses/${course.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textDecoration: "none",
                  }}
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LESSONS TAB */}
      {tab === "lessons" && (
        <div>
          {/* Course selector */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Select Course</label>
            <select
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                setShowAddLesson(false);
              }}
              style={{ ...selectStyle, maxWidth: "480px" }}
            >
              <option value="">— choose a course —</option>
              {courseList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.pillar})
                </option>
              ))}
            </select>
          </div>

          {selectedCourseId && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  marginBottom: "0.75rem",
                }}
              >
                {courseLessons.length} lesson
                {courseLessons.length !== 1 ? "s" : ""} in this course
              </p>
              {courseLessons.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    marginBottom: "1rem",
                  }}
                >
                  {courseLessons
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((l) => (
                      <div
                        key={l.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "0.75rem 1rem",
                          border: "1px solid rgba(201,168,76,0.08)",
                          background: "var(--stone)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.72rem",
                            color: "var(--iron)",
                            width: "1.5rem",
                            flexShrink: 0,
                          }}
                        >
                          {l.order_index}.
                        </span>
                        <span
                          style={{
                            flex: 1,
                            fontSize: "0.85rem",
                            color: "var(--parchment)",
                          }}
                        >
                          {l.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.6rem",
                            color: "var(--iron)",
                            textTransform: "uppercase",
                          }}
                        >
                          {l.lesson_type}
                        </span>
                        <span
                          style={{ color: "var(--iron)", fontSize: "0.75rem" }}
                        >
                          {l.duration_minutes}m
                        </span>
                        <span
                          style={{
                            color: "var(--gold)",
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.72rem",
                          }}
                        >
                          +{l.xp_reward} XP
                        </span>
                        <button
                          onClick={() => deleteLesson(l.id)}
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(200,50,50,0.3)",
                            color: "#E57373",
                            fontSize: "0.7rem",
                            padding: "0.2rem 0.5rem",
                            cursor: "pointer",
                            fontFamily: "Cinzel, serif",
                          }}
                          title="Delete lesson"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              )}
              <button
                onClick={() => setShowAddLesson(!showAddLesson)}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: showAddLesson ? "transparent" : "var(--gold)",
                  color: showAddLesson ? "var(--iron)" : "#0F0D0B",
                  padding: "0.6rem 1.5rem",
                  border: showAddLesson
                    ? "1px solid rgba(201,168,76,0.2)"
                    : "none",
                  cursor: "pointer",
                }}
              >
                {showAddLesson ? "Cancel" : "+ Add Lesson"}
              </button>
            </div>
          )}

          {/* Add lesson form */}
          {showAddLesson && selectedCourseId && (
            <form
              onSubmit={addLesson}
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                padding: "2rem",
                background: "var(--stone2)",
              }}
            >
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg,transparent,var(--gold),transparent)",
                  margin: "-2rem -2rem 2rem",
                }}
              />
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--white)",
                  marginBottom: "1.5rem",
                }}
              >
                New Lesson
              </p>
              {saved && (
                <p
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.7rem",
                    color: "var(--gold)",
                    marginBottom: "1rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ✓ Lesson saved successfully
                </p>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Title *</label>
                  <input
                    type="text"
                    required
                    value={lessonForm.title}
                    onChange={(e) =>
                      setLessonForm((f) => ({ ...f, title: e.target.value }))
                    }
                    style={inputStyle}
                    placeholder="The Dichotomy of Control"
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={lessonForm.slug}
                    onChange={(e) =>
                      setLessonForm((f) => ({ ...f, slug: e.target.value }))
                    }
                    style={inputStyle}
                    placeholder="dichotomy-of-control"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Type</label>
                  <select
                    value={lessonForm.lesson_type}
                    onChange={(e) =>
                      setLessonForm((f) => ({
                        ...f,
                        lesson_type: e.target.value,
                      }))
                    }
                    style={selectStyle}
                  >
                    {LESSON_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Duration (min)</label>
                  <input
                    type="number"
                    value={lessonForm.duration_minutes}
                    onChange={(e) =>
                      setLessonForm((f) => ({
                        ...f,
                        duration_minutes: parseInt(e.target.value),
                      }))
                    }
                    style={inputStyle}
                    min={1}
                    max={120}
                  />
                </div>
                <div>
                  <label style={labelStyle}>XP Reward</label>
                  <input
                    type="number"
                    value={lessonForm.xp_reward}
                    onChange={(e) =>
                      setLessonForm((f) => ({
                        ...f,
                        xp_reward: parseInt(e.target.value),
                      }))
                    }
                    style={inputStyle}
                    min={10}
                    max={500}
                    step={5}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <label
                    style={{
                      ...labelStyle,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={lessonForm.is_free_preview}
                      onChange={(e) =>
                        setLessonForm((f) => ({
                          ...f,
                          is_free_preview: e.target.checked,
                        }))
                      }
                    />
                    Free Preview
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>
                  Video URL (YouTube or Vimeo — optional)
                </label>
                <input
                  type="url"
                  value={lessonForm.video_url}
                  onChange={(e) =>
                    setLessonForm((f) => ({ ...f, video_url: e.target.value }))
                  }
                  style={inputStyle}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--iron)",
                    marginTop: "0.3rem",
                  }}
                >
                  Paste any YouTube or Vimeo URL. Embeds automatically in the
                  lesson viewer.
                </p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>Lesson Content (HTML)</label>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--iron)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.6,
                  }}
                >
                  Use: &lt;p&gt; for paragraphs · &lt;h2&gt; for sections ·
                  &lt;blockquote&gt;&lt;p&gt;quote&lt;/p&gt;&lt;cite&gt;author&lt;/cite&gt;&lt;/blockquote&gt;
                  for quotes · &lt;div
                  class="lesson-practice"&gt;&lt;h3&gt;Practice&lt;/h3&gt;&lt;p&gt;...&lt;/p&gt;&lt;/div&gt;
                  for practice boxes · &lt;p class="lesson-lead"&gt; for opening
                  paragraph
                </p>
                <textarea
                  value={lessonForm.content}
                  onChange={(e) =>
                    setLessonForm((f) => ({ ...f, content: e.target.value }))
                  }
                  rows={16}
                  placeholder={
                    '<p class="lesson-lead">Opening paragraph that draws the reader in...</p>\n<p>Body content...</p>\n<blockquote><p>Quote text</p><cite>— Author, Source</cite></blockquote>\n<h2>Section Header</h2>\n<p>More content...</p>\n<div class="lesson-practice"><h3>Today\'s Practice</h3><p>What the reader should do today.</p></div>'
                  }
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    fontFamily: "monospace",
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: saving ? "var(--gold-dim)" : "var(--gold)",
                  color: "#0F0D0B",
                  padding: "0.85rem 2.5rem",
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Saving Lesson..." : "Publish Lesson"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  target_date?: string;
  completed: boolean;
  created_at: string;
}

const CATEGORIES = [
  "conquest",
  "wealth",
  "body",
  "mind",
  "spirit",
  "relationships",
  "craft",
];
const CAT_COLORS: Record<string, string> = {
  conquest: "#8B1A1A",
  wealth: "var(--gold-dim)",
  body: "#3A7A5A",
  mind: "#3A5A8B",
  spirit: "#6B3A6B",
  relationships: "#8B6B3A",
  craft: "#6B8B9A",
};

export default function GoalTracker({
  goals: initialGoals,
  userId,
}: {
  goals: Goal[];
  userId: string;
}) {
  const [goals, setGoals] = useState(initialGoals);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"active" | "completed">("active");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("conquest");
  const [targetDate, setTargetDate] = useState("");
  const [saving, setSaving] = useState(false);

  async function addGoal(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("goals")
      .insert({
        user_id: userId,
        title: title.trim(),
        description: description.trim() || null,
        category,
        target_date: targetDate || null,
        completed: false,
      })
      .select()
      .single();
    if (!error && data) {
      setGoals((prev) => [data as Goal, ...prev]);
      setTitle("");
      setDescription("");
      setTargetDate("");
      setCategory("conquest");
      setShowForm(false);
    }
    setSaving(false);
  }

  async function toggleGoal(goal: Goal) {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const completed = !goal.completed;
    await supabase
      .from("goals")
      .update({
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("id", goal.id);
    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? { ...g, completed } : g)),
    );
  }

  async function deleteGoal(id: string) {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.from("goals").delete().eq("id", id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  const filtered = goals.filter((g) =>
    filter === "active" ? !g.completed : g.completed,
  );
  const inputStyle = {
    width: "100%",
    background: "var(--stone)",
    border: "1px solid rgba(201,168,76,0.15)",
    padding: "0.65rem 1rem",
    color: "var(--parchment)",
    fontSize: "0.92rem",
    fontFamily: "Crimson Pro, serif",
    outline: "none",
  };

  return (
    <div>
      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {(["active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.4rem 1rem",
                border: "1px solid",
                cursor: "pointer",
                background: filter === f ? "var(--gold)" : "transparent",
                color: filter === f ? "#0F0D0B" : "var(--iron)",
                borderColor:
                  filter === f ? "var(--gold)" : "rgba(201,168,76,0.2)",
                minHeight: "44px",
              }}
            >
              {f} (
              {
                goals.filter((g) =>
                  f === "active" ? !g.completed : g.completed,
                ).length
              }
              )
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: showForm ? "transparent" : "var(--gold)",
            color: showForm ? "var(--iron)" : "#0F0D0B",
            padding: "0.6rem 1.5rem",
            border: showForm ? "1px solid rgba(201,168,76,0.2)" : "none",
            cursor: "pointer",
            minHeight: "44px",
            whiteSpace: "nowrap",
          }}
        >
          {showForm ? "Cancel" : "+ Add Goal"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={addGoal}
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            padding: "1.75rem",
            background: "var(--stone2)",
            marginBottom: "1.5rem",
          }}
        >
          {/* FIXED: Mobile-optimized form grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Goal
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="What will you conquer?"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Target Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--iron)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Category
            </label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    border: "1px solid",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    background:
                      category === cat ? CAT_COLORS[cat] : "transparent",
                    color: category === cat ? "var(--white)" : "var(--iron)",
                    borderColor:
                      category === cat
                        ? CAT_COLORS[cat]
                        : "rgba(201,168,76,0.15)",
                    minHeight: "44px",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--iron)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Notes (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Why does this matter? What does winning look like?"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "var(--gold)",
              color: "#0F0D0B",
              padding: "0.7rem 2rem",
              border: "none",
              cursor: "pointer",
              minHeight: "44px",
            }}
          >
            {saving ? "Forging..." : "Set Goal"}
          </button>
        </form>
      )}

      {/* Goals list */}
      {filtered.length === 0 ? (
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.08)",
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
            {filter === "active"
              ? "No active goals. A man without a target is drifting."
              : "No completed goals yet. The forge awaits."}
          </p>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {filtered.map((goal) => (
            <div
              key={goal.id}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                border: `1px solid ${goal.completed ? "rgba(201,168,76,0.08)" : "rgba(201,168,76,0.15)"}`,
                padding: "1.25rem",
                background: "var(--stone2)",
                opacity: goal.completed ? 0.6 : 1,
                transition: "opacity 0.2s",
                minWidth: 0,
              }}
            >
              {/* FIXED: Checkbox button properly sized */}
              <button
                onClick={() => toggleGoal(goal)}
                style={{
                  width: "24px",
                  height: "24px",
                  minWidth: "24px",
                  minHeight: "24px",
                  border: `2px solid ${goal.completed ? "var(--gold)" : "rgba(201,168,76,0.3)"}`,
                  borderRadius: "2px",
                  background: goal.completed ? "var(--gold)" : "transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginTop: "0.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  color: "#0F0D0B",
                  padding: 0,
                }}
              >
                {goal.completed ? "✓" : ""}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.25rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: goal.completed ? "var(--iron)" : "var(--white)",
                      textDecoration: goal.completed ? "line-through" : "none",
                    }}
                  >
                    {goal.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontFamily: "Cinzel, serif",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: `${CAT_COLORS[goal.category]}30`,
                      color: CAT_COLORS[goal.category],
                      padding: "0.15rem 0.5rem",
                      border: `1px solid ${CAT_COLORS[goal.category]}50`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {goal.category}
                  </span>
                  {goal.target_date && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--iron)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      → {new Date(goal.target_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {goal.description && (
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--iron)",
                      lineHeight: 1.5,
                    }}
                  >
                    {goal.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--iron)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: "0.5rem",
                  minHeight: "44px",
                  minWidth: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

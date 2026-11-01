"use client";
import { useState } from "react";

interface Prompt {
  id: string;
  pillar: string;
  prompt: string;
}
interface Entry {
  id: string;
  prompt_id?: string;
  prompt: string;
  response: string;
  created_at: string;
  updated_at: string;
}

export default function WorkbookClient({
  prompts,
  pillarColors,
  entries: initialEntries,
  userId,
}: {
  prompts: Prompt[];
  pillarColors: Record<string, string>;
  entries: Entry[];
  userId: string;
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [response, setResponse] = useState("");
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<"prompts" | "journal">("prompts");
  const [filterPillar, setFilterPillar] = useState("all");

  const pillars = ["all", ...Array.from(new Set(prompts.map((p) => p.pillar)))];

  function openPrompt(p: Prompt) {
    setActivePrompt(p);
    const existing = entries.find((e) => e.prompt === p.prompt);
    setResponse(existing?.response || "");
  }

  async function saveEntry() {
    if (!activePrompt || !response.trim()) return;
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const existing = entries.find((e) => e.prompt === activePrompt.prompt);
    if (existing) {
      await supabase
        .from("workbook_entries")
        .update({
          response: response.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      setEntries((prev) =>
        prev.map((e) =>
          e.id === existing.id
            ? {
                ...e,
                response: response.trim(),
                updated_at: new Date().toISOString(),
              }
            : e,
        ),
      );
    } else {
      const { data } = await supabase
        .from("workbook_entries")
        .insert({
          user_id: userId,
          prompt: activePrompt.prompt,
          response: response.trim(),
        })
        .select()
        .single();
      if (data) setEntries((prev) => [data as Entry, ...prev]);
    }
    setSaving(false);
    setActivePrompt(null);
    setResponse("");
  }

  const filteredPrompts =
    filterPillar === "all"
      ? prompts
      : prompts.filter((p) => p.pillar === filterPillar);
  const answeredIds = new Set(entries.map((e) => e.prompt));

  return (
    <div>
      {/* View toggle */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {(["prompts", "journal"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.4rem 1.25rem",
              border: "1px solid",
              cursor: "pointer",
              background: view === v ? "var(--gold)" : "transparent",
              color: view === v ? "#0F0D0B" : "var(--iron)",
              borderColor: view === v ? "var(--gold)" : "rgba(201,168,76,0.2)",
              minHeight: "44px",
            }}
          >
            {v === "prompts"
              ? `Questions (${prompts.length})`
              : `My Answers (${entries.length})`}
          </button>
        ))}
      </div>

      {view === "prompts" && (
        <>
          {/* Pillar filter */}
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            {pillars.map((p) => (
              <button
                key={p}
                onClick={() => setFilterPillar(p)}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.8rem",
                  border: "1px solid",
                  cursor: "pointer",
                  background:
                    filterPillar === p
                      ? pillarColors[p] || "var(--gold)"
                      : "transparent",
                  color: filterPillar === p ? "var(--white)" : "var(--iron)",
                  borderColor:
                    filterPillar === p
                      ? pillarColors[p] || "var(--gold)"
                      : "rgba(201,168,76,0.15)",
                  minHeight: "44px",
                }}
              >
                {p === "all" ? "All" : p}
              </button>
            ))}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {filteredPrompts.map((p) => {
              const answered = answeredIds.has(p.prompt);
              return (
                <div
                  key={p.id}
                  onClick={() => openPrompt(p)}
                  style={{
                    border: `1px solid ${answered ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.1)"}`,
                    padding: "1.25rem 1.5rem",
                    background: "var(--stone2)",
                    cursor: "pointer",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    transition: "border-color 0.2s",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      background: pillarColors[p.pillar] || "var(--gold-dim)",
                      flexShrink: 0,
                      borderRadius: "2px",
                      alignSelf: "stretch",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.4rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.58rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: pillarColors[p.pillar] || "var(--gold-dim)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.pillar}
                      </span>
                      {answered && (
                        <span
                          style={{
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.55rem",
                            color: "var(--gold)",
                            letterSpacing: "0.1em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          ✦ answered
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: answered
                          ? "var(--parchment-dim)"
                          : "var(--white)",
                        lineHeight: 1.6,
                      }}
                    >
                      {p.prompt}
                    </p>
                  </div>
                  <span
                    style={{
                      color: "var(--iron)",
                      fontSize: "1rem",
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {view === "journal" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {entries.length === 0 ? (
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
                No answers yet. The examined life awaits.
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  border: "1px solid rgba(201,168,76,0.12)",
                  padding: "1.5rem",
                  background: "var(--stone2)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--iron)",
                    fontStyle: "italic",
                    marginBottom: "0.75rem",
                    lineHeight: 1.5,
                  }}
                >
                  ❝ {entry.prompt}
                </p>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--parchment-dim)",
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {entry.response}
                </p>
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--iron)",
                    marginTop: "1rem",
                    fontFamily: "Cinzel, serif",
                    letterSpacing: "0.1em",
                  }}
                >
                  {new Date(entry.updated_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {activePrompt && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "640px",
              background: "var(--stone2)",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "2rem",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "0",
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
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: pillarColors[activePrompt.pillar] || "var(--gold-dim)",
              }}
            >
              {activePrompt.pillar}
            </span>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--white)",
                lineHeight: 1.65,
                margin: "0.75rem 0 1.5rem",
              }}
            >
              {activePrompt.prompt}
            </p>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={8}
              placeholder="Write honestly. No one sees this but you — and the future version of you who will read it back."
              autoFocus
              style={{
                width: "100%",
                background: "var(--stone)",
                border: "1px solid rgba(201,168,76,0.15)",
                padding: "1rem",
                color: "var(--parchment)",
                fontSize: "0.95rem",
                fontFamily: "Crimson Pro, serif",
                outline: "none",
                resize: "vertical",
                lineHeight: 1.7,
              }}
            />
            {/* FIXED: Mobile-optimized button layout */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1.25rem",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => {
                  setActivePrompt(null);
                  setResponse("");
                }}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "var(--iron)",
                  padding: "0.65rem 1.5rem",
                  border: "1px solid rgba(201,168,76,0.15)",
                  cursor: "pointer",
                  minHeight: "44px",
                  minWidth: "100px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveEntry}
                disabled={saving || !response.trim()}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "var(--gold)",
                  color: "#0F0D0B",
                  padding: "0.65rem 2rem",
                  border: "none",
                  cursor: "pointer",
                  minHeight: "44px",
                  minWidth: "100px",
                }}
              >
                {saving ? "Saving..." : "Save Answer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

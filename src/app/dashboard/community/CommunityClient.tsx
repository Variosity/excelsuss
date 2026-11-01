"use client";
import { useState } from "react";

interface Post {
  id: string;
  content: string;
  category: string;
  upvotes: number;
  reply_count: number;
  is_pinned: boolean;
  created_at: string;
  author_id: string;
  authorName: string;
}

const CATEGORIES = [
  "wins",
  "accountability",
  "wealth",
  "stoicism",
  "strategy",
  "training",
  "question",
];
const CAT_COLORS: Record<string, string> = {
  wins: "var(--gold)",
  accountability: "#8B1A1A",
  wealth: "var(--gold-dim)",
  stoicism: "#8B9467",
  strategy: "#3A5A8B",
  training: "#3A7A5A",
  question: "#6B3A6B",
};

export default function CommunityClient({
  userId,
  userDisplayName,
  initialPosts,
  discordServerId,
  discordInvite,
}: {
  userId: string;
  userDisplayName: string;
  initialPosts: Post[];
  discordServerId: string;
  discordInvite: string;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("wins");
  const [filter, setFilter] = useState("all");
  const [posting, setPosting] = useState(false);
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<"discord" | "wins">("discord");

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    const { validatePostContent } = await import("@/lib/utils/contentFilter");
    const check = validatePostContent(content);
    if (!check.ok) {
      alert(check.reason);
      return;
    }
    setPosting(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .insert({
        author_id: userId,
        content: content.trim(),
        category,
        upvotes: 0,
        reply_count: 0,
        is_pinned: false,
      })
      .select()
      .single();
    if (!error && data) {
      setPosts((prev) => [
        { ...(data as Post), authorName: userDisplayName },
        ...prev,
      ]);
      setContent("");
    }
    setPosting(false);
  }

  async function upvotePost(postId: string) {
    if (upvoted.has(postId)) return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase
      .from("post_upvotes")
      .insert({ post_id: postId, user_id: userId });
    await supabase.rpc("increment_upvotes", { post_id: postId });
    setUpvoted((prev) => new Set([...prev, postId]));
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p)),
    );
  }

  async function deletePost(postId: string) {
    if (!confirm("Delete this post?")) return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("author_id", userId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  const filteredPosts =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
      <div style={{ marginBottom: "2rem" }}>
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold-dim)",
          }}
        >
          Brotherhood
        </span>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            fontWeight: 700,
            color: "var(--white)",
            margin: "0.5rem 0 0.25rem",
          }}
        >
          War Council
        </h1>
      </div>

      {/* Tab toggle */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          paddingBottom: "0",
        }}
      >
        {[
          { key: "discord", label: "⊕ Discord — Live Chat" },
          { key: "wins", label: "✦ Wins Board" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.65rem 1.25rem",
              border: "none",
              cursor: "pointer",
              background: "transparent",
              color: tab === t.key ? "var(--gold)" : "var(--iron)",
              borderBottom:
                tab === t.key
                  ? "2px solid var(--gold)"
                  : "2px solid transparent",
              marginBottom: "-1px",
              transition: "color 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "discord" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Discord main */}
          <div>
            <div
              style={{
                border: "1px solid rgba(88,101,242,0.3)",
                background: "var(--stone2)",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid rgba(88,101,242,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 71 55" fill="none">
                    <path
                      d="M60.1 4.9A58.6 58.6 0 0 0 45.7.4a.2.2 0 0 0-.2.1 40.8 40.8 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.3 0A37.8 37.8 0 0 0 25.6.5a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 11 4.9a.2.2 0 0 0-.1.1C1.6 18.6-1 31.9.3 45.1a.2.2 0 0 0 .1.2 58.9 58.9 0 0 0 17.7 8.9.2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.5 5.3 24 5.3 35.4 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36 36 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .3.1A58.7 58.7 0 0 0 70.6 45.3a.2.2 0 0 0 .1-.2C73.1 29.8 68.9 16.7 60.2 5a.2.2 0 0 0-.1-.1z"
                      fill="#5865F2"
                    />
                  </svg>
                  <div>
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--white)",
                      }}
                    >
                      The Excelsus Discord
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                      Live brotherhood — real-time war council
                    </p>
                  </div>
                </div>
                <a
                  href={discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "#5865F2",
                    color: "var(--white)",
                    padding: "0.55rem 1.25rem",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  Join Server
                </a>
              </div>

              {discordServerId ? (
                <iframe
                  src={`https://discord.com/widget?id=${discordServerId}&theme=dark`}
                  width="100%"
                  height="420"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  style={{ border: "none", display: "block" }}
                />
              ) : (
                <div style={{ padding: "3rem", textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "1rem",
                    }}
                  >
                    Set Up Your Discord
                  </p>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--iron)",
                      lineHeight: 1.7,
                      maxWidth: "400px",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    Create your Discord server, enable the widget (Server
                    Settings → Widget), then add your server ID and invite link
                    to your Vercel environment variables.
                  </p>
                  <div
                    style={{
                      border: "1px solid rgba(88,101,242,0.2)",
                      padding: "1rem",
                      background: "rgba(88,101,242,0.05)",
                      textAlign: "left",
                      maxWidth: "400px",
                      margin: "0 auto",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#5865F2",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Add to Vercel env vars:
                    </p>
                    <code
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--parchment-dim)",
                        display: "block",
                        lineHeight: 1.8,
                      }}
                    >
                      NEXT_PUBLIC_DISCORD_SERVER_ID=123456789
                      <br />
                      NEXT_PUBLIC_DISCORD_INVITE=https://discord.gg/xxxxx
                    </code>
                  </div>
                </div>
              )}
            </div>

            {/* Channel guide */}
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "1.5rem",
                background: "var(--stone2)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Server Channels
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                  gap: "0.5rem",
                }}
              >
                {[
                  { ch: "#welcome", desc: "Introduce yourself" },
                  {
                    ch: "#daily-wins",
                    desc: "Post every win, no matter how small",
                  },
                  { ch: "#accountability", desc: "Hold and be held" },
                  { ch: "#philosophy", desc: "Stoicism, principles, debate" },
                  { ch: "#money-moves", desc: "Wealth building, business, AI" },
                  { ch: "#fitness", desc: "Training, nutrition, combat" },
                  { ch: "#strategy", desc: "Life strategy, decisions" },
                  { ch: "#war-council", desc: "Spartan-tier only" },
                ].map((c) => (
                  <div
                    key={c.ch}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.75rem",
                        color: "#5865F2",
                        flexShrink: 0,
                      }}
                    >
                      {c.ch}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                      {c.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Discord sidebar */}
          <div>
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "1.5rem",
                background: "var(--stone2)",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                The Code
              </p>
              {[
                "No excuses. Only accountability.",
                "Post wins and losses equally.",
                "Respect all ranks. Earn yours.",
                "What happens in the forge, stays.",
                "Lift others. The tide raises all ships.",
              ].map((rule, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.65rem",
                    marginBottom: "0.65rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cinzel, serif",
                      color: "var(--gold-dim)",
                      fontSize: "0.7rem",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}.
                  </span>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--iron)",
                      lineHeight: 1.5,
                    }}
                  >
                    {rule}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "1.5rem",
                background: "var(--stone2)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.72rem",
                  fontStyle: "italic",
                  color: "var(--gold-dim)",
                  marginBottom: "0.35rem",
                }}
              >
                Vincit qui se vincit
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--iron)" }}>
                "He conquers who conquers himself."
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === "wins" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Wins feed */}
          <div style={{ minWidth: 0 }}>
            {/* Category filter */}
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                flexWrap: "wrap",
                marginBottom: "1.25rem",
                overflowX: "auto",
                paddingBottom: "0.5rem",
              }}
            >
              <button
                onClick={() => setFilter("all")}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.8rem",
                  border: "1px solid",
                  cursor: "pointer",
                  background: filter === "all" ? "var(--gold)" : "transparent",
                  color: filter === "all" ? "#0F0D0B" : "var(--iron)",
                  borderColor:
                    filter === "all" ? "var(--gold)" : "rgba(201,168,76,0.2)",
                }}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.8rem",
                    border: "1px solid",
                    cursor: "pointer",
                    background:
                      filter === cat ? CAT_COLORS[cat] : "transparent",
                    color: filter === cat ? "var(--white)" : "var(--iron)",
                    borderColor:
                      filter === cat ? CAT_COLORS[cat] : "rgba(201,168,76,0.2)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post composer */}
            <form
              onSubmit={submitPost}
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                background: "var(--stone2)",
                padding: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
                placeholder="Post a win, a challenge, or an insight for your brothers..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  color: "var(--parchment)",
                  fontSize: "0.95rem",
                  fontFamily: "Crimson Pro, serif",
                  resize: "vertical",
                  minHeight: "80px",
                  outline: "none",
                  lineHeight: 1.65,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.75rem",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.65rem",
                        border: "1px solid",
                        cursor: "pointer",
                        background:
                          category === cat ? CAT_COLORS[cat] : "transparent",
                        color:
                          category === cat ? "var(--white)" : "var(--iron)",
                        borderColor:
                          category === cat
                            ? CAT_COLORS[cat]
                            : "rgba(201,168,76,0.15)",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                    {content.length}/500
                  </span>
                  <button
                    type="submit"
                    disabled={posting || !content.trim()}
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      background: posting ? "var(--gold-dim)" : "var(--gold)",
                      color: "#0F0D0B",
                      padding: "0.5rem 1.25rem",
                      border: "none",
                      cursor: posting ? "not-allowed" : "pointer",
                    }}
                  >
                    {posting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </form>

            {/* Posts */}
            {filteredPosts.length === 0 ? (
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
                  {filter === "all"
                    ? "Be the first to post. The brotherhood is watching."
                    : `No ${filter} posts yet. Be the first.`}
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    border: `1px solid ${post.is_pinned ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.08)"}`,
                    padding: "1.25rem",
                    background: "var(--stone2)",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      {post.is_pinned && (
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
                          Pinned
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: CAT_COLORS[post.category] || "var(--iron)",
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        style={{ fontSize: "0.75rem", color: "var(--iron)" }}
                      >
                        {post.authorName}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--iron)" }}>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--parchment-dim)",
                      lineHeight: 1.7,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {post.content}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => upvotePost(post.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        background: "transparent",
                        border: "none",
                        cursor: upvoted.has(post.id) ? "default" : "pointer",
                        padding: 0,
                        color: upvoted.has(post.id)
                          ? "var(--gold)"
                          : "var(--iron)",
                        fontSize: "0.78rem",
                        fontFamily: "Cinzel, serif",
                        letterSpacing: "0.08em",
                      }}
                    >
                      <span>✦</span>
                      <span>{post.upvotes}</span>
                    </button>
                    {post.author_id === userId && (
                      <button
                        onClick={() => deletePost(post.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--iron)",
                          fontSize: "0.62rem",
                          fontFamily: "Cinzel, serif",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: 0,
                          opacity: 0.45,
                          marginLeft: "auto",
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div
              style={{
                border: "1px solid rgba(88,101,242,0.25)",
                padding: "1.25rem",
                background: "var(--stone2)",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#5865F2",
                  marginBottom: "0.75rem",
                }}
              >
                Live Chat
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--iron)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}
              >
                The Wins Board is for async posts. For real-time brotherhood,
                join Discord.
              </p>
              <a
                href={discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "#5865F2",
                  color: "var(--white)",
                  padding: "0.6rem 1rem",
                  textDecoration: "none",
                }}
              >
                Join Discord
              </a>
            </div>
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "1.5rem",
                background: "var(--stone2)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Wins Board Rules
              </p>
              {[
                "Post wins only — no complaining here",
                "Real results only. No theory.",
                "React with ✦ to honor your brothers",
                "Post daily. Even small wins count.",
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--gold-dim)",
                      fontSize: "0.68rem",
                      flexShrink: 0,
                      fontFamily: "Cinzel, serif",
                    }}
                  >
                    {i + 1}.
                  </span>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--iron)",
                      lineHeight: 1.5,
                    }}
                  >
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

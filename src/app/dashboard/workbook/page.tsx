export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import WorkbookClient from "./WorkbookClient";

const PROMPTS = [
  {
    id: "p1",
    pillar: "stoicism",
    prompt:
      "What are three things outside your control that you've been spending energy on this week? What would change if you fully released them?",
  },
  {
    id: "p2",
    pillar: "stoicism",
    prompt:
      "Describe a moment recently where you responded with emotion instead of reason. How would the ideal version of you have responded?",
  },
  {
    id: "p3",
    pillar: "warrior",
    prompt:
      "What is the one thing you keep avoiding? Write about why. Then write your first concrete step toward it.",
  },
  {
    id: "p4",
    pillar: "warrior",
    prompt:
      "What does your ideal morning protocol look like? What are you actually doing? What is the gap?",
  },
  {
    id: "p5",
    pillar: "wealth",
    prompt:
      "List every skill you currently have that someone would pay for. Now rank them by highest potential hourly rate. What does this tell you?",
  },
  {
    id: "p6",
    pillar: "wealth",
    prompt:
      "If you had to make $1,000 in the next 30 days using only what you currently know, what would you do?",
  },
  {
    id: "p7",
    pillar: "psychology",
    prompt:
      "Think of someone who regularly frustrates you. What is their core motivation? What do they need to feel? How can you use this understanding?",
  },
  {
    id: "p8",
    pillar: "psychology",
    prompt:
      "What is your current frame? How do others perceive you when you walk into a room? How do you want them to perceive you? What's the gap?",
  },
  {
    id: "p9",
    pillar: "physical",
    prompt:
      "What does your ideal physical self look like in 12 months? What are you doing daily right now that either builds toward or away from that?",
  },
  {
    id: "p10",
    pillar: "spirituality",
    prompt:
      "What do you believe happens when you die? Write honestly. How does this belief affect how you live today?",
  },
  {
    id: "p11",
    pillar: "spirituality",
    prompt:
      "Describe the role of the feminine in your life — in your relationship, in nature, in yourself. What is the feminine energy you are learning to honor without losing yourself?",
  },
  {
    id: "p12",
    pillar: "legacy",
    prompt:
      "If you died tomorrow, what would remain? What would be remembered? What would you wish you had started?",
  },
  {
    id: "p13",
    pillar: "legacy",
    prompt:
      "Write your 10-year vision. Not just what you have — who you ARE. How you move through the world. What men think of you.",
  },
  {
    id: "p14",
    pillar: "social",
    prompt:
      "Who are the five men closest to you? Are they building or stagnating? What does their trajectory tell you about yours?",
  },
];

const PILLAR_COLORS: Record<string, string> = {
  stoicism: "#8B9467",
  warrior: "#8B1A1A",
  wealth: "var(--gold-dim)",
  psychology: "#6B3A6B",
  physical: "#8B6B3A",
  spirituality: "#C9A84C",
  legacy: "#6B4A3A",
  social: "#3A6B8B",
};

export default async function WorkbookPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: entries } = await supabase
    .from("workbook_entries")
    .select("*")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false });

  return (
    <div style={{ padding: "clamp(1rem, 4vw, 2.5rem)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
            Inner Work
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
            The Workbook
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--iron)",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Socrates said the unexamined life is not worth living. Answer these
            questions honestly. Return to your old answers as you grow. The gap
            between who you were and who you are IS your progress.
          </p>
        </div>
        <WorkbookClient
          prompts={PROMPTS}
          pillarColors={PILLAR_COLORS}
          entries={entries || []}
          userId={user!.id}
        />
      </div>
    </div>
  );
}

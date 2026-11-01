export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import GoalTracker from "./GoalTracker";

export default async function GoalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: goals } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

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
            The War Plan
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
            Goal Tracker
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--iron)",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            A goal without a deadline is a wish. Track your conquests here.
            Review them daily. Let the list embarrass you into action.
          </p>
        </div>
        <GoalTracker goals={goals || []} userId={user!.id} />
      </div>
    </div>
  );
}

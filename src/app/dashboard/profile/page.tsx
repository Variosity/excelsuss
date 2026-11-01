export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  return (
    <div
      style={{
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "2.5rem" }}>
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--iron)",
          }}
        >
          Your Identity
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
          Profile
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--iron)" }}>
          How the brotherhood knows you.
        </p>
      </div>

      {/* Stats summary */}
      {/* FIXED: Mobile-optimized stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            label: "Tier",
            value:
              (profile?.membership_tier || "discipulus")
                .charAt(0)
                .toUpperCase() +
              (profile?.membership_tier || "discipulus").slice(1),
          },
          { label: "XP", value: (profile?.xp || 0).toLocaleString() },
          { label: "Streak", value: `${profile?.streak_days || 0} days` },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              border: "1px solid rgba(201,168,76,0.12)",
              padding: "1.25rem",
              background: "var(--stone2)",
              textAlign: "center",
              minWidth: 0,
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--iron)",
                marginBottom: "0.35rem",
              }}
            >
              {s.label}
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
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <ProfileForm profile={profile} email={user?.email || ""} />
    </div>
  );
}

export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import UpgradeClient from "./UpgradeClient";

const TIERS = {
  discipulus: {
    name: "Discipulus",
    sub: "The Pupil",
    price: 29,
    color: "var(--iron)",
    features: [
      "Full curriculum access (43 courses)",
      "Brotherhood community",
      "Weekly challenges",
      "Goal tracker + Workbook",
      "Mobile app access",
    ],
    locked: [
      "5-man accountability cell",
      "Live war councils",
      "Deal network",
      "1-on-1 mentorship",
    ],
  },
  miles: {
    name: "Miles",
    sub: "The Soldier",
    price: 79,
    color: "var(--gold)",
    features: [
      "Everything in Discipulus",
      "5-man accountability cell",
      "Monthly live war council",
      "Wealth & Sovereignty deep access",
      "Member deal network",
      "Psychology mastery courses",
    ],
    locked: ["1-on-1 mentorship", "Private council", "IRL masterminds"],
  },
  excelsus: {
    name: "Excelsus",
    sub: "The Elevated",
    price: 197,
    color: "#B22222",
    features: [
      "Everything in Miles",
      "1-on-1 mentor sessions",
      "Private Excelsus council",
      "Early access to all new content",
      "IRL mastermind events",
      "Direct network introductions",
    ],
    locked: [],
  },
};

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const params = await searchParams;
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
    <div style={{ padding: "clamp(1rem, 4vw, 2.5rem)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <UpgradeClient
          tiers={TIERS}
          currentTier={profile?.membership_tier || "discipulus"}
          membershipStatus={profile?.membership_status || "inactive"}
          stripeSubscriptionId={profile?.stripe_subscription_id}
          justUpgraded={params.upgraded === "true"}
        />
      </div>
    </div>
  );
}

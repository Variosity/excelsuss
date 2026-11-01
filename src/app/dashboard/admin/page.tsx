export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  if (!profile?.is_admin) redirect("/dashboard");

  // Fetch data for admin
  const { data: users, count: userCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: courses } = await supabase
    .from("courses")
    .select("id, slug, title, pillar, tier_required, total_lessons")
    .order("pillar", { ascending: true });

  const { data: lessons } = await supabase
    .from("lessons")
    .select(
      "id, course_id, title, slug, lesson_type, order_index, xp_reward, duration_minutes",
    )
    .order("course_id", { ascending: true })
    .order("order_index", { ascending: true });

  const { count: progressCount } = await supabase
    .from("user_progress")
    .select("*", { count: "exact", head: true })
    .eq("completed", true);

  const activeCount =
    users?.filter((u) => u.membership_status === "active").length || 0;
  const tierCounts = {
    discipulus:
      users?.filter((u) => u.membership_tier === "discipulus").length || 0,
    miles: users?.filter((u) => u.membership_tier === "miles").length || 0,
    excelsus:
      users?.filter((u) => u.membership_tier === "excelsus").length || 0,
  };

  return (
    <div style={{ padding: "clamp(1rem, 4vw, 2.5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <AdminClient
          users={users || []}
          courses={courses || []}
          lessons={lessons || []}
          stats={{
            userCount: userCount || 0,
            activeCount,
            progressCount: progressCount || 0,
            tierCounts,
          }}
        />
      </div>
    </div>
  );
}

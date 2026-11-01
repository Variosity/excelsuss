// src/app/dashboard/courses/page.tsx
export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
  const supabase = await createClient();

  // DB is the single source of truth — no more merging with curriculum.ts
  const [
    { data: dbCourses },
    {
      data: { user },
    },
  ] = await Promise.all([
    supabase.from("courses").select("*").order("pillar", { ascending: true }),
    supabase.auth.getUser(),
  ]);

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_tier")
    .eq("user_id", user!.id)
    .single();

  return (
    <CoursesClient
      initialCourses={dbCourses || []}
      userTier={profile?.membership_tier || "discipulus"}
    />
  );
}

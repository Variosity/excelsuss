export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import type { Profile } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = (await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()) as { data: Profile };
  const isAdmin = profile?.is_admin === true;

  return (
    <div style={{ minHeight: "100vh", background: "var(--stone)" }}>
      <DashboardNav profile={profile} isAdmin={isAdmin} />
      {/* Desktop: offset by sidebar width. Mobile: offset by top bar height */}
      <main
        style={{
          marginLeft: "max(0px, min(220px, 100vw - 100%))",
          paddingTop: 0,
        }}
      >
        <style>{`
          @media (max-width: 767px) {
            main { margin-left: 0 !important; padding-top: 56px !important; }
          }
          @media (min-width: 768px) {
            main { margin-left: 220px !important; padding-top: 0 !important; }
          }
        `}</style>
        {children}
      </main>
    </div>
  );
}

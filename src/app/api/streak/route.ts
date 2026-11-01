export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Client sends their local date string (YYYY-MM-DD) so we compare
  // against the user's timezone, not Vercel's UTC server time.
  let clientDate: string | null = null;
  try {
    const body = await req.json();
    clientDate = body?.date ?? null; // e.g. "2026-06-09"
  } catch {
    // body is optional — fall back to UTC date
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("last_active, streak_days")
    .eq("user_id", user.id)
    .single();
  if (!profile)
    return NextResponse.json({ error: "No profile" }, { status: 404 });

  // Derive "today" and "yesterday" strings for comparison.
  // If the client sent their local date, use it. Otherwise fall back to UTC.
  const today = clientDate ?? new Date().toISOString().split("T")[0];
  const yesterdayDate = new Date(today + "T12:00:00Z"); // noon UTC to avoid DST edge
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = yesterdayDate.toISOString().split("T")[0];

  // Normalize last_active to a date string for comparison
  const lastActiveStr = profile.last_active
    ? profile.last_active.split("T")[0]
    : null;

  let newStreak = profile.streak_days || 0;

  if (!lastActiveStr) {
    newStreak = 1;
  } else if (lastActiveStr === today) {
    // Already checked in today — no change
    return NextResponse.json({ streak: newStreak, already_checked: true });
  } else if (lastActiveStr === yesterday) {
    newStreak = newStreak + 1;
  } else {
    newStreak = 1; // streak broken
  }

  await supabase
    .from("profiles")
    .update({ streak_days: newStreak, last_active: new Date().toISOString() })
    .eq("user_id", user.id);

  return NextResponse.json({ streak: newStreak });
}

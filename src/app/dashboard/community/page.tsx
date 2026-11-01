export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import CommunityClient from "./CommunityClient";

const DISCORD_SERVER_ID =
  process.env.NEXT_PUBLIC_DISCORD_SERVER_ID || "1512647879611777055";
const DISCORD_INVITE =
  process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/uBkEq8mWyp";

export default async function CommunityPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, membership_tier")
    .eq("user_id", user!.id)
    .single();

  const { data: posts } = await supabase
    .from("posts")
    .select(
      "id, content, category, upvotes, reply_count, is_pinned, created_at, author_id",
    )
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(30);

  const authorIds = [...new Set((posts || []).map((p: any) => p.author_id))];
  const { data: authors } =
    authorIds.length > 0
      ? await supabase
          .from("profiles")
          .select("user_id, display_name, username")
          .in("user_id", authorIds)
      : { data: [] };

  const authorMap = Object.fromEntries(
    (authors || []).map((a: any) => [a.user_id, a.display_name || a.username]),
  );
  const enrichedPosts = (posts || []).map((p: any) => ({
    ...p,
    authorName: authorMap[p.author_id] || "Brother",
  }));

  return (
    <CommunityClient
      userId={user!.id}
      userDisplayName={profile?.display_name || profile?.username || "Brother"}
      initialPosts={enrichedPosts}
      discordServerId={DISCORD_SERVER_ID}
      discordInvite={DISCORD_INVITE}
    />
  );
}

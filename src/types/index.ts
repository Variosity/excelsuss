export type MembershipTier = "discipulus" | "miles" | "excelsus";

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  membership_tier: MembershipTier;
  membership_status: "active" | "inactive" | "trialing" | "canceled";
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  xp: number;
  streak_days: number;
  last_active: string;
  created_at: string;
  country?: string;
  cell_id?: string;
  is_admin?: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pillar: Pillar;
  tier_required: MembershipTier;
  order_index: number;
  total_lessons: number;
  duration_hours: number;
  is_featured: boolean;
  thumbnail_url?: string;
  latin_quote?: string;
  latin_translation?: string;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  content: string;
  lesson_type: "video" | "text" | "exercise" | "assessment" | "meditation";
  order_index: number;
  duration_minutes: number;
  xp_reward: number;
  is_free_preview: boolean;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
  completed_at?: string;
  score?: number;
}

export interface Cell {
  id: string;
  name: string;
  description?: string;
  leader_id: string;
  member_ids: string[];
  tier_required: MembershipTier;
  meeting_schedule: string;
  is_full: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  author: Profile;
  title?: string;
  content: string;
  category: PostCategory;
  upvotes: number;
  reply_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export type PostCategory =
  | "general"
  | "wealth"
  | "stoicism"
  | "training"
  | "wins"
  | "accountability"
  | "strategy";

export type Pillar =
  | "stoicism"
  | "warrior"
  | "spirituality"
  | "wealth"
  | "sovereignty"
  | "psychology"
  | "physical"
  | "social"
  | "legacy";

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  rarity: "common" | "rare" | "legendary";
}

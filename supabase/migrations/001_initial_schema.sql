-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  membership_tier TEXT NOT NULL DEFAULT 'recruit' CHECK (membership_tier IN ('recruit','soldier','spartan')),
  membership_status TEXT NOT NULL DEFAULT 'inactive' CHECK (membership_status IN ('active','inactive','trialing','canceled')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  country TEXT,
  cell_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Courses (static seeded from curriculum.ts but DB-backed for flexibility)
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  pillar TEXT NOT NULL,
  tier_required TEXT NOT NULL DEFAULT 'recruit',
  order_index INTEGER NOT NULL DEFAULT 0,
  total_lessons INTEGER NOT NULL DEFAULT 0,
  duration_hours NUMERIC NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  latin_quote TEXT,
  latin_translation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  lesson_type TEXT NOT NULL DEFAULT 'text' CHECK (lesson_type IN ('video','text','exercise','assessment','meditation')),
  order_index INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  xp_reward INTEGER NOT NULL DEFAULT 10,
  is_free_preview BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, slug)
);

-- User progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  score INTEGER,
  UNIQUE(user_id, lesson_id)
);

-- Accountability Cells (5-man groups)
CREATE TABLE cells (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  leader_id UUID NOT NULL REFERENCES auth.users(id),
  tier_required TEXT NOT NULL DEFAULT 'soldier',
  meeting_schedule TEXT,
  is_full BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cell_members (
  cell_id UUID NOT NULL REFERENCES cells(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (cell_id, user_id)
);

-- Community posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general','wealth','stoicism','training','wins','accountability','strategy')),
  upvotes INTEGER NOT NULL DEFAULT 0,
  reply_count INTEGER NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE post_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE post_upvotes (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, user_id)
);

-- Daily challenges
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  pillar TEXT,
  active_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE challenge_completions (
  challenge_id UUID NOT NULL REFERENCES daily_challenges(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (challenge_id, user_id)
);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  xp_reward INTEGER NOT NULL DEFAULT 100,
  rarity TEXT NOT NULL DEFAULT 'common' CHECK (rarity IN ('common','rare','legendary'))
);

CREATE TABLE user_achievements (
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (achievement_id, user_id)
);

-- ── RLS Policies ──────────────────────────────────────────────────────────────

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE cells ENABLE ROW LEVEL SECURITY;
ALTER TABLE cell_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_replies ENABLE ROW LEVEL SECURITY;

-- Profiles: readable by all authenticated, writable by owner
CREATE POLICY "profiles_select" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- User progress: owner only
CREATE POLICY "progress_all" ON user_progress FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Posts: authenticated read, owner write
CREATE POLICY "posts_select" ON posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "posts_insert" ON posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_update" ON posts FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "posts_delete" ON posts FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- Post replies
CREATE POLICY "replies_select" ON post_replies FOR SELECT TO authenticated USING (true);
CREATE POLICY "replies_insert" ON post_replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);

-- Cells: soldier+ tier required (enforced in application layer)
CREATE POLICY "cells_select" ON cells FOR SELECT TO authenticated USING (true);
CREATE POLICY "cell_members_select" ON cell_members FOR SELECT TO authenticated USING (true);

-- ── Functions ─────────────────────────────────────────────────────────────────

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE PLPGSQL SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (user_id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Award XP function
CREATE OR REPLACE FUNCTION award_xp(p_user_id UUID, p_amount INTEGER)
RETURNS VOID LANGUAGE PLPGSQL SECURITY DEFINER AS $$
BEGIN
  UPDATE profiles SET xp = xp + p_amount WHERE user_id = p_user_id;
END;
$$;

-- Update streak on daily activity
CREATE OR REPLACE FUNCTION update_streak(p_user_id UUID)
RETURNS VOID LANGUAGE PLPGSQL SECURITY DEFINER AS $$
DECLARE
  last_active_date DATE;
  today DATE := CURRENT_DATE;
BEGIN
  SELECT last_active::DATE INTO last_active_date FROM profiles WHERE user_id = p_user_id;
  IF last_active_date = today - 1 THEN
    UPDATE profiles SET streak_days = streak_days + 1, last_active = NOW() WHERE user_id = p_user_id;
  ELSIF last_active_date < today - 1 THEN
    UPDATE profiles SET streak_days = 1, last_active = NOW() WHERE user_id = p_user_id;
  END IF;
END;
$$;

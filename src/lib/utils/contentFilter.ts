// lib/utils/contentFilter.ts
// Shared filter for usernames and post content

const PROFANITY = [
  "fuck",
  "shit",
  "bitch",
  "cunt",
  "asshole",
  "faggot",
  "nigger",
  "nigga",
  "retard",
  "whore",
  "slut",
  "bastard",
  "dick",
  "cock",
  "pussy",
  "twat",
  "piss",
  "ass",
  "damn",
  "hell",
  "crap",
  "fag",
  "dyke",
  "spic",
  "kike",
  "chink",
  "gook",
  "wop",
  "wetback",
  "motherfucker",
  "fucker",
  "bullshit",
  "jackass",
  "douchebag",
  "prick",
  "wank",
  "wanker",
  "bollocks",
  "arse",
  "arsehole",
  "shite",
  "tosser",
  "git",
  "bellend",
];

const RESERVED = [
  "admin",
  "administrator",
  "root",
  "superuser",
  "moderator",
  "mod",
  "staff",
  "support",
  "help",
  "system",
  "bot",
  "excelsus",
  "theexcelsus",
  "official",
  "team",
  "owner",
  "founder",
  "ceo",
  "god",
  "jesus",
  "allah",
  "satan",
  "null",
  "undefined",
  "test",
  "anonymous",
  "deleted",
  "banned",
];

// Simple Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function normalize(str: string): string {
  return (
    str
      .toLowerCase()
      // leet-speak substitutions
      .replace(/[4@]/g, "a")
      .replace(/[3]/g, "e")
      .replace(/[1!|]/g, "i")
      .replace(/[0]/g, "o")
      .replace(/[5\$]/g, "s")
      .replace(/[7]/g, "t")
      .replace(/[+]/g, "t")
      .replace(/[ck]/g, "k")
      // strip non-alpha
      .replace(/[^a-z]/g, "")
  );
}

export interface FilterResult {
  ok: boolean;
  reason?: string;
}

/**
 * Validate a username — strict: no profanity, no reserved words, length/char rules
 */
export function validateUsername(username: string): FilterResult {
  const trimmed = username.trim();

  if (trimmed.length < 3)
    return { ok: false, reason: "Username must be at least 3 characters." };
  if (trimmed.length > 30)
    return { ok: false, reason: "Username must be 30 characters or fewer." };
  if (!/^[a-zA-Z0-9_.-]+$/.test(trimmed)) {
    return {
      ok: false,
      reason:
        "Username may only contain letters, numbers, underscores, hyphens, and dots.",
    };
  }

  const norm = normalize(trimmed);

  for (const word of RESERVED) {
    if (norm === normalize(word)) {
      return { ok: false, reason: "That username is reserved." };
    }
  }

  for (const word of PROFANITY) {
    const normWord = normalize(word);
    // Exact match or contained
    if (norm.includes(normWord)) {
      return {
        ok: false,
        reason: "That username contains inappropriate content.",
      };
    }
    // Fuzzy match for short words that could be obfuscated versions
    if (normWord.length >= 4 && norm.length <= normWord.length + 2) {
      if (levenshtein(norm, normWord) <= 1) {
        return {
          ok: false,
          reason: "That username contains inappropriate content.",
        };
      }
    }
  }

  return { ok: true };
}

/**
 * Validate post content — looser: catches profanity but allows more
 */
export function validatePostContent(content: string): FilterResult {
  if (!content.trim()) return { ok: false, reason: "Post cannot be empty." };
  if (content.length > 500)
    return { ok: false, reason: "Post cannot exceed 500 characters." };

  const norm = normalize(content);

  for (const word of PROFANITY) {
    const normWord = normalize(word);
    if (normWord.length >= 5 && norm.includes(normWord)) {
      return {
        ok: false,
        reason:
          "Your post contains language that isn't permitted in the brotherhood.",
      };
    }
  }

  return { ok: true };
}

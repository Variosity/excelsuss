export const LEVEL_MILESTONES: Record<
  number,
  { title: string; bonus: string }
> = {
  1: { title: "Initiate", bonus: "Welcome to the forge" },
  3: { title: "Neophyte", bonus: "Unlock workbook prompts" },
  5: { title: "Disciple", bonus: "+10% XP on all lessons" },
  8: { title: "Acolyte", bonus: "Unlock goal tracker advanced mode" },
  10: { title: "Scholar", bonus: "Access to deep philosophy archive" },
  13: { title: "Veteran", bonus: "+15% XP on all lessons" },
  15: { title: "Centurion", bonus: "Unlock cell leadership eligibility" },
  20: { title: "Tribune", bonus: "+20% XP — recognized brother" },
  25: { title: "Praetor", bonus: "Unlock advanced psychology track" },
  30: { title: "Legate", bonus: "+25% XP — elite status" },
  40: { title: "Consul", bonus: "Unlock all bonus content" },
  50: { title: "Imperator", bonus: "Maximum prestige — legend of the forge" },
};

export function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForLevel(level: number): number {
  return (level - 1) * (level - 1) * 100;
}

export function xpForNextLevel(level: number): number {
  return level * level * 100;
}

export function xpProgress(xp: number): number {
  const level = xpToLevel(xp);
  const current = xpForLevel(level);
  const next = xpForNextLevel(level);
  if (next === current) return 100;
  return Math.min(100, ((xp - current) / (next - current)) * 100);
}

export function getLevelTitle(level: number): string {
  const keys = Object.keys(LEVEL_MILESTONES)
    .map(Number)
    .sort((a, b) => b - a);
  for (const key of keys) {
    if (level >= key) return LEVEL_MILESTONES[key].title;
  }
  return "Initiate";
}

export function getXpBonus(level: number): number {
  if (level >= 30) return 25;
  if (level >= 20) return 20;
  if (level >= 13) return 15;
  if (level >= 5) return 10;
  return 0;
}

import type { MembershipTier } from "@/types";

export const TIER_HIERARCHY: Record<MembershipTier, number> = {
  discipulus: 1,
  miles: 2,
  excelsus: 3,
};

export function canAccess(
  userTier: MembershipTier,
  requiredTier: MembershipTier,
): boolean {
  return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[requiredTier];
}

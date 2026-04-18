import { getPlateById } from "@/lib/data/mock-plates";

export type PaymentBlockReason = "sold" | "not_found";

export interface PaymentLineIssue {
  plateId: string;
  reason: PaymentBlockReason;
}

/**
 * Re-check catalog before payment. Does not reserve stock; callers should
 * reject payment if `ok` is false or surface `issues` to the user.
 */
export function validateCartForPayment(plateIds: string[]): {
  ok: boolean;
  issues: PaymentLineIssue[];
} {
  const issues: PaymentLineIssue[] = [];
  const seen = new Set<string>();

  for (const plateId of plateIds) {
    if (seen.has(plateId)) continue;
    seen.add(plateId);

    const plate = getPlateById(plateId);
    if (!plate) {
      issues.push({ plateId, reason: "not_found" });
      continue;
    }
    if (!plate.isAvailable) {
      issues.push({ plateId, reason: "sold" });
    }
  }

  return { ok: issues.length === 0, issues };
}

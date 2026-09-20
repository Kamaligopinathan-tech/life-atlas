import { Receipt, ConnectionScore, ConnectedStoryChain } from "@/types/receipts";

/**
 * Deterministic Client-Side Connection Engine
 * Computes multi-factor relationship scores between any two life receipts
 * without external APIs, machine learning servers, or databases.
 */
export function calculateConnectionStrength(a: Receipt, b: Receipt): ConnectionScore {
  if (a.id === b.id) {
    return {
      targetId: b.id,
      score: 1.0,
      strength: "profound",
      reasons: ["Identical moment"],
      sharedThemes: [a.theme],
      sharedTags: a.tags,
      timeGapHours: 0,
    };
  }

  let totalScore = 0.0;
  const reasons: string[] = [];

  // 1. Explicit Curated Link (+0.50)
  const isExplicitlyLinked =
    a.relatedIds?.includes(b.id) || b.relatedIds?.includes(a.id);
  if (isExplicitlyLinked) {
    totalScore += 0.45;
    reasons.push("Direct narrative thread");
  }

  // 2. Temporal Proximity
  const timeA = new Date(a.timestamp).getTime();
  const timeB = new Date(b.timestamp).getTime();
  const diffMs = Math.abs(timeA - timeB);
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours <= 1.0) {
    const mins = Math.round(diffMs / (1000 * 60));
    totalScore += 0.40;
    reasons.push(`Captured within ${Math.max(1, mins)} minutes of each other`);
  } else if (diffHours <= 4.0) {
    totalScore += 0.30;
    reasons.push(`Occurred during the same ${a.timeOfDay === b.timeOfDay ? a.timeOfDay.replace('_', ' ') : 'time block'} (~${Math.round(diffHours)}h apart)`);
  } else if (a.date === b.date) {
    totalScore += 0.22;
    reasons.push("Occurred on the exact same date");
  } else if (diffHours <= 72.0) {
    totalScore += 0.10;
    reasons.push("Occurred within the same 72-hour window");
  }

  // 3. Spatial Proximity
  if (a.location.name === b.location.name) {
    totalScore += 0.35;
    reasons.push(`Exact location match: ${a.location.name}`);
  } else if (a.location.city === b.location.city && a.location.city !== "Unknown") {
    if (a.location.area && b.location.area && a.location.area === b.location.area) {
      totalScore += 0.22;
      reasons.push(`Shared neighborhood: ${a.location.area}, ${a.location.city}`);
    } else {
      totalScore += 0.12;
      reasons.push(`Shared city: ${a.location.city}`);
    }
  }

  if (a.location.category === b.location.category && a.location.category !== "city") {
    totalScore += 0.06;
  }

  // 4. Shared Tags
  const sharedTags = a.tags.filter((t) => b.tags.includes(t));
  if (sharedTags.length > 0) {
    const tagBonus = Math.min(0.28, sharedTags.length * 0.08);
    totalScore += tagBonus;
    reasons.push(`Shared semantic context: ${sharedTags.slice(0, 3).map((t) => `#${t}`).join(", ")}`);
  }

  // 5. Shared Theme
  const sharedThemes: string[] = [];
  if (a.theme === b.theme) {
    totalScore += 0.18;
    sharedThemes.push(a.theme);
    reasons.push(`Aligned life theme: ${a.theme}`);
  }

  // 6. Cross-Category Causal Affinities
  // Pairs that frequently signify cause & effect in daily life
  const typePair = [a.type, b.type].sort().join("::");
  if (typePair === "music::place" && diffHours <= 6) {
    totalScore += 0.10;
    reasons.push("Soundtrack to movement / place transition");
  } else if (typePair === "photo::place" && diffHours <= 4) {
    totalScore += 0.12;
    reasons.push("Visual documentation of a visited place");
  } else if (typePair === "purchase::search" && diffHours <= 24) {
    totalScore += 0.12;
    reasons.push("Curiosity to transaction bridge");
  } else if (typePair === "event::message" && diffHours <= 12) {
    totalScore += 0.10;
    reasons.push("Social coordination & gathering echo");
  } else if (typePair === "music::note" && (a.timeOfDay === "late_night" || b.timeOfDay === "late_night")) {
    totalScore += 0.12;
    reasons.push("Nocturnal contemplation loop");
  }

  // Normalize to 0.0 - 1.0 range
  const finalScore = Math.min(1.0, Math.round(totalScore * 100) / 100);

  let strength: ConnectionScore["strength"] = "weak";
  if (finalScore >= 0.75) strength = "profound";
  else if (finalScore >= 0.50) strength = "strong";
  else if (finalScore >= 0.25) strength = "moderate";

  return {
    targetId: b.id,
    score: finalScore,
    strength,
    reasons: reasons.length > 0 ? reasons : ["Ambient background correlation"],
    sharedThemes,
    sharedTags,
    timeGapHours: Math.round(diffHours * 10) / 10,
  };
}

/**
 * Returns the highest scoring related receipts for a given receipt
 */
export function getRelatedReceipts(
  receiptId: string,
  allReceipts: Receipt[],
  limit = 6,
  minThreshold = 0.20
): Array<{ receipt: Receipt; connection: ConnectionScore }> {
  const current = allReceipts.find((r) => r.id === receiptId);
  if (!current) return [];

  const results: Array<{ receipt: Receipt; connection: ConnectionScore }> = [];

  for (const item of allReceipts) {
    if (item.id === receiptId) continue;
    const connection = calculateConnectionStrength(current, item);
    if (connection.score >= minThreshold) {
      results.push({ receipt: item, connection });
    }
  }

  return results
    .sort((a, b) => b.connection.score - a.connection.score)
    .slice(0, limit);
}

/**
 * Returns graph edges for visualization based on minimum score threshold
 */
export interface ConnectionEdge {
  id: string;
  source: string;
  target: string;
  score: number;
  strength: 'weak' | 'moderate' | 'strong' | 'profound';
  primaryReason: string;
}

export function getAllConnectionEdges(
  receipts: Receipt[],
  minThreshold = 0.38
): ConnectionEdge[] {
  const edges: ConnectionEdge[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < receipts.length; i++) {
    for (let j = i + 1; j < receipts.length; j++) {
      const a = receipts[i];
      const b = receipts[j];
      const key = `${a.id}--${b.id}`;
      if (visited.has(key)) continue;

      const conn = calculateConnectionStrength(a, b);
      if (conn.score >= minThreshold) {
        visited.add(key);
        edges.push({
          id: key,
          source: a.id,
          target: b.id,
          score: conn.score,
          strength: conn.strength,
          primaryReason: conn.reasons[0] || "Related moments",
        });
      }
    }
  }

  return edges.sort((a, b) => b.score - a.score);
}

/**
 * Finds sequential narrative story chains based on connectivity
 */
export function generateNarrativeChain(
  seedId: string,
  receipts: Receipt[],
  maxLength = 4
): Receipt[] {
  const chain: Receipt[] = [];
  const seed = receipts.find((r) => r.id === seedId);
  if (!seed) return [];

  chain.push(seed);
  const usedIds = new Set<string>([seed.id]);

  let current = seed;
  while (chain.length < maxLength) {
    const related = getRelatedReceipts(current.id, receipts, 10, 0.25)
      .filter((r) => !usedIds.has(r.receipt.id))
      // Prefer different categories for rich storytelling
      .sort((a, b) => {
        const catBonusA = a.receipt.type !== current.type ? 0.2 : 0;
        const catBonusB = b.receipt.type !== current.type ? 0.2 : 0;
        return (b.connection.score + catBonusB) - (a.connection.score + catBonusA);
      });

    if (related.length === 0) break;
    const nextReceipt = related[0].receipt;
    chain.push(nextReceipt);
    usedIds.add(nextReceipt.id);
    current = nextReceipt;
  }

  return chain;
}

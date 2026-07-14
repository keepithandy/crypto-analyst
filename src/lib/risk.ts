import type { CryptoAsset, DecisionLabel, Scenario } from "../types";

export type RiskDecision = {
  label: DecisionLabel;
  score: number;
  reasons: string[];
};

export type ConfluenceBand = "strong" | "moderate" | "weak" | "poor";
export type RiskRewardStatus = "preferred" | "acceptable" | "weak";
export type ScenarioProbabilityStatus = "valid" | "invalid";

const preferredRiskRewardRatio = 2;
const minimumRiskRewardRatio = 1.5;

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 10 ? 2 : 0,
  }).format(value);
}

export function formatCompactUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function getScenarioProbabilityTotal(scenarios: Scenario[]): number {
  return scenarios.reduce((total, scenario) => total + scenario.probabilityPct, 0);
}

export function validateScenarioProbabilities(scenarios: Scenario[]): boolean {
  return getScenarioProbabilityTotal(scenarios) === 100;
}

export function getScenarioProbabilityStatus(
  scenarios: Scenario[],
): ScenarioProbabilityStatus {
  return validateScenarioProbabilities(scenarios) ? "valid" : "invalid";
}

export function getConfluenceBand(score: number): ConfluenceBand {
  if (score >= 80) {
    return "strong";
  }

  if (score >= 65) {
    return "moderate";
  }

  if (score >= 55) {
    return "weak";
  }

  return "poor";
}

export function meetsRiskRewardThreshold(
  riskRewardRatio: number,
  threshold = preferredRiskRewardRatio,
): boolean {
  return riskRewardRatio >= threshold;
}

export function getRiskRewardStatus(riskRewardRatio: number): RiskRewardStatus {
  if (riskRewardRatio >= preferredRiskRewardRatio) {
    return "preferred";
  }

  if (riskRewardRatio >= minimumRiskRewardRatio) {
    return "acceptable";
  }

  return "weak";
}

function hasDefinedInvalidation(asset: CryptoAsset): boolean {
  return Number.isFinite(asset.invalidationLevel) && asset.invalidationLevel > 0;
}

export function isAssetDataStale(asset: CryptoAsset): boolean {
  const normalizedUpdatedAt = asset.lastUpdated.toLowerCase();

  return (
    normalizedUpdatedAt.includes("mock") ||
    normalizedUpdatedAt.includes("stale") ||
    normalizedUpdatedAt.trim().length === 0
  );
}

function isMockDataFresh(asset: CryptoAsset): boolean {
  return asset.lastUpdated.toLowerCase().includes("mock") && asset.lastUpdated.trim().length > 0;
}

export function getSuggestedDecisionLabel(asset: CryptoAsset): DecisionLabel {
  return computeRiskDecision(asset).label;
}

export function hasConflictingSignals(asset: CryptoAsset): boolean {
  const suggestedLabel = getSuggestedDecisionLabel(asset);

  return asset.decisionLabel !== suggestedLabel || getRiskRewardStatus(asset.riskRewardRatio) === "weak";
}

export function computeRiskDecision(asset: CryptoAsset): RiskDecision {
  const reasons: string[] = [];
  let score = 0;

  if (!hasDefinedInvalidation(asset)) {
    return {
      label: "FLAT",
      score: 0,
      reasons: ["No defined invalidation level; risk cannot be framed."],
    };
  }

  if (!validateScenarioProbabilities(asset.scenarios)) {
    return {
      label: "WATCH",
      score: 0,
      reasons: ["Scenario probabilities do not add up to 100%, so the setup needs review."],
    };
  }

  const confluenceBand = getConfluenceBand(asset.confluenceScore);

  if (confluenceBand === "strong") {
    score += 3;
    reasons.push("Strong confluence score.");
  } else if (confluenceBand === "moderate") {
    score += 2;
    reasons.push("Moderate confluence score.");
  } else if (confluenceBand === "weak") {
    score += 1;
    reasons.push("Weak-to-moderate confluence score.");
  } else {
    reasons.push("Confluence is too weak for an active setup.");
  }

  const riskRewardStatus = getRiskRewardStatus(asset.riskRewardRatio);

  if (riskRewardStatus === "preferred") {
    score += 2;
    reasons.push("Risk/reward is at least 1:2.");
  } else if (riskRewardStatus === "acceptable") {
    score += 1;
    reasons.push("Risk/reward is acceptable but not ideal.");
  } else {
    reasons.push("Risk/reward is below the preferred threshold.");
  }

  if (asset.conviction === "High") {
    score += 2;
    reasons.push("Conviction is high.");
  } else if (asset.conviction === "Medium") {
    score += 1;
    reasons.push("Conviction is medium.");
  } else {
    reasons.push("Conviction is low.");
  }

  if (!isMockDataFresh(asset)) {
    reasons.push("Data freshness is unclear, so the setup should not be treated as active.");
    return { label: "FLAT", score, reasons };
  }

  if (riskRewardStatus === "weak") {
    reasons.push("Weak risk/reward forces WATCH or FLAT instead of an active label.");
    return { label: score >= 4 ? "WATCH" : "FLAT", score, reasons };
  }

  if (score >= 6 && asset.trendLabel === "Uptrend") {
    return { label: "LONG", score, reasons };
  }

  if (score >= 6 && asset.trendLabel === "Downtrend") {
    return { label: "SHORT", score, reasons };
  }

  if (score >= 4) {
    return { label: "WATCH", score, reasons };
  }

  return { label: "FLAT", score, reasons };
}

export function getDecisionReason(asset: CryptoAsset): string {
  if (asset.passReason) {
    return asset.passReason;
  }

  if (asset.decisionLabel === "LONG") {
    return "Bullish setup has defined invalidation, acceptable reward, and enough confluence to keep on the active list.";
  }

  if (asset.decisionLabel === "SHORT") {
    return "Bearish setup has defined invalidation, acceptable reward, and enough confluence to keep on the active list.";
  }

  if (asset.decisionLabel === "WATCH") {
    return "Setup is interesting, but confirmation is still required before treating it as actionable.";
  }

  return "No-trade state: risk is unclear, reward is weak, or the setup does not meet the framework.";
}

export function getDecisionTone(label: DecisionLabel): "active" | "watch" | "flat" {
  if (label === "LONG" || label === "SHORT") {
    return "active";
  }

  if (label === "WATCH") {
    return "watch";
  }

  return "flat";
}

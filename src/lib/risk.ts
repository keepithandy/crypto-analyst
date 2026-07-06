import type { CryptoAsset, DecisionLabel, Scenario } from "../types";

export type RiskDecision = {
  label: DecisionLabel;
  score: number;
  reasons: string[];
};

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

export function validateScenarioProbabilities(scenarios: Scenario[]): boolean {
  return scenarios.reduce((total, scenario) => total + scenario.probabilityPct, 0) === 100;
}

function hasDefinedInvalidation(asset: CryptoAsset): boolean {
  return Number.isFinite(asset.invalidationLevel) && asset.invalidationLevel > 0;
}

function isMockDataFresh(asset: CryptoAsset): boolean {
  return asset.lastUpdated.toLowerCase().includes("mock") && asset.lastUpdated.trim().length > 0;
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

  if (asset.confluenceScore >= 80) {
    score += 3;
    reasons.push("Strong confluence score.");
  } else if (asset.confluenceScore >= 65) {
    score += 2;
    reasons.push("Moderate confluence score.");
  } else if (asset.confluenceScore >= 55) {
    score += 1;
    reasons.push("Weak-to-moderate confluence score.");
  } else {
    reasons.push("Confluence is too weak for an active setup.");
  }

  if (asset.riskRewardRatio >= 2) {
    score += 2;
    reasons.push("Risk/reward is at least 1:2.");
  } else if (asset.riskRewardRatio >= 1.5) {
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

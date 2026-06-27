import type { CryptoAsset, DecisionLabel, Scenario } from "../types";

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

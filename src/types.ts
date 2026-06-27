export type DecisionLabel = "LONG" | "SHORT" | "WATCH" | "FLAT";
export type TrendLabel = "Uptrend" | "Downtrend" | "Range" | "Mixed";
export type ConvictionLevel = "Low" | "Medium" | "High";
export type ScenarioName = "Bull" | "Base" | "Bear";

export type Scenario = {
  name: ScenarioName;
  probabilityPct: number;
  targetPrice: number;
  catalyst: string;
  invalidation: string;
};

export type CryptoAsset = {
  symbol: string;
  name: string;
  priceUsd: number;
  change24hPct: number;
  volume24hUsd: number;
  marketCapRank: number;
  trendLabel: TrendLabel;
  decisionLabel: DecisionLabel;
  lastUpdated: string;
  invalidationLevel: number;
  targetLevel: number;
  riskRewardRatio: number;
  confluenceScore: number;
  conviction: ConvictionLevel;
  technicalSummary: string;
  onChainSummary: string;
  derivativesSummary: string;
  macroSummary: string;
  mainRisk: string;
  passReason?: string;
  confirmations: string[];
  scenarios: Scenario[];
};

export type DashboardMode = "mock" | "live-research";

import { computeRiskDecision, formatUsd, getDecisionReason } from "../lib/risk";
import type { CryptoAsset } from "../types";
import { AnalysisLayer } from "./AnalysisLayer";
import { DataFreshnessBadge } from "./DataFreshnessBadge";
import { DecisionBadge } from "./DecisionBadge";
import { Metric } from "./Metric";
import { RiskPanel } from "./RiskPanel";

type AssetDetailProps = {
  asset: CryptoAsset;
};

export function AssetDetail({ asset }: AssetDetailProps) {
  const computedDecision = computeRiskDecision(asset);

  return (
    <section className="panel detail-panel" aria-labelledby="asset-detail-heading">
      <div className="panel-heading split-heading">
        <div>
          <p className="eyebrow">Asset detail</p>
          <h2 id="asset-detail-heading">
            {asset.name} <span>{asset.symbol}</span>
          </h2>
        </div>
        <DecisionBadge label={computedDecision.label} />
      </div>

      <div className="risk-hero">
        <div>
          <span>Price</span>
          <strong>{formatUsd(asset.priceUsd)}</strong>
        </div>
        <div>
          <span>Confluence</span>
          <strong>{asset.confluenceScore}/100</strong>
        </div>
        <div>
          <span>R:R</span>
          <strong>1:{asset.riskRewardRatio.toFixed(1)}</strong>
        </div>
        <div>
          <span>Risk score</span>
          <strong>{computedDecision.score}/7</strong>
        </div>
      </div>

      <div className="decision-note">
        <strong>Decision reason</strong>
        <p>{getDecisionReason({ ...asset, decisionLabel: computedDecision.label })}</p>
      </div>

      <div className="decision-note">
        <strong>Risk engine explanation</strong>
        <ul>
          {computedDecision.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>

      <div className="level-grid">
        <Metric label="Trend" value={asset.trendLabel} />
        <Metric label="Invalidation" value={formatUsd(asset.invalidationLevel)} />
        <Metric label="Target" value={formatUsd(asset.targetLevel)} />
        <DataFreshnessBadge updatedAt={asset.lastUpdated} />
      </div>

      <section className="analysis-stack" aria-label="Analysis layers">
        <AnalysisLayer title="Technical" body={asset.technicalSummary} />
        <AnalysisLayer title="On-chain" body={asset.onChainSummary} />
        <AnalysisLayer title="Derivatives" body={asset.derivativesSummary} />
        <AnalysisLayer title="Macro" body={asset.macroSummary} />
      </section>

      <RiskPanel asset={{ ...asset, decisionLabel: computedDecision.label }} />
    </section>
  );
}

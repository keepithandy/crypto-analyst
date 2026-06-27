import { useMemo, useState } from "react";
import { mockAssets } from "./data/mockAssets";
import {
  formatCompactUsd,
  formatPercent,
  formatUsd,
  getDecisionReason,
  getDecisionTone,
  validateScenarioProbabilities,
} from "./lib/risk";
import type { CryptoAsset, DecisionLabel } from "./types";

const labelOrder: DecisionLabel[] = ["LONG", "SHORT", "WATCH", "FLAT"];

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(mockAssets[0].symbol);
  const selectedAsset = useMemo(
    () => mockAssets.find((asset) => asset.symbol === selectedSymbol) ?? mockAssets[0],
    [selectedSymbol],
  );

  const dashboardCounts = labelOrder.map((label) => ({
    label,
    count: mockAssets.filter((asset) => asset.decisionLabel === label).length,
  }));

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">NovaDeck Analyst · mock v0.1</p>
          <h1>Read-only crypto risk dashboard</h1>
          <p className="hero-copy">
            Scenario-based market review for invalidation levels, confluence scoring,
            risk/reward, and LONG / SHORT / WATCH / FLAT trade-readiness labels.
          </p>
        </div>

        <div className="safety-card" aria-label="Safety rules">
          <span>Read-only mode</span>
          <strong>No trade execution. No wallet keys. Mock data first.</strong>
        </div>
      </section>

      <section className="summary-grid" aria-label="Dashboard label summary">
        {dashboardCounts.map((item) => (
          <article className="summary-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.count}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <section className="panel watchlist-panel" aria-labelledby="watchlist-heading">
          <div className="panel-heading">
            <p className="eyebrow">Market overview</p>
            <h2 id="watchlist-heading">Watchlist</h2>
          </div>

          <div className="asset-list">
            {mockAssets.map((asset) => (
              <button
                className={`asset-card ${asset.symbol === selectedAsset.symbol ? "selected" : ""}`}
                key={asset.symbol}
                onClick={() => setSelectedSymbol(asset.symbol)}
                type="button"
              >
                <span className="asset-card-topline">
                  <strong>{asset.symbol}</strong>
                  <DecisionBadge label={asset.decisionLabel} />
                </span>
                <span className="asset-name">{asset.name}</span>
                <span className="asset-metrics">
                  <span>{formatUsd(asset.priceUsd)}</span>
                  <span className={asset.change24hPct >= 0 ? "positive" : "negative"}>
                    {formatPercent(asset.change24hPct)}
                  </span>
                </span>
                <span className="asset-footnote">
                  Rank #{asset.marketCapRank} · Vol {formatCompactUsd(asset.volume24hUsd)}
                </span>
              </button>
            ))}
          </div>
        </section>

        <AssetDetail asset={selectedAsset} />
      </section>
    </main>
  );
}

function DecisionBadge({ label }: { label: DecisionLabel }) {
  return <span className={`decision-badge ${getDecisionTone(label)}`}>{label}</span>;
}

function AssetDetail({ asset }: { asset: CryptoAsset }) {
  const probabilitiesValid = validateScenarioProbabilities(asset.scenarios);

  return (
    <section className="panel detail-panel" aria-labelledby="asset-detail-heading">
      <div className="panel-heading split-heading">
        <div>
          <p className="eyebrow">Asset detail</p>
          <h2 id="asset-detail-heading">
            {asset.name} <span>{asset.symbol}</span>
          </h2>
        </div>
        <DecisionBadge label={asset.decisionLabel} />
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
          <span>Conviction</span>
          <strong>{asset.conviction}</strong>
        </div>
      </div>

      <div className="decision-note">
        <strong>Decision reason</strong>
        <p>{getDecisionReason(asset)}</p>
      </div>

      <div className="level-grid">
        <Metric label="Trend" value={asset.trendLabel} />
        <Metric label="Invalidation" value={formatUsd(asset.invalidationLevel)} />
        <Metric label="Target" value={formatUsd(asset.targetLevel)} />
        <Metric label="Updated" value={asset.lastUpdated} />
      </div>

      <section className="analysis-stack" aria-label="Analysis layers">
        <AnalysisLayer title="Technical" body={asset.technicalSummary} />
        <AnalysisLayer title="On-chain" body={asset.onChainSummary} />
        <AnalysisLayer title="Derivatives" body={asset.derivativesSummary} />
        <AnalysisLayer title="Macro" body={asset.macroSummary} />
      </section>

      <section className="scenario-section" aria-labelledby="scenario-heading">
        <div className="panel-heading split-heading compact">
          <div>
            <p className="eyebrow">Risk model</p>
            <h3 id="scenario-heading">Bull / base / bear scenarios</h3>
          </div>
          <span className={`probability-check ${probabilitiesValid ? "valid" : "invalid"}`}>
            {probabilitiesValid ? "100% total" : "Check probabilities"}
          </span>
        </div>

        <div className="scenario-list">
          {asset.scenarios.map((scenario) => (
            <article className="scenario-card" key={scenario.name}>
              <span className="scenario-topline">
                <strong>{scenario.name}</strong>
                <span>{scenario.probabilityPct}%</span>
              </span>
              <p>{scenario.catalyst}</p>
              <small>Target: {formatUsd(scenario.targetPrice)}</small>
              <small>Invalidation: {scenario.invalidation}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="confirmation-section" aria-labelledby="confirmation-heading">
        <h3 id="confirmation-heading">Required confirmations</h3>
        <ul>
          {asset.confirmations.map((confirmation) => (
            <li key={confirmation}>{confirmation}</li>
          ))}
        </ul>
        <p className="risk-warning">Main risk: {asset.mainRisk}</p>
      </section>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AnalysisLayer({ title, body }: { title: string; body: string }) {
  return (
    <article className="analysis-card">
      <strong>{title}</strong>
      <p>{body}</p>
    </article>
  );
}

export default App;

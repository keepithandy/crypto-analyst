import { useMemo, useState } from "react";
import { AssetDetail } from "./components/AssetDetail";
import { MarketCard } from "./components/MarketCard";
import { mockAssets } from "./data/mockAssets";
import type { DecisionLabel } from "./types";

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
              <MarketCard
                asset={asset}
                key={asset.symbol}
                onSelect={setSelectedSymbol}
                selected={asset.symbol === selectedAsset.symbol}
              />
            ))}
          </div>
        </section>

        <AssetDetail asset={selectedAsset} />
      </section>
    </main>
  );
}

export default App;

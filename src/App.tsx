import { useEffect, useMemo, useState } from "react";
import { AssetDetail } from "./components/AssetDetail";
import { MarketCard } from "./components/MarketCard";
import { SettingsPanel } from "./components/SettingsPanel";
import { StateNotice } from "./components/StateNotice";
import { mockAssets } from "./data/mockAssets";
import { isAssetDataStale } from "./lib/risk";
import type { DashboardSettings, DecisionLabel } from "./types";

const labelOrder: DecisionLabel[] = ["LONG", "SHORT", "WATCH", "FLAT"];
const settingsStorageKey = "crypto-analyst-dashboard-settings";

const defaultSettings: DashboardSettings = {
  dashboardMode: "mock",
  refreshIntervalMinutes: 15,
  darkMode: true,
  freshnessPreference: "flag-stale",
  showEmptyWatchlist: false,
  showConflictState: false,
  showStaleState: true,
};

function readStoredSettings(): DashboardSettings {
  try {
    const stored = window.localStorage.getItem(settingsStorageKey);

    if (!stored) {
      return defaultSettings;
    }

    return {
      ...defaultSettings,
      ...JSON.parse(stored),
      dashboardMode: "mock",
      darkMode: true,
    };
  } catch {
    return defaultSettings;
  }
}

function getVisibleAssets(settings: DashboardSettings) {
  if (settings.showEmptyWatchlist) {
    return [];
  }

  if (settings.freshnessPreference === "hide-stale") {
    return mockAssets.filter((asset) => !isAssetDataStale(asset));
  }

  return mockAssets;
}

function App() {
  const [settings, setSettings] = useState<DashboardSettings>(readStoredSettings);
  const visibleAssets = useMemo(() => getVisibleAssets(settings), [settings]);
  const [selectedSymbol, setSelectedSymbol] = useState(visibleAssets[0]?.symbol ?? "");

  useEffect(() => {
    window.localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (visibleAssets.length === 0) {
      setSelectedSymbol("");
      return;
    }

    if (!visibleAssets.some((asset) => asset.symbol === selectedSymbol)) {
      setSelectedSymbol(visibleAssets[0].symbol);
    }
  }, [selectedSymbol, visibleAssets]);

  const selectedAsset = useMemo(
    () => visibleAssets.find((asset) => asset.symbol === selectedSymbol) ?? visibleAssets[0],
    [selectedSymbol, visibleAssets],
  );

  const dashboardCounts = labelOrder.map((label) => ({
    label,
    count: visibleAssets.filter((asset) => asset.decisionLabel === label).length,
  }));

  const staleAssets = mockAssets.filter(isAssetDataStale);
  const hasConflictingSignals = settings.showConflictState;
  const showStaleState = settings.showStaleState && staleAssets.length > 0;

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

      <section className="state-stack" aria-label="Dashboard state messages">
        <StateNotice
          tone="mock"
          title="Mock mode active"
          body={`Data is local fixture data only. Refresh interval is displayed as ${settings.refreshIntervalMinutes} minutes, but no live API polling is active.`}
        />

        {showStaleState ? (
          <StateNotice
            tone="warning"
            title="Stale mock data flagged"
            body={`${staleAssets.length} asset${staleAssets.length === 1 ? "" : "s"} are marked as mock snapshots. Treat every label as a framework preview, not a live market call.`}
          />
        ) : null}

        {hasConflictingSignals ? (
          <StateNotice
            tone="conflict"
            title="Conflicting signal demo"
            body="Conflict state is enabled so the dashboard can show what happens when trend, confluence, risk/reward, or freshness disagree."
          />
        ) : null}
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

          {visibleAssets.length > 0 ? (
            <div className="asset-list">
              {visibleAssets.map((asset) => (
                <MarketCard
                  asset={asset}
                  key={asset.symbol}
                  onSelect={setSelectedSymbol}
                  selected={asset.symbol === selectedAsset?.symbol}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>Empty watchlist</strong>
              <p>
                No mock assets are visible with the current local settings. Reset the mock
                selection to bring BTC, ETH, SOL, and XRP back.
              </p>
            </div>
          )}
        </section>

        {selectedAsset ? (
          <AssetDetail asset={selectedAsset} conflictMode={hasConflictingSignals} />
        ) : (
          <StateNotice
            tone="flat"
            title="No asset selected"
            body="Select a mock asset or reset the local dashboard state to review a risk panel."
          />
        )}

        <SettingsPanel
          settings={settings}
          onChange={setSettings}
          onReset={() => setSettings(defaultSettings)}
        />
      </section>
    </main>
  );
}

export default App;

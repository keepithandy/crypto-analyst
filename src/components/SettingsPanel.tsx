import type { DashboardSettings, DataFreshnessPreference } from "../types";

type SettingsPanelProps = {
  settings: DashboardSettings;
  onChange: (settings: DashboardSettings) => void;
  onReset: () => void;
};

const freshnessOptions: Array<{
  value: DataFreshnessPreference;
  label: string;
}> = [
  { value: "show-all", label: "Show all mock assets" },
  { value: "flag-stale", label: "Flag stale mock assets" },
  { value: "hide-stale", label: "Hide stale mock assets" },
];

export function SettingsPanel({ settings, onChange, onReset }: SettingsPanelProps) {
  return (
    <section className="panel settings-panel" aria-labelledby="settings-heading">
      <div className="panel-heading">
        <p className="eyebrow">Local settings</p>
        <h2 id="settings-heading">Mock controls</h2>
      </div>

      <div className="settings-grid">
        <label className="setting-row">
          <span>Dashboard mode</span>
          <strong>Mock only</strong>
        </label>

        <label className="setting-row">
          <span>Refresh interval display</span>
          <select
            value={settings.refreshIntervalMinutes}
            onChange={(event) =>
              onChange({
                ...settings,
                refreshIntervalMinutes: Number(event.target.value),
              })
            }
          >
            <option value={5}>5 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </label>

        <label className="setting-row">
          <span>Data freshness handling</span>
          <select
            value={settings.freshnessPreference}
            onChange={(event) =>
              onChange({
                ...settings,
                freshnessPreference: event.target.value as DataFreshnessPreference,
              })
            }
          >
            {freshnessOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="check-row">
          <input
            type="checkbox"
            checked={settings.showStaleState}
            onChange={(event) =>
              onChange({ ...settings, showStaleState: event.target.checked })
            }
          />
          Show stale-data state
        </label>

        <label className="check-row">
          <input
            type="checkbox"
            checked={settings.showConflictState}
            onChange={(event) =>
              onChange({ ...settings, showConflictState: event.target.checked })
            }
          />
          Show conflicting-signal state
        </label>

        <label className="check-row">
          <input
            type="checkbox"
            checked={settings.showEmptyWatchlist}
            onChange={(event) =>
              onChange({ ...settings, showEmptyWatchlist: event.target.checked })
            }
          />
          Simulate empty watchlist
        </label>
      </div>

      <button className="secondary-button" type="button" onClick={onReset}>
        Reset mock state
      </button>

      <p className="settings-footnote">
        These settings stay in localStorage only. No API keys, wallet keys, or exchange
        credentials are stored.
      </p>
    </section>
  );
}

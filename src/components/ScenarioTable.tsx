import { formatUsd } from "../lib/risk";
import type { Scenario } from "../types";

type ScenarioTableProps = {
  scenarios: Scenario[];
};

export function ScenarioTable({ scenarios }: ScenarioTableProps) {
  return (
    <div className="scenario-list">
      {scenarios.map((scenario) => (
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
  );
}

import { validateScenarioProbabilities } from "../lib/risk";
import type { CryptoAsset } from "../types";
import { ScenarioTable } from "./ScenarioTable";

type RiskPanelProps = {
  asset: CryptoAsset;
};

export function RiskPanel({ asset }: RiskPanelProps) {
  const probabilitiesValid = validateScenarioProbabilities(asset.scenarios);

  return (
    <>
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

        <ScenarioTable scenarios={asset.scenarios} />
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
    </>
  );
}

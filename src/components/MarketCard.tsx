import { formatCompactUsd, formatPercent, formatUsd } from "../lib/risk";
import type { CryptoAsset } from "../types";
import { DecisionBadge } from "./DecisionBadge";

type MarketCardProps = {
  asset: CryptoAsset;
  selected: boolean;
  onSelect: (symbol: string) => void;
};

export function MarketCard({ asset, selected, onSelect }: MarketCardProps) {
  return (
    <button
      className={`asset-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(asset.symbol)}
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
  );
}

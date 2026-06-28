import { getDecisionTone } from "../lib/risk";
import type { DecisionLabel } from "../types";

type DecisionBadgeProps = {
  label: DecisionLabel;
};

export function DecisionBadge({ label }: DecisionBadgeProps) {
  return <span className={`decision-badge ${getDecisionTone(label)}`}>{label}</span>;
}

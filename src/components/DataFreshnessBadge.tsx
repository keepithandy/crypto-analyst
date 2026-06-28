import { Metric } from "./Metric";

type DataFreshnessBadgeProps = {
  updatedAt: string;
};

export function DataFreshnessBadge({ updatedAt }: DataFreshnessBadgeProps) {
  return <Metric label="Updated" value={updatedAt} />;
}

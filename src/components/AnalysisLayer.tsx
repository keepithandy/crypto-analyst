type AnalysisLayerProps = {
  title: string;
  body: string;
};

export function AnalysisLayer({ title, body }: AnalysisLayerProps) {
  return (
    <article className="analysis-card">
      <strong>{title}</strong>
      <p>{body}</p>
    </article>
  );
}

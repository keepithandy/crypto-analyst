type StateNoticeTone = "mock" | "warning" | "conflict" | "flat";

type StateNoticeProps = {
  title: string;
  body: string;
  tone?: StateNoticeTone;
};

export function StateNotice({ title, body, tone = "mock" }: StateNoticeProps) {
  return (
    <aside className={`state-notice ${tone}`} role="status">
      <strong>{title}</strong>
      <p>{body}</p>
    </aside>
  );
}

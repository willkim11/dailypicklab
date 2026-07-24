type GuideBylineProps = {
  published: string;
  modified: string;
  reviewNote?: string;
};

function formatKoreanDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

export default function GuideByline({
  published,
  modified,
  reviewNote = "본문의 수치와 외부 자료 링크를 다시 확인했습니다.",
}: GuideBylineProps) {
  return (
    <div
      className="mt-5 border-y py-4 text-sm"
      style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
    >
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        <span><strong style={{ color: "var(--color-text)" }}>작성</strong> Daily Pick Lab 편집팀</span>
        <span><strong style={{ color: "var(--color-text)" }}>최초 게시</strong> <time dateTime={published}>{formatKoreanDate(published)}</time></span>
        <span><strong style={{ color: "var(--color-text)" }}>최근 검토</strong> <time dateTime={modified}>{formatKoreanDate(modified)}</time></span>
      </div>
      <p className="mt-2 text-xs leading-relaxed">검토 기준: {reviewNote}</p>
    </div>
  );
}

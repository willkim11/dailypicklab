import Link from "next/link";

const ALL_TOOLS = [
  { href: "/lotto", label: "로또 번호 추첨기" },
  { href: "/personality", label: "성격 유형 테스트" },
  { href: "/reaction", label: "반응속도 테스트" },
  { href: "/pomodoro", label: "뽀모도로 타이머" },
  { href: "/password", label: "비밀번호 생성기" },
];

export default function OtherToolsNav({ currentHref }: { currentHref: string }) {
  const others = ALL_TOOLS.filter((t) => t.href !== currentHref);

  return (
    <nav className="mt-12 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
      <p className="mb-3 text-sm font-semibold" style={{ color: "var(--color-text-soft)" }}>
        다른 도구 사용해보기
      </p>
      <div className="flex flex-wrap gap-2">
        {others.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-md border px-3 py-2 text-sm font-medium transition-colors"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

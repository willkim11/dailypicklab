import Link from "next/link";

const ALL_TOOLS = [
  { href: "/lotto", label: "🎱 로또 번호 추첨기" },
  { href: "/personality", label: "🧠 성격 유형 테스트" },
  { href: "/reaction", label: "⚡ 반응속도 테스트" },
  { href: "/pomodoro", label: "🍅 뽀모도로 타이머" },
  { href: "/password", label: "🔐 비밀번호 생성기" },
];

export default function OtherToolsNav({ currentHref }: { currentHref: string }) {
  const others = ALL_TOOLS.filter((t) => t.href !== currentHref);
  return (
    <nav className="mt-10 pt-8 border-t" style={{ borderColor: "var(--color-border)" }}>
      <p className="text-sm font-medium mb-3" style={{ color: "var(--color-text-muted)" }}>다른 도구 사용해보기</p>
      <div className="flex flex-wrap gap-2">
        {others.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="px-3 py-1.5 text-sm rounded-full border transition-colors hover:border-blue-400"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

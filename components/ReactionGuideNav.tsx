import Link from "next/link";

const links = [
  { href: "/guides/reaction-speed", label: "전체 가이드" },
  { href: "/guides/reaction-test-accuracy", label: "정확도 높이기" },
  { href: "/guides/reaction-device-latency", label: "기기 지연 이해" },
  { href: "/guides/reaction-training-log", label: "훈련 기록법" },
];

export default function ReactionGuideNav({ currentPath }: { currentPath: string }) {
  return (
    <aside className="mt-12 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
      <h2 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>반응속도 측정 시리즈</h2>
      <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
        기록의 숫자보다 측정 조건과 변화 추이를 함께 확인하세요.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.filter((link) => link.href !== currentPath).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md border px-4 py-3 text-sm font-medium hover:underline"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            {link.label} →
          </Link>
        ))}
      </div>
      <Link
        href="/reaction"
        className="mt-4 inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold"
        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
      >
        반응속도 테스트 실행
      </Link>
    </aside>
  );
}

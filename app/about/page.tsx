import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Daily Pick Lab 소개",
  description: "Daily Pick Lab은 한국 사용자를 위한 무료 온라인 도구 모음 사이트입니다.",
};

const tools = [
  { href: "/lotto", icon: "🎱", name: "로또 번호 추첨기", desc: "1~45 중 6개 번호 무작위 추첨" },
  { href: "/personality", icon: "🧠", name: "성격 유형 테스트", desc: "16가지 성격 유형 무료 검사" },
  { href: "/reaction", icon: "⚡", name: "반응속도 테스트", desc: "ms 단위 반응속도 정밀 측정" },
  { href: "/pomodoro", icon: "🍅", name: "뽀모도로 타이머", desc: "25분 집중 / 5분 휴식 타이머" },
  { href: "/password", icon: "🔐", name: "비밀번호 생성기", desc: "안전한 무작위 비밀번호 생성" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        Daily Pick Lab 소개
      </h1>
      <p className="text-lg mb-10" style={{ color: "var(--color-text-muted)" }}>
        매일 한 번쯤 써보게 되는 작은 도구들을 모았습니다.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          제공 도구
        </h2>
        <div className="space-y-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-sm"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
            >
              <span className="text-2xl">{t.icon}</span>
              <div>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>{t.name}</p>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          만든 이유
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          로또 번호 뽑으려고 검색하면 광고투성이 사이트만 나오고, 성격 테스트는 회원가입을
          요구하고, 타이머 앱은 무거운 앱을 설치해야 합니다. Daily Pick Lab은 광고 없이
          (현재), 설치 없이, 로그인 없이 바로 쓸 수 있는 도구들을 모은 사이트입니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          기술 스택
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          Next.js, TypeScript, Tailwind CSS로 만들어졌으며 Vercel에 배포됩니다.
          모든 계산은 브라우저에서 처리되어 개인정보를 수집하지 않습니다.
        </p>
      </section>
    </div>
  );
}

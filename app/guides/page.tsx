import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "가이드 — 유용한 정보 모음",
  description:
    "로또 당첨 전략, 뽀모도로 공부법, 비밀번호 보안, 성격 유형 분석, 반응속도 향상법 등 실생활에 도움되는 가이드 모음.",
};

const guides = [
  {
    href: "/guides/lotto-winning-tips",
    emoji: "🎱",
    title: "로또 번호 고르는 방법 완전 가이드",
    desc: "자동과 수동 중 어느 쪽이 유리할까? 당첨 확률을 높이는 전략과 번호 선택의 심리학.",
    tag: "로또",
  },
  {
    href: "/guides/pomodoro-study",
    emoji: "🍅",
    title: "뽀모도로 기법으로 공부 효율 2배 높이기",
    desc: "수능부터 자격증까지, 뽀모도로 기법으로 집중력을 극대화하는 실전 공부법.",
    tag: "생산성",
  },
  {
    href: "/guides/password-security",
    emoji: "🔐",
    title: "2025년 비밀번호 보안 완전 가이드",
    desc: "해킹을 막는 강력한 비밀번호 만들기부터 비밀번호 관리 앱 활용법까지.",
    tag: "보안",
  },
  {
    href: "/guides/mbti-types",
    emoji: "🧠",
    title: "16가지 성격 유형 완전 분석",
    desc: "MBTI 4가지 축의 의미와 16가지 유형의 특징, 직업, 인간관계 패턴을 한 번에 정리.",
    tag: "성격",
  },
  {
    href: "/guides/reaction-speed",
    emoji: "⚡",
    title: "반응속도를 높이는 과학적 방법",
    desc: "뇌과학이 밝혀낸 반응속도의 비밀과 게이머·운동선수처럼 빠르게 반응하는 훈련법.",
    tag: "건강",
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
        가이드
      </h1>
      <p className="mt-2 text-lg" style={{ color: "var(--color-text-muted)" }}>
        Daily Pick Lab 도구와 함께 읽으면 더 유익한 정보 모음입니다.
      </p>

      <div className="mt-10 space-y-4">
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="flex gap-5 p-6 rounded-xl border transition-all hover:shadow-md"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
          >
            <span className="text-3xl shrink-0">{g.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: "var(--color-primary)", color: "white" }}
                >
                  {g.tag}
                </span>
              </div>
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>{g.title}</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{g.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";

export const metadata: Metadata = {
  title: "Daily Pick Lab — 생활에 바로 쓰는 무료 가이드와 도구",
  description:
    "비밀번호 보안, 집중 루틴, 반응속도, 성격 유형, 확률 이해까지 생활에 바로 쓰는 무료 가이드와 브라우저 도구 모음.",
};

const tools = [
  {
    href: "/password",
    icon: "🔐",
    title: "비밀번호 생성기",
    description: "브라우저에서만 동작하는 안전한 무작위 비밀번호 생성기와 보안 가이드.",
  },
  {
    href: "/pomodoro",
    icon: "🍅",
    title: "뽀모도로 타이머",
    description: "25분 집중, 5분 휴식. 공부와 업무 루틴을 가볍게 관리합니다.",
  },
  {
    href: "/reaction",
    icon: "⚡",
    title: "반응속도 테스트",
    description: "5회 평균과 최고 기록으로 내 반응속도를 간단히 측정합니다.",
  },
  {
    href: "/personality",
    icon: "🧠",
    title: "성격 유형 테스트",
    description: "16가지 성격 유형 결과와 유형별 해석을 확인합니다.",
  },
  {
    href: "/lotto",
    icon: "🎱",
    title: "로또 번호 시뮬레이터",
    description: "1~45 중 6개 번호를 무작위로 뽑고, 최근 당첨번호를 확인합니다.",
  },
];

const focusAreas = [
  "브라우저 안에서 끝나는 개인정보 최소화 도구",
  "가이드와 도구를 함께 제공하는 실용형 페이지",
  "출처와 업데이트 기준을 밝히는 운영 방식",
];

const featuredGuides = [
  {
    href: "/guides/password-security",
    title: "비밀번호 보안 가이드",
    description: "강력한 비밀번호, 2단계 인증, 비밀번호 관리자 선택 기준을 정리했습니다.",
  },
  {
    href: "/guides/pomodoro-study",
    title: "뽀모도로 공부법",
    description: "25분 집중 루틴을 공부와 업무에 적용하는 방법을 안내합니다.",
  },
  {
    href: "/guides/reaction-speed",
    title: "반응속도 향상법",
    description: "반응속도 측정 원리와 훈련할 때 확인할 점을 설명합니다.",
  },
];

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-subtle)" }}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-10">
        <h1
          className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          매일 쓰는 작은 판단을 더 쉽게
        </h1>
        <p
          className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          Daily Pick Lab은 비밀번호 보안, 집중 루틴, 반응속도 측정, 성격 유형 이해처럼
          생활 속에서 자주 마주치는 선택을 돕는 무료 가이드와 브라우저 도구를 제공합니다.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {focusAreas.map((item) => (
            <div
              key={item}
              className="px-4 py-3 rounded-lg border text-sm"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
              바로 쓰는 도구
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              설치와 로그인 없이 필요한 기능만 빠르게 사용할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
          함께 읽으면 좋은 가이드
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredGuides.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="block p-5 rounded-lg border transition-shadow hover:shadow-sm"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
            >
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>
                {guide.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {guide.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

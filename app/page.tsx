import type { Metadata } from "next";
import Link from "next/link";
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
    description: "기기 안에서만 동작하는 보안형 생성기와 비밀번호 관리 기준을 함께 제공합니다.",
  },
  {
    href: "/pomodoro",
    icon: "25",
    title: "뽀모도로 타이머",
    description: "25분 집중, 50분 몰입, 짧은 시작 루틴까지 상황에 맞게 선택합니다.",
  },
  {
    href: "/reaction",
    icon: "ms",
    title: "반응속도 테스트",
    description: "5회 평균, 최고 기록, 측정 오차를 함께 보며 반응시간을 확인합니다.",
  },
  {
    href: "/personality",
    icon: "16",
    title: "성격 유형 테스트",
    description: "16가지 성격 유형 결과와 유형별 해석을 가볍게 비교합니다.",
  },
  {
    href: "/lotto",
    icon: "6",
    title: "로또 번호 시뮬레이터",
    description: "1~45 중 6개 번호를 추첨하고 최신 당첨번호와 확률 정보를 확인합니다.",
  },
];

const stats = [
  { value: "5", label: "브라우저 도구" },
  { value: "5+", label: "실용 가이드" },
  { value: "0", label: "필수 로그인" },
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
    description: "집중 루틴을 공부와 업무에 적용하고 실패를 줄이는 방법을 안내합니다.",
  },
  {
    href: "/guides/reaction-speed",
    title: "반응속도 향상법",
    description: "반응속도 측정 오차와 7일 훈련 루틴을 설명합니다.",
  },
];

const terminalLines = [
  { prompt: "pick", code: "privacy: local-only" },
  { prompt: "tools", code: "password | pomodoro | reaction" },
  { prompt: "guides", code: "updated sources + practical steps" },
  { prompt: "result", code: "small daily decisions, clearer" },
];

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      <section className="brand-container mx-auto grid gap-10 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[7fr_5fr] lg:items-center lg:pb-24 lg:pt-24">
        <div>
          <p
            className="mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-primary)" }}
          >
            practical browser lab
          </p>
          <h1
            className="brand-display max-w-4xl text-4xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl"
            style={{ color: "var(--color-text)" }}
          >
            매일 쓰는 작은 판단을 더 선명하게
          </h1>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            Daily Pick Lab은 비밀번호 보안, 집중 루틴, 반응속도 측정, 성격 유형 이해처럼
            생활 속에서 자주 마주치는 선택을 돕는 무료 가이드와 브라우저 도구를 제공합니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/guides"
              className="inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-semibold"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            >
              가이드 먼저 보기
            </Link>
            <Link
              href="/password"
              className="inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-semibold"
              style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text)" }}
            >
              도구 바로 쓰기
            </Link>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold leading-none tracking-tight" style={{ color: "var(--color-primary)" }}>
                  {stat.value}
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--color-text-soft)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="brand-card overflow-hidden p-5">
          <div className="mb-4 flex items-center gap-2 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--color-error)" }} />
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--color-warning)" }} />
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--color-success)" }} />
            <span className="ml-auto text-xs font-medium" style={{ color: "var(--color-text-soft)" }}>
              daily-pick-lab.config
            </span>
          </div>
          <pre
            className="overflow-x-auto text-sm leading-7"
            style={{ color: "var(--color-text-muted)", fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace" }}
          >
            {terminalLines.map((line) => (
              <code key={line.prompt} className="block">
                <span style={{ color: "var(--color-primary)" }}>{line.prompt}</span>
                <span style={{ color: "var(--color-text-soft)" }}> → </span>
                <span>{line.code}</span>
              </code>
            ))}
          </pre>
        </div>
      </section>

      <section className="brand-container mx-auto px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>
              tools
            </p>
            <h2 className="brand-display mt-3 text-3xl font-bold leading-tight sm:text-4xl" style={{ color: "var(--color-text)" }}>
              바로 쓰는 도구
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
            설치와 로그인 없이 필요한 기능만 빠르게 사용할 수 있습니다.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section className="brand-container mx-auto px-4 py-16 sm:px-6 lg:py-24">
        <div className="rounded-xl p-8 sm:p-12" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">guides</p>
              <h2 className="brand-display mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
                도구만 던져두지 않고, 판단 기준까지 같이 정리합니다.
              </h2>
            </div>
            <Link
              href="/guides"
              className="inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-semibold"
              style={{ backgroundColor: "var(--color-on-primary)", color: "var(--color-primary)" }}
            >
              전체 가이드 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="brand-container mx-auto px-4 pb-20 pt-8 sm:px-6 lg:pb-28">
        <h2 className="brand-display text-3xl font-bold leading-tight" style={{ color: "var(--color-text)" }}>
          함께 읽으면 좋은 가이드
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="block rounded-xl border p-6 transition-colors"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}
            >
              <p className="text-lg font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
                {guide.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

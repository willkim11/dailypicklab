import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "가이드 — 생활 도구를 더 잘 쓰는 방법",
  description:
    "비밀번호 보안, 집중 루틴, 반응속도, 성격 유형, 로또 확률까지 Daily Pick Lab 도구와 함께 읽는 실용 가이드 허브입니다.",
};

const guides = [
  {
    href: "/guides/password-security",
    toolHref: "/password",
    label: "보안",
    title: "2026년 비밀번호 보안 가이드",
    desc: "강력한 비밀번호, 비밀번호 관리자, 2단계 인증, 패스키까지 계정 보호 기준을 정리했습니다.",
    updated: "2026-05-21",
    readTime: "7분",
    useFor: "계정 보안 점검",
  },
  {
    href: "/guides/pomodoro-study",
    toolHref: "/pomodoro",
    label: "집중",
    title: "뽀모도로 공부법과 집중 루틴",
    desc: "25분 집중 루틴이 맞는 상황과 맞지 않는 상황, 과목별 활용법과 실패를 줄이는 규칙을 안내합니다.",
    updated: "2026-05-21",
    readTime: "6분",
    useFor: "공부·업무 루틴 설계",
  },
  {
    href: "/guides/reaction-speed",
    toolHref: "/reaction",
    label: "측정",
    title: "반응속도 측정 오차와 훈련 루틴",
    desc: "브라우저 기반 반응속도 테스트에서 생기는 입력 지연, 화면 주사율, 컨디션 변수를 구분합니다.",
    updated: "2026-05-21",
    readTime: "6분",
    useFor: "기록 해석과 훈련",
  },
  {
    href: "/guides/mbti-types",
    toolHref: "/personality",
    label: "성격",
    title: "16가지 성격 유형 해석 가이드",
    desc: "네 가지 성격 축의 의미와 16가지 유형의 강점, 주의점, 관계·직업 해석 기준을 정리했습니다.",
    updated: "2026-05-21",
    readTime: "8분",
    useFor: "자기 이해와 대화",
  },
  {
    href: "/guides/lotto-winning-tips",
    toolHref: "/lotto",
    label: "확률",
    title: "로또 번호 선택의 확률과 오해",
    desc: "자동과 수동의 확률, 자주 나오는 번호에 대한 오해, 번호 선택 편향과 책임 있는 이용 기준을 설명합니다.",
    updated: "2026-05-21",
    readTime: "7분",
    useFor: "확률 이해",
  },
];

const principles = [
  "도구 사용법과 배경 지식을 함께 제공합니다.",
  "최신 업데이트 날짜와 작성 기준을 남깁니다.",
  "과장된 예측이나 보장 표현보다 실제로 확인 가능한 기준을 우선합니다.",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Daily Pick Lab 가이드는 어떤 기준으로 작성되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "각 가이드는 도구 사용자가 바로 적용할 수 있는 기준, 체크리스트, 주의점을 중심으로 작성하며 업데이트 날짜를 표시합니다.",
      },
    },
    {
      "@type": "Question",
      name: "가이드와 도구는 어떻게 연결되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "각 가이드는 관련 브라우저 도구와 연결되어 있어 설명을 읽은 뒤 바로 비밀번호 생성기, 타이머, 반응속도 테스트 등을 사용할 수 있습니다.",
      },
    },
  ],
};

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="brand-container mx-auto px-4 py-12 sm:px-6 lg:py-20">
        <section className="max-w-3xl">
          <p
            className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-primary)" }}
          >
            practical guides
          </p>
          <h1 className="brand-display text-4xl font-bold leading-tight sm:text-5xl" style={{ color: "var(--color-text)" }}>
            도구를 더 잘 쓰기 위한 실용 가이드
          </h1>
          <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-muted)" }}>
            Daily Pick Lab의 가이드는 단순 설명이 아니라, 브라우저 도구를 사용할 때 함께 확인하면 좋은 판단 기준과
            주의점을 정리한 목차입니다.
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item}
              className="rounded-xl border p-4 text-sm leading-relaxed"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-muted)" }}
            >
              {item}
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>
                library
              </p>
              <h2 className="brand-display mt-2 text-3xl font-bold" style={{ color: "var(--color-text)" }}>
                전체 가이드
              </h2>
            </div>
            <p className="text-sm" style={{ color: "var(--color-text-soft)" }}>
              총 {guides.length}개 · 최종 정리 2026-05-21
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {guides.map((guide) => (
              <article
                key={guide.href}
                className="rounded-xl border p-6"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    {guide.label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-soft)" }}>
                    업데이트 {guide.updated} · {guide.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
                  {guide.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {guide.desc}
                </p>
                <div className="mt-5 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text-soft)" }}>
                  활용 목적: {guide.useFor}
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href={guide.href}
                    className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    가이드 읽기
                  </Link>
                  <Link
                    href={guide.toolHref}
                    className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold"
                    style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text)" }}
                  >
                    관련 도구 열기
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-xl p-8 sm:p-10" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>
          <h2 className="brand-display text-3xl font-bold leading-tight">
            읽고 끝나지 않도록, 바로 써볼 수 있게 연결합니다.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed">
            각 가이드는 비밀번호 생성기, 뽀모도로 타이머, 반응속도 테스트, 성격 유형 테스트, 로또 시뮬레이터와 연결됩니다.
            설명을 읽은 뒤 바로 자신의 상황에 적용해볼 수 있습니다.
          </p>
        </section>
      </div>
    </>
  );
}

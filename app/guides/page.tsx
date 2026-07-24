import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "실용 가이드 라이브러리 — 보안, 집중, 반응속도 측정",
  description: "비밀번호 보안, 집중 루틴, 반응속도 정확도·기기 지연·훈련 기록, 성격 유형과 확률을 출처 및 실천 절차와 함께 정리한 가이드입니다.",
  alternates: { canonical: "/guides" },
};

type Guide = {
  href: string;
  toolHref: string;
  label: string;
  title: string;
  desc: string;
  updated: string;
  readTime: string;
  useFor: string;
};

const reactionGuides: Guide[] = [
  {
    href: "/guides/reaction-speed",
    toolHref: "/reaction",
    label: "입문",
    title: "반응속도 측정과 훈련 가이드",
    desc: "수면, 입력 장치, 화면 주사율, 반복 숙련이 기록에 섞이는 과정을 전체적으로 정리합니다.",
    updated: "2026-07-24",
    readTime: "8분",
    useFor: "전체 개념과 훈련 순서 파악",
  },
  {
    href: "/guides/reaction-test-accuracy",
    toolHref: "/reaction",
    label: "측정",
    title: "반응속도 테스트 정확도 높이기",
    desc: "준비 측정, 5회 본 측정, 평균·중앙값·기록 범위를 이용한 재현 가능한 측정 절차입니다.",
    updated: "2026-07-24",
    readTime: "7분",
    useFor: "오차가 적은 기준선 만들기",
  },
  {
    href: "/guides/reaction-device-latency",
    toolHref: "/reaction",
    label: "기기",
    title: "60Hz·120Hz와 입력 장치 지연",
    desc: "화면 프레임, 마우스·터치 입력, 브라우저 이벤트가 결과에 더해지는 과정을 설명합니다.",
    updated: "2026-07-24",
    readTime: "7분",
    useFor: "PC와 모바일 기록 차이 해석",
  },
  {
    href: "/guides/reaction-training-log",
    toolHref: "/reaction",
    label: "기록",
    title: "14일 반응속도 훈련 기록법",
    desc: "하루 1세트 기록표와 전후 중앙값·변동 폭을 비교하는 판정 순서를 제공합니다.",
    updated: "2026-07-24",
    readTime: "6분",
    useFor: "훈련 변화와 컨디션 구분",
  },
];

const practicalGuides: Guide[] = [
  {
    href: "/guides/password-security",
    toolHref: "/password",
    label: "보안",
    title: "2026년 비밀번호 보안 가이드",
    desc: "강력한 비밀번호, 비밀번호 관리자, 2단계 인증과 패스키의 적용 순서를 정리합니다.",
    updated: "2026-07-24",
    readTime: "8분",
    useFor: "계정 보안 점검",
  },
  {
    href: "/guides/pomodoro-study",
    toolHref: "/pomodoro",
    label: "집중",
    title: "뽀모도로 공부법과 집중 루틴",
    desc: "25분 루틴이 맞는 상황과 맞지 않는 상황, 과목별 작업 단위와 중단 규칙을 안내합니다.",
    updated: "2026-07-24",
    readTime: "7분",
    useFor: "공부·업무 루틴 설계",
  },
  {
    href: "/guides/mbti-types",
    toolHref: "/personality",
    label: "성격",
    title: "16가지 성격 유형 해석 가이드",
    desc: "네 가지 선호 축을 자기 이해에 활용하는 법과 온라인 성격 테스트의 한계를 함께 다룹니다.",
    updated: "2026-07-24",
    readTime: "8분",
    useFor: "자기 이해와 대화",
  },
  {
    href: "/guides/lotto-winning-tips",
    toolHref: "/lotto",
    label: "확률",
    title: "로또 번호 선택의 확률과 오해",
    desc: "자동·수동의 동일한 당첨 확률, 번호 선택 편향과 책임 있는 이용 기준을 설명합니다.",
    updated: "2026-07-24",
    readTime: "7분",
    useFor: "확률과 선택 편향 이해",
  },
];

const allGuides = [...reactionGuides, ...practicalGuides];

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Daily Pick Lab 실용 가이드 라이브러리",
  url: "https://www.dailypicklab.com/guides",
  inLanguage: "ko-KR",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: allGuides.length,
    itemListElement: allGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.dailypicklab.com${guide.href}`,
      name: guide.title,
    })),
  },
};

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="border p-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded px-2 py-1 text-xs font-semibold" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>{guide.label}</span>
        <span className="text-xs" style={{ color: "var(--color-text-soft)" }}>검토 {guide.updated} · {guide.readTime}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold" style={{ color: "var(--color-text)" }}><Link href={guide.href} className="hover:underline">{guide.title}</Link></h3>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{guide.desc}</p>
      <p className="mt-4 border-l-2 pl-3 text-sm" style={{ borderColor: "var(--color-primary)", color: "var(--color-text-soft)" }}>활용: {guide.useFor}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
        <Link href={guide.href} className="hover:underline" style={{ color: "var(--color-primary)" }}>가이드 읽기 →</Link>
        <Link href={guide.toolHref} className="hover:underline" style={{ color: "var(--color-text)" }}>관련 도구 열기</Link>
      </div>
    </article>
  );
}

export default function GuidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <div className="brand-container mx-auto px-4 py-12 sm:px-6 lg:py-20">
        <section className="max-w-3xl">
          <p className="text-xs font-semibold uppercase" style={{ color: "var(--color-primary)" }}>8 guides · reviewed sources</p>
          <h1 className="brand-display mt-4 text-4xl font-bold leading-tight sm:text-5xl" style={{ color: "var(--color-text)" }}>도구의 숫자를 제대로 해석하는 실용 가이드</h1>
          <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-muted)" }}>
            사용법만 반복하지 않습니다. 무엇을 측정하는지, 결과가 언제 흔들리는지, 어떤 기준으로 다음 행동을 정할지까지 출처와 함께 정리합니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "var(--color-text-soft)" }}>
            <span>작성: Daily Pick Lab 편집팀</span><span>모든 글에 검토일 표시</span><Link href="/about" className="underline">콘텐츠 작성 기준</Link>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase" style={{ color: "var(--color-primary)" }}>featured topic</p>
            <h2 className="brand-display mt-3 text-3xl font-bold" style={{ color: "var(--color-text)" }}>반응속도 측정 시리즈</h2>
            <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>측정 원리부터 기기 오차, 훈련 기록까지 순서대로 읽을 수 있는 핵심 주제 묶음입니다.</p>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">{reactionGuides.map((guide) => <GuideCard key={guide.href} guide={guide} />)}</div>
        </section>

        <section className="mt-16">
          <h2 className="brand-display text-3xl font-bold" style={{ color: "var(--color-text)" }}>생활 도구별 가이드</h2>
          <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">{practicalGuides.map((guide) => <GuideCard key={guide.href} guide={guide} />)}</div>
        </section>

        <section className="mt-16 border-y py-10" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>작성·검토 원칙</h2>
          <div className="mt-5 grid gap-5 text-sm leading-relaxed sm:grid-cols-3" style={{ color: "var(--color-text-muted)" }}>
            <p><strong style={{ color: "var(--color-text)" }}>직접 적용 가능</strong><br />체크리스트, 표, 측정 절차처럼 바로 실행할 수 있는 내용을 우선합니다.</p>
            <p><strong style={{ color: "var(--color-text)" }}>출처와 한계 공개</strong><br />공식 문서를 우선 연결하고, 브라우저 도구가 대신할 수 없는 판단을 명시합니다.</p>
            <p><strong style={{ color: "var(--color-text)" }}>변경일 기록</strong><br />본문을 다시 검토한 날짜와 기준을 각 글 상단에 표시합니다.</p>
          </div>
        </section>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Daily Pick Lab 소개",
  description: "Daily Pick Lab은 한국 사용자를 위한 무료 온라인 도구 모음 사이트입니다. 설치 없이, 로그인 없이, 바로 사용할 수 있는 실용적인 도구들을 제공합니다.",
};

const tools = [
  { href: "/lotto", icon: "🎱", name: "로또 번호 추첨기", desc: "1~45 중 6개 번호 무작위 추첨. 동행복권과 동일한 방식으로 1~10게임 동시 생성 가능." },
  { href: "/personality", icon: "🧠", name: "성격 유형 테스트", desc: "16문항으로 16가지 성격 유형을 분류. 결과 페이지 공유 및 유형별 직업 안내 제공." },
  { href: "/reaction", icon: "⚡", name: "반응속도 테스트", desc: "ms 단위 정밀 측정. 5회 평균과 개인 최고기록 저장, 전국 평균과 비교." },
  { href: "/pomodoro", icon: "🍅", name: "뽀모도로 타이머", desc: "25분 집중 / 5분 휴식 사이클. 브라우저 탭 타이틀에도 남은 시간 표시." },
  { href: "/password", icon: "🔐", name: "비밀번호 생성기", desc: "대소문자·숫자·특수문자 조합의 안전한 비밀번호를 브라우저에서만 생성. 서버 전송 없음." },
];

const updates = [
  { date: "2026-04", desc: "가이드 섹션 신설, 각 툴 페이지 콘텐츠 강화" },
  { date: "2026-03", desc: "성격 유형 결과 페이지 OG 이미지 자동 생성, 다크모드 지원" },
  { date: "2026-03", desc: "Daily Pick Lab 사이트 최초 오픈 — 5개 도구 동시 출시" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        Daily Pick Lab 소개
      </h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        매일 한 번쯤 써보게 되는 작은 도구들을 모았습니다. 설치 없이, 로그인 없이, 광고 팝업 없이 — 바로 쓸 수 있는 실용적인 도구 모음입니다.
      </p>

      {/* 사이트 철학 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          왜 만들었나요?
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          로또 번호를 뽑으려고 검색하면 전체 화면을 덮는 광고와 팝업이 먼저 반깁니다. 성격 테스트는 결과를 보려면 회원가입을 요구합니다. 뽀모도로 타이머 앱은 수십 MB를 설치해야 하죠.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          Daily Pick Lab은 이 불편함에서 출발했습니다. 자주 쓰는 도구들을 광고 팝업 없이, 회원가입 없이, 앱 설치 없이 바로 쓸 수 있게 만들자는 단순한 목표로 시작됐습니다. 모든 계산은 브라우저에서 처리되므로 개인 정보가 서버로 전송되지 않습니다.
        </p>
      </section>

      {/* 도구 목록 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          제공하는 도구
        </h2>
        <div className="space-y-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-sm"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
            >
              <span className="text-2xl shrink-0 mt-0.5">{t.icon}</span>
              <div>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>{t.name}</p>
                <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 운영 철학 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          운영 원칙
        </h2>
        <div className="space-y-3">
          {[
            { icon: "🔒", title: "개인정보 수집 없음", desc: "모든 계산은 브라우저에서 처리됩니다. 이름, 이메일, 사용 기록 등을 수집하지 않습니다. 반응속도 최고기록은 내 기기의 localStorage에만 저장됩니다." },
            { icon: "🚫", title: "방해 광고 없음", desc: "전체 화면 팝업, 자동 재생 광고는 표시하지 않습니다. 사이트 운영을 위해 Google AdSense의 맥락 광고가 일부 표시될 수 있습니다." },
            { icon: "📱", title: "모바일 완전 지원", desc: "모든 도구는 스마트폰에서도 동일하게 작동하도록 최적화되어 있습니다." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 업데이트 이력 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          업데이트 이력
        </h2>
        <div className="space-y-3">
          {updates.map((u) => (
            <div key={u.date + u.desc} className="flex gap-4">
              <span className="text-sm font-mono shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }}>{u.date}</span>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          기술 스택
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          Next.js (App Router, SSG), TypeScript, Tailwind CSS로 만들어졌으며 Vercel에 배포됩니다. 정적 사이트 생성(SSG) 방식으로 빠른 로딩 속도를 제공하며, 별도 서버 없이 운영됩니다.
        </p>
      </section>

      {/* 문의 */}
      <section>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          문의 및 피드백
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          버그 발견, 기능 제안, 광고 문의 등 무엇이든 환영합니다.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block px-5 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          문의하기 →
        </Link>
      </section>
    </div>
  );
}

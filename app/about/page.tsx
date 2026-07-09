import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Daily Pick Lab 소개",
  description: "Daily Pick Lab은 한국 사용자를 위한 무료 생활 도구와 실용 가이드를 제공합니다. 운영 원칙, 콘텐츠 작성 기준, 개인정보 보호 방식을 안내합니다.",
};

const tools = [
  { href: "/password", icon: "🔐", name: "비밀번호 생성기", desc: "대소문자·숫자·특수문자 조합의 안전한 비밀번호를 브라우저에서만 생성. 서버 전송 없음." },
  { href: "/pomodoro", icon: "🍅", name: "뽀모도로 타이머", desc: "25분 집중 / 5분 휴식 사이클. 브라우저 탭 타이틀에도 남은 시간 표시." },
  { href: "/reaction", icon: "⚡", name: "반응속도 테스트", desc: "ms 단위 측정. 5회 평균과 개인 최고기록 저장, 반복 측정 가능." },
  { href: "/personality", icon: "🧠", name: "성격 유형 테스트", desc: "16문항으로 16가지 성격 유형을 분류. 결과 페이지 공유 및 유형별 해석 제공." },
  { href: "/lotto", icon: "🎱", name: "로또 번호 시뮬레이터", desc: "1~45 중 6개 번호 무작위 추첨. 최근 당첨번호와 확률 정보를 함께 제공." },
];

const updates = [
  { date: "2026-05", desc: "고대비 브랜드 디자인 적용, 가이드 허브 구조화, 성격 유형·로또 확률 콘텐츠 강화" },
  { date: "2026-05", desc: "홈, 소개, 개인정보처리방침, 콘텐츠 작성 기준 정비" },
  { date: "2026-04", desc: "가이드 섹션 신설, 각 툴 페이지 콘텐츠 강화" },
  { date: "2026-03", desc: "성격 유형 결과 페이지 OG 이미지 자동 생성, 모바일 반응형 도구 UI 정리" },
  { date: "2026-03", desc: "Daily Pick Lab 사이트 최초 오픈 — 5개 도구 동시 출시" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        Daily Pick Lab 소개
      </h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        매일 한 번쯤 마주치는 작은 선택을 돕기 위해 만든 무료 생활 도구와 실용 가이드 사이트입니다.
        설치 없이, 로그인 없이, 필요한 기능과 설명을 바로 확인할 수 있게 만드는 것을 목표로 합니다.
      </p>

      {/* 사이트 철학 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          왜 만들었나요?
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          비밀번호를 만들거나, 집중 시간을 재거나, 간단한 테스트를 해보려고 검색하면
          회원가입, 앱 설치, 과한 팝업을 먼저 만나는 경우가 많습니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          Daily Pick Lab은 이 불편함에서 출발했습니다. 기능은 가볍게, 설명은 충분하게 제공하고,
          개인정보가 필요 없는 도구는 브라우저 안에서만 처리하는 방식을 우선합니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          운영 정보
        </h2>
        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          <p>
            운영자: Daily Pick Lab 운영팀
          </p>
          <p>
            운영 목적: 한국 사용자가 자주 찾는 생활 도구와 관련 정보를 한곳에서 빠르게 확인할 수 있도록 돕는 것입니다.
          </p>
          <p>
            문의 창구: 버그 제보, 기능 제안, 콘텐츠 오류 신고는 Contact 페이지 또는 contact@dailypicklab.com으로 받을 수 있습니다.
          </p>
        </div>
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

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          콘텐츠 작성 기준
        </h2>
        <div className="space-y-3">
          {[
            { title: "직접 써볼 수 있는 정보", desc: "가이드는 도구 사용법, 체크리스트, 예시처럼 사용자가 바로 적용할 수 있는 내용을 우선합니다." },
            { title: "출처와 한계 명시", desc: "보안, 확률, 건강 습관처럼 오해가 생길 수 있는 주제는 참고 자료와 한계를 함께 적습니다." },
            { title: "정기 업데이트", desc: "로또 당첨번호처럼 시간이 지나면 바뀌는 정보는 기준 날짜와 변경 내용을 남깁니다." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          광고와 콘텐츠 운영 기준
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          사이트 운영 비용을 충당하기 위해 문맥 광고가 표시될 수 있지만, 콘텐츠 본문과 도구 사용 흐름을 방해하지 않는 배치를 우선합니다.
          광고, 외부 링크, 참고 자료는 사용자가 구분할 수 있도록 표시하며, 도구 결과를 과장하거나 보장하는 표현은 사용하지 않습니다.
        </p>
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
          className="mt-4 inline-block px-5 py-3 rounded-lg font-semibold text-sm"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
        >
          문의하기 →
        </Link>
      </section>

      <p className="mt-10 text-sm" style={{ color: "var(--color-text-muted)" }}>
        최종 업데이트: 2026년 5월 21일
      </p>
    </div>
  );
}

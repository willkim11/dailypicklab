import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import GuideByline from "@/components/GuideByline";
import ReactionGuideNav from "@/components/ReactionGuideNav";

const title = "반응속도 훈련 기록법: 14일 측정표와 결과 해석";
const description = "반응속도 향상을 확인하기 위한 14일 훈련 계획, 측정 기록 항목, 평균·중앙값·변동 폭 해석법과 중단 기준을 제공합니다.";
const path = "/guides/reaction-training-log";
const published = "2026-07-24";
const modified = "2026-07-24";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

const schedule = [
  { days: "1~3일", focus: "기준선", action: "하루 1세트만 측정하고 장비·시각·수면 시간을 상세히 기록합니다." },
  { days: "4~7일", focus: "정확성", action: "예측 클릭을 줄이고, 측정 전 30초 동안 화면 중앙에 집중합니다." },
  { days: "8일", focus: "휴식", action: "측정하지 않거나 기준선 1세트만 진행해 누적 피로를 확인합니다." },
  { days: "9~13일", focus: "일관성", action: "같은 시간대에 1세트씩 측정해 기록 범위가 좁아지는지 봅니다." },
  { days: "14일", focus: "비교", action: "1~3일 중앙값과 12~14일 중앙값을 비교하고 다음 루틴을 결정합니다." },
];

export default function ReactionTrainingLogPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <ArticleJsonLd title={title} description={description} path={path} published={published} modified={modified} />
      <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>← 가이드 목록</Link>
      <p className="mt-6 text-xs font-semibold uppercase" style={{ color: "var(--color-primary)" }}>반응속도 측정 시리즈 4</p>
      <h1 className="mt-3 text-3xl font-bold" style={{ color: "var(--color-text)" }}>반응속도 훈련 기록법: 14일 측정표</h1>
      <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        테스트를 여러 번 누르는 것만으로는 무엇이 좋아졌는지 알기 어렵습니다. 실제 변화, 조작 숙련, 기기 차이, 컨디션을 구분하려면
        적은 횟수를 같은 조건에서 꾸준히 기록해야 합니다. 아래 계획은 최고기록 경쟁이 아니라 재현 가능한 변화를 찾기 위한 루틴입니다.
      </p>
      <GuideByline published={published} modified={modified} reviewNote="반복 측정에서 평균·중앙값·변동 범위를 함께 사용하는 해석 기준과 수면 관련 공공 자료를 확인했습니다." />

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>훈련 전에 먼저 정할 것</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["측정 시간", "예: 매일 오후 8시, 식사 후 1시간"],
            ["측정 환경", "예: 노트북 120Hz, 유선 마우스, Chrome"],
            ["측정량", "준비 2회 + 본 측정 5회, 하루 1세트"],
            ["중단 조건", "손목 통증, 눈 피로, 어지러움이 있으면 종료"],
          ].map(([heading, body]) => (
            <div key={heading} className="border p-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <p className="font-semibold">{heading}</p><p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>14일 훈련 계획</h2>
        <div className="mt-4 divide-y border-y" style={{ borderColor: "var(--color-border)" }}>
          {schedule.map((row) => (
            <div key={row.days} className="grid gap-2 py-4 sm:grid-cols-[80px_90px_1fr]">
              <p className="font-semibold" style={{ color: "var(--color-primary)" }}>{row.days}</p>
              <p className="font-semibold">{row.focus}</p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{row.action}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>매일 남길 기록표</h2>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>아래 항목을 메모 앱이나 스프레드시트의 열로 만들어 사용하세요. 숫자만 적기보다 결과가 흔들린 이유를 찾을 수 있는 조건을 함께 남기는 것이 핵심입니다.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead><tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>{["날짜·시각", "5회 기록", "평균", "중앙값", "수면", "환경·메모"].map((item) => <th key={item} className="border px-3 py-2 text-left" style={{ borderColor: "var(--color-border)" }}>{item}</th>)}</tr></thead>
            <tbody><tr>{["7/24 20:00", "221·228·224·235·219", "225", "224", "7시간", "120Hz, 유선, 보통"].map((item) => <td key={item} className="border px-3 py-2" style={{ borderColor: "var(--color-border)" }}>{item}</td>)}</tr></tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>향상 여부를 판정하는 순서</h2>
        <ol className="mt-4 space-y-4" style={{ color: "var(--color-text-muted)" }}>
          <li><strong style={{ color: "var(--color-text)" }}>1. 조건이 같은 날만 묶습니다.</strong> 스마트폰 기록과 PC 기록, 60Hz와 120Hz 기록을 한 그래프로 합치지 않습니다.</li>
          <li><strong style={{ color: "var(--color-text)" }}>2. 앞 3일과 뒤 3일을 비교합니다.</strong> 단일 최고기록 대신 각 구간의 중앙값을 봅니다.</li>
          <li><strong style={{ color: "var(--color-text)" }}>3. 변동 폭도 확인합니다.</strong> 중앙값이 같아도 최고·최저 차이가 줄었다면 집중의 일관성이 좋아졌을 수 있습니다.</li>
          <li><strong style={{ color: "var(--color-text)" }}>4. 오클릭 횟수를 함께 봅니다.</strong> 기록이 빨라졌지만 예측 클릭이 늘었다면 정확성이 좋아졌다고 보기 어렵습니다.</li>
          <li><strong style={{ color: "var(--color-text)" }}>5. 다음 2주에 재현합니다.</strong> 작은 차이는 컨디션 변동일 수 있으므로 같은 방향이 반복되는지 확인합니다.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>훈련량을 늘리지 말아야 할 때</h2>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          하루에 수십 세트를 반복하면 테스트 규칙을 예측하는 숙련과 피로가 동시에 커집니다. 기록이 갑자기 나빠졌을 때는 더 많이 누르기보다
          수면, 눈의 피로, 손목 불편, 백그라운드 작업을 확인하세요. 반응속도 테스트는 의료 평가가 아니며 지속적인 인지 변화나 신체 증상을 판단하는 도구로 사용할 수 없습니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>참고 자료</h2>
        <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <li><a className="underline" href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer">CDC, About Sleep</a></li>
          <li><a className="underline" href="https://www.nhtsa.gov/risky-driving/drowsy-driving" target="_blank" rel="noopener noreferrer">NHTSA, Drowsy Driving</a></li>
          <li><a className="underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now" target="_blank" rel="noopener noreferrer">MDN, Performance.now()</a></li>
        </ul>
      </section>

      <ReactionGuideNav currentPath={path} />
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import GuideByline from "@/components/GuideByline";
import ReactionGuideNav from "@/components/ReactionGuideNav";

const title = "반응속도 테스트 정확도 높이는 방법";
const description = "브라우저 반응속도 테스트의 오차 원인을 이해하고, 준비 측정·5회 본 측정·중앙값·기록 범위로 결과를 비교하는 표준 측정 절차를 안내합니다.";
const path = "/guides/reaction-test-accuracy";
const published = "2026-07-24";
const modified = "2026-07-24";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
};

const protocol = [
  { step: "1. 환경 고정", detail: "같은 기기, 브라우저, 입력 장치, 화면 모드를 사용합니다. 전원 연결 여부도 같게 맞춥니다." },
  { step: "2. 준비 측정", detail: "첫 2회는 조작에 적응하는 연습으로 보고 기록에서 제외합니다." },
  { step: "3. 본 측정", detail: "5회를 연속 측정하되 오클릭은 실패로 남기고 해당 회차만 다시 진행합니다." },
  { step: "4. 결과 기록", detail: "평균, 중앙값, 최고·최저 기록의 차이와 측정 시각을 함께 적습니다." },
  { step: "5. 재검증", detail: "하루의 기록으로 결론 내리지 않고 같은 조건에서 3일 이상 반복합니다." },
];

export default function ReactionTestAccuracyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <ArticleJsonLd title={title} description={description} path={path} published={published} modified={modified} />
      <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>← 가이드 목록</Link>
      <p className="mt-6 text-xs font-semibold uppercase" style={{ color: "var(--color-primary)" }}>반응속도 측정 시리즈 2</p>
      <h1 className="mt-3 text-3xl font-bold" style={{ color: "var(--color-text)" }}>반응속도 테스트 정확도 높이는 방법</h1>
      <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        온라인 테스트의 숫자는 사람의 반응만 재는 값이 아닙니다. 화면에 색이 표시되는 시간, 브라우저가 클릭 이벤트를 받는 시간,
        입력 장치의 지연이 모두 합쳐집니다. 따라서 정확도는 ‘오차가 전혀 없는 숫자’를 찾는 일이 아니라, 비교 조건을 일정하게 만드는 데서 시작합니다.
      </p>
      <GuideByline published={published} modified={modified} reviewNote="브라우저 고정밀 시간 측정 방식과 반복 측정 통계 해석 기준을 확인했습니다." />

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>이 테스트가 실제로 재는 값</h2>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          Daily Pick Lab 테스트는 초록색 전환 직후의 <code>performance.now()</code> 값과 클릭 시점의 값을 빼서 시간을 계산합니다.
          이 API는 시스템 시계 변경의 영향을 받지 않는 단조 증가 시계를 사용하므로 짧은 구간을 재는 데 적합합니다. 하지만 화면이 실제로 눈에 보인 순간이나
          마우스 스위치가 눌린 물리적 순간을 별도 장비로 측정하는 것은 아닙니다. 결과는 ‘브라우저에서 관찰한 전체 반응시간’으로 해석해야 합니다.
        </p>
        <div className="mt-5 border-l-4 py-3 pl-4" style={{ borderColor: "var(--color-primary)", color: "var(--color-text-muted)" }}>
          같은 사람의 실력 변화를 보려면 절대값보다 같은 기기에서 얻은 여러 날의 중앙값과 기록 범위를 비교하는 편이 유용합니다.
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>재현 가능한 5단계 측정 절차</h2>
        <div className="mt-4 divide-y border-y" style={{ borderColor: "var(--color-border)" }}>
          {protocol.map((item) => (
            <div key={item.step} className="grid gap-2 py-4 sm:grid-cols-[120px_1fr]">
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>{item.step}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>평균만 보지 말고 중앙값과 범위를 함께 보기</h2>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          예를 들어 5회 기록이 218, 221, 224, 229, 310ms라면 평균은 240ms이지만 중앙값은 224ms입니다.
          마지막 회차에 잠깐 집중을 놓친 영향이 평균을 크게 끌어올린 사례입니다. 그렇다고 310ms를 임의로 삭제해서는 안 됩니다.
          원자료를 남기고 평균과 중앙값을 함께 적어야 컨디션 흔들림까지 볼 수 있습니다.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
              <th className="border px-3 py-2 text-left" style={{ borderColor: "var(--color-border)" }}>지표</th>
              <th className="border px-3 py-2 text-left" style={{ borderColor: "var(--color-border)" }}>확인할 내용</th>
            </tr></thead>
            <tbody>
              <tr><td className="border px-3 py-2 font-semibold" style={{ borderColor: "var(--color-border)" }}>평균</td><td className="border px-3 py-2" style={{ borderColor: "var(--color-border)" }}>한 세트의 전반적인 수준. 큰 이상값에 영향을 받습니다.</td></tr>
              <tr><td className="border px-3 py-2 font-semibold" style={{ borderColor: "var(--color-border)" }}>중앙값</td><td className="border px-3 py-2" style={{ borderColor: "var(--color-border)" }}>정렬했을 때 가운데 값. 평소 기록을 파악할 때 보조 지표가 됩니다.</td></tr>
              <tr><td className="border px-3 py-2 font-semibold" style={{ borderColor: "var(--color-border)" }}>범위</td><td className="border px-3 py-2" style={{ borderColor: "var(--color-border)" }}>최저값과 최고값의 차이. 집중 상태가 얼마나 안정적인지 보여줍니다.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>결과를 버리고 다시 재도전해야 하는 경우</h2>
        <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <li><strong style={{ color: "var(--color-text)" }}>탭을 전환한 경우:</strong> 백그라운드 탭에서는 브라우저 타이머와 화면 갱신이 제한될 수 있습니다.</li>
          <li><strong style={{ color: "var(--color-text)" }}>알림이나 창이 화면을 가린 경우:</strong> 자극을 본 시점 자체가 달라집니다.</li>
          <li><strong style={{ color: "var(--color-text)" }}>입력 장치를 바꾼 경우:</strong> 마우스와 터치 결과는 한 추세로 합치지 않습니다.</li>
          <li><strong style={{ color: "var(--color-text)" }}>초록색 전에 누른 경우:</strong> 빠른 반응이 아니라 예측 클릭이므로 실패 횟수로 따로 기록합니다.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>측정 전 30초 체크리스트</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {["브라우저 탭과 알림 정리", "기기 전원 모드 확인", "같은 손과 입력 장치 사용", "화면 밝기와 주사율 고정", "준비 측정 2회 진행", "측정 시각·수면 시간 기록"].map((item) => (
            <div key={item} className="border px-4 py-3 text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>✓ {item}</div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>참고 자료</h2>
        <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <li><a className="underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now" target="_blank" rel="noopener noreferrer">MDN, Performance.now()</a></li>
          <li><a className="underline" href="https://www.w3.org/TR/hr-time-3/" target="_blank" rel="noopener noreferrer">W3C, High Resolution Time Level 3</a></li>
          <li><a className="underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API" target="_blank" rel="noopener noreferrer">MDN, Page Visibility API</a></li>
        </ul>
      </section>

      <ReactionGuideNav currentPath={path} />
    </article>
  );
}

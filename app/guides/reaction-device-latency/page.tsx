import type { Metadata } from "next";
import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import GuideByline from "@/components/GuideByline";
import ReactionGuideNav from "@/components/ReactionGuideNav";

const title = "반응속도 테스트의 기기 지연: 60Hz, 120Hz, 마우스와 터치 차이";
const description = "화면 주사율, 프레임 표시, 마우스·터치 입력, 브라우저 처리 과정이 온라인 반응속도 기록에 어떤 차이를 만드는지 단계별로 설명합니다.";
const path = "/guides/reaction-device-latency";
const published = "2026-07-24";
const modified = "2026-07-24";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

const refreshRates = [
  { hz: "60Hz", frame: "약 16.7ms", note: "1초를 60개 화면 갱신 구간으로 나눈 값" },
  { hz: "90Hz", frame: "약 11.1ms", note: "일부 스마트폰과 모니터에서 사용" },
  { hz: "120Hz", frame: "약 8.3ms", note: "고주사율 모바일·모니터에서 흔한 설정" },
  { hz: "144Hz", frame: "약 6.9ms", note: "게이밍 모니터에서 널리 쓰이는 설정" },
];

export default function ReactionDeviceLatencyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <ArticleJsonLd title={title} description={description} path={path} published={published} modified={modified} />
      <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>← 가이드 목록</Link>
      <p className="mt-6 text-xs font-semibold uppercase" style={{ color: "var(--color-primary)" }}>반응속도 측정 시리즈 3</p>
      <h1 className="mt-3 text-3xl font-bold" style={{ color: "var(--color-text)" }}>반응속도 테스트의 기기 지연</h1>
      <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        같은 사람이 같은 날 측정해도 노트북, 스마트폰, 외장 모니터의 결과는 다를 수 있습니다. 숫자가 달라지는 이유를 알면
        새 기기에서 기록이 좋아졌다고 해서 곧바로 신체 반응이 향상됐다고 오해하지 않게 됩니다.
      </p>
      <GuideByline published={published} modified={modified} reviewNote="화면 갱신 주기 계산과 브라우저 렌더링·입력 이벤트 관련 공식 문서를 확인했습니다." />

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>클릭 결과가 만들어지는 다섯 구간</h2>
        <ol className="mt-4 space-y-4" style={{ color: "var(--color-text-muted)" }}>
          {[
            ["브라우저가 색상 변경을 예약", "코드가 준비돼도 화면은 다음 그리기 시점에 바뀝니다."],
            ["디스플레이가 새 프레임 표시", "주사율과 현재 프레임 위치에 따라 자극이 눈에 보이는 시점이 달라집니다."],
            ["사용자가 색상 변화를 인지", "시각 처리와 판단을 거쳐 손가락 움직임이 시작됩니다."],
            ["마우스 또는 터치가 입력 전달", "장치 스캔, 무선 연결, 운영체제 입력 처리가 포함됩니다."],
            ["브라우저가 이벤트 처리", "클릭 이벤트가 실행되고 고정밀 타이머 값의 차이를 계산합니다."],
          ].map(([heading, body], index) => (
            <li key={heading} className="grid grid-cols-[32px_1fr] gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>{index + 1}</span>
              <p><strong style={{ color: "var(--color-text)" }}>{heading}</strong><br /><span className="text-sm">{body}</span></p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>주사율별 한 프레임 시간</h2>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          한 프레임 시간은 1,000ms를 주사율로 나눈 계산값입니다. 60Hz의 16.7ms가 매번 그대로 오차에 더해진다는 뜻은 아닙니다.
          색상 변경 요청이 프레임 주기의 어느 지점에 들어왔는지에 따라 대기 시간이 달라질 수 있다는 뜻입니다.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr style={{ backgroundColor: "var(--color-bg-subtle)" }}><th className="border px-3 py-2 text-left" style={{ borderColor: "var(--color-border)" }}>주사율</th><th className="border px-3 py-2 text-left" style={{ borderColor: "var(--color-border)" }}>한 프레임</th><th className="border px-3 py-2 text-left" style={{ borderColor: "var(--color-border)" }}>해석</th></tr></thead>
            <tbody>{refreshRates.map((row) => <tr key={row.hz}><td className="border px-3 py-2 font-semibold" style={{ borderColor: "var(--color-border)" }}>{row.hz}</td><td className="border px-3 py-2" style={{ borderColor: "var(--color-border)" }}>{row.frame}</td><td className="border px-3 py-2" style={{ borderColor: "var(--color-border)" }}>{row.note}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>마우스와 터치 기록을 직접 비교하면 안 되는 이유</h2>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          마우스는 버튼의 물리 입력을 포인터 이벤트로 전달하고, 터치는 손가락 접촉과 해제, 제스처 판정 과정을 거칩니다.
          기기와 브라우저마다 처리 방식이 달라 ‘터치는 항상 몇 ms 느리다’는 하나의 숫자로 일반화할 수 없습니다.
          입력 방식이 바뀌면 새로운 기준선을 만들고 별도 추세로 관리하세요.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="border p-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}><p className="font-semibold">마우스 측정</p><p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>같은 USB 포트나 무선 연결 방식, 같은 브라우저를 유지합니다. 배터리 절약 모드도 기록합니다.</p></div>
          <div className="border p-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}><p className="font-semibold">터치 측정</p><p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>같은 손가락과 화면 방향을 사용하고, 화면 보호 필름이나 접근성 설정 변경도 조건으로 남깁니다.</p></div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>내 기기의 지연 영향을 비교하는 실험</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <li>PC 마우스로 준비 2회 후 본 측정 5회를 진행합니다.</li>
          <li>5분 쉬고 같은 PC의 트랙패드로 같은 절차를 반복합니다.</li>
          <li>스마트폰에서도 화면 방향과 주사율 설정을 기록한 뒤 5회를 측정합니다.</li>
          <li>각 환경의 평균보다 중앙값과 기록 범위를 먼저 비교합니다.</li>
          <li>다음 날 같은 순서로 반복해 차이가 유지되는지 확인합니다.</li>
        </ol>
        <p className="mt-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          한 번만 비교하면 순서에 따른 연습 효과나 피로가 섞일 수 있습니다. 둘째 날에는 기기 순서를 반대로 바꾸면 순서 효과를 줄이는 데 도움이 됩니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold" style={{ color: "var(--color-text)" }}>참고 자료</h2>
        <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <li><a className="underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" target="_blank" rel="noopener noreferrer">MDN, Window.requestAnimationFrame()</a></li>
          <li><a className="underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/High_precision_timing" target="_blank" rel="noopener noreferrer">MDN, High precision timing</a></li>
          <li><a className="underline" href="https://www.w3.org/TR/pointerevents3/" target="_blank" rel="noopener noreferrer">W3C, Pointer Events Level 3</a></li>
        </ul>
      </section>

      <ReactionGuideNav currentPath={path} />
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "반응속도 높이는 방법 — 측정 오차와 훈련 루틴 가이드",
  description:
    "반응속도에 영향을 주는 수면, 기기, 화면 주사율, 입력 지연을 이해하고 같은 환경에서 꾸준히 훈련하는 방법을 정리했습니다.",
};

export default function ReactionSpeedPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>
          ← 가이드 목록
        </Link>
      </div>

      <h1 className="text-3xl font-bold mt-4" style={{ color: "var(--color-text)" }}>
        반응속도 높이는 방법: 측정과 훈련 가이드
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        반응속도는 타고난 감각만으로 결정되지 않습니다. 수면, 집중 상태, 입력 장치, 화면 주사율,
        반복 훈련이 모두 결과에 영향을 줍니다. 중요한 것은 한 번의 최고기록보다 같은 환경에서의 변화 추이입니다.
      </p>
      <div className="mt-5 p-4 rounded-xl border text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)", color: "var(--color-text-muted)" }}>
        <p>최종 업데이트: 2026년 5월 21일</p>
        <p className="mt-1">작성 기준: 브라우저 기반 시각 반응속도 테스트에서 생기는 입력 지연, 화면 주사율, 수면과 피로 변수를 구분해 정리했습니다.</p>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          반응속도의 뇌과학: 어떻게 작동하는가?
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          반응속도는 대체로 세 단계로 나눠 볼 수 있습니다. 첫째, 눈이 화면 변화를 감지합니다. 둘째, 시각 정보가 뇌에서 처리됩니다. 셋째, 뇌가 운동 신경에 명령을 내려 손가락이 클릭합니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          온라인 테스트에서 보이는 값은 이 생리적 반응에 화면 주사율, 브라우저 렌더링, 마우스나 터치 입력 지연이 더해진 결과입니다. 그래서 한 번의 최고기록보다 같은 환경에서 반복 측정한 평균을 보는 편이 더 실용적입니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          먼저 측정 환경을 고정하세요
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          반응속도 테스트는 기기 차이에 민감합니다. 같은 사람이더라도 스마트폰 터치, 노트북 트랙패드,
          유선 마우스, 무선 마우스에서 결과가 다르게 나올 수 있습니다. 그래서 훈련 효과를 보려면 환경을 고정해야 합니다.
        </p>
        <div className="mt-4 space-y-2">
          {[
            "같은 기기와 같은 브라우저로 측정하기",
            "마우스 배터리와 연결 상태 확인하기",
            "절전 모드와 백그라운드 다운로드 끄기",
            "아침/저녁처럼 측정 시간대를 나눠 기록하기",
            "최고기록보다 5회 평균을 기준으로 비교하기",
          ].map((item) => (
            <div key={item} className="flex gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <span style={{ color: "var(--color-success)" }} className="shrink-0 font-bold mt-0.5">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          반응속도에 영향을 미치는 7가지 요인
        </h2>
        <div className="space-y-3">
          {[
            { factor: "수면", impact: "매우 높음", desc: "수면 부족과 피로는 주의력, 판단, 반응 시간에 영향을 줄 수 있습니다. 같은 테스트라도 잠을 충분히 잔 날과 피곤한 날의 평균이 달라질 수 있습니다." },
            { factor: "연령", impact: "높음", desc: "반응 시간은 연령, 시력, 운동 습관, 기기 사용 경험에 따라 달라질 수 있습니다. 단순히 나이만으로 결과를 해석하기보다 내 기준선을 먼저 잡는 것이 좋습니다." },
            { factor: "카페인", impact: "중간", desc: "카페인은 각성도를 높일 수 있지만 사람마다 반응이 다릅니다. 과다 섭취는 손 떨림, 불안, 수면 질 저하로 다음 측정에 불리할 수 있습니다." },
            { factor: "훈련", impact: "높음", desc: "반복 측정은 테스트 방식에 익숙해지는 효과를 만듭니다. 실제 반응 능력 향상과 단순한 숙련 효과를 구분하려면 기록 조건을 함께 남기세요." },
            { factor: "운동", impact: "높음", desc: "규칙적인 신체 활동은 집중력과 컨디션 관리에 도움이 됩니다. 탁구, 배드민턴처럼 시각 자극에 빠르게 반응하는 운동은 훈련 루틴으로 활용하기 좋습니다." },
            { factor: "스트레스", impact: "중간", desc: "긴장이 너무 낮으면 집중이 흐려지고, 너무 높으면 서두르다 실수가 늘 수 있습니다. 테스트 전 짧게 호흡을 고르는 것만으로도 결과가 안정됩니다." },
            { factor: "온도", impact: "낮음", desc: "손이 차갑거나 마우스 그립이 불편하면 클릭 동작이 둔해질 수 있습니다. 측정 전 손과 자세를 편하게 만드는 것이 좋습니다." },
          ].map((item) => (
            <div key={item.factor} className="flex gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <div className="shrink-0 text-center">
                <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>{item.factor}</p>
                <p className="text-xs mt-0.5" style={{ color: item.impact === "매우 높음" ? "#EF4444" : item.impact === "높음" ? "var(--color-primary)" : "var(--color-text-muted)" }}>영향: {item.impact}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          이 테스트의 한계
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          브라우저 반응속도 테스트는 의료 검사나 전문 스포츠 측정 장비가 아닙니다. 운영체제, 브라우저, 디스플레이 주사율,
          입력 장치, 백그라운드 작업에 따라 수십 ms 차이가 날 수 있습니다. 건강 문제, 수면 장애, 약물 영향이 의심된다면
          온라인 테스트 결과만으로 판단하지 말고 전문가와 상담하세요.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          프로게이머처럼 반응속도 키우는 훈련법
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "일관된 측정으로 기준선 잡기", desc: "같은 시간대(오전 vs 오후)에 같은 기기로 매일 측정하세요. 변수를 최소화해야 실제 변화를 파악할 수 있습니다. 5회 평균값을 기록하면 일시적 변동에 속지 않습니다." },
            { step: "2", title: "시각 훈련: 다양한 자극에 반응하기", desc: "단순 클릭 테스트 외에도 색상 변화 감지, 방향 판단 등 다양한 시각 자극에 반응하는 훈련을 병행하세요. 뇌의 다양한 처리 경로를 동시에 강화합니다." },
            { step: "3", title: "수면 전 훈련 피하기", desc: "취침 1~2시간 전에는 강도 높은 반응 훈련을 피하세요. 뇌가 흥분 상태를 유지해 수면의 질이 저하되고, 다음 날 반응속도에 오히려 역효과가 날 수 있습니다." },
            { step: "4", title: "눈 운동 포함하기", desc: "부드러운 눈 추적 운동(Smooth Pursuit)과 빠른 도약 운동(Saccade)을 훈련하면 시각 처리 속도가 향상됩니다. 탁구, 배드민턴이 이 훈련을 자연스럽게 포함합니다." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>{item.step}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          7일 훈련 루틴
        </h2>
        <div className="space-y-3">
          {[
            { day: "1~2일차", task: "기준선 측정", desc: "하루 3세트씩 측정해 평균 범위를 확인합니다. 아직 빠르게 하려 하지 말고 환경을 고정하는 데 집중하세요." },
            { day: "3~4일차", task: "시각 집중 훈련", desc: "측정 전 30초 동안 화면 중앙을 보고 호흡을 고릅니다. 급하게 누르기보다 초록색 전환을 정확히 보는 연습을 합니다." },
            { day: "5~6일차", task: "컨디션 비교", desc: "수면 직후, 커피 섭취 후, 저녁 피로 상태를 나눠 측정합니다. 어떤 조건에서 느려지는지 찾습니다." },
            { day: "7일차", task: "평균 비교", desc: "첫날 평균과 마지막 날 평균을 비교합니다. 10ms 이상 차이가 나면 환경과 컨디션 변화도 함께 기록하세요." },
          ].map((item) => (
            <div key={item.day} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <p className="font-semibold text-sm" style={{ color: "var(--color-primary)" }}>{item.day} · {item.task}</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          참고용 반응속도 범위
        </h2>
        <p className="mb-4" style={{ color: "var(--color-text-muted)" }}>
          아래 표는 온라인 시각 반응 테스트에서 흔히 관찰되는 대략적인 범위입니다. 공식 직업별 기준이나 선발 지표가 아니며,
          장비와 테스트 방식에 따라 크게 달라질 수 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>분류</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>참고 범위</th>
              </tr>
            </thead>
            <tbody>
              {[
                { job: "e스포츠 프로게이머", speed: "120~160ms" },
                { job: "F1 레이서", speed: "150~180ms" },
                { job: "격투기/권투 선수", speed: "160~190ms" },
                { job: "일반 운동선수", speed: "180~210ms" },
                { job: "일반 성인 (20대)", speed: "200~240ms" },
                { job: "일반 성인 (40대)", speed: "230~270ms" },
                { job: "일반 성인 (60대↑)", speed: "280~350ms" },
              ].map((row) => (
                <tr key={row.job}>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>{row.job}</td>
                  <td className="px-3 py-2 border font-mono" style={{ borderColor: "var(--color-border)", color: "var(--color-primary)" }}>{row.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>지금 내 반응속도 측정하기</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>같은 기기에서 5회 평균을 측정하고, 내 최고기록과 비교해보세요.</p>
        <Link
          href="/reaction"
          className="inline-block px-5 py-3 rounded-lg font-semibold text-sm"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
        >
          반응속도 테스트 시작 →
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          참고 자료
        </h2>
        <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <li>
            <a href="https://www.nhtsa.gov/risky-driving/drowsy-driving" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary)" }}>
              NHTSA Drowsy Driving
            </a>
          </li>
          <li>
            <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary)" }}>
              CDC Sleep and Sleep Disorders
            </a>
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary)" }}>
              MDN Performance.now()
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}

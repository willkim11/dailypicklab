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
        <p className="mt-1">작성 기준: 브라우저 기반 시각 반응속도 테스트에서 생기는 입력 지연, 화면 주사율, 컨디션 변수를 구분해 정리했습니다.</p>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          반응속도의 뇌과학: 어떻게 작동하는가?
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          반응속도는 세 단계로 구성됩니다. 첫째, 눈이 빛을 감지해 전기 신호로 변환합니다 (약 10ms). 둘째, 신호가 시신경을 통해 뇌의 시각 피질에 도달합니다 (약 30~50ms). 셋째, 뇌가 신호를 처리하고 운동 신경에 명령을 내려 손가락이 클릭합니다 (약 100~150ms).
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          이 전체 과정이 200~250ms 안에 일어납니다. 흥미로운 점은 반복 훈련을 통해 뇌가 이 경로를 더 효율적으로 처리하도록 변한다는 것입니다. 이를 신경가소성(Neuroplasticity)이라 부릅니다.
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
            { factor: "수면", impact: "매우 높음", desc: "수면 부족 24시간이면 반응속도가 음주 운전 수준(BAC 0.1%)으로 떨어집니다. 7~9시간 수면은 반응속도 최적화의 기본 중의 기본입니다." },
            { factor: "연령", impact: "높음", desc: "반응속도는 18~24세에 정점을 찍고 이후 서서히 저하됩니다. 그러나 규칙적인 운동과 훈련으로 40~50대에도 20대 수준을 유지하는 사례가 많습니다." },
            { factor: "카페인", impact: "중간", desc: "적정량의 카페인(커피 1~2잔)은 중추신경계를 자극해 반응속도를 5~10ms 향상시킵니다. 그러나 과다 섭취하면 불안과 떨림으로 오히려 역효과가 납니다." },
            { factor: "훈련", impact: "높음", desc: "반복적인 반응 훈련은 신경 회로를 강화하고 반응 패턴을 '자동화'합니다. 프로게이머들이 하루 10시간 이상 플레이하는 이유 중 하나입니다." },
            { factor: "운동", impact: "높음", desc: "유산소 운동은 뇌 혈류를 증가시키고 신경 전달 물질 분비를 촉진합니다. 줄넘기, 탁구, 배드민턴처럼 순발력이 필요한 운동이 특히 효과적입니다." },
            { factor: "스트레스", impact: "중간", desc: "적당한 긴장감은 반응속도를 높이지만 (요키스-도드슨 법칙), 과도한 스트레스는 집중력을 방해해 반응이 느려집니다." },
            { factor: "온도", impact: "낮음", desc: "손가락 근육이 차가우면 운동 신경 전달이 느려집니다. 중요한 시합 전 손을 따뜻하게 유지하는 것이 도움됩니다." },
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
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: "var(--color-primary)", color: "white" }}>{item.step}</span>
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
          직업별 평균 반응속도
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>직업/분류</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>평균 반응속도</th>
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
          className="inline-block px-5 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          반응속도 테스트 시작 →
        </Link>
      </div>
    </article>
  );
}

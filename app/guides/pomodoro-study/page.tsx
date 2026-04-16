import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "뽀모도로 기법으로 공부 효율 2배 높이기",
  description:
    "수능부터 자격증까지, 뽀모도로 기법으로 집중력을 극대화하는 실전 공부법. 25분 집중의 과학적 원리와 단계별 활용법.",
};

export default function PomodoroStudyPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>
          ← 가이드 목록
        </Link>
      </div>

      <h1 className="text-3xl font-bold mt-4" style={{ color: "var(--color-text)" }}>
        뽀모도로 기법으로 공부 효율 2배 높이기
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        책상 앞에 4시간을 앉아 있었지만 실제로 집중한 시간은 40분뿐인 경험이 있으신가요? 뽀모도로 기법은 이 문제를 해결하기 위해 만들어진 시간 관리 방법입니다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          왜 25분인가? 집중력의 과학
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          인간의 뇌는 무한정 집중할 수 없습니다. 신경과학 연구에 따르면, 강도 높은 인지 작업에 대한 집중력은 20~30분을 기점으로 급격히 저하됩니다. 그 이후에는 의자에 앉아 있어도 뇌는 이미 "공회전" 상태에 가까워집니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          뽀모도로 기법의 25분은 이 집중력 곡선의 정점 구간을 활용하는 것입니다. 집중력이 떨어지기 직전에 타이머를 끊고, 짧은 휴식으로 뇌를 리셋한 뒤 다시 새로운 집중 사이클을 시작합니다. 이 패턴을 반복하면 하루 동안 훨씬 더 많은 "진짜 집중 시간"을 확보할 수 있습니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          수능/자격증 공부에 뽀모도로 적용하기
        </h2>
        <div className="space-y-4">
          {[
            {
              subject: "국어·영어 (독해)",
              tip: "지문 1~2개를 1 뽀모도로(25분) 단위로 설정하세요. 독해는 연속적인 집중이 필요한 과목이라 중간에 끊기면 안 됩니다. 25분 안에 지문을 마치도록 목표를 잡으면 자연스럽게 속도가 붙습니다.",
            },
            {
              subject: "수학 (문제 풀기)",
              tip: "문제 유형별로 뽀모도로를 나누세요. 예: 1뽀모도로 = 미적분 3문제. 모르는 문제에서 5분 이상 막히면 바로 표시하고 다음 문제로 넘어갑니다. 집착하다가 뽀모도로 전체를 소모하지 마세요.",
            },
            {
              subject: "암기 과목 (한국사, 생명과학 등)",
              tip: "1뽀모도로에 새 내용 인풋, 다음 뽀모도로에 복습 아웃풋 패턴을 사용하세요. 망각 곡선에 따르면 학습 직후 복습이 기억 유지율을 70% 이상 높입니다.",
            },
          ].map((item) => (
            <div key={item.subject} className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <p className="font-semibold text-sm mb-2" style={{ color: "var(--color-primary)" }}>{item.subject}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          휴식 시간에 절대 하면 안 되는 것
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          5분 휴식이 뽀모도로 기법에서 가장 중요하지만, 잘못 보내면 오히려 역효과가 납니다.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "#EF4444" }}>❌ 하면 안 되는 것</p>
            <ul className="space-y-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <li>• 인스타그램·유튜브 스크롤</li>
              <li>• 다른 공부 내용 미리 보기</li>
              <li>• 채팅·SNS 확인</li>
              <li>• 자극적인 영상 시청</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-success)" }}>✓ 해야 하는 것</p>
            <ul className="space-y-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <li>• 자리에서 일어나 스트레칭</li>
              <li>• 물 마시기, 창밖 바라보기</li>
              <li>• 가벼운 심호흡</li>
              <li>• 방금 공부한 내용 머릿속 정리</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          하루 목표 뽀모도로 수 설정하기
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          처음 시작한다면 하루 4~6 뽀모도로(2~3시간의 순수 집중)를 목표로 삼으세요. 많은 사람들이 처음부터 12뽀모도로를 목표로 잡다가 2~3일 만에 포기합니다.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>단계</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>일일 목표</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>순수 집중 시간</th>
              </tr>
            </thead>
            <tbody>
              {[
                { stage: "입문 (1~2주)", daily: "4~6 뽀모도로", time: "1시간 40분 ~ 2시간 30분" },
                { stage: "발전 (1개월)", daily: "6~8 뽀모도로", time: "2시간 30분 ~ 3시간 20분" },
                { stage: "고급 (3개월↑)", daily: "10~12 뽀모도로", time: "4시간 10분 ~ 5시간" },
              ].map((row) => (
                <tr key={row.stage}>
                  <td className="px-3 py-2 border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>{row.stage}</td>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>{row.daily}</td>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>지금 바로 뽀모도로 시작하기</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>설치 불필요. 25분 집중 타이머를 바로 시작하세요.</p>
        <Link
          href="/pomodoro"
          className="inline-block px-5 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          뽀모도로 타이머 시작 →
        </Link>
      </div>
    </article>
  );
}

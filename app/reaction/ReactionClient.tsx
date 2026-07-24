"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import OtherToolsNav from "@/components/OtherToolsNav";

type Phase = "idle" | "waiting" | "ready" | "result" | "early";

const TOTAL_ROUNDS = 5;

function getRating(ms: number): string {
  if (ms < 180) return "번개 같은 반응속도";
  if (ms < 220) return "매우 빠릅니다";
  if (ms < 260) return "안정적인 기록입니다";
  if (ms < 300) return "조금 더 확인해보세요";
  return "조금 느립니다. 컨디션을 바꿔 다시 측정해보세요";
}

function getResultAdvice(ms: number): string {
  if (ms < 180) return "이 측정 환경에서 매우 빠른 기록입니다. 예측 클릭이 없었는지 확인하고 여러 날 반복해 재현되는지 보세요.";
  if (ms < 220) return "빠른 기록입니다. 기기나 주사율을 바꾸지 않은 상태에서 중앙값과 기록 범위를 함께 비교하세요.";
  if (ms < 260) return "안정적인 참고 구간입니다. 같은 기기에서 아침과 저녁 기록을 나눠 보면 컨디션 차이를 확인하기 좋습니다.";
  if (ms < 300) return "피로, 산만함, 입력 장치 지연의 영향을 함께 확인하세요. 알림을 끄고 같은 조건에서 다시 측정해보세요.";
  return "수면 부족, 피로, 입력 장치 지연 가능성이 있습니다. 한 번의 결과로 판단하지 말고 같은 환경에서 3세트 이상 평균을 비교하세요.";
}

const PHASE_STYLE: Record<Phase, { bg: string; text: string; message: string }> = {
  idle:    { bg: "#9CA3AF", text: "white",   message: "클릭해서 시작" },
  waiting: { bg: "#EF4444", text: "white",   message: "잠깐... 초록색이 되면 클릭!" },
  ready:   { bg: "#10B981", text: "white",   message: "지금 클릭하세요!" },
  early:   { bg: "#F59E0B", text: "white",   message: "너무 빨랐어요! 다시 클릭하세요" },
  result:  { bg: "#3B82F6", text: "white",   message: "" },
};

export default function ReactionClient() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [times, setTimes] = useState<number[]>([]);
  const [lastMs, setLastMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);

  const startRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // localStorage에서 최고기록 복원
  useEffect(() => {
    const saved = localStorage.getItem("reaction_best");
    if (saved) setBest(Number(saved));
  }, []);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startWaiting = useCallback(() => {
    setPhase("waiting");
    setLastMs(null);
    const delay = 1000 + Math.random() * 2000; // 1~3초
    timerRef.current = setTimeout(() => {
      setPhase("ready");
      startRef.current = performance.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (phase === "idle" || phase === "result") {
      // 새 시도 시작 또는 초기화 후 재시작
      if (phase === "result") setTimes([]);
      startWaiting();
      return;
    }

    if (phase === "waiting") {
      clearTimer();
      setPhase("early");
      return;
    }

    if (phase === "early") {
      startWaiting();
      return;
    }

    if (phase === "ready") {
      const elapsed = Math.round(performance.now() - startRef.current);
      setLastMs(elapsed);
      const newTimes = [...times, elapsed];
      setTimes(newTimes);

      if (newTimes.length >= TOTAL_ROUNDS) {
        setPhase("result");
        const avg = Math.round(newTimes.reduce((a, b) => a + b, 0) / newTimes.length);
        setBest((prev) => {
          const newBest = prev === null ? avg : Math.min(prev, avg);
          localStorage.setItem("reaction_best", String(newBest));
          return newBest;
        });
      } else {
        startWaiting();
      }
    }
  }, [phase, times, startWaiting]);

  useEffect(() => () => clearTimer(), []);

  const avg = times.length
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : null;
  const sortedTimes = [...times].sort((a, b) => a - b);
  const median = sortedTimes.length ? sortedTimes[Math.floor(sortedTimes.length / 2)] : null;
  const spread = sortedTimes.length > 1 ? sortedTimes[sortedTimes.length - 1] - sortedTimes[0] : null;

  const style = PHASE_STYLE[phase];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
        반응속도 테스트
      </h1>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
        초록색이 되는 순간 클릭! 5회 평균으로 측정합니다.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          "5회 평균 측정",
          "기기 내 기록 저장",
          "환경별 오차 안내",
        ].map((item) => (
          <div
            key={item}
            className="px-4 py-3 rounded-lg border text-sm whitespace-nowrap"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* 진행 표시 */}
      <div className="mt-6 flex items-center gap-2">
        {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
          <div
            key={i}
            className="h-2 flex-1 rounded-full transition-colors"
            style={{
              backgroundColor: i < times.length ? "var(--color-success)" : "var(--color-border)",
            }}
          />
        ))}
        <span className="text-sm ml-2 shrink-0" style={{ color: "var(--color-text-muted)" }}>
          {times.length}/{TOTAL_ROUNDS}
        </span>
      </div>

      {/* 클릭 영역 */}
      <button
        onClick={handleClick}
        className="mt-4 w-full rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors duration-150 select-none"
        style={{
          backgroundColor: style.bg,
          color: style.text,
          minHeight: "280px",
          cursor: "pointer",
        }}
        aria-label="반응속도 테스트 클릭 영역"
      >
        {phase === "result" ? (
          <div className="text-center px-6">
            {lastMs !== null && (
              <p className="text-5xl font-bold">{lastMs}ms</p>
            )}
            <p className="mt-2 text-lg font-semibold">{avg !== null ? `평균 ${avg}ms` : ""}</p>
            <p className="mt-1 text-sm opacity-80">{avg !== null ? getRating(avg) : ""}</p>
            <p className="mt-4 text-sm opacity-70">클릭하면 다시 시작</p>
          </div>
        ) : (
          <div className="text-center px-6">
            {phase === "ready" && lastMs !== null && (
              <p className="text-4xl font-bold mb-2">{lastMs}ms</p>
            )}
            <p className="text-xl font-semibold">{style.message}</p>
          </div>
        )}
      </button>

      {/* 결과 상세 */}
      {phase === "result" && times.length > 0 && avg !== null && (
        <div
          className="mt-6 p-5 rounded-xl border"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
          aria-live="polite"
        >
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>{avg}ms</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>내 평균</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>{median !== null ? `${median}ms` : "-"}</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>중앙값</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--color-text-muted)" }}>{spread !== null ? `${spread}ms` : "-"}</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>기록 범위</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--color-success)" }}>
                {best !== null ? `${best}ms` : "-"}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>내 최고기록</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {getResultAdvice(avg)}
            </p>
            <p className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>5회 기록</p>
            <div className="flex gap-2">
              {times.map((t, i) => (
                <span
                  key={i}
                  className="flex-1 text-center text-sm py-1 rounded-md"
                  style={{
                    backgroundColor: "var(--color-bg-subtle)",
                    color: "var(--color-text)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
        * 브라우저·기기·입력 장치 환경에 따라 오차가 있을 수 있습니다. 절대값보다 같은 환경에서의 변화 추이를 보세요.
      </p>

      {/* AdSense 콘텐츠 섹션 */}
      <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          반응속도란 무엇인가요?
        </h2>
        <p>
          반응속도(반응시간, Reaction Time)는 시각·청각 자극을 인지하고 행동으로 옮기는 데 걸리는 시간입니다.
          이 페이지의 값에는 사람이 자극을 처리하고 손을 움직이는 시간뿐 아니라 화면 표시와 입력 장치의 지연도 포함됩니다.
          따라서 다른 사이트나 전문 장비의 결과와 숫자를 그대로 비교하기보다 같은 환경에서 얻은 기록을 비교해야 합니다.
        </p>
        <p className="mt-3">
          반응시간은 수면, 집중 상태, 피로, 테스트 숙련도에 따라 달라질 수 있습니다.
          기기나 입력 방식을 바꾸면 새 기준선을 만들고, 한 번의 최고기록보다 여러 날의 중앙값과 변동 폭을 확인하세요.
        </p>

        <div className="mt-5 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
          <p className="font-semibold" style={{ color: "var(--color-text)" }}>정확하게 측정하는 방법</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>가능하면 같은 기기와 같은 입력 장치로 반복 측정하세요.</li>
            <li>무선 마우스, 저전력 모드, 백그라운드 앱은 지연을 만들 수 있습니다.</li>
            <li>한 번의 최고기록보다 5회 평균과 여러 날의 추이를 비교하세요.</li>
          </ul>
        </div>

        {/* 등급 표 */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          반응속도 구간별 등급
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>반응속도</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>등급</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>해당 수준</th>
              </tr>
            </thead>
            <tbody>
              {[
                { range: "~ 180ms", grade: "매우 빠름", level: "예측 클릭 여부와 반복 재현 확인" },
                { range: "181 ~ 220ms", grade: "빠름", level: "여러 날 반복해 재현 여부 확인" },
                { range: "221 ~ 260ms", grade: "참고 구간", level: "같은 환경의 중앙값과 함께 확인" },
                { range: "261 ~ 300ms", grade: "조금 느림", level: "피로, 산만함, 기기 지연 가능" },
                { range: "301ms ~", grade: "느림", level: "컨디션이나 환경을 바꿔 재측정 권장" },
              ].map((row) => (
                <tr key={row.range}>
                  <td className="px-3 py-2 border font-mono font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-primary)" }}>{row.range}</td>
                  <td className="px-3 py-2 border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>{row.grade}</td>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)" }}>{row.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          측정 오차를 만드는 요소
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "화면 주사율", desc: "60Hz 화면은 약 16.7ms 단위로 화면이 갱신됩니다. 고주사율 화면에서는 자극을 더 빨리 볼 수 있습니다." },
            { title: "입력 장치", desc: "마우스, 터치스크린, 무선 장치마다 클릭 감지 지연이 다릅니다." },
            { title: "브라우저 상태", desc: "백그라운드 작업, 절전 모드, 탭 상태에 따라 타이머와 렌더링이 흔들릴 수 있습니다." },
            { title: "몸 상태", desc: "수면 부족, 손 온도, 스트레스, 카페인 섭취량이 결과에 영향을 줍니다." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 향상 방법 */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          반응속도를 높이는 방법
        </h3>
        <div className="space-y-3">
          {[
            { title: "수면 조건 기록", desc: "수면 부족과 피로는 주의력과 반응에 영향을 줄 수 있습니다. 수면 시간을 함께 적어 결과 변화와 비교하세요." },
            { title: "무리하지 않는 반복", desc: "짧은 세트를 같은 조건에서 반복하고 손목이나 눈이 피로해지기 전에 멈추세요." },
            { title: "정확성 우선", desc: "초록색을 확인한 뒤 누르고, 예측 클릭 횟수도 함께 기록해야 빠르면서 정확한 변화를 볼 수 있습니다." },
            { title: "환경 고정", desc: "같은 화면 주사율, 브라우저, 입력 장치를 유지하고 백그라운드 작업과 알림을 정리하세요." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <span style={{ color: "var(--color-success)" }} className="mt-0.5">✓</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
                <p className="text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          자주 묻는 질문
        </h3>
        <div className="space-y-4">
          {[
            { q: "스마트폰과 PC 결과를 비교해도 되나요?", a: "입력 방식, 화면 주사율, 브라우저 처리가 다르므로 직접 비교하기 어렵습니다. 기기별로 기준선을 따로 만들고 각 기기 안에서 변화 추이를 확인하세요." },
            { q: "기록이 매번 다른 이유는 무엇인가요?", a: "화면 갱신 시점, 입력 장치, 브라우저 상태와 집중 상태가 모두 달라질 수 있습니다. 평균과 중앙값, 최고·최저 기록의 차이를 함께 보세요." },
            { q: "한 번의 최고기록을 기준으로 봐도 되나요?", a: "최고기록은 우연이나 예측 클릭의 영향을 받기 쉽습니다. 같은 환경의 5회 기록과 여러 날의 중앙값을 기준으로 보세요." },
            { q: "이 결과로 건강 상태를 판단할 수 있나요?", a: "아니요. 이 테스트는 브라우저 기반 참고 도구이며 의료 검사나 인지 기능 평가를 대체하지 않습니다." },
          ].map((item) => (
            <div key={item.q} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
              <p className="mt-2 text-sm leading-relaxed">A. {item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>더 자세히 읽기</p>
          <p className="text-sm mb-4">
            정확한 측정 절차, 기기 지연, 14일 기록법을 주제별 가이드에서 확인하세요.
          </p>
          <Link
            href="/guides/reaction-speed"
            className="inline-block px-5 py-3 rounded-lg font-semibold text-sm"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
          >
            반응속도 가이드 시리즈 보기 →
          </Link>
        </div>
      </section>

      <OtherToolsNav currentHref="/reaction" />
    </div>
  );
}

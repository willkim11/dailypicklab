"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import OtherToolsNav from "@/components/OtherToolsNav";

type Phase = "idle" | "waiting" | "ready" | "result" | "early";

const TOTAL_ROUNDS = 5;
const AVERAGE_MS = 250;

function getRating(ms: number): string {
  if (ms < 180) return "🚀 번개 같은 반응속도!";
  if (ms < 220) return "⚡ 매우 빠릅니다!";
  if (ms < 260) return "👍 평균보다 빠릅니다";
  if (ms < 300) return "😊 평균 수준입니다";
  return "🐢 조금 느리네요, 다시 도전!";
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

  const style = PHASE_STYLE[phase];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
        반응속도 테스트
      </h1>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
        초록색이 되는 순간 클릭! 5회 평균으로 측정합니다.
      </p>

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
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>{avg}ms</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>내 평균</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--color-text-muted)" }}>{AVERAGE_MS}ms</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>일반 평균</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--color-success)" }}>
                {best !== null ? `${best}ms` : "-"}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>내 최고기록</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
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
        * 브라우저·기기 환경에 따라 ±50ms 오차가 있을 수 있습니다.
      </p>

      {/* AdSense 콘텐츠 섹션 */}
      <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          반응속도란 무엇인가요?
        </h2>
        <p>
          반응속도(반응시간, Reaction Time)는 시각·청각 자극을 인지하고 행동으로 옮기는 데 걸리는 시간입니다.
          일반 성인의 평균 시각 반응속도는 약 200~250ms(0.2~0.25초)입니다.
          뇌에서 자극을 처리하고 근육에 신호를 보내는 과정 전체가 이 시간 안에 일어납니다.
        </p>
        <p className="mt-3">
          반응속도는 수면의 질, 카페인 섭취 여부, 집중력, 피로도, 연습량에 따라 크게 달라집니다.
          격투기 선수나 e스포츠 프로게이머는 지속적인 훈련을 통해 150ms 이하의 반응속도를 보이기도 합니다.
        </p>

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
                { range: "~ 150ms", grade: "최상위 1%", level: "프로 스포츠 선수, e스포츠 프로게이머" },
                { range: "151 ~ 180ms", grade: "상위 10%", level: "운동을 꾸준히 하는 활동적인 사람" },
                { range: "181 ~ 220ms", grade: "평균 이상", level: "집중력이 높고 건강한 성인" },
                { range: "221 ~ 260ms", grade: "평균", level: "일반 성인 대부분이 이 범위" },
                { range: "261 ~ 300ms", grade: "평균 이하", level: "피로하거나 집중력이 낮은 상태" },
                { range: "301ms ~", grade: "느림", level: "수면 부족, 피로, 음주 후 상태에 해당" },
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

        {/* 향상 방법 */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          반응속도를 높이는 방법
        </h3>
        <div className="space-y-3">
          {[
            { title: "충분한 수면", desc: "수면 부족은 반응속도를 최대 30% 저하시킵니다. 성인 기준 7~9시간의 수면이 권장됩니다." },
            { title: "규칙적인 운동", desc: "유산소 운동은 뇌 혈류를 개선하고 신경 전달 속도를 높입니다. 줄넘기, 배드민턴 같은 순발력 운동이 특히 효과적입니다." },
            { title: "반응 훈련 게임", desc: "이 테스트처럼 반복적인 시각 자극 반응 훈련은 뇌와 근육 사이의 신경 연결을 강화합니다." },
            { title: "집중력 유지", desc: "테스트 직전 2~3번 심호흡을 하면 집중력이 높아져 더 빠른 반응이 가능합니다." },
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
            { q: "스마트폰과 PC 중 어디서 테스트하는 게 더 빠르게 나오나요?", a: "일반적으로 PC 마우스 클릭이 스마트폰 터치보다 5~15ms 빠르게 측정됩니다. 터치스크린은 클릭 감지 알고리즘이 추가되어 약간의 처리 지연이 있습니다." },
            { q: "결과에 ±50ms 오차가 있다고 하는데 왜 그런가요?", a: "브라우저의 JavaScript 타이머 정밀도, 화면 주사율(60Hz/120Hz), OS 스케줄링 등의 요인으로 오차가 발생합니다. 이 테스트는 절대적인 수치보다 자신의 상태 변화를 모니터링하는 용도로 활용하세요." },
            { q: "나이가 들면 반응속도도 느려지나요?", a: "네, 일반적으로 25세 이후부터 반응속도가 서서히 느려집니다. 하지만 규칙적인 운동과 인지 훈련으로 저하 속도를 크게 늦출 수 있습니다." },
            { q: "커피를 마시면 반응속도가 빨라지나요?", a: "카페인은 중추신경계를 자극해 단기적으로 반응속도를 5~10ms 향상시킬 수 있습니다. 하지만 과다 섭취 시 오히려 불안과 집중력 저하로 역효과가 날 수 있습니다." },
          ].map((item) => (
            <div key={item.q} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
              <p className="mt-2 text-sm leading-relaxed">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <OtherToolsNav currentHref="/reaction" />
    </div>
  );
}

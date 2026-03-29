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
          반응속도(반응시간)는 자극을 인지하고 행동으로 옮기는 데 걸리는 시간입니다.
          일반 성인의 평균 시각 반응속도는 약 200~250ms입니다. 격투기 선수나 e스포츠 프로게이머는
          150ms 이하의 반응속도를 보이기도 합니다.
        </p>
        <p className="mt-3">
          반응속도는 수면, 카페인 섭취 여부, 집중력, 피로도에 따라 달라집니다.
          충분한 수면과 가벼운 스트레칭이 반응속도 향상에 도움이 된다고 알려져 있습니다.
        </p>
      </section>

      <OtherToolsNav currentHref="/reaction" />
    </div>
  );
}

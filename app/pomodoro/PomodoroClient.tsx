"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import OtherToolsNav from "@/components/OtherToolsNav";

type Mode = "focus" | "break";
type Status = "idle" | "running" | "paused" | "done";

const DURATIONS: Record<Mode, number> = {
  focus: 25 * 60,
  break: 5 * 60,
};

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getCircumference(r: number) {
  return 2 * Math.PI * r;
}

export default function PomodoroClient() {
  const [mode, setMode] = useState<Mode>("focus");
  const [status, setStatus] = useState<Status>("idle");
  const [remaining, setRemaining] = useState(DURATIONS.focus);
  const [cycles, setCycles] = useState(0);
  const [notifGranted, setNotifGranted] = useState(false);

  const startTimeRef = useRef<number>(0);
  const startRemainingRef = useRef<number>(DURATIONS.focus);
  const rafRef = useRef<number>(0);

  // 탭 타이틀 업데이트
  useEffect(() => {
    if (status === "running") {
      document.title = `${formatTime(remaining)} — ${mode === "focus" ? "집중" : "휴식"} | Daily Pick Lab`;
    } else {
      document.title = "뽀모도로 타이머 | Daily Pick Lab";
    }
    return () => { document.title = "Daily Pick Lab"; };
  }, [remaining, status, mode]);

  // Date.now() 기반 드리프트 없는 타이머
  const tick = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const newRemaining = Math.max(0, startRemainingRef.current - elapsed);
    setRemaining(newRemaining);

    if (newRemaining === 0) {
      setStatus("done");
      if (mode === "focus") setCycles((c) => c + 1);
      // 브라우저 알림
      if (notifGranted) {
        new Notification(mode === "focus" ? "🍅 집중 시간 완료!" : "☕ 휴식 시간 완료!", {
          body: mode === "focus" ? "잠깐 쉬어가세요." : "다시 집중할 준비가 됐나요?",
        });
      }
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [mode, notifGranted]);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    startRemainingRef.current = remaining;
    setStatus("running");
    rafRef.current = requestAnimationFrame(tick);
  }, [remaining, tick]);

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    startTimeRef.current = Date.now();
    startRemainingRef.current = remaining;
    setStatus("running");
    rafRef.current = requestAnimationFrame(tick);
  }, [remaining, tick]);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setStatus("idle");
    setRemaining(DURATIONS[mode]);
  }, [mode]);

  const switchMode = useCallback((newMode: Mode) => {
    cancelAnimationFrame(rafRef.current);
    setMode(newMode);
    setStatus("idle");
    setRemaining(DURATIONS[newMode]);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // 알림 권한 요청 (버튼 클릭 시에만)
  async function requestNotification() {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setNotifGranted(result === "granted");
  }

  // SVG 원형 프로그레스
  const R = 90;
  const CIRC = getCircumference(R);
  const total = DURATIONS[mode];
  const progress = remaining / total;
  const dashOffset = CIRC * (1 - progress);

  const modeColor = mode === "focus" ? "var(--color-primary)" : "var(--color-success)";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
        뽀모도로 타이머
      </h1>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
        25분 집중, 5분 휴식. 사이클을 반복해 집중력을 높이세요.
      </p>

      {/* 모드 전환 */}
      <div className="mt-8 flex gap-2">
        {(["focus", "break"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className="px-5 py-2 rounded-full text-sm font-medium border transition-colors"
            style={{
              backgroundColor: mode === m ? modeColor : "var(--color-bg)",
              color: mode === m ? "white" : "var(--color-text-muted)",
              borderColor: mode === m ? modeColor : "var(--color-border)",
            }}
          >
            {m === "focus" ? "🍅 집중" : "☕ 휴식"}
          </button>
        ))}
        {cycles > 0 && (
          <span className="ml-auto text-sm self-center" style={{ color: "var(--color-text-muted)" }}>
            완료 {cycles}사이클
          </span>
        )}
      </div>

      {/* 타이머 원형 */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative">
          <svg width="220" height="220" className="-rotate-90">
            <circle
              cx="110" cy="110" r={R}
              fill="none"
              strokeWidth="10"
              stroke="var(--color-border)"
            />
            <circle
              cx="110" cy="110" r={R}
              fill="none"
              strokeWidth="10"
              stroke={modeColor}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.5s linear" }}
            />
          </svg>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            aria-live="polite"
            aria-label={`남은 시간 ${formatTime(remaining)}`}
          >
            <span className="text-5xl font-bold tabular-nums" style={{ color: "var(--color-text)" }}>
              {formatTime(remaining)}
            </span>
            <span className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              {mode === "focus" ? "집중 시간" : "휴식 시간"}
            </span>
          </div>
        </div>

        {/* 완료 메시지 */}
        {status === "done" && (
          <p className="mt-4 text-lg font-semibold" style={{ color: modeColor }}>
            {mode === "focus" ? "🎉 집중 완료! 잠깐 쉬어가세요." : "✅ 휴식 끝! 다시 집중할 준비됐나요?"}
          </p>
        )}

        {/* 컨트롤 버튼 */}
        <div className="mt-6 flex gap-3">
          {status === "idle" && (
            <button
              onClick={start}
              className="px-8 py-3 rounded-lg font-semibold text-white min-h-[44px]"
              style={{ backgroundColor: modeColor }}
            >
              시작
            </button>
          )}
          {status === "running" && (
            <button
              onClick={pause}
              className="px-8 py-3 rounded-lg font-semibold text-white min-h-[44px]"
              style={{ backgroundColor: "var(--color-warning)" }}
            >
              일시정지
            </button>
          )}
          {status === "paused" && (
            <button
              onClick={resume}
              className="px-8 py-3 rounded-lg font-semibold text-white min-h-[44px]"
              style={{ backgroundColor: modeColor }}
            >
              재개
            </button>
          )}
          {status === "done" && (
            <button
              onClick={() => switchMode(mode === "focus" ? "break" : "focus")}
              className="px-8 py-3 rounded-lg font-semibold text-white min-h-[44px]"
              style={{ backgroundColor: modeColor }}
            >
              {mode === "focus" ? "휴식 시작" : "집중 시작"}
            </button>
          )}
          {status !== "idle" && (
            <button
              onClick={reset}
              className="px-5 py-3 rounded-lg font-semibold border min-h-[44px]"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            >
              리셋
            </button>
          )}
        </div>

        {/* 알림 권한 버튼 */}
        {!notifGranted && typeof window !== "undefined" && "Notification" in window && Notification.permission !== "granted" && (
          <button
            onClick={requestNotification}
            className="mt-4 text-sm underline"
            style={{ color: "var(--color-text-muted)" }}
          >
            🔔 사이클 완료 알림 받기
          </button>
        )}
      </div>

      {/* AdSense 콘텐츠 섹션 */}
      <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          뽀모도로 기법이란?
        </h2>
        <p>
          뽀모도로(Pomodoro) 기법은 1980년대 프란체스코 치릴로가 개발한 시간 관리 방법입니다.
          25분 집중 후 5분 휴식을 1사이클로 하며, 4사이클 후 15~30분의 긴 휴식을 갖습니다.
        </p>
        <p className="mt-3">
          짧은 집중 단위를 반복하면 번아웃 없이 오래 집중할 수 있습니다.
          휴식 중에는 스트레칭이나 물 마시기 같은 가벼운 활동을 추천합니다.
        </p>
      </section>

      <OtherToolsNav currentHref="/pomodoro" />
    </div>
  );
}

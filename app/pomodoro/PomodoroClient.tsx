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
          뽀모도로(Pomodoro) 기법은 1980년대 이탈리아의 프란체스코 치릴로(Francesco Cirillo)가 대학생 시절 개발한 시간 관리 방법입니다.
          당시 그가 사용한 토마토 모양 주방 타이머(이탈리아어로 '뽀모도로')에서 이름을 따왔습니다.
          25분 집중 후 5분 휴식을 1 뽀모도로(사이클)로 하며, 4사이클 후 15~30분의 긴 휴식을 갖습니다.
        </p>
        <p className="mt-3">
          인간의 집중력은 연속으로 지속하기 어렵습니다. 짧은 집중 단위를 반복하면 번아웃 없이 오래 집중할 수 있고,
          타이머 소리가 주는 마감 압박감이 집중력을 높이는 데 도움을 줍니다.
        </p>

        {/* 단계별 사용법 */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          뽀모도로 기법 단계별 사용법
        </h3>
        <div className="space-y-3">
          {[
            { step: "1", title: "할 일 목록 작성", desc: "오늘 해야 할 작업을 구체적으로 적어두세요. 큰 작업은 여러 뽀모도로로 나누고, 작은 작업들은 묶어서 처리합니다." },
            { step: "2", title: "25분 타이머 시작", desc: "스마트폰, SNS, 이메일 알림을 모두 끄세요. 이 25분 동안은 오직 하나의 작업에만 집중합니다. 방해 요소가 생기면 메모만 해두고 나중에 처리합니다." },
            { step: "3", title: "5분 짧은 휴식", desc: "타이머가 울리면 반드시 자리에서 일어나세요. 스트레칭, 물 마시기, 창밖 바라보기 등 화면에서 눈을 떼는 활동을 권장합니다. 스마트폰 사용은 피하세요." },
            { step: "4", title: "4사이클 후 긴 휴식", desc: "4번의 뽀모도로를 완료하면 15~30분의 긴 휴식을 취하세요. 산책, 간식 등 완전히 다른 활동으로 두뇌를 리셋합니다." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ backgroundColor: "var(--color-primary)", color: "white" }}
              >
                {item.step}
              </span>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
                <p className="text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 효과 */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          뽀모도로 기법의 효과
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "🎯", title: "집중력 향상", desc: "명확한 시간 제한이 '파킨슨 법칙(일은 주어진 시간을 가득 채운다)'을 방지합니다." },
            { icon: "🧠", title: "피로 감소", desc: "규칙적인 휴식으로 정신적 피로를 최소화하며 하루 종일 생산성을 유지할 수 있습니다." },
            { icon: "📊", title: "시간 파악", desc: "작업이 얼마나 걸리는지 뽀모도로 단위로 파악할 수 있어 일정 계획이 정확해집니다." },
            { icon: "✅", title: "성취감 증가", desc: "25분마다 한 사이클 완료라는 작은 성공이 쌓이며 동기부여가 유지됩니다." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.icon} {item.title}</p>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          자주 묻는 질문
        </h3>
        <div className="space-y-4">
          {[
            { q: "25분이 너무 짧게 느껴져요. 더 늘려도 되나요?", a: "네. 뽀모도로 기법의 핵심은 집중과 휴식의 리듬이지, 반드시 25분일 필요는 없습니다. 처음에는 25분으로 시작하고 익숙해지면 50분/10분 비율도 많이 사용됩니다. 자신에게 맞는 주기를 찾는 것이 중요합니다." },
            { q: "중간에 방해를 받으면 어떻게 하나요?", a: "긴급한 방해라면 뽀모도로를 취소하고 처음부터 다시 시작하세요. 나중에 처리해도 되는 방해라면 빠르게 메모하고 집중을 유지하세요. 취소된 뽀모도로는 집중 시간으로 카운트하지 않습니다." },
            { q: "휴식 시간에 스마트폰을 봐도 되나요?", a: "권장하지 않습니다. 스마트폰 사용은 뇌를 쉬게 하지 않습니다. 오히려 시각적·인지적 자극이 계속되어 다음 집중 시간에 악영향을 줄 수 있습니다. 진짜 휴식은 화면에서 눈을 떼는 것입니다." },
            { q: "공부와 업무 중 어디에 더 효과적인가요?", a: "둘 다 효과적이지만, 특히 단일 작업에 긴 집중이 필요한 코딩, 글쓰기, 독서, 시험 공부에 탁월합니다. 반면 회의나 협업이 많은 업무 환경에서는 주변 동의가 필요할 수 있습니다." },
          ].map((item) => (
            <div key={item.q} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
              <p className="mt-2 text-sm leading-relaxed">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <OtherToolsNav currentHref="/pomodoro" />
    </div>
  );
}

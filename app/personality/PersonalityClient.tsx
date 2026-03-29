"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, calculateType, type Direction } from "@/lib/personality";

const STORAGE_KEY = "personality_progress";

export default function PersonalityClient() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Direction>>({});

  // localStorage에서 진행상황 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrent(parsed.current || 0);
      }
    } catch {
      // 무시
    }
  }, []);

  function handleAnswer(direction: Direction) {
    const q = QUESTIONS[current];
    const newAnswers = { ...answers, [q.id]: direction };
    const newCurrent = current + 1;

    setAnswers(newAnswers);

    // localStorage 저장
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers: newAnswers, current: newCurrent })
    );

    if (newCurrent >= QUESTIONS.length) {
      const type = calculateType(newAnswers);
      localStorage.removeItem(STORAGE_KEY);
      router.push(`/personality/result/${type}`);
    } else {
      setCurrent(newCurrent);
    }
  }

  function handleBack() {
    if (current === 0) return;
    const newCurrent = current - 1;
    const prevQ = QUESTIONS[newCurrent];
    const newAnswers = { ...answers };
    delete newAnswers[prevQ.id];
    setCurrent(newCurrent);
    setAnswers(newAnswers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: newAnswers, current: newCurrent }));
  }

  function handleReset() {
    setCurrent(0);
    setAnswers({});
    localStorage.removeItem(STORAGE_KEY);
  }

  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
          성격 유형 테스트
        </h1>
        {current > 0 && (
          <button
            onClick={handleReset}
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            처음부터
          </button>
        )}
      </div>

      {/* 프로그레스 바 */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="flex-1 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--color-border)" }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemax={QUESTIONS.length}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: "var(--color-primary)" }}
          />
        </div>
        <span className="text-sm shrink-0" style={{ color: "var(--color-text-muted)" }}>
          {current}/{QUESTIONS.length}
        </span>
      </div>

      {/* 질문 카드 */}
      <div
        className="p-8 rounded-2xl border"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
      >
        <p className="text-sm font-medium mb-4" style={{ color: "var(--color-text-muted)" }}>
          질문 {current + 1}
        </p>
        <p className="text-xl font-semibold leading-snug mb-8" style={{ color: "var(--color-text)" }}>
          {q.text}
        </p>

        <div className="flex flex-col gap-3">
          {[q.optionA, q.optionB].map((opt) => (
            <button
              key={opt.direction}
              onClick={() => handleAnswer(opt.direction)}
              className="w-full text-left px-5 py-4 rounded-xl border font-medium transition-all duration-150 min-h-[56px]"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
                backgroundColor: "var(--color-bg)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.backgroundColor = "var(--color-bg)";
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* 뒤로가기 */}
      {current > 0 && (
        <button
          onClick={handleBack}
          className="mt-4 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          ← 이전 질문
        </button>
      )}
    </div>
  );
}

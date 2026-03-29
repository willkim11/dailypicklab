"use client";

import { useState } from "react";
import OtherToolsNav from "@/components/OtherToolsNav";

// 실제 로또 번호 범위별 색상
function getBallColor(n: number): string {
  if (n <= 10) return "#FBC400";
  if (n <= 20) return "#69C8F2";
  if (n <= 30) return "#FF7272";
  if (n <= 40) return "#AAAAAA";
  return "#B0D840";
}

function pickNumbers(): number[] {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 6).sort((a, b) => a - b);
}

interface LottoBall {
  number: number;
  isBonus?: boolean;
}

interface GameResult {
  numbers: number[];
  bonus: number;
}

function LottoBallComponent({ number, isBonus = false, animDelay = 0 }: LottoBall & { animDelay?: number }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
      style={{
        backgroundColor: getBallColor(number),
        animation: `popIn 0.3s ease-out ${animDelay}ms both`,
        outline: isBonus ? "2px dashed #666" : "none",
        outlineOffset: "2px",
      }}
    >
      {number}
    </div>
  );
}

const GAME_COUNT_OPTIONS = [1, 5, 10];

// 지난 회차 당첨번호 (수동 업데이트)
const RECENT_RESULTS = [
  { round: 1172, date: "2025-03-22", numbers: [3, 14, 18, 25, 31, 40], bonus: 7 },
  { round: 1171, date: "2025-03-15", numbers: [5, 11, 22, 27, 33, 42], bonus: 19 },
  { round: 1170, date: "2025-03-08", numbers: [2, 8, 17, 24, 36, 44], bonus: 12 },
];

export default function LottoClient() {
  const [gameCount, setGameCount] = useState(1);
  const [results, setResults] = useState<GameResult[]>([]);
  const [animKey, setAnimKey] = useState(0);

  function handleDraw() {
    const newResults = Array.from({ length: gameCount }, () => {
      const all = Array.from({ length: 45 }, (_, i) => i + 1);
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
      const numbers = all.slice(0, 6).sort((a, b) => a - b);
      const bonus = all[6];
      return { numbers, bonus };
    });
    setResults(newResults);
    setAnimKey((k) => k + 1);
  }

  return (
    <>
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
          로또 번호 추첨기
        </h1>
        <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
          1~45 중 6개 번호를 무작위로 추첨합니다.
        </p>

        <div
          className="mt-8 p-6 rounded-xl border"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
        >
          {/* 게임 수 선택 */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>
              게임 수
            </p>
            <div className="flex gap-2">
              {GAME_COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setGameCount(n)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                  style={{
                    backgroundColor: gameCount === n ? "var(--color-primary)" : "var(--color-bg)",
                    color: gameCount === n ? "white" : "var(--color-text)",
                    borderColor: gameCount === n ? "var(--color-primary)" : "var(--color-border)",
                  }}
                >
                  {n}게임
                </button>
              ))}
            </div>
          </div>

          {/* 추첨 버튼 */}
          <button
            onClick={handleDraw}
            className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            추첨하기
          </button>

          {/* 결과 */}
          {results.length > 0 && (
            <div className="mt-6 space-y-4" aria-live="polite" key={animKey}>
              {results.map((game, i) => (
                <div key={i}>
                  {results.length > 1 && (
                    <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-muted)" }}>
                      {String.fromCharCode(65 + i)}조
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {game.numbers.map((n, j) => (
                      <LottoBallComponent key={n} number={n} animDelay={j * 150} />
                    ))}
                    <span className="text-sm mx-1" style={{ color: "var(--color-text-muted)" }}>+</span>
                    <LottoBallComponent number={game.bonus} isBonus animDelay={6 * 150} />
                    <span className="text-xs ml-1" style={{ color: "var(--color-text-muted)" }}>보너스</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 지난 회차 당첨번호 */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
            최근 당첨번호
          </h2>
          <div className="space-y-3">
            {RECENT_RESULTS.map((r) => (
              <div
                key={r.round}
                className="p-4 rounded-xl border"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                    제 {r.round}회
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.date}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {r.numbers.map((n) => (
                    <LottoBallComponent key={n} number={n} />
                  ))}
                  <span className="text-sm mx-1" style={{ color: "var(--color-text-muted)" }}>+</span>
                  <LottoBallComponent number={r.bonus} isBonus />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense 콘텐츠 섹션 */}
        <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
          <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
            로또 번호에 대해 알아보기
          </h2>
          <p>
            로또 6/45는 1~45 중 6개 번호를 맞히는 복권으로, 1등 당첨 확률은 약 814만분의 1입니다.
            이 추첨기는 동행복권과 동일한 방식으로 숫자를 무작위 추출합니다.
          </p>
          <p className="mt-3">
            자주 나오는 번호나 패턴이 있다고 알려져 있지만, 각 회차는 독립 시행으로
            이전 결과와 무관합니다. 즐거운 놀이로만 활용하세요.
          </p>
          <p className="mt-3">
            당첨번호는 매주 토요일 오후 8시 45분 MBC에서 생중계됩니다. 이 페이지의 최근 당첨번호는
            수동으로 업데이트됩니다.
          </p>
        </section>

        <OtherToolsNav currentHref="/lotto" />
      </div>
    </>
  );
}

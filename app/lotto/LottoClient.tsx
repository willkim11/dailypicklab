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
  { round: 1219, date: "2026-04-11", numbers: [1, 2, 15, 28, 39, 45], bonus: 31 },
  { round: 1218, date: "2026-04-04", numbers: [3, 28, 31, 32, 42, 45], bonus: 25 },
  { round: 1217, date: "2026-03-28", numbers: [8, 10, 15, 20, 29, 31], bonus: 41 },
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

          {/* 등수별 당첨 조건 표 */}
          <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
            로또 등수별 당첨 조건과 확률
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                  <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>등수</th>
                  <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>당첨 조건</th>
                  <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>당첨 확률</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: "1등", cond: "6개 번호 일치", prob: "1/8,145,060 (약 814만분의 1)" },
                  { rank: "2등", cond: "5개 + 보너스 번호 일치", prob: "1/1,357,510" },
                  { rank: "3등", cond: "5개 번호 일치", prob: "1/35,724" },
                  { rank: "4등", cond: "4개 번호 일치", prob: "1/733 (5만원 고정)" },
                  { rank: "5등", cond: "3개 번호 일치", prob: "1/45 (5천원 고정)" },
                ].map((row) => (
                  <tr key={row.rank}>
                    <td className="px-3 py-2 border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>{row.rank}</td>
                    <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)" }}>{row.cond}</td>
                    <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)" }}>{row.prob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 번호 선택 방법 */}
          <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
            번호 선택 방법 비교
          </h3>
          <p>
            로또 번호를 선택하는 방법은 크게 <strong style={{ color: "var(--color-text)" }}>자동(QR)</strong>과 <strong style={{ color: "var(--color-text)" }}>수동(직접 선택)</strong>으로 나뉩니다.
            통계적으로 두 방법의 당첨 확률은 동일합니다. 각 회차는 완전히 독립된 시행이므로 '자주 나오는 번호'도 다음 회차 확률에 영향을 주지 않습니다.
          </p>
          <p className="mt-3">
            생일, 기념일 등 의미 있는 날짜를 번호로 사용하면 1~31 범위에 번호가 집중됩니다.
            만약 당첨된다면 같은 번호를 선택한 사람이 많아 1등 당첨금이 분산될 수 있습니다.
            이 무작위 추첨기는 1~45 범위에서 균등하게 번호를 선택해 이 편향을 피할 수 있습니다.
          </p>

          {/* FAQ */}
          <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
            자주 묻는 질문
          </h3>
          <div className="space-y-4">
            {[
              { q: "로또는 몇 살부터 구매할 수 있나요?", a: "만 19세 이상 성인만 구매할 수 있습니다. 미성년자는 복권 구매가 법적으로 금지되어 있습니다." },
              { q: "당첨금에 세금이 붙나요?", a: "5만원 이하(5등)는 비과세입니다. 200만원 이하는 22% 원천징수, 200만원 초과는 33% 원천징수됩니다. 1등처럼 고액 당첨 시에는 종합소득세 신고도 필요할 수 있습니다." },
              { q: "당첨금 수령 기간은 얼마나 되나요?", a: "당첨일로부터 1년 이내에 수령해야 합니다. 기간이 지나면 당첨금은 복권기금으로 귀속됩니다. 반드시 당첨 복권을 잘 보관하세요." },
              { q: "온라인으로도 로또를 살 수 있나요?", a: "동행복권 홈페이지 또는 앱에서 회원 가입 후 구매할 수 있습니다. 1인당 1주일에 최대 5만원까지 구매 가능합니다." },
              { q: "이 추첨기는 실제 당첨번호와 관계가 있나요?", a: "아닙니다. 이 추첨기는 오직 재미를 위한 시뮬레이터입니다. 생성된 번호는 실제 추첨 결과와 완전히 무관하며, 당첨을 보장하지 않습니다." },
            ].map((item) => (
              <div key={item.q} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
                <p className="mt-2 text-sm leading-relaxed">A. {item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <OtherToolsNav currentHref="/lotto" />
      </div>
    </>
  );
}

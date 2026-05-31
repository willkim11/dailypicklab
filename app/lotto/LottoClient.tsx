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

function randomIndex(max: number): number {
  if (typeof crypto === "undefined" || !crypto.getRandomValues) {
    return Math.floor(Math.random() * max);
  }

  const limit = Math.floor(0xffffffff / max) * max;
  const value = new Uint32Array(1);

  do {
    crypto.getRandomValues(value);
  } while (value[0] >= limit);

  return value[0] % max;
}

function pickNumbers(): number[] {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
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
const INITIAL_RECENT_RESULT_COUNT = 3;
const RECENT_RESULTS_PAGE_SIZE = 5;

// 지난 회차 당첨번호 (수동 업데이트)
const RECENT_RESULTS = [
  { round: 1226, date: "2026-05-30", numbers: [4, 6, 13, 17, 26, 28], bonus: 41 },
  { round: 1225, date: "2026-05-23", numbers: [8, 9, 19, 25, 41, 42], bonus: 33 },
  { round: 1224, date: "2026-05-16", numbers: [9, 18, 21, 27, 44, 45], bonus: 28 },
  { round: 1223, date: "2026-05-09", numbers: [16, 18, 20, 32, 33, 39], bonus: 26 },
  { round: 1222, date: "2026-05-02", numbers: [4, 11, 17, 22, 32, 41], bonus: 34 },
  { round: 1221, date: "2026-04-25", numbers: [6, 13, 18, 28, 30, 36], bonus: 9 },
  { round: 1220, date: "2026-04-18", numbers: [2, 22, 25, 28, 34, 43], bonus: 16 },
  { round: 1219, date: "2026-04-11", numbers: [1, 2, 15, 28, 39, 45], bonus: 31 },
  { round: 1218, date: "2026-04-04", numbers: [3, 28, 31, 32, 42, 45], bonus: 25 },
  { round: 1217, date: "2026-03-28", numbers: [8, 10, 15, 20, 29, 31], bonus: 41 },
];

const SUMMARY_CARDS = [
  "1등 확률 1/8,145,060",
  "회차별 독립 시행",
  "당첨 예측 아님",
];

const PROBABILITY_NOTES = [
  {
    title: "모든 조합의 확률은 같습니다",
    desc: "1, 2, 3, 4, 5, 6처럼 눈에 띄는 조합도 다른 임의의 조합과 1등 확률은 같습니다. 다만 많은 사람이 고르는 조합은 당첨 시 나눠 받을 가능성이 커질 수 있습니다.",
  },
  {
    title: "지난 번호는 다음 회차에 영향을 주지 않습니다",
    desc: "최근에 많이 나온 번호, 오래 나오지 않은 번호, 특정 색상 구간은 다음 회차 확률을 높이지 않습니다. 각 추첨은 이전 결과와 분리된 독립 시행입니다.",
  },
  {
    title: "자동과 수동의 당첨 확률은 동일합니다",
    desc: "자동은 기계가 번호를 고르고 수동은 사람이 고를 뿐입니다. 번호 조합이 같다면 선택 방식과 관계없이 확률은 동일합니다.",
  },
];

const MYTHS = [
  { myth: "오랫동안 안 나온 번호는 곧 나온다", truth: "각 번호의 다음 회차 출현 가능성은 과거 미출현 기간과 무관합니다." },
  { myth: "연속 번호는 나올 가능성이 낮다", truth: "특정 조합의 확률은 모두 같습니다. 다만 사람들이 꺼리거나 몰리는 조합은 당첨금 분배에 영향을 줄 수 있습니다." },
  { myth: "최근 당첨번호와 비슷하게 고르면 유리하다", truth: "이전 회차와 비슷한 패턴이 다음 결과를 예측해주지는 않습니다." },
];

const RESPONSIBLE_CHECKLIST = [
  "생활비, 대출금, 카드값처럼 필요한 돈으로 구매하지 않기",
  "일주일 구매 금액을 미리 정하고 넘기지 않기",
  "당첨을 기대 수익이 아니라 오락 비용으로 바라보기",
  "미성년자 구매 금지와 구매 한도 등 공식 규정 확인하기",
];

function countNumbersByRange() {
  return RECENT_RESULTS.flatMap((result) => result.numbers).reduce(
    (acc, number) => {
      if (number <= 10) acc["1~10"] += 1;
      else if (number <= 20) acc["11~20"] += 1;
      else if (number <= 30) acc["21~30"] += 1;
      else if (number <= 40) acc["31~40"] += 1;
      else acc["41~45"] += 1;
      return acc;
    },
    { "1~10": 0, "11~20": 0, "21~30": 0, "31~40": 0, "41~45": 0 },
  );
}

export default function LottoClient() {
  const [gameCount, setGameCount] = useState(1);
  const [results, setResults] = useState<GameResult[]>([]);
  const [animKey, setAnimKey] = useState(0);
  const [showAllRecentResults, setShowAllRecentResults] = useState(false);
  const [recentResultsPage, setRecentResultsPage] = useState(0);

  const totalRecentResultPages = Math.ceil(RECENT_RESULTS.length / RECENT_RESULTS_PAGE_SIZE);
  const visibleRecentResults = showAllRecentResults
    ? RECENT_RESULTS.slice(
        recentResultsPage * RECENT_RESULTS_PAGE_SIZE,
        (recentResultsPage + 1) * RECENT_RESULTS_PAGE_SIZE,
      )
    : RECENT_RESULTS.slice(0, INITIAL_RECENT_RESULT_COUNT);
  const recentRangeCounts = countNumbersByRange();

  function handleDraw() {
    const newResults = Array.from({ length: gameCount }, () => {
      return { numbers: pickNumbers() };
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
          1~45 중 6개 번호를 무작위로 추첨하고, 로또 확률을 함께 이해합니다.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {SUMMARY_CARDS.map((item) => (
            <div
              key={item}
              className="rounded-lg border px-4 py-3 text-sm whitespace-nowrap"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
            >
              {item}
            </div>
          ))}
        </div>

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
                    color: gameCount === n ? "var(--color-on-primary)" : "var(--color-text)",
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
            className="w-full py-3 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
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
            {visibleRecentResults.map((r) => (
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
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {RECENT_RESULTS.length > INITIAL_RECENT_RESULT_COUNT && (
              <button
                type="button"
                onClick={() => {
                  setShowAllRecentResults((current) => !current);
                  setRecentResultsPage(0);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                  color: "var(--color-text)",
                }}
              >
                {showAllRecentResults ? "접기" : "더보기"}
              </button>
            )}

            {showAllRecentResults && totalRecentResultPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRecentResultsPage((page) => Math.max(0, page - 1))}
                  disabled={recentResultsPage === 0}
                  className="px-3 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                >
                  이전
                </button>
                <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {recentResultsPage + 1} / {totalRecentResultPages}
                </span>
                <button
                  type="button"
                  onClick={() => setRecentResultsPage((page) => Math.min(totalRecentResultPages - 1, page + 1))}
                  disabled={recentResultsPage >= totalRecentResultPages - 1}
                  className="px-3 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
            최근 회차 번호 분포 보기
          </h2>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            아래 분포는 최근 {RECENT_RESULTS.length}개 회차의 본 번호만 단순 집계한 참고 자료입니다.
            다음 회차 결과를 예측하는 근거로 사용할 수 없습니다.
          </p>
          <div className="space-y-3">
            {Object.entries(recentRangeCounts).map(([range, count]) => {
              const width = `${Math.max(8, (count / RECENT_RESULTS.length / 6) * 100)}%`;
              return (
                <div key={range}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span style={{ color: "var(--color-text)" }}>{range}</span>
                    <span style={{ color: "var(--color-text-muted)" }}>{count}회</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: "var(--color-border)" }}>
                    <div className="h-2 rounded-full" style={{ width, backgroundColor: "var(--color-primary)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AdSense 콘텐츠 섹션 */}
        <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
          <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
            로또 확률을 먼저 이해하기
          </h2>
          <p>
            로또 6/45는 1~45 중 6개 번호를 맞히는 복권으로, 1등 당첨 확률은 약 814만분의 1입니다.
            이 추첨기는 브라우저에서 6개 번호를 무작위로 뽑아보는 시뮬레이터이며, 실제 당첨을 예측하거나 보장하지 않습니다.
          </p>
          <p className="mt-3">
            자주 나오는 번호나 패턴이 있다고 알려져 있지만, 각 회차는 독립 시행으로
            이전 결과와 무관합니다. 즐거운 놀이로만 활용하세요.
          </p>
          <p className="mt-3">
            당첨번호는 매주 토요일 오후 8시 45분 MBC에서 생중계됩니다. 이 페이지의 최근 당첨번호는
            수동으로 업데이트됩니다.
          </p>

          <div className="mt-6 space-y-3">
            {PROBABILITY_NOTES.map((item) => (
              <div key={item.title} className="rounded-xl border p-5" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

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
            흔한 번호 선택 오해
          </h3>
          <div className="space-y-3">
            {MYTHS.map((item) => (
              <div key={item.myth} className="rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>오해: {item.myth}</p>
                <p className="mt-2 text-sm leading-relaxed">실제: {item.truth}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
            책임 있게 이용하기
          </h3>
          <div className="rounded-xl border p-5" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
            <ul className="space-y-3">
              {RESPONSIBLE_CHECKLIST.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="font-bold" style={{ color: "var(--color-primary)" }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
            자주 묻는 질문
          </h3>
          <div className="space-y-4">
            {[
              { q: "로또는 몇 살부터 구매할 수 있나요?", a: "만 19세 이상 성인만 구매할 수 있습니다. 미성년자는 복권 구매가 법적으로 금지되어 있습니다." },
              { q: "당첨금에 세금이 붙나요?", a: "복권 당첨금은 200만원 이하가 비과세 기준으로 안내됩니다. 200만원 초과 3억원 이하 구간은 22%, 3억원 초과분은 33% 원천징수 기준을 확인해야 합니다. 실제 수령 시점의 세법과 지급기관 안내가 우선합니다." },
              { q: "당첨금 수령 기간은 얼마나 되나요?", a: "당첨일로부터 1년 이내에 수령해야 합니다. 기간이 지나면 당첨금은 복권기금으로 귀속됩니다. 반드시 당첨 복권을 잘 보관하세요." },
              { q: "온라인으로도 로또를 살 수 있나요?", a: "동행복권 공식 홈페이지에서 온라인 구매 안내를 확인할 수 있습니다. 구매 가능 여부, 한도, 본인 인증 조건은 공식 안내가 바뀔 수 있으므로 구매 전 최신 내용을 확인하세요." },
              { q: "이 추첨기는 실제 당첨번호와 관계가 있나요?", a: "아닙니다. 이 추첨기는 오직 재미를 위한 시뮬레이터입니다. 생성된 번호는 실제 추첨 결과와 완전히 무관하며, 당첨을 보장하지 않습니다." },
            ].map((item) => (
              <div key={item.q} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
                <p className="mt-2 text-sm leading-relaxed">A. {item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border p-4 text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
            <p className="font-semibold" style={{ color: "var(--color-text)" }}>참고 자료</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href="https://www.dhlottery.co.kr/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary)" }}>
                동행복권 공식 사이트
              </a>
              <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary)" }}>
                국세청
              </a>
            </div>
          </div>
        </section>

        <OtherToolsNav currentHref="/lotto" />
      </div>
    </>
  );
}

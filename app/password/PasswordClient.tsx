"use client";

import { useState } from "react";
import OtherToolsNav from "@/components/OtherToolsNav";

const CHARSET = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  opts: { lower: boolean; upper: boolean; number: boolean; symbol: boolean }
): string {
  const pool = [
    opts.lower ? CHARSET.lower : "",
    opts.upper ? CHARSET.upper : "",
    opts.number ? CHARSET.number : "",
    opts.symbol ? CHARSET.symbol : "",
  ].join("");

  if (!pool) return "";

  // 각 선택 그룹에서 최소 1개 보장
  const required: string[] = [];
  if (opts.lower) required.push(CHARSET.lower[Math.floor(Math.random() * CHARSET.lower.length)]);
  if (opts.upper) required.push(CHARSET.upper[Math.floor(Math.random() * CHARSET.upper.length)]);
  if (opts.number) required.push(CHARSET.number[Math.floor(Math.random() * CHARSET.number.length)]);
  if (opts.symbol) required.push(CHARSET.symbol[Math.floor(Math.random() * CHARSET.symbol.length)]);

  const rest = Array.from({ length: length - required.length }, () =>
    pool[Math.floor(Math.random() * pool.length)]
  );

  return [...required, ...rest]
    .sort(() => Math.random() - 0.5)
    .join("");
}

export default function PasswordClient() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, number: true, symbol: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const noOptionSelected = !opts.lower && !opts.upper && !opts.number && !opts.symbol;
  const rangePct = Math.round(((length - 8) / (32 - 8)) * 100);

  function handleGenerate() {
    if (noOptionSelected) return;
    setPassword(generatePassword(length, opts));
    setCopied(false);
  }

  async function handleCopy() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function toggleOpt(key: keyof typeof opts) {
    setOpts((prev) => ({ ...prev, [key]: !prev[key] }));
    setCopied(false);
    setPassword("");
  }

  const optionList = [
    { key: "lower" as const, label: "소문자 (a-z)" },
    { key: "upper" as const, label: "대문자 (A-Z)" },
    { key: "number" as const, label: "숫자 (0-9)" },
    { key: "symbol" as const, label: "특수문자 (!@#$...)" },
  ];

  return (
    <>
    <style>{`
      .pw-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 22px; height: 22px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,0.25);
        border: 2px solid white;
      }
      .pw-range::-moz-range-thumb {
        width: 20px; height: 20px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      }
    `}</style>
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
        비밀번호 생성기
      </h1>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
        대소문자·숫자·특수문자 조합의 안전한 비밀번호를 생성합니다.
      </p>

      <div
        className="mt-8 p-6 rounded-xl border"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
      >
        {/* 길이 설정 */}
        <div className="mb-6">
          <label className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
              비밀번호 길이
            </span>
            <span
              className="font-bold text-lg w-10 text-center"
              style={{ color: "var(--color-primary)" }}
            >
              {length}
            </span>
          </label>
          <input
            type="range"
            min={8}
            max={32}
            value={length}
            onChange={(e) => { setLength(Number(e.target.value)); setPassword(""); }}
            className="pw-range w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-primary) ${rangePct}%, var(--color-border) ${rangePct}%)`,
            }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
            <span>8</span><span>32</span>
          </div>
        </div>

        {/* 옵션 체크박스 */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          {optionList.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={opts[key]}
                onChange={() => toggleOpt(key)}
                className="w-4 h-4 rounded cursor-pointer"
                style={{ accentColor: "var(--color-primary)" }}
              />
              <span className="text-sm" style={{ color: "var(--color-text)" }}>{label}</span>
            </label>
          ))}
        </div>

        {/* 경고 */}
        {noOptionSelected && (
          <p className="mb-4 text-sm font-medium" style={{ color: "var(--color-error)" }}>
            최소 1개 옵션을 선택하세요.
          </p>
        )}

        {/* 생성 버튼 */}
        <button
          onClick={handleGenerate}
          disabled={noOptionSelected}
          className="w-full py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: noOptionSelected ? "var(--color-text-muted)" : "var(--color-primary)" }}
        >
          생성하기
        </button>

        {/* 결과 */}
        {password && (
          <div
            className="mt-4 p-4 rounded-lg border flex items-center justify-between gap-3"
            style={{ backgroundColor: "var(--color-bg-subtle)", borderColor: "var(--color-border)" }}
            aria-live="polite"
          >
            <code
              className="font-mono text-sm break-all flex-1"
              style={{ color: "var(--color-text)" }}
            >
              {password}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: copied ? "var(--color-success)" : "var(--color-primary)",
                color: "white",
              }}
            >
              {copied ? "복사됨 ✓" : "복사"}
            </button>
          </div>
        )}
      </div>

      {/* AdSense 콘텐츠 섹션 */}
      <section className="mt-12 prose prose-sm max-w-none" style={{ color: "var(--color-text-muted)" }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          안전한 비밀번호 만드는 법
        </h2>
        <p>
          안전한 비밀번호는 최소 12자 이상이며, 대문자·소문자·숫자·특수문자를 모두 포함해야 합니다.
          사전에 있는 단어나 생일, 전화번호처럼 예측하기 쉬운 정보는 피하세요.
        </p>
        <p className="mt-3">
          서비스마다 다른 비밀번호를 사용하는 것이 가장 중요합니다. 하나의 비밀번호가 유출되더라도
          다른 계정은 안전하게 유지됩니다. 비밀번호 관리 앱을 활용하면 여러 비밀번호를 편리하게 관리할 수 있습니다.
        </p>
        <p className="mt-3">
          이 생성기는 브라우저 내에서 완전히 동작하며 생성된 비밀번호를 서버로 전송하지 않습니다.
          안전하게 사용하세요.
        </p>
      </section>

      <OtherToolsNav currentHref="/password" />
    </div>
    </>
  );
}

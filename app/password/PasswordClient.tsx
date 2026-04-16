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
      <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          안전한 비밀번호 만드는 법
        </h2>
        <p>
          안전한 비밀번호는 최소 12자 이상이며, 대문자·소문자·숫자·특수문자를 모두 포함해야 합니다.
          사전에 있는 단어나 생일, 전화번호처럼 예측하기 쉬운 정보는 반드시 피하세요.
          해커들은 자동화 도구로 초당 수십억 개의 비밀번호 조합을 시도할 수 있습니다.
        </p>
        <p className="mt-3">
          서비스마다 다른 비밀번호를 사용하는 것이 가장 중요합니다. 하나의 비밀번호가 유출되더라도
          다른 계정은 안전하게 유지됩니다. 이 생성기는 브라우저 내에서 완전히 동작하며
          생성된 비밀번호를 서버로 전송하지 않습니다.
        </p>

        {/* 비밀번호 강도 기준표 */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          비밀번호 강도 기준
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>강도</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>조건</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>해독 예상 시간</th>
              </tr>
            </thead>
            <tbody>
              {[
                { strength: "매우 약함", cond: "숫자만 8자리", time: "즉시 (1초 미만)" },
                { strength: "약함", cond: "소문자만 8자리", time: "수 분 이내" },
                { strength: "보통", cond: "대소문자+숫자 10자리", time: "수 시간 ~ 수일" },
                { strength: "강함", cond: "대소문자+숫자+특수문자 12자리", time: "수 년" },
                { strength: "매우 강함", cond: "모든 문자 조합 16자리 이상", time: "수천 년 이상" },
              ].map((row) => (
                <tr key={row.strength}>
                  <td className="px-3 py-2 border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>{row.strength}</td>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)" }}>{row.cond}</td>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)" }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 절대 쓰면 안 되는 비밀번호 */}
        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          절대 사용하면 안 되는 비밀번호 유형
        </h3>
        <div className="space-y-3">
          {[
            { title: "연속된 숫자/문자", desc: "123456, abcdef, qwerty 등은 해커들이 가장 먼저 시도하는 조합입니다. 매년 가장 많이 유출되는 비밀번호 순위에서 항상 상위권을 차지합니다." },
            { title: "개인 정보 포함", desc: "생년월일, 전화번호, 이름, 아이디와 동일한 비밀번호는 소셜 엔지니어링 공격에 취약합니다. 공개된 정보는 비밀번호로 절대 사용하지 마세요." },
            { title: "짧은 비밀번호", desc: "8자리 미만의 비밀번호는 무차별 대입 공격(Brute Force)으로 수 분 내에 해독될 수 있습니다. 최소 12자 이상을 권장합니다." },
            { title: "동일 비밀번호 재사용", desc: "여러 사이트에서 같은 비밀번호를 사용하면, 하나가 유출될 때 모든 계정이 위험해집니다. 크리덴셜 스터핑(Credential Stuffing) 공격의 주요 원인입니다." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <span className="mt-0.5 text-red-500 font-bold">✕</span>
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
            { q: "생성된 비밀번호가 어딘가에 저장되나요?", a: "아닙니다. 이 생성기는 100% 브라우저에서 동작하며, 생성된 비밀번호는 서버로 전송되거나 저장되지 않습니다. 생성 즉시 직접 복사하여 사용하세요." },
            { q: "특수문자가 꼭 필요한가요?", a: "필수는 아니지만 강력히 권장합니다. 특수문자를 추가하면 가능한 조합의 수가 기하급수적으로 늘어나 해독이 훨씬 어려워집니다. 일부 오래된 사이트는 특수문자를 지원하지 않으니 그럴 땐 길이를 최대한 늘리세요." },
            { q: "비밀번호 관리 앱을 사용해도 괜찮나요?", a: "네, 강력히 추천합니다. 1Password, Bitwarden, KeePass 같은 비밀번호 관리자는 모든 계정에 서로 다른 강력한 비밀번호를 사용할 수 있게 해줍니다. 마스터 비밀번호 하나만 기억하면 됩니다." },
            { q: "얼마나 자주 비밀번호를 바꿔야 하나요?", a: "최신 보안 가이드라인(NIST)에서는 강력한 비밀번호를 사용한다면 주기적인 변경보다 유출 의심 시에만 변경하는 것을 권장합니다. 단, 같은 비밀번호를 여러 사이트에 사용 중이라면 지금 당장 변경하세요." },
          ].map((item) => (
            <div key={item.q} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
              <p className="mt-2 text-sm leading-relaxed">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <OtherToolsNav currentHref="/password" />
    </div>
    </>
  );
}

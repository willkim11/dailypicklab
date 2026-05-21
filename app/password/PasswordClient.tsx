"use client";

import { useState } from "react";
import Link from "next/link";
import OtherToolsNav from "@/components/OtherToolsNav";

const CHARSET = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function secureRandomIndex(max: number): number {
  if (max <= 0) return 0;

  const randomValues = new Uint32Array(1);
  const maxUnbiasedValue = Math.floor(0xffffffff / max) * max;

  do {
    crypto.getRandomValues(randomValues);
  } while (randomValues[0] >= maxUnbiasedValue);

  return randomValues[0] % max;
}

function pickChar(charset: string): string {
  return charset[secureRandomIndex(charset.length)];
}

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
  if (opts.lower) required.push(pickChar(CHARSET.lower));
  if (opts.upper) required.push(pickChar(CHARSET.upper));
  if (opts.number) required.push(pickChar(CHARSET.number));
  if (opts.symbol) required.push(pickChar(CHARSET.symbol));

  const rest = Array.from({ length: length - required.length }, () =>
    pickChar(pool)
  );

  const chars = [...required, ...rest];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

function getPoolSize(opts: { lower: boolean; upper: boolean; number: boolean; symbol: boolean }): number {
  return [
    opts.lower ? CHARSET.lower.length : 0,
    opts.upper ? CHARSET.upper.length : 0,
    opts.number ? CHARSET.number.length : 0,
    opts.symbol ? CHARSET.symbol.length : 0,
  ].reduce((sum, size) => sum + size, 0);
}

function getStrengthLabel(length: number, poolSize: number): { label: string; desc: string; color: string } {
  if (poolSize === 0) return { label: "옵션 필요", desc: "문자 종류를 1개 이상 선택하세요.", color: "var(--color-error)" };
  if (length >= 20 && poolSize >= 62) return { label: "매우 강함", desc: "중요 계정에 권장할 수 있는 수준입니다.", color: "var(--color-success)" };
  if (length >= 16 && poolSize >= 36) return { label: "강함", desc: "대부분의 개인 계정에 충분한 수준입니다.", color: "var(--color-success)" };
  if (length >= 12 && poolSize >= 26) return { label: "보통", desc: "가능하면 길이를 16자 이상으로 늘리세요.", color: "var(--color-warning)" };
  return { label: "약함", desc: "길이를 늘리고 문자 종류를 더 선택하세요.", color: "var(--color-error)" };
}

export default function PasswordClient() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ lower: true, upper: true, number: true, symbol: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const noOptionSelected = !opts.lower && !opts.upper && !opts.number && !opts.symbol;
  const rangePct = Math.round(((length - 12) / (48 - 12)) * 100);
  const poolSize = getPoolSize(opts);
  const strength = getStrengthLabel(length, poolSize);

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
        서버로 전송하지 않고 브라우저에서만 안전한 랜덤 비밀번호를 생성합니다.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          "보안 난수 생성",
          "서버 전송 없음",
          "관리자 앱 권장",
        ].map((item) => (
          <div
            key={item}
            className="px-4 py-3 rounded-lg border text-sm whitespace-nowrap"
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
            min={12}
            max={48}
            value={length}
            onChange={(e) => { setLength(Number(e.target.value)); setPassword(""); }}
            className="pw-range w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-primary) ${rangePct}%, var(--color-border) ${rangePct}%)`,
            }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
            <span>12</span><span>48</span>
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

        <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
              현재 설정 강도
            </span>
            <span className="text-sm font-bold" style={{ color: strength.color }}>
              {strength.label}
            </span>
          </div>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {strength.desc} 문자 후보 수는 {poolSize}개이며, 같은 비밀번호를 여러 사이트에서 재사용하지 않는 것이 핵심입니다.
          </p>
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={handleGenerate}
          disabled={noOptionSelected}
          className="w-full py-3 rounded-lg font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: noOptionSelected ? "var(--color-text-muted)" : "var(--color-primary)",
            color: noOptionSelected ? "var(--color-bg)" : "var(--color-on-primary)",
          }}
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
                color: copied ? "white" : "var(--color-on-primary)",
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
          안전한 비밀번호를 만드는 기준
        </h2>
        <p>
          안전한 비밀번호의 핵심은 길이, 예측 불가능성, 재사용 금지입니다. 최신 NIST SP 800-63B-4 기준은
          단일 인증용 비밀번호에 최소 15자를 요구하며, 억지로 복잡한 규칙을 외우게 하기보다
          충분히 긴 비밀번호와 유출된 비밀번호 차단을 중요하게 봅니다.
        </p>
        <p className="mt-3">
          이 생성기는 브라우저의 암호학적 난수 API를 사용해 비밀번호를 만들고, 생성된 문자열을 서버로
          전송하지 않습니다. 다만 안전한 비밀번호도 피싱이나 사이트 유출을 완전히 막지는 못하므로,
          중요한 계정에는 비밀번호 관리자와 2단계 인증을 함께 쓰는 것이 좋습니다.
        </p>

        <div className="mt-5 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
          <p className="font-semibold" style={{ color: "var(--color-text)" }}>추천 설정</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>개인 서비스: 16자 이상, 대소문자와 숫자 포함</li>
            <li>이메일·금융·업무 계정: 20자 이상, 특수문자 포함</li>
            <li>모든 계정: 사이트마다 서로 다른 비밀번호 사용</li>
          </ul>
        </div>

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
                { strength: "약함", cond: "숫자만 8~10자리", time: "자동화 공격에 취약" },
                { strength: "보통", cond: "영문+숫자 12자리", time: "개인 계정의 최소선" },
                { strength: "강함", cond: "대소문자+숫자 16자리", time: "대부분의 개인 계정에 적합" },
                { strength: "매우 강함", cond: "모든 문자 조합 20자리 이상", time: "중요 계정에 권장" },
                { strength: "관리 필요", cond: "서로 다른 강한 비밀번호 여러 개", time: "비밀번호 관리자 사용 권장" },
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

        <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: "var(--color-text)" }}>
          비밀번호만으로는 부족한 이유
        </h3>
        <div className="space-y-3">
          {[
            { title: "2단계 인증 켜기", desc: "CISA는 계정 보호를 위해 MFA 사용을 권장합니다. 가능하면 SMS보다 인증 앱, 보안 키, 패스키처럼 피싱에 강한 방식을 우선하세요." },
            { title: "패스키가 있으면 우선 사용", desc: "패스키는 기기와 서비스 사이의 암호학적 인증을 사용해 가짜 로그인 페이지에 비밀번호를 입력하는 위험을 줄입니다." },
            { title: "비밀번호 관리자 사용", desc: "계정마다 다른 긴 비밀번호를 기억하기는 어렵습니다. 비밀번호 관리자를 쓰면 재사용을 줄이고 피싱 사이트를 구분하는 데도 도움이 됩니다." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          ))}
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
            { q: "생성된 비밀번호가 어딘가에 저장되나요?", a: "아닙니다. 이 생성기는 브라우저에서 동작하며, 생성된 비밀번호는 서버로 전송되거나 저장되지 않습니다. 생성 즉시 직접 복사해 비밀번호 관리자에 저장하세요." },
            { q: "특수문자가 꼭 필요한가요?", a: "사이트가 허용한다면 사용하는 것이 좋습니다. 다만 외우기 어렵게 복잡한 규칙을 억지로 만드는 것보다 충분히 긴 비밀번호와 계정별 고유 비밀번호가 더 중요합니다." },
            { q: "비밀번호 관리 앱을 사용해도 괜찮나요?", a: "네, 강력히 추천합니다. 1Password, Bitwarden, KeePass 같은 비밀번호 관리자는 모든 계정에 서로 다른 강력한 비밀번호를 사용할 수 있게 해줍니다. 마스터 비밀번호 하나만 기억하면 됩니다." },
            { q: "얼마나 자주 비밀번호를 바꿔야 하나요?", a: "강력하고 고유한 비밀번호를 사용한다면 정기 변경보다 유출 의심, 피싱 입력, 기기 분실처럼 위험 신호가 있을 때 즉시 바꾸는 방식이 더 현실적입니다." },
          ].map((item) => (
            <div key={item.q} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
              <p className="mt-2 text-sm leading-relaxed">A. {item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>더 자세히 읽기</p>
          <p className="text-sm mb-4">
            비밀번호 관리 앱, 2단계 인증, 피싱 예방까지 한 번에 정리한 가이드를 함께 확인해보세요.
          </p>
          <Link
            href="/guides/password-security"
            className="inline-block px-5 py-3 rounded-lg font-semibold text-sm"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
          >
            비밀번호 보안 가이드 보기 →
          </Link>
        </div>
      </section>

      <OtherToolsNav currentHref="/password" />
    </div>
    </>
  );
}

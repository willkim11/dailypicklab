"use client";

import { TYPE_INFO, TYPE_CAREERS, TYPE_COMPATIBLE, ALL_TYPES, type PersonalityType } from "@/lib/personality";
import Link from "next/link";
import { useState } from "react";
import OtherToolsNav from "@/components/OtherToolsNav";

export default function ResultClient({ type }: { type: PersonalityType }) {
  const info = TYPE_INFO[type];
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* 결과 헤더 */}
      <div
        className="p-8 rounded-2xl text-white text-center"
        style={{ backgroundColor: info.color }}
      >
        <p className="text-sm font-medium opacity-80 mb-2">당신의 성격 유형은</p>
        <h1 className="text-6xl font-bold tracking-wide">{type}</h1>
        <p className="text-xl font-semibold mt-2 opacity-90">{info.nickname}</p>
      </div>

      {/* 설명 */}
      <div
        className="mt-6 p-6 rounded-2xl border"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
      >
        <p className="text-lg leading-relaxed" style={{ color: "var(--color-text)" }}>
          {info.description}
        </p>
      </div>

      {/* 특성 */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {info.traits.map((trait) => (
          <div
            key={trait}
            className="flex items-center gap-2 p-3 rounded-xl border"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
          >
            <span style={{ color: info.color }}>✓</span>
            <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
              {trait}
            </span>
          </div>
        ))}
      </div>

      {/* 공유 버튼 */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 py-3 rounded-xl font-semibold text-white transition-colors"
          style={{ backgroundColor: copied ? "var(--color-success)" : info.color }}
        >
          {copied ? "링크 복사됨 ✓" : "🔗 링크 복사"}
        </button>
        <Link
          href="/personality"
          className="flex-1 py-3 rounded-xl font-semibold text-center border transition-colors"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          🔄 다시 테스트하기
        </Link>
      </div>

      {/* 강점 / 약점 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          {type} 유형의 강점과 약점
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--color-success)" }}>강점</p>
            <ul className="space-y-2">
              {info.strengths.map((s) => (
                <li key={s} className="flex gap-2 text-sm" style={{ color: "var(--color-text)" }}>
                  <span style={{ color: "var(--color-success)" }} className="shrink-0">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "#EF4444" }}>주의할 점</p>
            <ul className="space-y-2">
              {info.weaknesses.map((w) => (
                <li key={w} className="flex gap-2 text-sm" style={{ color: "var(--color-text)" }}>
                  <span style={{ color: "#EF4444" }} className="shrink-0">△</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 유명인 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          {type} 유형의 유명인
        </h2>
        <div className="flex flex-wrap gap-2">
          {info.famousPeople.map((person) => (
            <span
              key={person}
              className="px-3 py-2 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)", color: "var(--color-text)" }}
            >
              {person}
            </span>
          ))}
        </div>
      </section>

      {/* 직업 추천 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          {type} 유형에게 어울리는 직업
        </h2>
        <div className="flex flex-wrap gap-2">
          {TYPE_CAREERS[type].map((career) => (
            <span
              key={career}
              className="px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${info.color}18`, color: info.color, border: `1px solid ${info.color}40` }}
            >
              {career}
            </span>
          ))}
        </div>
      </section>

      {/* 궁합 좋은 유형 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          {type} 유형과 잘 맞는 유형
        </h2>
        <div className="flex gap-3">
          {TYPE_COMPATIBLE[type].map((compatType) => {
            const compatInfo = TYPE_INFO[compatType as PersonalityType];
            return (
              <Link
                key={compatType}
                href={`/personality/result/${compatType}`}
                className="flex-1 p-4 rounded-xl border text-center transition-all hover:shadow-sm"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
              >
                <p className="text-2xl font-bold" style={{ color: compatInfo.color }}>{compatType}</p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{compatInfo.nickname}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 다른 유형 탐색 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          다른 유형 탐색하기
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {ALL_TYPES.map((t) => (
            <Link
              key={t}
              href={`/personality/result/${t}`}
              className="py-2 rounded-lg text-center text-sm font-semibold transition-all hover:shadow-sm"
              style={{
                backgroundColor: t === type ? info.color : "var(--color-bg-subtle)",
                color: t === type ? "white" : "var(--color-text-muted)",
                border: `1px solid ${t === type ? info.color : "var(--color-border)"}`,
              }}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* AdSense 콘텐츠 */}
      <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          성격 유형 검사란?
        </h2>
        <p>
          이 검사는 4가지 성격 축(E/I, S/N, T/F, J/P)을 기반으로 16가지 유형을 분류합니다.
          E(외향)/I(내향)는 에너지를 얻는 방향, S(감각)/N(직관)은 정보를 인식하는 방식,
          T(사고)/F(감정)은 의사결정 방식, J(판단)/P(인식)은 생활 방식을 나타냅니다.
        </p>
        <p className="mt-3">
          1940년대 Isabel Briggs Myers와 Katherine Cook Briggs가 Carl Jung의 심리학 이론을
          바탕으로 개발한 성격 유형 분류 체계에서 영감을 받았습니다. 현재 전 세계적으로
          가장 널리 알려진 성격 유형 분류 방식 중 하나입니다.
        </p>
        <p className="mt-3">
          결과는 절대적인 것이 아니며, 같은 유형도 개인마다 다양한 특성을 보입니다.
          스트레스 상황이나 성장 과정에서 유형이 달라질 수 있습니다.
          자신을 이해하고 타인과 소통하는 데 참고 자료로 활용하세요.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2" style={{ color: "var(--color-text)" }}>
          자주 묻는 질문
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium" style={{ color: "var(--color-text)" }}>Q. 검사 결과가 매번 다르게 나와요.</p>
            <p className="mt-1">A. 그날의 기분이나 상황에 따라 답변이 달라질 수 있습니다. 가장 평소의 자신과 가까운 답변을 선택할수록 정확한 결과를 얻을 수 있습니다.</p>
          </div>
          <div>
            <p className="font-medium" style={{ color: "var(--color-text)" }}>Q. 특정 유형이 더 좋거나 나쁜 건가요?</p>
            <p className="mt-1">A. 아닙니다. 16가지 유형은 모두 동등하며, 각각 고유한 강점과 약점을 갖고 있습니다. 어떤 유형이든 자신만의 가치가 있습니다.</p>
          </div>
          <div>
            <p className="font-medium" style={{ color: "var(--color-text)" }}>Q. {type}과 다른 유형의 차이가 뭔가요?</p>
            <p className="mt-1">A. {type}은 {info.nickname}로, {info.traits.slice(0, 2).join(', ')} 등의 특성을 갖습니다. 다른 유형 탐색하기 섹션에서 각 유형을 비교해보세요.</p>
          </div>
        </div>
      </section>

      <OtherToolsNav currentHref="/personality" />
    </div>
  );
}

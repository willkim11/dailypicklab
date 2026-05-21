"use client";

import { TYPE_INFO, TYPE_CAREERS, TYPE_COMPATIBLE, ALL_TYPES, type PersonalityType } from "@/lib/personality";
import Link from "next/link";
import { useState } from "react";
import OtherToolsNav from "@/components/OtherToolsNav";

const AXIS_GUIDE = {
  E: { label: "외향 E", desc: "사람들과 상호작용하며 생각과 에너지를 정리하는 경향" },
  I: { label: "내향 I", desc: "혼자 생각하고 회복하는 시간이 있어야 에너지가 유지되는 경향" },
  S: { label: "감각 S", desc: "구체적인 사실, 경험, 현실적인 절차를 먼저 확인하는 경향" },
  N: { label: "직관 N", desc: "가능성, 패턴, 의미처럼 보이지 않는 연결을 먼저 보는 경향" },
  T: { label: "사고 T", desc: "논리, 기준, 공정성을 중심으로 결정을 내리는 경향" },
  F: { label: "감정 F", desc: "사람, 관계, 가치에 미칠 영향을 중심으로 결정을 내리는 경향" },
  J: { label: "판단 J", desc: "계획과 마감, 정리된 선택지가 있을 때 안정감을 느끼는 경향" },
  P: { label: "인식 P", desc: "상황 변화에 맞춰 선택지를 열어둘 때 편안함을 느끼는 경향" },
} as const;

function getTypeLetters(type: PersonalityType) {
  return type.split("") as Array<keyof typeof AXIS_GUIDE>;
}

function getWorkTip(type: PersonalityType) {
  const isJ = type.includes("J");
  const isE = type.includes("E");
  if (isJ && isE) return "목표, 역할, 마감이 명확한 환경에서 추진력을 발휘하기 쉽습니다. 대신 회의와 실행 사이의 여백을 의도적으로 남겨두면 좋습니다.";
  if (isJ) return "조용하고 예측 가능한 환경에서 깊이 집중하기 좋습니다. 계획이 너무 빡빡해지지 않도록 중간 점검 시간을 넣어보세요.";
  if (isE) return "사람들과 아이디어를 주고받는 과정에서 속도가 붙습니다. 흥미가 바뀌기 쉬우므로 완료 기준을 작게 쪼개두면 도움이 됩니다.";
  return "자율성과 몰입 시간이 확보될 때 강점이 잘 드러납니다. 생각이 길어질 때는 작은 실험으로 결정을 앞당겨보세요.";
}

function getRelationshipTip(type: PersonalityType) {
  const isT = type.includes("T");
  const isF = type.includes("F");
  if (isT) return "문제를 빠르게 해결하려는 말이 차갑게 들릴 수 있습니다. 조언 전에 상대가 원하는 것이 해결인지 공감인지 먼저 확인해보세요.";
  if (isF) return "상대의 감정을 잘 살피는 만큼 자신의 필요를 늦게 말할 수 있습니다. 불편함을 느낀 시점에 작게 표현하는 연습이 중요합니다.";
  return "대화에서 내가 먼저 보는 기준과 상대가 먼저 보는 기준이 다를 수 있음을 기억하면 갈등을 줄일 수 있습니다.";
}

function getGrowthTip(type: PersonalityType) {
  const isN = type.includes("N");
  const isS = type.includes("S");
  if (isN) return "큰 그림을 잘 보는 만큼 실행 단계가 흐려질 수 있습니다. 아이디어마다 첫 행동 하나를 정해두면 현실화 속도가 빨라집니다.";
  if (isS) return "현실 감각이 강한 만큼 새로운 가능성을 작게 시험해보는 루틴이 도움이 됩니다. 익숙한 방식과 새 방식을 비교해보세요.";
  return "강점을 과하게 쓰면 약점처럼 보일 수 있습니다. 내 방식이 통하지 않는 상황을 기록해두면 균형을 찾기 쉽습니다.";
}

export default function ResultClient({ type }: { type: PersonalityType }) {
  const info = TYPE_INFO[type];
  const [copied, setCopied] = useState(false);
  const typeLetters = getTypeLetters(type);

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

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          {type} 결과를 읽는 기준
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {typeLetters.map((letter) => {
            const axis = AXIS_GUIDE[letter];
            return (
              <div
                key={letter}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
              >
                <p className="text-sm font-semibold" style={{ color: info.color }}>{axis.label}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{axis.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          일상에서 활용하는 방법
        </h2>
        <div className="space-y-3">
          {[
            { title: "일과 공부", desc: getWorkTip(type) },
            { title: "관계와 대화", desc: getRelationshipTip(type) },
            { title: "성장 포인트", desc: getGrowthTip(type) },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
            >
              <p className="font-semibold" style={{ color: "var(--color-text)" }}>{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

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

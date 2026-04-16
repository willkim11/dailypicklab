import type { Metadata } from "next";
import Link from "next/link";
import { ALL_TYPES, TYPE_INFO } from "@/lib/personality";

export const metadata: Metadata = {
  title: "16가지 성격 유형 완전 분석 — MBTI 가이드",
  description:
    "MBTI 4가지 축의 의미와 16가지 성격 유형의 특징, 직업, 인간관계 패턴을 한 번에 정리한 완전 가이드.",
};

const groups = [
  { label: "분석가형 (NT)", types: ["INTJ", "INTP", "ENTJ", "ENTP"] as const, desc: "논리와 전략으로 세상을 분석하는 유형. 지식 추구와 혁신을 즐기며 복잡한 문제를 해결하는 데 뛰어납니다." },
  { label: "외교관형 (NF)", types: ["INFJ", "INFP", "ENFJ", "ENFP"] as const, desc: "깊은 공감 능력과 이상주의로 사람들과 연결되는 유형. 의미 있는 변화를 추구하며 타인의 성장을 돕습니다." },
  { label: "관리자형 (SJ)", types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"] as const, desc: "전통과 책임감을 중시하며 안정적인 환경을 만드는 유형. 신뢰성과 체계적인 접근으로 공동체를 지원합니다." },
  { label: "탐험가형 (SP)", types: ["ISTP", "ISFP", "ESTP", "ESFP"] as const, desc: "현재 순간에 충실하고 자유로운 영혼을 가진 유형. 실용적이고 유연하게 새로운 경험을 즐깁니다." },
];

export default function MbtiTypesPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>
          ← 가이드 목록
        </Link>
      </div>

      <h1 className="text-3xl font-bold mt-4" style={{ color: "var(--color-text)" }}>
        16가지 성격 유형 완전 분석
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        "나는 INFP야"라는 말을 들어봤을 것입니다. MBTI는 전 세계에서 가장 널리 쓰이는 성격 유형 분류 방식 중 하나입니다. 4가지 축과 16가지 유형의 의미를 정확히 이해해봅시다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          MBTI의 4가지 축 이해하기
        </h2>
        <div className="space-y-4">
          {[
            { axis: "E / I", title: "외향 (Extraversion) vs 내향 (Introversion)", desc: "에너지를 어디서 얻는지에 관한 축입니다. E는 사람들과 어울리며 에너지를 충전하고, I는 혼자만의 시간을 통해 에너지를 채웁니다. E/I는 사교적이냐 아니냐가 아니라, 에너지의 방향에 관한 개념입니다." },
            { axis: "S / N", title: "감각 (Sensing) vs 직관 (iNtuition)", desc: "정보를 인식하는 방식입니다. S는 현재의 구체적인 사실과 세부 정보에 집중하고, N은 패턴과 미래 가능성을 먼저 봅니다. 같은 상황을 보고 S는 '지금 어떤 일이 일어나고 있나'를, N은 '왜 이런 일이 생겼고 앞으로 어떻게 될까'를 먼저 생각합니다." },
            { axis: "T / F", title: "사고 (Thinking) vs 감정 (Feeling)", desc: "의사결정 방식입니다. T는 논리와 객관적 분석을 기준으로 판단하고, F는 사람과 가치를 중심으로 판단합니다. T가 F보다 더 똑똑하거나 냉철한 것이 아니라, 단지 결정의 기준이 다른 것입니다." },
            { axis: "J / P", title: "판단 (Judging) vs 인식 (Perceiving)", desc: "생활 방식입니다. J는 계획적이고 체계적으로 행동하며, P는 유연하고 즉흥적인 생활을 선호합니다. J는 결정이 내려진 뒤 편안함을 느끼고, P는 선택지가 열려 있을 때 편안함을 느낍니다." },
          ].map((item) => (
            <div key={item.axis} className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded text-sm font-bold" style={{ backgroundColor: "var(--color-primary)", color: "white" }}>{item.axis}</span>
                <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
          4가지 그룹으로 보는 16가지 유형
        </h2>
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--color-text)" }}>{group.label}</h3>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>{group.desc}</p>
              <div className="grid grid-cols-2 gap-3">
                {group.types.map((type) => {
                  const info = TYPE_INFO[type];
                  return (
                    <Link
                      key={type}
                      href={`/personality/result/${type}`}
                      className="p-4 rounded-xl border transition-all hover:shadow-md"
                      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
                    >
                      <p className="text-xl font-bold" style={{ color: info.color }}>{type}</p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: "var(--color-text)" }}>{info.nickname}</p>
                      <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>{info.traits.join(" · ")}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          MBTI를 올바르게 활용하는 방법
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          MBTI는 강력한 자기 이해 도구이지만, 잘못 사용하면 오히려 해가 됩니다. "나는 INTJ라 감정이 없어", "저 사람은 ESFP라 깊이가 없어" 같은 식의 유형으로 사람을 단정 짓는 것은 잘못된 활용입니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          모든 사람은 유형 내에서도 스펙트럼이 존재하고, 성장과 환경에 따라 변화합니다. MBTI는 "나는 이런 경향이 있구나"를 이해하고, 타인을 더 깊이 이해하기 위한 출발점으로 사용할 때 가장 빛납니다.
        </p>
      </section>

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>내 성격 유형 알아보기</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>16문항으로 3~5분이면 완료되는 무료 성격 유형 테스트.</p>
        <Link
          href="/personality"
          className="inline-block px-5 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          성격 유형 테스트 시작 →
        </Link>
      </div>
    </article>
  );
}

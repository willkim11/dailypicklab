import type { Metadata } from "next";
import Link from "next/link";
import PersonalityClient from "./PersonalityClient";
import { ALL_TYPES, TYPE_INFO } from "@/lib/personality";

export const metadata: Metadata = {
  title: "성격 유형 테스트 — 무료 MBTI 심리 테스트 온라인",
  description:
    "무료 성격 유형 테스트. 16가지 성격 유형 중 나는 어떤 유형인지 알아보세요. MBTI 기반 자체 제작 문항.",
  keywords: ["성격유형테스트", "MBTI", "MBTI테스트", "성격검사", "무료MBTI"],
};

const AXES = [
  { label: "E / I", title: "외향 vs 내향", desc: "에너지의 방향. E(외향)는 사람들과 어울릴 때 에너지를 얻고, I(내향)는 혼자만의 시간을 통해 에너지를 충전합니다." },
  { label: "S / N", title: "감각 vs 직관", desc: "정보를 인식하는 방식. S(감각)는 구체적인 사실과 경험을 중시하고, N(직관)은 패턴과 가능성을 먼저 봅니다." },
  { label: "T / F", title: "사고 vs 감정", desc: "의사결정 방식. T(사고)는 논리와 객관적 분석으로 판단하고, F(감정)는 사람과 가치를 중심으로 판단합니다." },
  { label: "J / P", title: "판단 vs 인식", desc: "생활 방식. J(판단)는 계획적이고 체계적으로 행동하고, P(인식)는 유연하고 즉흥적인 생활을 선호합니다." },
];

const FAQ = [
  { q: "검사는 얼마나 걸리나요?", a: "16개 문항으로 구성되어 있으며 보통 3~5분이면 완료됩니다. 각 질문에 너무 깊이 생각하지 말고 직관적으로 답변하는 것이 좋습니다." },
  { q: "결과가 매번 다르게 나와요.", a: "그날의 기분이나 상황에 따라 답변이 달라질 수 있습니다. 가장 평소의 자신과 가까운 답변을 선택할수록 정확한 결과를 얻을 수 있습니다. 결과는 고정된 것이 아니라 참고 자료로 활용하세요." },
  { q: "16가지 유형이 있다는 게 정확한가요?", a: "4가지 이분법적 축의 조합으로 2×2×2×2 = 16가지 유형이 만들어집니다. 실제로는 연속적인 스펙트럼이지만, 유형으로 분류하면 이해하기 쉽고 자기 탐색에 유용합니다." },
  { q: "특정 유형이 더 우수한가요?", a: "아닙니다. 모든 유형은 동등하며 각자 고유한 강점을 가지고 있습니다. 어떤 유형이든 자신의 특성을 이해하고 활용하는 것이 중요합니다." },
  { q: "검사 결과를 어디에 활용할 수 있나요?", a: "자기 이해, 직업 선택 참고, 인간관계 이해, 팀 빌딩 등에 활용할 수 있습니다. 하지만 채용이나 중요한 결정의 유일한 기준으로 사용하는 것은 권장하지 않습니다." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "성격 유형 검사는 얼마나 걸리나요?",
      acceptedAnswer: { "@type": "Answer", text: "16개 문항으로 구성되어 있으며 보통 3~5분이면 완료됩니다." },
    },
    {
      "@type": "Question",
      name: "검사 결과가 매번 다르게 나오는 이유는 무엇인가요?",
      acceptedAnswer: { "@type": "Answer", text: "그날의 기분이나 상황에 따라 답변이 달라질 수 있습니다. 가장 평소의 자신과 가까운 답변을 선택할수록 정확한 결과를 얻을 수 있습니다." },
    },
    {
      "@type": "Question",
      name: "16가지 유형 중 더 좋은 유형이 있나요?",
      acceptedAnswer: { "@type": "Answer", text: "아닙니다. 모든 유형은 동등하며 각자 고유한 강점을 가지고 있습니다." },
    },
    {
      "@type": "Question",
      name: "MBTI와 이 성격 유형 테스트의 차이는 무엇인가요?",
      acceptedAnswer: { "@type": "Answer", text: "MBTI는 Myers-Briggs Company의 상표 제품입니다. 이 테스트는 동일한 4가지 축(E/I, S/N, T/F, J/P) 이론을 기반으로 자체 제작된 문항을 사용합니다." },
    },
    {
      "@type": "Question",
      name: "결과를 어떻게 활용하면 좋나요?",
      acceptedAnswer: { "@type": "Answer", text: "자기 이해, 직업 선택 참고, 인간관계 이해, 팀 빌딩 등에 활용할 수 있습니다. 절대적인 기준이 아닌 참고 자료로 활용하세요." },
    },
  ],
};

export default function PersonalityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PersonalityClient />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
        {/* 16가지 유형 그리드 */}
        <section className="mt-4 border-t pt-12" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            16가지 성격 유형 한눈에 보기
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
            결과가 궁금한 유형을 클릭하면 바로 확인할 수 있습니다.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {ALL_TYPES.map((type) => {
              const info = TYPE_INFO[type];
              return (
                <Link
                  key={type}
                  href={`/personality/result/${type}`}
                  className="p-3 rounded-xl border text-center transition-all hover:shadow-md"
                  style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
                >
                  <p className="text-base font-bold" style={{ color: info.color }}>{type}</p>
                  <p className="text-xs mt-0.5 leading-tight" style={{ color: "var(--color-text-muted)" }}>{info.nickname}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4가지 축 설명 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
            성격 유형을 결정하는 4가지 축
          </h2>
          <div className="space-y-4">
            {AXES.map((axis) => (
              <div
                key={axis.label}
                className="p-5 rounded-xl border"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-2 py-0.5 rounded text-sm font-bold"
                    style={{ backgroundColor: "var(--color-primary)", color: "white" }}
                  >
                    {axis.label}
                  </span>
                  <span className="font-semibold" style={{ color: "var(--color-text)" }}>{axis.title}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{axis.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text)" }}>
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="p-5 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>Q. {item.q}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>A. {item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

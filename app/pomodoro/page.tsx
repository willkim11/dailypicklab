import type { Metadata } from "next";
import PomodoroClient from "./PomodoroClient";

export const metadata: Metadata = {
  title: "뽀모도로 타이머 — 무료 온라인 집중 타이머",
  description:
    "25분 집중, 5분 휴식. 뽀모도로 기법으로 집중력을 높이는 무료 온라인 타이머. 사이클 완료 시 브라우저 알림 지원.",
  keywords: ["뽀모도로타이머", "뽀모도로", "집중타이머", "공부타이머", "포모도로"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "뽀모도로 기법이란 무엇인가요?",
      acceptedAnswer: { "@type": "Answer", text: "1980년대 프란체스코 치릴로가 개발한 시간 관리 방법으로, 25분 집중 후 5분 휴식을 1사이클로 반복합니다. 4사이클 후에는 15~30분의 긴 휴식을 취합니다." },
    },
    {
      "@type": "Question",
      name: "25분이 너무 짧게 느껴지면 어떻게 하나요?",
      acceptedAnswer: { "@type": "Answer", text: "처음에는 25분으로 시작하고 익숙해지면 50분/10분 비율도 많이 사용됩니다. 자신에게 맞는 주기를 찾는 것이 중요합니다." },
    },
    {
      "@type": "Question",
      name: "휴식 시간에 스마트폰을 봐도 되나요?",
      acceptedAnswer: { "@type": "Answer", text: "권장하지 않습니다. 스마트폰 사용은 뇌를 쉬게 하지 않습니다. 스트레칭이나 물 마시기, 창밖 바라보기 등을 추천합니다." },
    },
    {
      "@type": "Question",
      name: "뽀모도로 기법의 효과는 무엇인가요?",
      acceptedAnswer: { "@type": "Answer", text: "집중력 향상, 정신적 피로 감소, 시간 파악 능력 향상, 성취감 증가 등의 효과가 있습니다. 특히 코딩, 글쓰기, 시험 공부에 효과적입니다." },
    },
  ],
};

export default function PomodoroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PomodoroClient />
    </>
  );
}

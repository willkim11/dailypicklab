import type { Metadata } from "next";
import PomodoroClient from "./PomodoroClient";

export const metadata: Metadata = {
  title: "뽀모도로 타이머 — 집중 루틴을 만드는 무료 온라인 타이머",
  description:
    "25분 집중, 5분 휴식부터 긴 집중 루틴까지 설정할 수 있는 무료 뽀모도로 타이머입니다. 공부와 업무에 맞는 집중 루틴, 휴식법, 사용 팁을 함께 제공합니다.",
  keywords: ["뽀모도로타이머", "뽀모도로", "집중타이머", "공부타이머", "포모도로", "집중력"],
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
      acceptedAnswer: { "@type": "Answer", text: "처음에는 25분으로 시작하고 익숙해지면 50분/10분 같은 긴 집중 루틴도 사용할 수 있습니다. 중요한 것은 집중과 휴식을 반복하는 리듬을 유지하는 것입니다." },
    },
    {
      "@type": "Question",
      name: "휴식 시간에 스마트폰을 봐도 되나요?",
      acceptedAnswer: { "@type": "Answer", text: "권장하지 않습니다. 스마트폰 사용은 뇌를 쉬게 하지 않습니다. 스트레칭이나 물 마시기, 창밖 바라보기 등을 추천합니다." },
    },
    {
      "@type": "Question",
      name: "뽀모도로 기법의 효과는 무엇인가요?",
      acceptedAnswer: { "@type": "Answer", text: "집중 시간을 작게 나누면 시작 장벽이 낮아지고, 휴식을 계획적으로 넣어 피로를 줄일 수 있습니다. 특히 공부, 글쓰기, 코딩처럼 혼자 오래 집중해야 하는 작업에 잘 맞습니다." },
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

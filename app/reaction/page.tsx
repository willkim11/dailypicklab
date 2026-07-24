import type { Metadata } from "next";
import ReactionClient from "./ReactionClient";

export const metadata: Metadata = {
  title: "반응속도 테스트 — 5회 평균으로 보는 반응시간 측정",
  description:
    "초록색이 되는 순간 클릭해 반응속도를 측정하세요. 5회 평균, 최고기록, 측정 오차, 결과 해석과 반응속도 향상 팁을 함께 제공합니다.",
  keywords: ["반응속도테스트", "반응속도측정", "반응속도", "반응시간", "반응속도평균"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "스마트폰과 PC 결과를 비교해도 되나요?",
      acceptedAnswer: { "@type": "Answer", text: "입력 방식, 화면 주사율, 브라우저 처리가 다르므로 직접 비교하기 어렵습니다. 기기별로 기준선을 따로 만들고 각 기기 안에서 변화 추이를 확인하세요." },
    },
    {
      "@type": "Question",
      name: "기록이 매번 다른 이유는 무엇인가요?",
      acceptedAnswer: { "@type": "Answer", text: "화면 갱신 시점, 입력 장치, 브라우저 상태와 집중 상태가 모두 달라질 수 있습니다. 평균과 중앙값, 최고·최저 기록의 차이를 함께 보세요." },
    },
    {
      "@type": "Question",
      name: "한 번의 최고기록을 기준으로 봐도 되나요?",
      acceptedAnswer: { "@type": "Answer", text: "최고기록은 우연이나 예측 클릭의 영향을 받기 쉽습니다. 같은 환경의 5회 기록과 여러 날의 중앙값을 기준으로 보세요." },
    },
    {
      "@type": "Question",
      name: "이 결과로 건강 상태를 판단할 수 있나요?",
      acceptedAnswer: { "@type": "Answer", text: "아니요. 이 테스트는 브라우저 기반 참고 도구이며 의료 검사나 인지 기능 평가를 대체하지 않습니다." },
    },
  ],
};
export default function ReactionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ReactionClient />
    </>
  );
}

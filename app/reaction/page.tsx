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
      name: "스마트폰과 PC 중 어디서 테스트하는 게 더 빠르게 나오나요?",
      acceptedAnswer: { "@type": "Answer", text: "일반적으로 PC 마우스 클릭이 스마트폰 터치보다 5~15ms 빠르게 측정됩니다. 터치스크린은 클릭 감지 알고리즘이 추가되어 약간의 처리 지연이 있습니다." },
    },
    {
      "@type": "Question",
      name: "반응속도 결과에 오차가 있는 이유는 무엇인가요?",
      acceptedAnswer: { "@type": "Answer", text: "브라우저 타이머, 화면 주사율, 입력 장치, OS 스케줄링, 무선 마우스 지연 등으로 오차가 생길 수 있습니다. 한 번의 기록보다 같은 환경에서 반복 측정한 평균을 보는 것이 좋습니다." },
    },
    {
      "@type": "Question",
      name: "나이가 들면 반응속도도 느려지나요?",
      acceptedAnswer: { "@type": "Answer", text: "일반적으로 25세 이후부터 반응속도가 서서히 느려집니다. 하지만 규칙적인 운동과 인지 훈련으로 저하 속도를 크게 늦출 수 있습니다." },
    },
    {
      "@type": "Question",
      name: "일반인의 평균 반응속도는 얼마인가요?",
      acceptedAnswer: { "@type": "Answer", text: "일반 성인의 시각 반응속도는 보통 200~250ms 범위로 알려져 있습니다. 기기와 테스트 방식에 따라 차이가 있으므로 절대값보다 자신의 변화 추이를 보는 것이 좋습니다." },
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

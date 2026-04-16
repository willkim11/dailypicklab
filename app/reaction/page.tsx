import type { Metadata } from "next";
import ReactionClient from "./ReactionClient";

export const metadata: Metadata = {
  title: "반응속도 테스트 — 내 반응속도는 몇 ms?",
  description:
    "나의 반응속도를 측정해보세요. 5회 평균으로 정확하게 측정하며, 전국 평균(250ms)과 비교할 수 있습니다.",
  keywords: ["반응속도테스트", "반응속도측정", "반응속도", "반응시간"],
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
      acceptedAnswer: { "@type": "Answer", text: "브라우저의 JavaScript 타이머 정밀도, 화면 주사율(60Hz/120Hz), OS 스케줄링 등의 요인으로 ±50ms 오차가 발생할 수 있습니다." },
    },
    {
      "@type": "Question",
      name: "나이가 들면 반응속도도 느려지나요?",
      acceptedAnswer: { "@type": "Answer", text: "일반적으로 25세 이후부터 반응속도가 서서히 느려집니다. 하지만 규칙적인 운동과 인지 훈련으로 저하 속도를 크게 늦출 수 있습니다." },
    },
    {
      "@type": "Question",
      name: "일반인의 평균 반응속도는 얼마인가요?",
      acceptedAnswer: { "@type": "Answer", text: "일반 성인의 평균 시각 반응속도는 약 200~250ms입니다. 프로 e스포츠 선수는 120~160ms 수준을 보입니다." },
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

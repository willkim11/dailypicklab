import type { Metadata } from "next";
import LottoClient from "./LottoClient";

export const metadata: Metadata = {
  title: "로또 번호 추첨기 — 무료 온라인 로또 시뮬레이터",
  description:
    "1~45 중 6개 번호를 무작위로 추첨하는 무료 로또 번호 생성기. 여러 게임 동시 추첨, 지난 회차 당첨번호 제공.",
  keywords: ["로또번호추첨기", "로또번호생성기", "로또시뮬레이터", "로또번호"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "로또는 몇 살부터 구매할 수 있나요?",
      acceptedAnswer: { "@type": "Answer", text: "만 19세 이상 성인만 구매할 수 있습니다. 미성년자는 복권 구매가 법적으로 금지되어 있습니다." },
    },
    {
      "@type": "Question",
      name: "로또 당첨금에 세금이 붙나요?",
      acceptedAnswer: { "@type": "Answer", text: "5만원 이하(5등)는 비과세입니다. 200만원 이하는 22% 원천징수, 200만원 초과는 33% 원천징수됩니다." },
    },
    {
      "@type": "Question",
      name: "로또 당첨금 수령 기간은 얼마나 되나요?",
      acceptedAnswer: { "@type": "Answer", text: "당첨일로부터 1년 이내에 수령해야 합니다. 기간이 지나면 당첨금은 복권기금으로 귀속됩니다." },
    },
    {
      "@type": "Question",
      name: "자동과 수동 중 어느 쪽이 당첨 확률이 높나요?",
      acceptedAnswer: { "@type": "Answer", text: "통계적으로 두 방법의 당첨 확률은 동일합니다. 각 회차는 완전히 독립된 시행입니다." },
    },
    {
      "@type": "Question",
      name: "이 추첨기는 실제 당첨번호와 관계가 있나요?",
      acceptedAnswer: { "@type": "Answer", text: "아닙니다. 이 추첨기는 오직 재미를 위한 시뮬레이터입니다. 생성된 번호는 실제 추첨 결과와 완전히 무관합니다." },
    },
  ],
};

export default function LottoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LottoClient />
    </>
  );
}

import type { Metadata } from "next";
import ReactionClient from "./ReactionClient";

export const metadata: Metadata = {
  title: "반응속도 테스트 — 내 반응속도는 몇 ms?",
  description:
    "나의 반응속도를 측정해보세요. 5회 평균으로 정확하게 측정하며, 전국 평균(250ms)과 비교할 수 있습니다.",
  keywords: ["반응속도테스트", "반응속도측정", "반응속도", "반응시간"],
};

export default function ReactionPage() {
  return <ReactionClient />;
}

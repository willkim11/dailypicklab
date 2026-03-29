import type { Metadata } from "next";
import PersonalityClient from "./PersonalityClient";

export const metadata: Metadata = {
  title: "성격 유형 테스트 — 무료 MBTI 심리 테스트 온라인",
  description:
    "무료 성격 유형 테스트. 16가지 성격 유형 중 나는 어떤 유형인지 알아보세요. MBTI 기반 자체 제작 문항.",
  keywords: ["성격유형테스트", "MBTI", "MBTI테스트", "성격검사", "무료MBTI"],
};

export default function PersonalityPage() {
  return <PersonalityClient />;
}

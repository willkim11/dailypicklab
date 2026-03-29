import type { Metadata } from "next";
import LottoClient from "./LottoClient";

export const metadata: Metadata = {
  title: "로또 번호 추첨기 — 무료 온라인 로또 시뮬레이터",
  description:
    "1~45 중 6개 번호를 무작위로 추첨하는 무료 로또 번호 생성기. 여러 게임 동시 추첨, 지난 회차 당첨번호 제공.",
  keywords: ["로또번호추첨기", "로또번호생성기", "로또시뮬레이터", "로또번호"],
};

export default function LottoPage() {
  return <LottoClient />;
}

import type { Metadata } from "next";
import PasswordClient from "./PasswordClient";

export const metadata: Metadata = {
  title: "안전한 비밀번호 생성기 — 무료 랜덤 패스워드 만들기",
  description:
    "대소문자, 숫자, 특수문자 조합의 안전한 무작위 비밀번호를 생성합니다. 길이와 옵션을 자유롭게 설정하세요.",
  keywords: ["비밀번호생성기", "패스워드생성기", "랜덤비밀번호", "안전한비밀번호"],
};

export default function PasswordPage() {
  return <PasswordClient />;
}

import type { Metadata } from "next";
import PasswordClient from "./PasswordClient";

export const metadata: Metadata = {
  title: "안전한 비밀번호 생성기 — 무료 랜덤 패스워드 만들기",
  description:
    "대소문자, 숫자, 특수문자 조합의 안전한 무작위 비밀번호를 생성합니다. 길이와 옵션을 자유롭게 설정하세요.",
  keywords: ["비밀번호생성기", "패스워드생성기", "랜덤비밀번호", "안전한비밀번호"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "생성된 비밀번호가 어딘가에 저장되나요?",
      acceptedAnswer: { "@type": "Answer", text: "아닙니다. 이 생성기는 100% 브라우저에서 동작하며, 생성된 비밀번호는 서버로 전송되거나 저장되지 않습니다." },
    },
    {
      "@type": "Question",
      name: "비밀번호는 얼마나 길게 만들어야 하나요?",
      acceptedAnswer: { "@type": "Answer", text: "최소 12자 이상을 권장합니다. 대소문자+숫자+특수문자 조합 16자 이상이면 매우 강력한 비밀번호입니다." },
    },
    {
      "@type": "Question",
      name: "특수문자가 꼭 필요한가요?",
      acceptedAnswer: { "@type": "Answer", text: "필수는 아니지만 강력히 권장합니다. 특수문자를 추가하면 가능한 조합의 수가 기하급수적으로 늘어나 해독이 훨씬 어려워집니다." },
    },
    {
      "@type": "Question",
      name: "비밀번호를 얼마나 자주 바꿔야 하나요?",
      acceptedAnswer: { "@type": "Answer", text: "최신 NIST 가이드라인에서는 강력한 비밀번호를 사용한다면 주기적 변경보다 유출 의심 시에만 변경하는 것을 권장합니다." },
    },
  ],
};

export default function PasswordPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PasswordClient />
    </>
  );
}

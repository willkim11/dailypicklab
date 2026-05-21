import type { Metadata } from "next";
import PasswordClient from "./PasswordClient";

export const metadata: Metadata = {
  title: "안전한 비밀번호 생성기 — 브라우저에서 만드는 랜덤 패스워드",
  description:
    "브라우저에서만 동작하는 안전한 비밀번호 생성기입니다. 길이, 문자 조합, 2단계 인증, 패스키, 비밀번호 관리자 사용법까지 함께 안내합니다.",
  keywords: ["비밀번호생성기", "패스워드생성기", "랜덤비밀번호", "안전한비밀번호", "비밀번호보안"],
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
      acceptedAnswer: { "@type": "Answer", text: "개인 계정에는 최소 12자 이상, 중요한 계정에는 16자 이상을 권장합니다. 최신 NIST 기준은 단일 인증용 비밀번호에 최소 15자 요구를 제시합니다." },
    },
    {
      "@type": "Question",
      name: "이 생성기는 비밀번호를 서버로 보내나요?",
      acceptedAnswer: { "@type": "Answer", text: "아닙니다. 비밀번호 생성은 브라우저 안에서만 처리되며, 생성된 문자열은 서버로 전송되거나 저장되지 않습니다." },
    },
    {
      "@type": "Question",
      name: "비밀번호만 강하면 충분한가요?",
      acceptedAnswer: { "@type": "Answer", text: "아닙니다. 중요한 계정에는 비밀번호 관리자, 2단계 인증, 가능하면 패스키나 보안 키 같은 피싱 저항 인증을 함께 사용하는 것이 좋습니다." },
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

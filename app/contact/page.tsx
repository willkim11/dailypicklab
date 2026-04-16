import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — 문의하기",
  description: "버그 제보, 기능 제안, 광고 문의 등 Daily Pick Lab 관련 모든 문의를 환영합니다. 1~3 영업일 내에 답변드립니다.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        문의하기
      </h1>
      <p className="mb-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        버그 제보, 기능 제안, 광고 문의 등 무엇이든 환영합니다. 보통 1~3 영업일 내에 답변드립니다.
      </p>
      <p className="mb-8 text-sm" style={{ color: "var(--color-text-muted)" }}>
        직접 이메일을 보내셔도 됩니다:{" "}
        <a href="mailto:contact@dailypicklab.com" style={{ color: "var(--color-primary)" }} className="hover:underline">
          contact@dailypicklab.com
        </a>
      </p>

      <div className="p-6 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <ContactClient />
      </div>
    </div>
  );
}

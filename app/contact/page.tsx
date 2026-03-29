import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — 문의하기",
  description: "Daily Pick Lab 문의 및 피드백",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        문의하기
      </h1>
      <p className="mb-10" style={{ color: "var(--color-text-muted)" }}>
        버그 제보, 기능 제안, 광고 문의 등 무엇이든 환영합니다.
      </p>

      <div
        className="p-6 rounded-xl border"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
      >
        <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text-muted)" }}>
          이메일
        </p>
        <a
          href="mailto:contact@dailypicklab.com"
          className="text-lg font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          contact@dailypicklab.com
        </a>
        <p className="mt-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          보통 1~3 영업일 내에 답변드립니다.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {[
          { title: "🐛 버그 제보", desc: "어떤 페이지에서, 어떤 문제가 발생했는지 알려주세요." },
          { title: "💡 기능 제안", desc: "원하시는 도구나 기능을 제안해주세요." },
          { title: "📢 광고 문의", desc: "스폰서십 및 광고 관련 문의를 환영합니다." },
        ].map((item) => (
          <div
            key={item.title}
            className="p-4 rounded-xl border"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
          >
            <p className="font-semibold" style={{ color: "var(--color-text)" }}>{item.title}</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

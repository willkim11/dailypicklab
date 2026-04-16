"use client";

import { useState } from "react";

type Category = "bug" | "feature" | "ad" | "other";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "bug", label: "🐛 버그 제보" },
  { value: "feature", label: "💡 기능 제안" },
  { value: "ad", label: "📢 광고 문의" },
  { value: "other", label: "💬 기타 문의" },
];

export default function ContactClient() {
  const [category, setCategory] = useState<Category>("bug");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label ?? category;
    const subject = encodeURIComponent(`[Daily Pick Lab] ${categoryLabel}${name ? ` — ${name}` : ""}`);
    const body = encodeURIComponent(`문의 유형: ${categoryLabel}\n이름: ${name || "(미입력)"}\n\n${message}`);
    window.location.href = `mailto:contact@dailypicklab.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {/* 문의 유형 */}
      <div>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>문의 유형</p>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors text-left"
              style={{
                backgroundColor: category === c.value ? "var(--color-primary)" : "var(--color-bg)",
                color: category === c.value ? "white" : "var(--color-text)",
                borderColor: category === c.value ? "var(--color-primary)" : "var(--color-border)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 이름 */}
      <div>
        <label className="text-sm font-semibold block mb-1" style={{ color: "var(--color-text)" }}>
          이름 <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(선택)</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
        />
      </div>

      {/* 내용 */}
      <div>
        <label className="text-sm font-semibold block mb-1" style={{ color: "var(--color-text)" }}>
          내용 <span style={{ color: "#EF4444" }}>*</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="어떤 페이지에서 어떤 문제가 발생했는지, 또는 제안하고 싶은 내용을 자유롭게 적어주세요."
          rows={5}
          required
          className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none transition-colors"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        이메일로 보내기
      </button>

      {sent && (
        <p className="text-sm text-center" style={{ color: "var(--color-text-muted)" }}>
          이메일 앱이 열립니다. 발송 후 1~3 영업일 내에 답변드립니다.
        </p>
      )}

      <p className="text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
        버튼을 누르면 기본 이메일 앱이 열립니다. 이메일 앱이 없는 경우{" "}
        <a href="mailto:contact@dailypicklab.com" style={{ color: "var(--color-primary)" }} className="hover:underline">
          contact@dailypicklab.com
        </a>
        으로 직접 보내주세요.
      </p>
    </form>
  );
}

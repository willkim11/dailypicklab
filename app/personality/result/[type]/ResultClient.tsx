"use client";

import { TYPE_INFO, type PersonalityType } from "@/lib/personality";
import Link from "next/link";
import { useState } from "react";
import OtherToolsNav from "@/components/OtherToolsNav";

export default function ResultClient({ type }: { type: PersonalityType }) {
  const info = TYPE_INFO[type];
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* 결과 헤더 */}
      <div
        className="p-8 rounded-2xl text-white text-center"
        style={{ backgroundColor: info.color }}
      >
        <p className="text-sm font-medium opacity-80 mb-2">당신의 성격 유형은</p>
        <h1 className="text-6xl font-bold tracking-wide">{type}</h1>
        <p className="text-xl font-semibold mt-2 opacity-90">{info.nickname}</p>
      </div>

      {/* 설명 */}
      <div
        className="mt-6 p-6 rounded-2xl border"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
      >
        <p className="text-lg leading-relaxed" style={{ color: "var(--color-text)" }}>
          {info.description}
        </p>
      </div>

      {/* 특성 */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {info.traits.map((trait) => (
          <div
            key={trait}
            className="flex items-center gap-2 p-3 rounded-xl border"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
          >
            <span style={{ color: info.color }}>✓</span>
            <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
              {trait}
            </span>
          </div>
        ))}
      </div>

      {/* 공유 버튼 */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 py-3 rounded-xl font-semibold text-white transition-colors"
          style={{ backgroundColor: copied ? "var(--color-success)" : info.color }}
        >
          {copied ? "링크 복사됨 ✓" : "🔗 링크 복사"}
        </button>
        <Link
          href="/personality"
          className="flex-1 py-3 rounded-xl font-semibold text-center border transition-colors"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          🔄 다시 테스트하기
        </Link>
      </div>

      {/* AdSense 콘텐츠 */}
      <section className="mt-12" style={{ color: "var(--color-text-muted)" }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          성격 유형 검사란?
        </h2>
        <p>
          이 검사는 4가지 성격 축(E/I, S/N, T/F, J/P)을 기반으로 16가지 유형을 분류합니다.
          1940년대 Isabel Briggs Myers와 Katherine Cook Briggs가 Carl Jung의 심리학 이론을
          바탕으로 개발한 성격 유형 분류 체계에서 영감을 받았습니다.
        </p>
        <p className="mt-3">
          결과는 절대적인 것이 아니며 같은 유형도 개인마다 다양한 특성을 보입니다.
          자신을 이해하고 타인과 소통하는 데 참고 자료로 활용하세요.
        </p>
      </section>

      <OtherToolsNav currentHref="/personality" />
    </div>
  );
}

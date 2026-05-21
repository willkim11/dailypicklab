"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { href: "/guides", label: "가이드" },
  { href: "/password", label: "비밀번호 생성기" },
  { href: "/pomodoro", label: "뽀모도로" },
  { href: "/reaction", label: "반응속도 테스트" },
  { href: "/personality", label: "성격 유형 테스트" },
  { href: "/lotto", label: "로또 시뮬레이터" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="brand-container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-lg tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            aria-hidden="true"
          >
            D
          </span>
          <span>Daily Pick Lab</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden lg:flex items-center gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-3 py-2.5 text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center"
                style={{ color: "var(--color-text-soft)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-bg-card)";
                  e.currentTarget.style.color = "var(--color-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-text-soft)";
                }}
              >
                {tool.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/guides"
            className="hidden sm:flex h-10 items-center rounded-md px-5 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary-dark)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
          >
            가이드 보기
          </Link>

          <button
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 ml-1 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              style={{ backgroundColor: "var(--color-text-muted)" }}
            />
            <span
              className={`block w-5 h-0.5 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
              style={{ backgroundColor: "var(--color-text-muted)" }}
            />
            <span
              className={`block w-5 h-0.5 transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              style={{ backgroundColor: "var(--color-text-muted)" }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="lg:hidden border-t px-4 py-2"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
        >
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block rounded-md px-3 py-3 text-sm font-medium transition-colors"
              style={{
                color: "var(--color-text)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-card)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setMenuOpen(false)}
            >
              {tool.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

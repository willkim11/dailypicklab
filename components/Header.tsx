"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const tools = [
  { href: "/lotto", label: "로또 추첨기" },
  { href: "/personality", label: "성격 유형 테스트" },
  { href: "/reaction", label: "반응속도 테스트" },
  { href: "/pomodoro", label: "뽀모도로" },
  { href: "/password", label: "비밀번호 생성기" },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header
      className="border-b transition-colors"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg"
          style={{ color: "var(--color-primary)" }}
        >
          Daily Pick Lab
        </Link>

        {/* Desktop nav + 다크모드 버튼 */}
        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-3 py-2.5 text-sm rounded-md transition-colors min-h-[44px] flex items-center"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {tool.label}
              </Link>
            ))}
          </nav>

          {/* 다크모드 토글 */}
          <button
            onClick={toggle}
            className="w-11 h-11 flex items-center justify-center rounded-lg transition-colors ml-1"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label={theme === "light" ? "다크모드로 전환" : "라이트모드로 전환"}
            title={theme === "light" ? "다크모드" : "라이트모드"}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 ml-1"
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

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden border-t"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
        >
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block px-4 py-3 text-sm border-b transition-colors"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-subtle)")}
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

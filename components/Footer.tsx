import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t mt-16 py-8 transition-colors"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            © 2025 Daily Pick Lab. 무료 온라인 유틸리티 도구 모음.
          </p>
          <nav className="flex items-center gap-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <Link href="/privacy" className="px-2 py-3 hover:underline min-h-[44px] flex items-center">개인정보처리방침</Link>
            <Link href="/terms" className="px-2 py-3 hover:underline min-h-[44px] flex items-center">이용약관</Link>
            <Link href="/about" className="px-2 py-3 hover:underline min-h-[44px] flex items-center">About</Link>
            <Link href="/contact" className="px-2 py-3 hover:underline min-h-[44px] flex items-center">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

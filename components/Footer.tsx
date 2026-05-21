import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t mt-24 py-12 transition-colors"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
    >
      <div className="brand-container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="text-lg font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
              Daily Pick Lab
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
              생활에 바로 쓰는 브라우저 도구와 실용 가이드를 정리합니다. 개인정보를 최소화하고, 업데이트 기준과 출처를 함께 남깁니다.
            </p>
            <p className="mt-5 text-xs" style={{ color: "var(--color-text-soft)" }}>
              © 2026 Daily Pick Lab. 무료 온라인 유틸리티 도구 모음.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm" style={{ color: "var(--color-text-soft)" }}>
            <Link href="/privacy" className="py-2 hover:underline">개인정보처리방침</Link>
            <Link href="/terms" className="py-2 hover:underline">이용약관</Link>
            <Link href="/about" className="py-2 hover:underline">About</Link>
            <Link href="/contact" className="py-2 hover:underline">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

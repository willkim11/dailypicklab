import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dailypicklab.vercel.app"),
  title: {
    template: "%s | Daily Pick Lab",
    default: "Daily Pick Lab — 매일 쓰는 무료 도구 모음",
  },
  description:
    "로또 번호 추첨기, 성격 유형 테스트, 반응속도 테스트, 뽀모도로 타이머, 비밀번호 생성기 — 매일 쓰는 무료 온라인 도구 모음",
  keywords: [
    "로또번호추첨기",
    "성격유형테스트",
    "MBTI",
    "반응속도테스트",
    "뽀모도로타이머",
    "비밀번호생성기",
  ],
  openGraph: {
    siteName: "Daily Pick Lab",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-noto-sans-kr), sans-serif" }}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

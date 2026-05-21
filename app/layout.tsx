import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.dailypicklab.com"),
  title: {
    template: "%s | Daily Pick Lab",
    default: "Daily Pick Lab — 생활에 바로 쓰는 무료 가이드와 도구",
  },
  description:
    "비밀번호 보안, 집중 루틴, 반응속도, 성격 유형, 확률 이해까지 생활에 바로 쓰는 무료 가이드와 브라우저 도구 모음",
  keywords: [
    "비밀번호생성기",
    "비밀번호보안",
    "뽀모도로타이머",
    "집중력",
    "반응속도테스트",
    "성격유형테스트",
    "로또번호추첨기",
  ],
  openGraph: {
    siteName: "Daily Pick Lab",
    locale: "ko_KR",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-2678965337292925",
    "google-site-verification": "SeK_-6dieHD9JbYPpZKul6XkmFrPF56kIZD3nZ4B6us",
    "naver-site-verification": "51fd4407178c1967df2b2521c47ee695d8ddd076",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Daily Pick Lab",
  url: "https://www.dailypicklab.com",
  description: "비밀번호 보안, 집중 루틴, 반응속도, 성격 유형, 확률 이해까지 생활에 바로 쓰는 무료 가이드와 브라우저 도구 모음",
  inLanguage: "ko",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.dailypicklab.com/guides",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2678965337292925"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

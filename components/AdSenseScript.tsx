"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const ADSENSE_CLIENT = "ca-pub-2678965337292925";
const AD_ENABLED_PATHS = new Set([
  "/",
  "/password",
  "/pomodoro",
  "/reaction",
  "/guides/password-security",
  "/guides/pomodoro-study",
  "/guides/reaction-speed",
  "/guides/reaction-test-accuracy",
  "/guides/reaction-device-latency",
  "/guides/reaction-training-log",
  "/guides/mbti-types",
]);

export default function AdSenseScript() {
  const pathname = usePathname();

  if (!AD_ENABLED_PATHS.has(pathname)) {
    return null;
  }

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}

import type { Metadata } from "next";
import PomodoroClient from "./PomodoroClient";

export const metadata: Metadata = {
  title: "뽀모도로 타이머 — 무료 온라인 집중 타이머",
  description:
    "25분 집중, 5분 휴식. 뽀모도로 기법으로 집중력을 높이는 무료 온라인 타이머. 사이클 완료 시 브라우저 알림 지원.",
  keywords: ["뽀모도로타이머", "뽀모도로", "집중타이머", "공부타이머", "포모도로"],
};

export default function PomodoroPage() {
  return <PomodoroClient />;
}

import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";

export const metadata: Metadata = {
  title: "Daily Pick Lab — 매일 쓰는 무료 도구 모음",
  description:
    "로또 번호 추첨기, 성격 유형 테스트, 반응속도 테스트, 뽀모도로 타이머, 비밀번호 생성기. 매일 쓰는 무료 온라인 도구 5가지.",
};

const tools = [
  {
    href: "/lotto",
    icon: "🎱",
    title: "로또 번호 추첨기",
    description: "1~45 중 6개 번호를 무작위로 추첨합니다. 여러 게임 동시 추첨 가능.",
  },
  {
    href: "/personality",
    icon: "🧠",
    title: "성격 유형 테스트",
    description: "16가지 성격 유형 중 나는 어떤 유형인지 무료로 알아보세요.",
  },
  {
    href: "/reaction",
    icon: "⚡",
    title: "반응속도 테스트",
    description: "나의 반응속도는 몇 ms? 5회 평균으로 정확하게 측정합니다.",
  },
  {
    href: "/pomodoro",
    icon: "🍅",
    title: "뽀모도로 타이머",
    description: "25분 집중, 5분 휴식. 집중력을 높이는 뽀모도로 기법 타이머.",
  },
  {
    href: "/password",
    icon: "🔐",
    title: "비밀번호 생성기",
    description: "대소문자·숫자·특수문자 조합의 안전한 무작위 비밀번호를 생성합니다.",
  },
];

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-subtle)" }}>
      {/* 히어로 섹션 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-10">
        <h1
          className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          오늘의 선택, Daily Pick Lab
        </h1>
        <p
          className="mt-4 text-base sm:text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          로또 번호부터 성격 유형까지 — 매일 쓰는 무료 도구 5가지
        </p>
      </section>

      {/* 툴 카드 그리드 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

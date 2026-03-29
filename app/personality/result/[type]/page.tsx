import type { Metadata } from "next";
import { ALL_TYPES, TYPE_INFO, type PersonalityType } from "@/lib/personality";
import ResultClient from "./ResultClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ALL_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const info = TYPE_INFO[type as PersonalityType];
  if (!info) return {};

  return {
    title: `${type} — ${info.nickname} | 성격 유형 테스트`,
    description: `나의 성격 유형은 ${type} ${info.nickname}. ${info.description.slice(0, 80)}...`,
    openGraph: {
      title: `나는 ${type} ${info.nickname}입니다`,
      description: info.description.slice(0, 100),
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!ALL_TYPES.includes(type as PersonalityType)) {
    notFound();
  }

  return <ResultClient type={type as PersonalityType} />;
}

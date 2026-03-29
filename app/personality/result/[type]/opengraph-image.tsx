import { ImageResponse } from "next/og";
import { ALL_TYPES, TYPE_INFO, type PersonalityType } from "@/lib/personality";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ALL_TYPES.map((type) => ({ type }));
}

export default async function Image({ params }: { params: { type: string } }) {
  const type = params.type as PersonalityType;
  const info = TYPE_INFO[type] ?? TYPE_INFO["INFP"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: info.color,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 28, margin: 0 }}>
            나의 성격 유형은
          </p>
          <p style={{ color: "white", fontSize: 120, fontWeight: 900, margin: 0, letterSpacing: "8px" }}>
            {type}
          </p>
          <p style={{ color: "rgba(255,255,255,0.95)", fontSize: 40, fontWeight: 600, margin: 0 }}>
            {info.nickname}
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 22, margin: "8px 80px 0", textAlign: "center" }}>
            Daily Pick Lab — 무료 성격 유형 테스트
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Daily Pick Lab 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--color-text)" }}>
        개인정보처리방침
      </h1>

      <div className="space-y-8 text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
        <section>
          <h2 className="text-lg font-semibold mb-3">1. 개인정보 수집 여부</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            Daily Pick Lab(이하 "본 사이트")은 회원가입, 로그인 등의 절차 없이 이용 가능하며,
            별도의 개인정보를 수집하지 않습니다. 반응속도 최고기록 등 일부 데이터는
            사용자의 브라우저 로컬 스토리지에 저장되며, 서버로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. 광고 서비스 (Google AdSense)</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트는 Google AdSense 광고 서비스를 사용합니다. Google은 광고 제공을 위해
            쿠키를 사용할 수 있으며, 이를 통해 사용자의 이전 방문 기록을 바탕으로
            맞춤형 광고가 표시될 수 있습니다.
          </p>
          <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
            Google의 개인정보 사용 방식에 대한 자세한 내용은{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--color-primary)" }}
            >
              Google 개인정보처리방침
            </a>
            을 참고하세요. 맞춤형 광고를 원하지 않으시면{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--color-primary)" }}
            >
              Google 광고 설정
            </a>
            에서 변경하실 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. 쿠키 사용</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트는 광고 서비스 제공을 위해 제3자(Google)의 쿠키를 사용할 수 있습니다.
            브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 서비스 이용에 제한이 생길 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. 분석 도구</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트는 Vercel Analytics를 통해 페이지 조회수 등 집계된 통계 데이터를 수집할 수 있습니다.
            이 데이터는 개인을 식별하지 않으며 서비스 개선 목적으로만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. 문의</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            개인정보 관련 문의사항은{" "}
            <a href="/contact" className="underline" style={{ color: "var(--color-primary)" }}>
              Contact 페이지
            </a>
            를 통해 연락주세요.
          </p>
        </section>

        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          최종 업데이트: 2025년 1월
        </p>
      </div>
    </div>
  );
}

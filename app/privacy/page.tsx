import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Daily Pick Lab의 개인정보 수집 여부, 로컬 저장소, 쿠키, Google AdSense 광고 및 분석 도구 사용 방침을 안내합니다.",
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
            이름, 생년월일, 전화번호 등 사용자를 직접 식별할 수 있는 개인정보를 별도로 수집하지 않습니다.
            반응속도 최고기록 등 일부 데이터는
            사용자의 브라우저 로컬 스토리지에 저장되며, 서버로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. 광고 서비스 (Google AdSense)</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트는 사이트 운영 비용을 충당하기 위해 Google AdSense 광고 서비스를 사용할 수 있습니다.
            Google 및 Google의 광고 파트너는 광고 제공, 광고 빈도 제한, 광고 성과 측정,
            맞춤형 광고 제공을 위해 쿠키 또는 유사한 기술을 사용할 수 있습니다.
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
          <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
            맞춤형 광고를 비활성화하더라도 문맥 기반 광고 등 일부 광고는 계속 표시될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. 쿠키 사용</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            쿠키는 브라우저에 저장되는 작은 데이터입니다. 본 사이트 자체 기능은 대부분 쿠키 없이
            이용할 수 있지만, Google AdSense와 같은 제3자 서비스는 광고 표시와 측정을 위해
            쿠키를 사용할 수 있습니다.
          </p>
          <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
            사용자는 브라우저 설정에서 쿠키를 삭제하거나 차단할 수 있습니다. 다만 쿠키를 차단하면
            일부 광고 설정이나 외부 서비스 기능이 제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. 로컬 저장소</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            반응속도 테스트의 최고기록, 테마 설정 등 일부 편의 기능은 사용자의 기기 안에 있는
            localStorage를 사용할 수 있습니다. 이 정보는 본 사이트 서버로 전송되지 않으며,
            브라우저 데이터 삭제 시 함께 삭제될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. 분석 도구</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트는 Vercel Analytics를 통해 페이지 조회수 등 집계된 통계 데이터를 수집할 수 있습니다.
            이 데이터는 개인을 식별하지 않으며 서비스 개선 목적으로만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. 외부 링크</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트의 가이드나 안내문에는 참고 자료를 위한 외부 링크가 포함될 수 있습니다.
            외부 사이트의 개인정보 처리와 쿠키 사용은 해당 사이트의 정책을 따릅니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">7. 문의</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            개인정보 관련 문의사항은{" "}
            <a href="/contact" className="underline" style={{ color: "var(--color-primary)" }}>
              Contact 페이지
            </a>
            를 통해 연락주세요.
          </p>
        </section>

        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          최종 업데이트: 2026년 5월 21일
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "Daily Pick Lab 이용약관",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--color-text)" }}>
        이용약관
      </h1>

      <div className="space-y-8 text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
        <section>
          <h2 className="text-lg font-semibold mb-3">1. 서비스 소개</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            Daily Pick Lab은 로또 번호 추첨기, 성격 유형 테스트, 반응속도 테스트, 뽀모도로 타이머,
            비밀번호 생성기 등 무료 온라인 도구를 제공하는 서비스입니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. 서비스 이용</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 서비스는 누구나 무료로 이용할 수 있습니다. 서비스 이용을 위한 별도의 회원가입이
            필요하지 않습니다. 사용자는 법령 및 본 약관에서 금지하는 행위를 해서는 안 됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. 면책 조항</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            로또 번호 추첨기는 오락 목적의 시뮬레이터이며, 실제 당첨을 보장하지 않습니다.
            성격 유형 테스트 결과는 참고용이며 전문 심리 진단을 대체하지 않습니다.
            반응속도 측정은 브라우저 및 기기 환경에 따라 ±50ms 오차가 있을 수 있습니다.
          </p>
          <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
            본 서비스는 정보 제공 목적으로만 운영되며, 서비스 이용으로 인한 손해에 대해
            운영자는 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. 지식재산권</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트의 모든 콘텐츠(텍스트, 디자인, 코드 등)의 저작권은 운영자에게 있습니다.
            무단 복제, 배포를 금지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. 서비스 변경 및 중단</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            운영자는 서비스의 내용을 사전 고지 없이 변경하거나 중단할 수 있습니다.
            서비스 변경으로 인한 손해에 대해서는 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. 문의</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            이용약관에 관한 문의는{" "}
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

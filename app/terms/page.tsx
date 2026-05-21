import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "Daily Pick Lab의 서비스 이용 조건, 도구별 주의사항, 광고 및 외부 링크 기준을 안내합니다.",
};

const cautions = [
  "로또 번호 시뮬레이터는 오락 및 확률 이해 목적이며 실제 당첨을 예측하거나 보장하지 않습니다.",
  "성격 유형 테스트는 자기 이해를 돕는 참고 자료이며 전문 심리 검사나 진단을 대체하지 않습니다.",
  "반응속도 테스트는 브라우저, 화면 주사율, 입력 장치, 컨디션에 따라 결과가 달라질 수 있습니다.",
  "비밀번호 생성기는 브라우저 안에서 작동하지만, 생성한 비밀번호의 보관과 사용 책임은 사용자에게 있습니다.",
];

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
            Daily Pick Lab은 비밀번호 생성기, 뽀모도로 타이머, 반응속도 테스트, 성격 유형 테스트,
            로또 번호 시뮬레이터와 관련 가이드를 제공하는 무료 온라인 서비스입니다.
            대부분의 기능은 회원가입 없이 브라우저에서 바로 사용할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. 서비스 이용 조건</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            사용자는 관련 법령과 본 약관을 준수해야 하며, 서비스의 정상 운영을 방해하거나
            타인의 권리를 침해하는 방식으로 본 사이트를 이용해서는 안 됩니다.
          </p>
          <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
            로또 등 복권 구매와 관련된 행위는 대한민국 관련 법령과 동행복권 공식 안내를 따라야 하며,
            미성년자는 복권을 구매할 수 없습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. 도구별 주의사항</h2>
          <div className="space-y-3">
            {cautions.map((item) => (
              <div key={item} className="rounded-xl border p-4 text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)", color: "var(--color-text-muted)" }}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. 정보의 한계와 면책</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트의 콘텐츠는 일반적인 정보 제공과 편의 도구 제공을 목적으로 합니다.
            보안, 건강 습관, 심리 유형, 확률, 세금 등과 관련된 내용은 참고 자료이며,
            전문적인 법률·세무·의료·심리 상담을 대체하지 않습니다.
          </p>
          <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
            사이트 이용으로 발생하는 결정과 그 결과에 대한 최종 책임은 사용자에게 있습니다.
            중요한 결정은 공식 기관, 전문가, 관련 서비스의 최신 안내를 확인한 뒤 진행해 주세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. 광고 및 외부 링크</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트는 운영 비용 충당을 위해 Google AdSense 등 문맥 광고를 표시할 수 있습니다.
            광고와 외부 링크는 본 사이트가 해당 상품, 서비스, 외부 콘텐츠의 정확성이나 결과를 보장한다는 뜻이 아닙니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. 지식재산권</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            본 사이트의 텍스트, 디자인, 코드 등 콘텐츠의 권리는 Daily Pick Lab 또는 각 권리자에게 있습니다.
            허가 없이 콘텐츠를 대량 복제하거나 재배포하는 행위를 금지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">7. 서비스 변경 및 중단</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            운영자는 기능 개선, 오류 수정, 정책 변경, 외부 서비스 변경 등의 이유로 서비스 내용을 변경하거나
            일부 기능을 중단할 수 있습니다. 중요한 변경사항은 가능한 범위에서 사이트 내에 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">8. 문의</h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            이용약관, 콘텐츠 오류, 개인정보, 광고 관련 문의는{" "}
            <a href="/contact" className="underline" style={{ color: "var(--color-primary)" }}>
              Contact 페이지
            </a>
            또는 contact@dailypicklab.com으로 연락해 주세요.
          </p>
        </section>

        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          최종 업데이트: 2026년 5월 21일
        </p>
      </div>
    </div>
  );
}

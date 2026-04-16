import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2025년 비밀번호 보안 완전 가이드",
  description:
    "해킹을 막는 강력한 비밀번호 만들기부터 비밀번호 관리 앱 활용법까지. 최신 보안 가이드라인 기반 완전 분석.",
};

export default function PasswordSecurityPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>
          ← 가이드 목록
        </Link>
      </div>

      <h1 className="text-3xl font-bold mt-4" style={{ color: "var(--color-text)" }}>
        2025년 비밀번호 보안 완전 가이드
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        "123456"은 전 세계에서 가장 많이 사용되는 비밀번호입니다. 해커들은 이를 0.001초 만에 뚫습니다. 내 계정을 지키는 단단한 비밀번호를 만드는 방법을 알아봅시다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          해커는 어떻게 비밀번호를 뚫을까?
        </h2>
        <div className="space-y-3">
          {[
            { method: "사전 공격 (Dictionary Attack)", desc: "일반적으로 사용되는 단어 목록(사전)을 이용해 비밀번호를 대입하는 방법. 'password', 'iloveyou', '12345678' 같은 비밀번호는 즉시 뚫립니다." },
            { method: "무차별 대입 (Brute Force)", desc: "가능한 모든 조합을 순서대로 시도하는 방법. 현대 컴퓨터는 초당 수십억 번의 시도가 가능합니다. 8자리 숫자 비밀번호는 약 3시간이면 해독됩니다." },
            { method: "크리덴셜 스터핑 (Credential Stuffing)", desc: "다른 사이트에서 유출된 아이디/비밀번호를 그대로 다른 사이트에 대입하는 방법. 동일한 비밀번호를 여러 곳에 사용하는 것이 위험한 이유입니다." },
            { method: "피싱 (Phishing)", desc: "가짜 로그인 페이지를 만들어 직접 입력하게 만드는 방법. 기술이 아무리 뛰어나도 사람을 속이는 사회공학적 공격입니다." },
          ].map((item) => (
            <div key={item.method} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.method}</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          NIST 권고 기준: 2025년 비밀번호 원칙
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          미국 국립표준기술연구소(NIST)는 2024년 비밀번호 가이드라인을 대폭 업데이트했습니다. 과거의 "90일마다 변경" 정책은 오히려 보안을 약화시킨다는 연구 결과에 기반한 변화입니다.
        </p>
        <div className="mt-4 space-y-2">
          {[
            "최소 8자, 권장 15자 이상 — 길이가 복잡성보다 중요",
            "주기적 변경 불필요 — 유출 의심 시에만 변경",
            "대소문자·숫자·특수문자 조합 강제 불필요 — 대신 길이 우선",
            "의미 있는 단어 3~4개 조합도 강력한 비밀번호 (예: 사과파란하늘여름)",
            "서비스마다 반드시 다른 비밀번호 사용",
          ].map((rule) => (
            <div key={rule} className="flex gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <span style={{ color: "var(--color-success)" }} className="shrink-0 font-bold mt-0.5">✓</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          비밀번호 관리 앱: 이제는 필수
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          수십 개의 사이트에 모두 다른 강력한 비밀번호를 쓰면서 기억하는 것은 불가능합니다. 비밀번호 관리 앱(Password Manager)은 이 문제를 해결합니다. 마스터 비밀번호 하나만 기억하면 나머지는 앱이 생성하고 관리합니다.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-subtle)" }}>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>앱</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>무료 여부</th>
                <th className="text-left px-3 py-2 border font-semibold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>특징</th>
              </tr>
            </thead>
            <tbody>
              {[
                { app: "Bitwarden", free: "완전 무료 (오픈소스)", feat: "오픈소스라 투명성 높음, 개인 사용 무제한 무료" },
                { app: "1Password", free: "유료 (월 2.99달러~)", feat: "UI 우수, 가족 요금제 지원, 여행 모드 기능" },
                { app: "KeePass", free: "완전 무료", feat: "오프라인 로컬 저장, 기술에 익숙한 사용자 적합" },
                { app: "iCloud 키체인", free: "무료 (Apple 기기)", feat: "Apple 기기 간 연동 자동, 별도 설치 불필요" },
              ].map((row) => (
                <tr key={row.app}>
                  <td className="px-3 py-2 border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>{row.app}</td>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>{row.free}</td>
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>{row.feat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          2단계 인증(2FA): 비밀번호가 유출돼도 안전한 방법
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          가장 강력한 비밀번호도 피싱 공격이나 데이터 유출로 노출될 수 있습니다. 2단계 인증(2FA)은 비밀번호가 유출되어도 계정을 보호하는 추가 보안 장치입니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          Google, 네이버, 카카오 등 주요 서비스는 2단계 인증을 지원합니다. SMS 인증보다 Google Authenticator나 Authy 같은 인증 앱이 훨씬 안전합니다. 지금 당장 가장 중요한 계정(이메일, 인터넷 뱅킹)부터 2단계 인증을 설정하세요.
        </p>
      </section>

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>지금 바로 강력한 비밀번호 만들기</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>브라우저에서 안전하게 동작하며 서버로 전송되지 않습니다.</p>
        <Link
          href="/password"
          className="inline-block px-5 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          비밀번호 생성기 →
        </Link>
      </div>
    </article>
  );
}

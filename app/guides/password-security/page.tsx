import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2026년 비밀번호 보안 실전 가이드",
  description:
    "강력한 비밀번호 만들기, 비밀번호 관리자, 2단계 인증, 패스키까지 최신 보안 기준을 바탕으로 정리한 실전 가이드.",
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
        2026년 비밀번호 보안 실전 가이드
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        좋은 비밀번호는 복잡한 기호를 억지로 외우는 문제가 아닙니다. 충분히 길고, 계정마다 다르며,
        비밀번호 관리자와 2단계 인증으로 보완되는 체계가 더 중요합니다.
      </p>
      <div className="mt-5 p-4 rounded-xl border text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)", color: "var(--color-text-muted)" }}>
        <p>최종 업데이트: 2026년 5월 21일</p>
        <p className="mt-1">작성 기준: NIST SP 800-63B-4, CISA MFA 안내, 주요 비밀번호 관리자 기능 비교를 참고했습니다.</p>
      </div>

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
          최신 권고 기준: 길이가 먼저다
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          미국 국립표준기술연구소(NIST)의 SP 800-63B-4는 단일 인증용 비밀번호에 최소 15자를 요구합니다.
          과거처럼 특수문자와 대문자를 억지로 섞게 하는 방식보다, 충분히 긴 비밀번호와 유출된 비밀번호 차단이 더 중요합니다.
        </p>
        <div className="mt-4 space-y-2">
          {[
            "중요 계정은 16자 이상, 가능하면 20자 이상 권장",
            "주기적 변경 불필요 — 유출 의심 시에만 변경",
            "대소문자·숫자·특수문자 조합보다 길이와 고유성이 우선",
            "사전에 있는 문장이나 개인정보는 피하고, 생성기는 무작위 문자열을 사용",
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
          2단계 인증과 패스키: 비밀번호가 유출돼도 버티는 방법
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          가장 강력한 비밀번호도 피싱 공격이나 데이터 유출로 노출될 수 있습니다. 2단계 인증(MFA)은
          비밀번호가 유출되어도 계정을 보호하는 추가 보안 장치입니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          CISA는 피싱에 강한 MFA 사용을 권장합니다. 가능하면 SMS보다 인증 앱, 보안 키, 패스키를 우선하고,
          지금 당장 이메일, 금융, 클라우드 저장소처럼 중요한 계정부터 켜는 것이 좋습니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          오늘 바로 점검할 체크리스트
        </h2>
        <div className="space-y-2">
          {[
            "이메일 계정 비밀번호가 다른 사이트와 겹치지 않는지 확인",
            "금융, 클라우드, 쇼핑 계정에 2단계 인증 켜기",
            "비밀번호 관리자에 없는 계정부터 하나씩 등록",
            "오래된 8~10자리 비밀번호를 16자 이상으로 교체",
            "패스키를 지원하는 서비스는 패스키 등록",
          ].map((item) => (
            <div key={item} className="flex gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <span style={{ color: "var(--color-success)" }} className="shrink-0 font-bold mt-0.5">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          참고 자료
        </h2>
        <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          <li>
            <a href="https://pages.nist.gov/800-63-4/sp800-63b.html" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary)" }}>
              NIST SP 800-63B-4 Digital Identity Guidelines
            </a>
          </li>
          <li>
            <a href="https://www.cisa.gov/secure-our-world/require-multifactor-authentication" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-primary)" }}>
              CISA Require Multifactor Authentication
            </a>
          </li>
        </ul>
      </section>

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>지금 바로 강력한 비밀번호 만들기</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>브라우저에서 안전하게 동작하며 서버로 전송되지 않습니다.</p>
        <Link
          href="/password"
          className="inline-block px-5 py-3 rounded-lg font-semibold text-sm"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
        >
          비밀번호 생성기 →
        </Link>
      </div>
    </article>
  );
}

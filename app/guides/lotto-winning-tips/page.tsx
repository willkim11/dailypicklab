import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "로또 번호 고르는 방법 — 확률, 오해, 책임 있는 이용 가이드",
  description:
    "자동과 수동의 확률 차이, 자주 나오는 번호에 대한 오해, 번호 선택 편향과 책임 있는 복권 이용 기준을 정리했습니다.",
};

export default function LottoGuidePage() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/guides" className="text-sm hover:underline" style={{ color: "var(--color-text-muted)" }}>
          ← 가이드 목록
        </Link>
      </div>

      <h1 className="text-3xl font-bold mt-4" style={{ color: "var(--color-text)" }}>
        로또 번호 고르는 방법: 확률과 오해 정리
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        매주 토요일 밤, 수백만 명이 기대를 품고 TV 앞에 앉습니다. 로또 1등 당첨 확률은 814만분의 1.
        이 확률을 바꿀 수는 없습니다. 그래서 번호 선택은 예측이 아니라 편향을 이해하고, 정해둔 예산 안에서 즐기는 방식으로 접근하는 것이 좋습니다.
      </p>
      <div className="mt-5 rounded-xl border p-4 text-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)", color: "var(--color-text-muted)" }}>
        <p>최종 업데이트: 2026년 5월 21일</p>
        <p className="mt-1">작성 기준: 로또 6/45 조합 수, 독립 시행 원리, 번호 선택 편향, 책임 있는 복권 이용 관점을 기준으로 정리했습니다.</p>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          자동 vs 수동: 당첨 확률은 같다
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          많은 사람들이 "자동이 더 잘 맞는다" 혹은 "수동으로 골라야 의미 있다"고 생각하지만, 통계적으로 두 방법의 당첨 확률은 완전히 동일합니다. 로또는 매 회차 독립 시행이기 때문에, 이전 회차의 당첨 번호가 다음 회차에 전혀 영향을 미치지 않습니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          단, 수동으로 번호를 고를 때 주의할 점이 있습니다. 사람들은 자신도 모르게 특정 번호에 편향되는 경향이 있습니다. 생일을 번호로 쓰면 1~31 사이에 번호가 집중되고, 이는 같은 번호를 선택한 사람이 많아진다는 의미입니다. 만약 당첨된다면 1등 당첨금이 분산됩니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          번호 선택에서 실제로 달라지는 것
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          로또 1등은 전체 당첨금을 1등 당첨자 수로 나눠 지급합니다. 같은 번호를 선택한 사람이 적을수록 당첨 시 나눠 받는 인원이 줄어들 수 있습니다. 다만 이것은 당첨 확률을 높인다는 뜻이 아닙니다.
        </p>
        <div className="mt-4 space-y-3">
          {[
            { title: "생일 번호 편향 줄이기", desc: "생일과 기념일을 쓰면 1~31에 번호가 몰리기 쉽습니다. 32~45 구간을 함께 고려하면 사람의 습관적 선택에서 조금 벗어날 수 있습니다." },
            { title: "눈에 띄는 조합 이해하기", desc: "1, 2, 3, 4, 5, 6 같은 조합도 확률 자체는 같습니다. 다만 많은 사람이 고르는 조합이라면 당첨 시 분배 인원이 많을 가능성이 있습니다." },
            { title: "무작위 선택 활용하기", desc: "무작위 추첨기는 1~45 전 구간에서 번호를 고릅니다. 특정 숫자에 의미를 부여하는 편향을 줄이고 싶을 때 사용할 수 있습니다." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
              <span style={{ color: "var(--color-primary)" }} className="font-bold shrink-0">→</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{item.title}</p>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          '자주 나오는 번호' 전략의 진실
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          인터넷에는 "지금까지 가장 많이 나온 번호 TOP 10"이나 "최근 10회 미출현 번호" 같은 통계가 넘쳐납니다. 과연 이런 통계가 의미 있을까요?
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          정답은 "아니오"입니다. 로또 추첨기는 매번 완전히 새로 시작합니다. 특정 번호가 최근 10회 동안 나오지 않았다고 해서 다음 회차에 나올 확률이 높아지는 것이 아닙니다. 이를 "도박사의 오류(Gambler's Fallacy)"라고 합니다. 동전을 10번 던져 모두 앞면이 나왔다고 해서 11번째에 뒷면이 나올 확률이 높아지지 않는 것과 같은 원리입니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          1등 확률 1/8,145,060은 어떻게 나올까?
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          로또 6/45는 45개의 번호 중 순서와 상관없이 6개를 고르는 조합입니다. 가능한 조합 수는
          45C6, 즉 8,145,060가지입니다. 따라서 특정 한 조합이 1등이 될 확률은 1/8,145,060입니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          번호가 예쁘게 보이는지, 최근에 나왔는지, 오래 나오지 않았는지는 이 조합 수를 바꾸지 않습니다.
          확률을 이해하면 “이번에는 꼭 나올 것 같다”는 감각과 실제 가능성을 분리해서 볼 수 있습니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
          로또를 즐기는 올바른 마음가짐
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          로또는 엔터테인먼트입니다. 1장에 1,000원을 내고 일주일 동안 "만약 당첨된다면..." 하는 상상의 즐거움을 사는 것이죠. 이 관점에서 바라본다면 로또는 충분히 가치 있는 오락거리입니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          하지만 당첨을 확신하거나, 생활비를 투자하거나, "이번 주만큼은 반드시"라는 생각으로 구매한다면 그것은 문제가 됩니다. 로또는 수익을 기대할 수 있는 투자 수단이 아닙니다. 한 주에 1~2장 정도를 즐거움으로 구매하는 것이 바람직합니다.
        </p>
        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
          <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>구매 전 체크</p>
          <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <li>정해둔 오락 예산 안에서만 구매하기</li>
            <li>손실을 만회하기 위해 추가 구매하지 않기</li>
            <li>당첨 예측, 유료 조합, 보장 광고를 조심하기</li>
          </ul>
        </div>
      </section>

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>이번 주 번호 뽑아보기</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>무작위 추첨기로 1~45 전 구간에서 균등하게 번호를 선택해보세요.</p>
        <Link
          href="/lotto"
          className="inline-block px-5 py-3 rounded-lg font-semibold text-sm"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
        >
          로또 번호 추첨하기 →
        </Link>
      </div>
    </article>
  );
}

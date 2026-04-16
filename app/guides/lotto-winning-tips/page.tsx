import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "로또 번호 고르는 방법 완전 가이드",
  description:
    "자동과 수동 중 어느 쪽이 유리할까? 로또 당첨 확률을 높이는 전략과 번호 선택의 심리학을 완전 분석합니다.",
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
        로또 번호 고르는 방법 완전 가이드
      </h1>
      <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        매주 토요일 밤, 수백만 명이 기대를 품고 TV 앞에 앉습니다. 로또 1등 당첨 확률은 814만분의 1.
        이 확률을 바꿀 수는 없지만, 번호를 어떻게 고르느냐에 따라 당첨금을 온전히 받을 가능성은 높일 수 있습니다.
      </p>

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
          당첨금을 온전히 받는 번호 선택 전략
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          로또 1등은 전체 당첨금을 1등 당첨자 수로 나눠 지급합니다. 같은 번호를 선택한 사람이 적을수록 내 몫이 커집니다. 즉, "당첨 확률"은 바꿀 수 없지만 "기대 당첨금"은 전략으로 높일 수 있습니다.
        </p>
        <div className="mt-4 space-y-3">
          {[
            { title: "32 이상의 번호 포함하기", desc: "사람들이 생일(1~31)을 많이 선택하기 때문에, 32~45 사이의 번호가 포함되면 같은 번호를 선택한 사람이 줄어 당첨금이 더 클 수 있습니다." },
            { title: "연속 번호 피하기", desc: "1, 2, 3, 4, 5, 6 같은 연속 번호는 매 회차 수만 명이 선택합니다. 당첨되더라도 수만 명과 나눠야 하므로 실질적인 당첨금이 매우 적어집니다." },
            { title: "무작위 선택 활용하기", desc: "이 페이지의 로또 번호 추첨기는 1~45 전 구간에서 균등하게 번호를 뽑습니다. 사람의 편향을 배제한 진짜 무작위 선택을 원한다면 적극 활용하세요." },
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
          로또를 즐기는 올바른 마음가짐
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          로또는 엔터테인먼트입니다. 1장에 1,000원을 내고 일주일 동안 "만약 당첨된다면..." 하는 상상의 즐거움을 사는 것이죠. 이 관점에서 바라본다면 로또는 충분히 가치 있는 오락거리입니다.
        </p>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          하지만 당첨을 확신하거나, 생활비를 투자하거나, "이번 주만큼은 반드시"라는 생각으로 구매한다면 그것은 문제가 됩니다. 로또는 수익을 기대할 수 있는 투자 수단이 아닙니다. 한 주에 1~2장 정도를 즐거움으로 구매하는 것이 바람직합니다.
        </p>
      </section>

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>이번 주 번호 뽑아보기</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>무작위 추첨기로 1~45 전 구간에서 균등하게 번호를 선택해보세요.</p>
        <Link
          href="/lotto"
          className="inline-block px-5 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          로또 번호 추첨하기 →
        </Link>
      </div>
    </article>
  );
}

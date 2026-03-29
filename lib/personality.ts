export type PersonalityType =
  | "INTJ" | "INTP" | "ENTJ" | "ENTP"
  | "INFJ" | "INFP" | "ENFJ" | "ENFP"
  | "ISTJ" | "ISFJ" | "ESTJ" | "ESFJ"
  | "ISTP" | "ISFP" | "ESTP" | "ESFP";

export const ALL_TYPES: PersonalityType[] = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

export interface TypeInfo {
  nickname: string;
  description: string;
  traits: string[];
  color: string;
}

export const TYPE_INFO: Record<PersonalityType, TypeInfo> = {
  INTJ: {
    nickname: "전략적인 설계자",
    color: "#4B5563",
    description:
      "당신은 독립적이고 결단력 있는 전략가입니다. 장기적인 목표를 세우고 체계적으로 실행하는 능력이 뛰어납니다. 혼자만의 시간을 통해 깊이 사고하며, 비효율적인 것을 참지 못합니다.",
    traits: ["독립적인 사고", "장기 계획 능력", "높은 기준", "전략적 통찰"],
  },
  INTP: {
    nickname: "논리적인 사색가",
    color: "#6366F1",
    description:
      "당신은 아이디어와 이론에 매료되는 사색가입니다. 복잡한 문제를 분석하고 패턴을 발견하는 데 탁월합니다. 지식 그 자체에 깊은 관심을 갖고, 끊임없이 '왜?'를 묻습니다.",
    traits: ["논리적 분석", "창의적 문제해결", "지식 탐구", "유연한 사고"],
  },
  ENTJ: {
    nickname: "대담한 지도자",
    color: "#1D4ED8",
    description:
      "당신은 타고난 리더입니다. 명확한 비전을 제시하고 팀을 이끄는 데 능숙하며, 목표 달성을 위해 강력하게 추진합니다. 비효율을 싫어하고 결과 중심적으로 행동합니다.",
    traits: ["강한 리더십", "목표 지향성", "결단력", "전략적 실행"],
  },
  ENTP: {
    nickname: "발명가형 토론가",
    color: "#7C3AED",
    description:
      "당신은 혁신적인 아이디어로 가득 찬 토론가입니다. 관습에 도전하고 새로운 방식을 탐구하는 것을 즐깁니다. 지적 토론에서 활기를 찾으며 다양한 관점을 탐색합니다.",
    traits: ["창의적 사고", "토론 능력", "혁신 추구", "빠른 학습"],
  },
  INFJ: {
    nickname: "통찰력 있는 조언자",
    color: "#065F46",
    description:
      "당신은 깊은 통찰력을 가진 이상주의자입니다. 사람들의 내면을 꿰뚫어 보는 직관이 뛰어나며, 세상을 더 나은 곳으로 만들려는 강한 열망을 갖고 있습니다.",
    traits: ["깊은 공감 능력", "강한 직관", "이상 추구", "신중한 판단"],
  },
  INFP: {
    nickname: "열정적인 중재자",
    color: "#059669",
    description:
      "당신은 조용하지만 열정적인 이상주의자입니다. 혼자만의 시간을 소중히 여기며 진정성 있는 관계를 추구합니다. 강한 가치관을 갖고 있으며 창의적 표현을 통해 자신을 드러냅니다.",
    traits: ["공감 능력", "창의적 사고", "깊은 인간관계 선호", "강한 가치관"],
  },
  ENFJ: {
    nickname: "카리스마 있는 선도자",
    color: "#D97706",
    description:
      "당신은 사람들에게 영감을 주는 타고난 교육자입니다. 주변 사람들의 성장을 돕는 데서 큰 기쁨을 느끼며, 따뜻한 카리스마로 사람들을 이끕니다.",
    traits: ["따뜻한 카리스마", "타인 이해", "영감 제공", "공동체 중심"],
  },
  ENFP: {
    nickname: "활기찬 활동가",
    color: "#F59E0B",
    description:
      "당신은 열정적이고 창의적인 자유영혼입니다. 새로운 아이디어와 가능성에 흥분하며, 사람들과의 연결에서 에너지를 얻습니다. 삶의 의미를 끊임없이 탐구합니다.",
    traits: ["열정적인 에너지", "창의성", "사람 지향적", "가능성 탐구"],
  },
  ISTJ: {
    nickname: "청렴결백한 관리자",
    color: "#1E40AF",
    description:
      "당신은 책임감이 강하고 신뢰할 수 있는 사람입니다. 규칙과 전통을 중시하며, 맡은 일은 반드시 해내는 성실함을 갖고 있습니다. 안정적이고 체계적인 환경에서 빛을 발합니다.",
    traits: ["강한 책임감", "신뢰성", "체계적 접근", "세심한 주의"],
  },
  ISFJ: {
    nickname: "용감한 수호자",
    color: "#0891B2",
    description:
      "당신은 조용하지만 헌신적인 수호자입니다. 사랑하는 사람들을 위해 묵묵히 노력하며, 세심하게 타인을 배려합니다. 안정적이고 조화로운 환경을 만드는 데 탁월합니다.",
    traits: ["헌신적인 배려", "세심한 관찰", "강한 의무감", "실용적 도움"],
  },
  ESTJ: {
    nickname: "엄격한 관리자",
    color: "#B45309",
    description:
      "당신은 질서와 효율을 추구하는 관리자입니다. 명확한 규칙과 기준에 따라 행동하며, 조직을 체계적으로 운영하는 능력이 뛰어납니다. 신뢰받는 리더로서 실질적인 결과를 냅니다.",
    traits: ["강한 조직력", "실용적 리더십", "명확한 기준", "결과 중심"],
  },
  ESFJ: {
    nickname: "사교적인 외교관",
    color: "#BE185D",
    description:
      "당신은 따뜻하고 사교적인 배려자입니다. 주변 사람들의 감정에 민감하게 반응하며, 조화롭고 협력적인 환경을 만드는 데 탁월합니다. 사람들과 함께할 때 가장 빛납니다.",
    traits: ["따뜻한 배려", "협동 능력", "사교성", "감정적 민감성"],
  },
  ISTP: {
    nickname: "만능 재주꾼",
    color: "#374151",
    description:
      "당신은 손재주가 뛰어난 실용주의자입니다. 어떻게 작동하는지 직접 파악하는 것을 즐기며, 위기 상황에서 침착하고 효율적으로 대처합니다. 자유롭고 독립적인 삶을 선호합니다.",
    traits: ["실용적 문제해결", "침착한 대응", "독립성", "기술적 숙련"],
  },
  ISFP: {
    nickname: "호기심 많은 예술가",
    color: "#10B981",
    description:
      "당신은 섬세하고 예술적인 감수성을 가진 탐험가입니다. 현재 순간에 충실하며, 자신만의 방식으로 아름다움을 표현합니다. 경쟁보다 협력을, 갈등보다 조화를 추구합니다.",
    traits: ["예술적 감수성", "현재 집중", "온화한 성격", "자유로운 표현"],
  },
  ESTP: {
    nickname: "모험을 즐기는 사업가",
    color: "#DC2626",
    description:
      "당신은 에너지 넘치는 행동주의자입니다. 즉각적인 행동을 통해 문제를 해결하며, 위험을 두려워하지 않습니다. 사교적이고 현실적이며, 지금 이 순간을 최대한 즐깁니다.",
    traits: ["대담한 행동력", "현실적 사고", "강한 사교성", "즉각적 대응"],
  },
  ESFP: {
    nickname: "자유로운 연예인",
    color: "#EC4899",
    description:
      "당신은 삶을 축제처럼 즐기는 엔터테이너입니다. 활기차고 즉흥적이며, 주변 사람들에게 기쁨과 에너지를 전파합니다. 지금 이 순간의 즐거움을 가장 중요하게 생각합니다.",
    traits: ["밝은 에너지", "즉흥성", "사람 지향적", "현재 지향적"],
  },
};

// 질문 데이터 (16문항, 각 축 4문항)
export type Axis = "EI" | "SN" | "TF" | "JP";
export type Direction = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  axis: Axis;
  text: string;
  optionA: { text: string; direction: Direction };
  optionB: { text: string; direction: Direction };
}

export const QUESTIONS: Question[] = [
  // E/I
  {
    id: 1, axis: "EI",
    text: "주말에 가장 하고 싶은 일은?",
    optionA: { text: "친구들과 모여서 신나게 놀기", direction: "E" },
    optionB: { text: "집에서 혼자 조용히 쉬기", direction: "I" },
  },
  {
    id: 2, axis: "EI",
    text: "낯선 사람이 많은 파티에 참석했을 때 나는?",
    optionA: { text: "모르는 사람에게 먼저 말을 건다", direction: "E" },
    optionB: { text: "아는 사람을 찾거나 조용히 있는다", direction: "I" },
  },
  {
    id: 3, axis: "EI",
    text: "에너지를 충전하는 방법은?",
    optionA: { text: "사람들과 어울리며 대화하기", direction: "E" },
    optionB: { text: "혼자만의 시간을 갖기", direction: "I" },
  },
  {
    id: 4, axis: "EI",
    text: "생각을 정리할 때 나는?",
    optionA: { text: "말하면서 생각을 정리한다", direction: "E" },
    optionB: { text: "혼자 조용히 생각한 뒤 말한다", direction: "I" },
  },
  // S/N
  {
    id: 5, axis: "SN",
    text: "새로운 정보를 접할 때 나는?",
    optionA: { text: "구체적인 사실과 세부사항에 집중한다", direction: "S" },
    optionB: { text: "전체적인 패턴과 가능성을 먼저 본다", direction: "N" },
  },
  {
    id: 6, axis: "SN",
    text: "문제를 해결할 때 선호하는 방식은?",
    optionA: { text: "검증된 방법을 단계별로 따른다", direction: "S" },
    optionB: { text: "새로운 방법을 창의적으로 시도한다", direction: "N" },
  },
  {
    id: 7, axis: "SN",
    text: "친구가 고민을 털어놓을 때 나는?",
    optionA: { text: "지금 당장 도움이 될 현실적인 조언을 한다", direction: "S" },
    optionB: { text: "문제의 근본 원인과 가능성을 탐색한다", direction: "N" },
  },
  {
    id: 8, axis: "SN",
    text: "여행을 계획할 때 나는?",
    optionA: { text: "일정표와 예약을 꼼꼼히 준비한다", direction: "S" },
    optionB: { text: "큰 그림만 잡고 즉흥적으로 즐긴다", direction: "N" },
  },
  // T/F
  {
    id: 9, axis: "TF",
    text: "중요한 결정을 내릴 때 나는?",
    optionA: { text: "논리와 객관적 사실을 기준으로 판단한다", direction: "T" },
    optionB: { text: "나와 상대방의 감정과 가치를 우선 고려한다", direction: "F" },
  },
  {
    id: 10, axis: "TF",
    text: "친구가 나쁜 선택을 할 것 같을 때 나는?",
    optionA: { text: "솔직하게 문제점을 짚어준다", direction: "T" },
    optionB: { text: "감정을 먼저 공감하고 부드럽게 이야기한다", direction: "F" },
  },
  {
    id: 11, axis: "TF",
    text: "팀 프로젝트에서 갈등이 생겼을 때 나는?",
    optionA: { text: "감정보다 결과와 효율성을 기준으로 해결한다", direction: "T" },
    optionB: { text: "팀원들의 감정을 먼저 살피며 화합을 도모한다", direction: "F" },
  },
  {
    id: 12, axis: "TF",
    text: "칭찬받을 때 더 기쁜 것은?",
    optionA: { text: "\"정말 잘 분석했어, 논리적이야\"", direction: "T" },
    optionB: { text: "\"네 덕분에 분위기가 좋아졌어\"", direction: "F" },
  },
  // J/P
  {
    id: 13, axis: "JP",
    text: "일상에서 나는?",
    optionA: { text: "할 일 목록을 만들고 계획대로 움직인다", direction: "J" },
    optionB: { text: "그때그때 상황에 맞게 유연하게 행동한다", direction: "P" },
  },
  {
    id: 14, axis: "JP",
    text: "마감이 있는 과제가 주어졌을 때 나는?",
    optionA: { text: "일찍 시작해서 여유 있게 끝낸다", direction: "J" },
    optionB: { text: "마감 직전에 집중해서 끝낸다", direction: "P" },
  },
  {
    id: 15, axis: "JP",
    text: "방 청소를 할 때 나는?",
    optionA: { text: "정기적으로 깔끔하게 정리해둔다", direction: "J" },
    optionB: { text: "필요할 때 몰아서 한다", direction: "P" },
  },
  {
    id: 16, axis: "JP",
    text: "결정을 내린 뒤 나는?",
    optionA: { text: "빠르게 결론 내리고 실행한다", direction: "J" },
    optionB: { text: "더 좋은 옵션이 있을지 계속 열어둔다", direction: "P" },
  },
];

export function calculateType(answers: Record<number, Direction>): PersonalityType {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).forEach((d) => { score[d]++; });

  const e = score.E >= score.I ? "E" : "I";
  const s = score.S >= score.N ? "S" : "N";
  const t = score.T >= score.F ? "T" : "F";
  const j = score.J >= score.P ? "J" : "P";

  return `${e}${s}${t}${j}` as PersonalityType;
}

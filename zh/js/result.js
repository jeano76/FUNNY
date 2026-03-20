/* ===========================
   result.js - 결과 표시 로직
   =========================== */

// Get personality data from i18n translations (personalities.js or translations.js)
function getResultData() {
  if (window.i18n && window.TRANSLATIONS) {
    const lang = window.i18n.getCurrentLang ? window.i18n.getCurrentLang() : 'ko';
    return window.TRANSLATIONS[lang]?.personalities || window.TRANSLATIONS.ko.personalities;
  }
  return {};
}

const resultData = {
  // ---- 분석형 NT ----
  INTJ: {
    name: "老虎", emoji: "🐯", title: "고독한 전략가",
    group: "분석형 (NT) · 가장 희귀한 유형 중 하나",
    description: "독립심이 강하고 전략적인 당신. 혼자만의 영역을 중시하며 목표를 향해 치밀하게 움직입니다. 겉으로는 차가워 보이지만, 내면에는 강렬한 비전과 의지가 숨어있습니다. 비효율적인 것을 참지 못하고, 항상 더 나은 방법을 생각합니다.",
    strengths: ["전략적 사고", "독립심", "결단력", "목표 집중"],
    weaknesses: ["완벽주의", "고집스러움", "감정 표현 어려움"],
    koreanRatio: "2.1%",
    worldRarityRank: "★★★★★ 최희귀",
    compatibleTypes: ["ENFP 海豚 🐬", "ENTP 鹦鹉 🦜"],
    famousExamples: ["일론 머스크", "니체", "아이작 뉴턴"],
    shareText: "나는 INTJ 老虎! 고독한 전략가 🐯 당신의 성격 유형은?"
  },
  INTP: {
    name: "猫头鹰", emoji: "🦉", title: "논리적 탐구자",
    group: "분석형 (NT)",
    description: "밤에 더 명확해지는 지적 호기심의 끝판왕. 조용하지만 머릿속은 복잡한 이론으로 가득 차 있습니다. 아이디어를 탐구하고 분석하는 것을 즐기며, 불합리한 논리를 만나면 그냥 지나치지 못합니다.",
    strengths: ["논리적 분석", "창의적 사고", "지적 호기심", "객관성"],
    weaknesses: ["우유부단함", "마감 기피", "사회적 거리감"],
    koreanRatio: "3.3%",
    worldRarityRank: "★★★★ 희귀",
    compatibleTypes: ["ENTJ 狮子 🦁", "ENFJ 金毛寻回犬 🐕"],
    famousExamples: ["알버트 아인슈타인", "빌 게이츠"],
    shareText: "나는 INTP 猫头鹰! 논리적 탐구자 🦉 당신의 성격 유형은?"
  },
  ENTJ: {
    name: "狮子", emoji: "🦁", title: "타고난 리더",
    group: "분석형 (NT)",
    description: "타고난 리더입니다. 무리를 이끄는 카리스마와 결단력이 돋보이는 정글의 왕 같습니다. 목표 달성을 위해 사람들을 조직하고 이끄는 것을 즐깁니다. 효율성을 중시하며 약한 모습을 보이지 않으려 합니다.",
    strengths: ["리더십", "결단력", "전략적 기획", "자신감"],
    weaknesses: ["권위주의", "감정 무시", "지나친 경쟁심"],
    koreanRatio: "1.8%",
    worldRarityRank: "★★★★★ 최희귀",
    compatibleTypes: ["INTP 猫头鹰 🦉", "INFP 海马 🦭"],
    famousExamples: ["스티브 잡스", "마가렛 대처"],
    shareText: "나는 ENTJ 狮子! 타고난 리더 🦁 당신의 성격 유형은?"
  },
  ENTP: {
    name: "鹦鹉", emoji: "🦜", title: "발명가형 토론러",
    group: "분석형 (NT)",
    description: "똑똑하고 말재주가 뛰어납니다. 새로운 자극을 좋아하며 어디서든 분위기를 주도하는 재치꾼입니다. '이렇게 하면 어떨까?' 하는 새로운 아이디어가 끊임없이 샘솟습니다. 토론을 즐기고 반론을 위한 반론도 마다하지 않습니다.",
    strengths: ["창의성", "언변", "빠른 적응", "아이디어 뱅크"],
    weaknesses: ["끈기 부족", "논쟁 집착", "실행력 부족"],
    koreanRatio: "3.2%",
    worldRarityRank: "★★★ 보통",
    compatibleTypes: ["INTJ 老虎 🐯", "INFJ 熊猫 🐼"],
    famousExamples: ["레오나르도 다빈치", "벤자민 프랭클린"],
    shareText: "나는 ENTP 鹦鹉! 발명가형 토론러 🦜 당신의 성격 유형은?"
  },
  // ---- 외교형 NF ----
  INFJ: {
    name: "熊猫", emoji: "🐼", title: "신비로운 통찰자",
    group: "외교형 (NF) · 전 세계 가장 희귀한 유형",
    description: "겉은 순해 보이지만 내면은 아주 단단하고 신비롭습니다. 희귀하고 소중한 존재감을 뿜어냅니다. 사람들의 감정과 동기를 직관적으로 읽고, 세상을 더 나은 곳으로 만들고자 하는 강한 사명감을 가집니다.",
    strengths: ["통찰력", "공감 능력", "강한 신념", "창의성"],
    weaknesses: ["과도한 완벽주의", "번아웃", "혼자 짊어지기"],
    koreanRatio: "1.5%",
    worldRarityRank: "★★★★★ 전 세계 최희귀",
    compatibleTypes: ["ENTP 鹦鹉 🦜", "ENFP 海豚 🐬"],
    famousExamples: ["마틴 루서 킹", "넬슨 만델라"],
    shareText: "나는 INFJ 熊猫! 전 세계 가장 희귀한 유형 🐼 당신의 성격 유형은?"
  },
  INFP: {
    name: "海马", emoji: "🦭", title: "이상적인 몽상가",
    group: "외교형 (NF)",
    description: "섬세하고 로맨틱한 몽상가입니다. 자기만의 평화롭고 아름다운 내면 세계를 유영합니다. 진정성과 가치관을 중시하며, 불의를 참지 못하는 강한 도덕심을 가집니다. 조용하지만 내면에 불꽃이 타오릅니다.",
    strengths: ["공감 능력", "창의성", "진정성", "개방성"],
    weaknesses: ["자기비판", "현실 도피 경향", "결단력 부족"],
    koreanRatio: "4.4%",
    worldRarityRank: "★★★ 보통",
    compatibleTypes: ["ENTJ 狮子 🦁", "ENFJ 金毛寻回犬 🐕"],
    famousExamples: ["윌리엄 셰익스피어", "J.K. 롤링"],
    shareText: "나는 INFP 海马! 이상적인 몽상가 🦭 당신의 성격 유형은?"
  },
  ENFJ: {
    name: "金毛寻回犬", emoji: "🐕", title: "다정한 리더",
    group: "외교형 (NF)",
    description: "사람을 너무 좋아하고 친절합니다. 모두가 행복하길 바라며 꼬리를 흔드는 다정함이 특징입니다. 사람들에게 영감을 주고 그들의 잠재력을 이끌어내는 타고난 선생님 같은 존재입니다.",
    strengths: ["리더십", "공감 능력", "소통 능력", "헌신"],
    weaknesses: ["자기희생 과다", "타인 의존", "비판에 민감"],
    koreanRatio: "1.6%",
    worldRarityRank: "★★★★★ 한국 최희귀",
    compatibleTypes: ["INFP 海马 🦭", "INTP 猫头鹰 🦉"],
    famousExamples: ["오프라 윈프리", "버락 오바마"],
    shareText: "나는 ENFJ 金毛寻回犬! 다정한 리더 🐕 당신의 성격 유형은?"
  },
  ENFP: {
    name: "海豚", emoji: "🐬", title: "자유로운 영감가",
    group: "외교형 (NF)",
    description: "에너지가 넘치고 장난기가 많습니다. 지능이 높으면서도 주변 사람들을 즐겁게 만드는 재주가 있습니다. 새로운 가능성에 흥분하고, 사람들 사이의 연결을 소중히 여깁니다. 어디서든 분위기를 밝게 만드는 존재입니다.",
    strengths: ["창의성", "열정", "소통 능력", "공감"],
    weaknesses: ["집중력 부족", "감정 기복", "마감 취약"],
    koreanRatio: "5.1%",
    worldRarityRank: "★★ 흔한 편",
    compatibleTypes: ["INTJ 老虎 🐯", "INFJ 熊猫 🐼"],
    famousExamples: ["로빈 윌리엄스", "엘렌 드제너러스"],
    shareText: "나는 ENFP 海豚! 자유로운 영감가 🐬 당신의 성격 유형은?"
  },
  // ---- 관리자형 SJ ----
  ISTJ: {
    name: "海狸", emoji: "🦫", title: "성실의 아이콘",
    group: "관리자형 (SJ) · 한국인 1위 유형",
    description: "설계도를 보듯 꼼꼼하게 일을 처리합니다. 규칙을 준수하고 책임감이 강한 성실의 아이콘입니다. 말보다 행동으로 보여주며, 맡은 일은 반드시 완수합니다. 신뢰할 수 있는 사람의 대명사입니다.",
    strengths: ["책임감", "성실함", "꼼꼼함", "신뢰성"],
    weaknesses: ["변화 거부", "융통성 부족", "감정 표현 서툼"],
    koreanRatio: "16.4%",
    worldRarityRank: "★ 가장 흔한 유형",
    compatibleTypes: ["ESFP 孔雀 🦚", "ENFP 海豚 🐬"],
    famousExamples: ["워런 버핏", "앤젤라 메르켈"],
    shareText: "나는 ISTJ 海狸! 한국인 1위 성실의 아이콘 🦫 당신의 성격 유형은?"
  },
  ISFJ: {
    name: "鹿", emoji: "🦌", title: "따뜻한 수호자",
    group: "관리자형 (SJ)",
    description: "온순하고 배려심이 깊습니다. 무리(가족, 친구)를 조용히 챙기고 보호하는 따뜻한 마음씨를 가졌습니다. 눈에 띄지 않아도 항상 주변 사람들을 위해 묵묵히 일합니다. 감사 표현을 받으면 행복해합니다.",
    strengths: ["배려", "헌신", "꼼꼼함", "신뢰성"],
    weaknesses: ["자기주장 부족", "변화 적응 느림", "자기비판"],
    koreanRatio: "13.8%",
    worldRarityRank: "★ 흔한 유형",
    compatibleTypes: ["ESTP 猎豹 🐆", "ESFP 孔雀 🦚"],
    famousExamples: ["테레사 수녀", "비욘세"],
    shareText: "나는 ISFJ 鹿! 따뜻한 수호자 🦌 당신의 성격 유형은?"
  },
  ESTJ: {
    name: "狼", emoji: "🐺", title: "엄격한 관리자",
    group: "관리자형 (SJ)",
    description: "규율과 질서를 중시합니다. 공동체의 안녕을 위해 체계적으로 움직이며 리더십을 발휘합니다. 일에 있어서는 매우 직설적이며 효율성을 최우선으로 생각합니다. 뚜렷한 원칙과 기준이 있습니다.",
    strengths: ["조직력", "결단력", "리더십", "책임감"],
    weaknesses: ["고집", "감수성 부족", "완고함"],
    koreanRatio: "8.7%",
    worldRarityRank: "★★ 보통",
    compatibleTypes: ["ISFP 树懒 🦥", "INFP 海马 🦭"],
    famousExamples: ["힐러리 클린턴", "산드라 오"],
    shareText: "나는 ESTJ 狼! 엄격한 관리자 🐺 당신의 성격 유형은?"
  },
  ESFJ: {
    name: "大象", emoji: "🐘", title: "사교적인 돌봄이",
    group: "관리자형 (SJ)",
    description: "사회성이 매우 좋습니다. 서로 돕고 챙기는 공동체 의식이 강하며 주변의 경조사를 다 꿰고 있습니다. 사람들과의 조화를 소중히 여기며, 모든 사람이 포함되고 환영받는 분위기를 만들기 위해 노력합니다.",
    strengths: ["사교성", "배려", "협력", "실용성"],
    weaknesses: ["타인 의식 과다", "갈등 회피", "자기비판"],
    koreanRatio: "12.3%",
    worldRarityRank: "★ 흔한 유형",
    compatibleTypes: ["ISFP 树懒 🦥", "ISTP 猫 🐱"],
    famousExamples: ["테일러 스위프트", "빌 클린턴"],
    shareText: "나는 ESFJ 大象! 사교적인 돌봄이 🐘 당신의 성격 유형은?"
  },
  // ---- 탐험가형 SP ----
  ISTP: {
    name: "猫", emoji: "🐱", title: "시크한 장인",
    group: "탐험가형 (SP)",
    description: '"나 좀 내버려 둬." 평소엔 시크하지만 필요할 땐 엄청난 순발력과 기술을 보여주는 효율 중시형입니다. 말보다 행동, 이론보다 실천을 중시합니다. 손으로 직접 무언가를 만들고 분해하는 것을 즐깁니다.',
    strengths: ["문제 해결", "기술력", "침착함", "적응력"],
    weaknesses: ["감정 표현 어려움", "장기 계획 싫어함", "고집"],
    koreanRatio: "5.4%",
    worldRarityRank: "★★★ 보통",
    compatibleTypes: ["ESTJ 狼 🐺", "ENTJ 狮子 🦁"],
    famousExamples: ["클린트 이스트우드", "어윈 슈뢰딩거"],
    shareText: "나는 ISTP 猫! 시크한 장인 🐱 당신의 성격 유형은?"
  },
  ISFP: {
    name: "树懒", emoji: "🦥", title: "자유로운 예술가",
    group: "탐험가형 (SP)",
    description: "평화로운 예술가입니다. 서두르지 않고 현재의 여유를 즐기며 자기만의 속도로 세상을 삽니다. 아름다움과 조화를 추구하며, 자신의 가치관에 맞는 삶을 사는 것이 가장 중요합니다.",
    strengths: ["감수성", "유연성", "충성심", "현재 집중"],
    weaknesses: ["계획 없음", "결단력 부족", "경쟁 회피"],
    koreanRatio: "8.8%",
    worldRarityRank: "★★ 보통",
    compatibleTypes: ["ESTJ 狼 🐺", "ESFJ 大象 🐘"],
    famousExamples: ["마이클 잭슨", "아비게일 브레슬린"],
    shareText: "나는 ISFP 树懒! 자유로운 예술가 🦥 당신의 성격 유형은?"
  },
  ESTP: {
    name: "猎豹", emoji: "🐆", title: "스릴 추구자",
    group: "탐험가형 (SP)",
    description: "생각보다 몸이 먼저 나가는 스타일. 스피드와 스릴을 즐기며 위기 상황에서 본능적으로 대처합니다. 현실적이고 실용적이며, 지금 이 순간을 최대한 즐기려 합니다. 액션이 없으면 지루해합니다.",
    strengths: ["행동력", "문제 해결", "적응력", "설득력"],
    weaknesses: ["충동적", "장기 계획 어려움", "감정 둔감"],
    koreanRatio: "4.3%",
    worldRarityRank: "★★★ 보통",
    compatibleTypes: ["ISFJ 鹿 🦌", "ISTJ 海狸 🦫"],
    famousExamples: ["도널드 트럼프", "어니스트 헤밍웨이"],
    shareText: "나는 ESTP 猎豹! 스릴 추구자 🐆 당신의 성격 유형은?"
  },
  ESFP: {
    name: "孔雀", emoji: "🦚", title: "화려한 연예인",
    group: "탐험가형 (SP)",
    description: "화려한 무대 체질입니다. 남들의 시선을 즐기며 순간순간을 축제처럼 사는 분위기 메이커입니다. 어디서든 유쾌하고 에너제틱한 분위기를 만들어냅니다. 삶을 즐기는 방법을 누구보다 잘 압니다.",
    strengths: ["사교성", "즐거움", "현재 집중", "적응력"],
    weaknesses: ["계획 부족", "집중력 낮음", "갈등 회피"],
    koreanRatio: "8.5%",
    worldRarityRank: "★★ 보통",
    compatibleTypes: ["ISTJ 海狸 🦫", "ISFJ 鹿 🦌"],
    famousExamples: ["아델", "미국 마릴린 먼로"],
    shareText: "나는 ESFP 孔雀! 화려한 연예인 🦚 당신의 성격 유형은?"
  }
};

// --- Init ---
document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.pathname.endsWith('result.html')) return;

  const params = new URLSearchParams(location.search);
  const type = params.get('type');

  if (type && resultData[type]) {
    // Show loading briefly then display
    setTimeout(function () {
      displayResult(type);
    }, 1200);
  } else {
    // Check localStorage
    const stored = getMBTIData();
    if (stored.currentResult && resultData[stored.currentResult.type]) {
      setTimeout(function () {
        displayResult(stored.currentResult.type);
      }, 1200);
    } else {
      // No result - redirect
      window.location.href = 'quiz.html';
    }
  }
});

function displayResult(type) {
  // Always use ko.personalities as base, then overlay language-specific translations
  let r = null;
  let lang = 'ko';
  if (window.i18n && window.TRANSLATIONS) {
    lang = window.i18n.getCurrentLang ? window.i18n.getCurrentLang() : 'ko';
    // Base: always Korean personality data
    r = (window.TRANSLATIONS.ko && window.TRANSLATIONS.ko.personalities && window.TRANSLATIONS.ko.personalities[type])
      ? Object.assign({}, window.TRANSLATIONS.ko.personalities[type])
      : null;
    // Overlay: translated animal name and type title from language section
    if (r && lang !== 'ko' && window.TRANSLATIONS[lang]) {
      const langData = window.TRANSLATIONS[lang];
      if (langData.animals && langData.animals[type]) r.name = langData.animals[type];
      if (langData.typeTitles && langData.typeTitles[type]) r.title = langData.typeTitles[type];
    }
  }

  // Fallback to hardcoded resultData
  if (!r) r = resultData[type];
  if (!r) return;

  // Set translated labels for share/action buttons (have IDs, may have been set before i18n ran)
  var rT = (window.TRANSLATIONS && window.TRANSLATIONS[lang] && window.TRANSLATIONS[lang].result) || {};
  var setLabel = function(id, key) {
    var el = document.getElementById(id);
    if (el && rT[key]) el.textContent = rT[key];
  };
  setLabel('kakaoShareBtn', 'kakaoShare');
  setLabel('twitterShareBtn', 'twitterShare');
  setLabel('facebookShareBtn', 'facebookShare');
  setLabel('copyLinkBtn', 'copyLink');
  setLabel('compatBtn', 'compatButton');
  setLabel('saveImageBtn', 'saveImageButton');
  setLabel('careersBtn', 'careersButton');

  // Hide loading, show content
  document.getElementById('resultLoading').style.display = 'none';
  document.getElementById('resultContent').style.display = 'block';

  // Fill result card
  var animalName = r.name;
  var typeTitle = r.title;

  document.getElementById('resultTypeBadge').textContent = type;
  document.getElementById('resultAnimalEmoji').textContent = r.emoji;
  document.getElementById('resultAnimalName').textContent = animalName;
  document.getElementById('resultTitle').textContent = typeTitle;
  document.getElementById('resultGroup').textContent = r.group;
  document.getElementById('resultDescription').textContent = r.description;
  document.getElementById('statKorean').textContent = r.koreanRatio;
  document.getElementById('statRarity').textContent = r.worldRarityRank;

  // Strengths tags
  const sl = document.getElementById('strengthsList');
  sl.innerHTML = r.strengths.map(function (s) { return '<span class="tag">' + s + '</span>'; }).join('');

  // Compatible types
  const cl = document.getElementById('compatList');
  cl.innerHTML = r.compatibleTypes.map(function (c) { return '<span class="compat-tag">' + c + '</span>'; }).join('');

  // Update page meta
  document.getElementById('pageTitle').textContent = type + ' ' + animalName + r.emoji;
  document.getElementById('ogTitle').content = type + ' ' + animalName + r.emoji;
  document.getElementById('ogDesc').content = r.description.slice(0, 100) + '...';
  document.getElementById('ogUrl').content = location.href;
  document.getElementById('ogImage').content = location.origin + '/assets/og-image.png';
  document.getElementById('twImage').content = location.origin + '/assets/og-image.png';

  // Show share, history, actions
  document.getElementById('shareSection').style.display = 'block';
  document.getElementById('resultActions').style.display = 'flex';

  // History
  const data = getMBTIData();
  if (data.history && data.history.length > 0) {
    const histSec = document.getElementById('historySection');
    const histList = document.getElementById('historyList');
    histSec.style.display = 'block';
    histList.innerHTML = data.history.map(function (h) {
      const d = new Date(h.date);
      const dateStr = d.getFullYear() + '.' + (d.getMonth()+1) + '.' + d.getDate();
      return '<div class="history-item"><span class="history-type">' + h.type + ' ' + h.animal + '</span><span class="history-date">' + dateStr + '</span></div>';
    }).join('');
  }

  // Bind share buttons
  bindShareButtons(type, r);
}

function bindShareButtons(type, r) {
  document.getElementById('kakaoShareBtn').onclick = function () { shareKakao(type, r); };
  document.getElementById('twitterShareBtn').onclick = function () { shareTwitter(type, r); };
  document.getElementById('facebookShareBtn').onclick = function () { shareFacebook(); };
  document.getElementById('copyLinkBtn').onclick = function () { copyLink(type); };
}

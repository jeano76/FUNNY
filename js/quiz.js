/* ===========================
   quiz.js - MBTI 퀴즈 로직
   =========================== */

const quizData = [
  // ---- E / I 축 ----
  {
    id: 1, axis: "EI",
    emoji: "🎉",
    text: "오랜만에 주말이 생겼다! 나는 주로...",
    options: [
      { text: "친구들에게 연락해서 약속을 잡는다", score: "E" },
      { text: "아무 계획 없이 집에서 충전하는 시간을 즐긴다", score: "I" }
    ]
  },
  {
    id: 2, axis: "EI",
    emoji: "🎤",
    text: "처음 만나는 모임에서 나는...",
    options: [
      { text: "먼저 말을 걸고 금방 친해진다", score: "E" },
      { text: "자리를 파악하며 천천히 대화에 참여한다", score: "I" }
    ]
  },
  {
    id: 3, axis: "EI",
    emoji: "😪",
    text: "긴 하루를 보낸 후 에너지를 충전하는 방법은?",
    options: [
      { text: "친구나 가족과 수다를 떨며 스트레스를 푼다", score: "E" },
      { text: "혼자만의 공간에서 조용히 쉰다", score: "I" }
    ]
  },
  {
    id: 4, axis: "EI",
    emoji: "📞",
    text: "카카오톡에 메시지가 쌓여있다. 나의 반응은?",
    options: [
      { text: "바로바로 답장하면서 대화를 이어간다", score: "E" },
      { text: "나중에 한꺼번에 확인하고 간결하게 답한다", score: "I" }
    ]
  },
  {
    id: 5, axis: "EI",
    emoji: "🎓",
    text: "새로운 것을 배울 때 효율이 높은 방법은?",
    options: [
      { text: "친구들과 함께 토론하며 배운다", score: "E" },
      { text: "혼자 조용히 집중해서 공부한다", score: "I" }
    ]
  },
  // ---- S / N 축 ----
  {
    id: 6, axis: "SN",
    emoji: "✈️",
    text: "여행 계획을 세울 때 나는...",
    options: [
      { text: "맛집, 명소 등 구체적인 일정을 꼼꼼히 짠다", score: "S" },
      { text: "큰 방향만 정하고 현장에서 즉흥적으로 결정한다", score: "N" }
    ]
  },
  {
    id: 7, axis: "SN",
    emoji: "📱",
    text: "새 스마트폰을 살 때 가장 중요하게 보는 것은?",
    options: [
      { text: "배터리, 카메라 화소 등 구체적인 스펙", score: "S" },
      { text: "'이 폰으로 어떤 생활을 하게 될까' 하는 전체적인 느낌", score: "N" }
    ]
  },
  {
    id: 8, axis: "SN",
    emoji: "💭",
    text: "멍 때릴 때 내 머릿속은 주로...",
    options: [
      { text: "오늘 먹은 것, 해야 할 일 등 현실적인 생각들", score: "S" },
      { text: "전혀 엉뚱한 상상이나 아이디어들이 떠오른다", score: "N" }
    ]
  },
  {
    id: 9, axis: "SN",
    emoji: "📖",
    text: "소설책을 읽을 때 나는...",
    options: [
      { text: "이야기 줄거리와 사건 전개에 집중한다", score: "S" },
      { text: "행간의 의미, 상징, 작가의 의도를 생각한다", score: "N" }
    ]
  },
  {
    id: 10, axis: "SN",
    emoji: "🔧",
    text: "새 가전제품을 구입했다. 나는...",
    options: [
      { text: "설명서를 꼼꼼히 읽고 순서대로 따른다", score: "S" },
      { text: "일단 켜보고 직접 사용하면서 익힌다", score: "N" }
    ]
  },
  // ---- T / F 축 ----
  {
    id: 11, axis: "TF",
    emoji: "😢",
    text: "친구가 힘들다고 고민을 털어놓는다. 나는...",
    options: [
      { text: "문제의 원인을 파악하고 해결책을 제시한다", score: "T" },
      { text: "일단 충분히 공감하고 감정을 받아준다", score: "F" }
    ]
  },
  {
    id: 12, axis: "TF",
    emoji: "⚖️",
    text: "팀 프로젝트에서 의견 충돌이 생겼다. 나는...",
    options: [
      { text: "데이터와 논리로 옳고 그름을 따진다", score: "T" },
      { text: "모두가 납득하고 화합할 수 있는 방향을 찾는다", score: "F" }
    ]
  },
  {
    id: 13, axis: "TF",
    emoji: "🎬",
    text: "영화를 보고 나서 친구와 대화할 때 나는...",
    options: [
      { text: "스토리의 허점이나 논리적 오류를 지적한다", score: "T" },
      { text: "인물의 감정선과 감동 포인트를 이야기한다", score: "F" }
    ]
  },
  {
    id: 14, axis: "TF",
    emoji: "📝",
    text: "후배나 친구에게 피드백을 줄 때 나는...",
    options: [
      { text: "감정보다 객관적인 사실과 개선점을 말한다", score: "T" },
      { text: "기분이 상하지 않도록 장점을 먼저 말하고 조심스럽게 단점을 이야기한다", score: "F" }
    ]
  },
  {
    id: 15, axis: "TF",
    emoji: "🚗",
    text: "운전 중 앞차가 너무 느리게 달린다. 나는...",
    options: [
      { text: "'앞에 사고가 났나? 초보운전인가?' 하며 이유를 추론한다", score: "T" },
      { text: "답답한 마음에 짜증이 올라오거나 앞차 운전자가 걱정된다", score: "F" }
    ]
  },
  // ---- J / P 축 ----
  {
    id: 16, axis: "JP",
    emoji: "🗓️",
    text: "친구들과 여행을 계획할 때 나는...",
    options: [
      { text: "숙소, 이동수단, 식당을 미리 예약해야 마음이 편하다", score: "J" },
      { text: "대략적인 방향만 잡고 가서 결정하는 게 더 재밌다", score: "P" }
    ]
  },
  {
    id: 17, axis: "JP",
    emoji: "📚",
    text: "과제나 업무 마감일이 2주 뒤다. 나는...",
    options: [
      { text: "지금 바로 계획을 세우고 조금씩 진행한다", score: "J" },
      { text: "마감이 다가올수록 집중력이 올라간다 (벼락치기형)", score: "P" }
    ]
  },
  {
    id: 18, axis: "JP",
    emoji: "🛒",
    text: "마트에서 쇼핑할 때 나는...",
    options: [
      { text: "미리 적어온 리스트대로만 사고 나온다", score: "J" },
      { text: "'1+1', '한정수량' 문구를 보면 일단 담고 본다", score: "P" }
    ]
  },
  {
    id: 19, axis: "JP",
    emoji: "🍽️",
    text: "1시간 이상 웨이팅이 있는 맛집 앞에서 나는...",
    options: [
      { text: "기다렸다가 먹는다. 왔으니까 먹어야지", score: "J" },
      { text: "근처 다른 맛있는 곳을 찾아보자", score: "P" }
    ]
  },
  {
    id: 20, axis: "JP",
    emoji: "🗃️",
    text: "내 방(책상)의 상태는?",
    options: [
      { text: "물건마다 자리가 있고 대체로 정돈되어 있다", score: "J" },
      { text: "어디 뭐가 있는지 나는 알지만 남이 보면 복잡해 보일 수 있다", score: "P" }
    ]
  }
];

// --- State ---
let currentIndex = 0;
const answers = {}; // { axis: [scores] }

// --- Init ---
document.addEventListener('DOMContentLoaded', function () {
  renderQuestion(currentIndex);
});

function renderQuestion(index) {
  const q = quizData[index];
  const total = quizData.length;

  // Progress
  const pct = Math.round(((index) / total) * 100) + 5;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${index + 1} / ${total}`;
  document.getElementById('questionCount').textContent = `${index + 1} / ${total}`;

  // Card content
  document.getElementById('questionEmoji').textContent = q.emoji;
  document.getElementById('questionText').textContent = q.text;

  // Options
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.options.forEach(function (opt) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', function () { selectOption(opt.score, btn); });
    grid.appendChild(btn);
  });

  // Prev button
  document.getElementById('prevBtn').style.visibility = index > 0 ? 'visible' : 'hidden';

  // Card animation
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'slideIn .3s ease';
}

function selectOption(score, btn) {
  // Visual feedback
  document.querySelectorAll('.option-btn').forEach(function (b) { b.classList.remove('selected'); });
  btn.classList.add('selected');

  // Record answer
  const axis = quizData[currentIndex].axis;
  if (!answers[axis]) answers[axis] = [];
  answers[axis][currentIndex] = score;

  // Move to next after short delay
  setTimeout(function () {
    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      finishQuiz();
    }
  }, 300);
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
}

function finishQuiz() {
  // Calculate MBTI
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).forEach(function (axisAnswers) {
    axisAnswers.forEach(function (s) { if (s) scores[s]++; });
  });

  // Also count from flat answer array
  quizData.forEach(function (q, i) {
    const axis = q.axis;
    // find selected from DOM... use answers object
  });

  const type =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  // Save to localStorage
  saveMBTIResult(type, scores);

  // Redirect to result page
  window.location.href = 'result.html?type=' + type;
}

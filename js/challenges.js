/* ===========================
   challenges.js - 일일 도전 시스템
   =========================== */

const challengesData = {
  social: [
    { id: 's1', title: '누군가와 신나는 대화하기', desc: '새로운 사람과 30분 이상 대화하기', points: 100 },
    { id: 's2', title: '친구에게 칭찬 전하기', desc: '친구 3명에게 구체적인 칭찬하기', points: 80 },
    { id: 's3', title: '네트워킹 활동', desc: '동호회나 모임에 참여하기', points: 120 },
    { id: 's4', title: '팀 프로젝트 주도하기', desc: '그룹 활동에서 리더 역할하기', points: 150 },
    { id: 's5', title: '낯선 사람과 친해지기', desc: '새로운 사람 2명과 친구가 되기', points: 100 },
  ],
  creativity: [
    { id: 'c1', title: '새로운 아이디어 5개 생각하기', desc: '기발한 아이디어 5개 적어보기', points: 100 },
    { id: 'c2', title: '창작물 만들기', desc: '그림, 음악, 글 등 창작하기', points: 150 },
    { id: 'c3', title: '문제를 새로운 방식으로 풀기', desc: '평소와 다른 방법으로 접근해보기', points: 120 },
    { id: 'c4', title: '일상을 예술로 만들기', desc: '사진, 디자인 등으로 표현하기', points: 130 },
    { id: 'c5', title: '혁신적인 제안하기', desc: '개선 방안을 구체적으로 제시하기', points: 140 },
  ],
  logic: [
    { id: 'l1', title: '복잡한 문제 분석하기', desc: '논리적으로 문제 해결하기', points: 120 },
    { id: 'l2', title: '데이터 기반 결정내리기', desc: '정보를 수집해서 판단하기', points: 110 },
    { id: 'l3', title: '전략 수립하기', desc: '장기 목표의 전략 세우기', points: 140 },
    { id: 'l4', title: '논리 게임 풀기', desc: '추리 퀴즈나 체스 플레이하기', points: 90 },
    { id: 'l5', title: '효율성 개선 제안', desc: '프로세스를 최적화하는 방법 찾기', points: 130 },
  ],
  emotional: [
    { id: 'e1', title: '감정 일기 쓰기', desc: '오늘의 감정을 자세히 기록하기', points: 80 },
    { id: 'e2', title: '누군가를 도와주기', desc: '도움이 필요한 사람 돕기', points: 100 },
    { id: 'e3', title: '감정 표현하기', desc: '자신의 진정한 감정 나누기', points: 110 },
    { id: 'e4', title: '공감 능력 키우기', desc: '타인의 입장에서 생각해보기', points: 100 },
    { id: 'e5', title: '감정적 지원 제공', desc: '친구의 고민을 들어주기', points: 120 },
  ],
  adventure: [
    { id: 'a1', title: '새로운 장소 탐험', desc: '가본 적 없는 곳 방문하기', points: 110 },
    { id: 'a2', title: '새로운 음식 도전', desc: '처음 먹는 음식 시도하기', points: 90 },
    { id: 'a3', title: '스포츠 활동', desc: '새로운 운동해보기', points: 120 },
    { id: 'a4', title: '모험적 결정 내리기', desc: '평소와 다른 선택해보기', points: 130 },
    { id: 'a5', title: '버킷리스트 하나 완료', desc: '원하던 일 하나 해보기', points: 150 },
  ]
};

function initChallenges() {
  loadChallengeProgress();
  displayChallenges('all');
  updateStats();
  updateLeaderboard();
}

function loadChallengeProgress() {
  const data = getMBTIData();
  if (!data.challengeProgress) {
    data.challengeProgress = {};
    saveMBTIData(data);
  }
}

function displayChallenges(filter) {
  const grid = document.getElementById('challengesGrid');
  const data = getMBTIData();
  const progress = data.challengeProgress || {};

  let challenges = [];
  if (filter === 'all') {
    challenges = Object.values(challengesData).flat();
  } else {
    challenges = challengesData[filter] || [];
  }

  if (challenges.length === 0) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>도전이 없습니다</p></div>';
    return;
  }

  grid.innerHTML = challenges.map(challenge => {
    const isCompleted = progress[challenge.id] && progress[challenge.id].completed;
    const category = getCategoryName(challenge.id);

    return `
      <div class="challenge-card ${isCompleted ? 'completed' : ''}" onclick="completeChallenge('${challenge.id}')">
        <div class="challenge-badge ${category}">${getCategoryLabel(category)}</div>
        <div class="challenge-title">${challenge.title}</div>
        <div class="challenge-desc">${challenge.desc}</div>
        <div class="challenge-footer">
          <div class="challenge-points">⭐ ${challenge.points}</div>
          <button class="challenge-btn ${isCompleted ? 'completed' : ''}" ${isCompleted ? 'disabled' : ''}>
            ${isCompleted ? '✓ 완료' : '완료하기'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterChallenges(category) {
  // 필터 버튼 업데이트
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  displayChallenges(category);
}

function getCategoryName(challengeId) {
  const firstChar = challengeId[0];
  const categoryMap = { 's': 'social', 'c': 'creativity', 'l': 'logic', 'e': 'emotional', 'a': 'adventure' };
  return categoryMap[firstChar] || 'social';
}

function getCategoryLabel(category) {
  const labels = {
    'social': '사교 🤝',
    'creativity': '창의 ✨',
    'logic': '논리 🧠',
    'emotional': '감정 💝',
    'adventure': '모험 🚀'
  };
  return labels[category] || '도전';
}

function completeChallenge(challengeId) {
  const data = getMBTIData();
  if (!data.challengeProgress) data.challengeProgress = {};

  const challenge = findChallengeById(challengeId);
  if (!challenge) return;

  // 이미 완료했으면 return
  if (data.challengeProgress[challengeId] && data.challengeProgress[challengeId].completed) {
    showToast('이미 완료한 도전입니다!');
    return;
  }

  // 완료 처리
  const today = new Date().toISOString().split('T')[0];
  data.challengeProgress[challengeId] = {
    completed: true,
    completedAt: today,
    points: challenge.points
  };

  // 총 포인트 업데이트
  if (!data.totalPoints) data.totalPoints = 0;
  data.totalPoints += challenge.points;

  if (!data.todayPoints) data.todayPoints = {};
  if (!data.todayPoints[today]) data.todayPoints[today] = 0;
  data.todayPoints[today] += challenge.points;

  saveMBTIData(data);

  // UI 업데이트
  showToast('🎉 도전 완료! +' + challenge.points + ' 포인트');
  displayChallenges(getCurrentFilter());
  updateStats();
  updateLeaderboard();

  // 배지 체크 (나중에 구현)
  checkAchievements(data, challenge);
}

function findChallengeById(challengeId) {
  for (const category in challengesData) {
    const challenge = challengesData[category].find(c => c.id === challengeId);
    if (challenge) return challenge;
  }
  return null;
}

function getCurrentFilter() {
  const active = document.querySelector('.filter-btn.active');
  return active ? active.textContent.split(' ')[0] === '모두' ? 'all' : getCategoryName(active.closest('.filter-btn').textContent[0]) : 'all';
}

function updateStats() {
  const data = getMBTIData();
  const today = new Date().toISOString().split('T')[0];

  const totalPoints = data.totalPoints || 0;
  const todayPoints = (data.todayPoints && data.todayPoints[today]) || 0;
  const completedCount = Object.values(data.challengeProgress || {}).filter(p => p.completed).length;

  document.getElementById('totalPoints').textContent = totalPoints.toLocaleString();
  document.getElementById('todayPoints').textContent = todayPoints.toLocaleString();
  document.getElementById('completedCount').textContent = completedCount;
}

function updateLeaderboard() {
  const data = getMBTIData();
  const leaderboardList = document.getElementById('leaderboardList');

  // 임시: 자신의 점수만 표시
  // 나중에 서버와 연동되면 실제 랭킹 표시
  const totalPoints = data.totalPoints || 0;
  const userName = data.currentResult ? data.currentResult.type + ' ' + (resultData[data.currentResult.type] ? resultData[data.currentResult.type].name : '') : '게스트';

  const mockLeaderboard = [
    { rank: 1, name: 'INTJ 호랑이', points: 2450 },
    { rank: 2, name: 'ENFP 돌고래', points: 2180 },
    { rank: 3, name: '나 (' + userName + ')', points: totalPoints },
  ];

  leaderboardList.innerHTML = mockLeaderboard
    .sort((a, b) => b.points - a.points)
    .map((item, idx) => {
      const rankClass = idx === 0 ? 'rank1' : idx === 1 ? 'rank2' : idx === 2 ? 'rank3' : '';
      const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';

      return `
        <div class="leaderboard-item">
          <div class="leaderboard-rank ${rankClass}">${medal} ${item.rank}</div>
          <div class="leaderboard-name">${item.name}</div>
          <div class="leaderboard-points">${item.points.toLocaleString()} pts</div>
        </div>
      `;
    })
    .join('');
}

function checkAchievements(data, challenge) {
  // 추후 배지 시스템과 연동
  // 도전 완료에 따른 배지 자동 획득 로직
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 2500);
}

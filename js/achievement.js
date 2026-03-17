/* ===========================
   achievement.js - 배지/성취 시스템
   =========================== */

const achievementsList = {
  // 탐험가 배지
  explorer: {
    id: 'explorer',
    name: '탐험가',
    desc: '모든 16가지 성격 유형 테스트 완료',
    icon: '🗺️',
    rarity: 'rare',
    condition: function (data) {
      const history = data.resultHistory || [];
      const uniqueTypes = new Set(history.map(h => h.type));
      return uniqueTypes.size >= 16;
    }
  },

  // 사교가 배지
  socialButterfly: {
    id: 'socialButterfly',
    name: '사교가',
    desc: '다른 사람 5명의 성격 비교하기',
    icon: '🦋',
    rarity: 'uncommon',
    condition: function (data) {
      const comparisons = data.comparisons || [];
      return comparisons.length >= 5;
    }
  },

  // 전략가 배지
  strategist: {
    id: 'strategist',
    name: '전략가',
    desc: 'INTJ 또는 ENTJ 유형으로 테스트',
    icon: '♟️',
    rarity: 'rare',
    condition: function (data) {
      return data.currentResult && ['INTJ', 'ENTJ'].includes(data.currentResult.type);
    }
  },

  // 창의가 배지
  creative: {
    id: 'creative',
    name: '창의가',
    desc: '창의 카테고리 도전 5개 완료',
    icon: '✨',
    rarity: 'uncommon',
    condition: function (data) {
      const progress = data.challengeProgress || {};
      const creativeChallenges = Object.keys(progress).filter(id => id.startsWith('c'));
      const completed = creativeChallenges.filter(id => progress[id].completed);
      return completed.length >= 5;
    }
  },

  // 논리자 배지
  logician: {
    id: 'logician',
    name: '논리자',
    desc: '논리 카테고리 도전 5개 완료',
    icon: '🧠',
    rarity: 'uncommon',
    condition: function (data) {
      const progress = data.challengeProgress || {};
      const logicChallenges = Object.keys(progress).filter(id => id.startsWith('l'));
      const completed = logicChallenges.filter(id => progress[id].completed);
      return completed.length >= 5;
    }
  },

  // 감정가 배지
  empath: {
    id: 'empath',
    name: '감정가',
    desc: '감정 카테고리 도전 5개 완료',
    icon: '💝',
    rarity: 'uncommon',
    condition: function (data) {
      const progress = data.challengeProgress || {};
      const emotionalChallenges = Object.keys(progress).filter(id => id.startsWith('e'));
      const completed = emotionalChallenges.filter(id => progress[id].completed);
      return completed.length >= 5;
    }
  },

  // 모험가 배지
  adventurer: {
    id: 'adventurer',
    name: '모험가',
    desc: '모험 카테고리 도전 5개 완료',
    icon: '🚀',
    rarity: 'uncommon',
    condition: function (data) {
      const progress = data.challengeProgress || {};
      const adventureChallenges = Object.keys(progress).filter(id => id.startsWith('a'));
      const completed = adventureChallenges.filter(id => progress[id].completed);
      return completed.length >= 5;
    }
  },

  // 매일의 챔피언
  dailyChampion: {
    id: 'dailyChampion',
    name: '매일의 챔피언',
    desc: '일일 도전을 7일 연속 완료',
    icon: '🏆',
    rarity: 'epic',
    condition: function (data) {
      const todayPoints = data.todayPoints || {};
      let streak = 0;
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        if (todayPoints[dateStr] && todayPoints[dateStr] > 0) {
          streak++;
        } else {
          break;
        }
      }

      return streak >= 7;
    }
  },

  // 포인트 수집가
  pointCollector: {
    id: 'pointCollector',
    name: '포인트 수집가',
    desc: '도전을 통해 1000 포인트 달성',
    icon: '⭐',
    rarity: 'uncommon',
    condition: function (data) {
      return (data.totalPoints || 0) >= 1000;
    }
  },

  // 마스터 수집가
  masterCollector: {
    id: 'masterCollector',
    name: '마스터 수집가',
    desc: '도전을 통해 5000 포인트 달성',
    icon: '👑',
    rarity: 'epic',
    condition: function (data) {
      return (data.totalPoints || 0) >= 5000;
    }
  },

  // 희귀 존재
  rareSpirit: {
    id: 'rareSpirit',
    name: '희귀 존재',
    desc: '가장 희귀한 성격 유형으로 테스트',
    icon: '💎',
    rarity: 'legendary',
    condition: function (data) {
      return data.currentResult && ['INFJ', 'INTJ', 'ENTJ'].includes(data.currentResult.type);
    }
  },

  // 공감자
  empathizer: {
    id: 'empathizer',
    name: '공감자',
    desc: 'INFP, INFJ, ENFP, 또는 ENFJ로 테스트',
    icon: '🤝',
    rarity: 'uncommon',
    condition: function (data) {
      return data.currentResult && ['INFP', 'INFJ', 'ENFP', 'ENFJ'].includes(data.currentResult.type);
    }
  },

  // 리더
  leader: {
    id: 'leader',
    name: '리더',
    desc: 'ENTJ 또는 ESFJ로 테스트',
    icon: '👨‍💼',
    rarity: 'uncommon',
    condition: function (data) {
      return data.currentResult && ['ENTJ', 'ESFJ'].includes(data.currentResult.type);
    }
  },

  // 사상가
  thinker: {
    id: 'thinker',
    name: '사상가',
    desc: 'INTP 또는 INTJ로 테스트',
    icon: '🤔',
    rarity: 'uncommon',
    condition: function (data) {
      return data.currentResult && ['INTP', 'INTJ'].includes(data.currentResult.type);
    }
  },

  // 공유자
  sharer: {
    id: 'sharer',
    name: '공유자',
    desc: '결과를 카카오톡 또는 SNS로 10회 이상 공유',
    icon: '📢',
    rarity: 'uncommon',
    condition: function (data) {
      return (data.shareCount || 0) >= 10;
    }
  },

  // 모든 도전 완료자
  completionist: {
    id: 'completionist',
    name: '완벽주의자',
    desc: '25개 이상의 도전 완료',
    icon: '✅',
    rarity: 'epic',
    condition: function (data) {
      const progress = data.challengeProgress || {};
      const completed = Object.values(progress).filter(p => p.completed).length;
      return completed >= 25;
    }
  }
};

function checkAllAchievements(data) {
  if (!data.achievements) {
    data.achievements = {};
  }

  const newAchievements = [];

  for (const achievementId in achievementsList) {
    const achievement = achievementsList[achievementId];

    // 이미 획득한 배지는 건너뛰기
    if (data.achievements[achievementId] && data.achievements[achievementId].unlocked) {
      continue;
    }

    // 조건 확인
    if (achievement.condition(data)) {
      const now = new Date().toISOString();
      data.achievements[achievementId] = {
        unlocked: true,
        unlockedAt: now
      };
      newAchievements.push(achievement);
    }
  }

  if (newAchievements.length > 0) {
    saveMBTIData(data);
  }

  return newAchievements;
}

function displayNewAchievements(achievements) {
  if (achievements.length === 0) return;

  achievements.forEach((achievement, index) => {
    setTimeout(() => {
      showAchievementNotification(achievement);
    }, index * 1500);
  });
}

function showAchievementNotification(achievement) {
  const notification = document.createElement('div');
  notification.className = 'achievement-notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 9999;
    max-width: 300px;
    animation: slideIn 0.5s ease;
  `;

  notification.innerHTML = `
    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${achievement.icon}</div>
    <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.3rem;">새로운 배지!</div>
    <div style="font-weight: 600; margin-bottom: 0.3rem;">${achievement.name}</div>
    <div style="font-size: 0.9rem; opacity: 0.9;">${achievement.desc}</div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.5s ease forwards';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

function getAchievementBadgeHtml(data) {
  if (!data.achievements) return '';

  const unlockedAchievements = Object.entries(data.achievements)
    .filter(([_, a]) => a.unlocked)
    .map(([id, _]) => {
      const achievement = achievementsList[id];
      return achievement;
    })
    .filter(a => a);

  if (unlockedAchievements.length === 0) {
    return '<p style="color: var(--text-mute); text-align: center;">아직 배지가 없습니다. 도전을 완료해보세요!</p>';
  }

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1rem;">
      ${unlockedAchievements.map(achievement => `
        <div style="text-align: center; padding: 1rem; background: var(--bg); border-radius: 12px; cursor: pointer;" title="${achievement.desc}">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">${achievement.icon}</div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-mute);">${achievement.name}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function displayAchievementsOnResultPage() {
  const data = getMBTIData();
  const resultCard = document.querySelector('.result-card');

  if (!resultCard) return;

  // 배지 섹션 추가
  const section = document.createElement('div');
  section.className = 'achievement-section';
  section.style.cssText = 'margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid #f0f0f0; animation: slideUp 0.6s ease;';

  const title = document.createElement('h3');
  title.style.cssText = 'text-align: center; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: #333;';
  title.textContent = '🏅 획득한 배지';
  section.appendChild(title);

  const badgesHtml = document.createElement('div');
  badgesHtml.innerHTML = getAchievementBadgeHtml(data);
  section.appendChild(badgesHtml);

  resultCard.appendChild(section);
}

// CSS 애니메이션 추가
if (!document.querySelector('#achievementStyles')) {
  const style = document.createElement('style');
  style.id = 'achievementStyles';
  style.textContent = `
    @keyframes slideOut {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(400px); }
    }

    .achievement-notification {
      animation: slideIn 0.5s ease, slideOut 0.5s ease 3s forwards;
    }
  `;
  document.head.appendChild(style);
}

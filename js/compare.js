/* ===========================
   compare.js - 성격 유형 비교 로직
   =========================== */

function createComparisonHTML(me, other) {
  return `
    <div class="compatibility-score" id="compatCard">
      <div class="score-label">궁합 점수</div>
      <div class="score-value" id="scoreValue">-</div>
      <div class="score-label" id="scoreDescription">-</div>
    </div>

    <div class="comparison-grid">
      <div class="personality-card" id="meCard">
        <div class="personality-badge" id="meBadge">-</div>
        <div class="personality-emoji" id="meEmoji">-</div>
        <h4 id="meName">-</h4>
        <p id="meTitle">-</p>

        <div class="traits-list">
          <h5>강점</h5>
          <div id="meStrengths"></div>
        </div>

        <div class="traits-list">
          <h5>약점</h5>
          <div id="meWeaknesses"></div>
        </div>

        <div class="traits-list">
          <h5>궁합이 좋은 유형</h5>
          <div id="meCompatible"></div>
        </div>
      </div>

      <div class="personality-card" id="otherCard">
        <div class="personality-badge" id="otherBadge">-</div>
        <div class="personality-emoji" id="otherEmoji">-</div>
        <h4 id="otherName">-</h4>
        <p id="otherTitle">-</p>

        <div class="traits-list">
          <h5>강점</h5>
          <div id="otherStrengths"></div>
        </div>

        <div class="traits-list">
          <h5>약점</h5>
          <div id="otherWeaknesses"></div>
        </div>

        <div class="traits-list">
          <h5>궁합이 좋은 유형</h5>
          <div id="otherCompatible"></div>
        </div>
      </div>
    </div>

    <div class="compatibility-details">
      <div class="compatibility-section">
        <h4>🎯 성격 분석</h4>
        <div id="analysisDetail">-</div>
      </div>

      <div class="compatibility-section">
        <h4>💪 강점 조합</h4>
        <div id="strengthsMatch">-</div>
      </div>

      <div class="compatibility-section">
        <h4>⚡ 약점 보완</h4>
        <div id="weaknessMatch">-</div>
      </div>

      <div class="compatibility-section">
        <h4>💌 함께하면 좋은 점</h4>
        <div id="benefits">-</div>
      </div>

      <div class="compatibility-section">
        <h4>⚠️ 주의할 점</h4>
        <div id="cautions">-</div>
      </div>
    </div>

    <div class="action-buttons">
      <button class="btn btn-share" onclick="shareComparison('${me}', '${other}')">
        💬 비교 결과 공유
      </button>
      <button class="btn btn-reset" onclick="resetComparison()">
        🔄 다시 선택
      </button>
    </div>
  `;
}

function updateComparisonData(me, other) {
  const meData = resultData[me];
  const otherData = resultData[other];

  // 당신의 성격
  document.getElementById('meBadge').textContent = me;
  document.getElementById('meEmoji').textContent = meData.emoji;
  document.getElementById('meName').textContent = meData.name;
  document.getElementById('meTitle').textContent = meData.title;
  document.getElementById('meStrengths').innerHTML = meData.strengths
    .map(s => '<span class="tag">' + s + '</span>')
    .join('');
  document.getElementById('meWeaknesses').innerHTML = meData.weaknesses
    .map(w => '<span class="tag">' + w + '</span>')
    .join('');
  document.getElementById('meCompatible').innerHTML = meData.compatibleTypes
    .map(c => '<span class="tag">' + c + '</span>')
    .join('');

  // 상대방의 성격
  document.getElementById('otherBadge').textContent = other;
  document.getElementById('otherEmoji').textContent = otherData.emoji;
  document.getElementById('otherName').textContent = otherData.name;
  document.getElementById('otherTitle').textContent = otherData.title;
  document.getElementById('otherStrengths').innerHTML = otherData.strengths
    .map(s => '<span class="tag">' + s + '</span>')
    .join('');
  document.getElementById('otherWeaknesses').innerHTML = otherData.weaknesses
    .map(w => '<span class="tag">' + w + '</span>')
    .join('');
  document.getElementById('otherCompatible').innerHTML = otherData.compatibleTypes
    .map(c => '<span class="tag">' + c + '</span>')
    .join('');

  // 궁합 점수 계산
  const score = calculateCompatibility(me, other, meData, otherData);
  const scoreEl = document.getElementById('scoreValue');
  scoreEl.textContent = score + '%';
  scoreEl.style.color = getScoreColor(score);

  const desc = getScoreDescription(score, me, other, meData, otherData);
  document.getElementById('scoreDescription').textContent = desc;

  // 분석 텍스트
  document.getElementById('analysisDetail').innerHTML = getAnalysisText(me, other, meData, otherData);
  document.getElementById('strengthsMatch').innerHTML = getStrengthsMatch(meData, otherData);
  document.getElementById('weaknessMatch').innerHTML = getWeaknessMatch(meData, otherData);
  document.getElementById('benefits').innerHTML = getBenefits(score, me, other);
  document.getElementById('cautions').innerHTML = getCautions(score, me, other);
}

function calculateCompatibility(me, other, meData, otherData) {
  let score = 50; // 기본값

  // 1. 호환 유형 확인
  const meHasOther = meData.compatibleTypes.some(c => c.includes(other));
  const otherHasMe = otherData.compatibleTypes.some(c => c.includes(me));

  if (meHasOther && otherHasMe) score += 30;
  else if (meHasOther || otherHasMe) score += 15;

  // 2. 성격 요소 분석 (MBTI 구조)
  // I/E, S/N, T/F, J/P
  const meChars = me.split('');
  const otherChars = other.split('');

  let sameCount = 0;
  for (let i = 0; i < 4; i++) {
    if (meChars[i] === otherChars[i]) sameCount++;
  }

  // 2개 이상 같으면 보너스
  if (sameCount >= 2) score += 10;

  // 3. 강점/약점 상보성
  const meStrengths = new Set(meData.strengths);
  const otherWeaknesses = new Set(otherData.weaknesses);

  let complementCount = 0;
  otherWeaknesses.forEach(w => {
    if (meStrengths.has(w)) complementCount++;
  });

  // 역도 확인
  const otherStrengths = new Set(otherData.strengths);
  const meWeaknesses = new Set(meData.weaknesses);

  otherStrengths.forEach(s => {
    if (meWeaknesses.has(s)) complementCount++;
  });

  score += complementCount * 5;

  // 4. 희귀도 조정 (희귀한 유형과의 만남)
  const rarity = meData.worldRarityRank + otherData.worldRarityRank;
  if (rarity.includes('최희귀')) score += 5;

  return Math.min(100, Math.max(30, score));
}

function getScoreColor(score) {
  if (score >= 80) return '#4CAF50';
  if (score >= 60) return '#FFC107';
  if (score >= 40) return '#FF9800';
  return '#F44336';
}

function getScoreDescription(score, me, other, meData, otherData) {
  if (score >= 85) {
    return '완벽한 짝 ✨ 서로 보완해주며 성장할 수 있는 관계입니다!';
  } else if (score >= 70) {
    return '좋은 궁합 💚 충분히 잘 맞을 수 있는 관계입니다.';
  } else if (score >= 50) {
    return '보통 궁합 💙 노력하면 좋은 관계를 만들 수 있습니다.';
  } else if (score >= 30) {
    return '도전적인 관계 💛 서로 배울 점이 많이 있습니다.';
  }
  return '신선한 관계 💜 함께 새로운 경험을 할 수 있습니다.';
}

function getAnalysisText(me, other, meData, otherData) {
  const meGroup = meData.group.split('·')[0].trim();
  const otherGroup = otherData.group.split('·')[0].trim();

  let text = meData.name + ' (' + me + ')와 ' + otherData.name + ' (' + other + ')는 ';

  if (meGroup === otherGroup) {
    text += '같은 성격 그룹에 속한 유형입니다. 비슷한 가치관과 접근 방식을 가지고 있어 이해하기 쉬운 관계일 수 있습니다.';
  } else {
    text += '다른 성격 그룹에 속한 유형입니다. 서로 다른 관점과 방식으로 새로운 가능성을 열어줄 수 있습니다.';
  }

  return text;
}

function getStrengthsMatch(meData, otherData) {
  const meStrengths = meData.strengths.slice(0, 2).join(', ');
  const otherStrengths = otherData.strengths.slice(0, 2).join(', ');

  return '<p>' + meData.name + '의 ' + meStrengths + '과 ' +
         otherData.name + '의 ' + otherStrengths + '이 만나면 ' +
         '완성도 높은 팀을 이룰 수 있습니다. 함께하면 각자의 강점을 더욱 극대화할 수 있어요!</p>';
}

function getWeaknessMatch(meData, otherData) {
  const meFirst = meData.weaknesses[0];
  const otherFirst = otherData.strengths[0];

  if (meData.weaknesses.some(w => otherData.strengths.includes(w))) {
    return '<p>' + meData.name + '의 약점인 "' + meFirst + '"을(를) ' +
           otherData.name + '의 강점인 "' + otherFirst + '"이(가) ' +
           '잘 보완할 수 있습니다. 이런 상보성이 관계의 강점입니다!</p>';
  }

  return '<p>서로 다른 약점을 가지고 있어 함께 노력하면서 성장할 수 있습니다.</p>';
}

function getBenefits(score, me, other) {
  let benefits = [];

  if (score >= 80) {
    benefits = [
      '✅ 서로의 약점을 자연스럽게 보완',
      '✅ 깊이 있는 이해와 신뢰 형성',
      '✅ 공동 목표 달성에 효율적',
      '✅ 장기적인 관계 유지가 용이'
    ];
  } else if (score >= 60) {
    benefits = [
      '✅ 서로 다른 관점에서 배울 수 있음',
      '✅ 상호 보완적인 강점 활용',
      '✅ 함께 성장할 기회 제공',
      '✅ 신선한 자극과 변화'
    ];
  } else {
    benefits = [
      '✅ 새로운 사고방식 습득 기회',
      '✅ 편견 극복의 가능성',
      '✅ 더 넓은 세상 경험',
      '✅ 개인의 성장 및 발전'
    ];
  }

  return '<ul><li>' + benefits.join('</li><li>') + '</li></ul>';
}

function getCautions(score, me, other) {
  let cautions = [];

  if (score >= 80) {
    cautions = [
      '⚠️ 너무 잘 맞다보니 의견 충돌 시 조율 필요',
      '⚠️ 함께하는 시간이 많아지는 경향, 개인 시간도 중요',
      '⚠️ 관계에 너무 의존하지 않기'
    ];
  } else if (score >= 60) {
    cautions = [
      '⚠️ 작은 차이를 인정하고 존중하기',
      '⚠️ 상대의 약점을 비판하지 않기',
      '⚠️ 명확한 대화로 오해 방지하기',
      '⚠️ 개인의 속도와 방식 이해하기'
    ];
  } else {
    cautions = [
      '⚠️ 차이를 이해하려는 노력 필수',
      '⚠️ 상대를 바꾸려 하지 않기',
      '⚠️ 빈번한 소통으로 신뢰 구축',
      '⚠️ 공통점 찾기와 존중 연습',
      '⚠️ 단기가 아닌 장기적 관점 필요'
    ];
  }

  return '<ul><li>' + cautions.join('</li><li>') + '</li></ul>';
}

function shareComparison(me, other) {
  const meData = resultData[me];
  const otherData = resultData[other];
  const score = calculateCompatibility(me, other, meData, otherData);

  const text = me + ' ' + meData.name + '(' + meData.emoji + ')와 ' +
               other + ' ' + otherData.name + '(' + otherData.emoji + ')의 ' +
               '궁합은 ' + score + '%입니다! 당신의 궁합은 몇 %일까요? ' +
               '👉 ' + 'https://stockinvestonline.com/compare.html?me=' + me + '&other=' + other;

  // 복사
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      showToast('비교 결과 링크가 복사되었습니다! 📋');
    }).catch(function () {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  var el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand('copy');
    showToast('링크가 복사되었습니다! 📋');
  } catch (e) {
    showToast('복사에 실패했습니다.');
  }
  document.body.removeChild(el);
}

function showToast(msg) {
  var toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  } else {
    alert(msg);
  }
}

function resetComparison() {
  document.getElementById('typeMe').value = '';
  document.getElementById('typeOther').value = '';
  document.getElementById('resultArea').innerHTML = '';
  window.history.pushState({}, '', 'compare.html');
}

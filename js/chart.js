/* ===========================
   chart.js - 성격 특성 시각화
   SVG 레이더 차트
   =========================== */

function createCharacteristicChart(type) {
  const chars = getCharacteristics(type);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 400 400');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', 'auto');
  svg.setAttribute('class', 'characteristic-chart');
  svg.style.maxWidth = '400px';
  svg.style.margin = '0 auto';

  const centerX = 200;
  const centerY = 200;
  const maxRadius = 120;
  const levels = 5;

  // Background circles (그리드)
  for (let i = 1; i <= levels; i++) {
    const radius = (maxRadius / levels) * i;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', '#e0e0e0');
    circle.setAttribute('stroke-width', '1');
    svg.appendChild(circle);
  }

  // 축선과 레이블
  const dimensions = [
    { name: (window.i18n ? window.i18n.t('chart.energy') : '에너지'), value: chars.energy, angle: 0 },
    { name: (window.i18n ? window.i18n.t('chart.information') : '정보수집'), value: chars.information, angle: 72 },
    { name: (window.i18n ? window.i18n.t('chart.decision') : '의사결정'), value: chars.decision, angle: 144 },
    { name: (window.i18n ? window.i18n.t('chart.planning') : '계획성'), value: chars.planning, angle: 216 },
    { name: (window.i18n ? window.i18n.t('chart.intensity') : '강도'), value: chars.intensity, angle: 288 }
  ];

  // 축선 그리기
  dimensions.forEach(function (dim) {
    const angle = (dim.angle - 90) * (Math.PI / 180);
    const x = centerX + maxRadius * Math.cos(angle);
    const y = centerY + maxRadius * Math.sin(angle);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', centerX);
    line.setAttribute('y1', centerY);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', '#d0d0d0');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);

    // 레이블
    const labelRadius = maxRadius + 35;
    const labelAngle = (dim.angle - 90) * (Math.PI / 180);
    const labelX = centerX + labelRadius * Math.cos(labelAngle);
    const labelY = centerY + labelRadius * Math.sin(labelAngle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', labelX);
    text.setAttribute('y', labelY);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', '600');
    text.setAttribute('fill', '#333');
    text.textContent = dim.name;
    svg.appendChild(text);
  });

  // 데이터 점 연결
  const points = dimensions.map(function (dim) {
    const angle = (dim.angle - 90) * (Math.PI / 180);
    const radius = (maxRadius / 100) * dim.value;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return x + ',' + y;
  }).join(' ');

  // 채우기 영역
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', points);
  polygon.setAttribute('fill', 'rgba(102, 126, 234, 0.2)');
  polygon.setAttribute('stroke', '#667eea');
  polygon.setAttribute('stroke-width', '2');
  polygon.setAttribute('class', 'radar-fill');
  svg.appendChild(polygon);

  // 데이터 점
  dimensions.forEach(function (dim) {
    const angle = (dim.angle - 90) * (Math.PI / 180);
    const radius = (maxRadius / 100) * dim.value;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', '5');
    circle.setAttribute('fill', '#667eea');
    circle.setAttribute('stroke', '#fff');
    circle.setAttribute('stroke-width', '2');
    svg.appendChild(circle);
  });

  // 범례
  const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  legend.setAttribute('transform', 'translate(20, 20)');

  dimensions.forEach(function (dim, index) {
    const y = index * 18;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', y);
    rect.setAttribute('width', '12');
    rect.setAttribute('height', '12');
    rect.setAttribute('fill', '#667eea');
    rect.setAttribute('opacity', '0.2');
    legend.appendChild(rect);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '18');
    text.setAttribute('y', y + 10);
    text.setAttribute('font-size', '11');
    text.setAttribute('fill', '#666');
    text.textContent = dim.name + ': ' + dim.value;
    legend.appendChild(text);
  });

  svg.appendChild(legend);

  return svg;
}

function getCharacteristics(type) {
  // MBTI 4글자를 분석하여 특성 점수 계산 (0-100)
  const chars = type.split('');

  return {
    energy: chars[0] === 'E' ? 80 : 40,         // E는 80, I는 40
    information: chars[1] === 'N' ? 80 : 40,   // N은 80, S는 40
    decision: chars[2] === 'F' ? 80 : 40,      // F는 80, T는 40 (감정 vs 논리)
    planning: chars[3] === 'J' ? 80 : 40,      // J는 80, P는 40
    intensity: getIntensityScore(type)          // 희귀도에 따른 강도
  };
}

function getIntensityScore(type) {
  // 희귀 유형일수록 높은 강도
  const rarityMap = {
    'INTJ': 95, 'ENTJ': 90, 'INFJ': 100, 'ENFJ': 85,
    'INTP': 75, 'ENTP': 75, 'INFP': 65, 'ENFP': 70,
    'ISTJ': 50, 'ESTJ': 60, 'ISFJ': 55, 'ESFJ': 60,
    'ISTP': 65, 'ESTP': 70, 'ISFP': 60, 'ESFP': 65
  };

  return rarityMap[type] || 60;
}

// 막대 차트 (간단한 버전)
function createCharacteristicBars(type) {
  const chars = getCharacteristics(type);
  const dimensions = [
    { name: (window.i18n ? window.i18n.t('chart.energy') : '에너지'), value: chars.energy },
    { name: (window.i18n ? window.i18n.t('chart.information') : '정보수집'), value: chars.information },
    { name: (window.i18n ? window.i18n.t('chart.decision') : '의사결정'), value: chars.decision },
    { name: (window.i18n ? window.i18n.t('chart.planning') : '계획성'), value: chars.planning },
    { name: (window.i18n ? window.i18n.t('chart.intensity') : '강도'), value: chars.intensity }
  ];

  const container = document.createElement('div');
  container.className = 'characteristic-bars';
  container.style.cssText = 'padding: 1rem 0;';

  dimensions.forEach(function (dim) {
    const item = document.createElement('div');
    item.className = 'bar-item';
    item.style.cssText = 'margin-bottom: 1rem;';

    const label = document.createElement('div');
    label.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 0.3rem; font-size: 0.9rem;';
    label.innerHTML = '<span><strong>' + dim.name + '</strong></span><span style="color: #667eea; font-weight: 600;">' + dim.value + '%</span>';
    item.appendChild(label);

    const barBg = document.createElement('div');
    barBg.style.cssText = 'width: 100%; height: 20px; background: #e0e0e0; border-radius: 10px; overflow: hidden;';

    const barFill = document.createElement('div');
    barFill.style.cssText = 'height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); width: 0%; border-radius: 10px; transition: width 0.6s ease;';
    barBg.appendChild(barFill);

    item.appendChild(barBg);
    container.appendChild(item);

    // 애니메이션 트리거
    setTimeout(function () {
      barFill.style.width = dim.value + '%';
    }, 100);
  });

  return container;
}

// 결과 페이지에 차트 추가
function addCharacteristicChartToResult(type) {
  const resultCard = document.querySelector('.result-card');
  if (!resultCard) return;

  const section = document.createElement('div');
  section.className = 'characteristic-section';
  section.style.cssText = 'margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid #f0f0f0;';

  const title = document.createElement('h3');
  title.style.cssText = 'text-align: center; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: #333;';
  title.textContent = (window.i18n ? window.i18n.t('chart.title') : '성격 특성 분석');
  section.appendChild(title);

  // 차트 선택 (레이더 또는 막대)
  const chart = createCharacteristicBars(type);
  section.appendChild(chart);

  resultCard.appendChild(section);
}

/* ===========================
   canvas-card.js - 결과 이미지 카드 생성
   Canvas API 1080×1080 PNG 다운로드
   =========================== */

function generateResultCard(type, resultInfo) {
  var canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  var ctx = canvas.getContext('2d');

  // --- 배경 그라디언트 ---
  var groupColors = {
    nt: ['#7C3AED', '#4F46E5'],
    nf: ['#DB2777', '#9333EA'],
    sj: ['#2563EB', '#0891B2'],
    sp: ['#D97706', '#EA580C']
  };
  var groupMap = {
    INTJ:'nt', INTP:'nt', ENTJ:'nt', ENTP:'nt',
    INFJ:'nf', INFP:'nf', ENFJ:'nf', ENFP:'nf',
    ISTJ:'sj', ISFJ:'sj', ESTJ:'sj', ESFJ:'sj',
    ISTP:'sp', ISFP:'sp', ESTP:'sp', ESFP:'sp'
  };
  var grp = groupMap[type] || 'nt';
  var colors = groupColors[grp];

  var grad = ctx.createLinearGradient(0, 0, 1080, 1080);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1080);

  // --- 장식 원형 배경 ---
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.beginPath();
  ctx.arc(900, 180, 320, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(150, 900, 240, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // --- 흰색 카드 영역 ---
  ctx.save();
  ctx.globalAlpha = 0.15;
  roundRect(ctx, 80, 80, 920, 920, 60);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // --- 유형 코드 배지 ---
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  roundRect(ctx, 390, 130, 300, 90, 45);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(type, 540, 193);
  ctx.restore();

  // --- 동물 이모지 (크게) ---
  ctx.save();
  ctx.font = '320px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(resultInfo.emoji, 540, 490);
  ctx.restore();

  // --- 동물 이름 ---
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(resultInfo.name, 540, 740);
  ctx.restore();

  // --- 제목 (title) ---
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '44px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(resultInfo.title, 540, 810);
  ctx.restore();

  // --- 구분선 ---
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(200, 850);
  ctx.lineTo(880, 850);
  ctx.stroke();
  ctx.restore();

  // --- 강점 태그들 ---
  if (resultInfo.strengths && resultInfo.strengths.length > 0) {
    var tags = resultInfo.strengths.slice(0, 4);
    var tagW = 180;
    var tagH = 52;
    var gap = 16;
    var totalW = tags.length * tagW + (tags.length - 1) * gap;
    var startX = (1080 - totalW) / 2;
    ctx.save();
    ctx.font = 'bold 26px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'center';
    tags.forEach(function(tag, i) {
      var tx = startX + i * (tagW + gap);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      roundRect(ctx, tx, 872, tagW, tagH, 26);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(tag, tx + tagW / 2, 872 + 35);
    });
    ctx.restore();
  }

  // --- 사이트 URL 워터마크 ---
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '28px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐾 stockinvestonline.com', 540, 985);
  ctx.restore();

  return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function downloadResultCard(type, resultInfo) {
  var canvas = generateResultCard(type, resultInfo);
  canvas.toBlob(function(blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'PersonalityType_' + type + '_' + resultInfo.name + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
  }, 'image/png');
}

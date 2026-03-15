/* ===========================
   storage.js - localStorage 관리
   =========================== */

var STORAGE_KEY = 'mbti_data';

function getMBTIData() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyData();
    return JSON.parse(raw);
  } catch (e) {
    return createEmptyData();
  }
}

function createEmptyData() {
  return {
    currentResult: null,
    history: [],
    visitCount: 0,
    firstVisit: new Date().toISOString()
  };
}

function saveMBTIResult(type, scores) {
  var data = getMBTIData();
  var newResult = {
    type: type,
    animal: getAnimalName(type),
    scores: scores,
    date: new Date().toISOString()
  };

  // Move current to history (max 5)
  if (data.currentResult) {
    data.history = [data.currentResult].concat(data.history).slice(0, 5);
  }

  data.currentResult = newResult;
  data.visitCount = (data.visitCount || 0) + 1;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage 저장 실패:', e);
  }

  return newResult;
}

function clearMBTIData() {
  if (confirm('저장된 모든 MBTI 기록을 삭제할까요?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

// Animal name map (sync with result.js)
function getAnimalName(type) {
  var map = {
    INTJ:'호랑이', INTP:'올빼미', ENTJ:'사자', ENTP:'앵무새',
    INFJ:'판다',  INFP:'해마',   ENFJ:'골든리트리버', ENFP:'돌고래',
    ISTJ:'비버',  ISFJ:'사슴',   ESTJ:'늑대',  ESFJ:'코끼리',
    ISTP:'고양이', ISFP:'나무늘보', ESTP:'치타',  ESFP:'공작새'
  };
  return map[type] || type;
}

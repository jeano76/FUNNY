/* ===========================
   storage.js - localStorage 관리
   =========================== */

var STORAGE_KEY = 'mbti_data';

function getMBTIData() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyData();
    var data = JSON.parse(raw);
    
    // Fix corrupted currentResult if it's an object instead of a string type
    if (data.currentResult && typeof data.currentResult.type === 'object') {
      console.warn('Corrupted MBTI data detected, attempting to repair...');
      // Try to find a valid type string in the object or fallback
      var fallbackType = 'INTJ'; // Default fallback
      if (data.history && data.history.length > 0 && typeof data.history[0].type === 'string') {
        data.currentResult = data.history[0];
      } else {
        data.currentResult = null; // Clear if unrepairable
      }
    }
    return data;
  } catch (e) {
    return createEmptyData();
  }
}

function createEmptyData() {
  return {
    currentResult: null,
    history: [],
    visitCount: 0,
    firstVisit: new Date().toISOString(),
    totalPoints: 0,
    challengeProgress: {},
    todayPoints: {},
    achievements: {}
  };
}

function saveMBTIData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage 저장 실패:', e);
  }
}

function saveMBTIResult(type, scores) {
  if (typeof type === 'object' && type !== null && !scores) {
    // Legacy support or accidental object passing - redirect to saveMBTIData
    console.warn('saveMBTIResult called with object, redirecting to saveMBTIData');
    return saveMBTIData(type);
  }
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
    var errMsg = 'localStorage 저장 실패:';
    if (window.i18n) {
      errMsg = window.i18n.t('storage.saveError') || errMsg;
    }
    console.warn(errMsg, e);
  }

  return newResult;
}

function clearMBTIData() {
  var msg = '저장된 모든 성격 유형 기록을 삭제할까요?';
  if (window.i18n) {
    msg = window.i18n.t('storage.confirmDelete') || msg;
  }
  if (confirm(msg)) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

// Animal name map (sync with result.js)
function getAnimalName(type) {
  // i18n이 로드된 경우 번역된 이름 반환
  if (window.i18n && window.i18n.t('animals.' + type) !== 'animals.' + type) {
    return window.i18n.t('animals.' + type);
  }
  var map = {
    INTJ:'호랑이', INTP:'올빼미', ENTJ:'사자', ENTP:'앵무새',
    INFJ:'판다',  INFP:'해마',   ENFJ:'골든리트리버', ENFP:'돌고래',
    ISTJ:'비버',  ISFJ:'사슴',   ESTJ:'늑대',  ESFJ:'코끼리',
    ISTP:'고양이', ISFP:'나무늘보', ESTP:'치타',  ESFP:'공작새'
  };
  return map[type] || type;
}

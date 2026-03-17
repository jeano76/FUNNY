/* ===========================
   share.js - SNS 공유 기능
   =========================== */

var SITE_URL = 'https://stockinvestonline.com/';

function getShareText(type, r) {
  var aName = (window.i18n && window.i18n.t('animals.' + type) !== 'animals.' + type) ? window.i18n.t('animals.' + type) : r.name;
  return '나는 성격 유형 ' + type + ' - ' + aName + ' ' + r.emoji + '!\n'
       + r.shareText + '\n'
       + '👉 ' + (window.i18n ? window.i18n.t('share.testMe') : '나도 테스트하기') + ': ' + SITE_URL;
}

// 카카오톡 공유
function shareKakao(type, r) {
  var KAKAO_APP_KEY = '2850ea2fde730ed80b6f932c8e05d709';
  try {
    if (!window.Kakao) { alert(window.i18n ? window.i18n.t('share.kakaoNotLoaded') : '카카오 SDK를 불러오지 못했습니다.'); return; }
    if (!Kakao.isInitialized()) {
      Kakao.init(KAKAO_APP_KEY);
    }
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: type + ' ' + aName + ' ' + r.emoji,
        description: r.description.slice(0, 100) + '...',
        imageUrl: SITE_URL + 'assets/og-image.png',
        link: {
          mobileWebUrl: SITE_URL + 'result.html?type=' + type,
          webUrl: SITE_URL + 'result.html?type=' + type
        }
      },
      buttons: [{
        title: (window.i18n ? window.i18n.t('share.testMe') : '나도 테스트하기'),
        link: {
          mobileWebUrl: SITE_URL + 'quiz.html',
          webUrl: SITE_URL + 'quiz.html'
        }
      }]
    });
  } catch (e) {
    // Fallback: 링크 복사
    copyLink(type);
    showToast((window.i18n ? window.i18n.t('share.copySuccess') : '링크가 복사되었습니다! 📋'));
  }
}

// 트위터(X) 공유
function shareTwitter(type, r) {
  var text = encodeURIComponent(getShareText(type, r));
  var url = 'https://twitter.com/intent/tweet?text=' + text;
  window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
}

// 페이스북 공유
function shareFacebook() {
  var pageUrl = encodeURIComponent(location.href);
  var url = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
  window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
}

// 링크 복사
function copyLink(type) {
  var url = SITE_URL + 'result.html?type=' + type;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () {
      showToast((window.i18n ? window.i18n.t('share.copySuccess') : '링크가 복사되었습니다! 📋'));
    }).catch(function () {
      fallbackCopy(url);
    });
  } else {
    fallbackCopy(url);
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
    showToast((window.i18n ? window.i18n.t('share.copySuccess') : '링크가 복사되었습니다! 📋'));
  } catch (e) {
    showToast((window.i18n ? window.i18n.t('share.copyFail') : '복사에 실패했습니다. URL을 직접 복사해주세요.'));
  }
  document.body.removeChild(el);
}

// Toast 메시지
function showToast(msg) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 2500);
}

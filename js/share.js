/* ===========================
   share.js - SNS 공유 기능
   =========================== */

var SITE_URL = location.origin + location.pathname.replace('result.html', '');

function getShareText(type, r) {
  return '나는 MBTI ' + type + ' - ' + r.name + ' ' + r.emoji + '!\n'
       + r.shareText + '\n'
       + '👉 나도 테스트하기: ' + SITE_URL;
}

// 카카오톡 공유
function shareKakao(type, r) {
  var KAKAO_APP_KEY = '03dcb9495e597e65a44f72df6ab02973';
  try {
    if (!window.Kakao) { alert('카카오 SDK를 불러오지 못했습니다.'); return; }
    if (!Kakao.isInitialized()) {
      Kakao.init(KAKAO_APP_KEY);
    }
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '나는 ' + type + ' ' + r.name + ' ' + r.emoji + '!',
        description: r.description.slice(0, 100) + '...',
        imageUrl: SITE_URL + 'assets/og-image.png',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href
        }
      },
      buttons: [{
        title: '나도 테스트하기',
        link: {
          mobileWebUrl: SITE_URL + 'quiz.html',
          webUrl: SITE_URL + 'quiz.html'
        }
      }]
    });
  } catch (e) {
    // Fallback: 링크 복사
    copyLink(type);
    showToast('카카오 설정 전입니다. 링크를 복사했어요! 📋');
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
  var url = location.origin + '/result.html?type=' + type;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () {
      showToast('링크가 복사되었습니다! 📋');
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
    showToast('링크가 복사되었습니다! 📋');
  } catch (e) {
    showToast('복사에 실패했습니다. URL을 직접 복사해주세요.');
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

#!/usr/bin/env node

/**
 * translations.js에서 각 언어의 quizQuestions를 추출하여
 * 각 언어 폴더의 quiz.js의 quizData를 번역된 데이터로 대체
 */

const fs = require('fs');
const path = require('path');

// 루트 quiz.js 읽기
const baseQuizJs = fs.readFileSync('./js/quiz.js', 'utf-8');

// translations 파일 읽기
const translationsContent = fs.readFileSync('./js/translations.js', 'utf-8');

// 언어 목록
const languages = ['en', 'ja', 'zh', 'es', 'de', 'fr', 'ru', 'pt', 'id', 'hi', 'vi', 'th', 'tr', 'it', 'nl', 'ar', 'mn', 'la'];

// 각 언어별 번역 데이터를 JavaScript에서 추출하는 간단한 함수
function getTranslatedQuizData(langCode) {
  try {
    // eval로 translations.js 실행 (위험하지만 이 경우는 통제된 환경)
    // 대신 정규식으로 텍스트 추출
    const pattern = new RegExp(`"${langCode}":\\s*\\{([^]*?)\\n  \\}(?=,|\\n)`, 's');
    const langMatch = translationsContent.match(pattern);

    if (!langMatch) {
      console.log(`❌ ${langCode}: 언어 섹션 없음`);
      return null;
    }

    const langSection = langMatch[1];

    // quizQuestions 섹션 찾기
    const qSection = langSection.match(/quizQuestions:\s*\{([\s\S]*?)\n\s*\},?/);
    if (!qSection) {
      console.log(`❌ ${langCode}: quizQuestions 섹션 없음`);
      return null;
    }

    // 각 질문 파싱 (간단한 방식)
    const quizQuestions = {};
    const linePattern = /q(\d+):\s*\{\s*text:\s*'([^']*)'\s*,\s*a1:\s*'([^']*)'\s*,\s*a2:\s*'([^']*)'\s*\}/g;

    let match;
    while ((match = linePattern.exec(qSection)) !== null) {
      const qNum = match[1];
      const text = match[2];
      const a1 = match[3];
      const a2 = match[4];

      quizQuestions[`q${qNum}`] = { text, a1, a2 };
    }

    if (Object.keys(quizQuestions).length === 0) {
      console.log(`⚠️ ${langCode}: quizQuestions 파싱 실패`);
      return null;
    }

    return quizQuestions;

  } catch (e) {
    console.log(`❌ ${langCode}: 오류 - ${e.message}`);
    return null;
  }
}

// 각 언어별로 quiz.js 생성
console.log('🚀 각 언어별 번역된 quiz.js 생성 시작...\n');

languages.forEach(lang => {
  const langFolder = lang === 'ja' ? 'jp' : lang;
  const quizPath = path.join(langFolder, 'js', 'quiz.js');

  if (!fs.existsSync(path.dirname(quizPath))) {
    fs.mkdirSync(path.dirname(quizPath), { recursive: true });
  }

  // 번역 데이터 추출
  const quizQuestions = getTranslatedQuizData(lang);

  if (quizQuestions) {
    // quiz.js 읽기
    let quizContent = baseQuizJs;

    // quizData의 각 항목을 번역으로 대체
    Object.entries(quizQuestions).forEach(([qKey, qData]) => {
      const qNum = qKey.substring(1); // q1 → 1
      const baseQ = baseQuizJs.match(new RegExp(`\\{\\s*id:\\s*${qNum},([^}]*?)\\}`, 's'));

      if (baseQ) {
        const axisMatch = baseQ[0].match(/axis:\\s*"([^"]+)"/);
        const emojiMatch = baseQ[0].match(/emoji:\\s*"([^"]+)"/);

        if (axisMatch && emojiMatch) {
          const axis = axisMatch[1];
          const emoji = emojiMatch[1];

          const newQuestion = `{
    id: ${qNum}, axis: "${axis}",
    emoji: "${emoji}",
    text: "${qData.text}",
    options: [
      { text: "${qData.a1}", score: "${axis.charAt(0)}" },
      { text: "${qData.a2}", score: "${axis.charAt(1)}" }
    ]
  }`;

          // 원본 question 찾아서 대체
          const oldQuestion = baseQ[0];
          quizContent = quizContent.replace(oldQuestion, newQuestion);
        }
      }
    });

    // 파일 저장
    fs.writeFileSync(quizPath, quizContent);
    console.log(`✅ ${lang.padEnd(5)} → ${langFolder}/js/quiz.js`);

  } else {
    // 번역이 없으면 기본 quiz.js 복사 (기본값은 한글)
    fs.writeFileSync(quizPath, baseQuizJs);
    console.log(`⚠️ ${lang.padEnd(5)} → ${langFolder}/js/quiz.js (기본값 사용)`);
  }
});

console.log('\n✅ 완료!');

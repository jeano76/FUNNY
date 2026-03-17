#!/usr/bin/env node

/**
 * Extract animal translations from translations.js and generate sed commands
 * to update all language folder result.js files
 */

const fs = require('fs');

// Read translations.js
const translationsContent = fs.readFileSync('./js/translations.js', 'utf-8');

// MBTI types in order of Korean names as they appear in result.js
const mbtiTypes = {
  '호랑이': 'INTJ',
  '올빼미': 'INTP',
  '사자': 'ENTJ',
  '앵무새': 'ENTP',
  '판다': 'INFJ',
  '해마': 'INFP',
  '골든리트리버': 'ENFJ',
  '돌고래': 'ENFP',
  '비버': 'ISTJ',
  '사슴': 'ISFJ',
  '늑대': 'ESTJ',
  '코끼리': 'ESFJ',
  '고양이': 'ISTP',
  '나무늘보': 'ISFP',
  '치타': 'ESTP',
  '공작새': 'ESFP',
};

// Languages with folder names
const languages = {
  en: 'en',
  pt: 'pt',
  jp: 'jp',
  ja: 'jp',
  zh: 'zh',
  es: 'es',
  de: 'de',
  fr: 'fr',
  ru: 'ru',
  id: 'id',
  hi: 'hi',
  vi: 'vi',
  th: 'th',
  tr: 'tr',
  it: 'it',
  nl: 'nl',
  ar: 'ar',
  mn: 'mn',
  la: 'la',
};

// Extract animals section for each language
function extractAnimals(langCode) {
  // Look for "en: {" pattern and find animals object within
  const langPattern = new RegExp(`"${langCode}":\\s*\\{([^]*?)\\n  \\}`, 's');
  const langMatch = translationsContent.match(langPattern);

  if (!langMatch) {
    console.log(`❌ ${langCode}: Language section not found`);
    return null;
  }

  const langSection = langMatch[1];

  // Extract animals section
  const animalsPattern = /animals:\s*\{([^}]+)\}/s;
  const animalsMatch = langSection.match(animalsPattern);

  if (!animalsMatch) {
    console.log(`⚠️ ${langCode}: Animals section not found`);
    return null;
  }

  const animalsContent = animalsMatch[1];

  // Parse each animal translation
  const animals = {};
  const linePattern = /(\w+):\s*['"](.*?)['"],?/g;

  let match;
  while ((match = linePattern.exec(animalsContent)) !== null) {
    const mbtiType = match[1];
    const animalName = match[2];
    animals[mbtiType] = animalName;
  }

  return animals;
}

// Generate sed commands for replacing animals in result.js files
console.log('🚀 Generating animal translation commands...\n');

for (const [langCode, folderName] of Object.entries(languages)) {
  const animals = extractAnimals(langCode);

  if (!animals || Object.keys(animals).length === 0) {
    console.log(`⚠️ ${langCode}: No animal translations found`);
    continue;
  }

  const jsFile = `${folderName}/js/result.js`;

  console.log(`\n# === ${langCode.toUpperCase()} ===`);
  console.log(`# File: ${jsFile}`);

  // Generate sed commands for each Korean animal -> translated animal
  for (const [koreanName, mbtiType] of Object.entries(mbtiTypes)) {
    const translatedName = animals[mbtiType];
    if (translatedName && translatedName !== koreanName) {
      // Escape special characters for sed
      const escapedKorean = koreanName.replace(/[&/\\]/g, '\\$&');
      const escapedTranslated = translatedName.replace(/[&/\\]/g, '\\$&');

      console.log(`sed -i 's/${escapedKorean}/${escapedTranslated}/g' ${jsFile}`);
    }
  }
}

console.log('\n✅ Commands generated!');

#!/usr/bin/env node

/**
 * Extract all animal translations from translations.js by reading specific language sections
 */

const fs = require('fs');
const readline = require('readline');

// Line ranges for each language section (from grep output above)
const languageSections = {
  ko: [11, 100],
  en: [816, 200],
  ja: [1269, 200],
  zh: [1724, 200],
  es: [2130, 200],
  de: [2507, 200],
  fr: [2883, 200],
  ru: [3260, 200],
  pt: [3635, 200],
  id: [4011, 200],
  hi: [4386, 200],
  vi: [4761, 200],
  th: [5136, 200],
  tr: [5511, 200],
  it: [5886, 300],
  nl: [6173, 300],
  ar: [6460, 300],
  mn: [6747, 300],
  la: [7034, 300],
};

const lines = fs.readFileSync('./js/translations.js', 'utf-8').split('\n');

const allAnimals = {};

// For each language, find and extract animals section
for (const [langCode, [startLine, range]] of Object.entries(languageSections)) {
  // Line numbers are 1-indexed but arrays are 0-indexed
  const sectionLines = lines.slice(startLine - 1, startLine - 1 + range);
  const sectionText = sectionLines.join('\n');

  // Find animals block
  const animalsMatch = sectionText.match(/animals:\s*\{([\s\S]*?)\},/);
  if (!animalsMatch) {
    console.log(`⚠️ ${langCode}: animals section not found`);
    continue;
  }

  const animalsBlock = animalsMatch[1];
  const animals = {};

  // Parse each line in animals block
  const animalPattern = /(\w+):\s*['"](.*?)['"],?/g;
  let match;
  while ((match = animalPattern.exec(animalsBlock)) !== null) {
    const mbtiType = match[1];
    const animalName = match[2];
    animals[mbtiType] = animalName;
  }

  if (Object.keys(animals).length > 0) {
    allAnimals[langCode] = animals;
    console.log(`✅ ${langCode}: ${Object.keys(animals).length} animals extracted`);
  } else {
    console.log(`❌ ${langCode}: Failed to parse animals`);
  }
}

// Save to JSON for reference
fs.writeFileSync('./animal_translations.json', JSON.stringify(allAnimals, null, 2));
console.log('\n📋 Saved to animal_translations.json\n');

// Map language codes to folder names
const langToFolder = {
  en: 'en',
  ja: 'jp',
  zh: 'zh',
  es: 'es',
  de: 'de',
  fr: 'fr',
  ru: 'ru',
  pt: 'pt',
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

// Get Korean animals as reference
const koreanAnimals = allAnimals.ko || {};

// MBTI types
const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

console.log('📝 Generating sed commands:\n');

// For each language (excluding Korean)
for (const [langCode, folderName] of Object.entries(langToFolder)) {
  const translatedAnimals = allAnimals[langCode];
  if (!translatedAnimals) {
    console.log(`⚠️ ${langCode}: No animals found`);
    continue;
  }

  const jsFile = `${folderName}/js/result.js`;
  console.log(`\n# === ${langCode.toUpperCase()} ===`);

  // For each MBTI type, generate sed command
  for (const mbtiType of mbtiTypes) {
    const koreanName = koreanAnimals[mbtiType];
    const translatedName = translatedAnimals[mbtiType];

    if (!koreanName || !translatedName) {
      console.log(`# Missing ${mbtiType}`);
      continue;
    }

    if (koreanName !== translatedName) {
      // Escape special characters for sed
      const escapedKorean = koreanName
        .replace(/\\/g, '\\\\')
        .replace(/&/g, '\\&')
        .replace(/\//g, '\\/')
        .replace(/\./g, '\\.')
        .replace(/\*/g, '\\*');

      const escapedTranslated = translatedName
        .replace(/\\/g, '\\\\')
        .replace(/&/g, '\\&')
        .replace(/\//g, '\\/')
        .replace(/\./g, '\\.')
        .replace(/\*/g, '\\*');

      console.log(`sed -i "s/${escapedKorean}/${escapedTranslated}/g" ${jsFile}`);
    }
  }
}

console.log('\n✅ Done!');

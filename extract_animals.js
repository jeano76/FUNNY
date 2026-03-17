#!/usr/bin/env node

/**
 * Extract all animal translations from translations.js
 */

const fs = require('fs');
const path = require('path');

// Read translations.js
const translationsContent = fs.readFileSync('./js/translations.js', 'utf-8');

// Extract the TRANSLATIONS object
const match = translationsContent.match(/const TRANSLATIONS = \{([\s\S]*)\};/);
if (!match) {
  console.error('❌ Could not parse TRANSLATIONS object');
  process.exit(1);
}

// Use regex to find all "animals: {" blocks for each language
const languagePattern = /(\w{2,3}): \{[\s\S]*?animals: \{([\s\S]*?)\},/g;

const allAnimals = {};
let langMatch;

while ((langMatch = languagePattern.exec(translationsContent)) !== null) {
  const langCode = langMatch[1];
  const animalsBlock = langMatch[2];

  const animals = {};
  const animalPattern = /(\w+):\s*['"](.*?)['"],?/g;

  let animalMatch;
  while ((animalMatch = animalPattern.exec(animalsBlock)) !== null) {
    const mbtiType = animalMatch[1];
    const animalName = animalMatch[2];
    animals[mbtiType] = animalName;
  }

  if (Object.keys(animals).length > 0) {
    allAnimals[langCode] = animals;
    console.log(`✅ ${langCode}: ${Object.keys(animals).length} animals extracted`);
  }
}

// Save to JSON for reference
fs.writeFileSync('./animal_translations.json', JSON.stringify(allAnimals, null, 2));

// Map language codes to folder names
const langToFolder = {
  ko: 'ko',
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

// MBTI types in order (matching result.js structure)
const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

// Get Korean animals as reference (base)
const koreanAnimals = allAnimals.ko || {};

console.log('\n📝 Generating sed replacement commands:\n');

// For each language (excluding Korean)
for (const [langCode, folderName] of Object.entries(langToFolder)) {
  if (langCode === 'ko') continue;

  const translatedAnimals = allAnimals[langCode];
  if (!translatedAnimals) {
    console.log(`⚠️ ${langCode}: No animal translations found`);
    continue;
  }

  const jsFile = `${folderName}/js/result.js`;

  console.log(`\n# === Update ${langCode.toUpperCase()} (${folderName}/js/result.js) ===`);

  // For each MBTI type, replace Korean name with translated name
  for (const mbtiType of mbtiTypes) {
    const koreanName = koreanAnimals[mbtiType];
    const translatedName = translatedAnimals[mbtiType];

    if (!koreanName || !translatedName) {
      console.log(`# ⚠️ Missing ${mbtiType}: KO=${koreanName}, ${langCode}=${translatedName}`);
      continue;
    }

    if (koreanName !== translatedName) {
      // Escape special characters for sed
      const escapedKorean = koreanName
        .replace(/\\/g, '\\\\')
        .replace(/&/g, '\\&')
        .replace(/\//g, '\\/')
        .replace(/\./g, '\\.');

      const escapedTranslated = translatedName
        .replace(/\\/g, '\\\\')
        .replace(/&/g, '\\&')
        .replace(/\//g, '\\/')
        .replace(/\./g, '\\.');

      console.log(`sed -i "s/${escapedKorean}/${escapedTranslated}/g" ${jsFile}`);
    }
  }
}

console.log('\n✅ Done!');

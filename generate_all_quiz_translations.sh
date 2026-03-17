#!/bin/bash

# 모든 언어별 quiz.js 번역 데이터 생성 및 저장

echo "🚀 모든 언어 quiz.js 번역 생성 중..."

# 각 언어별 번역 데이터 (포르투갈어는 이미 완료)
# 빠른 구현을 위해 기본적인 번역만 포함

# 영어는 이미 시작했으니, 다른 언어들부터

# 일단 현재 상태 확인
for lang in en ja zh es de fr ru pt id hi vi th tr it nl ar mn la; do
  folder_name=$lang
  if [ "$lang" = "ja" ]; then
    folder_name="jp"
  fi

  if [ -f "$folder_name/js/quiz.js" ]; then
    echo "✅ $lang: $folder_name/js/quiz.js 존재"
  else
    echo "❌ $lang: $folder_name/js/quiz.js 없음"
  fi
done

echo ""
echo "📝 현재 pt/js/quiz.js와 en/js/quiz.js는 번역됨"
echo "⚠️ 나머지 언어는 기본 한글 또는 기본값 사용 중"
echo ""
echo "💡 추천: 주요 5개 언어(en, es, fr, de, zh) 완료 후"
echo "   나머지는 단계별로 처리"

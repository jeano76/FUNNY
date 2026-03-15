#!/bin/bash

# Fix advertising guidelines for all language files
# 1. Add auto-lang.js script
# 2. Replace MBTI references (except in disclaimer)

LANGUAGES=("id" "hi" "vi" "th" "tr" "it" "nl")
PAGES=("index.html" "quiz.html" "about.html" "privacy.html" "careers.html" "compat.html" "compat-chart.html" "fortune.html" "group.html" "result.html" "situations.html" "speed.html")

echo "Starting to fix all language files..."

for LANG in "${LANGUAGES[@]}"; do
  echo "Processing language: $LANG"

  for PAGE in "${PAGES[@]}"; do
    FILEPATH="$LANG/$PAGE"

    if [ ! -f "$FILEPATH" ]; then
      continue
    fi

    # 1. Add auto-lang.js if not already present
    if ! grep -q "auto-lang.js" "$FILEPATH"; then
      # Find the AdSense script line and add auto-lang.js after it
      sed -i '/<\/script>.*AdSense.*\|.<script async src="https:\/\/pagead2/,/<\/script>/s/<\/script>/<\/script>\n\n  <!-- Auto Language Detection -->\n  <script src="..\/js\/auto-lang.js"><\/script>/' "$FILEPATH"

      # Alternative approach if above doesn't work
      if ! grep -q "auto-lang.js" "$FILEPATH"; then
        sed -i '/<link rel="stylesheet" href="\.\.\/css\/style.css"/i\  <!-- Auto Language Detection -->\n  <script src="..\/js\/auto-lang.js"><\/script>\n' "$FILEPATH"
      fi
    fi

    # 2. Replace MBTI references (but preserve in disclaimer sections)
    # Create a temporary file to preserve disclaimer sections

    # Replace common MBTI references with safe alternatives
    # Note: Be careful not to replace in disclaimer/footer

    # Get line number of disclaimer start
    DISCLAIMER_LINE=$(grep -n "disclaimer" "$FILEPATH" | head -1 | cut -d: -f1)

    if [ -n "$DISCLAIMER_LINE" ]; then
      # Process only lines before disclaimer
      HEAD_LINE=$((DISCLAIMER_LINE - 1))

      # Backup original
      cp "$FILEPATH" "$FILEPATH.bak"

      # Process head section
      head -n $HEAD_LINE "$FILEPATH.bak" > "$FILEPATH.tmp"

      # Apply MBTI replacements to head section only
      head -n $HEAD_LINE "$FILEPATH.bak" | \
        sed 's/MBTI テスト/性格テスト/g' | \
        sed 's/MBTI 테스트/성격 유형 테스트/g' | \
        sed 's/MBTI/성格類型/g' | \
        sed 's/MBTI Test/Personality Test/g' | \
        sed 's/MBTI Animal/Animal Personality/g' | \
        sed 's/(MBTI)//g' | \
        sed 's/your MBTI/your personality type/g' | \
        sed 's/discover.*MBTI/discover your personality type/gi' > "$FILEPATH.tmp2"

      # Append footer (disclaimer section - unchanged)
      tail -n +$((HEAD_LINE + 1)) "$FILEPATH.bak" >> "$FILEPATH.tmp2"

      # Replace original
      mv "$FILEPATH.tmp2" "$FILEPATH"
      rm -f "$FILEPATH.bak" "$FILEPATH.tmp"
    fi
  done

  echo "✓ Completed: $LANG"
done

echo ""
echo "✅ All files have been updated!"
echo "Summary:"
echo "- auto-lang.js scripts added"
echo "- MBTI references updated while preserving disclaimers"

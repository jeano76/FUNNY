#!/bin/bash

echo "🔍 Checking i18n initialization in all pages..."
echo ""

# Check if pages have i18n.init() call
echo "Checking for i18n initialization..."
for file in compat-chart.html index.html quiz.html result.html compat.html compare.html careers.html situations.html fortune.html challenges.html group.html speed.html about.html privacy.html; do
  if grep -q "window.i18n.init()" "$file"; then
    echo "✅ $file: has i18n.init()"
  else
    echo "⚠️ $file: missing i18n.init() or setTranslations()"
  fi
done

echo ""
echo "Checking for data-i18n attributes on key elements..."
echo ""

# Check for key i18n keys in compat-chart.html
echo "compat-chart.html:"
grep -o 'data-i18n="[^"]*"' compat-chart.html | sort | uniq

echo ""
echo "Checking translations.js for completeness..."
echo "Available language keys in translations.js:"
grep -o '"[a-z][a-z]":' js/translations.js | sort | uniq

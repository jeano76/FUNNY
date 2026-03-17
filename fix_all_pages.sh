#!/bin/bash

# Fix all HTML pages in all language folders to use relative paths

LANGUAGES="en pt jp zh es de fr ru id hi vi th tr it nl ar mn la"

for lang in $LANGUAGES; do
  echo "🔧 Fixing $lang folder..."
  
  # Get all HTML files in the language folder
  for htmlfile in "$lang"/*.html; do
    if [ -f "$htmlfile" ]; then
      # Replace absolute paths with relative paths
      sed -i 's|<link rel="stylesheet" href="/css/|<link rel="stylesheet" href="../css/|g' "$htmlfile"
      sed -i 's|<script src="/js/|<script src="../js/|g' "$htmlfile"
      sed -i 's|href="/|href="../|g' "$htmlfile"
      sed -i 's|href="index.html"|href="../index.html"|g' "$htmlfile"
      sed -i 's|href="compat.html"|href="../compat.html"|g' "$htmlfile"
      sed -i 's|href="quiz.html"|href="../quiz.html"|g' "$htmlfile"
      sed -i 's|href="compat-chart.html"|href="../compat-chart.html"|g' "$htmlfile"
      sed -i 's|href="compare.html"|href="../compare.html"|g' "$htmlfile"
      sed -i 's|href="careers.html"|href="../careers.html"|g' "$htmlfile"
      sed -i 's|href="situations.html"|href="../situations.html"|g' "$htmlfile"
      sed -i 's|href="fortune.html"|href="../fortune.html"|g' "$htmlfile"
      sed -i 's|href="challenges.html"|href="../challenges.html"|g' "$htmlfile"
      sed -i 's|href="group.html"|href="../group.html"|g' "$htmlfile"
      sed -i 's|href="speed.html"|href="../speed.html"|g' "$htmlfile"
      sed -i 's|href="about.html"|href="../about.html"|g' "$htmlfile"
      sed -i 's|href="privacy.html"|href="../privacy.html"|g' "$htmlfile"
      
      # BUT: Keep internal navigation links that should stay local
      sed -i "s|href=\"\.\./$lang/|href=\"|g" "$htmlfile"
    fi
  done
done

echo "✅ All paths fixed!"

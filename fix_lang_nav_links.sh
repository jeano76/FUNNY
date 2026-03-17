#!/bin/bash

# Fix language navigation links in all language folders

LANGUAGES="en pt jp zh es de fr ru id hi vi th tr it nl ar mn la"

for lang in $LANGUAGES; do
  echo "🔧 Fixing language nav links for $lang..."
  
  for htmlfile in "$lang"/*.html; do
    if [ -f "$htmlfile" ]; then
      # Fix the Korean (KO) link - should go to root, then to same page
      sed -i 's|<a href="\.\./' $lang '/index\.html">한국어 (KO)</a>|<a href="../index.html">한국어 (KO)</a>|g' "$htmlfile"
      
      # Fix other language links - they should go to ../LANG/index.html pattern
      # But need to be careful with sed syntax
      
      # Replace ../en/index.html with ../en/index.html (keep as is - it's correct for same page)
      # Actually, the links should point to the correct page in the target language
      # So we need to know which page we're on
      
      # For now, just ensure they follow the pattern
      pagename=$(basename "$htmlfile")
      
      # Ensure all non-KO language links follow the pattern ../LANG/pagename
      sed -i "s|href=\"\.\./en/.*\.html\"|href=\"../en/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./pt/.*\.html\"|href=\"../pt/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./jp/.*\.html\"|href=\"../jp/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./zh/.*\.html\"|href=\"../zh/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./es/.*\.html\"|href=\"../es/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./de/.*\.html\"|href=\"../de/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./fr/.*\.html\"|href=\"../fr/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./ru/.*\.html\"|href=\"../ru/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./id/.*\.html\"|href=\"../id/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./hi/.*\.html\"|href=\"../hi/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./vi/.*\.html\"|href=\"../vi/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./th/.*\.html\"|href=\"../th/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./tr/.*\.html\"|href=\"../tr/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./it/.*\.html\"|href=\"../it/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./nl/.*\.html\"|href=\"../nl/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./ar/.*\.html\"|href=\"../ar/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./mn/.*\.html\"|href=\"../mn/$pagename\"|g" "$htmlfile"
      sed -i "s|href=\"\.\./la/.*\.html\"|href=\"../la/$pagename\"|g" "$htmlfile"
    fi
  done
done

echo "✅ Language nav links fixed!"

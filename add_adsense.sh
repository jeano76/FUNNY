#!/bin/bash

ADSENSE_SCRIPT='  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9698578259562384"
     crossorigin="anonymous"></script>'

# 모든 HTML 파일 찾기
find . -name "*.html" -type f | while read file; do
  # 파일이 이미 AdSense 스크립트를 가지고 있는지 확인
  if ! grep -q "pagead2.googlesyndication" "$file"; then
    # </head> 태그 전에 AdSense 스크립트 삽입
    sed -i "s|</head>|$ADSENSE_SCRIPT\n</head>|" "$file"
    echo "Added AdSense to: $file"
  fi
done

echo "Done!"

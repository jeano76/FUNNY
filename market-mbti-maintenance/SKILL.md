---
name: market-mbti-maintenance
description: Workflows for updating branding, AdSense integration, git pushes with PAT, and Cloudflare webhook deployment for the Market MBTI project.
---

# Market MBTI Maintenance Guide

This skill documents the precise sequence of actions taken to make the site "AdSense ready" and deploy it to Cloudflare Pages.

## 1. Branding & Safety Updates (AdSense Compliance)

To avoid trademark issues and comply with advertising guidelines, follow these rules:

- **Branding:** Use "16가지 성격 유형 동물 테스트" (16 Personality Animal Test) instead of "MBTI 동물 테스트".
- **Naming:** Avoid "Official MBTI Test" or "MBTI Testing Center". Use "16 Personalities" or "Personality Type Analysis".
- **Disclaimer:** All footers must include:
  ```html
  <div class="disclaimer" style="font-size: 0.8rem; color: #666; margin-top: 10px; line-height: 1.4;">
    본 서비스는 공식 MBTI 검사와 무관하며, 결과는 재미로만 즐겨주세요.<br>
    MBTI®는 The Myers & Briggs Foundation의 등록 상표이며, 본 서비스는 해당 재단과 관련이 없습니다.
  </div>
  ```
- **Privacy:** Ensure no personal/contact information (emails, phone numbers, operator details) exists in `about.html` or `privacy.html`.

## 2. Google AdSense Integration

The AdSense script should be placed in the `<head>` section of all 12 HTML files.

**Script:**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9698578259562384"
     crossorigin="anonymous"></script>
```

## 3. Git Operations with Personal Access Token (PAT)

Since the environment requires manual authentication for pushing, use the PAT in the remote URL:

```bash
git add .
git commit -m "docs: Update for AdSense compliance and add ad script"
git remote set-url origin https://<YOUR_PAT>@github.com/jeano76/MYMBTI.git
git push origin main
```

## 4. Deployment via Webhook

After pushing the changes to GitHub, trigger the Cloudflare Pages deployment:

```bash
curl -X POST https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/6e42751a-59b1-4c04-b543-0bc799990ade
```

## Reference: Advertising Guidelines

See [references/advertising_guidelines.md](references/advertising_guidelines.md) for detailed naming and safety rules provided by the user.

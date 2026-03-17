# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**marketMBTI** is a static personality type test site featuring 16 animal-based character types. It's deployed on Cloudflare Pages and monetized with Google AdSense. The entire codebase is vanilla HTML/CSS/JavaScript with no build process.

- **Deployment**: Cloudflare Pages
- **Domain**: https://stockinvestonline.com/
- **Tech Stack**: Pure HTML5, CSS3, Vanilla JavaScript
- **Languages**: 19 supported (Korean, English, Japanese, Chinese, Spanish, German, French, Russian, Portuguese, Indonesian, Hindi, Vietnamese, Thai, Turkish, Italian, Dutch, Arabic, Mongolian, Latin)

## Development Setup

### Running Locally

```bash
# Start a simple HTTP server (use any of these)
python -m http.server 8000
# or
npx http-server
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

**Note**: No build process, no npm dependencies, no compilation required.

## Architecture & Codebase Structure

### Pages (HTML)

Each page is a standalone HTML file with inline metadata and script references:

- **index.html** - Main landing page with test introduction
- **quiz.html** - 20-question test interface
- **result.html** - Personality result display with sharing options
- **about.html** - Project information
- **privacy.html** - Privacy policy
- **compare.html** - Compatibility matching between types
- **careers.html** - Job recommendation based on type
- **situations.html** - Situational response analysis
- **fortune.html** - Daily fortune feature
- **challenges.html** - Challenge/achievement system
- **group.html** - Group testing
- **speed.html** - Speed mode (quick test)
- **compat.html** - Full compatibility chart
- **compat-chart.html** - Detailed compatibility visualization

### Multi-Language Structure

Each page has translated versions in language folders (ar/, de/, en/, es/, fr/, hi/, id/, it/, jp/, la/, mn/, nl/, pt/, ru/, th/, tr/, vi/, zh/). Structure mirrors root: `[lang]/index.html`, `[lang]/quiz.html`, etc.

Language detection/switching is handled by `js/auto-lang.js`, which checks the user's browser language preference on first visit.

### CSS Architecture (css/style.css)

Single unified stylesheet using CSS variables for theming:

```css
:root {
  --primary, --accent, --success, --warn    /* Main colors */
  --bg, --card, --text, --text-mute         /* Base palette */
  --radius, --shadow, --shadow-sm, --shadow-lg  /* Spacing/effects */

  /* MBTI personality axes */
  --e, --i, --s, --n, --t, --f, --j, --p   /* Individual axis colors */

  /* Animal group colors */
  --nt, --nf, --sj, --sp                    /* Personality type groupings */
}
```

Mobile-first responsive approach. No external CSS frameworks.

### JavaScript Modules (js/)

**Core Modules:**

- **result.js** (17.6 KB) - Master data file containing all 16 personality type definitions
  - `resultData` object: complete type definitions (name, emoji, description, strengths, weaknesses, compatibility, famous examples, Korean ratio)
  - Used by quiz.js, result.html, compare.html, careers.html, situations.html
  - **When modifying**: update all 16 types consistently, including translation in language folders

- **quiz.js** (9.4 KB) - Quiz question logic and answer calculation
  - Quiz question definitions (20 items)
  - Score calculation and MBTI result determination
  - Used by: quiz.html, speed.html

- **storage.js** (1.7 KB) - Browser localStorage management
  - Save/load test results
  - History management
  - Persistent user data

- **share.js** (2.9 KB) - SNS sharing functionality
  - Kakao Talk integration (App Key: 2850ea2fde730ed80b6f932c8e05d709)
  - Twitter/X sharing
  - Facebook sharing
  - Link copy

- **auto-lang.js** (1.8 KB) - Automatic language detection and redirection
  - Detects browser language preference
  - Version: 2.0 (includes forced link rewriting for language context)
  - Loaded early in HEAD (v=2.0 cache buster)
  - Defines `window.switchLanguage(langDir)` used by nav.js

- **translations.js** (large) - All translation data for 19 languages
  - `window.TRANSLATIONS` object with keys: ko, en, ja, zh, es, de, fr, ru, pt, id, hi, vi, th, tr, it, nl, ar, mn, la
  - Contains: personalities, careers, challenges, achievements, nav, footer, all page strings
  - Current version: v=1.2 — **bump version on every edit** to bust browser cache
  - **CRITICAL**: Each language section must be properly closed with `}`. Run `node --check js/translations.js` after editing.

- **i18n-complete.js** - Translation engine
  - `window.i18n.t('key.subkey')` for JS usage
  - `data-i18n="key.subkey"` attribute for HTML elements
  - Auto-initializes via setTimeout; also called explicitly with `window.i18n.init()`
  - Current version: v=1.2

**Feature Modules:**

- **achievement.js** (10.6 KB) - Badge and challenge system
- **challenges.js** (9.4 KB) - Daily challenges and achievements
- **chart.js** (8.3 KB) - Chart visualization for personality analysis
- **compare.js** (12.5 KB) - Compatibility and comparison logic
- **careers.js** (23.3 KB) - Job recommendation system
- **canvas-card.js** (4.5 KB) - Generate shareable result images
- **nav.js** (2.7 KB) - Navigation behavior and language switcher
  - Current version: v=2.3
  - Language links use direct click handlers (not event delegation)
  - Calls `window.switchLanguage(langDir)` defined in auto-lang.js
  - Moves `.lang-content` to `document.body` for fixed positioning

### Key Data Structures

**Personality Type (from result.js):**
```javascript
{
  name: "호랑이",                    // Animal name
  emoji: "🐯",                       // Type emoji
  title: "고독한 전략가",             // English title
  group: "분석형 (NT) · ...",        // Group classification
  description: "...",                // Personality description
  strengths: [...],                  // Key strengths
  weaknesses: [...],                 // Key weaknesses
  koreanRatio: "2.1%",               // Frequency in Korea
  worldRarityRank: "★★★★★ 최희귀", // Global rarity
  compatibleTypes: [...],            // Compatible types
  famousExamples: [...],             // Famous personalities
  shareText: "..."                   // Social share template
}
```

**Quiz Answer Format (from quiz.js):**
Each question has multiple choice answers that map to MBTI axes (E/I, S/N, T/F, J/P).

## Common Development Tasks

### Adding a New Feature Page

1. Create new HTML file (e.g., `newfeature.html`)
2. Include standard header (meta tags, AdSense script, auto-lang.js v=2.0)
3. Include navigation section (copy from quiz.html)
4. Link to `css/style.css`
5. Add relevant JS modules
6. Create translated versions in each language folder

### Updating Personality Type Data

**Critical**: Personality data lives in **result.js**. When updating:

1. Modify the appropriate MBTI type object in `resultData`
2. Update ALL references in language folders if translations exist
3. Check dependent modules that reference the data:
   - compare.js (compatibility matrix)
   - careers.js (job recommendations)
   - situations.html (situational responses)

### Adding a New Language

1. Create new language folder (e.g., `xx/`)
2. Copy all HTML pages from root: `xx/index.html`, `xx/quiz.html`, etc.
3. Translate all HTML content
4. Create `xx/js/` with translated versions of data-heavy modules (result.js, quiz.js)
5. Add language option to language dropdown in all pages
6. Update languages.json with new language metadata
7. Test auto-lang.js detection for the new language code

### Modifying Styling

All colors and spacing use CSS variables (`:root` in style.css). Update variables rather than hardcoding values:

- MBTI axis colors: `--e`, `--i`, `--s`, `--n`, `--t`, `--f`, `--j`, `--p`
- Type group colors: `--nt`, `--nf`, `--sj`, `--sp`
- Base palette: `--primary`, `--bg`, `--text`, etc.

Mobile-first: write base styles for mobile, use `@media (min-width: 768px)` for tablet+.

### Deploying Changes

```bash
# No build needed. Simply push to GitHub and Cloudflare Pages auto-deploys.
git add .
git commit -m "message"
git push origin main
```

Changes appear live within seconds on Cloudflare.

## Important Patterns & Conventions

### Language Context Preservation

auto-lang.js v2.0 includes **forced link rewriting**. All internal links are automatically rewritten to preserve language context. When adding new links in pages, use relative paths and the script will handle language routing:

```html
<!-- Write simple relative links -->
<a href="quiz.html">Take Quiz</a>

<!-- Script converts based on current language -->
<!-- For Korean user: stays /quiz.html -->
<!-- For English user: becomes /en/quiz.html -->
```

### localStorage Keys

Results are stored with keys that can be checked in browser DevTools → Application → Local Storage:

- `mbti_result` - Current test result
- `mbti_history` - Test history
- Achievement/badge data varies by feature module

### Version Query Parameters

Script tags use version cache busters to bust browser caches on updates:

```html
<script src="/js/auto-lang.js?v=2.0"></script>      <!-- auto-lang: v2.0 -->
<script src="/js/translations.js?v=1.2"></script>   <!-- translations: v1.2 -->
<script src="/js/i18n-complete.js?v=1.2"></script>  <!-- i18n-complete: v1.2 -->
<script src="/js/nav.js?v=2.3"></script>            <!-- nav: v2.3 -->
```

**Always increment the version number** when making meaningful changes to JS files, then run a find+replace across all 266+ HTML files:
```bash
find . -name "*.html" | xargs sed -i 's/translations\.js?v=X\.X/translations.js?v=X.Y/g'
```

### Metadata & SEO

Each page includes:

- Meta description (140-160 chars)
- Meta keywords (relevant to MBTI/personality testing)
- Open Graph tags (og:image, og:title, og:description)
- Twitter Card tags for social sharing
- robots meta: use `noindex` for in-progress pages (quiz.html)

## Deployment & Hosting

**Cloudflare Pages Configuration:**

- Build command: None (static files only)
- Output directory: Root of repository
- Automatic deployment on git push to main
- _headers file controls HTTP headers (security headers, cache directives)

**Domain & DNS:**

- Primary domain: stockinvestonline.com
- Cloudflare nameservers required
- Auto HTTPS via Let's Encrypt

**Google AdSense:**

- Publisher ID: `pub-9698578259562384`
- Script in HEAD: `pagead2.googlesyndication.com`
- ads.txt file in root directory

## Security

### Cloudflare Headers (_headers file)

```
X-Frame-Options: DENY                                    /* No iframe embedding */
X-Content-Type-Options: nosniff                          /* Prevent MIME sniffing */
Referrer-Policy: strict-origin-when-cross-origin        /* Referrer privacy */
Permissions-Policy: camera=(), microphone=(), geo=()    /* Disable device access */
```

### No Sensitive Data

- Kakao App Key is public (client-side web app)
- AdSense Publisher ID is public
- No environment variables or secrets in code

## Testing

No automated test framework. Manual testing approach:

1. **Local server**: Run `python -m http.server 8000`, test in browser
2. **All languages**: Verify language switcher in dropdown
3. **Mobile**: Use browser DevTools device emulation (375px, 768px, 1024px)
4. **Sharing**: Test SNS sharing with preview tools (Twitter Card Validator, Facebook Sharing Debugger)
5. **Storage**: Check localStorage in DevTools → Application tab

## File Size Considerations

Cloudflare Pages has per-file limits. Current files are well within limits:

- Largest JS: translations.js (~200 KB) ✅
- Largest HTML: careers.html (30.4 KB) ✅
- CSS: unified style.css (large combined file but single request)

If adding large features, consider modular approach rather than single large file.

## Browser Support

Target modern browsers (2020+):

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

No IE11 support. Uses modern CSS (Grid, Flexbox, CSS variables, etc).

## Git Workflow

- Main branch is production (auto-deploys via Cloudflare Pages)
- Make changes directly or on feature branches
- Commit messages typically describe the MBTI/feature context
- Recent commits show pattern: `fix(feature): description`

## User Memory Context

- **Phase 1**: Basic structure, quiz logic, localStorage
- **Phase 2**: Multi-language support, auto-detection, SEO
- **Phase 3**: AdSense integration, Cloudflare deployment
- **Phase 4**: SNS sharing (Kakao, Twitter, Facebook)
- **Phase 5**: Full i18n — all text migrated to translations.js (personalities, careers, challenges, achievements, nav, footer, all pages)

### Known Issues Fixed
- `translations.js` syntax error: each language section (en~la) was missing 2 closing `}` (for `achievements:{}` and the language block itself). Fixed 2026-03-17.
- `lang-btn` was invisible (white text on white nav). Fixed in css/style.css.
- Language folder pages had wrong `<html lang="ko">`. Fixed for all 18 folders.
- `compare.html` in all language folders had outdated single-line footer. Fixed.
- `body { overflow-x: hidden }` breaks `position:fixed` dropdown — use only on `html`.

See `/home/hyuckjoolee/.claude/projects/-home-hyuckjoolee-marketMBTI/memory/` for phase completion details.

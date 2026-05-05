# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드로 작업할 때 참고할 지침을 제공합니다.

## 프로젝트 개요

**개발자 웹 이력서(Resume Portfolio)** — HTML5, CSS3, JavaScript(ES6+)로 만든 포트폴리오 및 이력서 웹사이트. 프로필 정보, 기술 스택, 경력, 프로젝트, 연락처 등을 보여주는 반응형 단일 페이지 애플리케이션입니다.

- **기술 스택**: HTML5, CSS3(Tailwind CSS + 커스텀), JavaScript ES6+(프레임워크 없음)
- **저장소**: 정적 파일 (백엔드/데이터베이스 없음)
- **타입**: 정적 단일 페이지 애플리케이션(SPA)
- **주요 기능**: 프로필 소개, 기술 스택 전시, 경력/프로젝트 표시, 다크 모드, 부드러운 스크롤, 접근성 지원
- **배포**: GitHub Pages, Netlify 등

## 애플리케이션 실행 방법

### 방법 1: 파일 직접 열기 (가장 간단)
```bash
# Windows: 파일 탐색기에서 index.html 더블클릭
# 또는 PowerShell에서
Start-Process .\index.html

# macOS/Linux: 터미널에서
open index.html
```

### 방법 2: Python HTTP 서버 (권장 - 개발 시)
```bash
# Python 3.x
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

### 방법 3: VS Code Live Server
1. "Live Server" 확장 프로그램 설치
2. `index.html` 우클릭 → "Open with Live Server" 선택

**참고**: 이 프로젝트는 빌드 프로세스, npm 스크립트, 자동화 테스트가 없습니다. 정적 HTML/CSS/JS로 직접 실행됩니다.

## 아키텍처 개요

포트폴리오는 **단순하고 모듈화된 구조**로 설계되었습니다.

### 프로젝트 구조
```
resume-portfolio/
├── index.html                  # 메인 HTML 페이지
├── css/
│   ├── style.css              # 기본 스타일 (Tailwind 보완)
│   └── responsive.css         # 반응형 미디어쿼리
├── js/
│   └── script.js              # 인터랙션 및 DOM 조작
├── assets/
│   ├── images/
│   │   └── profile.jpg        # 프로필 사진
│   └── pdf/
│       └── resume.pdf         # 이력서 PDF
├── CLAUDE.md                  # 이 파일
└── README.md                  # 프로젝트 설명
```

### `index.html` — 페이지 구조
의미있는 시맨틱 HTML로 다음 섹션 포함:
- **Header/Navigation**: 네비게이션 메뉴, 다크모드 토글
- **Hero Section**: 이름, 직위, 프로필 사진, 짧은 소개
- **About Section**: 전문 분야 설명, 경력 요약
- **Skills Section**: 기술 스택(언어, 프레임워크, 도구)
- **Experience Section**: 회사, 기간, 책임, 성과
- **Projects Section**: 프로젝트 카드(설명, 기술, 링크)
- **Education Section**: 학력
- **Contact Section**: 이메일 폼, 소셜 링크
- **Footer**: 저작권, 링크

### `css/style.css` — 스타일링
Tailwind CSS(CDN)를 보충하는 커스텀 스타일:
- **색상 변수**: CSS 변수로 primary, secondary, background, text 정의
- **타이포그래피**: heading과 body 폰트 설정
- **레이아웃**: 최대 너비 제한, 여백 일관성
- **애니메이션**: fade-in, slide-in, scale-up 효과
- **컴포넌트**: 버튼, 카드, 폼 필드 스타일
- **다크 모드**: `body.dark-mode` 클래스 기반 색상 오버라이드

### `css/responsive.css` — 반응형 디자인
```
- Mobile: 최대 640px (세로 레이아웃)
- Tablet: 641px ~ 1024px (2단 레이아웃)
- Desktop: 1025px+ (3단 이상 레이아웃)
```

### `js/script.js` — 인터랙션 로직
DOM 조작 및 사용자 상호작용 처리:

**초기화**:
- `init()` — DOMContentLoaded에서 호출, 모든 기능 초기화
- `cacheDOMElements()` — DOM 참조 캐싱 (성능)
- `setupEventListeners()` — 모든 이벤트 리스너 등록

**다크 모드**:
- `toggleDarkMode()` — `body.dark-mode` 클래스 토글
- `localStorage`에 저장/복원

**부드러운 스크롤**:
- 네비게이션 링크 클릭 → `element.scrollIntoView({ behavior: 'smooth' })`

**폼 처리**:
- Contact 폼 제출 → 유효성 검사 → 이메일 전송 또는 메시지 표시
- XSS 방지: `textContent` 사용, HTML 입력 금지

**접근성**:
- ARIA 라벨 (aria-label, aria-describedby)
- 키보드 네비게이션 (focus states)
- 색상 대비 확인

**주요 메서드**:
- `smoothScroll(target)` — 부드러운 스크롤
- `validateForm(form)` — 폼 입력 검증
- `submitContact(event)` — 연락처 폼 제출 처리
- `attachProjectLinks()` — 프로젝트 링크 바인딩
- `renderExperienceTimeline()` — 경력 타임라인 렌더링 (선택)

**데이터 흐름**:
```
사용자 입력 → 이벤트 핸들러 → DOM 업데이트 → 시각적 피드백
```

## 개발 시 주의사항

### XSS(Cross-Site Scripting) 방지
사용자 입력(Contact 폼 등)은 **반드시 `textContent`**로 처리:
```javascript
// ✅ 안전
element.textContent = userInput;

// ❌ 위험
element.innerHTML = userInput;  // 절대 금지
```

특수 문자 전송이 필요하면 `escapeHtml()` 사용:
```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### 반응형 이미지
프로필 사진 및 프로젝트 이미지는 반응형으로:
```html
<img src="image.jpg" alt="설명" class="w-full h-auto max-w-md">
```

### 다크 모드 구현
- 토글: `document.body.classList.toggle('dark-mode')`
- localStorage에 저장: `localStorage.setItem('darkMode', isDarkMode)`
- CSS에서: `body.dark-mode .클래스 { color: #light-color; }`

### 성능 최적화
- **이미지 최적화**: 프로필 사진 400x400px, 프로젝트 이미지 600x400px (WebP 권장)
- **CSS**: Tailwind 외 커스텀 스타일은 `style.css`에만 집중
- **JavaScript**: 불필요한 DOM 쿼리 피하기, 캐싱 활용
- **Lighthouse**: 점수 90 이상 목표

### SEO 최적화
```html
<title>개발자 이름 | 포트폴리오</title>
<meta name="description" content="짧은 소개...">
<meta property="og:title" content="개발자 이름 | 포트폴리오">
<meta property="og:image" content="thumbnail.jpg">
```

### 접근성(A11y) 표준
- `<main>`, `<nav>`, `<section>`, `<article>` 등 시맨틱 태그 사용
- 모든 버튼/링크에 `aria-label` 추가
- 포커스 스타일 명확하게 (`:focus-visible`)
- 색상만으로 정보 전달하지 않기 (아이콘/텍스트 함께)

## 일반적인 작업

### 개인 정보 변경
1. `index.html`의 Hero 섹션 수정 (이름, 직위, 프로필 사진)
2. About 섹션 수정 (소개 텍스트)
3. 이메일/연락처 링크 업데이트

### 기술 스택 추가/수정
`index.html`의 Skills 섹션 수정:
```html
<div class="skill-category">
    <h4>Languages</h4>
    <div class="skill-tags">
        <span>JavaScript</span>
        <span>Python</span>
    </div>
</div>
```

### 프로젝트 추가
`index.html`의 Projects 섹션에 카드 추가:
```html
<div class="project-card">
    <h3>프로젝트 이름</h3>
    <p>프로젝트 설명</p>
    <div class="project-tech">JavaScript, React</div>
    <div class="project-links">
        <a href="github">GitHub</a>
        <a href="demo">Demo</a>
    </div>
</div>
```

### 스타일 변경
- **색상**: `style.css`의 CSS 변수 수정
```css
:root {
    --primary-color: #3b82f6;  /* 파란색 */
    --secondary-color: #10b981; /* 초록색 */
}
```
- **폰트**: `style.css`의 `@import` 또는 `font-family` 수정
- **반응형**: `responsive.css`의 `@media` 쿼리 조정

### 다크 모드 추가 색상
```css
body.dark-mode {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
}
```

### 폼 검증 규칙 변경
`script.js`의 `validateForm()` 함수 수정:
```javascript
function validateForm(form) {
    const email = form.querySelector('[name="email"]');
    if (!email.value.includes('@')) {
        alert('유효한 이메일을 입력하세요');
        return false;
    }
    return true;
}
```

### 배포 준비 체크리스트
- [ ] `index.html` 모든 메타 데이터 확인
- [ ] 이미지 경로 확인 (상대 경로 사용)
- [ ] 외부 링크(GitHub, LinkedIn 등) 확인
- [ ] 모든 섹션이 모바일에서 올바르게 표시되는지 확인
- [ ] Lighthouse 점수 확인
- [ ] 브라우저 호환성 테스트 (Chrome, Firefox, Safari, Edge)
- [ ] PDF 이력서 링크 확인
- [ ] 폼 제출 처리 확인

## 향후 개선 사항

- [ ] 블로그/기술 글 섹션
- [ ] 애니메이션 개선 (스크롤 트리거)
- [ ] Contact 폼 → 실제 이메일 서비스 통합 (FormSubmit, Emailjs)
- [ ] 다국어 지원 (한영)
- [ ] PWA 지원 (service worker, manifest)
- [ ] 프로젝트 상세 페이지
- [ ] 기술 블로그 연동
- [ ] 조회수/통계 추적

## 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

> **참고**: ES6+ 기능 사용, LocalStorage 지원 필수

---

**마지막 업데이트**: 2026-05-04

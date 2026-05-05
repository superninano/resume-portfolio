# 개발자 웹 이력서 개발 로드맵

## 📋 프로젝트 개요
개발자 포트폴리오 및 이력서를 보여주는 반응형 웹사이트 개발

## 🛠️ 기술 스택
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Tools**: 없음 (순수 HTML/CSS/JS)
- **배포**: GitHub Pages / Netlify (선택)

---

## 📁 프로젝트 구조
```
resume-portfolio/
├── index.html           # 메인 페이지
├── css/
│   ├── style.css       # 기본 스타일
│   └── responsive.css  # 반응형 스타일
├── js/
│   └── script.js       # 인터랙션 로직
├── assets/
│   ├── images/        # 프로필 사진 등
│   └── pdf/           # 이력서 PDF
├── CLAUDE.md          # 개발 가이드
└── README.md          # 프로젝트 설명
```

---

## 🎯 개발 단계

### Phase 1: 기본 구조 (Week 1)
- [ ] HTML 기본 레이아웃 작성
  - [ ] Navigation 메뉴
  - [ ] Hero 섹션 (소개)
  - [ ] About 섹션
  - [ ] Skills 섹션
  - [ ] Experience 섹션
  - [ ] Projects 섹션
  - [ ] Contact 섹션
  - [ ] Footer
- [ ] 의미있는 시맨틱 HTML 사용

### Phase 2: 스타일링 (Week 2)
- [ ] 전체 레이아웃 CSS
  - [ ] 색상 스킴 정의
  - [ ] 타이포그래피 설정
  - [ ] 간격 및 정렬
- [ ] 각 섹션별 스타일
  - [ ] Hero 섹션 디자인
  - [ ] Cards/컴포넌트 스타일
  - [ ] 버튼 및 링크 스타일
- [ ] 반응형 디자인
  - [ ] Mobile (< 768px)
  - [ ] Tablet (768px - 1024px)
  - [ ] Desktop (> 1024px)

### Phase 3: 인터랙션 (Week 3)
- [ ] JavaScript 기능 구현
  - [ ] 부드러운 스크롤
  - [ ] 네비게이션 메뉴 토글
  - [ ] 스크롤 애니메이션
  - [ ] 다크모드 전환 (선택)
- [ ] 폼 검증
  - [ ] Contact 폼 입력 검증
  - [ ] 폼 제출 처리 (이메일 연동 또는 로컬)
- [ ] 성능 최적화
  - [ ] 이미지 최적화
  - [ ] CSS/JS 최소화

### Phase 4: 추가 기능 및 배포 (Week 4)
- [ ] SEO 최적화
  - [ ] Meta 태그 설정
  - [ ] 구조화된 데이터 (Schema.org)
- [ ] 접근성 개선
  - [ ] ARIA 라벨 추가
  - [ ] 키보드 네비게이션
  - [ ] 색상 대비 확인
- [ ] 배포
  - [ ] GitHub Pages 또는 Netlify 설정
  - [ ] 도메인 연결 (선택)
  - [ ] SSL 설정

---

## 📝 이력서 포함 내용

### 1. 개인정보 섹션
- 이름, 직위/포지션
- 프로필 사진
- 간단한 소개 (한두 문장)
- 연락처 (이메일, 전화, GitHub, LinkedIn)

### 2. 소개 섹션 (About)
- 전문 분야 설명
- 경력 요약
- 주요 강점/특징

### 3. 기술 스택 (Skills)
- 프로그래밍 언어
- 웹 기술
- 프레임워크/라이브러리
- 개발 도구

### 4. 경력 (Experience)
- 회사명, 직급, 기간
- 주요 책임 및 성과
- 사용 기술

### 5. 프로젝트 (Projects)
- 프로젝트 이름
- 프로젝트 설명
- 역할 및 기여도
- 사용 기술
- 링크 (GitHub, Demo)

### 6. 교육 (Education)
- 학교명, 학위, 졸업년도
- 전공/분야

### 7. 인증 및 상장
- 자격증, 수상 내역
- 취득일

### 8. 연락처 (Contact)
- 이메일 폼
- 소셜 미디어 링크

---

## 🎨 디자인 고려사항

### 색상 스킴
- Primary Color: (주요 브랜드 색상)
- Secondary Color: (보조 색상)
- Background: (배경색)
- Text: (텍스트색)

### 폰트
- Heading: Bold, 명확한 폰트
- Body: 읽기 좋은 폰트 (예: Inter, Roboto)
- Monospace: 코드 표시용 폰트

### 레이아웃
- 최대 너비: 1200px
- 여백(Padding): 일관된 간격
- 그리드 시스템: 반응형 그리드 활용

---

## ✅ 체크리스트

### 코드 품질
- [ ] W3C 유효성 검사 통과 (HTML/CSS)
- [ ] 자동 포매팅 적용 (Prettier 또는 유사)
- [ ] 주석 추가 (복잡한 부분)

### 성능
- [ ] Lighthouse 점수 90 이상
- [ ] 페이지 로드 시간 3초 이내
- [ ] 이미지 크기 최적화 완료

### 테스트
- [ ] 모든 기기에서 반응형 테스트
- [ ] 브라우저 호환성 테스트 (Chrome, Firefox, Safari, Edge)
- [ ] 링크 및 폼 동작 확인

### 배포 전
- [ ] 모든 폴더명/파일명 확인
- [ ] 상대 경로 확인
- [ ] 이미지 및 리소스 경로 확인
- [ ] 오타 및 문법 검토

---

## 🚀 시작 가이드

```bash
# 프로젝트 디렉토리 생성
mkdir resume-portfolio
cd resume-portfolio

# 기본 파일 구조 생성
mkdir css js assets/images assets/pdf

# 파일 생성
touch index.html css/style.css css/responsive.css js/script.js README.md CLAUDE.md
```

---

## 📚 참고 자료
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

---

## 💡 추가 기능 (선택)
- 다크모드 전환
- 다국어 지원 (한영)
- 블로그/기술 글 섹션
- 애니메이션 효과
- 이력서 PDF 다운로드

---

**시작일**: 2026-05-04
**목표 완료일**: 2026-05-25

/* ===== Portfolio App Class ===== */
class PortfolioApp {
  constructor() {
    this.scrollTimeout;
    this.init();
  }

  init() {
    this.cacheElements();
    this.setupEventListeners();
    this.loadDarkMode();
    this.initScrollSpy();
    this.initRevealAnimation();
    this.initTypingEffect();
    this.updateNavbarStyle();
  }

  /* ===== DOM 캐싱 ===== */
  cacheElements() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.navLinks = document.querySelectorAll('.nav-links a, #mobileMenu a');
    this.sections = document.querySelectorAll('section[id]');
    this.darkModeToggle = document.getElementById('darkModeToggle');
    this.scrollToTopBtn = document.getElementById('scrollToTop');
    this.contactForm = document.getElementById('contactForm');
    this.formResult = document.getElementById('formResult');
    this.revealElements = document.querySelectorAll('.reveal');
  }

  /* ===== 이벤트 리스너 등록 ===== */
  setupEventListeners() {
    // 스크롤 이벤트 (throttle)
    window.addEventListener('scroll', () => this.handleScroll());

    // 햄버거 메뉴 토글
    this.hamburger.addEventListener('click', () => this.toggleMobileMenu());

    // 모바일 메뉴 링크 클릭
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        this.smoothScrollTo(targetId);
        if (this.mobileMenu.classList.contains('open')) {
          this.closeMobileMenu();
        }
      });
    });

    // 다크모드 토글
    this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());

    // 스크롤 탑 버튼
    this.scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact 폼 제출
    this.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));

    // 모바일 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (!this.mobileMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
        if (this.mobileMenu.classList.contains('open')) {
          this.closeMobileMenu();
        }
      }
    });

    // 페이지 외부 앵커 클릭 처리 (선택)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (document.querySelector(href)) {
          e.preventDefault();
          this.smoothScrollTo(href);
        }
      });
    });
  }

  /* ===== 네비게이션 관련 함수 ===== */
  handleScroll() {
    this.updateNavbarStyle();
    this.updateScrollSpy();
    this.toggleScrollTopBtn();
  }

  updateNavbarStyle() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle('open');
    this.hamburger.classList.toggle('active');
    this.hamburger.setAttribute('aria-expanded', this.mobileMenu.classList.contains('open'));
    document.body.style.overflow = this.mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
  }

  closeMobileMenu() {
    this.mobileMenu.classList.remove('open');
    this.hamburger.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
  }

  /* ===== Scroll Spy (활성 섹션 감지) ===== */
  initScrollSpy() {
    this.updateScrollSpy();
  }

  updateScrollSpy() {
    let current = '';

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  /* ===== 부드러운 스크롤 ===== */
  smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const navbarHeight = this.navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  }

  /* ===== 스크롤 투 탑 버튼 ===== */
  toggleScrollTopBtn() {
    if (window.scrollY > 300) {
      this.scrollToTopBtn.classList.add('show');
    } else {
      this.scrollToTopBtn.classList.remove('show');
    }
  }

  /* ===== 다크모드 (버킷리스트 패턴) ===== */
  toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    this.updateDarkModeButton();
  }

  updateDarkModeButton() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  }

  loadDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
    this.updateDarkModeButton();
  }

  /* ===== Reveal 애니메이션 (IntersectionObserver) ===== */
  initRevealAnimation() {
    // 접근성: 동작 감소 선호 확인
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.revealElements.forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.revealElements.forEach(el => {
      observer.observe(el);
    });
  }

  /* ===== Contact 폼 처리 ===== */
  handleContactSubmit(e) {
    e.preventDefault();

    if (!this.validateContactForm()) {
      return;
    }

    const formData = new FormData(this.contactForm);
    const name = this.escapeHtml(formData.get('name'));
    const email = this.escapeHtml(formData.get('email'));
    const message = this.escapeHtml(formData.get('message'));

    // mailto 링크 생성 (백엔드 없이 이메일 클라이언트 열기)
    const mailtoLink = `mailto:superninano@gmail.com?subject=포트폴리오 연락: ${name}&body=${message}%0A%0AFrom: ${email}`;
    window.location.href = mailtoLink;

    this.showFormMessage('메시지 전송 준비가 완료되었습니다. 이메일 클라이언트를 확인해주세요.', 'success');
    this.contactForm.reset();
  }

  validateContactForm() {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    let isValid = true;

    // 이름 검증
    const nameGroup = nameInput.closest('.form-group');
    const nameError = nameGroup.querySelector('.error-msg');
    if (nameInput.value.trim().length < 1) {
      nameGroup.classList.add('error');
      nameError.textContent = '이름을 입력해주세요';
      isValid = false;
    } else {
      nameGroup.classList.remove('error');
      nameError.textContent = '';
    }

    // 이메일 검증
    const emailGroup = emailInput.closest('.form-group');
    const emailError = emailGroup.querySelector('.error-msg');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailGroup.classList.add('error');
      emailError.textContent = '유효한 이메일을 입력해주세요';
      isValid = false;
    } else {
      emailGroup.classList.remove('error');
      emailError.textContent = '';
    }

    // 메시지 검증
    const messageGroup = messageInput.closest('.form-group');
    const messageError = messageGroup.querySelector('.error-msg');
    if (messageInput.value.trim().length < 10) {
      messageGroup.classList.add('error');
      messageError.textContent = '메시지는 10자 이상 입력해주세요';
      isValid = false;
    } else {
      messageGroup.classList.remove('error');
      messageError.textContent = '';
    }

    return isValid;
  }

  showFormMessage(message, type) {
    this.formResult.textContent = message;
    this.formResult.className = type;

    setTimeout(() => {
      this.formResult.textContent = '';
      this.formResult.className = '';
    }, 3000);
  }

  /* ===== Typing Effect (선택) ===== */
  initTypingEffect() {
    // 접근성: 동작 감소 선호 확인
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const titleElement = document.querySelector('.hero-title');
    const titles = ['시니어 게임 기획자', 'Senior Game Designer', '콘텐츠 기획 전문가'];
    let titleIndex = 0;
    let charIndex = 0;

    const typeTitle = () => {
      if (charIndex < titles[titleIndex].length) {
        titleElement.textContent += titles[titleIndex][charIndex];
        charIndex++;
        setTimeout(typeTitle, 80);
      } else {
        setTimeout(eraseTitle, 2000);
      }
    };

    const eraseTitle = () => {
      if (charIndex > 0) {
        titleElement.textContent = titles[titleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseTitle, 50);
      } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeTitle, 500);
      }
    };

    // 초기 텍스트 설정 및 시작
    titleElement.textContent = '';
    typeTitle();
  }

  /* ===== XSS 방지 (버킷리스트에서 복사) ===== */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

/* ===== 앱 초기화 ===== */
let portfolio;
document.addEventListener('DOMContentLoaded', () => {
  portfolio = new PortfolioApp();
});

document.addEventListener("DOMContentLoaded", function () {

  // ✅ navbar를 DOMContentLoaded 안으로 이동 (기존엔 밖에 있어서 ReferenceError 발생)
  const navbar = document.querySelector(".navbar");
  const logo = document.querySelector(".logo");
  const floatingBtn = document.querySelector(".contact-button");
  const popup = document.querySelector(".contact-popup");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.querySelector(".contact-form");

  // ─── fade-in 스크롤 감지 ───────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  // ─── 스크롤 이벤트 ─────────────────────────────────────
  // ✅ 중복된 scroll 리스너 3개를 하나로 합침
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // 네비바 스타일 변경
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // 플로팅 로고 표시
    if (logo) {
      if (scrollY > 200) {
        logo.classList.add("show");
      } else {
        logo.classList.remove("show");
      }
    }

    // 문의 버튼 표시
    if (floatingBtn) {
      if (scrollY > 300) {
        floatingBtn.classList.add("show");
      } else {
        floatingBtn.classList.remove("show");
      }
    }
  });

  // ─── 문의 팝업 제어 ────────────────────────────────────
  // ✅ null 체크 추가 (about.html엔 팝업이 없어서 오류 방지)
  if (floatingBtn && popup) {
    floatingBtn.addEventListener("click", () => {
      popup.style.display = "flex";
    });
  }

  if (closeBtn && popup) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }

  // ─── 문의 폼 제출 ──────────────────────────────────────
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = {
        name: form.querySelector('input[type="text"]').value,
        tel: form.querySelector('input[type="tel"]').value,
        email: form.querySelector('input[type="email"]').value,
        type: form.querySelector('select').value,
        message: form.querySelector('textarea').value
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);
      form.reset();
    });
  }

});

// ─── 사업 분야 인터랙티브 리스트 ───────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  const businessItems = document.querySelectorAll(".business-item");
  const businessPanels = document.querySelectorAll(".business-panel");

  businessItems.forEach(item => {
    item.addEventListener("click", () => {
      const index = item.dataset.index;

      businessItems.forEach(i => i.classList.remove("active"));
      businessPanels.forEach(p => p.classList.remove("active"));

      item.classList.add("active");
      businessPanels[index].classList.add("active");
    });
  });
});

// ─── 시공사례 필터 ────────────────────────────────────────
const filterGroups = document.querySelectorAll('.filter-btns');
const caseCards = document.querySelectorAll('.case-card');

if (filterGroups.length > 0) {
  let activeFilters = { type: 'all', region: 'all', area: 'all' };

  filterGroups.forEach(group => {
    const filterKey = group.dataset.filter;
    const btns = group.querySelectorAll('.filter-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilters[filterKey] = btn.dataset.value;

        caseCards.forEach(card => {
          const typeMatch = activeFilters.type === 'all' || card.dataset.type === activeFilters.type;
          const regionMatch = activeFilters.region === 'all' || card.dataset.region === activeFilters.region;
          const areaMatch = activeFilters.area === 'all' || card.dataset.area === activeFilters.area;

          if (typeMatch && regionMatch && areaMatch) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  });
}

// ─── 공지사항 아코디언 ─────────────────────────────────────
const noticeItems = document.querySelectorAll('.notice-item');

if (noticeItems.length > 0) {
  noticeItems.forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      noticeItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─── 숫자 카운팅 애니메이션 ────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(count);
        }, 16);

        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));
}

// ─── FAQ 아코디언 ──────────────────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
  faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
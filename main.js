(function () {
  'use strict';

  // ── Header scroll effect ──
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu ──
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  function setMenuIcons(open) {
    iconOpen.style.display = open ? 'none' : 'block';
    iconClose.style.display = open ? 'block' : 'none';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    setMenuIcons(false);
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      mobileMenu.classList.add('open');
      setMenuIcons(true);
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  // ── Smooth scroll with header offset ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // ── Active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  const highlightNav = () => {
    let current = 'hero';
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ── Subtle tilt on skill cards (desktop only) ──
  if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
    document.querySelectorAll('.skill-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(400px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
})();

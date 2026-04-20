// NAV SCROLL
  const navbar = document.getElementById('navbar');
  const scrollArrow = document.querySelector('.scroll-arrow');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    if (scrollArrow) scrollArrow.style.opacity = window.scrollY > 100 ? '0' : '';
  }, { passive: true });

  // PARALLAX
  const heroBg = document.querySelector('.hero-bg');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    if (heroBg) heroBg.style.transform = `translate(${x}px,${y}px)`;
  });

  // HAMBURGER
  const hamburger = document.getElementById('hamburger');
  const navDrawer = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    navDrawer.classList.toggle('open', open);
    navOverlay.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) navDrawer.querySelectorAll('a').forEach((a,i) => a.style.transitionDelay = `${i*60}ms`);
  }
  hamburger.addEventListener('click', () => toggleMenu(!navDrawer.classList.contains('open')));
  navOverlay.addEventListener('click', () => toggleMenu(false));
  navDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // HERO WORDS
  document.querySelectorAll('.hero-title .word').forEach((w,i) => {
    w.style.animation = `fadeUp 0.5s ease ${0.4 + i * 0.1}s forwards`;
  });

  // REVEALS
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

  // COUNTERS
  function easeOutQuart(t) { return 1 - Math.pow(1-t,4); }
  function animateCounter(el) {
    const target = parseInt(el.dataset.target), suffix = el.dataset.suffix || '';
    const start = performance.now(), dur = 1600;
    function tick(now) {
      const p = Math.min((now-start)/dur,1);
      el.textContent = Math.floor(easeOutQuart(p)*target) + suffix;
      if (p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const sObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('[data-target]').forEach(animateCounter); sObs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  const statsEl = document.getElementById('stats');
  if (statsEl) sObs.observe(statsEl);

  // CHECKLIST
  const clObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.checklist-item').forEach((item,i) => setTimeout(() => item.classList.add('visible'), i*100));
        clObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  const cl = document.getElementById('checklist');
  if (cl) clObs.observe(cl);

  // MODAL
  const mo = document.getElementById('modalOverlay');
  const ob = document.getElementById('openModal');
  const cb = document.getElementById('modalClose');
  function openModal() { mo.classList.add('open'); document.body.style.overflow='hidden'; cb.focus(); }
  function closeModal() { mo.classList.remove('open'); document.body.style.overflow=''; ob.focus(); }
  ob?.addEventListener('click', openModal);
  cb?.addEventListener('click', closeModal);
  mo?.addEventListener('click', (e) => { if (e.target===mo) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key==='Escape' && mo.classList.contains('open')) closeModal(); });
  function handleSubmit() {
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const msg = document.getElementById('f-msg').value.trim();
    if (!name||!email||!msg) { alert('Please fill in all required fields.'); return; }
    closeModal();
    alert(`Thank you, ${name}! Your complaint has been submitted. We will respond within 5 business days.`);
  }
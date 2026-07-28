// ===== BARBERCO — UTILITY SCRIPTS =====
// Barbershop & Men's Grooming Salon
// Animations, password toggle, counters, countdown, forms

(function () {
    'use strict';

    // ---- Scroll Animation (AOS) ----
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.aos');
        if (!elements.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        elements.forEach(el => observer.observe(el));
    }

    // ---- Counter Animation ----
    function animateCounter(el) {
        const raw = el.dataset.target || el.textContent.replace(/[^0-9.]/g, '');
        const target = parseFloat(raw);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const isInt = Number.isInteger(target);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = prefix + (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
        }, duration / steps);
    }

    function initCounters() {
        document.querySelectorAll('[data-counter]').forEach(el => {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(el);
                        obs.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });
            obs.observe(el);
        });
    }

    // ---- Password Toggle ----
    function initPasswordToggle() {
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function () {
                const wrapper = this.closest('.input-wrapper');
                const input = wrapper ? wrapper.querySelector('input') : null;
                if (!input) return;
                const isText = input.type === 'text';
                input.type = isText ? 'password' : 'text';
                const icon = this.querySelector('i');
                if (icon) icon.className = isText ? 'fas fa-eye' : 'fas fa-eye-slash';
            });
        });
    }

    // ---- Tabs ----
    function initTabs() {
        document.querySelectorAll('.tab-bar').forEach(tabBar => {
            const btns = tabBar.querySelectorAll('.tab-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const target = btn.dataset.tab;
                    const scope = tabBar.closest('[data-tabs]') || document;
                    scope.querySelectorAll('[data-tab-content]').forEach(panel => {
                        panel.classList.toggle('hidden', panel.dataset.tabContent !== target);
                    });
                });
            });
        });
    }

    // ---- Countdown Timer (for coming-soon) ----
    function initCountdown() {
        const countdown = document.getElementById('countdown');
        if (!countdown) return;
        const target = new Date(countdown.dataset.target || '2026-12-01T00:00:00');
        function update() {
            const now = new Date();
            const diff = Math.max(0, target - now);
            const days    = Math.floor(diff / 86400000);
            const hours   = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000)  / 60000);
            const seconds = Math.floor((diff % 60000)    / 1000);
            const el = (id) => document.getElementById(id);
            if (el('cd-days'))    el('cd-days').textContent    = String(days).padStart(2,'0');
            if (el('cd-hours'))   el('cd-hours').textContent   = String(hours).padStart(2,'0');
            if (el('cd-minutes')) el('cd-minutes').textContent = String(minutes).padStart(2,'0');
            if (el('cd-seconds')) el('cd-seconds').textContent = String(seconds).padStart(2,'0');
        }
        update();
        setInterval(update, 1000);
    }

    // ---- Active Nav Link ----
    function setActiveNav() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === page || (page === '' && href === 'index.html')) {
                a.classList.add('active');
            }
        });
    }

    // ---- Sticky Nav shadow on scroll ----
    function initNavScroll() {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                nav.style.boxShadow = 'var(--shadow-md)';
            } else {
                nav.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ---- Hero Parallax ----
    function initParallax() {
        const heroImg = document.querySelector('.hero-parallax-img');
        if (!heroImg) return;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            heroImg.style.transform = `translateY(${y * 0.3}px)`;
        }, { passive: true });
    }

    // ---- Gallery Lightbox ----
    function initGalleryLightbox() {
        const items = document.querySelectorAll('.gallery-item');
        if (!items.length) return;

        // Create lightbox DOM
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.style.cssText = `position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);
            display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;
            transition:opacity 0.3s ease;`;
        lb.innerHTML = `
            <button id="lb-close" style="position:absolute;top:20px;right:24px;background:rgba(255,255,255,0.1);
                border:none;color:#fff;width:44px;height:44px;border-radius:8px;font-size:1.2rem;cursor:pointer;" 
                aria-label="Close lightbox">&#x2715;</button>
            <button id="lb-prev" style="position:absolute;left:20px;background:rgba(255,255,255,0.1);
                border:none;color:#fff;width:44px;height:44px;border-radius:8px;font-size:1.2rem;cursor:pointer;"
                aria-label="Previous">&#8592;</button>
            <img id="lb-img" src="" alt="" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;"/>
            <button id="lb-next" style="position:absolute;right:20px;background:rgba(255,255,255,0.1);
                border:none;color:#fff;width:44px;height:44px;border-radius:8px;font-size:1.2rem;cursor:pointer;"
                aria-label="Next">&#8594;</button>`;
        document.body.appendChild(lb);

        let currentIdx = 0;
        const images = Array.from(items).map(item => {
            const img = item.querySelector('img');
            return { src: img ? img.src : '', alt: img ? img.alt : '' };
        });

        function open(idx) {
            currentIdx = idx;
            const lbImg = document.getElementById('lb-img');
            lbImg.src = images[idx].src;
            lbImg.alt = images[idx].alt;
            lb.style.opacity = '1';
            lb.style.pointerEvents = 'all';
            document.body.style.overflow = 'hidden';
        }
        function close() {
            lb.style.opacity = '0';
            lb.style.pointerEvents = 'none';
            document.body.style.overflow = '';
        }
        function prev() { open((currentIdx - 1 + images.length) % images.length); }
        function next() { open((currentIdx + 1) % images.length); }

        items.forEach((item, i) => item.addEventListener('click', () => open(i)));
        document.getElementById('lb-close').addEventListener('click', close);
        document.getElementById('lb-prev').addEventListener('click', prev);
        document.getElementById('lb-next').addEventListener('click', next);
        lb.addEventListener('click', e => { if (e.target === lb) close(); });
        document.addEventListener('keydown', e => {
            if (lb.style.pointerEvents === 'none') return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        });
    }

    // ---- Booking Form ----
    function initBookingForm() {
        const form = document.getElementById('booking-form');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            const origText = btn.textContent;
            btn.textContent = 'Booking...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ Booked! We\'ll confirm shortly.';
                btn.style.background = '#2E7D32';
                form.reset();
                setTimeout(() => {
                    btn.textContent = origText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3500);
            }, 1200);
        });
    }

    // ---- Contact Form ----
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ Message Sent!';
                btn.style.background = '#2E7D32';
                form.reset();
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // ---- Auth Forms ----
    function initAuthForms() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', e => {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', e => {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    }

    // ---- Auth Page Theme/RTL (standalone pages) ----
    function initAuthPageControls() {
        if (window.barberCoNavbarLoaded) {
            return;
        }
        function applySettings() {
            const html = document.documentElement;
            const saved = localStorage.getItem('bc-dark');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (saved === '1' || (saved === null && prefersDark)) {
                html.classList.add('dark');
            }
            if (localStorage.getItem('bc-rtl') === '1') {
                html.setAttribute('dir', 'rtl');
            }
        }
        applySettings();

        document.querySelectorAll('.dark-toggle').forEach(btn => {
            updateDarkIcon(btn);
            btn.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('bc-dark', isDark ? '1' : '0');
                document.querySelectorAll('.dark-toggle').forEach(b => updateDarkIcon(b));
            });
        });

        document.querySelectorAll('.rtl-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const html = document.documentElement;
                const isRTL = html.getAttribute('dir') === 'rtl';
                html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
                localStorage.setItem('bc-rtl', isRTL ? '0' : '1');
            });
        });
    }

    function updateDarkIcon(btn) {
        const isDark = document.documentElement.classList.contains('dark');
        const icon = btn.querySelector('i');
        if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ---- Init all on DOMContentLoaded ----
    document.addEventListener('DOMContentLoaded', function () {
        initScrollAnimations();
        initCounters();
        initPasswordToggle();
        initTabs();
        initCountdown();
        setActiveNav();
        initNavScroll();
        initParallax();
        initGalleryLightbox();
        initBookingForm();
        initContactForm();
        initAuthForms();
        initAuthPageControls();
    });

})();

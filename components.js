// ===== BARBERCO — SHARED COMPONENTS =====
// Barbershop & Men's Grooming Salon
// Shared navbar + footer injected across all pages

(function () {
    'use strict';

    // --- Configuration ---
    const BRAND_NAME = 'BarberCo';
    const CURRENT_YEAR = new Date().getFullYear();
    const PHONE = '+1 (555) 247-8300';
    const EMAIL = 'hello@barberco.com';
    const ADDRESS = '24 Main Street, Downtown District';
    const HOURS = 'Mon–Sat: 9am – 8pm  |  Sun: 10am – 6pm';

    const NAV_LINKS = [
        { label: 'Home',     href: 'index.html' },
        { label: 'Home 2',   href: 'home2.html' },
        { label: 'About',    href: 'about.html' },
        { label: 'Services', href: 'services.html' },
        { label: 'Gallery',  href: 'gallery.html' },
        { label: 'Pricing',  href: 'pricing.html' },
        { label: 'Contact',  href: 'contact.html' }
    ];

    const SOCIAL_LINKS = [
        { icon: 'fab fa-instagram',  href: '#', label: 'Instagram' },
        { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
        { icon: 'fab fa-tiktok',     href: '#', label: 'TikTok' },
        { icon: 'fab fa-youtube',    href: '#', label: 'YouTube' }
    ];

    // --- Brand Logo SVG (scissors + comb icon) ---
    const LOGO_SVG = `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="nav-logo-icon">
        <rect width="100" height="100" rx="14" fill="var(--primary)" opacity="0.12"/>
        <rect width="100" height="100" rx="14" fill="none" stroke="var(--primary)" stroke-width="2" opacity="0.5"/>
        <!-- Scissors blades -->
        <circle cx="30" cy="32" r="8" fill="none" stroke="var(--primary)" stroke-width="3.5"/>
        <circle cx="30" cy="68" r="8" fill="none" stroke="var(--primary)" stroke-width="3.5"/>
        <!-- Scissors arms crossing -->
        <line x1="36" y1="37" x2="72" y2="72" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>
        <line x1="36" y1="63" x2="72" y2="28" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>
        <!-- Screw/pivot dot -->
        <circle cx="54" cy="50" r="3.5" fill="var(--primary)"/>
    </svg>`;

    // --- Get current page ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // -------------------------------------------------------
    // Render Navbar
    // -------------------------------------------------------
    function renderNavbar() {
        const desktopLinks = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage || (currentPage === '' && link.href === 'index.html');
            return `<li><a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a></li>`;
        }).join('');

        const mobileLinks = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage || (currentPage === '' && link.href === 'index.html');
            return `<a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
        }).join('');

        return `
        <nav id="main-nav">
            <div class="container">
                <div class="nav-inner">
                    <!-- Logo -->
                    <a href="index.html" class="nav-logo" id="nav-logo" aria-label="BarberCo Home">
                        ${LOGO_SVG}
                        <div>
                            <div class="nav-logo-text">Barber<span>Co</span></div>
                        </div>
                    </a>

                    <!-- Desktop Links -->
                    <ul class="nav-links hide-mobile" id="nav-links-desktop">
                        ${desktopLinks}
                    </ul>

                    <!-- Actions -->
                    <div class="nav-actions">
                        <button class="icon-btn dark-toggle hide-mobile" id="nav-dark-toggle" title="Toggle Dark Mode" aria-label="Toggle dark mode">
                            <i class="fas fa-moon" aria-hidden="true"></i>
                        </button>
                        <button class="icon-btn rtl-toggle hide-mobile" id="nav-rtl-toggle" title="Toggle RTL" aria-label="Toggle RTL">
                            <i class="fas fa-exchange-alt" aria-hidden="true"></i>
                        </button>
                        <a href="login.html" class="btn btn-primary btn-sm hide-mobile" id="nav-cta-primary">Login</a>
                        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
                ${mobileLinks}
                <div class="nav-mobile-actions">
                    <button class="icon-btn dark-toggle" id="nav-mobile-dark-toggle" title="Toggle Dark Mode" aria-label="Toggle dark mode">
                        <i class="fas fa-moon" aria-hidden="true"></i>
                    </button>
                    <button class="icon-btn rtl-toggle" id="nav-mobile-rtl-toggle" title="Toggle RTL" aria-label="Toggle RTL">
                        <i class="fas fa-exchange-alt" aria-hidden="true"></i>
                    </button>
                    <a href="login.html" class="btn btn-primary btn-sm" id="nav-mobile-login">Login</a>
                </div>
            </div>
        </nav>`;
    }

    // -------------------------------------------------------
    // Render Footer
    // -------------------------------------------------------
    function renderFooter() {
        const socialHTML = SOCIAL_LINKS.map(s =>
            `<a href="${s.href}" aria-label="${s.label}" title="${s.label}"><i class="${s.icon}" aria-hidden="true"></i></a>`
        ).join('');

        return `
        <footer id="main-footer">
            <div class="container">
                <div class="footer-grid">
                    <!-- Column 1: Brand -->
                    <div class="footer-brand">
                        <a href="index.html" class="footer-logo" aria-label="BarberCo Home">
                            ${LOGO_SVG.replace('class="nav-logo-icon"', 'style="width:36px;height:36px;"')}
                            <div class="footer-logo-text">Barber<span>Co</span></div>
                        </a>
                        <p class="footer-desc">Premium cuts, classic shaves &amp; expert grooming — crafted for the modern man. Walk in or book your spot today.</p>
                        <div class="footer-social">${socialHTML}</div>
                    </div>

                    <!-- Column 2: Quick Links -->
                    <div class="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="home2.html">Home 2 — Premium</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="gallery.html">Gallery</a></li>
                            <li><a href="pricing.html">Pricing</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Resources -->
                    <div class="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="contact.html">Contact Barber</a></li>
                            <li><a href="coming-soon.html">Coming Soon</a></li>
                            <li><a href="coming-soon.html">News &amp; Updates</a></li>
                            <li><a href="pricing.html">Pricing Plans</a></li>
                            <li><a href="404.html">404 Page</a></li>
                            <li><a href="login.html">Sign In</a></li>
                        </ul>
                    </div>

                    <!-- Column 4: Stay Updated (Newsletter Card) -->
                    <div class="footer-newsletter-card">
                        <h3>Stay Updated</h3>
                        <p>Subscribe for style updates, grooming tips &amp; exclusive promotion announcements.</p>
                        <form onsubmit="event.preventDefault(); alert('Subscribed successfully!'); this.reset();" class="newsletter-form">
                            <input type="email" placeholder="your@email.com" class="newsletter-input" required>
                            <button type="submit" class="newsletter-submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p class="footer-copy">&copy; ${CURRENT_YEAR} BarberCo. All rights reserved. Crafted with precision.</p>
                    <div class="footer-bottom-links">
                        <a href="404.html">PRIVACY</a>
                        <a href="coming-soon.html">TERMS</a>
                        <a href="tel:+15552478300">${PHONE}</a>
                    </div>
                </div>
            </div>
        </footer>`;
    }

    // -------------------------------------------------------
    // Inject Components
    // -------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        // Inject navbar
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) {
            navPlaceholder.outerHTML = renderNavbar();
            window.barberCoNavbarLoaded = true;
        }

        // Inject footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = renderFooter();
        }

        // Hamburger toggle
        const hamburger = document.getElementById('nav-hamburger');
        const mobileMenu = document.getElementById('nav-mobile');
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', function () {
                const isOpen = mobileMenu.classList.toggle('open');
                hamburger.classList.toggle('open', isOpen);
                hamburger.setAttribute('aria-expanded', String(isOpen));
            });
            // Close on outside click
            document.addEventListener('click', function (e) {
                if (!e.target.closest('#main-nav')) {
                    mobileMenu.classList.remove('open');
                    hamburger.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Apply saved theme
        applySavedSettings();

        // Dark mode toggles (nav + auth)
        document.querySelectorAll('.dark-toggle').forEach(btn => {
            updateDarkIcon(btn);
            btn.addEventListener('click', function () {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('bc-dark', isDark ? '1' : '0');
                document.querySelectorAll('.dark-toggle').forEach(b => updateDarkIcon(b));
            });
        });

        // RTL toggles
        document.querySelectorAll('.rtl-toggle').forEach(btn => {
            btn.addEventListener('click', function () {
                const html = document.documentElement;
                const isRTL = html.getAttribute('dir') === 'rtl';
                html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
                localStorage.setItem('bc-rtl', isRTL ? '0' : '1');
            });
        });
    });

    function applySavedSettings() {
        const html = document.documentElement;
        // Dark mode
        const savedDark = localStorage.getItem('bc-dark');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedDark === '1' || (savedDark === null && prefersDark)) {
            html.classList.add('dark');
        }
        // RTL
        if (localStorage.getItem('bc-rtl') === '1') {
            html.setAttribute('dir', 'rtl');
        }
    }

    function updateDarkIcon(btn) {
        const isDark = document.documentElement.classList.contains('dark');
        const icon = btn.querySelector('i');
        if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

})();

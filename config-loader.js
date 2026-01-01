/**
 * CONFIG-LOADER.JS
 * Loads configuration from config.json and applies to the page
 * Runs before main script.js to ensure page is configured before initialization
 */

(function() {
    'use strict';

    // Default configuration (fallback if config.json is missing)
    const DEFAULT_CONFIG = {
        company: {
            name: 'VARABIT',
            tagline: 'Crafted with intention'
        },
        logo: {
            type: 'svg',
            image: '',
            alt: 'VARABIT Logo'
        },
        page: {
            title: 'Something Remarkable is Coming',
            description: "We're building something remarkable. Stay tuned for VARABIT's launch.",
            metaTitle: 'Something Remarkable is Coming | VARABIT',
            metaDescription: "We're building something remarkable. Stay tuned for VARABIT's launch."
        },
        hero: {
            eyebrow: 'Launching 2025',
            title: ['Some', 'thing', 'Remarkable'],
            accentWord: 1,
            description: "We're engineering a new experience that will redefine expectations. The wait won't be long—and we promise it'll be worth it."
        },
        branding: {
            accentColor: '#0DFFD7',
            accentHover: '#00E5C0',
            accentGlow: 'rgba(13, 255, 215, 0.25)',
            accentDim: 'rgba(13, 255, 215, 0.12)'
        },
        countdown: {
            label: 'Launching In',
            launchDate: null,
            initialDays: 15
        },
        subscribe: {
            title: 'Be the first to know',
            description: "Drop your email and we'll notify you the moment we launch.",
            buttonText: 'Notify Me',
            placeholder: 'your@email.com'
        },
        social: {
            twitter: '#',
            github: '#',
            linkedin: '#'
        }
    };

    // Helper: Get nested property from object by string path
    function getByPath(obj, path) {
        return path.split('.').reduce((o, p) => o && o[p], obj);
    }

    // Helper: Set nested property by string path
    function setByPath(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((o, k) => o && o[k], obj);
        if (target) target[lastKey] = value;
    }

    // Apply configuration to the page
    function applyConfig(config) {
        // 1. Update page title and meta description
        const pageTitle = document.querySelector('title');
        const metaDescription = document.querySelector('meta[name="description"]');
        if (pageTitle && config.page.metaTitle) pageTitle.textContent = config.page.metaTitle;
        if (metaDescription && config.page.metaDescription) metaDescription.setAttribute('content', config.page.metaDescription);

        // 2. Update CSS variables for branding colors
        const root = document.documentElement;
        if (config.branding) {
            if (config.branding.accentColor) root.style.setProperty('--accent', config.branding.accentColor);
            if (config.branding.accentHover) root.style.setProperty('--accent-hover', config.branding.accentHover);
            if (config.branding.accentGlow) root.style.setProperty('--accent-glow', config.branding.accentGlow);
            if (config.branding.accentDim) root.style.setProperty('--accent-dim', config.branding.accentDim);
        }

        // 3. Update logo
        const logoText = document.querySelector('.logo-text');
        const logoMark = document.querySelector('.logo-mark');
        const heroShapeCenter = document.querySelector('.hero-shape-center');

        if (config.company.name) {
            if (logoText) logoText.textContent = config.company.name;
        }

        // Handle custom logo image
        if (config.logo.type === 'image' && config.logo.image) {
            const logoImg = new Image();
            logoImg.src = config.logo.image;
            logoImg.alt = config.logo.alt || config.company.name;

            if (logoMark) {
                logoMark.innerHTML = '';
                logoMark.appendChild(logoImg);
                logoMark.style.border = 'none';
            }
            if (heroShapeCenter) {
                heroShapeCenter.innerHTML = '';
                const heroLogo = new Image();
                heroLogo.src = config.logo.image;
                heroLogo.alt = config.logo.alt || config.company.name;
                heroLogo.style.width = '40px';
                heroLogo.style.height = '40px';
                heroLogo.style.objectFit = 'contain';
                heroShapeCenter.appendChild(heroLogo);
            }
        }

        // 4. Update hero section
        const heroEyebrow = document.querySelector('.hero-eyebrow span:last-child');
        if (heroEyebrow && config.hero.eyebrow) {
            heroEyebrow.textContent = config.hero.eyebrow;
        }

        const heroTitleLines = document.querySelectorAll('.hero-title-line');
        if (heroTitleLines.length && config.hero.title && config.hero.title.length > 0) {
            // Update title lines while preserving the span animation wrapper
            config.hero.title.forEach((word, i) => {
                if (heroTitleLines[i]) {
                    const span = heroTitleLines[i].querySelector('span');
                    if (span) {
                        // Check if this word should be accented
                        if (i === config.hero.accentWord) {
                            span.innerHTML = `<span class="text-accent">${word}</span>`;
                        } else {
                            span.textContent = word;
                        }
                    }
                }
            });
        }

        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription && config.hero.description) {
            heroDescription.textContent = config.hero.description;
        }

        // 5. Update countdown label
        const countdownLabel = document.querySelector('.countdown-label');
        if (countdownLabel && config.countdown.label) {
            countdownLabel.textContent = config.countdown.label;
        }

        // 6. Update subscribe section
        const subscribeTitle = document.querySelector('.subscribe-title');
        const subscribeSubtitle = document.querySelector('.subscribe-subtitle');
        const emailInput = document.querySelector('.email-input');
        const submitBtnText = document.querySelector('.submit-btn span');

        if (subscribeTitle && config.subscribe.title) subscribeTitle.textContent = config.subscribe.title;
        if (subscribeSubtitle && config.subscribe.description) subscribeSubtitle.textContent = config.subscribe.description;
        if (emailInput && config.subscribe.placeholder) emailInput.placeholder = config.subscribe.placeholder;
        if (submitBtnText && config.subscribe.buttonText) submitBtnText.textContent = config.subscribe.buttonText;

        // 7. Update social links
        const socialLinks = document.querySelectorAll('.social-link');
        const socialOrder = ['twitter', 'github', 'linkedin'];
        socialLinks.forEach((link, i) => {
            const platform = socialOrder[i];
            if (config.social[platform]) {
                link.href = config.social[platform];
            }
        });

        // 8. Update footer
        const footerYear = document.getElementById('current-year');
        const footerTagline = document.querySelector('.footer-tagline');
        const footerCopyright = document.querySelector('.footer-bottom span:first-child');

        if (footerCopyright && config.company.name) {
            footerCopyright.innerHTML = `&copy; <span id="current-year">${new Date().getFullYear()}</span> ${config.company.name}. All rights reserved.`;
        }
        if (footerTagline && config.company.tagline) {
            footerTagline.textContent = config.company.tagline;
        }

        // Store config globally for other scripts to use
        window.SITE_CONFIG = config;
    }

    // Load configuration from config.json
    async function loadConfig() {
        try {
            const response = await fetch('config.json');
            if (!response.ok) throw new Error('Config file not found');
            const config = await response.json();
            applyConfig(config);
            console.log('✓ Configuration loaded from config.json');
        } catch (error) {
            console.log('Using default configuration (config.json not found)');
            applyConfig(DEFAULT_CONFIG);
        }
    }

    // Initialize config loader when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadConfig);
    } else {
        loadConfig();
    }

})();

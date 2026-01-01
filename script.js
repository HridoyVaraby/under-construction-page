/**
 * Under Construction Page - JavaScript
 * ULTRATHINK Enhanced Version
 * Features: Loading animation, countdown timer with flip effect, enhanced form handling
 * No external dependencies - pure vanilla JS
 */

'use strict';

// ============================================
// MODULE: LOADING ANIMATION
// ============================================
const LoadingScreen = {
    init() {
        const loadingScreen = document.getElementById('loading-screen');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (loadingScreen) {
            const delay = prefersReducedMotion ? 100 : 1400;

            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingScreen.classList.add('loaded');
                }, delay);
            });
        }
    }
};

// ============================================
// MODULE: COUNTDOWN TIMER
// ============================================
const CountdownTimer = {
    targetDate: null,
    interval: null,
    previousValues: {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    },

    elements: {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    },

    init() {
        // Cache DOM elements
        this.elements.days = document.getElementById('days');
        this.elements.hours = document.getElementById('hours');
        this.elements.minutes = document.getElementById('minutes');
        this.elements.seconds = document.getElementById('seconds');

        // Exit if elements don't exist
        if (!this.elements.days) return;

        // Set target date from config or use default
        this.setTargetDate();

        // Start the timer
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    },

    setTargetDate() {
        // Check for launch date in config
        const config = window.SITE_CONFIG || {};
        const countdownConfig = config.countdown || {};

        if (countdownConfig.launchDate) {
            // Use specific launch date from config
            this.targetDate = new Date(countdownConfig.launchDate);

            // If date is in the past, extend by initialDays
            if (this.targetDate.getTime() < Date.now()) {
                const days = countdownConfig.initialDays || 15;
                this.targetDate = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
            }
        } else {
            // Fall back to initialDays from now
            const days = countdownConfig.initialDays || 15;
            this.targetDate = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
        }
    },

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        // Calculate time components
        const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

        // Update with flip animation effect
        this.updateElement('days', days);
        this.updateElement('hours', hours);
        this.updateElement('minutes', minutes);
        this.updateElement('seconds', seconds);

        // Reset countdown when it reaches zero (auto-extend by initialDays from config)
        if (distance < 0) {
            const config = window.SITE_CONFIG || {};
            const days = (config.countdown && config.countdown.initialDays) || 15;
            this.targetDate.setDate(this.targetDate.getDate() + days);
        }
    },

    updateElement(key, value) {
        const paddedValue = this.padZero(value);
        const element = this.elements[key];

        if (this.previousValues[key] !== paddedValue) {
            // Add subtle scale animation on change
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);

            this.previousValues[key] = paddedValue;
        }

        element.textContent = paddedValue;
    },

    padZero(num) {
        return num.toString().padStart(2, '0');
    }
};

// ============================================
// MODULE: EMAIL SUBSCRIBE FORM
// ============================================
const SubscribeForm = {
    elements: {
        form: null,
        input: null,
        button: null,
        message: null
    },

    originalButtonHTML: '',

    init() {
        // Cache DOM elements
        this.elements.form = document.getElementById('subscribe-form');
        this.elements.input = document.getElementById('email-input');
        this.elements.message = document.getElementById('form-message');

        if (!this.elements.form) return;

        this.elements.button = this.elements.form.querySelector('button[type="submit"]');
        this.originalButtonHTML = this.elements.button.innerHTML;

        // Bind submit handler
        this.elements.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Remove error state on input
        this.elements.input.addEventListener('input', () => {
            this.elements.input.classList.remove('error');
            this.hideMessage();
        });
    },

    handleSubmit(e) {
        e.preventDefault();

        const email = this.elements.input.value.trim();

        // Validate email
        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            this.shakeInput();
            return;
        }

        // Show loading state
        this.setButtonState('loading');

        // Simulate API call delay
        setTimeout(() => {
            this.showSuccess('You\'re on the list! We\'ll be in touch.');
            this.elements.input.value = '';
            this.setButtonState('success');

            // Reset form after delay
            setTimeout(() => {
                this.hideMessage();
                this.setButtonState('default');
            }, 4000);
        }, 600);
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    showMessage(text, type) {
        const icon = type === 'success' 
            ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>'
            : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>';
        
        this.elements.message.innerHTML = `${icon}<span>${text}</span>`;
        this.elements.message.className = `form-message ${type}`;
    },

    showError(text) {
        this.showMessage(text, 'error');
    },

    showSuccess(text) {
        this.showMessage(text, 'success');
    },

    hideMessage() {
        this.elements.message.className = 'form-message';
        this.elements.message.innerHTML = '';
    },

    shakeInput() {
        this.elements.input.classList.add('error');

        setTimeout(() => {
            this.elements.input.classList.remove('error');
        }, 400);

        this.elements.input.focus();
    },

    setButtonState(state) {
        const button = this.elements.button;

        switch (state) {
            case 'loading':
                button.disabled = true;
                button.innerHTML = `
                    <span>Sending...</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                `;
                break;
            case 'success':
                button.disabled = true;
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Subscribed!</span>
                `;
                break;
            default:
                button.disabled = false;
                button.innerHTML = this.originalButtonHTML;
        }
    }
};

// ============================================
// MODULE: FOOTER YEAR
// ============================================
const FooterYear = {
    init() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
};

// ============================================
// MODULE: CURSOR GLOW (Optional enhancement)
// ============================================
const CursorGlow = {
    init() {
        // Only enable on desktop with no reduced motion preference
        if (window.matchMedia('(max-width: 1024px)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;

        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

            const shape = heroVisual.querySelector('.hero-shape');
            if (shape) {
                shape.style.transform = `translate(${x}px, ${y}px)`;
                shape.style.transition = 'transform 0.3s ease-out';
            }
        });

        heroVisual.addEventListener('mouseleave', () => {
            const shape = heroVisual.querySelector('.hero-shape');
            if (shape) {
                shape.style.transform = 'translate(0, 0)';
            }
        });
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    LoadingScreen.init();
    CountdownTimer.init();
    SubscribeForm.init();
    FooterYear.init();
    CursorGlow.init();
});

// Add keyframe for loading spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

/**
 * Under Construction Page - JavaScript
 * Features: Loading animation, countdown timer, form handling
 * No external dependencies - pure vanilla JS
 */

'use strict';

// ============================================
// MODULE: LOADING ANIMATION
// ============================================
const LoadingScreen = {
    init() {
        const loadingScreen = document.getElementById('loading-screen');

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (loadingScreen) {
            const delay = prefersReducedMotion ? 100 : 800;

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
    // Set countdown to 15 days from now
    targetDate: new Date(Date.now() + (15 * 24 * 60 * 60 * 1000)),
    interval: null,

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

        // Start the timer
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    },

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update display with leading zeros
        this.elements.days.textContent = this.padZero(days);
        this.elements.hours.textContent = this.padZero(hours);
        this.elements.minutes.textContent = this.padZero(minutes);
        this.elements.seconds.textContent = this.padZero(seconds);

        // Reset countdown when it reaches zero (auto-extend by 15 days)
        if (distance < 0) {
            this.targetDate.setDate(this.targetDate.getDate() + 15);
        }
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

    originalButtonText: '',

    init() {
        // Cache DOM elements
        this.elements.form = document.getElementById('subscribe-form');
        this.elements.input = document.getElementById('email-input');
        this.elements.message = document.getElementById('form-message');

        if (!this.elements.form) return;

        this.elements.button = this.elements.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.elements.button.innerHTML;

        // Bind submit handler
        this.elements.form.addEventListener('submit', (e) => this.handleSubmit(e));
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

        // Simulate success (no backend)
        this.showSuccess('Thank you! We\'ll notify you when we launch.');
        this.elements.input.value = '';
        this.setButtonState('success');

        // Reset form after 3 seconds
        setTimeout(() => {
            this.hideMessage();
            this.setButtonState('default');
        }, 3000);
    },

    isValidEmail(email) {
        // Simple but effective email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    showMessage(text, type) {
        this.elements.message.textContent = text;
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
        this.elements.message.textContent = '';
    },

    shakeInput() {
        this.elements.input.classList.add('error');

        // Remove class after animation completes
        setTimeout(() => {
            this.elements.input.classList.remove('error');
        }, 500);

        // Refocus the input
        this.elements.input.focus();
    },

    setButtonState(state) {
        if (state === 'success') {
            this.elements.button.disabled = true;
            this.elements.button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Subscribed!</span>
            `;
        } else {
            this.elements.button.disabled = false;
            this.elements.button.innerHTML = this.originalButtonText;
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
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    LoadingScreen.init();
    CountdownTimer.init();
    SubscribeForm.init();
    FooterYear.init();
});

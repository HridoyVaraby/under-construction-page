/**
 * Under Construction Page - Main JavaScript
 * Features: Loading animation, particles.js, countdown timer, form handling
 */

// ============================================
// Loading Animation
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const loadingAnimation = document.getElementById('loading-animation');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingAnimation.style.opacity = '0';
            setTimeout(() => {
                loadingAnimation.style.display = 'none';
            }, 500);
        }, 800);
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// ============================================
// Particle.js Configuration
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#5e72eb', '#ff77eb', '#ffffff']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.2,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#5e72eb',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});

// ============================================
// Countdown Timer
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set countdown to 15 days from now
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 15);

    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update display with leading zeros
        elements.days.textContent = padZero(days);
        elements.hours.textContent = padZero(hours);
        elements.minutes.textContent = padZero(minutes);
        elements.seconds.textContent = padZero(seconds);

        // Reset countdown when it reaches zero
        if (distance < 0) {
            countDownDate.setDate(countDownDate.getDate() + 15);
        }
    }, 1000);

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }
});

// ============================================
// Email Subscribe Form
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email-input');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Validate email
        if (!email || !isValidEmail(email)) {
            shakeInput(emailInput);
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate success
        showMessage('Thank you! We\'ll notify you when we launch.', 'success');

        // Clear input
        emailInput.value = '';

        // Disable form temporarily
        const button = form.querySelector('button');
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-check"></i> <span>Subscribed!</span>';

        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = `<span class="relative z-10 flex items-center gap-2">
                <span>Notify Me</span>
                <i class="fas fa-paper-plane text-sm group-hover:translate-x-1 transition-transform"></i>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>`;
            formMessage.classList.add('hidden');
        }, 3000);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function shakeInput(input) {
        input.style.animation = 'none';
        input.offsetHeight; // Trigger reflow
        input.style.animation = 'shake 0.5s ease-in-out';
        input.focus();
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'text-center mt-4 text-sm animate-fade-in';

        if (type === 'error') {
            formMessage.classList.add('text-red-400');
        } else {
            formMessage.classList.add('text-primary');
        }

        formMessage.classList.remove('hidden');
    }
});

// ============================================
// Shake Animation Keyframes
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
        20%, 40%, 60%, 80% { transform: translateX(4px); }
    }

    /* Enhanced animations for countdown cards */
    .countdown-card {
        animation: slideUp 0.5s ease-out backwards;
    }

    .countdown-card:nth-child(1) { animation-delay: 0.1s; }
    .countdown-card:nth-child(2) { animation-delay: 0.2s; }
    .countdown-card:nth-child(3) { animation-delay: 0.3s; }
    .countdown-card:nth-child(4) { animation-delay: 0.4s; }

    /* Gradient animation for highlight text */
    .gradient-text::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, hsl(250, 70%, 60%) 0%, hsl(330, 80%, 70%) 100%);
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.5s ease-out;
        animation: underlineAnimation 2s ease-in-out infinite alternate;
    }

    @keyframes underlineAnimation {
        from { transform: scaleX(0.3); transform-origin: bottom left; }
        to { transform: scaleX(1); transform-origin: bottom right; }
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
        body {
            overflow-y: auto;
        }

        main {
            min-height: auto;
            padding-top: 2rem;
            padding-bottom: 2rem;
        }
    }
`;
document.head.appendChild(style);

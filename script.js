// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Create loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    
    loadingAnimation.appendChild(spinner);
    document.body.appendChild(loadingAnimation);
    
    // Remove loading animation after page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingAnimation.style.opacity = '0';
            loadingAnimation.style.visibility = 'hidden';
            
            setTimeout(() => {
                loadingAnimation.remove();
            }, 500);
        }, 1000);
    });
});

// Initialize particles.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#5e72eb",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});

// Countdown Timer
document.addEventListener('DOMContentLoaded', () => {
    // Set the date we're counting down to (15 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 15);

    // Get countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Update the countdown every 1 second
    const countdownInterval = setInterval(() => {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the remaining time
        const distance = countDownDate - now;
        
        // Calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        daysElement.textContent = padZero(days);
        hoursElement.textContent = padZero(hours);
        minutesElement.textContent = padZero(minutes);
        secondsElement.textContent = padZero(seconds);
        
        // If the countdown is finished, reset to 30 days
        if (distance < 0) {
            countDownDate.setDate(countDownDate.getDate() + 15);
        }
    }, 1000);

    // Function to add leading zero
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }
});

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const subscribeForm = document.querySelector('.subscribe-form');
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (emailInput.value.trim() === '') {
            // Shake animation for invalid input
            emailInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                emailInput.style.animation = '';
            }, 500);
            return;
        }
        
        // Success animation
        subscribeForm.innerHTML = '<div style="color: #5e72eb; font-weight: 600; padding: 1.2rem;">Thank you! We\'ll notify you when we launch.</div>';
    });
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}`;
document.head.appendChild(style);

// Add scroll reveal effect for mobile
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        const content = document.querySelector('.content');
        content.style.height = 'auto';
        content.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        
        // Add animation delay to elements
        const elements = [
            '.logo', 
            '.text-container', 
            '.countdown-container', 
            '.notify-container', 
            '.social-links'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
    }
});
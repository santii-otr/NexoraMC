// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const loadingTexts = [
        'Initializing server...',
        'Loading worlds...',
        'Connecting to Nexora...',
        'Almost ready...',
        'Welcome to NexoraMC!'
    ];
    
    let textIndex = 0;
    const loadingTextElement = document.querySelector('.loading-text');
    
    // Change loading text
    const textInterval = setInterval(() => {
        if (textIndex < loadingTexts.length - 1) {
            textIndex++;
            loadingTextElement.textContent = loadingTexts[textIndex];
        }
    }, 600);
    
    // Hide loading screen after animation
    setTimeout(() => {
        clearInterval(textInterval);
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 500);
    }, 3000);
});

// Entrance Animations
function triggerEntranceAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    const heroImage = document.querySelector('.hero-image');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
        }, index * 100);
    });
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.animation = 'fadeInUp 1s ease-out 0.5s both';
        }, 500);
    }
}

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Copy Server IP Function
function copyIP() {
    const serverIP = 'play.nexoramc.net';
    const copyNotification = document.getElementById('copyNotification');
    
    // Create a temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = serverIP;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for modern browsers
        if (navigator.clipboard) {
            navigator.clipboard.writeText(serverIP).then(() => {
                showCopyNotification();
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    }
    
    document.body.removeChild(textarea);
    
    // Add pulse effect to the button
    const copyBtn = event.target.closest('.btn') || event.target.closest('.copy-btn');
    if (copyBtn) {
        copyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            copyBtn.style.transform = '';
        }, 150);
    }
}

// Show Copy Notification
function showCopyNotification() {
    const notification = document.getElementById('copyNotification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card, .connect-card, .section-title');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('section-reveal', 'revealed');
        }
    });
}

// Floating Animation for Hero Elements
function initFloatingAnimations() {
    const floatingCubes = document.querySelectorAll('.floating-cube');
    
    floatingCubes.forEach((cube, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        cube.style.animationDelay = `${randomDelay}s`;
        cube.style.animationDuration = `${randomDuration}s`;
        
        // Add random hover effect
        cube.addEventListener('mouseenter', () => {
            cube.style.transform = 'scale(1.1) rotate(45deg)';
            cube.style.transition = 'all 0.3s ease';
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.transform = '';
            cube.style.transition = 'all 0.3s ease';
        });
    });
}

// Particle System Enhancement
function createParticles() {
    const particleContainer = document.querySelector('.bg-stars');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #a855f7;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
}

// Feature Cards Stagger Animation
function animateFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.8s ease-out both`;
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const titleMain = document.querySelector('.title-main');
    const titleSub = document.querySelector('.title-sub');
    
    if (titleMain && titleSub) {
        const mainText = titleMain.textContent;
        const subText = titleSub.textContent;
        
        titleMain.textContent = '';
        titleSub.textContent = '';
        
        let mainIndex = 0;
        let subIndex = 0;
        
        function typeMainTitle() {
            if (mainIndex < mainText.length) {
                titleMain.textContent += mainText[mainIndex];
                mainIndex++;
                setTimeout(typeMainTitle, 100);
            } else {
                setTimeout(typeSubTitle, 300);
            }
        }
        
        function typeSubTitle() {
            if (subIndex < subText.length) {
                titleSub.textContent += subText[subIndex];
                subIndex++;
                setTimeout(typeSubTitle, 50);
            }
        }
        
        setTimeout(typeMainTitle, 1000);
    }
}

// Enhanced Scroll Effects
function handleScroll() {
    handleNavbarScroll();
    updateActiveNavLink();
    revealOnScroll();
    
    // Parallax effect for background elements
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-stars, .floating-elements');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Button Hover Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
}

// Star Logo Animation Control
function initStarAnimation() {
    const starLogos = document.querySelectorAll('.star-logo');
    
    starLogos.forEach(star => {
        star.addEventListener('mouseenter', () => {
            star.style.animation = 'starRotate 0.5s ease-in-out';
        });
        
        star.addEventListener('animationend', () => {
            star.style.animation = 'starPulse 2s infinite ease-in-out';
        });
    });
}

// Theme Color Pulse Effect
function initThemePulse() {
    const root = document.documentElement;
    let hue = 260; // Starting purple hue
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        const newColor = `hsl(${hue}, 70%, 65%)`;
        root.style.setProperty('--primary-color', newColor);
    }, 100);
}

// Performance optimized scroll handler
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

// Easter Egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
    
    // Add rainbow keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initFloatingAnimations();
    createParticles();
    animateFeatureCards();
    initButtonEffects();
    initStarAnimation();
    
    // Add scroll event listener with throttling
    window.addEventListener('scroll', requestTick);
    
    // Handle scroll tick
    function handleScrollTick() {
        handleScroll();
        ticking = false;
    }
    
    // Update the handleScroll reference
    handleScroll = handleScrollTick;
    
    // Initialize theme pulse (optional - can be disabled for performance)
    // initThemePulse();
    
    // Add resize handler for responsive updates
    window.addEventListener('resize', function() {
        // Update any responsive calculations
        setTimeout(() => {
            updateActiveNavLink();
        }, 100);
    });
    
    // Preload Discord link (replace with actual Discord invite)
    const discordLinks = document.querySelectorAll('a[href="#"]');
    discordLinks.forEach(link => {
        if (link.innerHTML.includes('Discord') || link.innerHTML.includes('discord')) {
            link.href = 'https://discord.gg/your-discord-invite'; // Replace with actual invite
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        if (e.key === 'Escape') {
            // Close mobile menu if open
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Expose copy function globally for onclick handlers
window.copyIP = copyIP;

// Add some utility functions for potential future use
const NexoraUtils = {
    // Format player count with commas
    formatPlayerCount: (count) => {
        return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Get server status (placeholder for future API integration)
    getServerStatus: async () => {
        // This would connect to a Minecraft server status API
        return {
            online: true,
            players: 247,
            maxPlayers: 500,
            version: "1.20.4"
        };
    },
    
    // Update server info in real-time
    updateServerInfo: async () => {
        try {
            const status = await NexoraUtils.getServerStatus();
            const playerCountElement = document.querySelector('.info-item span');
            if (playerCountElement && playerCountElement.textContent.includes('Players')) {
                playerCountElement.textContent = `${NexoraUtils.formatPlayerCount(status.players)}+ Players Online`;
            }
        } catch (error) {
            console.log('Could not fetch server status');
        }
    }
};

// Optional: Update server info every 30 seconds
// setInterval(NexoraUtils.updateServerInfo, 30000);

// Add some visual feedback for interactions
document.addEventListener('click', function(e) {
    // Create ripple effect on buttons
    if (e.target.matches('.btn, .copy-btn, .discord-btn')) {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trap when mobile menu is active
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.classList.contains('active') && mutation.target === navMenu) {
            trapFocus(navMenu);
        }
    });
});

observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
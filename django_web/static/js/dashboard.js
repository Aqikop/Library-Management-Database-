// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animated Counter for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.counter);
        const numberElement = counter.querySelector('.stat-number');
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                numberElement.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                numberElement.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .event-card, .info-card, .stats');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Search Functionality (Basic implementation)
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        // In a real implementation, this would redirect to a search results page
        // or make an API call to search the catalog
        alert(`Searching for: "${query}"\n\nThis would normally redirect to the catalog search results.`);
        searchInput.value = '';
    } else {
        alert('Please enter a search term.');
    }
}

// Search button click event
searchBtn.addEventListener('click', performSearch);

// Search on Enter key press
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Add typing effect to search placeholder
let placeholderIndex = 0;
const placeholders = [
    'Search books, authors, subjects...',
    'Try "mystery novels"...',
    'Try "Shakespeare"...',
    'Try "science fiction"...',
    'Try "local history"...'
];

function rotatePlaceholder() {
    searchInput.placeholder = placeholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
}

// Rotate placeholder every 3 seconds
setInterval(rotatePlaceholder, 3000);

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Event card interactions
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
        // In a real implementation, this would show event details
        const eventTitle = this.querySelector('h3').textContent;
        const eventTime = this.querySelector('.event-time').textContent;
        const eventDate = this.querySelector('.event-date .month').textContent + ' ' + 
                         this.querySelector('.event-date .day').textContent;
        
        alert(`Event: ${eventTitle}\nDate: ${eventDate}\nTime: ${eventTime}\n\nClick OK to learn more or register.`);
    });
    
    // Add pointer cursor to indicate clickability
    card.style.cursor = 'pointer';
});

// Add loading animation for stats
function addLoadingAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => {
        num.style.transition = 'all 0.3s ease';
    });
}

// Initialize loading animation
document.addEventListener('DOMContentLoaded', addLoadingAnimation);

// Parallax effect for hero section
// + track scroll /click events
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
    // Send scroll activity to backend  
    fetch("/track-activity/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")  // Ensure CSRF token is included
        },
        body: JSON.stringify({ activity: "scroll", position: scrolled, page : window.location.pathname })
    })
});

// Track page visit when loaded
document.addEventListener("DOMContentLoaded", () => {
    fetch("/track-activity/", {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "visit",
            page: window.location.pathname
        })
    });
});

// Helper to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Add scroll indicator
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    scrollIndicator.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1.5rem;
        animation: bounce 2s infinite;
        cursor: pointer;
        z-index: 3;
    `;
    
    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(scrollIndicator);
        
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.stats').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Initialize scroll indicator
document.addEventListener('DOMContentLoaded', createScrollIndicator);

// Add fade-in effect for footer social links
document.querySelectorAll('.social-links a').forEach((link, index) => {
    link.style.opacity = '0';
    link.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
});

// Form validation for newsletter signup (if added)
function addNewsletterForm() {
    const footerSection = document.querySelector('.footer-section:last-child');
    if (footerSection) {
        const newsletterHTML = `
            <h4>Newsletter</h4>
            <p style="color: #bdc3c7; margin-bottom: 1rem;">Stay updated with library news and events</p>
            <div style="display: flex; margin-bottom: 1rem;">
                <input type="email" id="newsletter-email" placeholder="Enter your email" 
                       style="flex: 1; padding: 10px; border: none; border-radius: 5px 0 0 5px; outline: none;">
                <button id="newsletter-btn" style="padding: 10px 15px; background: #e74c3c; color: white; 
                        border: none; border-radius: 0 5px 5px 0; cursor: pointer;">
                    Subscribe
                </button>
            </div>
        `;
        
        footerSection.innerHTML = newsletterHTML;
        
        // Newsletter subscription handler
        document.getElementById('newsletter-btn').addEventListener('click', () => {
            const email = document.getElementById('newsletter-email').value;
            if (email && email.includes('@')) {
                alert(`Thank you for subscribing with email: ${email}`);
                document.getElementById('newsletter-email').value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Initialize newsletter form
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addNewsletterForm, 100);
});

// Add current year to footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${currentYear} Central Public Library. All rights reserved.`;
    }
});

// Console welcome message
console.log('🏛️ Welcome to Central Public Library!');
console.log('📚 Discover the magic of reading and learning.');
console.log('💻 Built with modern web technologies for the best user experience.');
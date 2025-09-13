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
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

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

// ...existing code...

// Search Functionality
// const searchInput = document.getElementById('search-input');
// const searchBtn = document.getElementById('search-btn');

async function performSearch() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '<div class="loading">Loading...</div>';
    
    const searchQuery = searchInput.value.trim();
    const query = encodeURIComponent(searchQuery);
    
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,cover_i,subject&limit=100&mode=everything&language=eng`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (!data.docs || data.docs.length === 0) {
            mainContent.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No books found</h3>
                    <p>Try different keywords or browse our categories</p>
                </div>`;
            return;
        }

        // Filter results
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const filteredDocs = data.docs.filter(book => {
            const titleMatch = book.title?.toLowerCase().split(' ')
                .some(word => searchTerms.includes(word));
            const authorMatch = book.author_name?.some(author => 
                author.toLowerCase().split(' ')
                    .some(word => searchTerms.includes(word))
            );
            const subjectMatch = book.subject?.some(subject =>
                subject.toLowerCase().split(' ')
                    .some(word => searchTerms.includes(word))
            );
            
            return titleMatch || authorMatch || subjectMatch;
        });

        // Create results HTML
        const resultsHTML = `
            <div class="search-results">
                <div class="section-header">
                    <h2><i class="fas fa-search"></i> Search Results</h2>
                    <span class="results-count">${filteredDocs.length} books found</span>
                </div>
                <div class="book-grid">
                    ${filteredDocs.slice(0, 50).map(book => `
                        <div class="book-card" onclick="showBookDetails('${book.key}')">
                            <div class="book-cover" style="background-image: url(${
                                book.cover_i 
                                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                                    : 'https://placehold.co/128x192?text=No+Cover'
                            })"></div>
                            <div class="book-title">${book.title || 'Unknown Title'}</div>
                            <div class="book-author">${book.author_name ? book.author_name[0] : 'Unknown Author'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>`;

        mainContent.innerHTML = resultsHTML;

    } catch (error) {
        mainContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error</h3>
                <p>${error.message}</p>
            </div>`;
    }
}

async function showBookDetails(workId) {
    try {
        const response = await fetch(`https://openlibrary.org${workId}.json`);
        const data = await response.json();

        const {description, title, covers, subject_places, subject_times, subjects} = data;
        const bookDetails = {
            description: description ? (typeof description === 'object' ? description.value : description) : "No description available",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : 'https://placehold.co/128x192?text=No+Cover',
            subject_places: subject_places ? subject_places.join(", ") : "Not available",
            subject_times: subject_times ? subject_times.join(", ") : "Not available",
            subjects: subjects ? subjects.join(", ") : "Not available"
        };

        document.getElementById('book-details-content').innerHTML = `
            <div class="book-detail-card">
                <div class="book-detail-cover" style="background-image: url('${bookDetails.cover_img}')"></div>
                <h2 class="book-detail-title">${bookDetails.title}</h2>
                <div class="book-detail-info">
                    <div class="detail-section">
                        <h3>Description</h3>
                        <p>${bookDetails.description}</p>
                    </div>
                    <div class="detail-section">
                        <h3>Subjects</h3>
                        <p>${bookDetails.subjects}</p>
                    </div>
                    <div class="detail-section">
                        <h3>Places</h3>
                        <p>${bookDetails.subject_places}</p>
                    </div>
                    <div class="detail-section">
                        <h3>Time Periods</h3>
                        <p>${bookDetails.subject_times}</p>
                    </div>
                </div>
            </div>`;

        document.getElementById('book-details').classList.add('active');
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

function closeBookDetails() {
    document.getElementById('book-details').classList.remove('active');
}

// Event Listeners
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Close modal when clicking outside
document.getElementById('book-details').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeBookDetails();
    }
});

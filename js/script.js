// Smooth scrolling for navigation links
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

// Search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const location = document.querySelector('.search-box input').value;
        const type = document.querySelector('.search-box select').value;
        
        if (location.trim()) {
            console.log(`Searching for ${type} properties in ${location}`);
            alert(`Searching for ${type} properties in ${location}`);
            // Here you would typically make an API call
        } else {
            alert('Please enter a location or postcode');
        }
    });
}

// View Details button functionality
const viewButtons = document.querySelectorAll('.view-btn');
viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const propertyCard = this.closest('.property-card');
        const propertyName = propertyCard.querySelector('h3').textContent;
        const price = propertyCard.querySelector('.price-tag').textContent;
        
        console.log(`Viewing details for: ${propertyName} (${price})`);
        // Here you would typically navigate to a detail page
        alert(`View details for: ${propertyName}\nPrice: ${price}`);
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            console.log('Form submitted:', { name, email, message });
            alert(`Thank you for your message, ${name}! We will get back to you shortly.`);
            this.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Add active state to navigation links on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add styles for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--secondary-color);
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Property filtering (example for future enhancement)
function filterProperties(type) {
    const properties = document.querySelectorAll('.property-card');
    properties.forEach(property => {
        // This is a placeholder for filtering logic
        property.style.display = 'block';
    });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Page load animation
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
    });
});

// Add fade-in animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// Add animation to stats on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat').forEach(stat => {
    stat.style.opacity = '0';
    observer.observe(stat);
});

// Console welcome message
console.log('%cWelcome to UK Real Estate', 'font-size: 20px; color: #3498db; font-weight: bold;');
console.log('%cFinding your perfect home made easy!', 'font-size: 14px; color: #2c3e50;');
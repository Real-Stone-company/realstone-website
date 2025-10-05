/**
 * RealStone Website JavaScript
 * Handles navigation, mobile menu, lightbox, form interactions, and smooth scrolling
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    setupNavigation();
    setupMobileMenu();
    setupSmoothScrolling();
    setupFormHandling();
    setupLightbox();
    setupScrollAnimations();
    setupWhatsAppButton();
}

/**
 * Navigation setup with scroll effects
 */
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(11, 11, 11, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(11, 11, 11, 0.95)';
        }
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Mobile menu toggle functionality
 */
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form handling and validation
 */
function setupFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual Formspree endpoint)
                setTimeout(() => {
                    alert('Thank you for your message! We will contact you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

/**
 * Form validation
 */
function validateForm() {
    const form = document.querySelector('.contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        // Remove previous error styling
        field.style.borderColor = '';
        
        if (!value) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }
        
        // Phone validation (basic)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

/**
 * Request Quote functionality - pre-fills form with material
 */
function requestQuote(material) {
    const materialSelect = document.getElementById('material');
    const contactSection = document.getElementById('contact');
    
    if (materialSelect) {
        // Map material names to option values
        const materialMap = {
            'Galaxy Black Marble': 'galaxy-black',
            'Double Black Marble': 'double-black',
            'Kitchen Countertops': 'countertops',
            'Marble Flooring': 'flooring'
        };
        
        const optionValue = materialMap[material] || '';
        materialSelect.value = optionValue;
    }
    
    // Scroll to contact form
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Highlight the material field
    setTimeout(() => {
        if (materialSelect) {
            materialSelect.focus();
            materialSelect.style.borderColor = '#bfa36a';
            materialSelect.style.boxShadow = '0 0 0 2px rgba(191, 163, 106, 0.3)';
        }
    }, 500);
}

/**
 * Lightbox functionality for project images
 */
function setupLightbox() {
    // Project data with before/after images
    window.projectData = {
        project1: {
            before: 'images/project1_before.jpg',
            after: 'images/project1_after.jpg',
            title: 'Luxury Kitchen Renovation'
        },
        project2: {
            before: 'images/project2_before.jpg',
            after: 'images/project2_after.jpg',
            title: 'Premium Marble Flooring'
        }
    };
    
    // Current lightbox state
    window.lightboxState = {
        currentProject: null,
        currentImage: 'before'
    };
}

/**
 * Open lightbox with project images
 */
function openLightbox(projectId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const project = window.projectData[projectId];
    
    if (lightbox && lightboxImg && project) {
        window.lightboxState.currentProject = projectId;
        window.lightboxState.currentImage = 'before';
        
        lightboxImg.src = project.before;
        lightboxImg.alt = `${project.title} - Before`;
        lightbox.style.display = 'block';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);
    }
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleLightboxKeyboard);
    }
}

/**
 * Toggle between before/after images
 */
function toggleBeforeAfter() {
    const lightboxImg = document.getElementById('lightbox-img');
    const projectId = window.lightboxState.currentProject;
    const project = window.projectData[projectId];
    
    if (lightboxImg && project) {
        const currentImage = window.lightboxState.currentImage;
        const newImage = currentImage === 'before' ? 'after' : 'before';
        
        window.lightboxState.currentImage = newImage;
        
        if (newImage === 'before') {
            lightboxImg.src = project.before;
            lightboxImg.alt = `${project.title} - Before`;
        } else {
            lightboxImg.src = project.after;
            lightboxImg.alt = `${project.title} - After`;
        }
        
        // Add transition effect
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
        }, 150);
    }
}

/**
 * Change image in lightbox (for future slider functionality)
 */
function changeImage(direction) {
    // This function can be extended for multiple projects
    // For now, it just toggles between before/after
    toggleBeforeAfter();
}

/**
 * Handle keyboard navigation in lightbox
 */
function handleLightboxKeyboard(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            toggleBeforeAfter();
            break;
        case ' ':
            e.preventDefault();
            toggleBeforeAfter();
            break;
    }
}

/**
 * Scroll animations
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                // Special handling for About Us section
                if (entry.target.classList.contains('about-us')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .project-item, .blog-card, .showroom-card, .about-us');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * WhatsApp button functionality
 */
function setupWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        // Add click tracking (optional)
        whatsappBtn.addEventListener('click', function() {
            // Track WhatsApp clicks for analytics
            console.log('WhatsApp button clicked');
        });
    }
}

/**
 * Utility function to format phone numbers
 */
function formatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format Egyptian phone numbers
    if (cleaned.startsWith('2010') || cleaned.startsWith('2011') || cleaned.startsWith('2012')) {
        return `+${cleaned}`;
    } else if (cleaned.startsWith('10') || cleaned.startsWith('11') || cleaned.startsWith('12')) {
        return `+20${cleaned}`;
    }
    
    return phoneNumber;
}

/**
 * Lazy loading enhancement
 */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Performance optimization - debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Enhanced scroll handling with debouncing
 */
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update navbar transparency based on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const opacity = Math.min(scrollTop / 100, 1);
        navbar.style.backgroundColor = `rgba(11, 11, 11, ${0.95 + (opacity * 0.03)})`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

/**
 * Error handling for images
 */
function setupImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken image with placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
            this.alt = 'Image not found';
        });
    });
}

// Initialize image error handling
setupImageErrorHandling();

/**
 * Contact form enhancements
 */
function enhanceContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    // Auto-format phone number
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('20')) {
                value = '+' + value;
            } else if (value.startsWith('10') || value.startsWith('11') || value.startsWith('12')) {
                value = '+20' + value;
            }
            e.target.value = value;
        });
    }
    
    // File upload preview
    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                console.log(`Selected ${files.length} file(s):`, files.map(f => f.name));
            }
        });
    }
}

// Initialize form enhancements
enhanceContactForm();

// Export functions for global access
window.requestQuote = requestQuote;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.toggleBeforeAfter = toggleBeforeAfter;
window.changeImage = changeImage;

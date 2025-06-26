
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

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
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // Book a Tour button functionality
    const bookTourButtons = document.querySelectorAll('.btn-primary');
    bookTourButtons.forEach(button => {
        if (button.textContent.includes('Book a Tour')) {
            button.addEventListener('click', function() {
                // Replace with actual booking functionality
                alert('Thank you for your interest! Please call +61 (02) 8273 2300 to book your tour or visit our contact section.');
            });
        }
    });

    // Enquire Now button functionality
    const enquireButtons = document.querySelectorAll('.btn-secondary');
    enquireButtons.forEach(button => {
        if (button.textContent.includes('Enquire Now')) {
            button.addEventListener('click', function() {
                // Replace with actual enquiry functionality
                alert('Thank you for your interest! Please call +61 (02) 8273 2300 or email reception@raca.com.au for more information.');
            });
        }
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    document.querySelectorAll('.benefit-card, .event-card, .feature, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add keyboard navigation for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View gallery image details');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Trigger hover effect on keyboard activation
                this.classList.toggle('keyboard-active');
            }
        });
    });
    
    // Mobile-specific optimizations
    if ('ontouchstart' in window) {
        // Add touch feedback for mobile devices
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            
            button.addEventListener('touchend', function() {
                this.style.opacity = '';
            });
        });
        
        // Prevent double-tap zoom on buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
    }
    
    // Optimize images for mobile
    function optimizeImagesForMobile() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
            }
        });
    }
    
    optimizeImagesForMobile();
});

// Contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName').trim();
    const lastName = formData.get('lastName').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject');
    const message = formData.get('message').trim();
    
    // Clear previous error states
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.style.borderColor = '#e2e8f0';
    });
    
    // Validation
    const errors = [];
    
    if (!firstName) {
        errors.push('First name is required');
        document.getElementById('firstName').style.borderColor = '#e53e3e';
    }
    
    if (!lastName) {
        errors.push('Last name is required');
        document.getElementById('lastName').style.borderColor = '#e53e3e';
    }
    
    if (!email) {
        errors.push('Email is required');
        document.getElementById('email').style.borderColor = '#e53e3e';
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
        document.getElementById('email').style.borderColor = '#e53e3e';
    }
    
    if (!subject) {
        errors.push('Subject is required');
        document.getElementById('subject').style.borderColor = '#e53e3e';
    }
    
    if (!message) {
        errors.push('Message is required');
        document.getElementById('message').style.borderColor = '#e53e3e';
    }
    
    if (errors.length > 0) {
        alert('Please correct the following errors:\n• ' + errors.join('\n• '));
        return;
    }
    
    // Show success message
    alert(`Thank you ${firstName}! Your message has been received. We will contact you at ${email} within 24 hours.`);
    
    // Reset form
    event.target.reset();
    
    // In a real implementation, you would send this data to your server
    console.log('Contact form submitted:', Object.fromEntries(formData));
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Newsletter subscription (if needed)
function handleNewsletterSignup(email) {
    // Add newsletter signup logic here
    alert('Thank you for subscribing to our newsletter!');
}


// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
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
});

// Contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const subject = formData.get('subject');
    
    // Basic validation
    if (!firstName || !lastName || !email || !subject) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message
    alert(`Thank you ${firstName}! Your message has been received. We will contact you at ${email} within 24 hours.`);
    
    // Reset form
    event.target.reset();
    
    // In a real implementation, you would send this data to your server
    console.log('Contact form submitted:', Object.fromEntries(formData));
}

// Newsletter subscription (if needed)
function handleNewsletterSignup(email) {
    // Add newsletter signup logic here
    alert('Thank you for subscribing to our newsletter!');
}

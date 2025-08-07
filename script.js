document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent body scroll when mobile menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Modal functionality
    const modal = document.getElementById('contactModal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButton = document.querySelector('.close-button');

    function openModal() {
        if (modal) {
            modal.style.display = 'flex';
            // Trigger fade-in animations
            modal.classList.remove('fade-out');
            modal.classList.add('fade-in');
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('fade-out');
            modal.classList.remove('fade-in');

            // Use 'animationend' event for a more robust close
            modal.addEventListener('animationend', function handler() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                // Remove the event listener to prevent it from firing multiple times
                modal.removeEventListener('animationend', handler);
            }, { once: true }); // { once: true } is a modern shorthand
        }
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Close modal by clicking the background overlay
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with the Escape key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal(); // This now correctly calls the closeModal function with the fade-out animation
        }
    });
    
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to various elements
    document.querySelectorAll('.benefit-card, .event-card, .feature, .gallery-item, .director-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Custom video controls for the gallery page
    document.querySelectorAll('.video-item').forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            // Ensure default controls are off
            video.removeAttribute('controls');

            // Play/pause on click of the container
            item.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });
    
    // Reciprocal Clubs Accordion (from original file, kept for compatibility)
    // Note: The main logic for this is now in reciprocal-clubs.html to handle dynamic content
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const panel = item.querySelector('.accordion-panel');

        if(header && panel && !header.closest('#club-accordion')) { // Prevents double-binding on clubs page
            header.addEventListener('click', () => {
                const isActive = item.classList.toggle('active');
                if (isActive) {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    panel.style.padding = "1rem 2rem 2rem";
                } else {
                    panel.style.maxHeight = 0;
                    panel.style.padding = "0 2rem";
                }
            });
        }
    });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').appendChild(navToggle);

    navToggle.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // Navbar Scroll Effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (currentScroll === 0) {
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Form Validation and Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Project Filter System
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-filter');

                // Update active filter
                projectFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const projectCategory = card.getAttribute('data-category');
                    if (category === 'all' || category === projectCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Skill Progress Animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const target = bar.getAttribute('data-progress');
            let width = 0;
            const interval = setInterval(() => {
                if (width >= target) {
                    clearInterval(interval);
                } else {
                    width++;
                    bar.style.width = width + '%';
                }
            }, 10);
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Typing effect for hero section
    function typeEffect() {
        const text = "Full Stack Web Developer";
        const speed = 100;
        let i = 0;
        const heroText = document.querySelector('.hero-content h2');
        
        function typing() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }

        if (heroText) {
            heroText.textContent = '';
            typing();
        }
    }

    // Initialize typing effect
    typeEffect();
});

// Add some CSS for the new JavaScript features
const style = document.createElement('style');
style.textContent = `
    .nav-toggle {
        display: none;
        cursor: pointer;
        font-size: 1.5rem;
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        z-index: 1000;
    }

    .notification.success {
        background-color: #2ecc71;
    }

    .notification.error {
        background-color: #e74c3c;
    }

    @media (max-width: 768px) {
        .nav-toggle {
            display: block;
        }

        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .nav-links.active {
            display: flex;
        }
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }

    .animate-on-scroll.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);
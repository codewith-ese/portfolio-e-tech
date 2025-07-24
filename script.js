document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    function resetTestimonialTimer() {
        clearInterval(testimonialInterval);
        startTestimonialSlider();
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialTimer();
        });
    });
    
    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetTestimonialTimer();
    });
    
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetTestimonialTimer();
    });
    
    // Initialize testimonial slider
    showTestimonial(currentTestimonial);
    startTestimonialSlider();
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const value = Math.floor(progress * target);
                
                stat.textContent = value;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target + '+';
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    setTheme(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(isDark ? 'light' : 'dark');
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showAlert(message, type, parentElement) {
        const existingAlert = parentElement.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alert = document.createElement('div');
        alert.className = `form-alert form-alert-${type}`;
        alert.textContent = message;
        
        parentElement.insertBefore(alert, parentElement.firstChild);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    // Updated contact form handler for Formsubmit
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default to allow Formsubmit to handle submission
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                showAlert('Please fill in all required fields', 'error', this);
                return;
            }
            
            if (!validateEmail(email)) {
                e.preventDefault();
                showAlert('Please enter a valid email address', 'error', this);
                return;
            }
            
            // Show temporary success message before redirect
            showAlert('Sending your message...', 'success', this);
        });
    }
    
    // Keep your existing newsletter form handler if needed
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            showAlert('Please enter your email address', 'error', this);
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address', 'error', this);
            return;
        }
        
        showAlert('Thank you for subscribing to our newsletter!', 'success', this);
        this.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate when scrolled into view
    document.querySelectorAll('.service-card, .portfolio-item, .team-member, .about-stats, .skill-category, .blog-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effect to client logos
    const clientLogos = document.querySelectorAll('.client-logo');
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.opacity = '1';
            logo.style.filter = 'grayscale(0)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.opacity = '0.7';
            logo.style.filter = 'grayscale(100%)';
        });
    });
});

// WhatsApp link functionality 
// Dynamic message based on page location
document.querySelectorAll('.whatsapp-link').forEach(link => {
    const pageSubject = document.title.includes('Portfolio') 
        ? 'I saw your portfolio project...' 
        : 'Regarding your web development services...';
    link.href = `https://wa.me/2348075236542?text=Hi%20Monday,%20${encodeURIComponent(pageSubject)}`;
});

// Google Analytics event tracking for WhatsApp click
document.querySelector('.whatsapp-float').addEventListener('click', function() {
    gtag('event', 'click', {
        'event_category': 'Contact',
        'event_label': 'WhatsApp Click'
    });
});
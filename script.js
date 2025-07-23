document.addEventListener('DOMContentLoaded', function() {
    // [Keep all your existing code until the contact form section...]
    
    // Form validation and submission - UPDATED FOR FORMSUBMIT
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm'); // Keep if you still need it
    
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
    if (newsletterForm) {
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
    }
    
    // [Keep all your remaining existing code...]
});
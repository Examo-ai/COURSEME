document.addEventListener('DOMContentLoaded', () => {
    // Handle access request form submission
    const accessForm = document.getElementById('access-form');
    if (accessForm) {
        accessForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const reason = document.getElementById('reason').value;
            
            // Disable submit button during submission
            const submitBtn = accessForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Here you would typically send this to your backend
                // For now, we'll just show a success message
                console.log('Request submitted:', { email, reason });
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your interest! We will contact you soon.';
                accessForm.appendChild(successMessage);
                
                // Clear form
                accessForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your request. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Request Access';
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
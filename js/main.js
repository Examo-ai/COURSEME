document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Handle access request form submission
    const accessForm = document.getElementById('access-form');
    if (accessForm) {
        accessForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const reason = document.getElementById('reason').value;
            
            const submitBtn = accessForm.querySelector('.submit-btn');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="loading-spinner"></span>
                <span>Processing...</span>
            `;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your interest! We'll contact you soon.</p>
                `;
                
                // Animate form away and show success message
                accessForm.style.transform = 'translateY(20px)';
                accessForm.style.opacity = '0';
                
                setTimeout(() => {
                    accessForm.parentElement.appendChild(successMessage);
                    successMessage.style.transform = 'translateY(0)';
                    successMessage.style.opacity = '1';
                    
                    // Reset form in background
                    accessForm.reset();
                    accessForm.style.display = 'none';
                    
                    // Show return to form button after delay
                    setTimeout(() => {
                        const returnButton = document.createElement('button');
                        returnButton.className = 'return-btn';
                        returnButton.textContent = 'Request Another Access';
                        successMessage.appendChild(returnButton);
                        
                        returnButton.addEventListener('click', () => {
                            successMessage.remove();
                            accessForm.style.display = 'block';
                            setTimeout(() => {
                                accessForm.style.transform = 'translateY(0)';
                                accessForm.style.opacity = '1';
                            }, 50);
                        });
                    }, 3000);
                }, 300);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Show error message with shake animation
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message shake';
                errorMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <p>There was an error. Please try again.</p>
                `;
                accessForm.insertBefore(errorMessage, accessForm.firstChild);
                
                setTimeout(() => {
                    errorMessage.classList.remove('shake');
                    setTimeout(() => errorMessage.remove(), 3000);
                }, 500);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }

        lastScroll = currentScroll;
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    const floatingCards = document.querySelector('.floating-cards');

    window.addEventListener('mousemove', (e) => {
        if (heroContent && floatingCards) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            heroContent.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
            floatingCards.style.transform = `translate(${mouseX * 40}px, ${mouseY * 40}px)`;
        }
    });

    // Intersection Observer for revealing elements
    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, observerOptions);

    document.querySelectorAll('.feature-card, .course-card, .step, .testimonial-card').forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });

    // Course cards hover effect
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Dynamic course loading in featured courses section
    const loadFeaturedCourses = async () => {
        try {
            const response = await fetch('../data/courses.js');
            const courses = await response.json();
            const featuredCourses = courses.filter(course => course.featured);
            
            const coursesSlider = document.querySelector('.courses-slider');
            if (coursesSlider && featuredCourses.length > 0) {
                coursesSlider.innerHTML = featuredCourses.map(course => `
                    <div class="course-card" data-aos="fade-up">
                        <div class="course-icon"><i class="${course.icon}"></i></div>
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <div class="course-tags">
                            ${course.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading featured courses:', error);
        }
    };

    // Initialize course loading if we're on the homepage
    if (document.querySelector('.courses-slider')) {
        loadFeaturedCourses();
    }

    // Add scroll progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    document.body.appendChild(progressIndicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressIndicator.style.width = progress + '%';
    });
});
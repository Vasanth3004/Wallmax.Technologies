// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const loadingScreen = document.getElementById('loading-screen');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    // Loading screen
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
            initializeAnimations();
        }, 1500);
    });



    // Scroll progress bar
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        // Back to top button
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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

    // Typewriter effect for hero title
    const typewriterElement = document.getElementById('typewriter');
    const texts = ['wallmax technonogies','Modern Web Development', 'Creative Solutions', 'Interactive Experiences'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter effect after loading
    setTimeout(typeWriter, 2000);

    // Animated counter for statistics
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add visible class for fade-in animations
                if (element.classList.contains('fade-in') || 
                    element.classList.contains('slide-in-left') || 
                    element.classList.contains('slide-in-right')) {
                    element.classList.add('visible');
                }

                // Animate statistics counters
                if (element.classList.contains('stat-number')) {
                    const target = parseInt(element.getAttribute('data-target'));
                    animateCounter(element, target);
                }

                // Animate skill progress bars
                if (element.classList.contains('skill-progress')) {
                    const width = element.getAttribute('data-width');
                    setTimeout(() => {
                        element.style.width = width + '%';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

   
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            showError('name-error', 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError('name-error', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError('email-error', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject
        if (subjectInput.value.trim() === '') {
            showError('subject-error', 'Subject is required');
            isValid = false;
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            showError('message-error', 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError('message-error', 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            // Show loading state
            const btnText = contactForm.querySelector('.btn-text');
            const btnLoading = contactForm.querySelector('.btn-loading');
            
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            
            // Simulate form submission
            setTimeout(() => {
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                showSuccessMessage();
                contactForm.reset();
            }, 2000);
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }

    function showSuccessMessage() {
        // Create success message if it doesn't exist
        let successMessage = document.querySelector('.success-message');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
            contactForm.appendChild(successMessage);
        }
        
        successMessage.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Particle animation for hero section
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Add interactive hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const floatingCards = document.querySelectorAll('.floating-card');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        floatingCards.forEach((card, index) => {
            if (scrolled < window.innerHeight) {
                const speed = 0.05 + (index * 0.02);
                card.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Add stagger animation to project cards
    function staggerAnimation() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fade-in');
        });
    }

    // Initialize stagger animation
    staggerAnimation();

    // Theme switching functionality
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        
        document.body.appendChild(themeToggle);
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Initialize theme toggle
    createThemeToggle();

    // Initialize animations after loading
    function initializeAnimations() {
        // Observe elements for animations
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stat-number, .skill-progress').forEach(el => {
            observer.observe(el);
        });

        // Add animation classes to elements
        addAnimationClasses();
    }

    // Function to add animation classes to elements
    function addAnimationClasses() {
        // Add fade-in animation to sections
        document.querySelectorAll('.section-title').forEach(el => {
            el.classList.add('fade-in');
        });

        // Add slide-in animations to alternating content
        document.querySelectorAll('.about-text').forEach(el => {
            el.classList.add('slide-in-left');
        });

        document.querySelectorAll('.about-stats').forEach(el => {
            el.classList.add('slide-in-right');
        });

        document.querySelectorAll('.contact-info').forEach(el => {
            el.classList.add('slide-in-left');
        });

        document.querySelectorAll('.contact-form').forEach(el => {
            el.classList.add('slide-in-right');
        });

        document.querySelectorAll('.skill-item').forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Utility function for smooth element reveals
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Performance optimization: throttle scroll events
    function throttle(func, wait) {
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

    // Apply throttling to scroll events
    const throttledReveal = throttle(revealOnScroll, 16);
    window.addEventListener('scroll', throttledReveal);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft') {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : testimonialItems.length - 1;
            showSlide(currentSlide);
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            showSlide(currentSlide);
        }
    });

    // Add focus management for accessibility
    document.querySelectorAll('.nav-link, .btn, .filter-btn, .social-link').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});


  const buttons = document.querySelectorAll('.review-buttons button');
  const reviews = document.querySelectorAll('.rev-cont');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      reviews.forEach((review, index) => {
        if (index + 1 == target) {
          review.classList.add('active');
        } else {
          review.classList.remove('active');
        }
      });
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.abt-num');

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = target / 200; // adjust divisor for speed

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
});



// Additional utility functions
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

// Smooth reveal animation for elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

   function animateProgress(barId, targetValue, speed) {
      const progressBar = document.getElementById(barId);
      let percent = 0;
      const interval = setInterval(() => {
        if (percent <= targetValue) {
          progressBar.style.width = percent + '%';
          progressBar.textContent = percent + '%';
          percent++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }

    // Call for each bar with different target values and speeds
    animateProgress('progressBar1', 89, 15); // 80% - Fast
    animateProgress('progressBar2', 90, 10); // 60% - Medium
    animateProgress('progressBar3', 94, 18); // 90% - Slower
// Initialize scroll animations
window.addEventListener('scroll', debounce(animateOnScroll, 10));


// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to 3D camera
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    
    // Move camera slightly on scroll
    if (window.camera) {
        window.camera.position.y += scrollDelta * 0.01;
        window.camera.lookAt(window.scene.position);
    }
    
    lastScrollY = scrollY;
});

// Initialize 3D background when page loads
window.addEventListener('load', () => {
    // This will be called from three-scene.js
});

// Certificate Carousel Functionality
class CertificateCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.cert-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add click events to dots
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
            });
        });
        
        // Add click event to certificate images for modal
        document.querySelectorAll('.cert-image').forEach((image, index) => {
            image.addEventListener('click', () => {
                this.openCertificateModal(index);
            });
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause auto-slide on hover
        const carousel = document.querySelector('.cert-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
        carousel.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    updateCarousel() {
        // Remove active classes
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });
        
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active classes
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
        
        // Update prev/next classes for animation
        const prevIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
        const nextIndex = this.currentIndex === this.totalSlides - 1 ? 0 : this.currentIndex + 1;
        
        this.slides[prevIndex].classList.add('prev');
        this.slides[nextIndex].classList.add('next');
        
        // Update button states
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        // Can add disabled states if needed
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoSlide();
    }
    
    prevSlide() {
        this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
        this.updateCarousel();
        this.resetAutoSlide();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoSlide();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    openCertificateModal(index) {
        const certificateData = {
            0: {
                title: "Deloitte Data Analytics Virtual Internship",
                description: "Completed virtual internship simulating real-world Deloitte data analytics projects. Focus on data cleaning, visualization, and business insights. Gained practical experience in corporate analytics workflows and professional reporting standards.",
                image: "certificates/deloitte-certificate.jpg"
            },
            1: {
                title: "Ethical Hacking Certificate",
                description: "Completed comprehensive course on ethical hacking fundamentals, vulnerability assessment, and secure system design principles. Covered topics including network security, penetration testing basics, cryptography, and secure coding practices.",
                image: "certificates/ethical-hacking.jpg"
            },
            2: {
                title: "Web Development Certificate",
                description: "Mastered full-stack web development concepts including HTML5, CSS3, JavaScript, responsive design, and backend integration techniques. Built multiple projects including e-commerce prototypes and interactive web applications.",
                image: "certificates/web-development.jpg"
            },
            3: {
                title: "Generative AI Certificate",
                description: "Explored generative AI models, their applications, and implementation strategies for creative and practical solutions. Learned about AI ethics, model training, and deployment of AI-powered applications.",
                image: "certificates/generative-ai.jpg"
            }
        };
        
        const cert = certificateData[index];
        if (cert) {
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            modalImage.src = cert.image;
            modalImage.alt = cert.title;
            modalTitle.textContent = cert.title;
            modalDescription.textContent = cert.description;
            
            const modal = document.getElementById('certificateModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CertificateCarousel();
});

// Modal close functionality
const closeModal = document.querySelector('.close-modal');
const modal = document.getElementById('certificateModal');

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
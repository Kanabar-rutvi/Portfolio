// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
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

// Scroll Indicator Functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const phrases = [
        "Building the future with code and creativity...",
        "IoT + AI enthusiast...",
        "Data visualization expert...",
        "Full-stack developer...",
        "Cybersecurity learner..."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting chars
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Writing chars
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Initial typing speed
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed = typeSpeed / 2;
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentPhrase.length) {
            isEnd = true;
            typeSpeed = 1500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex++;
            if (phraseIndex === phrases.length) {
                phraseIndex = 0;
            }
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typewriter effect
    setTimeout(typeWriter, 1000);
}

// Certificate Modal Functionality
const certificateModal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.querySelector('.close-modal');

// Open modal when certificate is clicked
document.querySelectorAll('.view-cert-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const certSrc = this.getAttribute('data-src');
        const certTitle = this.getAttribute('data-title');
        
        if (certSrc && certTitle) {
            modalImage.src = certSrc;
            modalImage.alt = certTitle;
            modalTitle.textContent = certTitle;
            
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Also allow clicking on the certificate image to open modal
document.querySelectorAll('.certificate-image').forEach(image => {
    image.addEventListener('click', function() {
        const button = this.querySelector('.view-cert-btn');
        if (button) {
            button.click();
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    certificateModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        certificateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
        certificateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Project Demo Links - Add functionality
document.querySelectorAll('.project-link.demo-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            const projectTitle = this.closest('.project-card').querySelector('.project-title').textContent;
            alert(`Demo for "${projectTitle}" - This would open the live demo in a real implementation.\n\nFor now, you can check the GitHub repository for code.`);
        }
    });
});

// Initialize 3D background when page loads
window.addEventListener('load', () => {
    // This will be called from three-scene.js
    console.log('Portfolio loaded successfully!');
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
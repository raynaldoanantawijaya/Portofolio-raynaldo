// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formInputs = contactForm.querySelectorAll('input, textarea');

function checkFormValidity() {
    let allFilled = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
        }
    });
    submitBtn.disabled = !allFilled;
}

formInputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
});

// Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Pesan Anda telah berhasil dikirim! Saya akan membalasnya segera.');
        contactForm.reset();
        submitBtn.textContent = 'Kirim Pesan';
        submitBtn.disabled = true;
    }, 500);
});

// Animasi untuk beranda dengan delay
function animateHomeSection() {
    const homeLeft = document.querySelector('.home-left.fade-in');
    const homeRight = document.querySelector('.home-right.fade-in');
    
    // Delay sebelum memulai animasi beranda
    setTimeout(() => {
        if (homeLeft) homeLeft.classList.add('visible');
    }, 500); // Delay 500ms untuk teks
    
    setTimeout(() => {
        if (homeRight) homeRight.classList.add('visible');
    }, 1000); // Delay 1000ms untuk foto
}

// Fungsi untuk animasi proyek satu-satu
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card.fade-in');
    
    projectCards.forEach((card, index) => {
        // Set custom property untuk delay
        card.style.setProperty('--project-index', index);
        
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200); // Delay 200ms per proyek
        }
    });
}

// Modifikasi fungsi checkScroll()
function checkScroll() {
    const fadeElements = document.querySelectorAll('.fade-in:not(#home .fade-in):not(.project-card)');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
    
    // Panggil fungsi animasi proyek
    animateProjects();
}

// Individual skill items animation
function checkSkillsScroll() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Jalankan animasi beranda dengan delay
    animateHomeSection();
    
    // Check scroll untuk section lainnya
    checkScroll();
    checkSkillsScroll();
});

// Check on scroll
window.addEventListener('scroll', function() {
    checkScroll();
    checkSkillsScroll();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
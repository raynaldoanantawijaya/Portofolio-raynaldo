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
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        
        const response = await fetch('https://formspree.io/f/xovkjolv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Pesan Anda telah berhasil dikirim! Saya akan membalasnya segera.');
            contactForm.reset();
            submitBtn.disabled = true;
        } else {
            throw new Error('Gagal mengirim pesan');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi saya langsung melalui email.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Fungsi umum untuk animasi masuk dengan delay lebih lambat
function observeElements(selector, className = 'visible', rootMargin = '0px 0px -200px 0px', delay = 300) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add(className);
                }, index * delay); // delay per elemen
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin });

    elements.forEach(el => observer.observe(el));
}

// Animasi beranda dan section lainnya
document.addEventListener('DOMContentLoaded', () => {
    observeElements('.home-left.fade-in', 'visible', '0px 0px -200px 0px', 500);   // teks beranda
    observeElements('.home-right.fade-in', 'visible', '0px 0px -200px 0px', 800); // foto beranda
    observeElements('.project-card.fade-in', 'visible', '0px 0px -200px 0px', 400); // proyek
    observeElements('.skill-item', 'visible', '0px 0px -200px 0px', 200);          // skill
    observeElements('.fade-in:not(.project-card):not(.skill-item)', 'visible', '0px 0px -200px 0px', 300);
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

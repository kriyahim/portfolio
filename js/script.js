// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById('scroll-top');
const downloadCvBtn = document.getElementById('download-cv');
const currentYear = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Set current year
    currentYear.textContent = new Date().getFullYear();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Download CV button
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple text representation of the resume
    const resumeContent = `
HIM KRIYA
IT Executive & Systems Administrator

Contact Information:
Phone: +855 977-424-025
Email: patiyahim@gmail.com
Telegram: @himkriya
Location: Sihanoukville, Cambodia
Nationality: Cambodian

Summary:
Proactive IT professional with over 6 years of experience, beginning as the owner of a computer repair shop where I resolved diverse hardware and software issues. Currently manage corporate IT infrastructure for 80+ staff and collaborate effectively with international teams across. Combines deep technical troubleshooting with strategic operational oversight.

Experience:
IT Executive | Canopysands Development | January 2024 – Present
- Played key role in IFC Building Opening Ceremony
- Troubleshot technical issues for 80+ staff
- Ensured 24/7 uptime for critical IT infrastructure
- Managed smart access control systems

Business Owner & Manager | Kriya Computer & Printer | 2018 – 2024
- Founded and scaled a computer sales and repair shop
- Diagnosed and resolved hardware/software issues
- Created marketing materials and managed operations
- Reduced IT procurement costs by ~15%

Skills:
- Technical Support & Troubleshooting
- Systems & Network Administration
- IT Operations & Management
- Business & Soft Skills

Education:
- Krou Yeung School, English High School Diploma (2006-2016)
- Samdech Ov/Mae School, High School Diploma (2015-2018)

Languages:
- Khmer (Native)
- English (Professional)
- Chinese (Basic)
    `;
    
    // Create a Blob with the resume content
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Him_Kriya_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show a confirmation message
    alert('Resume downloaded as Him_Kriya_Resume.txt');
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real implementation, you would send this data to a server
    // For this example, we'll just show a confirmation message
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Add CSS for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

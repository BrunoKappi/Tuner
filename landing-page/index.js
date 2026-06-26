/**
 * Bkappi Tuner Landing Page JS Logic
 */

// Define Footer Current Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Theme Switcher Logic for the Interactive App Preview Card
function switchTheme(theme) {
  const darkTab = document.getElementById('tab-dark');
  const lightTab = document.getElementById('tab-light');
  const darkImg = document.getElementById('img-preview-dark');
  const lightImg = document.getElementById('img-preview-light');
  
  if (theme === 'dark') {
    darkTab.classList.add('active');
    lightTab.classList.remove('active');
    darkImg.classList.add('active');
    lightImg.classList.remove('active');
  } else {
    lightTab.classList.add('active');
    darkTab.classList.remove('active');
    lightImg.classList.add('active');
    darkImg.classList.remove('active');
  }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Simple micro-interactions: mouse moving blurs tracking (optional/subtle)
document.addEventListener('mousemove', (e) => {
  const glow1 = document.getElementById('glow1');
  const glow2 = document.getElementById('glow2');
  
  if (glow1 && glow2) {
    const x = e.clientX / 30;
    const y = e.clientY / 30;
    
    glow1.style.transform = `translate(${x}px, ${y}px)`;
    glow2.style.transform = `translate(${-x}px, ${-y}px)`;
  }
});

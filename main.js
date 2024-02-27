const hamburgerButton = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector(".nav-links");

hamburgerButton.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display == 'none' ? 'block' : 'none';
})
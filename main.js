const hamburgerButton = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector(".nav-links");

hamburgerButton.addEventListener('click', () => {
    if (navLinks.style.display === 'none' || navLinks.style.display === '') {
        navLinks.style.display = 'block';
        hamburgerButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        navLinks.style.display = 'none';
        hamburgerButton.innerHTML = '☰';
    }
})


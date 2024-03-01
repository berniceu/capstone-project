const hamburgerBtn = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector(".nav-links");


// target hamburger button to display navlinks when clicked and turn the button into x-mark
hamburgerBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'none' || navLinks.style.display === '') {
        navLinks.style.display = 'block';
        hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        navLinks.style.display = 'none';
        hamburgerBtn.innerHTML = '☰';
    }
})


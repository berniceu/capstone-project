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

const navList = document.querySelectorAll('.nav-links a')
Array.from(navList).forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';    
        hamburgerBtn.innerHTML = '☰';    
    })
})




// add dark mode

const toggleButton = document.querySelector('.toggle');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector('.container').classList.toggle("dark-mode");
    document.querySelector('nav').classList.toggle("dark-mode");
    document.querySelector('footer').classList.toggle("dark-mode");
    document.querySelectorAll('input').classList.toggle("dark-mode");

})


// add animation on scroll

let sections = document.querySelectorAll('.section');
window.onscroll = () => {
    sections.forEach (section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom >= 0) {
            section.classList.add('animate');
        } else {
            section.classList.remove('animate');
        }
    })
    
    
}

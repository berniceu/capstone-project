const hamburgerBtn = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector(".nav-links");
const tabItems = document.querySelectorAll('.tab-item');

// add active state on navbar
function selectItem(e){
    removeClass();
    this.classList.add('active')
}

function removeClass(){
    tabItems.forEach(tabItem => tabItem.classList.remove('active'));
}

tabItems.forEach(tabItem => tabItem.addEventListener('click', selectItem))


// target hamburger button to display navlinks when clicked and turn the button into x-mark
if (hamburgerBtn){
    hamburgerBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'block';
            hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            navLinks.style.display = 'none';
            hamburgerBtn.innerHTML = '☰';
        }
    })
}


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
    

    if (document.body.classList.contains("dark-mode")) {
        document.querySelector('.moon').src = "images/sun.png";
    } else {
        document.querySelector('.moon').src = "images/moon.png";
    }

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

// open and close popup

const queryButtons = document.querySelectorAll('.queries .button');
const closePopups = document.querySelectorAll('.close');

queryButtons.forEach(queryBtn => {
    queryBtn.addEventListener('click', function openPopUp(){
        document.querySelector('.popup').style.display = 'block';
    });
})
    


closePopups.forEach(closePopup => {
    closePopup.addEventListener('click', function(){
        document.querySelector('.popup').style.display = 'none';
    });
})

// display error message

const contactInputs = document.querySelectorAll('.item');
const errorMsg = document.querySelector('.error-text');
const signupPassword = document.getElementById('passwordInput');
const confirmPassword = document.getElementById('confirm-password');
const showPassword = document.getElementById('show-password');
const passwordLength = document.querySelector('.length');
const capitalLetter = document.querySelector('.capital');
const lowercase = document.querySelector('.lowercase');
const passwordNumber = document.querySelector('.number');
const specialChar = document.querySelector('.special-character');
const requirement = document.querySelector('.requirement');


// show password
showPassword.addEventListener('click', (e) => {
    if (signupPassword.type == 'password'){
        signupPassword.type = 'text';
    } else {
        signupPassword.type = 'password';
    }
})

contactInputs.forEach(input => {

    input.addEventListener("blur", () => {
        if (input.value != ''){
            input.classList.remove("error");
            input.parentElement.classList.remove("error");
            
        } else {
            input.classList.add("error");
            input.parentElement.classList.add("error");
        }
        
    })


})


signupPassword.addEventListener('blur', validatePassword );
// validate password
function validatePassword(){
    let isValid = true;

    passwordLength.classList.remove('valid');
    capitalLetter.classList.remove('valid');
    lowercase.classList.remove('valid');
    passwordNumber.classList.remove('valid');
    specialChar.classList.remove('valid');
    
    
    if (signupPassword.value.length >= 8) {
        passwordLength.classList.add('valid');
    } else {
        isValid = false;
    }
    if (/[A-Z]/.test(signupPassword.value)) {
        capitalLetter.classList.add('valid');
    } else {
        isValid = false;
    }
    if (/[a-z]/.test(signupPassword.value)) {
        lowercase.classList.add('valid');
    } else {
        isValid = false;
    }
    if (/\d/.test(signupPassword.value)) {
        passwordNumber.classList.add('valid');
    } else {
        isValid = false;
    }
    if (/[#.?!@$%^&*\-_]/.test(signupPassword.value)) {
        specialChar.classList.add('valid');
    } else {
        isValid = false;
    }


    if (!isValid){
        signupPassword.classList.add('error');
        signupPassword.parentElement.classList.add('error');
    } else {
        signupPassword.classList.remove('error');
        signupPassword.parentElement.classList.remove('error');
    }
}

// confirm password
const repeat = document.getElementById('repeat');
confirmPassword.addEventListener('blur', (e) => {
    const value = e.target.value;

    if(value.length && value != signupPassword.value){
        repeat.classList.add('error');
        repeat.parentElement.classList.add('error');
    } else {
        repeat.classList.remove('error');
        repeat.parentElement.classList.remove('error');
    }
})




// send email 

let contactBtn = document.querySelector('.contact-button .button');
let userEmail = document.getElementById('useremail');
let userName = document.getElementById('username');
let query = document.querySelector('.contact-form textarea');

function sendEmail(){
    
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "berniceuwituze@gmail.com",
        Password : "C65756295C348ECB6FD31FECAC66EEE1D6D5",
        To : 'berniceuwituze@gmail.com',
        From : 'berniceuwituze@gmail.com',
        Subject : "Portfolio Query",
        Body : `Name: ${userName.value}<br>
        Email: ${userEmail.value}<br>
        Message: ${query.value}<br>`
    }).then(
      message => alert(message)
    );
}

contactBtn.addEventListener('click', sendEmail);

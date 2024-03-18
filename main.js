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

if (toggleButton){
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
}



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

if (showPassword){
    showPassword.addEventListener('click', (e) => {
        if (signupPassword.type == 'password'){
            signupPassword.type = 'text';
        } else {
            signupPassword.type = 'password';
        }
    
        
    })
}


// add error message

const contactForm = document.querySelector(".contact-form");
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userEmail = document.getElementById('useremail');
let hasError = false;

contactInputs.forEach(input => {
    input.addEventListener("blur", () => {
        if (input.value.trim() !== ''){
            input.classList.remove("error");
            input.parentElement.classList.remove("error");
            hasError = false
        } else {
            input.classList.add("error");
            input.parentElement.classList.add("error");
            hasError = true;
           
        } if (userEmail.value!== '' && !emailValid.test(userEmail.value.trim())){
            userEmail.classList.add("error");
            userEmail.parentElement.classList.add("error");
            document.querySelector('.email.error-text').textContent = "Enter valid email";
            hasError = true
        }
    });
});

if(contactForm){
    contactForm.addEventListener('submit', (e) => {
        
        e.preventDefault();
        
        if (hasError){
            alert("Please fill out all fields correctly");
        } else {
            alert("Message sent successfully")
        }
    })
}



// send email using smtp

/*const userName = document.getElementById('username');
const query = document.querySelector('.contact-form textarea');

function sendEmail(){
    
    userEmail.send({
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
      message => alert("message sent successfully")
    ).catch (err => {
        alert("Failed to send message");
        console.log(err)
    });
}*/



// prevent login form submission

/*const loginForm = document.getElementById('login-form');
if (loginForm){
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        let hasError = false;
        contactInputs.forEach(input => {
            if (input.classList.contains('error')) {
                hasError = true;
            }
        });
    
        if (hasError){
            alert("Please fill out all field");
        }else {
            loginForm.submit();
        }
    
    })
}*/


// replace icon

/*let errorIcons = document.querySelectorAll('.error-icon');
let correctIcon = document.createElement('i');
correctIcon.textContent = '';
errorIcons.forEach(icon => {
    icon.replaceWith(correctIcon);

})*/


if (signupPassword){
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
    if (/[A-Z]/g.test(signupPassword.value)) {
        capitalLetter.classList.add('valid');
    } else {
        isValid = false;
    }
    if (/[a-z]/g.test(signupPassword.value)) {
        lowercase.classList.add('valid');
    } else {
        isValid = false;
    }
    if (/\d/g.test(signupPassword.value)) {
        passwordNumber.classList.add('valid');
    } else {
        isValid = false;
    }
    if (/[#.?!@$%^&*\-_]/g.test(signupPassword.value)) {
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

}


// confirm password

if (confirmPassword){
    confirmPassword.addEventListener('blur', () => {
        
    
        if(confirmPassword.value.length && confirmPassword.value !== signupPassword.value){
            confirmPassword.classList.add('error');
            confirmPassword.parentElement.classList.add('error');
        } else {
            confirmPassword.classList.remove('error');
            confirmPassword.parentElement.classList.remove('error');
        }
    })
}



/*if (contactBtn){
    contactBtn.addEventListener('click', sendEmail);
}*/



// store sign up information

const signupBtn = document.querySelector('.signup-button');
const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');

if (signupBtn){
    signupBtn.addEventListener('click', storeSignUp)
}

function storeSignUp(){
    if (username.value && email.value && password.value){
        localStorage.setItem("name", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password",  password.value);

        username.value = '';
        email.value = '';
        password.value = '';

        alert("Signed Up successfully!");
    } else {
        alert("Please fill in all fields.")
    }

    
    

    
}



// add article to localStorage

/*const publishBtn = document.getElementById('publish');
const article = document.getElementById("story");
const articleTitle = document.getElementById("title");
let data = [{
    title: articleTitle.value,
    story: article.value
}]

localStorage.setItem("data", JSON.stringify(data));
*/
// add likes and comments

const hearts = document.querySelectorAll('.fa-solid.fa-heart');
let likesNumber = document.querySelector('.likes-number');


if (hearts){
    hearts.forEach(heart => {
        let count = 0;
        heart.addEventListener('click', () => {
            if (heart.style.color === 'black') {
                heart.style.color = '#E5989B';
                count++;
                Number(likesNumber.value)++
            } else {
                heart.style.color = 'black';
                count--;
            }
        });
    });
}

// subscribe
const subscribeEmail = document.getElementById('subscribe-email');
const subscribeBtn = document.getElementById("subscribe-btn");
const subscribeForm = document.getElementById('subscribe');


if (subscribeForm){
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (subscribeEmail.value == ''){
            alert("Please fill out your email");
        } else if (emailValid.test(subscribeEmail.value)){
            alert("Subscribed successfully");
           // subscribeForm.submit();
        } else {
            alert ("Enter valid email address");
        }
    })
}


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
const showConfirm = document.getElementById('show-confirm-password');

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

if(showConfirm){
    showConfirm.addEventListener('click', () => {
        if (confirmPassword.type == 'password'){
            confirmPassword.type = 'text';
        } else {
            confirmPassword.type = 'password';
        } 
    })
}



// add error message

const contactForm = document.querySelector(".contact-form");
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userEmail = document.getElementById('useremail');
let hasError = false;

contactInputs.forEach(input => {
    if (input){
        input.addEventListener("blur", () => {
            if (input.value.trim() !== ''){
                input.classList.remove("error");
                input.parentElement.classList.remove("error");
                hasError = false
            } else {
                input.classList.add("error");
                input.parentElement.classList.add("error");
                hasError = true;
               
            }
             if (userEmail.value!== '' && !emailValid.test(userEmail.value.trim())){
                userEmail.classList.add("error");
                userEmail.parentElement.classList.add("error");
                document.querySelector('.email.error-text').textContent = "Enter valid email";
                hasError = true
            }
        });
    }
    
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







if (signupPassword){
    signupPassword.addEventListener('input', validatePassword );


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
    confirmPassword.addEventListener('input', () => {
        
    
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


const publishBtn = document.getElementById('publish');
const article = document.getElementById("story");
const articleTitle = document.getElementById("title");
const newArticleContainer = document.querySelector('.new-article-container');

//display write new post container

const newPostBtn = document.getElementById('new-post-button');
const hiddenPost = document.querySelector('.create-article.hidden');

if (newPostBtn){
    newPostBtn.addEventListener('click', () => {
        if (hiddenPost.style.display == 'none'){
            hiddenPost.style.display = 'block';
        } else {
            hiddenPost.style.display = 'none';
        }
    });
}


// add article to localStorage and delete

if (publishBtn){
    publishBtn.addEventListener('click', (e) => {
        e.preventDefault();

     //   let count = 1;
        let data = {
    //        id: count,
            title: articleTitle.value,
            story: article.value
        };
        
        const newArticles = JSON.parse(localStorage.getItem('data')) || [];
        newArticles.push(data);
    
        localStorage.setItem("data", JSON.stringify(newArticles));
        newArticleContainer.innerHTML = ''
        
        newArticles.forEach((articleData, index) => {
            const post = document.createElement('div');
            post.classList.add('new-blog');
        
            post.innerHTML = `
            <div class="blogs">
                <div class="new-article">
                    <div class="blog-title">
                        <h3>${articleData.title}</h3>
                    </div>
                    <p class="blog-story">${articleData.story}</p>

                    <i class="fa-solid fa-heart" id="heart"></i>
                    <span>0 Likes</span>

                    <i class="fa-solid fa-comment"></i>
                    <span>10 Comments</span>

                    <i class="fa-solid fa-pen edit-button" data-index="${index}"></i>
                    <span>Edit</span>

                    <i class="fa-solid fa-trash delete-button" data-index="${index}"></i>
                    <span>Delete</span>
                </div>
            </div>`
            
    
    
            newArticleContainer.appendChild(post);

            hiddenPost.style.display = 'none';

            const deleteBtn = post.querySelector('.delete-button');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    post.remove();
                    const deleteArticle = parseInt(deleteBtn.dataset.index);
                    newArticles.splice(deleteArticle, 1);

                    localStorage.setItem('data', JSON.stringify(newArticles));
                    
                })
            }
            const editBtn = post.querySelector('.edit-button');
            editBtn.addEventListener('click', () => {
                hiddenPost.style.display = 'block';
                hiddenPost.dataset.index = index;
                articleTitle.value = articleData.title;
                article.value = articleData.story;

                
                    
            

            });


        });

        article.value = '';
        articleTitle.value = '';
        hiddenPost.style.display = 'none';
    });

    
}

if (hiddenPost){
    hiddenPost.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = parseInt(hiddenPost.dataset.index);
        const editedData = {
            title: articleTitle.value,
            story: article.value
        };
    
        newArticles[index] = editedData;
        localStorage.setItem('data', JSON.stringify(newArticles));
        renderArticles(newArticles);
        hiddenPost.style.display = 'none';
    
    
    });
}




function renderArticles(articles) {
    newArticleContainer.innerHTML = '';
    articles.forEach((articleData, index) => {
        const post = document.createElement('div');
        post.classList.add('new-blog');

        post.innerHTML = `
        <div class="blogs">
            <div class="new-article">
                <div class="blog-title">
                    <h3>${articleData.title}</h3>
                </div>
                <p class="blog-story">${articleData.story}</p>

                <i class="fa-solid fa-heart" id="heart"></i>
                <span>0 Likes</span>

                <i class="fa-solid fa-comment"></i>
                <span>10 Comments</span>

                <i class="fa-solid fa-pen edit-button" data-index="${index}"></i>
                <span>Edit</span>

                <i class="fa-solid fa-trash delete-button" data-index="${index}"></i>
                <span>Delete</span>
            </div>
        </div>`

        newArticleContainer.appendChild(post);
    });
}







// add likes and comments

const hearts = document.querySelectorAll('.fa-solid.fa-heart');
const likesNumber = document.querySelector('.likes-number');
let count = 0;


if (hearts){
    hearts.forEach(heart => {
        
        heart.addEventListener('click', () => {
            if (heart.style.color === 'black') {
                heart.style.color = '#E5989B';
                count++;
                
            } else {
                heart.style.color = 'black';
                if (count > 0) {
                    count--;
                }
            }

            if (count == 1){
                likesNumber.innerHTML = `${count} Like`;
            } else {
                likesNumber.innerHTML = `${count} Likes`;
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

// hide comment form

const commentIcon = document.querySelector('.fa-comment');
const commentSection = document.querySelector('.comment-section');

if (commentIcon){
    commentIcon.addEventListener('click', () => {
        commentSection.classList.toggle('hidden');
    })
}


// add comment

const commentForm = document.querySelector('.comment-form');
const commenterName = document.querySelector(".commenter-name");
const commentText = document.querySelector('.comment-text');
const commentBtn = document.querySelector('.comment-form .button');

const newCommentContainer = document.querySelector('.new-comment');



if (commentForm){

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let commentObj = {
            commenter: commenterName.value,
            commentText: commentText.value
        }

        console.log(commentObj)

        const newComments = JSON.parse(localStorage.getItem('comments')) || [];
        newComments.push(commentObj);

        localStorage.setItem('comments', JSON.stringify(newComments));
        newCommentContainer.innerHTML = '';

        newComments.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-div');

            commentDiv.innerHTML = `<h5>${comment.commenter}</h5>
            <p>${comment.commentText}</p>
            <button class="button" data-index="${index}">delete</button>`

            newCommentContainer.appendChild(commentDiv);

            const deleteComment = commentDiv.querySelector('.button');
            if(deleteComment){
                deleteComment.addEventListener('click', () => {
                    const deleteIndex = parseInt(deleteComment.dataset.index);
                    newComments.splice(deleteIndex, 1);

                    localStorage.setItem('comments', JSON.stringify(newComments));
                    commentDiv.remove();
                })
            }

        })

        commenterName.value = '';
        commentText.value = '';
    })
}
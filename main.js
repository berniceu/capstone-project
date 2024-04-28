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
const requirements = document.querySelector('requirements');
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
        });
    }
    
});

if(contactForm){
    contactForm.addEventListener('submit', async function(e) {
        
        e.preventDefault();
        const contactBtn = document.querySelector('.contact-button button');
        
        if (hasError){
            alert("Please fill out all fields correctly");
            contactBtn.disabled = true;
        } else{
            contactBtn.disabled = false;
            const username = document.getElementById('username').value;
        const query = document.getElementById('query').value;
        const queryData = {
            name: username,
            email: userEmail.value,
            query: query
        }

            const baseUrl = "https://my-brand-api-x8z4.onrender.com/queries/sendquery";
            try{
                const res = await fetch(baseUrl, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(queryData)

                });

                if(res.ok){
                    location.reload()
                    alert("message sent successfully");
                    

                } else{
                    console.log("message not sent");
                }


            } catch(err){
                console.log(err);
            }

        }
        
    })
}



if (signupPassword){
    signupPassword.addEventListener('input', validatePassword );

}
// validate password

function validatePassword(){
    
    if (signupPassword.value.length >= 8
        && /[A-Z]/g.test(signupPassword.value) &&
        /[a-z]/g.test(signupPassword.value) && 
        /\d/g.test(signupPassword.value) &&
        /[#.?!@$%^&*\-_]/g.test(signupPassword.value)) {
        
        signupPassword.classList.remove('error');
        signupPassword.parentElement.classList.remove('error');


    } else {
        signupPassword.classList.add('error');
        signupPassword.parentElement.classList.add('error');
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





// add article to localStorage and delete

// if (publishBtn){
//     publishBtn.addEventListener('click', (e) => {
//         e.preventDefault();

//      //   let count = 1;
//         let data = {
//     //        id: count,
//             title: articleTitle.value,
//             story: article.value
//         };
        
//         const newArticles = JSON.parse(localStorage.getItem('data')) || [];
//         newArticles.push(data);
    
//         localStorage.setItem("data", JSON.stringify(newArticles));
//         newArticleContainer.innerHTML = ''
        
//         newArticles.forEach((articleData, index) => {
//             const post = document.createElement('div');
//             post.classList.add('new-blog');
        
//             post.innerHTML = `
//             <div class="blogs">
//                 <div class="new-article">
//                     <div class="blog-title">
//                         <a href="newblog.html" class="blog-link">${articleData.title}</a>
//                     </div>
//                     <p class="blog-story">${articleData.story}</p>

//                     <i class="fa-solid fa-heart" id="heart"></i>
//                     <span>0 Likes</span>

//                     <i class="fa-solid fa-comment"></i>
//                     <span>10 Comments</span>

//                     <i class="fa-solid fa-pen edit-button" data-index="${index}"></i>
//                     <span>Edit</span>

//                     <i class="fa-solid fa-trash delete-button" data-index="${index}"></i>
//                     <span>Delete</span>
//                 </div>
//             </div>`
            
    
    
//             newArticleContainer.appendChild(post);

//             hiddenPost.style.display = 'none';

//             const deleteBtn = post.querySelector('.delete-button');
//             if (deleteBtn) {
//                 deleteBtn.addEventListener('click', () => {
//                     post.remove();
//                     const deleteArticle = parseInt(deleteBtn.dataset.index);
//                     newArticles.splice(deleteArticle, 1);

//                     localStorage.setItem('data', JSON.stringify(newArticles));
                    
//                 })
//             }
//             const editBtn = post.querySelector('.edit-button');
//             editBtn.addEventListener('click', () => {
//                 hiddenPost.style.display = 'block';
//                 hiddenPost.dataset.index = index;
//                 articleTitle.value = articleData.title;
//                 article.value = articleData.story;

                
                    
            

//             });


//         });

//         article.value = '';
//         articleTitle.value = '';
//         hiddenPost.style.display = 'none';
//     });

    
// }




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
            return;
        } else if (emailValid.test(subscribeEmail.value)){
            fetch("https://my-brand-api-x8z4.onrender.com/subscribe", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: subscribeEmail.value})

            })

            .then(res => res.json())
            .then(data => {
                alert("Thank you for subscribing to my blog");
                window.location.reload();
            })

            .catch(err => {alert("Subscription failed. Try again later")})
                
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



// if (commentForm){

//     commentForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const params = new URLSearchParams(window.location.search);
//         const blogId = params.get('id');
        
//         let comment = {
//             name: commenterName.value,
//             comment: commentText.value
//         }

//         console.log(comment)

//         const newComments = JSON.parse(localStorage.getItem('comments')) || [];
//         newComments.push(commentObj);

//         localStorage.setItem('comments', JSON.stringify(newComments));
//         newCommentContainer.innerHTML = '';

//         newComments.forEach((comment, index) => {
//             const commentDiv = document.createElement('div');
//             commentDiv.classList.add('comment-div');

//             commentDiv.innerHTML = `<h5>${comment.commenter}</h5>
//             <p>${comment.commentText}</p>
//             <button class="button" data-index="${index}">delete</button>`

//             newCommentContainer.appendChild(commentDiv);

//             const deleteComment = commentDiv.querySelector('.button');
//             if(deleteComment){
//                 deleteComment.addEventListener('click', () => {
//                     const deleteIndex = parseInt(deleteComment.dataset.index);
//                     newComments.splice(deleteIndex, 1);

//                     localStorage.setItem('comments', JSON.stringify(newComments));
//                     commentDiv.remove();
//                 })
//             }

//         })

//         commenterName.value = '';
//         commentText.value = '';
//     })
// }









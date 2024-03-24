/*import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const fireBaseConfig = {
  apiKey: "AIzaSyCvS0RecZzs2Gd8-_NeVt9O0kNQAWKluis",
  authDomain: "my-brand-fe973.firebaseapp.com",
  projectId: "my-brand-fe973",
  storageBucket: "my-brand-fe973.appspot.com",
  messagingSenderId: "834585112260",
  appId: "1:834585112260:web:fb9b1627db86e7179c2391"
};

const app = initializeApp(fireBaseConfig);
const db = getDatabase(app);

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const signupEmail = document.getElementById('signup-email').value;
    const password = document.getElementById('passwordInput').value;
    

})


const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    const user = userCredential.user;
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

});*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD-kxm_qX16_HLmhbdmsGsB6H4ClEJxa5c",
    authDomain: "fir-db-240c8.firebaseapp.com",
    databaseURL: "https://fir-db-240c8-default-rtdb.firebaseio.com",
    projectId: "fir-db-240c8",
    storageBucket: "fir-db-240c8.appspot.com",
    messagingSenderId: "423859222661",
    appId: "1:423859222661:web:8b19b5f4459a845df8d1ec"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();


  const signupForm = document.getElementById('signup-form').value;
  const signupBtn = document.getElementById('submit-btn');

  signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('passwordInput').value;
    const fullName = document.getElementById('full-name').value;
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Creating Account...");
     
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
  })
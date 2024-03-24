import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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


  
  const loginBtn = document.getElementById('login-button');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password){
        alert("Please enter email and password");
        loginBtn.disabled = true;
        return;
    }

    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed In
    const user = userCredential.user;
    alert("Logging In...");
    loginBtn.disabled = false;
    window.location.href = 'adminpanel.html';

     
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    loginBtn.disabled = true;
    return;
    // ..
  });
  })
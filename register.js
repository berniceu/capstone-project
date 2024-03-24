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
  const db = getDatabase(app);

  const signupBtn = document.getElementById('submit-btn');

  signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('passwordInput').value;
    const fullName = document.getElementById('full-name').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)){
      alert("Please enter valid email address");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Signed up Successfully!");
    window.location.href = 'login.html';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
  })


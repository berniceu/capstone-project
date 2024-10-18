import { initializeApp } from 'firebase/app';
import { getDatabase } from ; 

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
// import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

const fireBaseConfig = {
    apiKey: "AIzaSyCvS0RecZzs2Gd8-_NeVt9O0kNQAWKluis",
  authDomain: "my-brand-fe973.firebaseapp.com",
  projectId: "my-brand-fe973",
  storageBucket: "my-brand-fe973.appspot.com",
  messagingSenderId: "834585112260",
  appId: "1:834585112260:web:fb9b1627db86e7179c2391"
};

const app = initializeApp(fireBaseConfig);

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    const user = userCredential.user;
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

});
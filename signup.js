const firebaseConfig = {
    apiKey: "AIzaSyD-kxm_qX16_HLmhbdmsGsB6H4ClEJxa5c",
    authDomain: "fir-db-240c8.firebaseapp.com",
    projectId: "fir-db-240c8",
    storageBucket: "fir-db-240c8.appspot.com",
    messagingSenderId: "423859222661",
    appId: "1:423859222661:web:8b19b5f4459a845df8d1ec"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();

  function register(){
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('passwordInput').value;
    const fullName = document.getElementById('full-name').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        let user = auth.currentUser;
        let dbRef = database.ref();
        let userData = {
            email: email,
            fullName: fullName,
            lastLogin: Date.now()
        }

        dbRef.child('users/' + user.uid).set(userData);
        alert('User created!');
    }).catch(function(err) {
        alert('Registration failed')
    })
  }
  
  

  function validateEmail(email){

  }

  function validatePassword(pwd){

  }



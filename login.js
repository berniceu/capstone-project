const loginForm = document.getElementById('login-form')
const loginBtn = document.getElementById('login-button');
const email = document.getElementById('email');
const password = document.getElementById('login-password');

loginBtn.addEventListener('click', async function(e) {
  e.preventDefault();

  const loginData = {
    email: email.value,
    password: password.value
  }

  const baseUrl = 'https://my-brand-api-x8z4.onrender.com/users/login';

  try{
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData)
    });

    

    if (res.ok){
      const data = await res.json();
      const userRole = data.role;

    if(userRole === 'admin'){
      window.location.href = 'adminpanel.html'
    } else{
      window.location.href = 'blogs.html';
    }

      alert('logged in successfully');
      
    } else {
      console.log('log in failed')
    }
  } catch(err){

    console.log(err)
  }
  


})



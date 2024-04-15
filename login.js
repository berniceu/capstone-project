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

  const baseUrl = 'http://localhost:5000/login';

  try{
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData)
    })

    if (res.ok){
      alert('logged in successfully');
      window.location.href = 'adminpanel.html'
    } else {
      console.log('log in failed')
    }
  } catch(err){

    console.log(err)
  }
  


})



const signupForm = document.getElementById("signup-form");
const errorText = document.querySelector('.error-text')

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("full-name");
  const email = document.getElementById("signup-email");
  const password = document.getElementById("passwordInput");

  const formData = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  };

  try {
    const res = await fetch("https://my-brand-api-x8z4.onrender.com/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if(errorText.style.display == 'block'){
      alert("Please fill out all fields correctly");
    }

    if (res.ok) {
      alert("Signed up successfully");
      window.location.href = "login.html";
    }
  } catch (err) {
    alert("Sign up failed");
  }
});

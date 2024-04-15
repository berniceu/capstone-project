const signupForm = document.getElementById("signup-form");

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
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Signed up successfully");
      window.location.href = "login.html";
    }
  } catch (err) {
    alert("Sign up failed");
  }
});

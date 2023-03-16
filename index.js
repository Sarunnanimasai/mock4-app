const Login = document.getElementById("login");
const Register = document.getElementById("register");
const LoginForm = document.getElementById("lform");
const RegisterForm = document.getElementById("lregister");

LoginForm.addEventListener("click", () => {
  Register.style.display = "none";
  Login.style.display = "grid";
  Login.style.gridTemplateColumns = "repeat(1,1fr)";
});

RegisterForm.addEventListener("click", () => {
  Login.style.display = "none";
  Register.style.display = "grid";
  Register.style.gridTemplateColumns = "repeat(1,1fr)";
  Register.style.gap = "12px";
});

function adminLogin() {
  const lemail = document.getElementById("lemail").value;
  const lpassword = document.getElementById("lpassword").value;

  const userData = {
    email: lemail,
    password: lpassword,
  };

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        alert("Login Successful");
        window.location.href = "./Admin/admin.html";
      } else {
        alert("Login Failed");
      }
    })
    .catch((error) => console.error(error));

  fetch("http://localhost:3004/users")
    .then((response) => response.json())
    .then((data) => {
      const user = data.find(
        (user) => user.remail === lemail && user.rpassword === lpassword
      );
      if (user) {
        alert("Login successful");
        window.location.href = "./HotelsPage/hotel.html";
      } else {
        alert("Invalid email or password");
      }
    })
    .catch((error) => console.error(error));
}

function register() {
  const ruser = document.getElementById("ruser").value;
  const remail = document.getElementById("remail").value;
  const rpassword = document.getElementById("rpassword").value;
  const rrpassword = document.getElementById("rrpassword").value;

  const userData = {
    ruser: ruser,
    remail: remail,
    rpassword: rpassword,
  };

  if (rpassword === rrpassword) {
    fetch("http://localhost:3004/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => alert("Succesfully Registered"))
      .catch((error) => console.error(error));
  } else {
    alert("Passwords do not match");
  }
}

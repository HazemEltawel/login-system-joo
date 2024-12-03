var signName = document.getElementById("sign-name");
var signEmail = document.getElementById("sign-email");
var signPassword = document.getElementById("sign-password");
var signIn = document.getElementById("signIn");
var logIn = document.getElementById("logIn");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var valdLogin = document.getElementById("vald-login");
var valdSignin = document.getElementById("vald-signin");

var userName;
var arrUser = [];
if (window.location.pathname == "/index.html") {
  clearinputLogin();
}
if (localStorage.getItem("users") != null) {
  arrUser = JSON.parse(localStorage.getItem("users"));
}
if (window.location.pathname.includes("/home.html")) {
  getuserName();
}
function createUser() {
  var objectUser = {
    name: signName.value,
    email: signEmail.value,
    password: signPassword.value,
  };
  if (
    signName.value != "" ||
    signEmail.value != "" ||
    signPassword.value != ""
  ) {
    if (arrUser.length == 0) {
      arrUser.push(objectUser);
      valdSignin.style.color = "#28a745";
      valdSignin.style.display = "block";
      valdSignin.innerHTML = "Sucsses";
    } else if (checkrepeatEmail() == true) {
      valdSignin.style.color = "#dc3545";
      valdSignin.style.display = "block";
      valdSignin.innerHTML = "email already exists";
    } else if (checkrepeatEmail() != true) {
      arrUser.push(objectUser);
      valdSignin.style.color = "#28a745";
      valdSignin.style.display = "block";
      valdSignin.innerHTML = "Sucsses";
    }
  } else {
    valdSignin.style.color = "#dc3545";
    valdSignin.style.display = "block";
    valdSignin.innerHTML = "All inputs is required";
  }
  localStorage.setItem("users", JSON.stringify(arrUser));
  clearinputSign();
}

function clearinputSign() {
  signName.value = "";
  signEmail.value = "";
  signPassword.value = "";
}
function clearinputLogin() {
  loginEmail.value = "";
  loginPassword.value = "";
}
function login() {
  if (loginEmail.value != "" || loginPassword.value != "") {
    for (let i = 0; i < arrUser.length; i++) {
      if (
        loginEmail.value == arrUser[i].email &&
        loginPassword.value == arrUser[i].password
      ) {
        window.location.pathname = window.location.pathname.replace(
          "/index.html",
          "/home.html"
        );
        // window.location.pathname = "/home.html";
        localStorage.setItem("username", JSON.stringify(arrUser[i].name));
        valdLogin.style.display = "none";
      } else {
        valdLogin.style.display = "block";
        valdLogin.innerHTML = "incorrect email or password";
      }
    }
  } else {
    valdLogin.style.display = "block";
    valdLogin.innerHTML = "All inputs is required";
  }
  clearinputLogin();
}
function getuserName() {
  userName = JSON.parse(localStorage.getItem("username"));
  document.getElementById("homeName").innerHTML = "Welcome " + `${userName}`;
}
function checkrepeatEmail() {
  for (let i = 0; i < arrUser.length; i++) {
    if (arrUser[i].email == signEmail.value) {
      return true;
    }
  }
}

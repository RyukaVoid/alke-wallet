// revisa si el usuario esta logeado
const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn == "false" || !isLoggedIn) {
  window.location.href = "../login/login.html";
}

let loginForm = document.getElementById('login-form');

function showAlert(message) {
    let alertBox = document.getElementById("alert-message");
    alertBox.innerText = message;
    alertBox.classList.remove('d-none');

    setTimeout(function() {
        alertBox.classList.add('d-none');
    }, 3000);
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let emailBD = localStorage.getItem('email');
    let passwordBD = localStorage.getItem('password');

    if(email === emailBD && password === passwordBD) {
        window.location.href = '../menu/menu.html';
    } else {
        showAlert('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
});
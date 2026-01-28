$(document).ready(function() {
    function showAlert(message) {
        let alertBox = $("#alert-message");
        alertBox.text(message);
        alertBox.removeClass('d-none');

        setTimeout(function() {
            alertBox.addClass('d-none');
        }, 3000);
    }

    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();

        let emailBD = localStorage.getItem('email');
        let passwordBD = localStorage.getItem('password');

        if(email === emailBD && password === passwordBD) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../menu/menu.html';
        } else {
            showAlert('Correo o contraseña incorrectos. Inténtalo de nuevo.');
        }
    });
});
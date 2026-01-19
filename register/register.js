
function showAlertValidations(validations, timeout = 3000) {
    let alertBox = document.getElementById("alert-message");
    
    let validationsHtml = '<ul>';
    validations.forEach(function(validation) {
        validationsHtml += '<li>' + validation + '</li>';
    });
    validationsHtml += '</ul>';

    alertBox.innerHTML = validationsHtml;
    alertBox.classList.remove('d-none');

    if (timeout > 0) {
        setTimeout(function() {
            alertBox.classList.add('d-none');
        }, timeout);
    }
}

function togglePasswordVisibility(passwordFieldId, eyeIconId) {
    const passwordField = document.getElementById(passwordFieldId);
    const eyeIcon = document.getElementById(eyeIconId);
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        passwordField.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    
    lucide.createIcons();
}

document.getElementById('togglePassword').addEventListener('click', function() {
    togglePasswordVisibility('password', 'eyeIcon');
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    togglePasswordVisibility('confirmPassword', 'eyeConfirmIcon');
});

let registerForm = document.getElementById("register-form");
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let termsAccepted = document.getElementById('termsAccepted').checked;
    let errors = [];

    let alertBox = document.getElementById("alert-message");
    alertBox.classList.add('d-none');
    alertBox.innerHTML = '';

    if (firstName.trim() === '') {
        errors.push('El nombre es obligatorio.');
    }

    if (lastName.trim() === '') {
        errors.push('El apellido es obligatorio.');
    }

    if (password !== confirmPassword) {
        errors.push('Las contraseñas no coinciden.');
    }

    if (!termsAccepted) {
        errors.push('Debes aceptar los términos y condiciones.');
    }

    // seguridad de la contraseña
    // debe tener 8 de largo minimo
    // una letra mayuscula
    // un numero
    // un caracter especial
    let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!passwordPattern.test(password)) {
        errors.push('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.');
    }

    if (errors.length > 0) {
        showAlertValidations(errors, 0);
        return;
    }

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    window.location.href = '../login/login.html';
});

let passwordField = document.getElementById('password');
passwordField.addEventListener('input', function() {
    let password = passwordField.value;
    let strengthBar = document.getElementById('password-strength-bar');
    let strengthText = document.getElementById('password-strength-text');
    
    if (password === '') {
        strengthBar.style.width = '0%';
        strengthBar.className = 'progress-bar';
        strengthText.textContent = '';
        return;
    }
    
    let score = 0;
    let criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[^\w\s]/.test(password)
    };
    
    // Calcular puntuación
    if (criteria.length) score += 25;
    if (criteria.uppercase) score += 25;
    if (criteria.number) score += 25;
    if (criteria.special) score += 25;
    
    // Determinar fortaleza y color
    let strengthMessage = '';
    let strengthClass = '';
    
    if (score < 50) {
        strengthMessage = 'Contraseña débil';
        strengthClass = 'progress-bar bg-danger';
    } else if (score < 75) {
        strengthMessage = 'Contraseña media';
        strengthClass = 'progress-bar bg-warning';
    } else if (score < 100) {
        strengthMessage = 'Contraseña buena';
        strengthClass = 'progress-bar bg-info';
    } else {
        strengthMessage = 'Contraseña fuerte';
        strengthClass = 'progress-bar bg-success';
    }
    
    // Actualizar visualización
    strengthBar.style.width = score + '%';
    strengthBar.className = strengthClass;
    strengthBar.setAttribute('aria-valuenow', score);
    strengthText.textContent = strengthMessage;
    strengthText.className = 'form-text fw-bold';
});
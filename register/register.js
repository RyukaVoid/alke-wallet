
function showAlertValidations(validations, timeout = 3000) {
    let alertBox = $('#alert-message');
    
    let validationsHtml = '<ul>';
    validations.forEach(function(validation) {
        validationsHtml += '<li>' + validation + '</li>';
    });
    validationsHtml += '</ul>';

    alertBox.html(validationsHtml);
    alertBox.removeClass('d-none');

    if (timeout > 0) {
        setTimeout(function() {
            alertBox.addClass('d-none');
        }, timeout);
    }
}

function togglePasswordVisibility(passwordFieldId, eyeIconId) {
    const passwordField = $('#' + passwordFieldId);
    const eyeIcon = $('#' + eyeIconId);
    
    if (passwordField.attr('type') === 'password') {
        passwordField.attr('type', 'text');
        eyeIcon.attr('data-lucide', 'eye-off');
    } else {
        passwordField.attr('type', 'password');
        eyeIcon.attr('data-lucide', 'eye');
    }
    
    lucide.createIcons();
}

$('#togglePassword').on('click', function() {
    togglePasswordVisibility('password', 'eyeIcon');
});

$('#toggleConfirmPassword').on('click', function() {
    togglePasswordVisibility('confirmPassword', 'eyeConfirmIcon');
});

$('#register-form').on('submit', function(event) {
    event.preventDefault();

    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    let termsAccepted = $('#termsAccepted').is(':checked');
    let errors = [];

    let alertBox = $('#alert-message');
    alertBox.addClass('d-none');
    alertBox.html('');

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

$('#password').on('input', function() {
    let password = $(this).val();
    let strengthBar = $('#password-strength-bar');
    let strengthText = $('#password-strength-text');
    
    if (password === '') {
        strengthBar.css('width', '0%');
        strengthBar.attr('class', 'progress-bar');
        strengthText.text('');
        return;
    }
    
    let score = 0;
    let criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[^\w\s]/.test(password)
    };
    
    if (criteria.length) score += 25;
    if (criteria.uppercase) score += 25;
    if (criteria.number) score += 25;
    if (criteria.special) score += 25;
    
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
    
    strengthBar.css('width', score + '%');
    strengthBar.attr('class', strengthClass);
    strengthBar.attr('aria-valuenow', score);
    strengthText.text(strengthMessage);
    strengthText.attr('class', 'form-text fw-bold');
});
const logoutBtn = document.getElementById('logout-button');
logoutBtn.addEventListener('click', function() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '../login/login.html';
});
// // DOM elements
// const loginForm = document.getElementById('loginForm');
// const registerForm = document.getElementById('registerForm');

// // Utility functions
// function showMessage(elementId, message, type) {
//     const messageElement = document.getElementById(elementId);
//     if (messageElement) {
//         messageElement.innerHTML = `<div class="${type}-message">${message}</div>`;
//     }
// }

// function clearMessages() {
//     const loginMessage = document.getElementById('loginMessage');
//     const registerMessage = document.getElementById('registerMessage');
//     if (loginMessage) loginMessage.innerHTML = '';
//     if (registerMessage) registerMessage.innerHTML = '';
// }
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        // Change to eye-off icon when password is visible
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    } else {
        passwordInput.type = 'password';
        // Change back to eye icon when password is hidden
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailGroup = email.closest('.form-group');
    const passwordGroup = password.closest('.form-group');
    
    let isValid = true;

    // Reset error states
    emailGroup.classList.remove('error');
    passwordGroup.classList.remove('error');

    // Validate email
    if (!email.value || !validateEmail(email.value)) {
        emailGroup.classList.add('error');
        isValid = false;
    }

    // Validate password
    if (!password.value || password.value.length < 6) {
        passwordGroup.classList.add('error');
        isValid = false;
    }

    return isValid;
}

function showForgotPassword() {
    alert('Forgot password functionality would be implemented here');
}

function showRegister() {
    alert('Registration page would be implemented here');
}

// Form submission handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const btn = document.querySelector('.login-btn');
    const btnText = document.querySelector('.btn-text');
    
    // Show loading state
    btn.classList.add('loading');
    btnText.textContent = 'Signing In...';

    // Simulate login process
    setTimeout(() => {
        btn.classList.remove('loading');
        btnText.textContent = 'Sign In';
        alert('Login functionality would be implemented here');
    }, 2000);
});

// Real-time validation
document.getElementById('email').addEventListener('blur', function() {
    const emailGroup = this.closest('.form-group');
    if (!this.value || !validateEmail(this.value)) {
        emailGroup.classList.add('error');
    } else {
        emailGroup.classList.remove('error');
    }
});

document.getElementById('password').addEventListener('blur', function() {
    const passwordGroup = this.closest('.form-group');
    if (!this.value || this.value.length < 6) {
        passwordGroup.classList.add('error');
    } else {
        passwordGroup.classList.remove('error');
    }
});
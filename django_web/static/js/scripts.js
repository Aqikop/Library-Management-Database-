// DOM elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');

// Sample user data storage (in a real app, this would be handled by a backend)
let users = JSON.parse(localStorage.getItem('users') || '[]');

// Switch between login and register forms
showRegisterLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    clearMessages();
});

showLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    clearMessages();
});

// Handle registration
registerFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    // Basic validation
    if (!name || !email || !password) {
        showMessage('registerMessage', 'Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('registerMessage', 'Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        showMessage('registerMessage', 'An account with this email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password // In a real app, this should be hashed
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage('registerMessage', 'Registration successful! You can now login.', 'success');
    
    // Clear form
    registerFormElement.reset();
    
    // Switch to login form after 2 seconds
    setTimeout(() => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        clearMessages();
    }, 2000);
});

// Handle login
loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Basic validation
    if (!email || !password) {
        showMessage('loginMessage', 'Please fill in all fields', 'error');
        return;
    }
    
    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        showMessage('loginMessage', `Welcome back, ${user.name}!`, 'success');
        
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Clear form
        loginFormElement.reset();
        
        // In a real app, you would redirect to a dashboard or home page
        setTimeout(() => {
            alert(`Login successful! Welcome ${user.name}!`);
        }, 1000);
        
    } else {
        showMessage('loginMessage', 'Invalid email or password', 'error');
    }
});

// Forgot password functionality
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    const email = prompt('Please enter your email address:');
    
    if (email) {
        const user = users.find(user => user.email === email);
        if (user) {
            alert(`Password reset link sent to ${email}. (In a real app, this would send an actual email)`);
        } else {
            alert('No account found with this email address.');
        }
    }
});

// Utility functions
function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    messageElement.innerHTML = `<div class="${type}-message">${message}</div>`;
}

function clearMessages() {
    document.getElementById('loginMessage').innerHTML = '';
    document.getElementById('registerMessage').innerHTML = '';
}

// Check if user is already logged in when page loads
window.addEventListener('load', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
        showMessage('loginMessage', `Welcome back, ${currentUser.name}! You are already logged in.`, 'success');
    }
});

// Add some demo users for testing (remove this in production)
// if (users.length === 0) {
//     users = [
//         {
//             id: 1,
//             name: "Demo User",
//             email: "demo@example.com",
//             password: "123456"
//         }
//     ];
//     localStorage.setItem('users', JSON.stringify(users));
// }
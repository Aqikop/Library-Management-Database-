// DOM elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Utility functions
function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.innerHTML = `<div class="${type}-message">${message}</div>`;
    }
}

function clearMessages() {
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');
    if (loginMessage) loginMessage.innerHTML = '';
    if (registerMessage) registerMessage.innerHTML = '';
}
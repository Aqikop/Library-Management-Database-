// Password Reset JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeFormHandling();
    initializePasswordStrength();
    initializeToasts();
    initializeAutoRedirect();
    initializeAnimations();
});

// Form handling and validation
function initializeFormHandling() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add input validation
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', validateInput);
            input.addEventListener('blur', validateInput);
        });
    });
    
    // Email validation for password reset form
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
    }
}

// Handle form submission with loading states
function handleFormSubmit(e) {
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!validateForm(form)) {
        e.preventDefault();
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    form.classList.add('form-loading');
    
    // In a real implementation, this would be handled by Django
    // This is just for demo purposes
    setTimeout(() => {
        setLoadingState(submitBtn, false);
        form.classList.remove('form-loading');
    }, 3000);
}

// Set button loading state
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual input
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing error
    removeError(input);
    
    // Check required fields
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Password validation
    if (input.type === 'password' && value) {
        if (input.name.includes('password1') || input.id.includes('new-password')) {
            const strengthResult = checkPasswordStrength(value);
            updatePasswordStrength(strengthResult);
            updatePasswordRequirements(value);
            
            if (strengthResult.strength < 3) {
                isValid = false;
                message = 'Password is too weak';
            }
        }
        
        // Confirm password validation
        if (input.name.includes('password2') || input.id.includes('confirm-password')) {
            const password1 = document.querySelector('input[name*="password1"], input[id*="new-password"]');
            if (password1 && value !== password1.value) {
                isValid = false;
                message = 'Passwords do not match';
            }
        }
    }
    
    // Show error if invalid
    if (!isValid && message) {
        showError(input, message);
    }
    
    return isValid;
}

// Email-specific validation
function validateEmail(e) {
    const input = e.target;
    const value = input.value.trim();
    
    if (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            input.style.borderColor = '#28a745';
            showToast('Valid email address', 'success');
        } else {
            input.style.borderColor = '#dc3545';
        }
    }
}

// Show input error
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    input.style.borderColor = '#dc3545';
}

// Remove input error
function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.style.borderColor = '#e1e5e9';
}

// Password strength checking
function initializePasswordStrength() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        if (input.name.includes('password1') || input.id.includes('new-password')) {
            input.addEventListener('input', (e) => {
                const strength = checkPasswordStrength(e.target.value);
                updatePasswordStrength(strength);
                updatePasswordRequirements(e.target.value);
                
                // Show strength indicator
                const strengthDiv = document.querySelector('.password-strength');
                if (strengthDiv) {
                    strengthDiv.style.display = e.target.value ? 'block' : 'none';
                }
            });
        }
    });
}

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength += 1;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('Lowercase letter');
    
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('Uppercase letter');
    
    if (/\d/.test(password)) strength += 1;
    else feedback.push('Number');
    
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    else feedback.push('Special character');
    
    return {
        strength,
        feedback,
        level: strength < 2 ? 'weak' : strength < 4 ? 'medium' : 'strong'
    };
}

// Update password strength indicator
function updatePasswordStrength(result) {
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (strengthFill && strengthText) {
        strengthFill.style.width = `${(result.strength / 5) * 100}%`;
        strengthFill.className = `strength-fill ${result.level}`;
        
        if (result.feedback.length === 0) {
            strengthText.textContent = `Password strength: ${result.level}`;
        } else {
            strengthText.textContent = `Missing: ${result.feedback.join(', ')}`;
        }
    }
}

// Update password requirements checklist
function updatePasswordRequirements(password) {
    const requirements = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[^a-zA-Z0-9]/.test(password)
    };
    
    Object.keys(requirements).forEach(req => {
        const element = document.querySelector(`[data-requirement="${req}"]`);
        if (element) {
            if (requirements[req]) {
                element.classList.add('valid');
                element.querySelector('i').className = 'fas fa-check';
            } else {
                element.classList.remove('valid');
                element.querySelector('i').className = 'fas fa-times';
            }
        }
    });
}

// Toast notification system
function initializeToasts() {
    window.showToast = showToast;
}

function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-message">
                <p>${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Auto redirect functionality
function initializeAutoRedirect() {
    const countdownElement = document.getElementById('countdown');
    const cancelButton = document.getElementById('cancel-redirect');
    const loginUrl = document.querySelector('a[href*="login"]')?.href;
    
    if (countdownElement && loginUrl) {
        let timeLeft = 10;
        let redirectTimer;
        let countdownTimer;
        
        function updateCountdown() {
            countdownElement.textContent = timeLeft;
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(countdownTimer);
                window.location.href = loginUrl;
            }
        }
        
        function startRedirect() {
            countdownTimer = setInterval(updateCountdown, 1000);
        }
        
        function cancelRedirect() {
            clearInterval(countdownTimer);
            document.querySelector('.auto-redirect').style.display = 'none';
            showToast('Auto-redirect cancelled', 'info');
        }
        
        // Start countdown
        startRedirect();
        
        // Cancel redirect button
        if (cancelButton) {
            cancelButton.addEventListener('click', cancelRedirect);
        }
        
        // Pause on hover
        const autoRedirectDiv = document.querySelector('.auto-redirect');
        if (autoRedirectDiv) {
            autoRedirectDiv.addEventListener('mouseenter', () => {
                clearInterval(countdownTimer);
            });
            
            autoRedirectDiv.addEventListener('mouseleave', () => {
                if (timeLeft >= 0) {
                    countdownTimer = setInterval(updateCountdown, 1000);
                }
            });
        }
    }
}

// Animation effects
function initializeAnimations() {
    // Add pulse effect to success icons
    const successIcons = document.querySelectorAll('.auth-icon.success');
    successIcons.forEach(icon => {
        icon.classList.add('pulse');
    });
    
    // Animate form elements on load
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
    
    // Animate buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(0)';
            }
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter to submit form
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const form = e.target.closest('form');
        if (form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    }
    
    // Escape to cancel auto-redirect
    if (e.key === 'Escape') {
        const cancelBtn = document.getElementById('cancel-redirect');
        if (cancelBtn) {
            cancelBtn.click();
        }
    }
});

// Focus management
document.addEventListener('DOMContentLoaded', () => {
    // Auto-focus first input
    const firstInput = document.querySelector('input:not([type="hidden"])');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
});

// Form persistence (save form data locally)
function saveFormData() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input:not([type="password"])');
        inputs.forEach(input => {
            if (input.value) {
                localStorage.setItem(`form_${input.name || input.id}`, input.value);
            }
        });
    });
}

function loadFormData() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input:not([type="password"])');
        inputs.forEach(input => {
            const savedValue = localStorage.getItem(`form_${input.name || input.id}`);
            if (savedValue) {
                input.value = savedValue;
            }
        });
    });
}

// Initialize form persistence
document.addEventListener('DOMContentLoaded', loadFormData);
window.addEventListener('beforeunload', saveFormData);

// Success sound effect (optional)
function playSuccessSound() {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Audio not available');
        }
    }
}

// Play success sound on complete page
if (window.location.pathname.includes('complete')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(playSuccessSound, 500);
    });
}

// Console messages for developers
console.log('🔐 Password Reset System Loaded');
console.log('🎯 Features: Form validation, password strength, auto-redirect, animations');
console.log('⌨️  Shortcuts: Enter to submit, Escape to cancel redirect');
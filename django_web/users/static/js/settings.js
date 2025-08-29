// User settings data structure
let userSettings = {
    profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        birthDate: '1990-01-01',
        gender: 'male',
        bio: 'Avid reader and book enthusiast. Love exploring different genres and discovering new authors.',
        location: 'New York, USA',
        avatar: 'default-1'
    },
    preferences: {
        favoriteGenres: ['fiction', 'mystery', 'sci-fi'],
        readingGoal: 24,
        formatPreference: 'mixed',
        publicReadingList: true
    },
    privacy: {
        profileVisibility: true,
        activityVisibility: true,
        reviewVisibility: true
    },
    notifications: {
        emailReminders: true,
        emailRecommendations: false,
        emailEvents: true,
        browserReminders: true,
        browserUpdates: false
    }
};

// Default avatar options
const defaultAvatars = [
    { id: 'default-1', icon: 'fas fa-user', color: '#3498db' },
    { id: 'default-2', icon: 'fas fa-user-tie', color: '#2c5aa0' },
    { id: 'default-3', icon: 'fas fa-user-graduate', color: '#9b59b6' },
    { id: 'default-4', icon: 'fas fa-user-astronaut', color: '#e74c3c' },
    { id: 'default-5', icon: 'fas fa-user-ninja', color: '#34495e' },
    { id: 'default-6', icon: 'fas fa-cat', color: '#f39c12' },
    { id: 'default-7', icon: 'fas fa-dragon', color: '#27ae60' },
    { id: 'default-8', icon: 'fas fa-robot', color: '#95a5a6' }
];

// DOM Elements
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');
const profileForm = document.getElementById('profile-form');
const preferencesForm = document.getElementById('preferences-form');
const privacyForm = document.getElementById('privacy-form');
const notificationsForm = document.getElementById('notifications-form');
const avatarPreview = document.getElementById('avatar-preview');
const avatarGrid = document.getElementById('avatar-grid');
const avatarUpload = document.getElementById('avatar-upload');
const uploadArea = document.getElementById('upload-area');
const uploadBtn = document.getElementById('upload-btn');
const removeAvatarBtn = document.getElementById('remove-avatar');
const confirmationModal = document.getElementById('confirmation-modal');

// Initialize settings page
document.addEventListener('DOMContentLoaded', () => {
    loadUserSettings();
    setupEventListeners();
    generateAvatarGrid();
    loadSavedSettings();
});

// Setup all event listeners
function setupEventListeners() {
    // Tab navigation
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(tab.dataset.tab);
        });
    });

    // Form submissions
    profileForm.addEventListener('submit', handleProfileSubmit);
    preferencesForm.addEventListener('submit', handlePreferencesSubmit);
    privacyForm.addEventListener('submit', handlePrivacySubmit);
    notificationsForm.addEventListener('submit', handleNotificationsSubmit);

    // Avatar upload
    uploadBtn.addEventListener('click', () => avatarUpload.click());
    avatarUpload.addEventListener('change', handleAvatarUpload);
    removeAvatarBtn.addEventListener('click', removeAvatar);

    // Drag and drop for avatar upload
    setupDragAndDrop();

    // Dangerous actions
    document.getElementById('change-password-btn').addEventListener('click', handleChangePassword);
    document.getElementById('export-data-btn').addEventListener('click', handleExportData);
    document.getElementById('clear-history-btn').addEventListener('click', handleClearHistory);
    document.getElementById('delete-account-btn').addEventListener('click', handleDeleteAccount);

    // Modal controls
    document.getElementById('confirm-btn').addEventListener('click', handleModalConfirm);
    document.getElementById('cancel-btn').addEventListener('click', hideModal);

    // Cancel buttons
    document.getElementById('cancel-profile').addEventListener('click', () => {
        loadUserSettings();
        showMessage('Changes cancelled', 'info');
    });

    // Auto-save functionality
    setupAutoSave();
}

// Switch between settings tabs
function switchTab(tabName) {
    // Update active tab
    settingsTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Show corresponding panel
    settingsPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `${tabName}-panel`);
    });

    // Update URL hash
    window.location.hash = tabName;
}

// Load user settings into forms
function loadUserSettings() {
    // Profile form
    if (profileForm) {
        document.getElementById('first-name').value = userSettings.profile.firstName;
        document.getElementById('last-name').value = userSettings.profile.lastName;
        document.getElementById('email').value = userSettings.profile.email;
        document.getElementById('phone').value = userSettings.profile.phone || '';
        document.getElementById('birth-date').value = userSettings.profile.birthDate || '';
        document.getElementById('gender').value = userSettings.profile.gender || '';
        document.getElementById('bio').value = userSettings.profile.bio || '';
        document.getElementById('location').value = userSettings.profile.location || '';
    }

    // Preferences form
    if (preferencesForm) {
        // Favorite genres
        userSettings.preferences.favoriteGenres.forEach(genre => {
            const checkbox = document.querySelector(`input[name="genres"][value="${genre}"]`);
            if (checkbox) checkbox.checked = true;
        });

        document.getElementById('reading-goal').value = userSettings.preferences.readingGoal || '';
        
        // Format preference
        const formatRadio = document.querySelector(`input[name="format"][value="${userSettings.preferences.formatPreference}"]`);
        if (formatRadio) formatRadio.checked = true;

        document.getElementById('public-reading-list').checked = userSettings.preferences.publicReadingList;
    }

    // Privacy form
    if (privacyForm) {
        document.getElementById('profile-visibility').checked = userSettings.privacy.profileVisibility;
        document.getElementById('activity-visibility').checked = userSettings.privacy.activityVisibility;
        document.getElementById('review-visibility').checked = userSettings.privacy.reviewVisibility;
    }

    // Notifications form
    if (notificationsForm) {
        document.getElementById('email-reminders').checked = userSettings.notifications.emailReminders;
        document.getElementById('email-recommendations').checked = userSettings.notifications.emailRecommendations;
        document.getElementById('email-events').checked = userSettings.notifications.emailEvents;
        document.getElementById('browser-reminders').checked = userSettings.notifications.browserReminders;
        document.getElementById('browser-updates').checked = userSettings.notifications.browserUpdates;
    }

    // Update avatar
    updateAvatarDisplay();
}

// Handle profile form submission
function handleProfileSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(profileForm);
    
    userSettings.profile = {
        ...userSettings.profile,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        birthDate: formData.get('birthDate'),
        gender: formData.get('gender'),
        bio: formData.get('bio'),
        location: formData.get('location')
    };

    saveSettings();
    showMessage('Profile updated successfully!', 'success');
}

// Handle preferences form submission
function handlePreferencesSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(preferencesForm);
    const favoriteGenres = Array.from(document.querySelectorAll('input[name="genres"]:checked'))
        .map(checkbox => checkbox.value);
    
    userSettings.preferences = {
        ...userSettings.preferences,
        favoriteGenres,
        readingGoal: parseInt(formData.get('readingGoal')) || 0,
        formatPreference: formData.get('format') || 'mixed',
        publicReadingList: document.getElementById('public-reading-list').checked
    };

    saveSettings();
    showMessage('Reading preferences updated!', 'success');
}

// Handle privacy form submission
function handlePrivacySubmit(e) {
    e.preventDefault();
    
    userSettings.privacy = {
        profileVisibility: document.getElementById('profile-visibility').checked,
        activityVisibility: document.getElementById('activity-visibility').checked,
        reviewVisibility: document.getElementById('review-visibility').checked
    };

    saveSettings();
    showMessage('Privacy settings updated!', 'success');
}

// Handle notifications form submission
function handleNotificationsSubmit(e) {
    e.preventDefault();
    
    userSettings.notifications = {
        emailReminders: document.getElementById('email-reminders').checked,
        emailRecommendations: document.getElementById('email-recommendations').checked,
        emailEvents: document.getElementById('email-events').checked,
        browserReminders: document.getElementById('browser-reminders').checked,
        browserUpdates: document.getElementById('browser-updates').checked
    };

    saveSettings();
    showMessage('Notification settings updated!', 'success');
}

// Generate avatar grid
function generateAvatarGrid() {
    if (!avatarGrid) return;

    avatarGrid.innerHTML = defaultAvatars.map(avatar => `
        <div class="avatar-option ${avatar.id === userSettings.profile.avatar ? 'selected' : ''}" 
             data-avatar="${avatar.id}" 
             style="background-color: ${avatar.color}20; color: ${avatar.color};"
             onclick="selectAvatar('${avatar.id}')">
            <i class="${avatar.icon}"></i>
        </div>
    `).join('');
}

// Select avatar
function selectAvatar(avatarId) {
    userSettings.profile.avatar = avatarId;
    updateAvatarDisplay();
    
    // Update selection in grid
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.avatar === avatarId);
    });

    saveSettings();
    showMessage('Avatar updated!', 'success');
}

// Update avatar display
function updateAvatarDisplay() {
    if (!avatarPreview) return;

    const avatar = defaultAvatars.find(a => a.id === userSettings.profile.avatar) || defaultAvatars[0];
    
    if (userSettings.profile.customAvatar) {
        avatarPreview.style.backgroundImage = `url(${userSettings.profile.customAvatar})`;
        avatarPreview.innerHTML = '';
    } else {
        avatarPreview.style.backgroundImage = 'none';
        avatarPreview.style.backgroundColor = `${avatar.color}20`;
        avatarPreview.style.color = avatar.color;
        avatarPreview.innerHTML = `<i class="${avatar.icon}"></i>`;
    }
}

// Handle avatar upload
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB
        showMessage('File size must be less than 5MB', 'error');
        return;
    }

    if (!file.type.startsWith('image/')) {
        showMessage('Please select an image file', 'error');
        return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        userSettings.profile.customAvatar = e.target.result;
        updateAvatarDisplay();
        saveSettings();
        showMessage('Avatar uploaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

// Remove avatar
function removeAvatar() {
    userSettings.profile.customAvatar = null;
    userSettings.profile.avatar = 'default-1';
    updateAvatarDisplay();
    generateAvatarGrid();
    saveSettings();
    showMessage('Avatar removed', 'info');
}

// Setup drag and drop
function setupDragAndDrop() {
    if (!uploadArea) return;

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            avatarUpload.files = files;
            handleAvatarUpload({ target: { files } });
        }
    });

    uploadArea.addEventListener('click', () => {
        avatarUpload.click();
    });
}

// Dangerous actions with confirmation
let pendingAction = null;

function handleChangePassword() {
    showConfirmationModal(
        'Change Password',
        'Are you sure you want to change your password? You will need to log in again.',
        () => {
            // In a real app, this would make an API call
            showMessage('Password change request sent to your email', 'info');
        }
    );
}

function handleExportData() {
    const userData = {
        profile: userSettings.profile,
        preferences: userSettings.preferences,
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `library-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Data exported successfully!', 'success');
}

function handleClearHistory() {
    showConfirmationModal(
        'Clear Reading History',
        'This will permanently delete all your reading history, reviews, and book ratings. This action cannot be undone.',
        () => {
            // In a real app, this would clear the user's reading data
            localStorage.removeItem('userBooks');
            showMessage('Reading history cleared', 'info');
        }
    );
}

function handleDeleteAccount() {
    showConfirmationModal(
        'Delete Account',
        'This will permanently delete your account and all associated data. This action cannot be undone.',
        () => {
            // In a real app, this would delete the user's account
            localStorage.clear();
            alert('Account deleted. Redirecting to homepage...');
            window.location.href = 'index.html';
        }
    );
}

// Modal functions
function showConfirmationModal(title, message, confirmCallback) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    pendingAction = confirmCallback;
    confirmationModal.style.display = 'block';
}

function handleModalConfirm() {
    if (pendingAction) {
        pendingAction();
        pendingAction = null;
    }
    hideModal();
}

function hideModal() {
    confirmationModal.style.display = 'none';
    pendingAction = null;
}

// Show messages
function showMessage(text, type = 'info') {
    // Remove existing messages
    document.querySelectorAll('.message').forEach(msg => msg.remove());

    const message = document.createElement('div');
    message.className = `message ${type}`;
    
    const icon = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    }[type] || 'fas fa-info-circle';

    message.innerHTML = `<i class="${icon}"></i> ${text}`;

    // Insert at the top of the active panel
    const activePanel = document.querySelector('.settings-panel.active');
    if (activePanel) {
        activePanel.insertBefore(message, activePanel.firstChild);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

// Load saved settings
function loadSavedSettings() {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
        try {
            userSettings = { ...userSettings, ...JSON.parse(saved) };
        } catch (e) {
            console.error('Error loading saved settings:', e);
        }
    }
}

// Auto-save functionality
function setupAutoSave() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type !== 'file') {
            input.addEventListener('change', () => {
                // Debounced auto-save
                clearTimeout(window.autoSaveTimeout);
                window.autoSaveTimeout = setTimeout(() => {
                    saveSettings();
                    console.log('Settings auto-saved');
                }, 1000);
            });
        }
    });
}

// Handle URL hash for direct tab access
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.querySelector(`[data-tab="${hash}"]`)) {
        switchTab(hash);
    }
});

// Load tab from URL hash on page load
if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (document.querySelector(`[data-tab="${hash}"]`)) {
        switchTab(hash);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape' && confirmationModal.style.display === 'block') {
        hideModal();
    }
    
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const activePanel = document.querySelector('.settings-panel.active');
        if (activePanel) {
            const form = activePanel.querySelector('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
});

// Form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
        form.addEventListener('input', (e) => {
            validateField(e.target);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    switch (field.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            message = isValid ? '' : 'Please enter a valid email address';
            break;
        case 'tel':
            if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            break;
    }

    // Update field styling
    field.classList.toggle('invalid', !isValid);
    
    // Show/hide error message
    let errorMsg = field.parentNode.querySelector('.error-message');
    if (!isValid && message) {
        if (!errorMsg) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#dc3545';
            field.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    } else if (errorMsg) {
        errorMsg.remove();
    }

    return isValid;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', setupFormValidation);

// Welcome message
console.log('⚙️ Settings page loaded successfully!');
// DOM Elements
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');

// Initialize settings page
document.addEventListener('DOMContentLoaded', () => {
    setupTabNavigation();
});

// Setup tab navigation
function setupTabNavigation() {
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

// Switch between settings tabs
function switchTab(tabName) {
    // Update active tab
    settingsTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Show corresponding panel
    settingsPanels.forEach(panel => {
        if (panel.id === `${tabName}-panel`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    // Update URL hash
    window.location.hash = tabName;
}

// Handle URL hash for direct tab access
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
        switchTab(hash);
    }
});

// Load tab from URL hash on page load
if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    switchTab(hash);
}
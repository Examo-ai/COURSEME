// Auth state management
const AUTH_KEY = 'courseme_auth';
const THEME_KEY = 'theme';

// Initialize theme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateThemeIcon(savedTheme === 'dark-theme');
    } else {
        const isDark = prefersDarkScheme.matches;
        document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
        updateThemeIcon(isDark);
    }
}

function updateThemeIcon(isDark) {
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    document.body.classList.remove(isDark ? 'dark-theme' : 'light-theme');
    document.body.classList.add(isDark ? 'light-theme' : 'dark-theme');
    localStorage.setItem(THEME_KEY, isDark ? 'light-theme' : 'dark-theme');
    updateThemeIcon(!isDark);
});

// Login handling
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const errorMessage = document.querySelector('.error-message');
const submitBtn = loginForm.querySelector('.submit-btn');
const spinner = submitBtn.querySelector('.fa-spinner');
const btnText = submitBtn.querySelector('span');

async function handleLogin(e) {
    e.preventDefault();
    const password = passwordInput.value.trim();
    
    // Show loading state
    spinner.style.display = 'inline-block';
    btnText.textContent = 'Signing in...';
    submitBtn.disabled = true;
    errorMessage.style.display = 'none';

    try {
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (password === '12345678') { // Changed password here
            localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true }));
            window.location.href = 'dashboard.html';
        } else {
            throw new Error('Invalid password');
        }
    } catch (error) {
        errorMessage.style.display = 'block';
        loginForm.classList.add('shake');
        
        // Remove shake class after animation
        setTimeout(() => {
            loginForm.classList.remove('shake');
        }, 500);
        
        passwordInput.value = '';
        passwordInput.focus();
    } finally {
        // Reset button state
        spinner.style.display = 'none';
        btnText.textContent = 'Sign In';
        submitBtn.disabled = false;
    }
}

// Check if user is already authenticated
function checkAuth() {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) {
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    const isAuthenticated = JSON.parse(auth).isAuthenticated;
    if (isAuthenticated && !window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'dashboard.html';
    }
    return isAuthenticated;
}

// Event listeners
loginForm.addEventListener('submit', handleLogin);
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    checkAuth();
});

// Handle system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
        const isDark = e.matches;
        document.body.classList.remove(isDark ? 'light-theme' : 'dark-theme');
        document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
        updateThemeIcon(isDark);
    }
});
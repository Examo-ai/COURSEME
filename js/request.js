// Theme Management
const THEME_KEY = 'theme';
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

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    document.body.classList.remove(isDark ? 'dark-theme' : 'light-theme');
    document.body.classList.add(isDark ? 'light-theme' : 'dark-theme');
    localStorage.setItem(THEME_KEY, isDark ? 'light-theme' : 'dark-theme');
    updateThemeIcon(!isDark);
});

// Form handling
const requestForm = document.getElementById('requestForm');
const successMessage = document.querySelector('.success-message');
const submitBtn = requestForm.querySelector('.submit-btn');
const spinner = submitBtn.querySelector('.fa-spinner');
const btnText = submitBtn.querySelector('span');

async function handleRequest(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: requestForm.name.value.trim(),
        email: requestForm.email.value.trim(),
        reason: requestForm.reason.value.trim()
    };
    
    // Show loading state
    spinner.style.display = 'inline-block';
    btnText.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store request in localStorage (in a real app, this would be sent to a server)
        const requests = JSON.parse(localStorage.getItem('access_requests') || '[]');
        requests.push({
            ...formData,
            timestamp: new Date().toISOString(),
            status: 'pending'
        });
        localStorage.setItem('access_requests', JSON.stringify(requests));
        
        // Show success message
        requestForm.style.display = 'none';
        successMessage.style.display = 'block';
        
    } catch (error) {
        alert('An error occurred. Please try again.');
        submitBtn.disabled = false;
        btnText.textContent = 'Submit Request';
        spinner.style.display = 'none';
    }
}

// Event listeners
requestForm.addEventListener('submit', handleRequest);
document.addEventListener('DOMContentLoaded', initializeTheme);

// Handle system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
        const isDark = e.matches;
        document.body.classList.remove(isDark ? 'light-theme' : 'dark-theme');
        document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
        updateThemeIcon(isDark);
    }
});
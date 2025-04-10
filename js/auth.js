// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Valid access codes (including our default code)
const validCodes = ['12345678'];

// Check if user is authenticated
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (!isAuthenticated && !window.location.href.includes('index.html') && !window.location.href.includes('login.html')) {
        window.location.href = '../login.html';
    }
}

// Handle login
function login(accessCode) {
    if (validCodes.includes(accessCode)) {
        sessionStorage.setItem('authenticated', 'true');
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
}

// Handle logout
function logout() {
    sessionStorage.removeItem('authenticated');
    window.location.href = '../index.html';
}

// Generate random access code
function generateAccessCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Handle access request
async function handleAccessRequest(email, reason) {
    const accessCode = generateAccessCode();
    validCodes.push(accessCode); // In a real app, this would be stored in a database

    try {
        const templateParams = {
            to_email: email,
            access_code: accessCode,
            message: `Your access code for COURSEME is: ${accessCode}\n\nYou can now log in to access your courses.`
        };

        await emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            templateParams
        );

        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const accessForm = document.getElementById('access-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const accessCode = document.getElementById('access-code').value;
            if (!login(accessCode)) {
                alert('Invalid access code. Please try again.');
            }
        });
    }

    if (accessForm) {
        accessForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const reason = document.getElementById('reason').value;

            const success = await handleAccessRequest(email, reason);
            if (success) {
                alert('Access code has been sent to your email!');
                accessForm.reset();
            } else {
                alert('Failed to process your request. Please try again.');
            }
        });
    }
});
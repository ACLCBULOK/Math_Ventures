// Store users in localStorage
let users = JSON.parse(localStorage.getItem('users')) || { teachers: [], students: [] };

// Ensure users object structure is correct
if (!users.teachers) users.teachers = [];
if (!users.students) users.students = [];

function showRegisterForm(role) {
    console.log('Showing register form for:', role); // Debugging line
    document.getElementById('roleSelection').classList.add('hidden');
    document.getElementById(role + 'RegisterForm').classList.remove('hidden');
    document.getElementById(role + 'RegisterForm').classList.remove('hidden');
}

function toggleForms(type) {
    console.log('Toggling forms to show:', type); // Debugging line
    document.getElementById('roleSelection').classList.add('hidden');
    document.getElementById('teacherRegisterForm').classList.add('hidden');
    document.getElementById('studentRegisterForm').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('welcomeMessage').classList.add('hidden');

    // Show the requested form
    if (type === 'role') {
        document.getElementById('roleSelection').classList.remove('hidden');
    } else if (type === 'login') {
        document.getElementById('loginForm').classList.remove('hidden');
    }
}

function handleRegister(event, role) {
    event.preventDefault();
    
    console.log('Registering user with role:', role); // Debugging line
    console.log('Registering user with role:', role); // Debugging line
    const username = document.getElementById(role + 'Username').value;
    console.log('Registering user with role:', role); // Debugging line
    const email = document.getElementById(role + 'Email').value;
    const password = document.getElementById(role + 'Password').value;
    const confirmPassword = document.getElementById(role + 'ConfirmPassword').value;

    // Clear previous error messages
    clearErrors();

    // Validate passwords match
    if (password !== confirmPassword) {
        showError(role + 'ConfirmPassword', 'Passwords do not match');
        return false;
    }

    console.log('Users:', users); // Debugging line to check users object
    if (users.teachers.some(user => user.email === email) || 
        users.students.some(user => user.email === email)) {
        showError(role + 'Email', 'Email already registered');
        return false;
    }

    // Validate password
    if (role === 'teacher' && password !== 'ACLCTAYTAY') {
        showError(role + 'Password', 'Invalid password. The password will given by the administrator".');
        return false;
    }

    users[role + 's'].push({
        username,
        email,
        password
    });
    localStorage.setItem('users', JSON.stringify(users));

    // Clear form
    document.getElementById(role + 'Registration').reset();

    // Show success message
    alert('Registration successful! Please login.');
    toggleForms('login');
    return false;
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Clear previous error messages
    clearErrors();

    // Check credentials
    const user = users.teachers.find(u => u.email === email && u.password === password) || 
                 users.students.find(u => u.email === email && u.password === password);

    if (!user) {
        showError('loginEmail', 'Invalid email or password');
        return false;
    }

    // Store logged in user
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Show welcome message and start the game
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeText = user.role === 'teacher' ;
    const welcomeText1 = user.role === 'student' ;
    welcomeMessage.querySelector('h2').textContent = welcomeText;
    welcomeMessage.querySelector('h2').textContent = welcomeText1;
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('welcomeMessage').classList.remove('hidden');
    return false;
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    document.getElementById('welcomeMessage').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('login').reset();
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
}

// Check if user is already logged in
window.onload = function() {
    console.log('Page loaded, checking for current user...'); // Debugging line
    const currentUser = window.localStoragerrentUser
    if (currentUser) {
        document.getElementById('roleSelection').classList.add('hidden');
        document.getElementById('welcomeMessage').classList.remove('hidden');
    }
};

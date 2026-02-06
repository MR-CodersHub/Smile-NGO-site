window.initAuthUI = function () {
    const user = JSON.parse(localStorage.getItem('smile_logged_in_user'));
    // Auth UI is now handled by layout.js 'updateAuthUI'
};

window.login = function (email, password) {
    if (!email || !password) {
        alert('Please enter credentials.');
        return;
    }

    let user = null;

    // Admin credentials check (Hardcoded override as per instructions)
    if (email === 'admin@gmail.com' && password === 'admin123') {
        user = { name: 'Admin User', email: email, role: 'admin' };
    } else {
        // Check registered users in DataManager
        const users = DataManager.getUsers();
        const existingUser = users.find(u => u.email === email && u.password === password);

        if (existingUser) {
            user = existingUser;
        } else {
            // LOGIN FAILED
            alert('Invalid credentials. Please sign up if you do not have an account.');
            return;
        }
    }

    // Set session directly
    localStorage.setItem('smile_logged_in_user', JSON.stringify(user));
    DataManager.logActivity(user.email, 'Logged in', 'login');

    // Redirect Logic
    const path = window.location.pathname;
    if (path.includes('/auth/') && !path.includes('/user/') && !path.includes('/admin/')) {
        // Inside auth/
        if (user.role === 'admin') window.location.href = 'admin/admin-dashboard.html';
        else window.location.href = 'user/user-dashboard.html';
    } else {
        // Fallback
        window.location.reload();
    }
};

window.signup = function (name, email, password) {
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Strict role logic
    const newUser = {
        name: name,
        email: email,
        role: email === 'admin@gmail.com' ? 'admin' : 'user',
        password: password,
        createdAt: new Date().toISOString()
    };

    const success = DataManager.addUser(newUser);
    if (!success) {
        alert('Email already registered!');
        return;
    }

    localStorage.setItem('smile_logged_in_user', JSON.stringify(newUser));
    // Smooth redirect
    if (newUser.role === 'admin') window.location.href = 'admin/admin-dashboard.html';
    else window.location.href = 'user/user-dashboard.html';
};

window.checkDashboardAccess = function () {
    const user = JSON.parse(localStorage.getItem('smile_logged_in_user'));
    const path = window.location.pathname;

    if (!user) {
        alert('Access Denied. Please login first.');
        window.location.href = '../login.html';
        return;
    }

    if (path.includes('admin-dashboard') && user.role !== 'admin') {
        alert('Access Denied. Admins only.');
        window.location.href = '../../index.html';
    }

    if (path.includes('user-dashboard') && user.role !== 'user') {
        alert('Redirecting to Admin Dashboard');
        window.location.href = '../admin/admin-dashboard.html';
    }
};

window.getBasePath = function () {
    const path = window.location.pathname;
    if (path.includes('/public/pages/') || path.includes('/auth/admin/') || path.includes('/auth/user/')) {
        return '../../';
    } else if (path.includes('/auth/')) {
        return '../';
    }
    return './';
};

window.logout = function () {
    localStorage.removeItem('smile_logged_in_user');

    // Determine where to redirect
    const path = window.location.pathname;

    // If on dashboard or auth pages, go to Home
    if (path.includes('/auth/') || path.includes('dashboard')) {
        const prefix = window.getBasePath();
        window.location.href = prefix + 'index.html';
    } else {
        // If on public pages, just reload to update UI
        window.location.reload();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                return showToast('Passwords do not match', 'error');
            }

            try {
                const data = await apiCall('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ name, email, phone, password })
                });
                
                // Store token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, id: data._id }));
                
                showToast('Registration successful!');
                setTimeout(() => window.location.href = 'index.html', 1000);
            } catch (error) {
                showToast(error.message, 'error');
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const data = await apiCall('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });

                // Store token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, id: data._id }));
                
                showToast('Login successful!');
                setTimeout(() => window.location.href = 'index.html', 1000);
            } catch (error) {
                showToast(error.message, 'error');
            }
        });
    }

});

// Base API URL
const API_URL = 'http://127.0.0.1:5000/api';

// Utility for getting the JWT token
const getToken = () => localStorage.getItem('token');

// API Call Wrapper
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    ...options.headers
  };

  // If we are passing JSON, set the content type
  // Note: For FormData (file upload), we let the browser set the Content-Type with boundary
  if (options.body && typeof options.body === 'string') {
      headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// UI Notification Toast
const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);

  // Remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
};

// Authenticate user check and update navbar
const updateNavbar = () => {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        navLinks.innerHTML = `
            <span style="font-weight: 500;">Hi, ${user.name}</span>
            <a href="add-product.html" class="btn btn-primary" style="color: white !important;">+ Post Ad</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    } else {
        navLinks.innerHTML = `
            <a href="login.html">Login</a>
            <a href="register.html" class="btn btn-primary" style="color: white !important;">Sign Up</a>
        `;
    }
};

// Run this standard on all pages
document.addEventListener('DOMContentLoaded', updateNavbar);

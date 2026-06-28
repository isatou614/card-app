const API_URL = 'https://card-app-backend-eozb.onrender.com/api';

// Auth State
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// Check auth on page load
document.addEventListener('DOMContentLoaded', () => {
  if (authToken) {
    currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    updateNavigation();
  }

  // Setup auth forms
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
});

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      showAlert('error', data.error || 'Login failed');
      return;
    }

    authToken = data.token;
    currentUser = data.user;

    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showAlert('success', 'Login successful!');
    closeModal('loginModal');
    document.getElementById('loginForm').reset();

    setTimeout(() => {
      window.location.href = 'pages/dashboard.html';
    }, 1500);
  } catch (err) {
    showAlert('error', 'Connection error. Please try again.');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      showAlert('error', data.error || 'Registration failed');
      return;
    }

    authToken = data.token;
    currentUser = data.user;

    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showAlert('success', 'Registration successful! Redirecting...');
    closeModal('registerModal');
    document.getElementById('registerForm').reset();

    setTimeout(() => {
      window.location.href = 'pages/dashboard.html';
    }, 1500);
  } catch (err) {
    showAlert('error', 'Connection error. Please try again.');
  }
}

function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  authToken = null;
  currentUser = null;
  window.location.href = 'index.html';
}

function updateNavigation() {
  const navRight = document.getElementById('navRight');
  if (navRight && currentUser) {
    navRight.innerHTML = `
      <span style="color: white; margin-right: 1rem;">Hi, ${currentUser.username}!</span>
      <button class="btn btn-secondary btn-sm" id="logoutBtn">Logout</button>
    `;
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  }

  const userGreeting = document.getElementById('userGreeting');
  if (userGreeting && currentUser) {
    userGreeting.textContent = `Welcome, ${currentUser.username}!`;
  }
}

function requireAuth() {
  if (!authToken) {
    window.location.href = '../index.html';
    return false;
  }
  return true;
}

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function switchModal(fromId, toId) {
  closeModal(fromId);
  openModal(toId);
}

// Alert Function
function showAlert(type, message) {
  const container = document.getElementById('alertContainer');
  if (!container) return;

  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  container.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// API Helper
async function apiCall(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      handleLogout();
      throw new Error('Unauthorized');
    }
    throw new Error(data.error || 'API error');
  }

  return data;
}

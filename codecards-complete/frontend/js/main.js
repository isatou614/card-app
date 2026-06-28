document.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.getElementById('getStartedBtn');
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');

  if (authToken && currentUser) {
    // User is logged in, redirect to dashboard
    document.getElementById('navRight').innerHTML = `
      <span style="color: white; margin-right: 1rem;">Hi, ${currentUser.username}!</span>
      <a href="pages/dashboard.html" class="nav-link">Dashboard</a>
      <button class="btn btn-secondary btn-sm" id="logoutBtn">Logout</button>
    `;
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    getStartedBtn.textContent = 'Go to Dashboard';
    getStartedBtn.onclick = () => {
      window.location.href = 'pages/dashboard.html';
    };
  } else {
    getStartedBtn.onclick = () => openModal('registerModal');
    loginLink.onclick = (e) => {
      e.preventDefault();
      openModal('loginModal');
    };
    registerLink.onclick = (e) => {
      e.preventDefault();
      openModal('registerModal');
    };
  }

  // Learn More button
  document.getElementById('learnMoreBtn').onclick = () => {
    document.querySelector('[style*="margin-top: 4rem"]').scrollIntoView({ behavior: 'smooth' });
  };
});

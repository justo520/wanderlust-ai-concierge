
// Navigation functionality for vanilla JS app

export function setupNavigation() {
  // Create and inject header/navbar
  const header = document.createElement('header');
  header.className = 'main-header';
  header.innerHTML = `
    <div class="header-container">
      <div class="logo">
        <a href="/">Wanderlust</a>
      </div>
      <nav class="main-nav">
        <ul class="nav-list">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/car-hire" class="nav-link">Car Hire</a></li>
        </ul>
      </nav>
      <button class="chat-button">
        <span class="icon">💬</span>
      </button>
    </div>
  `;
  
  // Create and inject footer
  const footer = document.createElement('footer');
  footer.className = 'main-footer';
  footer.innerHTML = `
    <div class="footer-container">
      <p>&copy; 2025 Wanderlust Travel. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Support</a>
      </div>
    </div>
  `;
  
  // Add to DOM
  document.body.prepend(header);
  document.body.appendChild(footer);
  
  // Create main content container if it doesn't exist
  if (!document.getElementById('main-content')) {
    const main = document.createElement('main');
    main.id = 'main-content';
    document.body.insertBefore(main, footer);
  }
  
  // Add click event listeners for navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only intercept internal links
      if (this.origin === window.location.origin) {
        e.preventDefault();
        const path = this.pathname;
        
        // Update browser history
        window.history.pushState({path}, '', path);
        
        // Load the appropriate page
        loadPage(path);
      }
    });
  });
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', function(e) {
    const path = e.state?.path || window.location.pathname;
    loadPage(path);
  });
  
  // Initialize chat button
  document.querySelector('.chat-button')?.addEventListener('click', function() {
    const chatModal = document.getElementById('chat-modal');
    if (chatModal) {
      chatModal.classList.remove('hidden');
      document.getElementById('chat-initial-prompt').value = "Hi, I need some travel advice";
      if (typeof initializeChat === 'function') {
        initializeChat();
      }
    }
  });
}

// Load different pages based on route - defined here to avoid circular dependency
function loadPage(path) {
  // This will be imported and used by index.js
  // The actual implementation is in index.js to avoid duplication
  if (window.loadPage) {
    window.loadPage(path);
  } else {
    console.warn('loadPage function not available yet');
  }
}

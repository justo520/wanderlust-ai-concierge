
// Main entry point for vanilla JS app
import './styles.css';
import { setupNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  
  // Load the appropriate page based on URL
  const currentPath = window.location.pathname;
  loadPage(currentPath);
});

// Load different pages based on route
function loadPage(path) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;
  
  // Clear previous content
  mainContent.innerHTML = '';
  
  if (path === '/' || path === '/index.html') {
    import('./pages/Home.js').then(module => {
      renderHomePage(mainContent);
    });
  } 
  else if (path === '/car-hire' || path === '/car-hire.html') {
    import('./pages/CarHire.js').then(module => {
      renderCarHirePage(mainContent);
    });
  }
  else {
    renderNotFoundPage(mainContent);
  }
}

// Render the car hire page
function renderCarHirePage(container) {
  container.innerHTML = `
    <div class="car-hire-page">
      <div class="hero-section">
        <h1 class="page-title">Car Hire Made Easy</h1>
        <p class="page-subtitle">Find the perfect vehicle for your journey at the best price with our AI assistant.</p>
        <button id="main-booking-btn" class="primary-button">
          <span class="icon">🚗</span>
          Book a Car with AI Assistant
        </button>
      </div>
      
      <div id="car-cards-container" class="car-cards-grid"></div>
      
      <div class="features-section">
        <h2 class="section-title">Why Book With Wanderlust?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3 class="feature-title">Best Prices</h3>
            <p class="feature-text">Our AI assistant finds the best deals and can even negotiate for further discounts.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🚗</div>
            <h3 class="feature-title">Wide Selection</h3>
            <p class="feature-text">Choose from economy cars to luxury vehicles at locations worldwide.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📅</div>
            <h3 class="feature-title">Flexible Booking</h3>
            <p class="feature-text">Free cancellation up to 48 hours before pickup for most bookings.</p>
          </div>
        </div>
      </div>
      
      <!-- Chat Modal -->
      <div id="chat-modal" class="chat-modal hidden">
        <div class="chat-container">
          <div class="chat-header">
            <h2>AI Travel Assistant</h2>
            <button id="close-chat-btn" class="close-button">×</button>
          </div>
          <div id="chat-messages" class="chat-messages"></div>
          <input type="hidden" id="chat-initial-prompt" value="">
          <form id="chat-form" data-initialized="false" class="chat-input-form">
            <input type="text" id="user-input" placeholder="Type your message..." class="chat-input">
            <button type="submit" class="chat-send-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  `;
  
  // Run car hire page initialization
  initCarHirePage();
}

// Simple Home page renderer
function renderHomePage(container) {
  container.innerHTML = `
    <div class="home-page">
      <h1>Welcome to Wanderlust Travel</h1>
      <p>Your AI-powered travel companion</p>
      <a href="/car-hire" class="nav-link">Explore Car Hire</a>
    </div>
  `;
}

// 404 page renderer
function renderNotFoundPage(container) {
  container.innerHTML = `
    <div class="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" class="nav-link">Go Home</a>
    </div>
  `;
}

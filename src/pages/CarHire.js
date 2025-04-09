
// Car Hire page in vanilla JavaScript
const carRentals = [
  {
    id: 1,
    name: 'Economy Car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop&q=80',
    price: 35,
    seats: 4,
    transmission: 'Automatic',
    location: 'Bangkok Airport',
    available: 'June 10-17, 2025'
  },
  {
    id: 2,
    name: 'Compact SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=80',
    price: 55,
    seats: 5,
    transmission: 'Automatic',
    location: 'Phuket International Airport',
    available: 'July 15-25, 2025'
  },
  {
    id: 3,
    name: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop&q=80',
    price: 85,
    seats: 5,
    transmission: 'Automatic',
    location: 'Chiang Mai Airport',
    available: 'August 5-15, 2025'
  },
  {
    id: 4,
    name: 'Convertible',
    image: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=400&auto=format&fit=crop&q=80',
    price: 95,
    seats: 2,
    transmission: 'Automatic',
    location: 'Krabi Airport',
    available: 'September 1-10, 2025'
  }
];

// Render car rental cards
function renderCarCards() {
  const cardsContainer = document.getElementById('car-cards-container');
  
  carRentals.forEach(car => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    
    carCard.innerHTML = `
      <img src="${car.image}" alt="${car.name}" class="car-image">
      <div class="car-content">
        <div class="car-header">
          <h3 class="car-title">${car.name}</h3>
          <span class="car-badge">$${car.price}/day</span>
        </div>
        <div class="car-details">
          <div class="car-detail"><span class="icon">👥</span> ${car.seats} seats</div>
          <div class="car-detail"><span class="icon">🚗</span> ${car.transmission}</div>
          <div class="car-detail"><span class="icon">📍</span> ${car.location}</div>
          <div class="car-detail"><span class="icon">📅</span> ${car.available}</div>
        </div>
        <button class="book-now-btn" data-car-id="${car.id}">Book Now</button>
      </div>
    `;
    
    cardsContainer.appendChild(carCard);
  });
  
  // Add event listeners to book now buttons
  document.querySelectorAll('.book-now-btn').forEach(button => {
    button.addEventListener('click', openBookingChat);
  });
}

// Open chat modal for booking
function openBookingChat() {
  const chatModal = document.getElementById('chat-modal');
  chatModal.classList.remove('hidden');
  
  // Set initial prompt for chatbot
  document.getElementById('chat-initial-prompt').value = "I'd like to book a car rental";
  
  // Initialize chat if needed
  initializeChat();
}

// Close chat modal
function closeBookingChat() {
  const chatModal = document.getElementById('chat-modal');
  chatModal.classList.add('hidden');
}

// Main booking button click
function handleMainBookingClick() {
  openBookingChat();
}

// Initialize the page
function initCarHirePage() {
  renderCarCards();
  
  // Add event listener to main booking button
  const mainBookingBtn = document.getElementById('main-booking-btn');
  if (mainBookingBtn) {
    mainBookingBtn.addEventListener('click', handleMainBookingClick);
  }
  
  // Add event listener to close button
  const closeButton = document.getElementById('close-chat-btn');
  if (closeButton) {
    closeButton.addEventListener('click', closeBookingChat);
  }
}

// Initialize chat functionality
function initializeChat() {
  // Simple chat implementation
  const chatForm = document.getElementById('chat-form');
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  
  // Check if chat is already initialized
  if (chatForm.dataset.initialized === 'true') return;
  
  // Get initial prompt
  const initialPrompt = document.getElementById('chat-initial-prompt').value;
  if (initialPrompt) {
    // Add initial message
    appendMessage('user', initialPrompt);
    // Add bot response
    setTimeout(() => {
      appendMessage('bot', `I'll help you book a car rental. What dates are you looking for, and where would you like to pick up the vehicle?`);
    }, 1000);
  }
  
  // Handle form submission
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message) {
      appendMessage('user', message);
      userInput.value = '';
      
      // Simulate bot response
      setTimeout(() => {
        const responses = [
          "I can help you with that booking. Could you please specify your preferred dates?",
          "Great choice! Would you prefer an economy car or something more luxurious?",
          "That location is available. Would you like to see available vehicles?",
          "Your booking is almost complete. Would you like to add insurance coverage?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        appendMessage('bot', randomResponse);
      }, 1000);
    }
  });
  
  // Mark as initialized
  chatForm.dataset.initialized = 'true';
}

// Add message to chat
function appendMessage(sender, text) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}-message`;
  messageDiv.innerHTML = `<p>${text}</p>`;
  chatMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initCarHirePage);

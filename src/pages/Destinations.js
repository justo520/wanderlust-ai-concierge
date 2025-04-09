
// Destinations page functionality
const DESTINATIONS = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Discover tropical paradise with pristine beaches, lush rice terraces, and ancient temples.",
    price: "From $899",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    tags: ["Beach", "Culture", "Adventure"]
  },
  {
    id: 2,
    name: "Santorini, Greece",
    description: "Experience the iconic white and blue buildings overlooking the stunning Aegean Sea.",
    price: "From $1099",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    tags: ["Romantic", "Island", "Scenic"]
  },
  {
    id: 3,
    name: "Kyoto, Japan",
    description: "Immerse yourself in Japan's cultural heart with ancient temples and beautiful gardens.",
    price: "From $1299",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    tags: ["Culture", "History", "Food"]
  },
  {
    id: 4,
    name: "Machu Picchu, Peru",
    description: "Hike to the ancient Incan citadel set against a breathtaking mountain backdrop.",
    price: "From $1499",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    tags: ["Adventure", "History", "Hiking"]
  },
  {
    id: 5,
    name: "Swiss Alps",
    description: "Ski, hike, or simply enjoy the majestic mountain views of the Swiss Alps.",
    price: "From $1199",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    tags: ["Mountains", "Adventure", "Scenic"]
  },
  {
    id: 6,
    name: "Great Barrier Reef, Australia",
    description: "Dive into the world's largest coral reef system with incredible marine life.",
    price: "From $1699",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    tags: ["Beach", "Adventure", "Nature"]
  }
];

// Function to render an individual destination card
function createDestinationCard(destination) {
  const card = document.createElement('div');
  card.className = 'destination-card';
  
  // Create image with overlay
  const imageContainer = document.createElement('div');
  imageContainer.className = 'destination-image-container';
  
  const image = document.createElement('img');
  image.src = destination.image;
  image.alt = destination.name;
  image.className = 'destination-image';
  
  imageContainer.appendChild(image);
  
  // Create content section
  const content = document.createElement('div');
  content.className = 'destination-content';
  
  const name = document.createElement('h3');
  name.textContent = destination.name;
  name.className = 'destination-name';
  
  const description = document.createElement('p');
  description.textContent = destination.description;
  description.className = 'destination-description';
  
  const price = document.createElement('p');
  price.textContent = destination.price;
  price.className = 'destination-price';
  
  // Create tags
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'destination-tags';
  
  destination.tags.forEach(tag => {
    const tagSpan = document.createElement('span');
    tagSpan.textContent = tag;
    tagSpan.className = 'destination-tag';
    tagsContainer.appendChild(tagSpan);
  });
  
  // Create button
  const button = document.createElement('button');
  button.textContent = 'Explore Destination';
  button.className = 'destination-button';
  button.addEventListener('click', () => {
    // In the future, this could navigate to a detailed page for this destination
    console.log(`Exploring ${destination.name}`);
  });
  
  // Assemble all elements
  content.appendChild(name);
  content.appendChild(description);
  content.appendChild(price);
  content.appendChild(tagsContainer);
  content.appendChild(button);
  
  card.appendChild(imageContainer);
  card.appendChild(content);
  
  return card;
}

// Function to render the filter UI
function createFilterUI(container) {
  const filterSection = document.createElement('div');
  filterSection.className = 'destinations-filter';
  
  const filterTitle = document.createElement('h3');
  filterTitle.textContent = 'Filter Destinations';
  filterTitle.className = 'filter-title';
  
  const tagFilters = document.createElement('div');
  tagFilters.className = 'tag-filters';
  
  // Get unique tags from all destinations
  const uniqueTags = [...new Set(DESTINATIONS.flatMap(dest => dest.tags))];
  
  uniqueTags.forEach(tag => {
    const tagButton = document.createElement('button');
    tagButton.textContent = tag;
    tagButton.className = 'tag-filter-button';
    tagButton.dataset.tag = tag;
    
    tagButton.addEventListener('click', (e) => {
      const selectedTag = e.target.dataset.tag;
      // Toggle active class
      tagButton.classList.toggle('active');
      
      // Get all active filter buttons
      const activeFilters = Array.from(document.querySelectorAll('.tag-filter-button.active'))
        .map(btn => btn.dataset.tag);
      
      // Filter destinations
      filterDestinations(activeFilters);
    });
    
    tagFilters.appendChild(tagButton);
  });
  
  // Create search input
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search destinations...';
  searchInput.className = 'search-input';
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeFilters = Array.from(document.querySelectorAll('.tag-filter-button.active'))
      .map(btn => btn.dataset.tag);
    
    filterDestinations(activeFilters, searchTerm);
  });
  
  const searchIcon = document.createElement('span');
  searchIcon.className = 'search-icon';
  searchIcon.innerHTML = '🔍';
  
  searchContainer.appendChild(searchIcon);
  searchContainer.appendChild(searchInput);
  
  filterSection.appendChild(filterTitle);
  filterSection.appendChild(searchContainer);
  filterSection.appendChild(tagFilters);
  
  container.appendChild(filterSection);
}

// Function to filter destinations based on tags and search term
function filterDestinations(activeTags = [], searchTerm = '') {
  const destinationsGrid = document.querySelector('.destinations-grid');
  const noResultsMessage = document.querySelector('.no-results-message');
  
  if (!destinationsGrid) return;
  
  // Clear current destinations
  destinationsGrid.innerHTML = '';
  
  // Filter destinations
  let filteredDestinations = DESTINATIONS;
  
  if (activeTags.length > 0) {
    filteredDestinations = filteredDestinations.filter(destination => 
      activeTags.some(tag => destination.tags.includes(tag))
    );
  }
  
  if (searchTerm) {
    filteredDestinations = filteredDestinations.filter(destination => 
      destination.name.toLowerCase().includes(searchTerm) || 
      destination.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Display message if no results
  if (filteredDestinations.length === 0) {
    if (!noResultsMessage) {
      const message = document.createElement('p');
      message.textContent = 'No destinations match your filters. Try adjusting your search criteria.';
      message.className = 'no-results-message';
      destinationsGrid.parentNode.appendChild(message);
    }
  } else {
    // Remove message if it exists
    if (noResultsMessage) {
      noResultsMessage.remove();
    }
    
    // Add filtered destinations to grid
    filteredDestinations.forEach(destination => {
      destinationsGrid.appendChild(createDestinationCard(destination));
    });
  }
}

// Main function to render the destinations page
function renderDestinationsPage(container) {
  // Create page structure
  const pageContainer = document.createElement('div');
  pageContainer.className = 'destinations-page';
  
  // Create hero section
  const heroSection = document.createElement('div');
  heroSection.className = 'destinations-hero';
  
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';
  
  const heroTitle = document.createElement('h1');
  heroTitle.textContent = 'Explore Amazing Destinations';
  heroTitle.className = 'hero-title';
  
  const heroSubtitle = document.createElement('p');
  heroSubtitle.textContent = 'Discover breathtaking locations around the world with our AI-powered travel recommendations';
  heroSubtitle.className = 'hero-subtitle';
  
  heroContent.appendChild(heroTitle);
  heroContent.appendChild(heroSubtitle);
  heroSection.appendChild(heroContent);
  
  // Create main content section
  const mainContent = document.createElement('div');
  mainContent.className = 'destinations-content';
  
  // Add filter UI
  createFilterUI(mainContent);
  
  // Create destinations grid
  const destinationsGrid = document.createElement('div');
  destinationsGrid.className = 'destinations-grid';
  
  // Add destinations to grid
  DESTINATIONS.forEach(destination => {
    destinationsGrid.appendChild(createDestinationCard(destination));
  });
  
  mainContent.appendChild(destinationsGrid);
  
  // Assemble page
  pageContainer.appendChild(heroSection);
  pageContainer.appendChild(mainContent);
  
  // Clear container and add our content
  container.innerHTML = '';
  container.appendChild(pageContainer);
  
  // Add CSS for destinations page
  addDestinationsStyles();
}

// Function to add CSS styles for the destinations page
function addDestinationsStyles() {
  // Check if styles already exist
  if (document.getElementById('destinations-styles')) return;
  
  const styleEl = document.createElement('style');
  styleEl.id = 'destinations-styles';
  
  styleEl.textContent = `
    .destinations-page {
      max-width: 100%;
      overflow-x: hidden;
    }
    
    .destinations-hero {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                  url('https://images.unsplash.com/photo-1506744038136-46273834b3fb');
      background-size: cover;
      background-position: center;
      color: white;
      padding: 6rem 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .hero-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .destinations-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .destinations-filter {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .filter-title {
      margin-bottom: 1rem;
    }
    
    .search-container {
      position: relative;
      margin-bottom: 1rem;
    }
    
    .search-input {
      width: 100%;
      padding: 10px 40px 10px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .search-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .tag-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .tag-filter-button {
      background-color: white;
      border: 1px solid #ddd;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .tag-filter-button:hover {
      background-color: #f0f0f0;
    }
    
    .tag-filter-button.active {
      background-color: #0c95e8;
      color: white;
      border-color: #0c95e8;
    }
    
    .destinations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .destination-card {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      background-color: white;
    }
    
    .destination-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    }
    
    .destination-image-container {
      height: 200px;
      overflow: hidden;
    }
    
    .destination-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }
    
    .destination-card:hover .destination-image {
      transform: scale(1.05);
    }
    
    .destination-content {
      padding: 1.5rem;
    }
    
    .destination-name {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    .destination-description {
      color: #666;
      margin-bottom: 1rem;
    }
    
    .destination-price {
      font-weight: bold;
      color: #0c95e8;
      margin-bottom: 1rem;
    }
    
    .destination-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 1rem;
    }
    
    .destination-tag {
      background-color: #f0f7ff;
      color: #0c95e8;
      font-size: 0.8rem;
      padding: 4px 10px;
      border-radius: 12px;
    }
    
    .destination-button {
      background-color: #0c95e8;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
      width: 100%;
      font-weight: 500;
    }
    
    .destination-button:hover {
      background-color: #0a7bc2;
    }
    
    .no-results-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: #666;
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .destinations-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .destinations-hero {
        padding: 4rem 1rem;
      }
      
      .hero-title {
        font-size: 1.8rem;
      }
      
      .destinations-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  
  document.head.appendChild(styleEl);
}

// Export the render function for use in index.js
window.renderDestinationsPage = renderDestinationsPage;

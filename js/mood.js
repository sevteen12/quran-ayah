const UNSPLASH_ACCESS_KEY = "J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA";

// Function to fetch a random nature image from Unsplash API
async function fetchNatureImage() {
  const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
  try {
    const response = await fetch(UNSPLASH_API_URL);
    if (!response.ok) throw new Error("Failed to fetch image: " + response.status);
    const data = await response.json();
    document.getElementById("nature-image").src = data.urls.regular;
  } catch (error) {
    console.error("Error fetching Unsplash image:", error.message);
    document.getElementById("nature-image").src = "https://via.placeholder.com/600x400"; // Fallback image
  }
}

// Declare availableVerses once and ensure it's accessible globally
let availableVerses = [...verses]; // Clone array to track remaining verses

// Function to generate a random verse
function generateRandomVerse() {
  if (availableVerses.length === 0) {
    availableVerses = [...verses]; // Reset if all verses have been shown
    alert("All verses have been shown. Resetting the list!");
  }
  const randomIndex = Math.floor(Math.random() * availableVerses.length);
  const selectedVerse = availableVerses.splice(randomIndex, 1)[0]; // Remove selected verse

  document.getElementById("verse").innerText = selectedVerse.arabic;
  document.getElementById("translation").innerText = selectedVerse.translation;
  document.getElementById("ayah-number").innerText = selectedVerse.reference;

  // Update nature image
  fetchNatureImage();
}

// Handle responsive behavior
function handleResponsiveBehavior() {
  if (window.innerWidth <= 768) {
    document.body.style.overflowY = "auto"; // Enable scrolling for mobile
  } else {
    document.body.style.overflowY = "hidden"; // Disable scrolling for desktop
  }
}

// Combined window.onload to avoid conflicts
window.onload = () => {
  fetchNatureImage(); // Load the initial nature image
  handleResponsiveBehavior(); // Adjust responsiveness
};

// Adjust on resize
window.onresize = handleResponsiveBehavior;

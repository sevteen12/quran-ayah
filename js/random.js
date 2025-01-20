const unsplashApiKey = "J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA"; // Replace with your Unsplash API Key
const SURAH_URL = "https://api.alquran.cloud/v1/surah/"; // Correct Quran API URL
const TOTAL_SURAHS = 114; // Total number of surahs in the Quran

let totalAyahs;
let surahNumber;
let ayahNumber;
let ayah;
let translatedAyah;

// Function to fetch random Ayah and image
async function generateRandomContent() {
  try {
    console.log("Fetching random Ayah...");
    surahNumber = Math.floor(Math.random() * TOTAL_SURAHS) + 1; // Random Surah number
    const surahResponse = await fetch(SURAH_URL + surahNumber);

    if (!surahResponse.ok) {
      throw new Error(`Quran API Error: ${surahResponse.statusText}`);
    }
    const surahData = await surahResponse.json();
    totalAyahs = surahData.data.ayahs.length;
    ayahNumber = Math.floor(Math.random() * totalAyahs);
    ayah = surahData.data.ayahs[ayahNumber].text;

    await translateAyah();

    console.log("Fetching random Unsplash image...");
    const imageResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=nature&client_id=${unsplashApiKey}`
    );

    if (!imageResponse.ok) {
      throw new Error(`Unsplash API Error: ${imageResponse.statusText}`);
    }
    const imageData = await imageResponse.json();

    const imageUrl = imageData.urls.regular;
    const imageElement = document.getElementById("nature-image");
    if (imageElement) {
      imageElement.src = imageUrl;
    }

    console.log("Random content successfully fetched and updated.");
  } catch (error) {
    console.error("Error fetching random content:", error.message);
    alert(`Error: ${error.message}. Please try again.`);
  }
}

// Translate the randomly selected Ayah
async function translateAyah() {
  try {
    const translationResponse = await fetch(
      `${SURAH_URL}${surahNumber}/en.sahih`
    );

    if (!translationResponse.ok) {
      throw new Error(
        `Quran Translation API Error: ${translationResponse.statusText}`
      );
    }
    const translationData = await translationResponse.json();
    translatedAyah = translationData.data.ayahs[ayahNumber]?.text || "Translation not available";

    printToHTML();
  } catch (error) {
    console.error("Error translating Ayah:", error.message);
    throw error;
  }
}

// Print the Ayah and translation to the HTML
function printToHTML() {
  const loadingCircle = document.getElementById("loadingCircle");
  const verseElement = document.getElementById("verse");
  const translationElement = document.getElementById("translation");

  if (loadingCircle) loadingCircle.style.display = "none";
  if (verseElement) verseElement.style.display = "block";
  if (translationElement) translationElement.style.display = "block";

  if (verseElement) verseElement.textContent = ayah;
  if (translationElement) {
    translationElement.innerHTML = `<strong>Surah: ${surahNumber}, Ayah: ${ayahNumber + 1}</strong><br>${translatedAyah}`;
  }
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
  // Ensure elements exist before executing
  if (
    document.getElementById("loadingCircle") &&
    document.getElementById("verse") &&
    document.getElementById("translation") &&
    document.getElementById("nature-image")
  ) {
    generateRandomContent(); // Load the initial content
    handleResponsiveBehavior(); // Adjust responsiveness
  } else {
    console.error("Required elements are missing in the HTML.");
  }
};

// Adjust on resize
window.onresize = handleResponsiveBehavior;

function renderHomePage() {
    const app = document.getElementById('app');
    if (!app) {
      console.error('App container not found!');
      return;
    }
  
    app.innerHTML = `
      <div class="main-container">
        <div class="rectangles">
          <div class="rectangle" onclick="navigateToMood('happy')">
            <img src="https://source.unsplash.com/1600x900/?nature,scenery" alt="Happy Mood" />
            <span>Happy Mood</span>
          </div>
          <div class="rectangle" onclick="navigateToMood('calm')">
            <img src="https://source.unsplash.com/1600x900/?nature,forest" alt="Calm Mood" />
            <span>Calm Mood</span>
          </div>
          <div class="rectangle" onclick="navigateToMood('reflective')">
            <img src="https://source.unsplash.com/1600x900/?mountains" alt="Reflective Mood" />
            <span>Reflective Mood</span>
          </div>
          <div class="rectangle" onclick="navigateToMood('hopeful')">
            <img src="https://source.unsplash.com/1600x900/?sunset" alt="Hopeful Mood" />
            <span>Hopeful Mood</span>
          </div>
        </div>
        <button class="random-button" onclick="navigateToRandom()">OR GENERATE RANDOM QURAN AYAH</button>
      </div>
    `;
  }
  
  function navigateToMood(mood) {
    window.location.href = `./${mood}.html`;
  }
  
  function navigateToRandom() {
    window.location.href = './random.html';
  }
  
  document.addEventListener('DOMContentLoaded', renderHomePage);
  // Add 3D tilting effect to rectangles
document.querySelectorAll('.rectangle').forEach((rect) => {
  rect.addEventListener('mousemove', (e) => {
    const rectBounds = rect.getBoundingClientRect();
    const x = e.clientX - rectBounds.left;
    const y = e.clientY - rectBounds.top;
    const centerX = rectBounds.width / 2;
    const centerY = rectBounds.height / 2;

    const rotateX = ((y - centerY) / centerY) * 15; // Adjusted for smoother tilt
    const rotateY = ((x - centerX) / centerX) * -15;

    rect.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    rect.style.boxShadow = `${-rotateY}px ${rotateX}px 15px rgba(0, 0, 0, 0.3)`;
  });

  rect.addEventListener('mouseleave', () => {
    rect.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    rect.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  });
});

// Ensure text below the rectangles is handled correctly
document.querySelectorAll('.rectangle-label').forEach((label) => {
  const parentRect = label.parentElement;
  parentRect.style.display = 'flex';
  parentRect.style.flexDirection = 'column';
  parentRect.style.alignItems = 'center';
  parentRect.style.marginBottom = '20px';
});
function initializeToggleFunctionality() {
  const toggleButton = document.getElementById('btn');
  const optionButtons = document.getElementById('optionButtons');

  if (!toggleButton || !optionButtons) {
      console.error('Toggle button or option buttons not found!');
      return;
  }

  toggleButton.addEventListener('change', () => {
      if (toggleButton.checked) {
          optionButtons.classList.add('visible');
      } else {
          optionButtons.classList.remove('visible');
      }
  });
}

document.addEventListener('DOMContentLoaded', initializeToggleFunctionality);
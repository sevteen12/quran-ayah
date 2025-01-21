// Initialize compass and needle
const info = document.getElementById("info");
const compassImage = document.getElementById("compass-image");
const permissionsButton = document.getElementById("permissions");
let qiblaBearing = 0;

// Calculate Qibla direction
function calculateQiblaBearing(
  userLat,
  userLon,
  kaabaLat = 21.4225,
  kaabaLon = 39.8262
) {
  const rad = Math.PI / 180;
  const dLon = (kaabaLon - userLon) * rad;
  const lat1 = userLat * rad;
  const lat2 = kaabaLat * rad;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let bearing = Math.atan2(y, x) / rad;
  bearing = (bearing + 360) % 360;
  return bearing;
}

// Request permissions and initialize orientation handling
permissionsButton.addEventListener("click", async () => {
  try {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission === "granted") {
        enableCompass();
      } else {
        info.innerHTML += "<p>Permission denied for compass access.</p>";
      }
    } else {
      enableCompass();
    }
  } catch (error) {
    info.innerHTML += `<p>Error requesting permissions: ${error.message}</p>`;
  }
});

function enableCompass() {
  permissionsButton.style.display = "none";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        qiblaBearing = calculateQiblaBearing(userLat, userLon);
        info.innerHTML = `
                  <h2 id="main-head">Qibla Compass</h2>
                  <p class="para">Heading: <span id="current-heading" >0.0</span>°</p>
                  <p class="para">Qibla Direction: <span id="qibla-direction" >${qiblaBearing.toFixed(
                    2
                  )}</span>°</p>
              `;

        window.addEventListener("deviceorientation", handleOrientation);
      },
      (error) => {
        info.innerHTML = `<p>Error fetching location: ${error.message}</p>`;
      }
    );
  }
}

function handleOrientation(event) {
  let compass = event.webkitCompassHeading || Math.abs(event.alpha - 360);
  compassImage.style.transform = `rotate(${qiblaBearing - compass}deg)`;

  const currentHeading = compass.toFixed(1);
  document.getElementById("current-heading").textContent = currentHeading;
}

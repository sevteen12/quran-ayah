const KAABA_LAT = 21.422487; // Kaaba latitude
const KAABA_LONG = 39.826206; // Kaaba longitude
let currentHeading = 0;

// Initialize compass and needle
const compassElement = document.getElementById("compass");
// const needleElement = document.getElementById("qibla-needle");
const headingElement = document.getElementById("heading");
const qiblaDirectionElement = document.getElementById("qibla-direction");

// Calculate Qibla direction
function calculateQiblaDirection(userLat, userLong, heading) {
  const userLocation = { latitude: userLat, longitude: userLong };
  const destinationLocation = { latitude: KAABA_LAT, longitude: KAABA_LONG };

  const lat1 = degreesToRadians(userLocation.latitude);
  const lat2 = degreesToRadians(destinationLocation.latitude);
  const deltaLong = degreesToRadians(destinationLocation.longitude - userLocation.longitude);

  const y = Math.sin(deltaLong) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLong);

  let bearing = radiansToDegrees(Math.atan2(y, x));
  bearing = (bearing + 360) % 360; // Normalize to 0-360

  const qiblaDirection = (bearing - heading + 360) % 360;
  return qiblaDirection;
}

// Convert degrees to radians
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Convert radians to degrees
function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

// Update compass and Qibla needle
function updateCompass(event) {
  const heading = Math.round(event.alpha);
  currentHeading = heading;

  // Get user location
  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLong = position.coords.longitude;

    const qiblaDirection = calculateQiblaDirection(userLat, userLong, heading);

    headingElement.textContent = heading;
    qiblaDirectionElement.textContent = qiblaDirection.toFixed(2);

    // Animate compass and needle
    gsap.to(compassElement, {
      rotation: -heading,
      duration: 1,
      ease: "power2.out",
    });

    // gsap.to(needleElement, {
    //   rotation: qiblaDirection,
    //   duration: 1,
    //   ease: "power2.out",
    // });
  });
}

// Listen for device orientation events
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", updateCompass);
} else {
  alert("Your browser does not support device orientation.");
}

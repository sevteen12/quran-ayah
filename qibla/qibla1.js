navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log("Your Coordinates:", latitude, longitude);
  },
  (error) => console.error("Error getting location:", error)
);

function calculateQiblaDirection(lat1, lon1) {
  const kaabaLat = 21.4225; // Latitude of the Kaaba
  const kaabaLon = 39.8262; // Longitude of the Kaaba
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const toDegrees = (rad) => (rad * 180) / Math.PI;

  const dLon = toRadians(kaabaLon - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(kaabaLat);

  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  const bearing = toDegrees(Math.atan2(y, x));

  return (bearing + 360) % 360; // Normalize to 0–360 degrees
}

window.addEventListener("deviceorientation", (event) => {
  const compassHeading = event.alpha; // Device's orientation in degrees
  console.log("Compass Heading:", compassHeading);
});

function displayQiblaDirection(userLat, userLon) {
  const qiblaDirection = calculateQiblaDirection(userLat, userLon);

  window.addEventListener("deviceorientation", (event) => {
    const compassHeading = event.alpha; // Adjust for device orientation
    const relativeQibla = (qiblaDirection - compassHeading + 360) % 360;

    // Update UI
    console.log(`Turn to ${relativeQibla.toFixed(2)}° to face the Qibla`);
  });
}

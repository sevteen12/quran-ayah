const compassElement = document.getElementById("compass");
const needleElement = document.getElementById("needle");
// const headingElement = document.getElementById("heading");
// const qiblaDirectionElement = document.getElementById("qibla-direction");

navigator.geolocation.getCurrentPosition(function (position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  console.log(userLat, userLon);

  const bearing = calculateQiblaBearing(userLat, userLon);

  const needle = document.getElementById("needle");
  needle.style.transform = `rotate(${bearing}deg)`;
});

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
  bearing = (bearing + 360) % 360; // Normalize to [0, 360] degrees

  return bearing;
}

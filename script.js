let latitudeText = document.querySelector('.latitude');
let longitudeText = document.querySelector('.longitude');
let timeText = document.querySelector('.time');
let speedText = document.querySelector('.speed');
let altitudeText = document.querySelector('.altitude');
let visibilityText = document.querySelector('.visibility');

// default map location

let lat = 51.505;
let long = -0.09;
let zoomLevel = 8;

const map = L.map('map-div').setView([lat, long], zoomLevel);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 4,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZGFudHVwMDEiLCJhIjoiY2tuN3VrcW51MGx6aTJvbno2d2pqM3FlOCJ9.JeD5qpexoeox5NDcQ-U2Hw'
}).addTo(map);

const icon = L.icon({
  iconUrl: './img/iss.png',
  iconSize: [90, 45],
  iconAnchor: [50, 10],
  popupAnchor: [20, -86]
});

const marker = L.marker([lat, long], { icon: icon }).addTo(map);

function findISS() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
  .then(response => response.json())
  .then(data => {
    lat = data.latitude.toFixed(2);
    long = data.longitude.toFixed(2);
    const timestamp = new Date(data.timestamp * 1000).toUTCString();
    const speed = data.velocity.toFixed(2);
    const altitude = data.altitude.toFixed(2);
    const visibility = data.visibility;

    updateISS(lat, long, timestamp, speed, altitude, visibility);
  })
  .catch(e => console.log(e));
}

function updateISS(lat, long, timestamp, speed, altitude, visibility) {
  marker.setLatLng([lat, long]);
  map.setView([lat, long]);
  latitudeText.innerText = lat;
  longitudeText.innerText = long;
  timeText.innerText = timestamp;
  speedText.innerText = `${speed} kmph`;
  altitudeText.innerText = `${altitude} km`;
  visibilityText.innerText = visibility;
}

findISS();
setInterval(findISS, 500);
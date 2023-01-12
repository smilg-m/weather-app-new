function formatTime(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDate();
  let month = months[date.getMonth()];
  let weekday = days[date.getDay()];

  return `${weekday}, ${month} ${day}, ${hours}:${minutes}`;
}

function updateTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind-speed");
  let currentPressure = document.querySelector("#pressure");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  feelsLikeElement.innerHTML = `Feels like ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  currentHumidity.innerHTML = `${response.data.temperature.humidity} %`;
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  currentPressure.innerHTML = `${response.data.temperature.pressure} hPa`;
  timeElement.innerHTML = formatTime(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.description}`);
}

function search(city) {
  let apiKey = "a3eff06504c1b7o0f0182e14a7e1e6dt";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateTemperature);
}

function extractLocation(position) {
  let apiKey = "a3eff06504c1b7o0f0182e14a7e1e6dt";
  let units = "metric";
  let longtitude = position.coords.latitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longtitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(extractLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("submit", currentLocation);

function citySubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let searchForm = document.querySelector("#search-area");
searchForm.addEventListener("submit", citySubmit);

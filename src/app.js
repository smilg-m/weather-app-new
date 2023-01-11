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
  let minutes = date.getMinutes();
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
  let currentVisibility = document.querySelector("#visibility");
  let timeElement = document.querySelector("#time");

  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  currentHumidity.innerHTML = `${response.data.main.humidity} %`;
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  currentVisibility.innerHTML = `${response.data.visibility / 1000} km`;
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
}

let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
let units = "metric";
let city = "Vilnius";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);

axios.get(apiUrl).then(updateTemperature);

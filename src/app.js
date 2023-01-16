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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col text-center">
              <div class="temp-forecast-day">${day}</div>
              <img src="images/Clouds-wind.svg" alt="#" height="32px" />
              <div class="forecast-temperatures">
                <h5>
                  <span class="temp-min">-3&NonBreakingSpace;</span>
                  <span class="temp-max">-7</span>
                </h5>
              </div>
            </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a3eff06504c1b7o0f0182e14a7e1e6dt";
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "a3eff06504c1b7o0f0182e14a7e1e6dt";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateTemperature);
}

function extractLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "a3eff06504c1b7o0f0182e14a7e1e6dt";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(extractLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentLocation);

function citySubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let searchForm = document.querySelector("#search-area");
searchForm.addEventListener("submit", citySubmit);

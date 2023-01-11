function updateTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind-speed");
  let currentVisibility = document.querySelector("#visibility");

  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  currentHumidity.innerHTML = `${response.data.main.humidity} %`;
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
  currentVisibility.innerHTML = `${response.data.visibility} m`;
}

let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
let units = "metric";
let city = "Milan";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);

axios.get(apiUrl).then(updateTemperature);

var APIKey = "8ab624b5be3ff94ca14f406f1044e429";
var today = dayjs().format("M/D/YYYY");

var searchFormEl = document.querySelector("#city-search");
var currentWeather = document.querySelector("#weatherToday");
var searchButton = document.getElementById("cityButton");
var forecastBoxesEl = document.getElementById("five-day-boxes");
var cityListEl = document.getElementById("city-list");

// Display prior searches
var retrieveCity = function () {
  var cityList = JSON.parse(localStorage.getItem("city")) || [];
  for (var i = 0; i < cityList.length; i++) {
    var cityButtonEl = document.createElement("button");
    cityButtonEl.innerHTML = cityList[i];
    cityListEl.appendChild(cityButtonEl);
  }
};

// If city button is clicked, displays weather for city
var buttonClickHandler = function (event) {
  var clickedCity = event.target.textContent;
  currentWeather.innerHTML = "";
  forecastBoxesEl.innerHTML = "";
  lookForCity(clickedCity);
};

// Input city name
var userSearch = function (event) {
  event.preventDefault();
  var searchInput = document.getElementById("requestedCity").value;
  currentWeather.innerHTML = "";
  forecastBoxesEl.innerHTML = "";
  cityListEl.innerHTML = "";
  lookForCity(searchInput);
  saveCity(searchInput);
};

// Fetch city data, display current weather and pass latitude and longitude information
var lookForCity = function (city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&limit=5&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var weatherIcon =
            "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          var cityHeader = document.createElement("h1");
          var wIcon = document.createElement("img");
          var otherWeather = document.createElement("h2");
          wIcon.src = weatherIcon;
          currentWeather.style.visibility = "visible";
          cityHeader.textContent = data.name + " " + today;
          currentWeather.appendChild(cityHeader);
          cityHeader.appendChild(wIcon);
          otherWeather.textContent =
            "Temp: " +
            data.main.temp +
            " \u2109" +
            " " +
            "Wind: " +
            data.wind.speed +
            " MPH" +
            " " +
            "Humidity: " +
            data.main.humidity +
            "%";
          cityHeader.appendChild(otherWeather);
          getFiveDay(data.coord.lat, data.coord.lon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to obtain location");
    });
};

// Fetch Five Day Forecast information
var getFiveDay = function (lat, lon) {
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    APIKey;
  fetch(forecastURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayFive(data.list, data.city.name);
      });
    }
  });
};

// Save city to local storage
var saveCity = function (cityName) {
  var savedCities = JSON.parse(localStorage.getItem("city")) || [];
  savedCities = savedCities.concat([cityName]);
  localStorage.setItem("city", JSON.stringify(savedCities));

  retrieveCity();
};

// Display five day forecast
var displayFive = function (fiveDayArray) {
  for (var i = 7; i <= 39; i += 8) {
    var fiveDate = fiveDayArray[i].dt_txt;
    var fiveTemp = "Temp: " + fiveDayArray[i].main.temp + " \u2109";
    var fiveWind = "Wind: " + fiveDayArray[i].wind.speed + " MPH";
    var fiveHum = "Humidity: " + fiveDayArray[i].main.humidity + "%";
    // Icons for weather
    var fiveIcons =
      "https://openweathermap.org/img/w/" +
      fiveDayArray[i].weather[0].icon +
      ".png";
    // Create html elements for five day forecast
    var fiveBox = document.createElement("div");
    var lilIcons = document.createElement("img");
    var fiveHead = document.createElement("p");
    var listEl = document.createElement("ul");
    var listItemDate = document.createElement("li");
    var listItemTemp = document.createElement("li");
    var listItemWind = document.createElement("li");
    var listItemHum = document.createElement("li");
    lilIcons.src = fiveIcons;
    fiveBox.classList.add("col");
    forecastBoxesEl.appendChild(fiveBox);
    fiveBox.appendChild(lilIcons);
    fiveBox.appendChild(fiveHead);
    fiveHead.appendChild(listEl);
    listItemDate.textContent = fiveDate;
    listEl.appendChild(listItemDate);
    listItemTemp.textContent = fiveTemp;
    listEl.appendChild(listItemTemp);
    listItemWind.textContent = fiveWind;
    listEl.appendChild(listItemWind);
    listItemHum.textContent = fiveHum;
    listEl.appendChild(listItemHum);
  }
};

retrieveCity();
searchFormEl.addEventListener("submit", userSearch);
cityListEl.addEventListener("click", buttonClickHandler);

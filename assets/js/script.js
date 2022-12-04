var APIKey = "8ab624b5be3ff94ca14f406f1044e429";
var today = dayjs().format("M/D/YYYY");

var searchFormEl = document.querySelector("#city-search");
var currentWeather = document.querySelector("#weatherToday");
var searchButton = document.getElementById("cityButton");
var forecastBoxesEl = document.getElementById("five-day-boxes");
var cityListEl = document.getElementById("city-list");

// Display prior searches
function retrieveCity() {
  var cityList = JSON.parse(localStorage.getItem("city")) || [];
  for (var i = 0; i < cityList.length; i++) {
    var cityButtonEl = document.createElement("button");
    console.log(cityList[i]);
    cityButtonEl.innerHTML = cityList[i];
    cityListEl.appendChild(cityButtonEl);
  }
}

// Input city name
var userSearch = function (event) {
  event.preventDefault();
  var searchInput = document.getElementById("requestedCity").value;
  currentWeather.innerHTML = "";
  forecastBoxesEl.innerHTML = "";
  cityListEl.innerHTML = "";
  console.log(searchInput);
  lookForCity(searchInput);
  saveCity(searchInput);
};

// Fetch city data, display current weather and pass latitude and longitude information
var lookForCity = function (city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&limit=5&appid=" +
    APIKey;

  console.log(queryURL);
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(data.weather[0].icon);
          var weatherIcon =
            "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          console.log(today);
          var cityHeader = document.createElement("h1");
          var wIcon = document.createElement("img");
          var otherWeather = document.createElement("h2");
          wIcon.src = weatherIcon;
          currentWeather.style.visibility = "visible";
          cityHeader.textContent = data.name + " " + today;
          currentWeather.appendChild(cityHeader);
          cityHeader.appendChild(wIcon);
          console.log(data.main.temp);
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
  console.log(lat, lon);
  var forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    APIKey;
  console.log(forecastURL);
  fetch(forecastURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        console.log(data.list);
        console.log(data.city.name);
        displayFive(data.list, data.city.name);
      });
    }
  });
};

// Save City to local storage
function saveCity(cityName) {
  var savedCities = JSON.parse(localStorage.getItem("city")) || [];
  console.log(cityName);
  console.log(savedCities);
  savedCities = savedCities.concat([cityName]);
  localStorage.setItem("city", JSON.stringify(savedCities));
  console.log(JSON.parse(localStorage.getItem("city")));
  retrieveCity();
}

// Display five day forecast
var displayFive = function (fiveDayArray, cityName) {
  console.log(fiveDayArray);
  console.log(cityName);
  console.log(fiveDayArray);

  for (var i = 7; i <= 39; i += 8) {
    var fiveDate = fiveDayArray[i].dt_txt;
    var fiveTemp = "Temp: " + fiveDayArray[i].main.temp + " \u2109";
    var fiveWind = "Wind: " + fiveDayArray[i].wind.speed + " MPH";
    var fiveHum = "Humidity: " + fiveDayArray[i].main.humidity + "%";

    var fiveIcons =
      "http://openweathermap.org/img/w/" +
      fiveDayArray[i].weather[0].icon +
      ".png";
    console.log(fiveIcons);

    var fiveBox = document.createElement("div");
    var lilIcons = document.createElement("img");
    var fiveHead = document.createElement("p");
    var listEl = document.createElement("ul");
    var listItemDate = document.createElement("li");
    var listItemTemp = document.createElement("li");
    var listItemWind = document.createElement("li");
    var listItemHum = document.createElement("li");
    lilIcons.src = fiveIcons;
    // listEl.style.list.type = "none";
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

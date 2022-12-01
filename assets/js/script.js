var APIKey = "8ab624b5be3ff94ca14f406f1044e429";
var today = dayjs().format("MMM, D-YYYY");

var searchFormEl = document.querySelector("#city-search");
var currentWeather = document.querySelector("#weatherToday");

var searchButton = document.getElementById("cityButton");

// searchButton.addEventListener("click", function () {
//   var searchInput = document.getElementById("requestedCity").value;
//   currentWeather.innerHTML = "";
//   console.log(searchInput);
//   lookForCity(searchInput);
// });

var userSearch = function (event) {
  event.preventDefault();
  var searchInput = document.getElementById("requestedCity").value;
  currentWeather.innerHTML = "";
  console.log(searchInput);
  lookForCity(searchInput);
};

var lookForCity = function (city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&limit=5&appid=" +
    APIKey;

  // var queryURL =
  //   "http://api.openweathermap.org/geo/1.0/direct?q=" +
  //   city +
  //   "&limit=5&appid=" +
  //   APIKey;

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
          console.log(weatherIcon);
          var cityHeader = document.createElement("h1");
          var wIcon = document.createElement("img");
          var otherWeather = document.createElement("h2");
          wIcon.src = weatherIcon;
          cityHeader.textContent = data.name + " " + today;
          currentWeather.appendChild(cityHeader);
          cityHeader.appendChild(wIcon);
          console.log(data.main.temp);
          otherWeather.textContent =
            "Temp: " +
            data.main.temp +
            " Kelvin" +
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

// Five Day Forecast

var getFiveDay = function (lat, lon) {
  console.log(lat, lon);
  var forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
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

var displayFive = function (fiveDayArray, cityName) {
  console.log(fiveDayArray);
  console.log(cityName);
  console.log(fiveDayArray);

  // for (var i = 7; i <= 39; i += 8) {
  //   var fiveIcons =
  //     "http://openweathermap.org/img/w/" +
  //     fiveDayArray[i].weather[0].icon +
  //     ".png";
  //
  // var fiveBox = document.createElement("div");
  // var lilIcons = document.createElement("img");

  // }
};

searchFormEl.addEventListener("submit", userSearch);

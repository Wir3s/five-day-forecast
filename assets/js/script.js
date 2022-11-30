var APIKey = "8ab624b5be3ff94ca14f406f1044e429";
var today = dayjs().format("MMM, D-YYYY");

var currentWeather = document.querySelector("#weatherToday");
var currentHeader = document.querySelector("currentHeader");
var searchButton = document.getElementById("cityButton");

// fetch(queryURL)

searchButton.addEventListener("click", function () {
  var searchInput = document.getElementById("requestedCity").value;

  console.log(searchInput);
  lookForCity(searchInput);
});

var lookForCity = function (city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&limit=5&appid=" +
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
          console.log(weatherIcon);
          var cityHeader = document.createElement("h1");
          var wIcon = document.createElement("img");
          wIcon.src = weatherIcon;
          cityHeader.textContent = data.name + " " + today;
          currentWeather.appendChild(cityHeader);
          cityHeader.appendChild(wIcon);
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
      });
    }
  });
};

// .then(function (data) {
//

//
//       console.log(addLon, addLat);
//       console.log(forecastURL);
//       var cities = document.getElementById("cityList");
//       var newLink = document.createElement("p");
//       newLink.innerHTML += "<a " + forecastURL + ">" + city + "</a>";
//       cities.appendChild(newLink);

//       localStorage.setItem("coords", forecastURL);
//     });
// });

// fetch(forecastURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });

var APIKey = "8ab624b5be3ff94ca14f406f1044e429";
var city;
var addLon;
var addLat;
var forecastURL =
  "http://api.openweathermap.org/data/2.5/forecast?lat=" +
  addLat +
  "&lon=" +
  addLon +
  "&appid=" +
  APIKey;
var searchButton = document.getElementById("cityButton");

// fetch(queryURL)

searchButton.addEventListener("click", function () {
  var searchInput = document.getElementById("requestedCity").value;
  city = searchInput;
  console.log(city);
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&limit=5&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.coord.lon, data.coord.lat);

      addLon = data.coord.lon;
      addLat = data.coord.lat;
      console.log(addLon, addLat);
      console.log(JSON.stringify({ location: [city, addLon, addLat] }));
      localStorage.setItem("location", JSON.stringify(city, addLon, addLat));
    });
});

// fetch(forecastURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });

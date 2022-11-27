var APIKey = "8ab624b5be3ff94ca14f406f1044e429";
var city;
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;

// fetch(queryURL)

var searchButton = document.getElementById("cityButton");
searchButton.addEventListener("click", function () {});

var APIKey = "8ab624b5be3ff94ca14f406f1044e429";
var city;

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
      console.log("Weather: Raw data \n----------");
      console.log(data);
      console.log(data.current.feelslike_f);

      // var feelsLike = $("</p>").text(
      //   "Right now it feels like " + data.current.feelslike_f + " degrees outside"
      // );
      // mainArea.append(feelsLike);
    });
});

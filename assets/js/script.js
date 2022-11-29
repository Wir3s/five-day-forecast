var APIKey = "8ab624b5be3ff94ca14f406f1044e429";

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

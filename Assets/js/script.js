// search a city and add to history search
// show current and next 5 days weather
// display city name + date + weather icon + temp + humidity + wind speed + uv index
// weather condition represented by color (favorable, moderate, or severe)
// I'm mixing JavaScript and jQuery

$(document).ready(function () {
  // getUVI();
  // getWeather();
  // nextFive();
  // getWeather();
});

// select search section
var form = document.querySelector("form");
var searchBtn = document.querySelector("#searchbtn");
var searchCity = document.querySelector("#search"); // input
var cityList = document.querySelector("#cityList"); // for the new added city
var historyList = document.querySelector("#historyList"); // ul
var historyListItem = document.createElement("button");

// get the item from local storage and later use it to fetch city and uvi
var localStorageCity = JSON.parse(localStorage.getItem("city"));

// UVI section
// function using 2 parameters, call inside getWeather function
var getUVI = function (lat, lon) {
  var uvi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=61763921a1722d721341f9896cdced9f";

  fetch(uvi).then(function (response) {
    response.json().then(function (data) {
      // localStorage.setItem("uvi", JSON.stringify(data.current.uvi));

      $("#day0uvi").text("UV Index: " + data.current.uvi);

      // UV Index color
      // parseInt the current uvi and compare to uvi warning colors, add class and change background color
      let currentUVI = parseInt(data.current.uvi);
      if (currentUVI <= 2) {
        $("#day0uvi").addClass("green");
      }
      if (currentUVI >= 3 && currentUVI <= 5) {
        $("#day0uvi").addClass("yellow");
      }
      if (currentUVI >= 6 && currentUVI <= 7) {
        $("#day0uvi").addClass("orange");
      }
      if (currentUVI >= 8 && currentUVI <= 10) {
        $("#day0uvi").addClass("red");
      }
      if (currentUVI >= 11) {
        $("#day0uvi").addClass("violet");
      }

      // console.log(currentUVI);
      // console.log("UVI log", data);
      // console.log("UV Index = " + data.current.uvi);
    });
  });
};

// get today weather, lat and lon
// call getUVI function
// print today weather
var getWeather = function (cityInput) {
  var oneDay = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";

  fetch(oneDay)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // print weather for today
          $(".city").text(data.name + ", " + data.sys.country);
          $("#description").text(data.weather[0].description);
          $("#day0temp").text("Temp: " + data.main.temp + " \u00B0F");
          $("#day0humidity").text("Humidity: " + data.main.humidity + "%");
          $("#day0wind").text("Wind: " + data.wind.speed + " MPH");

          // add weather icon today
          $("#day0icon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");

          // // all my console.log to find the data
          // console.log("today weather", data);
          // console.log("day0icon = " + data.weather[0].icon);
          // console.log("city = " + data.name);
          // console.log("country = " + data.sys.country);
          // console.log("temp = " + data.main.temp + " F");
          // console.log("humidity = " + data.main.humidity + " %");
          // console.log("wind = " + data.wind.speed + " MPH");
          getUVI(data.coord.lat, data.coord.lon);
          // console.log("lat = " + data.coord.lat);
          // console.log("lon = " + data.coord.lon);
          return;
        });
      }
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
};

// next 5 days function
var nextFive = function (cityInput) {
  var fiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";

  fetch(fiveDays).then(function (response) {
    response.json().then(function (data) {
      // add weather icon 5 days
      $("#day1icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
      $("#day2icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png");
      $("#day3icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png");
      $("#day4icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png");
      $("#day5icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png");

      // print weather next 5 days
      $("#day1temp").text("Temp: " + data.list[0].main.temp + " \u00B0F");
      $("#day1humidity").text("Humidity: " + data.list[0].main.humidity + "%");
      $("#day1wind").text("Wind: " + data.list[0].wind.speed + " MPH");

      $("#day2temp").text("Temp: " + data.list[1].main.temp + " \u00B0F");
      $("#day2humidity").text("Humidity: " + data.list[1].main.humidity + "%");
      $("#day2wind").text("Wind: " + data.list[1].wind.speed + " MPH");

      $("#day3temp").text("Temp: " + data.list[2].main.temp + " \u00B0F");
      $("#day3humidity").text("Humidity: " + data.list[2].main.humidity + "%");
      $("#day3wind").text("Wind: " + data.list[2].wind.speed + " MPH");

      $("#day4temp").text("Temp: " + data.list[3].main.temp + " \u00B0F");
      $("#day4humidity").text("Humidity: " + data.list[3].main.humidity + "%");
      $("#day4wind").text("Wind: " + data.list[3].wind.speed + " MPH");

      $("#day5temp").text("Temp: " + data.list[4].main.temp + " \u00B0F");
      $("#day5humidity").text("Humidity: " + data.list[4].main.humidity + "%");
      $("#day5wind").text("Wind: " + data.list[4].wind.speed + " MPH");

      // // all my console.log to find the data
      // console.log("5 days", data);
      // console.log("day1icon = " + data.list[0].weather[0].icon);
      // console.log("day1 temp = " + data.list[0].main.temp + "F");
      // console.log("day1 humidity = " + data.list[0].main.humidity + "%");
      // console.log("day1 wind = " + data.list[0].wind.speed + " MPH");
    });
  });
};

//
// display day and time
// prototype - first time using
var date = new Date();

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// select/set day, today and next 5 days
$("#day0").text("Today is: " + date.addDays(0).toLocaleDateString("en-US"));
$("#day1").text(date.addDays(1).toLocaleDateString("en-US"));
$("#day2").text(date.addDays(2).toLocaleDateString("en-US"));
$("#day3").text(date.addDays(3).toLocaleDateString("en-US"));
$("#day4").text(date.addDays(4).toLocaleDateString("en-US"));
$("#day5").text(date.addDays(5).toLocaleDateString("en-US"));
//

// Local Storage section
// keep data after refresh page

var allCities = []; // Array to hold all searched all cities

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.setItem("city", JSON.stringify(searchCity.value));

  var cityInput = document.querySelector("#search").value; // or $("#search").val(); //saves the city that has been entered

  allCities = JSON.parse(localStorage.getItem("allCities")) || []; // Get cities
  allCities.push(cityInput); // pushes new cities entered to array
  localStorage.setItem("allCities", JSON.stringify(allCities)); //saves city input to local storage

  // add Enter button functionality
  $("#search").keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#searchbtn").click();
    }
  });
  getWeather();
  nextFive();

  location.reload();
});

// disable search button if input is empty, not the perfect fix
// add function to html search button
function stoppedTyping() {
  if (InputEvent.length > 0) {
    document.querySelector("#searchbtn").disabled = false;
  } else {
    document.querySelector("#searchbtn").disabled = true;
  }
}

// delete task button
// call inside HTML
function deleteCity() {
  localStorage.removeItem("allCities"); // just the key: city
  location.reload();
}

// delete task button - other option
$("#deleteCity").click(function (e) {
  e.preventDefault();
  localStorage.removeItem("allCities"); // just the key: city
  location.reload();
});

//  Function to retrieve the stored input that was saved in each input
function showLastCity() {
  $("#historyList").empty(); // empties out previous array
  var cityFromStorage = JSON.parse(localStorage.getItem("allCities")) || []; // Makes all cities searched a string
  var arrayLength = cityFromStorage.length; // limits length of array

  for (var i = 0; i < arrayLength; i++) {
    // Loop so it prepends all cities within the length of the array
    var cityNameFromArray = cityFromStorage[i].toUpperCase(); // save to array and all upper case

    // console.log(cityFromStorage);

    // append list of search history
    $("#historyList").append(
      "<div>" +
        // City text
        "<button class='btn btn-light showCityAgain'>" +
        cityNameFromArray +
        "</button>"
    );
  }
}
showLastCity();

// show cities on click
$(".showCityAgain").on("click", function (event) {
  event.preventDefault();
  var lastCity = $(this).text();

  // console.log(lastCity);

  getWeather(lastCity);
  nextFive(lastCity);
});

getWeather(localStorageCity);
nextFive(localStorageCity);

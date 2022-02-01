// search a city and add to history search
// show current and next 5 days weather
// display city name + date + weather icon + temp + humidity + wind speed + uv index
// weather condition represented by color (favorable, moderate, or severe)

$(document).ready(function () {
  // getUVI();
  // getWeather();
  // nextFive();
  // getWeather();
});

// select search section
var saveBtn = document.querySelector("#searchbtn");
var searchCity = document.querySelector("#search");

// select ul to display search history
var historyList = document.querySelector("#historyList");
var historyListItem = document.createElement("button");

// get the item from local storage and later use it to fetch city and uvi
var city = JSON.parse(localStorage.getItem("city"));
var lat = JSON.parse(localStorage.getItem("lat"));
var lon = JSON.parse(localStorage.getItem("lon"));

var oneDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";
var uvi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=61763921a1722d721341f9896cdced9f";
var fiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";

var getWeather = function () {
  fetch(oneDay)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          localStorage.setItem("lat", JSON.stringify(data.coord.lat));
          localStorage.setItem("lon", JSON.stringify(data.coord.lon));
          localStorage.setItem("city", JSON.stringify(data.name));
          localStorage.setItem("country", JSON.stringify(data.sys.country));
          localStorage.setItem("day0temp", JSON.stringify(data.main.temp));
          localStorage.setItem("day0humidity", JSON.stringify(data.main.humidity));
          localStorage.setItem("day0wind", JSON.stringify(data.wind.speed));

          // console.log("today weather", data);
          // console.log("weather icon = " + data.weather[0].icon);
          // console.log("city = " + data.name);
          // console.log("country = " + data.sys.country);
          // console.log("temp = " + data.main.temp + " F");
          // console.log("humidity = " + data.main.humidity + " %");
          // console.log("wind = " + data.wind.speed + " MPH");
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
var nextFive = function (city) {
  fetch(fiveDays).then(function (response) {
    response.json().then(function (data) {
      localStorage.setItem("day1temp", JSON.stringify(data.list[0].main.temp));
      localStorage.setItem("day1humidity", JSON.stringify(data.list[0].main.humidity));
      localStorage.setItem("day1wind", JSON.stringify(data.list[0].wind.speed));

      localStorage.setItem("day2temp", JSON.stringify(data.list[1].main.temp));
      localStorage.setItem("day2humidity", JSON.stringify(data.list[1].main.humidity));
      localStorage.setItem("day2wind", JSON.stringify(data.list[1].wind.speed));

      localStorage.setItem("day3temp", JSON.stringify(data.list[2].main.temp));
      localStorage.setItem("day3humidity", JSON.stringify(data.list[2].main.humidity));
      localStorage.setItem("day3wind", JSON.stringify(data.list[2].wind.speed));

      localStorage.setItem("day4temp", JSON.stringify(data.list[3].main.temp));
      localStorage.setItem("day4humidity", JSON.stringify(data.list[3].main.humidity));
      localStorage.setItem("day4wind", JSON.stringify(data.list[3].wind.speed));

      localStorage.setItem("day5temp", JSON.stringify(data.list[4].main.temp));
      localStorage.setItem("day5humidity", JSON.stringify(data.list[4].main.humidity));
      localStorage.setItem("day5wind", JSON.stringify(data.list[4].wind.speed));

      // console.log("5 days", data);
      // console.log("day1 temp = " + data.list[0].main.temp + "F");
      // console.log("day1 humidity = " + data.list[0].main.humidity + "%");
      // console.log("day1 wind = " + data.list[0].wind.speed + " MPH");
    });
  });
};

//
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
$("#day0").text(date.addDays(0).toLocaleDateString("en-US"));
$("#day1").text(date.addDays(1).toLocaleDateString("en-US"));
$("#day2").text(date.addDays(2).toLocaleDateString("en-US"));
$("#day3").text(date.addDays(3).toLocaleDateString("en-US"));
$("#day4").text(date.addDays(4).toLocaleDateString("en-US"));
$("#day5").text(date.addDays(5).toLocaleDateString("en-US"));

//
//
// Local Storage section
// keep data after refresh page
saveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.setItem("city", JSON.stringify(searchCity.value));
  getWeather();
  nextFive();
  getWeather();
  getUVI();

  location.reload();
});

$("#search").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchbtn").click();
  }
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
function deleteCity() {
  localStorage.removeItem("city"); // just the key: city
  location.reload();
}

// add search history as clickable button
historyListItem.id = "cityList";
historyListItem.setAttribute("class", "btn btn-light");
historyListItem.innerText = JSON.parse(localStorage.getItem("city")); // get the data from local storage, key: city
historyList.appendChild(historyListItem);

// print information
$(".city").text(JSON.parse(localStorage.getItem("city")) + ", " + JSON.parse(localStorage.getItem("country")));
$("#day0temp").text("Temp: " + JSON.parse(localStorage.getItem("day0temp")) + " \u00B0F");
$("#day0humidity").text("Humidity: " + JSON.parse(localStorage.getItem("day0humidity")) + "%");
$("#day0wind").text("Wind: " + JSON.parse(localStorage.getItem("day0wind")) + " MPH");
$("#day0uvi").text("UV Index: " + JSON.parse(localStorage.getItem("uvi")));

// next 5 days
$("#day1temp").text("Temp: " + JSON.parse(localStorage.getItem("day1temp")) + " \u00B0F");
$("#day1humidity").text("Humidity: " + JSON.parse(localStorage.getItem("day1humidity")) + "%");
$("#day1wind").text("Wind: " + JSON.parse(localStorage.getItem("day1wind")) + " MPH");

$("#day2temp").text("Temp: " + JSON.parse(localStorage.getItem("day2temp")) + " \u00B0F");
$("#day2humidity").text("Humidity: " + JSON.parse(localStorage.getItem("day2humidity")) + "%");
$("#day2wind").text("Wind: " + JSON.parse(localStorage.getItem("day2wind")) + " MPH");

$("#day3temp").text("Temp: " + JSON.parse(localStorage.getItem("day3temp")) + " \u00B0F");
$("#day3humidity").text("Humidity: " + JSON.parse(localStorage.getItem("day3humidity")) + "%");
$("#day3wind").text("Wind: " + JSON.parse(localStorage.getItem("day3wind")) + " MPH");

$("#day4temp").text("Temp: " + JSON.parse(localStorage.getItem("day4temp")) + " \u00B0F");
$("#day4humidity").text("Humidity: " + JSON.parse(localStorage.getItem("day4humidity")) + "%");
$("#day4wind").text("Wind: " + JSON.parse(localStorage.getItem("day4wind")) + " MPH");

$("#day5temp").text("Temp: " + JSON.parse(localStorage.getItem("day5temp")) + " \u00B0F");
$("#day5humidity").text("Humidity: " + JSON.parse(localStorage.getItem("day5humidity")) + "%");
$("#day5wind").text("Wind: " + JSON.parse(localStorage.getItem("day5wind")) + " MPH");

// UVI section
var getUVI = function () {
  fetch(uvi).then(function (response) {
    response.json().then(function (data) {
      localStorage.setItem("uvi", JSON.stringify(data.current.uvi));

      console.log("UV Index = " + data.current.uvi);
      // console.log("UVI log", data);
    });
  });
};

getWeather();
nextFive();
getWeather();
getUVI();

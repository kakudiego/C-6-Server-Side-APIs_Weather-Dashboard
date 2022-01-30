// search a city and add to history search
// show current and next 5 days weather
// display city name + date + weather icon + temp + humidity + wind speed + uv index
// weather condition represented by color (favorable, moderate, or severe)

var city = "cochabamba";

var oneDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";
var fiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";

var uvi = "https://api.openweathermap.org/data/2.5/onecall?lat=-17.3895&lon=-66.1568&exclude=minutely,hourly&appid=61763921a1722d721341f9896cdced9f";
// var uvIndex = (lat + lon)

var getWeather = function (city) {
  fetch(oneDay).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log("temp = " + data.main.temp);
        console.log("humidity = " + data.main.humidity);
        console.log("UV Index = " + data.main.humidity);
        console.log("wind = " + data.wind.speed);
        console.log("lat = " + data.coord.lat);
        console.log("lon = " + data.coord.lon);
      });
    }
  });
};
getWeather();

var getWeather = function (city) {
  fetch(fiveDays).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};
getWeather();

// UVI section
var getUVI = function () {
  fetch(uvi).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};
getUVI();

// display day and time
// prototype - first time using
var date = new Date();

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// select/change day and time
$("#day1").text(date.addDays(0).toLocaleDateString("en-US"));
$("#day2").text(date.addDays(1).toLocaleDateString("en-US"));
$("#day3").text(date.addDays(2).toLocaleDateString("en-US"));
$("#day4").text(date.addDays(3).toLocaleDateString("en-US"));
$("#day5").text(date.addDays(4).toLocaleDateString("en-US"));
$("#day6").text(date.addDays(5).toLocaleDateString("en-US"));

// search section
var search = $("#search");

var searchForm = function (event) {
  event.preventDefault();
  var cidade = search.value;
  console.log(event);
};

$("#searchbtn").click(function (e) {
  e.preventDefault();
});

$("#search").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchbtn").click();
  }
});

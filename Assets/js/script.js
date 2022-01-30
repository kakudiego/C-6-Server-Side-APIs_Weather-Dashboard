// search a city and add to history search
// show current and next 5 days weather
// display city name + date + weather icon + temp + humidity + wind speed + uv index
// weather condition represented by color (favorable, moderate, or severe)
//

//
// API key
var apiKey;
var city = "Saint Paul";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

fetch(queryURL);

//
//
// display day and time
// prototype - first time using
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
var date = new Date();

// select/change day and time
document.querySelector("#day1").innerHTML = date.addDays(0).toLocaleDateString("en-US");
document.querySelector("#day2").innerHTML = date.addDays(1).toLocaleDateString("en-US");
document.querySelector("#day3").innerHTML = date.addDays(2).toLocaleDateString("en-US");
document.querySelector("#day4").innerHTML = date.addDays(3).toLocaleDateString("en-US");
document.querySelector("#day5").innerHTML = date.addDays(4).toLocaleDateString("en-US");
document.querySelector("#day6").innerHTML = date.addDays(5).toLocaleDateString("en-US");

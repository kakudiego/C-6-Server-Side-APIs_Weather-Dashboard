// search a city and add to history search
// show current and next 5 days weather
// display city name + date + weather icon + temp + humidity + wind speed + uv index
// weather condition represented by color (favorable, moderate, or severe)

var city = "cochabamba"; // change to data.name
var lat = "17.3895"; // change to data.coord.lat
var lon = "-66.1568"; // change to data.coord.lon

var oneDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";
var uvi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=61763921a1722d721341f9896cdced9f";
var fiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=61763921a1722d721341f9896cdced9f";

var getWeather = function (city) {
  fetch(oneDay)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("today weather", data);
          console.log("city = " + data.name);
          console.log("temp = " + data.main.temp + " F");
          console.log("humidity = " + data.main.humidity + " %");
          console.log("wind = " + data.wind.speed + " MPH");
          console.log("lat = " + data.coord.lat);
          console.log("lon = " + data.coord.lon);
          return;
        });
      }
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
};
getWeather();

// UVI section
var getUVI = function (lat, lon) {
  fetch(uvi).then(function (response) {
    response.json().then(function (data) {
      console.log("UV Index = " + data.current.uvi);
      console.log("UVI log", data);
    });
  });
};
getUVI();

var nextFive = function (city) {
  fetch(fiveDays).then(function (response) {
    response.json().then(function (data) {
      console.log("5 days", data);
    });
  });
};
nextFive();

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

// select/change day and time
$("#day1").text(date.addDays(0).toLocaleDateString("en-US"));
$("#day2").text(date.addDays(1).toLocaleDateString("en-US"));
$("#day3").text(date.addDays(2).toLocaleDateString("en-US"));
$("#day4").text(date.addDays(3).toLocaleDateString("en-US"));
$("#day5").text(date.addDays(4).toLocaleDateString("en-US"));
$("#day6").text(date.addDays(5).toLocaleDateString("en-US"));

//
//
// Local Storage section
// keep data after refresh page
let saveBtn = document.querySelector("#searchbtn");
let searchCity = document.querySelector("#search");

// select ul to display search history
let historyList = document.querySelector("#historyList");
let historyListItem = document.createElement("button");
historyListItem.id = "cityList";
historyListItem.setAttribute("class", "btn btn-light");
historyListItem.innerText = JSON.parse(localStorage.getItem("city")); // get the data from local storage, key: city
historyList.appendChild(historyListItem);

// searchCity.value = JSON.parse(localStorage.getItem("city"));

saveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.setItem("city", JSON.stringify(searchCity.value));
});

$("#search").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchbtn").click();
  }
});

// delete task button
// input empty
function deleteCity() {
  localStorage.removeItem("city"); // just the key: city
  searchCity.value = "";
  location.reload();
}

// weather array to put current weather in
let weather = [];
// forcastweather array to put current weather in
let forecast_tweather = [];

// array to get dayname and month form localtime
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// countrys selectbox
let country_location = document.getElementById("country_location");

//----------------  this is old function if you want to try it ----------------------------------------------------------------------------

// function to get current weather from api in old way

// function currentweather(country = "Egypt") {
//   let currentweather = new XMLHttpRequest;
//   currentweather.open("GET", `https://api.weatherapi.com/v1/current.json?key=9871ccc4bfc84de8836202720220506&q=${country}&aqi=no`);
//   currentweather.send();
//   currentweather.addEventListener("readystatechange", function () {
//     if (this.readyState == 4 && this.status == 200) {
//       weather = JSON.parse(this.response);
//       displaycurrentweather();
//     }
//   });
// }

// function to get forecast weather from api in old way

// function forecastweather(country = "Egypt") {
//   let forecastweather = new XMLHttpRequest;
//   forecastweather.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=9871ccc4bfc84de8836202720220506&q=${country}&days=3&aqi=no&alerts=no`);
//   forecastweather.send();
//   forecastweather.addEventListener("readystatechange", function () {
//     if (this.readyState == 4 && this.status == 200) {
//       forecast_tweather = JSON.parse(this.response).forecast.forecastday;
//       displayforecastweather ();
//     }
//   });
// }
//----------------  this is old function if you want to try it ----------------------------------------------------------------------------

// function to get current weather from api in es6

async function currentweather_(country = "Egypt") {
  let currentweather = await fetch(`https://api.weatherapi.com/v1/current.json?key=9871ccc4bfc84de8836202720220506&q=${country}&aqi=no`)
  weather = await currentweather.json();
  displaycurrentweather();
}

// function to get forecast weather from api in es6

async function forecastweather_(country = "Egypt") {
  let forecastweather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9871ccc4bfc84de8836202720220506&q=${country}&days=3&aqi=no&alerts=no`)
  let forecast_tweather_json = await forecastweather.json();
  forecast_tweather = forecast_tweather_json.forecast.forecastday;
  displayforecastweather();
}


// currentweather();
// forecastweather();
currentweather_();
forecastweather_();

// function to display current weather data from api in innerhtml
function displaycurrentweather() {

  let weather_time = weather.location.localtime;
  let dayName = days[new Date(weather_time).getDay()];
  let dmonth = new Date(weather_time).getDate();
  let monthname = months[new Date(weather_time).getMonth()];

  let weather_tamp = `<div class="forecast-header d-flex justify-content-between align-items-center">
  <div class="day">${dayName}</div>
  <div class="date">${dmonth} ${monthname}</div>
  </div>
  <div class="location text-center pt-4 fs-5 text-muted">
    ${weather.location.country}
  </div>
  <div class="forecast-body text-center row align-items-center">
    <div class="col-8 degree">
      <div class="num">${weather.current.temp_c} <sup>o </sup>c</div>
    </div>
    <div class="col-4 forecast-icon">
      <img src="https:${weather.current.condition.icon}" alt="" width="90">
      <div class="custom">${weather.current.condition.text}</div>
    </div>
  </div>
  <div class="forecast-footer text-center">
    <span class="text-muted"><i class="fa-solid fa-umbrella"></i>${weather.current.humidity} %</span>
    <span class="text-muted"><i class="fa-solid fa-wind"></i>${weather.current.wind_kph} km/h</span>
    <span class="text-muted"><i class="fa-solid fa-hurricane"></i>${weather.current.wind_dir}</span>
  </div>`

  document.getElementById("current_weather").innerHTML = weather_tamp;
}

// function to display forecast weather data from api in innerhtml
function displayforecastweather() {
  forecast_tweather_temp = "";
  for (let i = 1; i < forecast_tweather.length; i++) {
    forecast_tweather_temp += `<div class="col-md-6 text-center">
          <div class="forecast-header">
            <div class="day">${days[new Date(forecast_tweather[i].date).getDay()]}</div>
          </div>
          <div class="forecast-body d-flex justify-content-center align-items-center flex-column mt-2">
            <div class="forecast-icon">
              <img src="https:${forecast_tweather[i].day.condition.icon}" alt="" width="50">
            </div>
            <div class="degree my-4">
              <div class="big-num">${forecast_tweather[i].day.maxtemp_c}<sup> o</sup> c</div>
              <div class="sm-num text-muted">${forecast_tweather[i].day.mintemp_c}<sup> o</sup> c</div>
            </div>
            <div class="custom">${forecast_tweather[i].day.condition.text}</div>
          </div>
        </div>`
  } 
  document.getElementById("forecast_tweather").innerHTML = forecast_tweather_temp;
}

// change country if user click on new country
country_location.addEventListener("click", function () {
  let country_name = this.value;

  // this is old function if you want to try it
  // currentweather(country_name);
  // forecastweather(country_name);
  currentweather_(country_name);
  forecastweather_(country_name);
});



var apiKey = "8580830c11a7191e5ae4a3dfc3543929";

var container = document.getElementById("container");
var searchButton = document.getElementById("search-button");
var locationSearch = document.getElementById("input-info");
var city = locationSearch.value;
var lat;
var lon;


searchButton.addEventListener("click",userInput);

function userInput(event){
    event.preventDefault()
    city = locationSearch.value;
    // console.log(city);
    getSecondApi(city);
    
}

function getApi(){
    var requestUrlByCity = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(requestUrlByCity)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log("this is the current day forecast data ", data);
        var location = document.createElement("h2");
        location.textContent = data.name;
        var currentDayHeader = document.createElement("h3");
        currentDayHeader.textContent =  " Current Day Forecast ";
        var currentDay = document.createElement("p");
        currentDay.textContent = " Temp: " + data.main.temp + " F " + " Feels like: " + data.main.feels_like  + " F " + data.weather[0].description + " Humidity: " + data.main.humidity + " " +  " Wind: " + data.wind.speed + " mph ";
        container.append(location);
        container.append(currentDayHeader);
        container.append(currentDay);
    })
}


function getSecondApi(){
    var requestFiveDay = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(requestFiveDay)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(" five day forecast data ", data);
        console.log(data.city.name);
        console.log(data.list[0].dt_txt);
        console.log("Temp: " + data.list[0].main.temp + " F " + " Feels like: " +  data.list[0].main.feels_like + " F " + " Wind: " + data.list[0].wind.speed + " mph " + " Humidity: " + data.list[0].main.humidity + " " + data.list[0].weather[0].description);
        lat = data.city.coord.lat;
        lon = data.city.coord.lon;
        console.log(data.list[6].dt_txt + "Temp: " + data.list[6].main.temp + " F " + " Wind: " + data.list[6].wind.speed + " mph " + " Humidity: " + data.list[6].main.humidity + " " + data.list[6].weather[0].description);
        console.log(data.list[14].dt_txt + "Temp: " + data.list[14].main.temp + " F " + " Wind: " + data.list[14].wind.speed + " mph " + " Humidity: " + data.list[14].main.humidity + " " + data.list[14].weather[0].description);
        console.log(data.list[22].dt_txt + "Temp: " + data.list[22].main.temp + " F " + " Wind: " + data.list[22].wind.speed + " mph " + " Humidity: " + data.list[22].main.humidity + " " + data.list[22].weather[0].description);
        console.log(data.list[30].dt_txt + "Temp: " + data.list[30].main.temp + " F " + " Wind: " + data.list[30].wind.speed + " mph " + " Humidity: " + data.list[30].main.humidity + " " + data.list[30].weather[0].description);
        console.log(data.list[38].dt_txt + "Temp: " + data.list[38].main.temp + " F " + " Wind: " + data.list[38].wind.speed + " mph " + " Humidity: " + data.list[38].main.humidity + " " + data.list[38].weather[0].description);
        getApi()
    })
}

// function getSecondApi(lat, lon){
//     apiKey = "8580830c11a7191e5ae4a3dfc3543929"
//     console.log(lat)
//     console.log(lon)
//     var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,daily&appid=${apiKey}`

//     fetch(requestUrl)
//     .then(function (response){
//         console.log(response)
//         console.log("API response above")
//         return response.json();
//     }).then(function(data){
//         console.log(data)
//         var singleDay  //something from data
//         createTodayForecast(singleDay)
//         var fiveDayArray = []
//         fiveDayArray.push()
//         puplateFiveDayCards(fiveDayArray)
//     })
// }

// function getApi() {
//     apiKey = "8580830c11a7191e5ae4a3dfc3543929";
//     var reqUrlByCity = `http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&limit=1&appid=${apiKey}`

//     fetch(reqUrlByCity)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var lat = data[0].lat;
//             var lon = data[0].lon;
//             getSecondApi(lat, lon)
//         })
// }



// getApi()
// getSecondApi()

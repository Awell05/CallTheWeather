var apiKey = "8580830c11a7191e5ae4a3dfc3543929";

var searchButton = document.getElementById("search-button");
var locationSearch = document.getElementById("input-info");
var city = locationSearch.value;


searchButton.addEventListener("click",userInput);

function userInput(event){
    event.preventDefault()
    city = locationSearch.value;
    console.log(city);
    getApi(city);
    getSecondApi(city);
    
}

function getApi(){
    var requestUrlByCity = `https://api.openweathermap.org/data/2.5/weather?lat=32.78&lon=-96.80&appid=${apiKey}&units=imperial`;

    fetch(requestUrlByCity)
    .then(function (response){
        console.log("this is the first response", response);
        return response.json();
    })
    .then(function(data){
        console.log("this is the data " , data);
        console.log(data.coord.lat + data.coord.lon + " Temp: " + data.main.temp + " F " + " Feels like " + data.main.feels_like  + " F " + data.weather[0].description + " Humidity " + data.main.humidity + " " +  " Wind " + data.wind.speed );
        console.log();
        
    })
}


function getSecondApi(){
    var requestFiveDay = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(requestFiveDay)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.city.name);
        console.log(data.list[0].dt_txt);
        console.log(data.city.coord.lat);
        console.log(data.city.coord.lon);
        console.log("Temp: " + data.list[0].main.temp + " F " + " Feels like: " +  data.list[0].main.feels_like + " F " + " Wind: " + data.list[0].wind.speed + " mph " + " Humidity: " + data.list[0].main.humidity + " " + data.list[0].weather[0].description);
        
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

// //figure out how to get latitude
// //figure out how to get longitude


// getApi()
// getSecondApi()

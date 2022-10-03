var apiKey = "8580830c11a7191e5ae4a3dfc3543929";

var searchButton = document.getElementById("search-button");
var locationSearch = document.getElementById("input-info");
var city = locationSearch.value;


searchButton.addEventListener("click",userInput);

function userInput(event){
    event.preventDefault()
    city = locationSearch.value;
    console.log(city);
    getSecondApi(city);
}

// function getApi(){
//     var requestUrlByCity = `http://api.openweathermap.org/geo/1.0/direct?q=Chicago&limit=1&appid=${apiKey}`;

//     fetch(requestUrlByCity)
//     .then(function (response){
//         console.log("this is the first .then()", response);
//         return response.json();
//     })
//     .then(function(data){
//         console.log("this is the second .then()" , data);
//         console.log(data[0].lat);
//         console.log(data[0].lon);
        
//     })
// }


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

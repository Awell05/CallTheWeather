var apiKey = "8580830c11a7191e5ae4a3dfc3543929";
var locationSearch = document.getElementById("input-info");
var searchButton = document.getElementById("search-button");
var citySearched = document.getElementById("input-info");
console.log(citySearched);

var city;





function getApi(){
    var requestUrlByCity = `http://api.openweathermap.org/geo/1.0/direct?q=Baltimore&limit=1&appid=${apiKey}`;

    fetch(requestUrlByCity)
    .then(function (response){
        console.log("this is the first .then()", response);
        return response.json();
    })
    .then(function(data){
        console.log("this is the second .then()" , data);
        
    })
}


function getSecondApi(){
    var requestFiveDay = `http://api.openweathermap.org/data/2.5/forecast?lat=39.29&lon=-76.61&appid=${apiKey}`;
    fetch(requestFiveDay)
    .then(function (response){
        console.log("second request", response);
        return response.json();
    })
    .then(function(data){
        console.log("second request data", data);
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


getApi()
getSecondApi()
// searchButton.addEventListener("click",getApi);
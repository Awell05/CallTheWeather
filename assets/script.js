var apiKey = "8580830c11a7191e5ae4a3dfc3543929";

var container = document.getElementById("container");
var searchButton = document.getElementById("search-button");
var locationSearch = document.getElementById("input-info");
var city = locationSearch.value;
var lat;
var lon;
var form = document.getElementById("form");
var storage = JSON.parse(localStorage.getItem("cities")) || []
var fiveDayArea = document.getElementById('fiveday-forecast')


searchButton.addEventListener("click",userInput);

// var previousSearches = document.createElement("p");

// form.appendChild(previousSearches);
function renderHistory(){
    console.log(storage)
    var historyElement = document.getElementById('history')
    console.log(historyElement)
    storage.forEach(function(element){
        var button = document.createElement('button')
        button.innerHTML = element
        button.addEventListener('click', userInput)
        historyElement.append(button)
    })
}


function userInput(event){
    event.preventDefault()
    console.log(event.target.id)
    if(event.target.id != 'search-button'){
        return getSecondApi(event.target.innerHTML)
    }
    console.log("trigerred by city search")
    city = locationSearch.value;
    console.log(city)
    if (storage.includes(city)){
        return getSecondApi(city)
    }
    storage.push(city)
    localStorage.setItem("cities", JSON.stringify(storage));
    renderHistory()
    getSecondApi(city);
}

function getApi(){
    var requestUrlByCity = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(requestUrlByCity)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        container.innerHTML = ""
        console.log("this is the current day forecast data ", data);
        var cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        var location = document.createElement("h2");
        location.textContent = data.name;
        var currentDayHeader = document.createElement("h3");
        currentDayHeader.textContent =  " Current Day Forecast ";
        var currentDay = document.createElement("p");
        currentDay.textContent = " Temp: " + data.main.temp + " F " + " Feels like: " + data.main.feels_like  + " F " + data.weather[0].description + " Humidity: " + data.main.humidity + " " +  " Wind: " + data.wind.speed + " mph ";
        cardDiv.append(location);
        cardDiv.append(currentDayHeader);
        cardDiv.append(currentDay);
        container.append(cardDiv)
    })
}


function getSecondApi(searchValue){
    var requestFiveDay = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=imperial`;
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
        console.log(data.list[6].dt_txt + " " + "Temp: " + data.list[6].main.temp + " F " + " Wind: " + data.list[6].wind.speed + " mph " + " Humidity: " + data.list[6].main.humidity + " " + data.list[6].weather[0].description);
        console.log(data.list[14].dt_txt + " " + "Temp: " + data.list[14].main.temp + " F " + " Wind: " + data.list[14].wind.speed + " mph " + " Humidity: " + data.list[14].main.humidity + " " + data.list[14].weather[0].description);
        console.log(data.list[22].dt_txt + " " + "Temp: " + data.list[22].main.temp + " F " + " Wind: " + data.list[22].wind.speed + " mph " + " Humidity: " + data.list[22].main.humidity + " " + data.list[22].weather[0].description);
        console.log(data.list[30].dt_txt + " " + "Temp: " + data.list[30].main.temp + " F " + " Wind: " + data.list[30].wind.speed + " mph " + " Humidity: " + data.list[30].main.humidity + " " + data.list[30].weather[0].description);
        console.log(data.list[38].dt_txt + " " + "Temp: " + data.list[38].main.temp + " F " + " Wind: " + data.list[38].wind.speed + " mph " + " Humidity: " + data.list[38].main.humidity + " " + data.list[38].weather[0].description);
        for(let i=6; i<39; i+=8){
            var cardDiv = document.createElement('div')
            cardDiv.classList.add('card')
            var wind = document.createElement("p")
            wind.textContent = " Wind: " + data.list[i].wind.speed + " mph " ;
            var temp = document.createElement('p')
            temp.textContent = data.list[i].dt_txt + " " + "Temp: " + data.list[i].main.temp + " F "
            var humidity = document.createElement('p')
            humidity.textContent = " Humidity: " + data.list[i].main.humidity
            var forecast = document.createElement('p')
            forecast.textContent = "Forecast: " + data.list[i].weather[0].description
            cardDiv.append(temp, wind, humidity, forecast);
            fiveDayArea.appendChild(cardDiv);
        }
        getApi(searchValue)
    })
}


if (storage.length){
    renderHistory()
}
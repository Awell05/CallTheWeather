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



// Search Button
searchButton.addEventListener("click", userInput);

// Function to append button elements for searched cities
function renderHistory() {
    var historyElement = document.getElementById('history')
    historyElement.replaceChildren()
    storage.forEach(function (element) {
        var button = document.createElement('button')
        button.innerHTML = element
        button.addEventListener('click', userInput)
        historyElement.append(button)

    })
}

// stores searched cities into local storage
function userInput(event) {
    event.preventDefault()
    if (event.target.id != 'search-button') {
        return getSecondApi(event.target.innerHTML)
    }
    city = locationSearch.value;
    if (storage.includes(city)) {
        return getSecondApi(city)
    }
    storage.push(city)
    localStorage.setItem("cities", JSON.stringify(storage));
    renderHistory()
    getSecondApi(city);
}


// API to display current day forecast information
function getApi() {
    var requestUrlByCity = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(requestUrlByCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            container.innerHTML = ""
            var cardDiv = document.createElement('div')
            cardDiv.classList.add('card')
            var location = document.createElement("h2");
            location.textContent = data.name;
            var currentDayHeader = document.createElement("h3");
            currentDayHeader.textContent = " Current Day Forecast ";
            var currentTemp = document.createElement("p");
            currentTemp.textContent = " Temp: " + data.main.temp + " F ";
            var currentFeelsLike = document.createElement("p");
            currentFeelsLike.textContent = " Feels like: " + data.main.feels_like + " F ";
            var currentHumidity = document.createElement("p");
            currentHumidity.textContent = " Humidity: " + data.main.humidity + " "
            var currentWind = document.createElement("p");
            currentWind.textContent = " Wind: " + data.wind.speed + " mph ";
            var currentDataDescription = document.createElement("p");
            currentDataDescription.textContent = data.weather[0].description;
            cardDiv.append(location, currentDayHeader, currentTemp, currentFeelsLike, currentHumidity, currentWind, currentDataDescription);
            container.append(cardDiv)
        })
}

// second api to display five day forecast
function getSecondApi(searchValue) {
    var requestFiveDay = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=imperial`;
    fetch(requestFiveDay)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            fiveDayArea.innerHTML = ""
            var fiveDayHeader = document.createElement('h3')
            fiveDayHeader.textContent = " Five Day Forecast: "
            fiveDayHeader.setAttribute("style", "color: black;")
            fiveDayArea.append(fiveDayHeader);
            for (let i = 6; i < 39; i += 8) {
                var cardDiv = document.createElement('div')
                cardDiv.classList.add('cards')
                var wind = document.createElement("p")
                wind.textContent = " Wind: " + data.list[i].wind.speed + " mph ";
                var date = document.createElement("p");
                date.textContent = data.list[i].dt_txt;
                var temp = document.createElement('p')
                temp.textContent = "Temp: " + data.list[i].main.temp + " F ";
                var humidity = document.createElement('p')
                humidity.textContent = " Humidity: " + data.list[i].main.humidity;
                var forecast = document.createElement('p')
                forecast.textContent = "Forecast: " + data.list[i].weather[0].description;
                cardDiv.append(date, temp, wind, humidity, forecast);
                fiveDayArea.appendChild(cardDiv);
            }
            getApi(searchValue)
        })
}


if (storage.length) {
    renderHistory()
}
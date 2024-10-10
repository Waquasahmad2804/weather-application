const apiKey = "61b2bda6b7f77d3e18ac23d185fab591";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        weatherDiv.style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error('Error:', error);
        weatherDiv.style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").innerHTML = "City not found. Please check the spelling and try again.";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Load default city on page load
checkWeather("New York");
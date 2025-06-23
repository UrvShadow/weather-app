const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherDisplay = document.getElementById("weather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const iconDisplay = document.getElementById("icon");

const API_KEY = "e7276548fa9bd56c9daefb654f65df54";

async function getWeather(city) {
    weatherDisplay.classList.remove("hidden");
    locationDisplay.textContent = "";
    temperatureDisplay.textContent = "";
    descriptionDisplay.textContent = "";
    iconDisplay.src = "";

    if (!city) {
        descriptionDisplay.textContent = "Input city name.";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("Kota tidak ditemukan!");
        const data = await response.json();

        locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
        temperatureDisplay.textContent = `Temperature: ${data.main.temp} °C`;
        descriptionDisplay.textContent = `Condition: ${data.weather[0].description}`;
        iconDisplay.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
        descriptionDisplay.textContent = error.message;
    }
}

getWeatherButton.addEventListener("click", () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather(cityInput.value.trim());
    }
});

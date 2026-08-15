const API_KEY = "0f24e8e747154bab8f2165052261408";

const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

const locationName = document.getElementById("location");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");

const updated = document.getElementById("updated");


// Cities that should automatically use India
const indianCities = {
    "delhi": "Delhi, India",
    "new delhi": "New Delhi, India",
    "mumbai": "Mumbai, India",
    "bombay": "Mumbai, India",
    "bangalore": "Bangalore, India",
    "bengaluru": "Bangalore, India",
    "hyderabad": "Hyderabad, India",
    "chennai": "Chennai, India",
    "kolkata": "Kolkata, India",
    "pune": "Pune, India",
    "jaipur": "Jaipur, India",
    "lucknow": "Lucknow, India",
    "dehradun": "Dehradun, India",
    "agra": "Agra, India",
    "noida": "Noida, India",
    "gurgaon": "Gurgaon, India",
    "gurugram": "Gurgaon, India"
};


async function getWeather() {

    let location = locationInput.value.trim();

    // Check if user entered something
    if (location === "") {
        showError("Please enter a city or location.");
        return;
    }

    // Convert input to lowercase for comparison
    const cityKey = location.toLowerCase();

    // If city exists in our India list, use the Indian location
    if (indianCities[cityKey]) {
        location = indianCities[cityKey];
    }

    // Hide previous error
    errorMessage.style.display = "none";

    searchBtn.textContent = "Loading...";
    searchBtn.disabled = true;

    try {

        const API_URL =
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;

        const response = await fetch(API_URL);

        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            throw new Error(
                data.error?.message || "Unable to get weather data."
            );
        }

        // Display location
        locationName.textContent =
            `${data.location.name}, ${data.location.country}`;

        // Display temperature
        temperature.textContent =
            Math.round(data.current.temp_c);

        // Display weather condition
        condition.textContent =
            data.current.condition.text;

        // Display weather icon
        weatherIcon.src =
            "https:" + data.current.condition.icon;

        weatherIcon.alt =
            data.current.condition.text;

        // Display humidity
        humidity.textContent =
            `${data.current.humidity}%`;

        // Display wind
        wind.textContent =
            `${data.current.wind_kph} km/h`;

        // Display feels like
        feelsLike.textContent =
            `${Math.round(data.current.feelslike_c)}°C`;

        // Display update time
        updated.textContent =
            `Last updated: ${data.current.last_updated}`;

        // Show weather card
        weatherCard.classList.add("show");

    } catch (error) {

        weatherCard.classList.remove("show");

        showError(error.message);

    } finally {

        searchBtn.textContent = "Get Weather";
        searchBtn.disabled = false;

    }
}


// Show error message
function showError(message) {

    errorMessage.textContent = message;
    errorMessage.style.display = "block";

}


// Search button
searchBtn.addEventListener("click", getWeather);


// Press Enter to search
locationInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});
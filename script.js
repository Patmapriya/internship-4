const API_KEY = "YOUR_API_KEY"; // Replace this

const input = document.getElementById("city-input");
const button = document.getElementById("search-btn");
const result = document.getElementById("weather-result");
const errorEl = document.getElementById("error");

// ===== FETCH WEATHER =====
async function getWeather(city) {
  try {
    errorEl.textContent = "";
    result.classList.add("hidden");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (error) {
    errorEl.textContent = error.message;
  }
}

// ===== DISPLAY DATA =====
function displayWeather(data) {
  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather
  } = data;

  result.innerHTML = `
    <h2>${name}</h2>
    <p>🌡 Temperature: ${temp}°C</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>🌬 Wind Speed: ${speed} m/s</p>
    <p>🌥 Condition: ${weather[0].description}</p>
  `;

  result.classList.remove("hidden");
}

// ===== EVENTS =====
button.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) getWeather(city);
});

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const city = input.value.trim();
    if (city) getWeather(city);
  }
});
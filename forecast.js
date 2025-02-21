document.addEventListener('DOMContentLoaded', () => {
  const getForecastBtn = document.getElementById('getForecastBtn');
  const cityInput = document.getElementById('city');
  const forecastCardsContainer = document.getElementById('forecastCards');

  getForecastBtn.addEventListener('click', () => {
      const city = cityInput.value;
      if (city) {
          getWeatherForecast(city);
      } else {
          alert('Please enter a city name.');
      }
  });

  async function getWeatherForecast(city) {
      const apiKey = '9b30ffc7236248fb922170638251902'; // Replace with your actual API key
      const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

      try {
          const response = await fetch(forecastUrl);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          if (data.error) {
              alert(`Error: ${data.error.message}`);
              return;
          }

          displayForecast(data);
      } catch (error) {
          console.error('Error fetching forecast data:', error);
          alert('Failed to fetch forecast data.');
      }
  }

  function displayForecast(data) {
      forecastCardsContainer.innerHTML = ''; // Clear existing cards
      document.getElementById('cityName').textContent = data.location.name;

      data.forecast.forecastday.forEach((day, index) => {
          const dayId = index + 1;
          const date = day.date;
          const maxTempC = day.day.maxtemp_c;
          const minTempC = day.day.mintemp_c;
          const avgTempC = day.day.avgtemp_c;
          const humidity = day.day.avghumidity;
          const windSpeed = day.day.maxwind_kph;
          const sunrise = day.astro.sunrise;
          const sunset = day.astro.sunset;
          const feelsLikeC = day.day.feelslike_c;
          const chanceOfSnow = day.day.daily_chance_of_snow;
          const dewPointC = day.day.mintemp_c;
          const conditionText = day.day.condition.text;
          const conditionIcon = day.day.condition.icon;

          const card = document.createElement('div');
          card.className = 'col-md-4 mb-4';
          card.innerHTML = `
              <div class="card">
                  <div class="card-header">
                      <h5>Day ${dayId}: ${date}</h5>
                  </div>
                  <div class="card-body">
                      <img src="${conditionIcon}" alt="Weather Icon">
                      <p><strong>Condition:</strong> ${conditionText}</p>
                      <p><strong>Max Temp:</strong> ${maxTempC} °C <span>&#8593;</span></p>
                      <p><strong>Min Temp:</strong> ${minTempC} °C <span>&#8595;</span></p>
                      <p><strong>Avg Temp:</strong> ${avgTempC} °C</p>
                      <p><strong>Humidity:</strong> ${humidity} %</p>
                      <p><strong>Wind Speed:</strong> ${windSpeed} kph</p>
                      <p><strong>Sunrise:</strong> ${sunrise}</p>
                      <p><strong>Sunset:</strong> ${sunset}</p>
                      <p><strong>Feels Like:</strong> ${feelsLikeC !== undefined ? feelsLikeC : 'N/A'} °C</p>
                      <p><strong>Chance of Snow:</strong> ${chanceOfSnow !== undefined ? chanceOfSnow : 'N/A'} %</p>
                      <p><strong>Dewpoint:</strong> ${dewPointC} °C</p>
                  </div>
              </div>
          `;
          forecastCardsContainer.appendChild(card);
      });
  }
});

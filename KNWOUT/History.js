document.addEventListener("DOMContentLoaded", () => {
    const load14DaysDataButton = document.getElementById('load14DaysData');

    load14DaysDataButton.addEventListener('click', () => {
        const city = localStorage.getItem('lastSearchedCity');

        if (city) {
            getWeatherHistory(city);
        } else {
            alert("Please search for a city first.");
        }
    });

    function getWeatherHistory(city) {
        const apiKey = '9b30ffc7236248fb922170638251902';
        const historyUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=`;

        let historyData = [];

        // Fetch historical data for the past 14 days
        const pastDays = Array.from({ length: 14 }, (_, i) => i); // Generates [0, 1, ..., 13]

        Promise.all(
            pastDays.map(i => {
                let pastDate = new Date();
                pastDate.setDate(pastDate.getDate() - i);
                let formattedDate = pastDate.toISOString().split('T')[0];

                return fetch(historyUrl + formattedDate)
                    .then(historyResponse => {
                        if (!historyResponse.ok) {
                            console.warn(`History API error for ${formattedDate}: ${historyResponse.status} ${historyResponse.statusText}`);
                            return null; // Skip this entry if there's an error
                        }
                        return historyResponse.json();
                    })
                    .then(historyDayData => {
                        if (historyDayData && historyDayData.forecast && historyDayData.forecast.forecastday.length > 0) {
                            return historyDayData.forecast.forecastday[0]; // Return the first day's forecast
                        } else {
                            console.warn(`No historical data available for ${formattedDate}`);
                            return null; // Skip this entry if no data is available
                        }
                    })
                    .catch(historyErr => {
                        console.error(`Error processing historical data for ${formattedDate}:`, historyErr);
                        return null;
                    });
            })
        )
        .then(results => {
                historyData = results.filter(result => result !== null); // Filter out any null results
                updateHistoryCards(historyData); // Update the cards with valid data
         });
    }

    function updateHistoryCards(historyData) {
        const historyCardsContainer = document.getElementById('historyCardsContainer');
        
        if (!historyCardsContainer) {
          console.error("Element with ID 'historyCardsContainer' not found.");
          return; // Exit if the element does not exist
      }
      
      historyCardsContainer.innerHTML = ''; // Clear existing cards

      // Loop through to update the data
      historyData.forEach((day, index) => {
          const dayId = index + 1;

          const card = document.createElement('div');
          card.className = 'col-md-4 mb-4'; // Bootstrap column class
          card.innerHTML = `
              <div class="card">
                  <div class="card-header">
                      <h5>Day ${dayId}: ${day.date}</h5>
                  </div>
                  <div class="card-body">
                      <p><strong>Max Temp:</strong> ${day.day.maxtemp_c} °C <span>&#8593;</span></p>
                      <p><strong>Min Temp:</strong> ${day.day.mintemp_c} °C <span>&#8595;</span></p>
                      <p><strong>Avg Temp:</strong> ${day.day.avgtemp_c} °C</p>
                      <p><strong>Humidity:</strong> ${day.day.avghumidity} %</p>
                      <p><strong>Wind Speed:</strong> ${day.day.maxwind_kph} kph</p>
                      <p><strong>Sunrise:</strong> ${day.astro.sunrise}</p>
                      <p><strong>Sunset:</strong> ${day.astro.sunset}</p>
                      <p><strong>Feels Like:</strong> ${day.day.feelslike_c !== undefined ? day.day.feelslike_c : 'N/A'} °C</p>
                      <p><strong>Chance of Snow:</strong> ${day.day.daily_chance_of_snow !== undefined ? day.day.daily_chance_of_snow : 'N/A'} %</p>
                      <p><strong>Dewpoint:</strong> ${day.day.mintemp_c} °C</p>
                  </div>
              </div>
          `;
          historyCardsContainer.appendChild(card); // Append card to container
      });
   }
});

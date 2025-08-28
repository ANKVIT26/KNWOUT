const apiKey = '9b30ffc7236248fb922170638251902';
let lastSearchedCity = localStorage.getItem('lastSearchedCity') || '';
let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

document.addEventListener("DOMContentLoaded", () => {
    // Load last searched city on page load
    if (lastSearchedCity) {
        document.getElementById('city').value = lastSearchedCity;
        getWeather(lastSearchedCity);
    }

    document.getElementById('submitEvent').addEventListener('click', async (event) => {
        event.preventDefault();
        const city = document.getElementById('city').value.trim();
        if (city) {
            await getWeather(city);
        } else {
            alert("Please enter a valid city name.");
        }
    });
});

const getWeather = async (city) => {
    lastSearchedCity = city;
    document.getElementById('cityName').innerText = city;

    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes`;
    const historyUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=`;

    try {
        console.log(`Fetching weather data for: ${city}`);

        // Fetch forecast data for today
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error(`Error fetching forecast: ${forecastResponse.status}`);
        const forecastData = await forecastResponse.json();

        const weather = forecastData.current;
        const forecastDays = forecastData.forecast.forecastday;
        const location = forecastData.location;

        // Update top cards
        updateWindSpeedCard(weather.feelslike_c, forecastDays[0].day.avgtemp_c, weather.precip_mm, forecastDays[0].day.maxwind_kph);
        updateAroundYouCard(weather.temp_c, location.localtime, weather.pressure_mb, forecastDays[0].astro.sunrise, forecastDays[0].astro.sunset);
        updateWhatsUpTodayCard(location.localtime, weather.dewpoint_c, forecastDays[0].astro.moon_phase || "N/A");

        // Store & Update search history
        const newSearch = {
            city,
            temp: `${weather.temp_c} °C`,
            feelsLike: `${weather.feelslike_c} °C`,
            pressure: `${weather.pressure_mb} hPa`,
            maxTemp: `${forecastDays[0].day.maxtemp_c} °C`,
            totalPrecip: `${forecastDays[0].day.totalprecip_mm} mm`,
            sunrise: forecastDays[0].astro.sunrise,
            sunset: forecastDays[0].astro.sunset,
            date: location.localtime,
            dewpoint: weather.dewpoint_c ? `${weather.dewpoint_c} °C` : "N/A",
            avgTemp: `${forecastDays[0].day.avgtemp_c} °C`,
            windSpeed: `${forecastDays[0].day.maxwind_kph} kph`
        };

        searchHistory.unshift(newSearch);
        if (searchHistory.length > 3) searchHistory.pop();

        // Save to local storage
        localStorage.setItem('lastSearchedCity', city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        // Fetch historical data for the past 3 days (as per original HTML)
        const pastDays = [1, 2, 3];
        let historyData = [];

        for (let day of pastDays) {
            let pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - day);
            let formattedDate = pastDate.toISOString().split('T')[0];

            try {
                const historyResponse = await fetch(historyUrl + formattedDate);
                if (!historyResponse.ok) {
                    console.warn(`History API error for ${formattedDate}: ${historyResponse.status} ${historyResponse.statusText}`);
                    continue; // Skip to the next day
                }

                const historyDayData = await historyResponse.json();
                if (historyDayData.forecast && historyDayData.forecast.forecastday.length > 0) {
                    historyData.push(historyDayData.forecast.forecastday[0]);
                } else {
                    console.warn(`No historical data available for ${formattedDate}`);
                }
            } catch (historyErr) {
                console.error(`Error processing historical data for ${formattedDate}:`, historyErr);
            }
        }
        updateHistoryTable(historyData);

    } catch (err) {
        console.error("Error fetching weather data:", err);
        document.getElementById('cityName').innerText = lastSearchedCity;
        alert("Failed to fetch weather data. Please try again later.");
    }
};

// Function to update the Wind Speed card
const updateWindSpeedCard = (feelslike_c, avgtemp_c, precip_mm, maxwind_kph) => {
    const feelslikeElement = document.getElementById('feelslike_c');
    if(feelslikeElement){
        feelslikeElement.innerText = feelslike_c + " °C";
    }
    
    const avgtempElement = document.getElementById('avgtemp_c');
     if(avgtempElement){
         avgtempElement.innerText = avgtemp_c + " °C";
     }

    const precipElement = document.getElementById('precip_mm');
      if(precipElement){
          precipElement.innerText = precip_mm + " mm";
      }

    const maxwindElement = document.getElementById('maxwind_kph');
        if(maxwindElement){
            maxwindElement.innerText = maxwind_kph + " kph";
        }
    
};

// Function to update the Around You card
const updateAroundYouCard = (temp, localtime, pressure, sunrise, sunset) => {
    const tempElement = document.getElementById('temp');
         if(tempElement){
             tempElement.innerText = temp + " °C";
         }

    const pressureElement = document.getElementById('pressure');
         if(pressureElement){
            pressureElement.innerText = pressure + " hPa";
         }

    const sunriseElement = document.getElementById('sunrise');
        if(sunriseElement){
            sunriseElement.innerText = sunrise;
        }

    const sunsetElement = document.getElementById('sunset');
      if(sunsetElement){
        sunsetElement.innerText = sunset;
      }
};

// Function to update the What's Up Today card
const updateWhatsUpTodayCard = (date, dewpoint_c, moon_phase) => {
    const dateElement = document.getElementById('date');
    if(dateElement){
        dateElement.innerText = date;
    }
    
    const dewpointElement = document.getElementById('dewpoint_c');
    if(dewpointElement){
        dewpointElement.innerText = dewpoint_c ? dewpoint_c + " °C" : "N/A";
    }

    const moonElement = document.getElementById('moon_phase');
      if(moonElement){
        moonElement.innerText = moon_phase || "N/A";
      }
};

const updateHistoryTable = (historyData) => {
    if (!historyData || historyData.length < 3) {
        console.warn("Insufficient historical data for history table.");
        return;
    }

    // loop through to update the data
    historyData.forEach((day, index) => {
        const dayId = index + 1;

        const cityElement = document.getElementById(`city_day_${dayId}`);
        if(cityElement){
            cityElement.innerText = lastSearchedCity;
        }

        const tempElement = document.getElementById(`temp_day_${dayId}`);
        if(tempElement){
            tempElement.innerText = day.day.avgtemp_c + " °C";
        }

        const feelsElement = document.getElementById(`feelslike_day_${dayId}`);
        if(feelsElement){
            feelsElement.innerText = day.day.avgtemp_c + " °C"; // Corrected this line
        }

        const pressureElement = document.getElementById(`pressure_day_${dayId}`);
        if(pressureElement){
            pressureElement.innerText = day.day.avghumidity + " %"; // This is actually humidity
        }

        const maxElement = document.getElementById(`maxtemp_day_${dayId}`);
        if(maxElement){
            maxElement.innerText = day.day.maxtemp_c + " °C";
        }

        const minElement = document.getElementById(`mintemp_day_${dayId}`);
        if(minElement){
            minElement.innerText = day.day.mintemp_c + " °C";
        }

        const humidityElement = document.getElementById(`humidity_day_${dayId}`);
        if(humidityElement){
            humidityElement.innerText = day.day.avghumidity + " %";
        }

        const precipElement = document.getElementById(`precip_day_${dayId}`);
        if(precipElement){
            precipElement.innerText = day.day.totalprecip_mm + " mm";
        }

        const windElement = document.getElementById(`wind_day_${dayId}`);
        if(windElement){
            windElement.innerText = day.day.maxwind_kph + " kph";
        }

        const sunriseElement = document.getElementById(`sunrise_day_${dayId}`);
        if(sunriseElement){
            sunriseElement.innerText = day.astro.sunrise;
        }

        const sunsetElement = document.getElementById(`sunset_day_${dayId}`);
        if(sunsetElement){
            sunsetElement.innerText = day.astro.sunset;
        }

        const dewElement = document.getElementById(`dewpoint_day_${dayId}`);
        if(dewElement){
            dewElement.innerText = day.day.mintemp_c +" °C"; //It should be the real value
        }

        const dateElement = document.getElementById(`date_day_${dayId}`);
        if(dateElement){
            dateElement.innerText = day.date;
        }
    });
};

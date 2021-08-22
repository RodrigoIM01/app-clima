import { fetchWeather } from './helper/getWeather.js';


async function render() {
    const setDay = document.getElementById('currentDay');
    const clima = await fetchWeather();
    const now = new Date(Date.now());
    const city = document.getElementById('city');
    const currentTemp = document.getElementById('currentTemp');
    const weatherStatus = document.getElementById('weatherStatus');
    const weatherImage = document.getElementById('weatherImage');
    const humidity = document.getElementById('humidity');
    const visibility = document.getElementById('visibility');
    const airPressure = document.getElementById('airPressure');
    const windStatus = document.getElementById('windStatus');
    const progressBar = document.getElementById('progressBar');
    // const dayName = now.toLocaleString("en-us", { weekday: "long" });
    const date = now.toLocaleString("en-us", { weekday: "short", day: 'numeric', month: 'short' });
    
    setDay.innerHTML = `Today - ${date}`
    city.innerHTML = `${clima.dataCity.name}`
    currentTemp.innerHTML = `${clima.dataCity.main.temp}°C`
    weatherStatus.innerHTML = `${clima.dataCity.weather[0].description}`
    weatherImage.src = `https://openweathermap.org/img/wn/${clima.dataCity.weather[0].icon}@2x.png`
    humidity.innerHTML = `${clima.dataCity.main.humidity} %`
    visibility.innerHTML = `${clima.dataCity.visibility} m`
    airPressure.innerHTML = `${clima.dataCity.main.pressure} hPa`
    windStatus.innerHTML = `${clima.dataCity.wind.speed} m/s`
    progressBar.value = clima.dataCity.main.humidity;
    console.log(clima)

    for (const [i, day] of clima.days.entries()) {
        const currentDay = new Date(day.dt*1000).toLocaleString("en-us", { weekday: "short", day: 'numeric', month: 'short' });
        // const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(nextDay);
        // const month = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(nextDay);
        const weatherIcon = (day.weather[0].icon);

        const imagen = document.querySelector(`#img${i+1}`);
        const maxTemp = document.querySelector(`#max-temp-next-day-${i+1}`);
        const minTemp = document.querySelector(`#min-temp-next-day-${i+1}`);
        const dayCard = document.querySelector(`#next-day-${i+1}`);

        imagen.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        maxTemp.innerHTML = `${day.main.temp_max}°C`;
        minTemp.innerHTML = `${day.main.temp_min}°C`;
        dayCard.innerHTML = currentDay
    }


    
}

document.addEventListener("DOMContentLoaded", render)

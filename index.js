const apiKey = "3809e0d15359f6a20e8dcd0ebf67aaad";

// function getLocation() {
//         if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(async function(position) {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;
//             const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
//             const response = await fetch(URL);
//             const data = await response.json();
//             const URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`;
//             response2 = await fetch(URL2);
//             const data2 = await response2.json();
//         });
//     }
// }

// getLocation();

function fetchWeather() {
    return new Promise(async (resolve, reject) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`;
                    const responseForecast = await fetch(URL_FORECAST);
                    const dataForecast = await responseForecast.json();

                    const URL_CITY = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`;
                    const responseCity = await fetch(URL_CITY);
                    const dataCity = await responseCity.json();
                    
                    let days = dataForecast.list.filter((day, index) => {
                        console.log(new Date(day.dt_txt).getDate())
                        let isDay = false;
                        let currentDay = new Date(day.dt_txt);

                        if (index > 0) {
                          const beforeDay = new Date(dataForecast.list[index - 1].dt_txt);
                          if (currentDay.getDate() > beforeDay.getDate()) {
                            isDay = true;
                          }
                        }

                        if (isDay) {
                          return day;
                        }
                      });
                    resolve({
                        dataCity: dataCity,
                        days
                    });
                } catch (err) {
                    reject(err);
                }

            });
        }
    })
}

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
    const date = now.toLocaleString("en-us", { weekday: "long", day: 'numeric', month: 'short' });

    for (const i of clima.days) {
        console.log(new Date(i.dt * 1000).getDate())
    }
    
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
    

    for (const [i, day] of clima.days.entries()) {
        const nextDay = new Date(day.dt*1000);
        const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(nextDay);
        const month = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(nextDay);
        const weatherIcon = (day.weather[0].icon);

        const imagen = document.querySelector(`#img${i+1}`);
        const maxTemp = document.querySelector(`#max-temp-next-day-${i+1}`);
        const minTemp = document.querySelector(`#min-temp-next-day-${i+1}`);

        imagen.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        maxTemp.innerHTML = `${day.main.temp_max}°C`;
        minTemp.innerHTML = `${day.main.temp_min}°C`;
    }


    
}

document.addEventListener("DOMContentLoaded", render)

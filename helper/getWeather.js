// imperial es farhenheit
// metric es celcius


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

export { fetchWeather }
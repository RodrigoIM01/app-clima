// imperial es farhenheit
// metric es celcius
const apiKey = "3809e0d15359f6a20e8dcd0ebf67aaad";

function fetchWeather(unit) {
  return new Promise(async (resolve, reject) => {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async function(position) {
              try {
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;

                  const URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${unit}`;
                  const responseForecast = await fetch(URL_FORECAST);
                  const dataForecast = await responseForecast.json();

                  const URL_CITY = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${unit}`;
                  const responseCity = await fetch(URL_CITY);
                  const dataCity = await responseCity.json();

                  let todayDate = new Date(Date.now()).getDate();
                  const listDay = []
                  let days = dataForecast.list.reduce((list, day) => {
                      let currentLoopDay = new Date(day.dt * 1000).getDate();
                      if(!listDay.includes(currentLoopDay) && currentLoopDay != todayDate) {
                          listDay.push(currentLoopDay)
                          list.push(day)
                      }

                      return list;
                    }, []);
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
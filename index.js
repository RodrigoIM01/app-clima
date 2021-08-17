const apiKey = "3809e0d15359f6a20e8dcd0ebf67aaad" ;
const city = "Berlin";

async function fetchWeather() {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(URL);
    const data = await response.json();
    const URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`;
    response2 = await fetch(URL2);
    const data2 = await response2.json();
    //console.log(data2)
    return data2;
}

async function render() {
    const clima = await fetchWeather();
    console.log(clima);
    //console.log(clima.daily[0].weather[0].icon);
    const dayTomorrowArray = [];
    const dateArray = [];
    const monthArray = [];
    const weatherIconArray=[];
    
    for (let i=1; i<6; i++) {
        const tomorrow = (clima.daily[i].dt)*1000;
        const fechaTomorrow = new Date(tomorrow);
        const palabra = fechaTomorrow.toString().split(" ");
        const dayTomorrow = palabra[0];
        const date = fechaTomorrow.getDate();
        const month = palabra[1];
        const weatherIcon = (clima.daily[i].weather[0].icon);
        
        dayTomorrowArray.push(dayTomorrow);
        dateArray.push(date);
        monthArray.push(month);
        weatherIconArray.push(weatherIcon);
    }

    console.log(dayTomorrowArray);
    console.log(dateArray);
    console.log(monthArray);
    console.log(weatherIconArray);

    for (let i=0; i<5; i++) {
        const box = document.querySelector(`#box${i}`);
        box.innerHTML = `${dayTomorrowArray[i]}, ${dateArray[i]} ${monthArray[i]}`;
        const imagen = document.querySelector(`#img${i}`);
        imagen.src = `https://openweathermap.org/img/wn/${weatherIconArray[i]}@2x.png`;
    }


    
}

document.addEventListener("DOMContentLoaded", render)


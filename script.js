//https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=d570cbd37284d1210a0316102d99a271
//https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=d570cbd37284d1210a0316102d99a271

const APP_ID = 'd570cbd37284d1210a0316102d99a271';
const WEATHER_DATA = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_3_HOURS_DATA = 'https://api.openweathermap.org/data/2.5/forecast';

const getResourse = async (url) => {
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`ERROR!!!!!!! ${res.status}`)
    }

    return res.json();
}


const getThreeHoursWeatherInfo = async (place) => {
    const res = await getResourse(`${WEATHER_3_HOURS_DATA}?q=${place}&appid=${APP_ID}`);
    return res;
}

const getWeatherInfo = async (place) => {
    const res = await getResourse(`${WEATHER_DATA}?q=${place}&appid=${APP_ID}`);
    return res;
}

const renderWeatherApp = async () => {
    const currentPlace = document.querySelector('#place').value;
    const data = await getWeatherInfo(currentPlace);
    const data1 = await getThreeHoursWeatherInfo(currentPlace);
    const currentTemp = document.querySelector('#current-temp');
    const currentWind = document.querySelector('#current-wind');
    currentTemp.innerHTML = Math.round(data.main.temp - 273);
    currentWind.innerHTML = Math.ceil(data.wind.speed);
    currentWeatherPicture(Math.round(data.main.temp - 273));
    const listLi = document.querySelector('.collection');
    listLi.innerHTML = '';
    data1.list.forEach(element => {
        listLi.innerHTML += `
        <li class="collection-item"><div>${element.dt_txt}<a href="#!" class="secondary-content"><i class="material-icons">${Math.round(element.main.temp - 273)} degrees</i></a></div></li>
        `
    });
}

const currentWeatherPicture = (temp) => {
    let weatherPicture = document.querySelector('#weather-current');
    if(temp > 20){
        weatherPicture.src = 'images/tropical.jpg';
    } else if(temp > 0 && temp <= 20){
        weatherPicture.src = 'images/fall.jpg';
    } else{
        weatherPicture.src = 'images/winter.jpg';
    }
}

document.querySelector('#get-info').addEventListener('click', renderWeatherApp);


//POSTMAN
//https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

//renderWeatherApp();


















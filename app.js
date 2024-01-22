const APIKEY = 'cf05e4c0ed7a17cc8704b744ad3231ff';

const URLBASE = "https://api.openweathermap.org/data/2.5/weather?";

async function request(url){
    return fetch(url).then(data => data.json());
}

async function getWeater(lat, lon){
    const url = `${ URLBASE }lat=${ lat }&lon=${ lon }&appid=${APIKEY}`;
    const weather = await request(url);
    console.log (weather);
    updateDOM(weather.name, weather.main.temp);
}

async function getWeaterByCity(city){
    const url = URLBASE + `q=${city}&appid=${APIKEY}`;
    const weather = await request(url);
    updateDOM(weather.name,weather.main.temp)
}

function updateDOM(city,temp){

    const ajusTemp = temp - 273.15;

    document.querySelector('.container h2:nth-child(2)').textContent = `Ciudad: ${city}`;
    document.querySelector('.container h2 span').textContent = `${ajusTemp.toFixed(2)} °C`;

    if(ajusTemp < 14){
        document.querySelector('#info-clima').style.backgroundColor = '#6db0eb';
    } else if (ajusTemp >= 15 && ajusTemp < 25) {
        document.querySelector('#info-clima').style.backgroundColor = '#f7f791';
    } else {
        document.querySelector('#info-clima').style.backgroundColor = '#a52019';
    }
}

const formulario = document.getElementById('buscar');
const contBusqueda = document.getElementById('busqueda');
formulario.addEventListener('submit', Ubicaccion, true);



async function search(query) {
    const response = await fetch(`${URLBASE}q=${query}&appid=${APIKEY}&lang=es`);
    const data = await response.json();
    city.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = Math.floor(`${data.main.temp}` - 273.15);

    const containerDerecho = document.querySelectorAll('.container')[1];

    if (temp.textContent < 14) {
        containerDerecho.style.backgroundColor = '#6db0eb';
    } else if (temp.textContent >= 15 && temp.textContent < 25) {
        containerDerecho.style.backgroundColor = '#f7f791';
    } else {
        containerDerecho.style.backgroundColor = '#a52019';
    }
}

function Ubicaccion(event) {
  event.preventDefault();
  search(contBusqueda.value);
}

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeater(lat, lon);
});

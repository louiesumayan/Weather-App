const search_input = document.querySelector('#search-int');
const search_button = document.querySelector('#search_btn');
const API_KEY = '98d2a1ea5a338faeb248efb0d63f05e4';
const API_URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

search_button.addEventListener('click', () => {
  getCityData(search_input.value);
  search_input.value = '';
});

async function getCityData(city) {
  axios
    .get(API_URL + city + `&appid=${API_KEY}`)
    .then((data) => displayWeatherData(data))
    .catch((err) => {
      if (err.response.status == 404) {
        errorCard('No country / city found.');
      }
    });
}

const weatherEL = document.querySelector('.weather');

let weatherHTML = '';

function displayWeatherData(data) {
  weatherHTML = `
 <img src="images/${
   data.data.weather[0].main
 }.png" alt="" class="weather-icon" />
       <h1 class="temp">${Math.round(data.data.main.temp)}°C</h1>
       <h2 class="city err">${data.data.name}</h2>
       <div class="details">
         <div class="col">
           <img src="images/humidity.png" alt="" />
           <div>
             <p class="humidity">${data.data.main.humidity}%</p>
             <p>Humidity</p>
           </div>
         </div>
         <div class="col">
           <img src="images/wind.png" alt="" />
           <div>
             <p class="wind">${data.data.wind.speed} km/h</p>
             <p>Wind speed</p>
           </div>
         </div>
       </div>
 `;

  weatherEL.innerHTML = weatherHTML;
}

function errorCard(msg) {
  weatherHTML = `
 <div class='city'>
  <h1 class='err'>${msg}</h1>
 </div>
 `;

  weatherEL.innerHTML = weatherHTML;
}

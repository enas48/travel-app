
window.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');


  form.addEventListener('submit', performAction);
});
const spinner =document.getElementById('spinner');
function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 5000);
}


function performAction(e) {
  let result = document.getElementById('result');
  e.preventDefault();
  if (Client.formValidate()) {
    let location = document.getElementById('location');
    result.innerHTML = '';
    result.className = 'result';
    showSpinner();
    getTripInfo(location);
    getImage(location);
    getCountryInfo(location);
    getGeonmaes(location).then(data => {
    getWeather(data);
    });
  }

}


function getTripInfo(location) {
  let city = location.value;
  let departDay = document.getElementById('depart-date').value;
  let returnDay = document.getElementById('return-date').value;
  let today = new Date();
  const dayDiff = Client.diffDays(today, departDay);
  const triplength = Client.diffDays(departDay, returnDay);
  let departDate =
    new Date(departDay).getDate() +
    '/' +
    (new Date(departDay).getMonth() + 1) +
    '/' +
    new Date(departDay).getFullYear() +
    '.';
  let returnDate =
    new Date(returnDay).getDate() +
    '/' +
    (new Date(returnDay).getMonth() + 1) +
    '/' +
    new Date(returnDay).getFullYear() +
    '.';
  let timestep = Math.floor(new Date(departDay).getTime() / 1000);


  //post trip information data to server
  postData('https://cors-anywhere.herokuapp.com/https://5f6760c62571f60007bb130c--kind-shaw-0432f0.netlify.app/addTripInfo', {
    city: city,
    dayDiff: dayDiff,
    triplength: triplength,
    departDate: departDate,
    returnDate: returnDate,
    timestep: timestep
  });


  // update trip information section
  let htmlContent = `
    <h1>${city.toUpperCase()}</h1>
    <secttion class="trip-info holder">
        <p>my trip to: <span>${city}</span></p>
        <p>departing: <span>${departDate}</span></p>
        <p>return: <span>${returnDate}</span></p>
        <p>length of trip: <span>${triplength} days</span></p>
        <p>${city} is ${dayDiff} days away</p>
      </secttion>`;
  result.insertAdjacentHTML('afterbegin', htmlContent);
}




const getImage = async location => {
  let city = location.value;
  let apiKey = '15648530-51351b02a700ee497658ab0c1';
  let url =
    'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=' +
    apiKey +
    '&q=' +
    encodeURIComponent(city);
  let notfoundUrl =
    'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=' +
    apiKey +
    '&q=' +
    encodeURIComponent('404');

  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data);
    let htmlContent = '';
    // update image section
    //if found image for the country
    if (data.hits[0]) {
      htmlContent = `<secttion class="image-holder holder">
        <img src="${data.hits[0].largeImageURL}" alt="${city}">
      </secttion>`;
    } // if not found image for the country fetch another image 404 not found from pixbay api
    else {
      const res = await fetch(notfoundUrl);
      try {
        const data = await res.json();
        console.log(data);
        //update image section
        htmlContent = `
        <secttion class="image-holder holder">
        <img src="${data.hits[0].largeImageURL}" alt="404">
        <p>Unfortunately, no image was returned for your search.</p>
      </secttion>
        `;
      } catch (error) {
        console.log('error', error);
      }
    }
    result.insertAdjacentHTML('afterbegin', htmlContent);
  } catch (error) {
    console.log('error', error);
  }
};

const getCountryInfo = async location => {
  let city = location.value;
  let url = 'https://restcountries.eu/rest/v2/name/' + city;
  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data);
    // update country info section
    let htmlContent = '';
    if (data[0]) {
      htmlContent = `<secttion class="country-info holder">
        <h2>info about country:</h2>
           
        <img src="${data[0].flag}" alt="${data[0].name}">
        <p>region: <span>${data[0].region}</span></p>
        <p>population: <span>${data[0].population}</span></p>
        <p>currencies: <span>${data[0].currencies[0].name}</span></p>
        <p>languages: <span>${data[0].languages[0].name}</span></p>
      </secttion>
       `;
    } else {
      htmlContent = `
          <secttion class="country-info holder">
        <p>Unfortunately, no info about country </p>
      </secttion>
       `;
    }
    result.insertAdjacentHTML('afterbegin', htmlContent);
  } catch (error) {
    console.log('error', error);
  }
};

const getGeonmaes = async location => {
  // Personal API Key for geonames API
  let baseUrl = 'https://cors-anywhere.herokuapp.com/http://api.geonames.org/searchJSON?q=';
  let key = '&maxRows=10&username=enas48';
  let city = location.value;
  const res = await fetch(baseUrl + city + key);
  try {
    const data = await res.json();
    console.log(data);
    let Coordinates = {
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng
    };
    return Coordinates;
  } catch (error) {
    console.log('error', error);
  }
};

const getWeather = async data => {
  let baseUrl =
    'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
  let key = 'cb32cc033624f778fb301d7f4418ea5d/';
  let unit = '?units=si';
  let lat = data.lat;
  let lng = data.lng;
  // get trip info date from the server to use it
  const allData = await fetch('https://cors-anywhere.herokuapp.com/https://5f6760c62571f60007bb130c--kind-shaw-0432f0.netlify.app/all').then(response =>
    response.json()
  );
  try {
    console.log(allData);

    // current forcast weather + weather for week
    if (allData.dayDiff >= 0 && allData.dayDiff <= 7) {
      const res = await fetch(baseUrl + key + lat + ',' + lng + unit);
      try {
        const weatherData = await res.json();
        console.log(weatherData);
        let htmlContent = '';
        //update current weather
        if (weatherData) {
          let forcast = weatherData.daily.data;
          console.log(forcast);
          htmlContent = `
   <secttion class="weather-result holder">
        <h2>weather for then is:</h2>
        <div class="current-weather">
          <p>high:<span>${Math.round(
            weatherData.daily.data[allData.dayDiff].temperatureHigh
          )}°</span></p>
          <p>low:<span>${Math.round(
            weatherData.daily.data[allData.dayDiff].temperatureLow
          )}°</span></p>
          <p>${weatherData.daily.data[allData.dayDiff].summary}</p>
          <canvas class="${
            weatherData.daily.data[allData.dayDiff].icon
          }" width="64" height="64"></canvas>
           </div>
            ${Client.forcastWeather(forcast).outerHTML}    
      </secttion>
  `;
        } else {
          htmlContent = `<secttion class="weather-result holder">
            <p>no weather for input location</p></section>`;
        }
        result.insertAdjacentHTML('afterbegin', htmlContent);
        Client.setIcons();
      } catch (error) {
        console.log('error', error);
      }
    }

    // predict forcast weather
    else if (allData.dayDiff > 7) {
      console.log('predict');
      const res = await fetch(
        baseUrl + key + lat + ',' + lng + ',' + allData.timestep + unit
      );
      try {
        const predictData = await res.json();
        console.log(predictData);
        let htmlContent = '';
        // update predict data section
        if (predictData) {
          if(predictData.currently.temperature !== undefined){
            var currentTemp = `<p>tempreture:<span>${Math.round(
              predictData.currently.temperature
            )}°</span></p>`
          }else{
             var currentTemp=`<p></p>`
          }
          if(predictData.currently.humidity !== undefined){
            var currentHumidity= `<p>humidity:<span>${Math.round(predictData.currently.humidity * 100)}%</span></p>`
          }else{
             var currentHumidity=`<p></p>`
          }
          if(predictData.currently.summary!== undefined){
            var currentSummary= ` <p>${predictData.currently.summary} </p>`
          }else{
             var currentSummary=`<p></p>`
          }
          if(predictData.currently.icon!== undefined){
            var currentIcon= `<canvas class="${ predictData.currently.icon}" width="64" height="64"></canvas>`
          }else{
             var currentIcon=`<p></p>`
          }
          if(predictData.currently.humidity ===undefined
            & predictData.currently.temperature ===undefined 
            & predictData.currently.summary===undefined
            & predictData.currently.icon ===undefined) {
           htmlContent = `<secttion class="weather-result holder">
             <p>no weather for input location</p></section>`;
         }else{
          htmlContent = `
   <secttion class="weather-result holder">
        <h2>weather for then is:</h2>
        <div class="current-weather">
               ${currentTemp}
               ${currentHumidity}
               ${currentSummary}
               ${currentIcon}
           </div>
      </secttion>
  `;}
        } else{
          htmlContent = `<secttion class="weather-result holder">
          <p>no weather for input location</p></section>`;
        }

        result.insertAdjacentHTML('afterbegin', htmlContent);
        Client.setIcons();
      } catch (error) {
        console.log('error', error);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};




/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction, getImage, getTripInfo };

/* function to get forcast weather for a week*/
function forcastWeather(inputData) {
  let dailyWeather = document.createElement('div');
  inputData.forEach(day => {
    let departDay = document.getElementById('depart-date').value;
    let depart = new Date(departDay);
    let date = new Date(day.time * 1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    let dayName = days[date.getDay()];
    let daily = document.createElement('div');
    daily.className = 'daily';
    daily.innerHTML = `
    <span>${dayName}</span>
    <canvas class="${day.icon}" width="32" height="32"></canvas>
    <span>${Math.round(day.temperatureHigh)}°</span>
    <span>${Math.round(day.temperatureLow)}°</span
    `;
    if (depart.getDate() === date.getDate()) {
      daily.classList.add('active');
    }
    Client.setIcons();
    dailyWeather.appendChild(daily);
  });
  return dailyWeather;
}
export { forcastWeather };

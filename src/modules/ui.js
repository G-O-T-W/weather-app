import { DateTime } from 'luxon';

export default class UI {

  async display(weatherData, unit) {
    const location = (() => {
      // Sentence Case
      return weatherData.address.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    })();
    const time = DateTime.now().toFormat("hh:mm a")
    const currentTemp = weatherData.currentConditions.feelslike;
    const minTemp = weatherData.days[0].tempmin;
    const maxTemp = weatherData.days[0].tempmax;
    const humidity = weatherData.currentConditions.humidity;
    const aqi = weatherData.currentConditions.aqius;
    let sunrise = weatherData.currentConditions.sunrise; //fetch
    let sunset = weatherData.currentConditions.sunset; //fetch
    const icon = weatherData.currentConditions.icon;

    this.setBackground(icon);

    if(sunrise != "")
      sunrise = DateTime.fromISO(sunrise).toFormat("hh:mm a"); //format
    if(sunset != "")
      sunset = DateTime.fromISO(sunset).toFormat("hh:mm a"); //format

    // Console logging
    console.log(location, time);
    console.log("Current Temperature: ", currentTemp);
    console.log("Min Temperature: ", minTemp);
    console.log("Max Temperature: ", maxTemp);
    console.log("Humidity: ", humidity);
    console.log("AQI: ", aqi);
    console.log("Sunrise: ", sunrise);
    console.log("Sunset: ", sunset);
    console.log(weatherData); 
    
    // Change DOM
    const h1 = document.querySelector(".heading h1");
    h1.textContent = `${location}, ${time}`;
    
    const paraTemp = document.getElementById("temp-data");
    paraTemp.textContent = `${currentTemp} ${unit}`;

    const weatherIcon = document.querySelector(".icon.weather");
    await import(`../../assets/weather-icon-pack/${icon}.svg`).then((imgObj) => {
      weatherIcon.src = imgObj.default;
    });

    const paraMinMax = document.getElementById("minmax");
    paraMinMax.textContent = `High ${minTemp} ${unit} | Low ${maxTemp} ${unit}`;
    
    const paraAQI = document.getElementById("aqi-data");
    paraAQI.textContent = `${aqi}`;

    const paraHumidity = document.getElementById("humidity-data");
    paraHumidity.textContent = `${humidity} %`;

    const paraSunrise = document.getElementById("sunrise-data");
    const paraSunset = document.getElementById("sunset-data");
    paraSunrise.textContent = `${sunrise}`;
    paraSunset.textContent = `${sunset}`;

  }

  async setBackground(weather){
    const container = document.querySelector('.container');
    await import(`../../assets/wallpapers/${weather}.jpg`).then((imgObj) => {
      container.style.backgroundImage = `url(${imgObj.default})`;
      container.style.backgroundRepeat = 'no-repeat';
      container.style.backgroundSize = 'cover';
      container.style.backgroundPosition = 'center';


    });
  }

  changeUnitOfButton() {
    const toggleButton = document.getElementById("toggle-btn");
    toggleButton.textContent = (toggleButton.textContent == '°C') ? '°F' : '°C';
  }

  clearDisplay() {
    

  }
}

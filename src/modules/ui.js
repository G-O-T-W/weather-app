import { DateTime } from 'luxon';

export default class UI {

  async display(weatherData, unit) {
    const location = (() => {
      // Convert To Sentence Case
      return weatherData.address.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    })();
    const icon = weatherData.currentConditions.icon;
    this.setBackground(icon);
    
    const tzone = weatherData.timezone;
    const time = DateTime.now().setZone(tzone).toFormat("hh:mm a");
    const currentTemp = weatherData.currentConditions.feelslike;
    const minTemp = weatherData.days[0].tempmin;
    const maxTemp = weatherData.days[0].tempmax;
    const humidity = weatherData.currentConditions.humidity;
    const aqi = weatherData.currentConditions.aqius;
    let sunrise = weatherData.currentConditions.sunrise; //fetch
    let sunset = weatherData.currentConditions.sunset; //fetch
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
    
    // Change DOM of Main Display
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

    // Change DOM of Hourly Display
    console.log("Hourly Data:");
    const hourlyData = weatherData.days[0].hours;
    const hourlyCards = document.querySelector('.hourly-display');
    for (const [key, value] of Object.entries(hourlyData)) {
      const time = DateTime.fromFormat(key, "H").toFormat("h a");
      const icon = value.icon;
      const temp = value.feelslike;
      console.log(time, icon, temp); // Console Logging

      const div = document.createElement("div");
      div.classList.add('card', 'hour');

      const paraTime = document.createElement("p");
      paraTime.classList.add("label");
      paraTime.textContent = time;

      const imgIcon = document.createElement("img");
      imgIcon.classList.add("icon");
      const imgObj = await import(`../../assets/weather-icon-pack/${icon}.svg`);
      imgIcon.src = imgObj.default;

      const paraTemp = document.createElement("p");
      paraTemp.classList.add("label");
      paraTemp.textContent = `${temp} ${unit}`;

      div.append(paraTime, imgIcon, paraTemp);
      hourlyCards.appendChild(div);
    }
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

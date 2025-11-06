import { DateTime } from 'luxon';

export default class UI {
  async display(weatherData) {
    const location = (() => {
      // Sentence Case
      return weatherData.address.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    })();
    const time = DateTime.now().toFormat("hh:mm a")
    const currentTemp = weatherData.currentConditions.feelslike;
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
    console.log("Humidity: ", humidity);
    console.log("AQI: ", aqi);
    console.log("Sunrise: ", sunrise);
    console.log("Sunset: ", sunset);
    // console.log(weatherData); 
    
    // Change DOM
    const h1 = document.querySelector(".heading h1");
    h1.textContent = `${location}, ${time}`;
    
    const paraTemp = document.getElementById("temp-data");
    paraTemp.textContent = `${currentTemp} °C`;
    
    const paraAQI = document.getElementById("aqi-data");
    paraAQI.textContent = `${aqi}`;

    const paraHumidity = document.getElementById("humidity-data");
    paraHumidity.textContent = `${humidity} %`;

    const paraSunrise = document.getElementById("sunrise-data");
    const paraSunset = document.getElementById("sunset-data");
    paraSunrise.textContent = `${sunrise}`;
    paraSunset.textContent = `${sunset}`;

  }

  clearDisplay() {
    

  }
}

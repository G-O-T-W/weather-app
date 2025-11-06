import { DateTime } from 'luxon';
export default class UI {
  display(weatherData) {
    const location = weatherData.address;
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
    
    // Change DOM
    const h1 = document.querySelector(".heading h1");
    h1.textContent = `${location}, ${time}`;
    
    const cardTemp = document.querySelector(".card-temperature");
    const paraTemp = document.createElement("p");
    paraTemp.textContent = `${currentTemp} C`;
    cardTemp.appendChild(paraTemp);
    
    const cardAQI = document.querySelector(".card-aqi");
    const paraAQI = document.createElement("p");
    paraAQI.textContent = `${aqi}`;
    cardAQI.appendChild(paraAQI);

    const cardHumidity = document.querySelector(".card-humidity");
    const paraHumidity = document.createElement("p");
    paraHumidity.textContent = `${humidity} %`;
    cardHumidity.appendChild(paraHumidity);

    const cardDaylight = document.querySelector(".card-daylight");
    const paraSunrise = document.createElement("p");
    const paraSunset = document.createElement("p");
    paraSunrise.textContent = `${sunrise}`;
    paraSunset.textContent = `${sunset}`;
    cardDaylight.appendChild(paraSunrise);
    cardDaylight.appendChild(paraSunset);

  
  }
}

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

    console.log(location, time);
    console.log("Current Temperature: ", currentTemp);
    console.log("Humidity: ", humidity);
    console.log("AQI: ", aqi);
    console.log("Sunrise: ", sunrise);
    console.log("Sunset: ", sunset);
    // console.log(weatherData);
  }
}

export default class Weather {
  constructor() {
    this._location;
    this._unitGroup = 'metric';
    this._APIKEY = 'D8ZYESP7FSMGEYQ7ETXJJRJTX';
  }

  set location(location) {
    const pattern = /^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/;
    if (!pattern.test(location)) {
      alert('Enter a valid city name!');
      throw new Error('Illegal Query: Enter a valid city');
    }
    this._location = location;
  }

  toggleUnits() {
    this._unitGroup = this._unitGroup == 'metric' ? 'us' : 'metric';
    console.log('Units Changed To: ', this._unitGroup);
  }

  async getData() {
    try {
      let response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this._location}?unitGroup=${this._unitGroup}&elements=aqius%2Cconditions%2Cfeelslike%2Chumidity%2Cicon%2Csevererisk%2Csunrise%2Csunset%2Ctempmax%2Ctempmin&include=days%2Chours%2Calerts%2Ccurrent%2Cevents&key=${this._APIKEY}&contentType=json`
      );
      const weatherData = await response.json();
      return weatherData;
    } catch (err) {
      alert('Maximum Query Limit Reached');
      throw new Error(err);
    }
  }
}

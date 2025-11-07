import Weather from './weather';
import UI from './ui';

export default class Controller {
  constructor() {
    this.weatherData;
    this.weather = new Weather();
    this.ui = new UI();
    this._query = "New Delhi"; // init
  }

  set query(query) {
    this._query = query;
  }

  async render() {
    console.log('Location Searched: ', this._query);
    try {
      this.weather.location = this._query; // setter method
      this.weatherData = await this.weather.getData();
      const unit = this.weather._unitGroup == 'metric' ? '°C' : '°F';
      this.ui.display(this.weatherData, unit);
    } catch (err) {
      console.log(err);
    }
  }

  toggleButtonHandler() {
    this.ui.changeUnitOfButton();
    this.weather.toggleUnits();
    this.render();
  }

  nextButtonHandler() {
    this.ui.shiftSlideRight();
  }

  prevButtonHandler() {
    this.ui.shiftSlideLeft();
  }

  sidebarButtonHandler() {
    this.ui.toggleSidebar();
  }
}

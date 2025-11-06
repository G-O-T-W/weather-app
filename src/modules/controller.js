import Weather from "./weather";
import UI from "./ui";

export default class Controller {
    constructor(){
        this.weatherData;
        this.weather = new Weather();
        this.ui = new UI();
    }

    async render(location) {
        console.log("Location Searched: ", location);
        try {
            this.weather.location = location; // setter method
            this.weatherData = await this.weather.getData();
            this.ui.display(this.weatherData);
        } catch(err) {
            console.log(new Error(err));
        }
        
    }

}
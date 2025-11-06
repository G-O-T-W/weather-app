export default class Weather {
    constructor(){
        this._location;
    }

    set location(location){
        const pattern = /^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/;
        if(!pattern.test(location)){
            alert("Enter a valid city name!");
            throw new Error("Illegal Query: Enter a valid city");
        }
        this._location = location;
    }

    async getData(){
        try {
            let response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this._location}?unitGroup=metric&elements=aqius%2Cdatetime%2Cfeelslike%2Chumidity%2Cpm1%2Cpm10%2Cpm2p5%2Cpreciptype%2Csunrise%2Csunset%2Ctzoffset&key=PFNCJKZEFEY82DXDXFXARJTGN&contentType=json`
            );
            const weatherData = await response.json();
            return weatherData;
        } catch(err) {
            alert("Broken URL!");
            throw new Error(err);
        }
    }
}
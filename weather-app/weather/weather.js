
const request = require('request');

var getWeather = ( lat, lng, callback ) => {
  request({
    url: `https://api.darksky.net/forecast/57dd95dea169052e857d1eb973ad4225/${ lat },${ lng }?units=auto`,
    json: true
  }, (error, response, body) => {

    if(!error  && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
    else{
      callback('Unable to fetch weather');
    }

  });
}
 module.exports.getWeather = getWeather;

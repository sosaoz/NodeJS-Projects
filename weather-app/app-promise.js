const yargs =  require('yargs');
const axios = require('axios');

const argv = yargs
             .options({
               a:{
                 demand: true,
                 alias: 'address',
                 describe: 'Address to fetch weather for',
                 string: true
               }
             })
             .help()
             .alias( 'help', 'h' )
             .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${ encodedAddress }`;

axios.get(geoCodeUrl).then( (response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherUrl = `https://api.darksky.net/forecast/57dd95dea169052e857d1eb973ad4225/${ lat },${ lng }?units=auto`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then( (response) => {

    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It's feels like ${apparentTemperature}`);

}).catch( (e) => {

  if (e.code === 'ENOTFOUND'){
    console.log('Unable to connect');
  }
  else{
    console.log(e.message);
  }

});

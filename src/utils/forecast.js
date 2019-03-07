const request = require('request');

const forecast = (latitide, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/d3128d1e6ae476e1302688e7a50955b4/${latitide},${longitude}?lang=en&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degree out. There is a ${
          body.currently.precipProbability
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

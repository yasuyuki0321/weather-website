const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoieWFzdXl1a2kwMzIxIiwiYSI6ImNqc3VjMnNiNjBjd3g0M3BkdzZncXF1MWsifQ.lhK_NftopgKmcztUA8tctA`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect location Services!');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another serarch.');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

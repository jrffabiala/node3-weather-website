const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
                encodeURIComponent(address) + 
                '.json?access_token=pk.eyJ1IjoianJmZmFiaWFsYSIsImEiOiJjazJxemtuNGEwa21qM2lwaGNodWt4dDFhIn0.d8I6SO8v1UIKUihdD1b5XQ&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect location services!');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
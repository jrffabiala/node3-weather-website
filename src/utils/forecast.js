const request = require('request');

const forecast = ({ latitude, longitude } , callback) => {
    const url = 'https://api.darksky.net/forecast/e53113a93a19ca5f4c6d02c3d125ae5c/' 
                + latitude + ',' + longitude;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!');
        } else if (body.error) {
            callback('Unable to find coordinate ' + latitude + ', ' + longitude);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
                                ' degrees out. There is a ' + body.currently.precipProbability + 
                                '% chance of rain. With a wind speed of ' + body.currently.windSpeed);
        }
    });
}

module.exports = forecast;
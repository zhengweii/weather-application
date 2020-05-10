const request = require("request");

const forecast = (long, lat, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${YOUR_API_KEY}/${lat},${long}?exclude=minutely,hourly,daily,alerts,flags&units=si`,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to forecast services", undefined);
        }
        else if (response.body.error) {
            callback("No such coordinates. Please try again", undefined);
        }
        else {
            callback(undefined, response.body.currently);
        }
    });
};

module.exports = forecast;

const request = require("request");

const geocode = (location, callback) => {
    const geocodeUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=${YOUR_API_KEY}&location=${encodeURIComponent(location)}`;

    request({
        url: geocodeUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to geocode services", undefined);
        }
        else if (response.body === undefined || response.body.results[0].locations[0].geocodeQualityCode === "A1XAX") {
            callback("No such location. Please try again", undefined);
        }
        else {
            callback(undefined, response.body.results[0]);
        }
    });
};

module.exports = geocode;

const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const weatherAPi = `http://api.weatherstack.com/current?access_key=3aef8fbf006073d3a5d2241f5e03480c&query=${lat},${long}&units=m`;
  request.get({ url: weatherAPi, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to weather api.Please try again");
    } else if (body.error) {
      callback("Something went wrong");
    } else {
      const {current} = body;
      callback(
        error,
        current.weather_descriptions+
        ". It is currently " +
        current.temperature +
        " degrees out, but it feels like " +
        current.feelslike +
        " degrees"
      );
    }
  });
};

module.exports = forecast;

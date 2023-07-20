const getWeather = (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/jacwx.png" });
};

module.exports = {
  getWeather,
};

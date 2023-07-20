const getCam = (req, res) => {
  res.json({
    image: "http://www.eao.hawaii.edu/weather/images/ukirtdome.jpg",
  });
};

module.exports = {
  getCam,
};

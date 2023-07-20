const getCam = (req, res) => {
  res.json({
    image: "http://www.eao.hawaii.edu/weather/images/jcmt.jpg",
  });
};

module.exports = {
  getCam,
};

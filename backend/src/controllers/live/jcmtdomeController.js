const getCam = (req, res) => {
  res.json({
    image: "http://www.eao.hawaii.edu/weather/images/jcmtdome.jpg",
  });
};

module.exports = {
  getCam,
};

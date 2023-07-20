const getSeeing = (req, res) => {
  res.json({ image: "http://www.eao.hawaii.edu/weather/images/smaphase.png" });
};

module.exports = {
  getSeeing,
};

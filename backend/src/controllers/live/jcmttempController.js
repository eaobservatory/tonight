const getTemp = (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmttemp.png",
  });
};

module.exports = {
  getTemp,
};

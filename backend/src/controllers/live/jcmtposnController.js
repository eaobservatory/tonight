const getPos = (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtposn.png",
  });
};

module.exports = {
  getPos,
};

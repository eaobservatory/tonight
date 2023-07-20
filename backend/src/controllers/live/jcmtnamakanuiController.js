const getStatus = (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtnamakanui.png",
  });
};

module.exports = {
  getStatus,
};

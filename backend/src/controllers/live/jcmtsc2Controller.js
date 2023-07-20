const getStatus = (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2.png",
  });
};

module.exports = {
  getStatus,
};

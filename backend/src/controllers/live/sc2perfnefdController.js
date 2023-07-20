const getPerf = (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfnefd.png",
  });
};

module.exports = {
  getPerf,
};

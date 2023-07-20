const getPerf = (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perfflat.png",
  });
};

module.exports = {
  getPerf,
};

const getPerf = (req, res) => {
  res.json({
    image: "https://www.eao.hawaii.edu/monitoring/images/jcmtsc2perffcf.png",
  });
};

module.exports = {
  getPerf,
};

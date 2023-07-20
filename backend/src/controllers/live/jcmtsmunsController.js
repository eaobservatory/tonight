const getError = (req, res) => {
  res.json({
    image:
      "https://www.eao.hawaii.edu/monitoring/secondary/jcmt/jcmtsmu_ns.png",
  });
};

module.exports = {
  getError,
};

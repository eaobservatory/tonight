const getError = (req, res) => {
  res.json({
    image:
      "https://www.eao.hawaii.edu/monitoring/secondary/jcmt/jcmtsmu_ew.png",
  });
};

module.exports = {
  getError,
};

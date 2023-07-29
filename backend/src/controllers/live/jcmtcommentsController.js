// const { queryOMP } = require("../../config/mysql");

const getJCMTCOMMENTS = async (req, res) => {
  res.json({ message: "hello world" });
  // const rows = await queryOMP('SELECT * FROM ompshiftlog ORDER BY date DESC LIMIT 10');
  // res.send(rows);
};

module.exports = {
  getJCMTCOMMENTS,
};

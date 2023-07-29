// const { mysqlOMPConnection } = require("../../config/mysql");
// select * from ompshiftlog order by date desc limit 10;

const getJCMTCOMMENTS = async (req, res) => {
  res.json({ message: "hello world" });
};

module.exports = {
  getJCMTCOMMENTS,
};

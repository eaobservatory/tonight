const { queryOMP } = require("../../config/mysql");
const { getDateArray } = require("../../utils/date");

const getJCMTCOMMENTS = async (req, res) => {
  const dateUTC = getDateArray()[2];
  // const dateStr = `${dateUTC[0]}-${dateUTC[1]}-${dateUTC[2]}`
  const dateStr = "2023-07-28"; // for testing purposes
  const rows = await queryOMP(
    `SELECT * FROM ompshiftlog WHERE telescope = "JCMT" AND DATE(date) = "${dateStr}" ORDER BY date DESC`
  );

  res.json(rows);
};

module.exports = {
  getJCMTCOMMENTS,
};

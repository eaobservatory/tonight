const { queryOMP } = require("../../config/mysql");
const { getDateArray } = require("../../utils/date");

const getComments = async (req, res) => {
  const dateUTC = getDateArray()[2];
  const dateStr = `${dateUTC[0]}-${dateUTC[1]}-${dateUTC[2]}`;
  // const dateStr = "2023-07-15"; // for testing only
  const rows = await queryOMP(
    `SELECT * FROM ompshiftlog WHERE telescope = "JCMT" AND DATE(date) = ? ORDER BY date DESC`,
    [dateStr]
  );

  res.json(rows);
};

module.exports = {
  getComments,
};

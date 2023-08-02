const { queryJCMT } = require("../../config/mysql");
const { getDateArray } = require("../../utils/date");

const getACSISINDEX = async (req, res) => {
  const dateUTC = getDateArray()[2];
  const dateStr = `${dateUTC[0]}${dateUTC[1]}${dateUTC[2]}`;
  // const dateStr = "20230715"; // for testing only
  const rows = await queryJCMT(
    `SELECT backend, obsnum, utdate, project, object, steptime, tau225st, tau225en, wvmtaust, wvmtauen, instrume, restfreq, date_obs, roofsten, doorsten FROM ACSIS JOIN COMMON ON ACSIS.obsid = COMMON.obsid WHERE utdate = ? ORDER BY obsnum DESC`,
    [dateStr]
  );

  res.json(rows);
};

module.exports = {
  getACSISINDEX,
};

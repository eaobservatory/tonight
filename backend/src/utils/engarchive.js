const dotenv = require("dotenv");
const axios = require("axios");
const querystring = require("querystring");

dotenv.config({ path: "../.env" });

const username = process.env.ENGARCHIVE_USERNAME;
const password = process.env.ENGARCHIVE_PASSWORD;

const queryPV = async (pv, dateArray) => {
  const pvEscaped = querystring.escape(pv); // url encoded pv
  const url = `http://${username}:${password}@engarchive.eao.hawaii.edu/cgi-bin/CGIExport.cgi?DIRECTORY=%2Fjcmtdata%2Fepics_data%2Fchanarch%2Fdir&PATTERN=&NAMES=${pvEscaped}%0D%0A&STARTMONTH=${dateArray[0][1]}&STARTDAY=${dateArray[0][2]}&STARTYEAR=${dateArray[0][0]}&STARTHOUR=14&STARTMINUTE=00&STARTSECOND=00&ENDMONTH=${dateArray[1][1]}&ENDDAY=${dateArray[1][2]}&ENDYEAR=${dateArray[1][0]}&ENDHOUR=13&ENDMINUTE=59&ENDSECOND=59&COMMAND=GET&Y0=0&Y1=0&REDUCE=ON&FORMAT=SPREADSHEET&INTERPOL=0`;

  try {
    const response = await axios.get(url);
    data = response.data.split("\n"); // split response into lines
    data = data.slice(18, -1); // remove header
    return data;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  queryPV,
};

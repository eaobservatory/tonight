const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: "../.env" });

const username = process.env.ENGARCHIVE_USERNAME;
const password = process.env.ENGARCHIVE_PASSWORD;

/**
 * Queries the PV (Process Variable) from the engineering archive.
 *
 * @param {string} pv - PV to query.
 * @param {Array<Array<number>>} dateArray - A 2D array containing two arrays, each with three numbers representing the month, day, and year respectively. The first array is the start date and the second array is the end date for the query.
 * @returns {Promise<string[]>} - A promise that resolves to an array of strings, each string being a line of data from the server response. If an error occurs during the request, the promise resolves to the error message.
 * @throws {Error} - Throws an error if the request fails.
 */
const queryPV = async (pv, dateArray) => {
  const pvEscaped = encodeURIComponent(pv); // url encoded pv
  const url = `http://${username}:${password}@engarchive.eao.hawaii.edu/cgi-bin/CGIExport.cgi?DIRECTORY=%2Fjcmtdata%2Fepics_data%2Fchanarch%2Fdir&PATTERN=&NAMES=${pvEscaped}%0D%0A&STARTMONTH=${dateArray[0][1]}&STARTDAY=${dateArray[0][2]}&STARTYEAR=${dateArray[0][0]}&STARTHOUR=14&STARTMINUTE=00&STARTSECOND=00&ENDMONTH=${dateArray[1][1]}&ENDDAY=${dateArray[1][2]}&ENDYEAR=${dateArray[1][0]}&ENDHOUR=13&ENDMINUTE=59&ENDSECOND=59&COMMAND=GET&Y0=0&Y1=0&REDUCE=ON&FORMAT=SPREADSHEET&INTERPOL=0`;
  console.log(`${pv}: trying queryPV...`);

  try {
    const response = await axios.get(url);
    data = response.data.split("\n"); // split response into lines
    data = data.slice(18, -1); // remove header
    console.log(`${pv}: success!`);
    return data;
  } catch (error) {
    console.log(`${pv}: ERROR -- ${error.message}`);
    return; // plot should be blank if error occurs
  }
};

module.exports = {
  queryPV,
};

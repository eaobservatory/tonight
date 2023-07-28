/**
 * Gets start and end dates used for querying engarchive while accounting for HST vs UTC.
 * Queries and engarchive are in HST, but each day of data needs to be in UTC.
 *
 * @returns {Array<Array<string>>} An array containing three arrays, each representing a date as [year, month, day]. The first two are HST, the last is UTC.
 */
const getDateArray = () => {
  const date = new Date(); // today in hST
  const prevDate = new Date(date.getTime()); // yesterday
  prevDate.setDate(date.getDate() - 1);
  const nextDate = new Date(date.getTime()); // tomorrow
  nextDate.setDate(date.getDate() + 1);

  const hour = date.getHours();

  let yearStart;
  let yearEnd;
  let monthStart;
  let monthEnd;
  let dayStart;
  let dayEnd;

  // check what day it is in UTC based on HST hour and get HST dates
  if (hour >= 14) {
    yearStart = String(date.getFullYear()); // date, YYYY
    yearEnd = String(nextDate.getFullYear()); // nextDate, YYYY
    monthStart = String(date.getMonth() + 1).padStart(2, "0"); // date, MM
    monthEnd = String(nextDate.getMonth() + 1).padStart(2, "0"); // nextDate, MM
    dayStart = String(date.getDate()).padStart(2, "0"); // date, DD
    dayEnd = String(nextDate.getDate()).padStart(2, "0"); // nextDate, DD
  } else {
    yearStart = String(prevDate.getFullYear()); // prevDate, YYYY
    yearEnd = String(date.getFullYear()); // date, YYYY
    monthStart = String(prevDate.getMonth() + 1).padStart(2, "0"); // prevDate, MM
    monthEnd = String(date.getMonth() + 1).padStart(2, "0"); // date, MM
    dayStart = String(prevDate.getDate()).padStart(2, "0"); // prevDate, DD
    dayEnd = String(date.getDate()).padStart(2, "0"); // date, DD
  }

  const yearUTC = String(date.getUTCFullYear()); // date, YYYY
  const monthUTC = String(date.getUTCMonth() + 1).padStart(2, "0"); // date, MM
  const dayUTC = String(date.getUTCDate()).padStart(2, "0"); // date, DD

  return [
    [yearStart, monthStart, dayStart], // [YYYY, MM, DD] HST
    [yearEnd, monthEnd, dayEnd], // [YYYY, MM, DD] HST
    [yearUTC, monthUTC, dayUTC], // [YYYY, MM, DD] UTC
  ];
};

/**
 * Converts a UTC date and time to HST (Hawaii Standard Time).
 * Produces string in same format as engarchive output.
 *
 * @param {Array} dateArray - An array containing the UTC date and time. The array should have the following format: [YYYY, MMM, DD, HH:MM:SS].
 * @returns {string} A string in the format 'MM/DD/YYYY HH:MM:SS'.
 */
function convertUTCToHST(dateArray) {
  // check log files for month abbreviations; based of SMU_param.log files
  const shortMonths = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };

  // Create a Date object from the dateArray (UTC)
  const date = new Date(
    `${dateArray[0]}-${shortMonths[dateArray[1]]}-${dateArray[2]}T${
      dateArray[3]
    }Z`
  );

  // Format the HST date and time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Return the HST date and time as an array
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  getDateArray,
  convertUTCToHST,
};

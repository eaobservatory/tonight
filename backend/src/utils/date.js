/**
 * Gets start and end dates used for querying engarchive while accounting for HST vs UTC.
 *
 * @returns {Array<Array<string>>} An array containing two arrays, each representing a date as [year, month, day].
 */
const getDateArray = () => {
  const date = new Date(); // today
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

  // check what day it is in UTC based on HST hour
  if (hour >= 14) {
    yearStart = date.getFullYear(); // date, YYYY
    yearEnd = nextDate.getFullYear(); // nextDate, YYYY
    monthStart = String(date.getMonth() + 1).padStart(2, "0"); // date, MM
    monthEnd = String(nextDate.getMonth() + 1).padStart(2, "0"); // nextDate, MM
    dayStart = String(date.getDate()).padStart(2, "0"); // date, DD
    dayEnd = String(nextDate.getDate()).padStart(2, "0"); // nextDate, DD
  } else {
    yearStart = prevDate.getFullYear(); // prevDate, YYYY
    yearEnd = date.getFullYear(); // date, YYYY
    monthStart = String(prevDate.getMonth() + 1).padStart(2, "0"); // prevDate, MM
    monthEnd = String(date.getMonth() + 1).padStart(2, "0"); // date, MM
    dayStart = String(prevDate.getDate()).padStart(2, "0"); // prevDate, DD
    dayEnd = String(date.getDate()).padStart(2, "0"); // date, DD
  }

  return [
    [yearStart, monthStart, dayStart],
    [yearEnd, monthEnd, dayEnd],
  ];
};

module.exports = {
  getDateArray,
};

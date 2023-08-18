/**
 * Gets start and end dates used for querying engarchive while accounting for HST vs UTC.
 * Queries and engarchive are in HST, but each day of data needs to be in UTC.
 *
 * @returns {Array<Array<string>>} An array containing three arrays, each representing a date as [year, month, day]. The first two are HST, the last is UTC.
 */
export const getDateArray = () => {
  const date = new Date(); // today in HST
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
 * Formats a date into a time string.
 * The date is a Date object string, as found in the database.
 *
 * @param {string} date - The date to format.
 * @returns {string} - The formated time string in the format HH:MM.
 */
export const dateToTime = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getUTCHours().toString().padStart(2, "0")}:${dateObj
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Get the previous day based on the given date.
 * Gets HST date range for a given UTC date.
 *
 * @param {string} date - The date in format "YYYY-MM-DD".
 * @returns {Array<string>} - An array containing [year, month, day] of the previous day.
 */
export const getPrevDay = (date: string) => {
  const [year, month, day] = date.split("-");
  const currentDate = new Date(Number(year), Number(month) - 1, Number(day));
  const nextDate = new Date(); // tomorrow
  nextDate.setDate(currentDate.getDate() - 1);
  const nextYear = String(nextDate.getFullYear()); // date, YYYY
  const nextMonth = String(nextDate.getMonth()).padStart(2, "0"); // nextDate, MM
  const nextDay = String(nextDate.getDate()).padStart(2, "0"); // nextDate, DD

  return [nextYear, nextMonth, nextDay];
};

/**
 * Formats a date object into a string.
 *
 * @param {Date} date - The date object (type "any" to avoid type errors).
 * @returns {Array<string>} - A string in the format "YYYY-MM-DD".
 */
export const dateToYMD = (date: any) => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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

const getDateArray = () => {
  const date = new Date(); // HST
  const prevDate = new Date(date.getTime());
  prevDate.setDate(date.getDate() - 1);
  const nextDate = new Date(date.getTime());
  nextDate.setDate(date.getDate() + 1);

  const hour = date.getHours();

  let yearStart;
  let yearEnd;
  let monthStart;
  let monthEnd;
  let dayStart;
  let dayEnd;

  // setting start and end dates for engarchive query based on hst -> utc day
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

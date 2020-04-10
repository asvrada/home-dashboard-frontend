/**
 * Is leap year?
 * @param year: 4 digit number represents year
 * @returns {boolean}
 */
function isLeapYear(year) {
  // credit: https://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function daysInMonth(year, month) {
  const table = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return table[month];
}

function getDateObj() {
  return new Date();
}

function getMonth() {
  return getDateObj().getMonth() + 1;
}

function getDate() {
  return getDateObj().getDate();
}

function getDay() {
  const DAT_TO_STRING = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  return DAT_TO_STRING[getDateObj().getDay()];
}

/**
 * Include today, how many days left in this month
 * Result always >= 1
 * @returns {number}
 */
function getDaysLeft() {
  return Math.max(1,
    1 + daysInMonth(getDateObj().getFullYear(), getMonth()) - getDate());
}

export { getMonth, getDate, getDay, getDaysLeft };
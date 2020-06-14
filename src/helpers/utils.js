import React from "react";

function isDevEnv() {
  return [process, process.env, process.env.NODE_ENV === "development"].every(
    (each) => each !== null && each !== false,
  );
}

/**
 *
 * @param config: List of tuple (position, color array)
 * @param percentage
 */
function getColor(config, percentage) {
  function colorHelper(colorStart, colorEnd, percentage) {
    function helper(start, end, percent) {
      return Math.round((end - start) * percent + start);
    }

    return [
      helper(colorStart[0], colorEnd[0], percentage),
      helper(colorStart[1], colorEnd[1], percentage),
      helper(colorStart[2], colorEnd[2], percentage),
    ];
  }

  let colorStart = null;
  let colorEnd = null;
  let relativePercentage = null;

  let i = 0;

  while (i < config.length && (config[i][0] < percentage)) {
    i++;
  }

  if (i === 0) {
    colorStart = config[0][1];
    colorEnd = colorStart;
    relativePercentage = 0;
  } else if (i === config.length) {
    colorStart = config[config.length - 1][0];
    colorEnd = colorStart;
    relativePercentage = 0;
  } else {
    // in between
    colorStart = config[i - 1][1];
    colorEnd = config[i][1];
    const startPercentage = config[i - 1][0];
    const endPercentage = config[i][0];
    relativePercentage = (percentage - startPercentage) /
      (endPercentage - startPercentage);
  }

  // generate color array
  return colorHelper(colorStart, colorEnd, relativePercentage);
}

function formatCurrency(amount) {
  return amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").split(".");

}

function DateTime({ time }) {
  const objDatetime = new Date(time);

  const year = objDatetime.getFullYear();
  const month = objDatetime.getMonth() + 1;
  const date = objDatetime.getDate().toString().padStart(2, "0");
  const hour = objDatetime.getHours();
  const minute = objDatetime.getMinutes().toString().padStart(2, "0");

  const str = `${hour}:${minute} ${month}/${date}/${year}`;

  return (
    <div>{str}</div>
  );
}

function convertDate(str_datetime) {
  const day = new Date(str_datetime);
  return [day.getFullYear(), day.getMonth() + 1, day.getDate()];
}

/**
 * @param edges: [{node: {amount, timeCreated}}]
 * @return: [node | {type: metadata, date: [1 2 3], sum: number}]
 */
function insertDate(edges) {
  function isEqual(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  if (edges.length === 0) {
    return edges;
  }

  const today = new Date();
  let newEdges = [];

  let tempSum = 0;
  let prevDay = null;

  for (let idx = edges.length - 1; idx >= 0; idx--) {
    if (!edges.hasOwnProperty(idx)) {
      continue;
    }

    const node = edges[idx].node;
    const date = convertDate(node.timeCreated);
    if (prevDay === null) {
      prevDay = date;
    }

    if (!isEqual(prevDay, date)) {
      newEdges.push({
        type: "metadata",
        sum: tempSum,
        date: prevDay,
      });

      tempSum = 0;
      prevDay = date;
    }

    newEdges.push(node);

    tempSum += node.amount;
  }

  // handle last
  const dateLatest = convertDate(edges[0].node.timeCreated);
  if (!isEqual(dateLatest, today)) {
    newEdges.push({
      type: "metadata",
      sum: tempSum,
      date: dateLatest,
    });
  }

  return newEdges.reverse();
}

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

function getCurrentISOString() {
  return (new Date()).toISOString();
}

function booleanToInt(flag) {
  return flag ? 1 : 0;
}

/**
 * isSkipBudget: ____x
 * isSkipTotal: ___x_
 * @param flag: number
 * @returns {{isSkipTotal: boolean, isSkipBudget: boolean}}
 */
function unpackSummaryFlag(flag) {
  return {
    isSkipBudget: !!(flag & 1),
    isSkipTotal: !!(flag & 2),
  };
}

/**
 *
 * @param isSkipBudget: boolean
 * @param isSkipTotal: boolean
 * @returns {number}
 */
function packSummaryFlag(isSkipBudget, isSkipTotal) {
  return booleanToInt(isSkipBudget) | (booleanToInt(isSkipTotal) * 2);
}

function getBaseURL() {
  if (isDevEnv()) {
    // mock server URL
    return "http://localhost:4444/";
  } else {
    return "https://api.kksk.biz/";
  }
}

export {
  isDevEnv, getBaseURL,
  formatCurrency,
  getColor,
  DateTime,
  convertDate,
  insertDate,
  getMonth, getDate, getDay, getDaysLeft,
  getCurrentISOString,
  booleanToInt,
  packSummaryFlag, unpackSummaryFlag,
};
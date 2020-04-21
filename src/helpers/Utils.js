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
    relativePercentage = (percentage - startPercentage) / (endPercentage - startPercentage);
  }

  // generate color array
  return colorHelper(colorStart, colorEnd, relativePercentage);
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

export { isDevEnv, getColor, DateTime };
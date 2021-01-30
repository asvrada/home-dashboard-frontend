function isDevEnv(): boolean {
  return [process, process.env, process.env.NODE_ENV === 'development'].every(
    (each) => each !== null && each !== false,
  );
}

/**
 *
 * @param config: List of tuple (position, color array)
 * @param percentage
 */
function getColor(config: [number, number[]][], percentage: number) {
  function colorHelper(colorStart: number[], colorEnd: number[], percentage: number) {
    function helper(start: number, end: number, percent: number) {
      return Math.round((end - start) * percent + start);
    }

    return [
      helper(colorStart[0], colorEnd[0], percentage),
      helper(colorStart[1], colorEnd[1], percentage),
      helper(colorStart[2], colorEnd[2], percentage),
    ];
  }

  let colorStart: number[];
  let colorEnd: number[];
  let relativePercentage: number;

  let i = 0;

  while (i < config.length && (config[i][0] < percentage)) {
    i++;
  }

  if (i === 0) {
    colorStart = config[0][1];
    colorEnd = colorStart;
    relativePercentage = 0;
  } else if (i === config.length) {
    colorStart = config[config.length - 1][1];
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

function formatCurrency(amount: number) {
  return amount.toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    .split('.');
}

function convertDate(str_datetime: string) {
  const day = new Date(str_datetime);
  return [day.getFullYear(), day.getMonth() + 1, day.getDate()];
}

/**
 * @param edges: [{node: {amount, timeCreated}}]
 * @return: [node | {type: metadata, date: [1 2 3], sum: number}]
 */
function insertDate(edges: any[]) {
  function isEqual(a: any, b: any) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  function createMetadata(sum: number, date: number[]) {
    return {
      isMetadata: true,
      sum: sum,
      date: date,
    };
  }

  if (edges.length === 0) {
    return edges;
  }

  const today = new Date();
  const newEdges = [];

  let tempSum = 0;
  let prevDay = null;

  for (let idx = edges.length - 1; idx >= 0; idx--) {
    if (!Object.prototype.hasOwnProperty.call(edges, idx)) {
      continue;
    }

    const node = {
      ...(edges[idx].node),
      isMetadata: false
    };

    const date = convertDate(node.timeCreated);
    if (prevDay === null) {
      prevDay = date;
    }

    if (!isEqual(prevDay, date)) {
      newEdges.push(createMetadata(tempSum, prevDay));

      tempSum = 0;
      prevDay = date;
    }

    newEdges.push(node);

    tempSum += node.amount;
  }

  // handle last
  const dateLatest = convertDate(edges[0].node.timeCreated);
  if (!isEqual(dateLatest, today)) {
    newEdges.push(createMetadata(tempSum, dateLatest));
  }

  return newEdges.reverse();
}

function booleanToInt(flag: boolean): number {
  return flag ? 1 : 0;
}


interface returnUnpackSummaryFlag {
  isSkipBudget: boolean,
  isSkipTotal: boolean
}

/**
 * isSkipBudget: ____x
 * isSkipTotal: ___x_
 * @param flag: number
 * @returns {{isSkipTotal: boolean, isSkipBudget: boolean}}
 */
function unpackSummaryFlag(flag: number): returnUnpackSummaryFlag {
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
function packSummaryFlag(isSkipBudget: boolean, isSkipTotal: boolean): number {
  return booleanToInt(isSkipBudget) | (booleanToInt(isSkipTotal) * 2);
}

function getBaseURL() {
  if (isDevEnv()) {
    // mock server URL
    return 'http://localhost:4444/';
  } else {
    throw new DOMException('Missing prod server');
  }
}

const SET_UNDEFINED = new Set(['', 'none', 'null', null, undefined]);

function shouldBeUndefined(val: any): boolean {
  return SET_UNDEFINED.has(val);
}

function findById(items: any[], id: string) {
  // todo: use map
  for (const each of items) {
    if (each.id === id) {
      return each;
    }
  }

  return null;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
  isDevEnv, getBaseURL,
  formatCurrency,
  getColor,
  convertDate,
  insertDate,
  booleanToInt,
  packSummaryFlag, unpackSummaryFlag,
  shouldBeUndefined,
  findById, capitalizeFirstLetter,
};

import React from 'react';
import { formatCurrency } from '../../../helpers/utils';

function isCurrentYear(year) {
  const currentYear = (new Date()).getFullYear().toString();

  return year.toString() === currentYear;
}

function DateBox({ date, sum }) {
  const month = date[1].toString().padStart(2, '0');
  const day = date[2].toString().padStart(2, '0');
  const isNegative = sum < 0;
  const strAmount = formatCurrency(Math.abs(sum));

  const componentYear = isCurrentYear(date[0])
    ? null
    : <span>{date[0]}/</span>;

  const componentAmount = (
    <div>
      {isNegative ? <span>-</span> : null}
      <span>$</span>
      <span>{strAmount[0]}</span>
      <span>.</span>
      <span>{strAmount[1]}</span>
    </div>
  );

  return (
    <div>
      <span>{componentYear}{month}/{day}</span>
      {componentAmount}
    </div>
  );
}

export default DateBox;
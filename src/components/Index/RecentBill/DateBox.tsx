import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { formatCurrency } from '../../../helpers/utils';

function isCurrentYear(year: string) {
  const currentYear = (new Date()).getFullYear().toString();

  return year === currentYear;
}

function isToday(date: number[]) {
  const currentDate = new Date();

  return currentDate.getFullYear() === date[0]
    && (currentDate.getMonth() + 1) === date[1]
    && currentDate.getDate() === date[2];
}

const useStyles = makeStyles(() => ({
  app: {
    'display': 'inline-block',
    'border-radius': '5px',
    'background-color': 'antiquewhite'
  },
  date: {},
  amount: {
    'margin-left': '4px'
  }
}));

interface IDateBox {
  date: number[],
  sum: number
}

function DateBox({date, sum}: IDateBox) {
  const classes = useStyles();

  const year = date[0].toString();
  const month = date[1].toString().padStart(2, '0');
  const day = date[2].toString().padStart(2, '0');
  const shouldDisplayToday = isToday(date);

  const isNegative = sum < 0;
  const strAmount = formatCurrency(Math.abs(sum));

  const strDate = isCurrentYear(year) ? `${month}/${day}` : `${year}/${month}/${day}`;

  const componentSign = isNegative ? <span className='amount-sign'>-</span> : <span className='amount-sign'>+</span>;

  const displayAmount = false;

  return (
    <Box className={classes.app} mt={1} mb={0.5} px={0.5}>
      <span className={classes.date}>{shouldDisplayToday ? 'TODAY' : strDate}</span>
      {displayAmount ?

        <span className={classes.amount}>
        {componentSign}
          <span className='dollar-sign'>$</span>
        <span className='amount-main'>{strAmount[0]}</span>
        <span className='amount-dot'>.</span>
        <span className='amount-decimal'>{strAmount[1]}</span>
      </span>
        : null}
    </Box>
  );
}

export default DateBox;
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { formatCurrency } from '../../../helpers/utils';

const useStyles = makeStyles(() => ({
  positiveSign: {},
  dollarSign: {
    'opacity': '0.5',
    'margin-right': '3px'
  },
  amountDecimal: {
    'font-size': '0.8rem'
  }
}));

function Currency({amount}: any) {
  const classes = useStyles();
  const isPositive = amount > 0;

  amount = Math.abs(amount);
  const strAmount = formatCurrency(amount);

  const componentPositiveSign = isPositive ?
    <span className={classes.positiveSign}>+</span>
    : null;

  return (
    <div>
      {componentPositiveSign}
      <span className={classes.dollarSign}>$</span>
      <span>{strAmount[0]}</span>
      <span>.</span>
      <span className={classes.amountDecimal}>{strAmount[1]}</span>
    </div>
  );
}

export default Currency;
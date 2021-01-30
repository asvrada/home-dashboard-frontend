import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { formatCurrency } from '../../../helpers/utils';

const useStyles = makeStyles(() => ({
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

  amount = Math.abs(amount);
  const strAmount = formatCurrency(amount);

  return (
    <div>
      <span className={classes.dollarSign}>$</span>
      <span>{strAmount[0]}</span>
      <span>.</span>
      <span className={classes.amountDecimal}>{strAmount[1]}</span>
    </div>
  );
}

export default Currency;
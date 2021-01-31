import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EnumPage, makeURL } from '../../../helpers/url';
import Card from './Card';
import Category from './Category';
import Company from './Company';
import Currency from './Currency';

interface IEntry {
  bill: any
}

const StyleIncome = {
  'background-color': 'aqua'
};

const StyleSpending = {
  'background-color': 'white'
};

const useStyles = makeStyles<any, any>({
  app: props => ({
    'background-color': props['background-color'],
    'cursor': 'pointer'
  })
});

function Entry({bill}: IEntry): any {
  const isIncome = bill.amount > 0;
  const classes = useStyles(isIncome ? StyleIncome : StyleSpending);
  const history = useHistory();

  return (
    <Paper className={classes.app}
           onClick={() => history.push(makeURL(EnumPage.Entry, [bill.id]))}>
      <Grid container>
        <Grid item xs={2}>
          <Category bill={bill} />
        </Grid>

        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <Currency amount={bill.amount} />
            </Grid>
            <Grid item xs={12}>
              {bill.note}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Card card={bill.card} />
        </Grid>

        <Grid item xs={3}>
          <Company company={bill.company} />
        </Grid>
      </Grid>

    </Paper>
  );
}

export default Entry;

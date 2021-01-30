import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import Card from './Card';
import Category from './Category';
import Company from './Company';
import Currency from './Currency';

interface IEntry {
  bill: any
}

function Entry({bill}: IEntry): any {
  const isIncome = bill.income > 0;

  return (
    <Paper>
      <Grid container>
        <Grid item xs={2}>
          <Category bill={bill} />
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <Currency amount={bill.amount} />
            </Grid>
            <Grid item xs={12}>
              {bill.note}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Card card={bill.card} />
        </Grid>

        <Grid item xs={2}>
          <Company company={bill.company} />
        </Grid>
      </Grid>

    </Paper>
  );
}

export default Entry;

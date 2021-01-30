import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

function RecentBillHeader(): any {
  return (
    <Grid container justify="space-between">
      <Grid item>
        Recent Transaction
      </Grid>

      <Grid item>
        <Box component="span" px={1}>+</Box>
        <Box component="span" mx={1}>View All</Box>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  footer: {
    'text-align': 'center'
  }
}));

function RecentBill(): any {
  const classes = useStyles();

  return (
    <Paper>
      <Box p={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RecentBillHeader />
          </Grid>

          <Grid item xs={12}>
            Body
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.footer}>
              View all items
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default RecentBill;

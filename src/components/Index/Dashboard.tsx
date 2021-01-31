import { Grid } from '@material-ui/core';
import React from 'react';

import RecentBill from './RecentBill/RecentBill';
import Summary from './Summary/Summary';
import UpcomingBill from './Upcoming/UpcomingBill';

function Dashboard(): any {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Summary />
      </Grid>

      <Grid item xs={12}>
        <RecentBill />
      </Grid>

      <Grid item xs={12}>
        <UpcomingBill />
      </Grid>
    </Grid>
  );
}

export default Dashboard;

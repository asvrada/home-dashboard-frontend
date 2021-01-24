import { Grid } from '@material-ui/core';
import React from 'react';

import Summary from '../Summary/Summary';
// import ListView from '../Views/ListView/ListView';
import PieChart from '../Views/PieChart/PieChart';

function Dashboard(): any {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Summary />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {/*<Grid item xs={12} md={4}>*/}
          {/*  <ListView />*/}
          {/*</Grid>*/}

          <Grid item xs={12} md={8}>
            <PieChart />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

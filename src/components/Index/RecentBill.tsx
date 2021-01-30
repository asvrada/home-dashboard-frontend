import { useQuery } from '@apollo/react-hooks';
import { Box, Button, Grid, IconButton, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import React from 'react';
import { GET_TRANSACTIONS } from '../../helpers/graphql';
import { insertDate } from '../../helpers/utils';
import DateBox from '../Views/ListView/DateBox';
import Entry from './Bill/Entry';

function RecentBillHeader(): any {
  return (
    <Grid container justify="space-between">
      <Grid item>
        Recent Transaction
      </Grid>

      <Grid item>
        <Box component='span' mr={1}>
          <IconButton size="small" color="primary" aria-label="add">
            <Add />
          </IconButton>
        </Box>
        <Button size="small" color="primary">
          View All
        </Button>
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

  const {loading, error, data} = useQuery(GET_TRANSACTIONS, {
    variables: {
      limit: 5,
    },
  });

  let components: any = <div>Loading</div>;

  if (!loading && !error) {
    const edges = insertDate(data.bills.edges);

    components = edges.map((node: any) => {
      if (node.isMetadata) {
        return (
          <DateBox key={String(node.date)} date={node.date} sum={node.sum} />
        );
      }

      return (
        <Box key={node.id} p={1}>
          <Entry key={node.id} bill={node} />
        </Box>
      );
    });
  }

  return (
    <Paper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <RecentBillHeader />
        </Grid>

        <Grid item xs={12}>
          {components}
        </Grid>

        <Grid item xs={12} className={classes.footer}>
          <Button size="small" color="primary">
            View All
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RecentBill;

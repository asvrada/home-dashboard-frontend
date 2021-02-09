import { useQuery } from '@apollo/react-hooks';
import { Box, Button, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import { GET_TRANSACTIONS } from '../../../helpers/graphql';
import { EnumPage, routeURL } from '../../../helpers/url';
import { insertDate } from '../../../helpers/utils';
import DateBox from './DateBox';
import Entry from './Entry';

function RecentBillHeader(): any {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Box ml={0.5}>
          <Typography variant="h6">
            Recent Transaction
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box component='span' mr={1}>
          <IconButton size="small" color="primary" aria-label="add"
                      component={Link} to={routeURL(EnumPage.EntryNew)}>
            <Add />
          </IconButton>
        </Box>
        <Button size="small" color="primary"
                component={Link} to={routeURL(EnumPage.AllEntry)}>
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

      const bill = node;

      return (
        <Box key={bill.id}>
          <Entry bill={bill} />
        </Box>
      );
    });
  }

  return (
    <Paper>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <RecentBillHeader />
        </Grid>

        <Grid item xs={12}>
          <Box px={1}>
            {components}
          </Box>
        </Grid>

        <Grid item xs={12} className={classes.footer}>
          <Button size="small" color="primary"
                  component={Link} to={routeURL(EnumPage.AllEntry)}>
            View All
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RecentBill;

import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { getAllEnums_enumCat_edges_node } from '../../helpers/types/getAllEnums';

const useStyle = makeStyles(() => ({
  root: {
    'cursor': 'pointer'
  }
}));

// category, id, name, icon
function ListItemEnum({data}: { data: getAllEnums_enumCat_edges_node }) {
  const classes = useStyle();

  return (
    <Paper className={classes.root}>
      <Box p={1}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <span>icon</span>
            <Typography>{data.name}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography align="center">{data.countBill}</Typography>
            <Typography variant="caption">associated records</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default ListItemEnum;

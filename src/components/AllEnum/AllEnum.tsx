import { useQuery } from '@apollo/react-hooks';
import { Box, Grid, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { GET_ENUMS_ALL_TYPE } from '../../helpers/graphql';
import ListItemEnum from './ListItemEnum';

function graphQLResultToArray(data: any) {
  return data.edges.map((each: any) => each.node);
}

function TabPanel(props: any) {
  const {children} = props;
  return (
    <Box p={1} role="tabpanel">
      {children}
    </Box>
  );
}

const useStylesAllEnum = makeStyles(() => ({
  root: {
    'margin': '-16px -8px 0 -8px',
  },
}));

function AllEnum() {
  const classes = useStylesAllEnum();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const {loading, error, data} = useQuery(GET_ENUMS_ALL_TYPE);

  const handleTabSelectionChange = (event: any, newVal: number) => {
    setSelectedTab(newVal);
  };

  // index: the index to be displayed
  // second argument indexLatest: previous index
  const handleTabSwipe = (index: number) => {
    setSelectedTab(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h2>Errored</h2>;
  }

  // console.log(data);

  const componentCategoryEnums = graphQLResultToArray(data.enumCat).map((each: any) => {
    return (
      <Grid key={each.id} item xs={12}>
        <ListItemEnum data={each} />
      </Grid>
    );
  });

  const componentCompanyEnums = graphQLResultToArray(data.enumCom).map((each: any) => {
    return (
      <Grid key={each.id} item xs={12}>
        <ListItemEnum data={each} />
      </Grid>
    );
  });

  const componentCardEnums = graphQLResultToArray(data.enumCar).map((each: any) => {
    return (
      <Grid key={each.id} item xs={12}>
        <ListItemEnum data={each} />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs value={selectedTab} onChange={handleTabSelectionChange} aria-label="enum type tabs"
              indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Category" />
          <Tab label="Company" />
          <Tab label="Card" />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={selectedTab}
        onChangeIndex={handleTabSwipe}
      >
        <TabPanel selectedTab={selectedTab} index={0}>
          <Grid container spacing={1}>
            {componentCategoryEnums}
          </Grid>
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={1}>
          <Grid container spacing={1}>
            {componentCompanyEnums}
          </Grid>
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={2}>
          <Grid container spacing={1}>
            {componentCardEnums}
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default AllEnum;

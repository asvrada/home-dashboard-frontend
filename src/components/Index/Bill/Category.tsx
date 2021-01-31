import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  app: {
    'text-align': 'center'
  }
});

function Category({bill}: any) {
  const classes = useStyles();

  let componentCategory = null;
  if (bill.category !== null) {
    componentCategory = (
      <>
        <img
          width="24"
          src={process.env.PUBLIC_URL + '/static/test_icon.jpeg'}
          alt="icon for category" />
        <div>
          {bill.category.name}
        </div>
      </>
    );
  }

  return (
    <Box className={classes.app}>
      {componentCategory}
    </Box>
  );
}

export default Category;
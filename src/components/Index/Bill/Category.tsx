import { Box } from '@material-ui/core';
import React from 'react';

function Category({bill}: any) {
  let componentCategory = null;
  if (bill.category !== null) {
    componentCategory = (
      <span>
        <img
          width="24"
          src={process.env.PUBLIC_URL + '/static/test_icon.jpeg'}
          alt="icon for category" />
        <div>
          {bill.category.name}
        </div>
      </span>
    );
  }

  return (
    <Box>
      {componentCategory}
    </Box>
  );
}

export default Category;
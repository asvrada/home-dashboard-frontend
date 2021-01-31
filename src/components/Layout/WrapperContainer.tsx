import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import SiteHeader from '../SiteHeader';

const useStyles = makeStyles({
  container: {
    'margin-top': '16px',
    'padding-left': '8px',
    'padding-right': '8px'
  }
});

function WrapperContainer({children}: {children: any}): any {
  const classes = useStyles();
  return (
    <div className="App">
      <SiteHeader />

      <Container className={classes.container} maxWidth={'xl'}>
        {children}
      </Container>
    </div>
  );
}

export default WrapperContainer;

import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { useGet } from 'restful-react';

import { UserContext } from '../User/UserContext';
import BudgetGadget from './BudgetGadget';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
  },
}));

function Summary() {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  // GET summary/
  const { data: objSummary } = useGet({
    path: '/restful/summary/',
    requestOptions: { headers: { Authorization: `Bearer ${userContext.accessToken}` } },
  });

  let componentBudget = <div>Loading...</div>;
  if (objSummary) {
    componentBudget = <BudgetGadget obj={objSummary} />;
  }

  return (
    <Card className={classes.card}>
      {componentBudget}
    </Card>
  );
}

export default Summary;

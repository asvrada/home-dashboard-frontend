import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Dashboard from "./Dashboard";

import { IUserContext, UserAuthState, UserContext } from "./User/UserContext";


/**
 * For anonymous user, show welcome page
 * For authed user, show dashboard
 */
function LandingPage() {
  const userContext = useContext(UserContext) as IUserContext;

  if (userContext.userAuthState === UserAuthState.PROCESSING) {
    return <div>Authenticating...</div>;
  }

  if (userContext.userAuthState === UserAuthState.AUTHED) {
    return (
      <Dashboard />
    );
  }

  return (
    <Grid container spacing={1} alignContent="center" alignItems="center">
      <Grid item xs={12}>
        <Box textAlign="center">
          <Typography variant="h3">A different financial dashboard</Typography>
        </Box>
      </Grid>
    </Grid>
  );

}

export default LandingPage;

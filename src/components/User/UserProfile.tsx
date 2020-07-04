import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { IUserContext, UserAuthState, UserContext } from "./UserContext";

function UserProfile() {
  const userContext = useContext(UserContext) as IUserContext;

  if (userContext.userAuthState === UserAuthState.UNAUTHED) {
    return (
      <div>
        <div>{userContext.userAuthState}</div>
      </div>
    );
  }

  return (
    <Box>
      <Typography variant="h5">Profile</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LinkContainer to="/setting/">
            <Button variant="contained">
              Change Budget
            </Button>
          </LinkContainer>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={() => {
            userContext.logout()
          }}>Logout</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;

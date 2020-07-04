import { Box, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import { Redirect, useHistory } from "react-router-dom";

import { isDevEnv } from "../../helpers/utils";

import { IUserContext, UserAuthState, UserContext } from "./UserContext";

interface Props {
  redirect?: string
}

function handleGoogleLoginSuccess(res: any, userContext: IUserContext) {
  console.log("dashboard - google login");
  const token = res.getAuthResponse().id_token;

  return userContext.googleLogin(token);
}

function Login({redirect}: Props) {
  redirect = redirect ? redirect : "/";

  const userContext = useContext(UserContext) as IUserContext;
  const history = useHistory();

  if (userContext.userAuthState === UserAuthState.AUTHED) {
    return <Redirect to={redirect} />;
  }

  const email = "noojeff@gmail.com";
  const password = "4980";

  const handleLoginResponse = (succeed: boolean) => {
    if (succeed) {
      history.push(redirect!);
    }
  };

  const componentEmailLogin = (
    <Box>
      <p>Login with username and password</p>
      <button onClick={() => {
        userContext.emailLogin(email, password)
          .then(handleLoginResponse);
      }}>
        Login
      </button>
    </Box>
  );

  return (
    <Box>
      <Grid container spacing={1}>
        {isDevEnv() ? componentEmailLogin : null}

        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography variant="h4">Signup & Login</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <GoogleLogin
              clientId="508553430731-3sjtbacd9na89labelop5fii28h4ho1m.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={(res: any) => {
                handleGoogleLoginSuccess(res, userContext).then(handleLoginResponse);
              }}
              onFailure={(res: any) => {
                console.log("Google login failed", res);
              }}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;

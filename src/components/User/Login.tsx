import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import GoogleLogin from "react-google-login";
import { Redirect, useHistory } from "react-router-dom";

import { isDevEnv } from "../../helpers/utils";
import WrapperContainer from "../Layout/WrapperContainer";

import { IUserContext, UserAuthState, UserContext } from "./UserContext";

interface Props {
  redirect?: string
}

function handleGoogleLoginSuccess(res: any, userContext: IUserContext) {
  console.log("Google User object", res);
  const token = res.getAuthResponse().id_token;

  userContext.googleLogin(token);
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

  const componentEmailLogin = (
    <>
      <Row>
        <h4>Login with username and password</h4>
      </Row>

      <Row>
        <Button onClick={() => {
          userContext.emailLogin(email, password)
            .then(res => {
              if (res) {
                history.push(redirect!);
              }
            });
        }}>
          Login
        </Button>
      </Row>
    </>
  );

  return (
    <WrapperContainer>
      <Col>
        {isDevEnv() ? componentEmailLogin : null}

        <Row>
          <h4>Login with Google Account</h4>
        </Row>

        <Row>
          <GoogleLogin
            clientId="508553430731-3sjtbacd9na89labelop5fii28h4ho1m.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(res: any) => {
              handleGoogleLoginSuccess(res, userContext);
            }}
            onFailure={(res: any) => {

            }}
            cookiePolicy={'single_host_origin'}
          />
        </Row>
      </Col>
    </WrapperContainer>
  );
}

export default Login;

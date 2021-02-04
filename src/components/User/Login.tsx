import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GoogleLogin from 'react-google-login';
import { Redirect, useHistory } from 'react-router-dom';

import { EnumPage, routeURL } from '../../helpers/url';
import { isDevEnv } from '../../helpers/utils';

import { IUserContext, UserAuthState, UserContext } from './UserContext';

interface Props {
  redirect?: string
}

function handleGoogleLoginSuccess(res: any, userContext: IUserContext) {
  console.log('Google User object', res);
  const token = res.getAuthResponse().id_token;

  return userContext.googleLogin(token);
}

function Login({redirect}: Props): any {
  const redirectURL = redirect ?? routeURL(EnumPage.Index);
  const userContext = useContext(UserContext) as IUserContext;
  const history = useHistory();

  if (userContext.userAuthState === UserAuthState.AUTHED) {
    return <Redirect to={redirectURL} />;
  }

  const email = 'noojeff@gmail.com';
  const password = '4980';

  const handleLoginResponse = (succeed: boolean) => {
    if (succeed) {
      history.push(redirectURL);
    }
  };

  const componentEmailLogin = (
    <>
      <Row>
        <Col>
          <h4>Login with username and password</h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button onClick={() => {
            userContext.emailLogin(email, password)
              .then(handleLoginResponse);
          }}>
            Login
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      {isDevEnv() ? componentEmailLogin : null}

      <Row>
        <Col>
          <h4>Login with Google Account</h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <GoogleLogin
            clientId="508553430731-3sjtbacd9na89labelop5fii28h4ho1m.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(res: any) => {
              handleGoogleLoginSuccess(res, userContext).then(handleLoginResponse);
            }}
            onFailure={(res: any) => {
              console.log('Google login failed', res);
            }}
            cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
    </>
  );
}

export default Login;

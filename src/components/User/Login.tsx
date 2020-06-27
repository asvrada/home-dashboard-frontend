import React, { useContext } from "react";
import { IUserContext, UserContext } from "./UserContext";
import GoogleLogin from "react-google-login";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function handleGoogleLoginSuccess(res: any, userContext: IUserContext) {
  console.log("Google User object", res);
  const token = res.getAuthResponse().id_token;

  userContext.googleLogin(token);
}

function Login() {
  const userContext = useContext(UserContext) as IUserContext;

  const email = "noojeff@gmail.com";
  const password = "4980";

  return (
    <Col>
      <Row>
        <h4>Login with username and password</h4>
      </Row>

      <Row>
        <button onClick={() => {
          userContext.login(email, password)
        }}>Login
        </button>
      </Row>

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
          // responseType={"code"}
        />
      </Row>
    </Col>
  );
}

export default Login;

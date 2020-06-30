import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import Dashboard from "./Dashboard";
import WrapperContainer from "./Layout/WrapperContainer";

import { IUserContext, UserAuthState, UserContext } from "./User/UserContext";


/**
 * For anonymous user, show welcome page
 * For authed user, show dashboard
 */
function LandingPage() {
  const userContext = useContext(UserContext) as IUserContext;

  if (userContext.userAuthState === UserAuthState.PROCESSING) {
    return <div>Processing</div>;
  }

  if (userContext.userAuthState === UserAuthState.AUTHED) {
    return (
      <WrapperContainer fluid={true}>
        <Dashboard />
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer>
      <Col>
        <Row>
          <h1>Login to see your personalize dashboard</h1>
        </Row>
        <Row>
          <LinkContainer to="/">
            <Button>Login</Button>
          </LinkContainer>
        </Row>
      </Col>
    </WrapperContainer>
  );

}

export default LandingPage;

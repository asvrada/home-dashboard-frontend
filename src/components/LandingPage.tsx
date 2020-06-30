import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { IUserContext, UserAuthState, UserContext } from "./User/UserContext";
import Dashboard from "./Dashboard";
import SiteHeader from "./SiteHeader";


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
      <div>
        <SiteHeader />
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="App">
      <SiteHeader />
      <Container>
        <Row>
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
        </Row>
      </Container>
    </div>
  );

}

export default LandingPage;

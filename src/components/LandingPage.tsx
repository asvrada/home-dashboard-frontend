import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IUserContext, UserAuthState, UserContext } from "./User/UserContext";
import Dashboard from "./Dashboard";
import SiteHeader from "./SiteHeader";
import Button from "react-bootstrap/Button";

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
        <SiteHeader/>
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
            <h1>Login Please</h1>
            </Row>
            <Row><Button href="/login/">Login</Button></Row>
          </Col>
        </Row>
      </Container>
    </div>
  );

}

export default LandingPage;

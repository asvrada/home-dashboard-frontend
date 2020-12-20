import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";

import WrapperContainer from "../Layout/WrapperContainer";
import { IUserContext, UserAuthState, UserContext } from "./UserContext";

function UserProfile() {
  const userContext = useContext(UserContext) as IUserContext;

  if (userContext.userAuthState === UserAuthState.UNAUTHED) {
    return (
      <div>
        <div>You are not logged in.</div>
      </div>
    );
  }

  return (
    <WrapperContainer>
      <Row>
        <div>{userContext.userAuthState}</div>
      </Row>
      <Row>
        <Col>
          <LinkContainer to="/setting/">
            <Button>
              Setting
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => {
            userContext.logout()
          }}>Logout</Button>
        </Col>
      </Row>
    </WrapperContainer>
  );
}

export default UserProfile;

import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import WrapperContainer from "../Layout/WrapperContainer";
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
    <WrapperContainer>
      <Col>
        <div>{userContext.userAuthState}</div>

        <Button onClick={() => {
          userContext.logout()
        }}>Logout</Button>
      </Col>
    </WrapperContainer>
  );
}

export default UserProfile;

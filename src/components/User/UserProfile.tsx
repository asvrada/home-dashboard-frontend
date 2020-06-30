import React, { useContext } from "react";
import { IUserContext, UserAuthState, UserContext } from "./UserContext";
import Button from "react-bootstrap/Button";
import WrapperContainer from "../WrapperContainer";
import Col from "react-bootstrap/Col";

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

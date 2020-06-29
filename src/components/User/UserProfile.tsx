import React, { useContext } from "react";
import { IUserContext, UserAuthState, UserContext } from "./UserContext";
import Button from "react-bootstrap/Button";

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
    <div>
      <div>{userContext.userAuthState}</div>
      <div>{userContext.accessToken}</div>

      <Button onClick={() => {
        userContext.logout()
      }}>Logout</Button>
    </div>
  );
}

export default UserProfile;

import React, { useContext } from "react";
import { IUserContext, UserContext } from "./UserContext";

function User() {
  const user = useContext(UserContext) as IUserContext;

  return (
    <div>
      <div>{user.userAuthState}</div>
      <div>{user.accessToken}</div>
    </div>
  );
}

export default User;

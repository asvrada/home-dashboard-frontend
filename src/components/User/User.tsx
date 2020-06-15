import React, { useContext } from "react";
import { IUserContext, UserContext } from "./UserContext";

function User() {
  const user = useContext(UserContext) as IUserContext;

  return (
    <div>
      <div>{user.tokenAccess}</div>
      <div>{user.tokenRefresh}</div>
    </div>
  );
}

export default User;

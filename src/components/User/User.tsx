import React, { useContext } from "react";
import { IUserContext, UserContext } from "./UserContext";

function User() {
  const user = useContext(UserContext) as IUserContext;

  console.log(user);

  return <div>/user/</div>;
}

export default User;

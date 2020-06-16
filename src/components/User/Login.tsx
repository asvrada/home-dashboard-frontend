import React, { useContext } from "react";
import { IUserContext, UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function Login() {
  const userContext = useContext(UserContext) as IUserContext;

  const username = "admin";
  const password = "4980";

  return <div>
    <button onClick={() => {
      userContext.login(username, password)
    }}>Login</button>

    <Link to="/user/">Go to user</Link>
  </div>;
}

export default Login;

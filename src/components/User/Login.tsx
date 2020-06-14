import React, { useContext } from "react";
import { useMutate } from "restful-react";
import { IUserContext, UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function Login() {
  const userContext = useContext(UserContext) as IUserContext;

  const { mutate: tokenAuth, loading } = useMutate({
    verb: "POST",
    path: `/token-auth/`,
  });

  const username = "admin";
  const password = "4980";

  return <div>
    <button onClick={() => {
      tokenAuth({
        username,
        password
      }).then(res => {
        console.log(res);
        userContext.updateTokenAccess(res.access);
        userContext.updateTokenRefresh(res.refresh);
      });
    }}>Login</button>

    <Link to="/user/">Go to user</Link>
  </div>;
}

export default Login;

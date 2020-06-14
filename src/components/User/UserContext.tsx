import React, { useState } from "react";

interface Props {
  children: any
}

interface IUserContext {
  tokenAccess: null | string,
  tokenRefresh: null | string,
  updateTokenAccess: (token: string) => void,
  updateTokenRefresh: (token: string) => void
}

const UserContext = React.createContext({});

function UserProvider({children}: Props) {

  const [tokenAccess, setTokenAccess] = useState(null);
  const [tokenRefresh, setTokenRefresh] = useState(null);

  return (
    <UserContext.Provider value={{
      tokenAccess, updateTokenAccess: setTokenAccess,
      tokenRefresh, updateTokenRefresh: setTokenRefresh
    }}>
      {children}
    </UserContext.Provider>
  );
}

export type { IUserContext };
export { UserProvider, UserContext };
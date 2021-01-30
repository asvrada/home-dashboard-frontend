import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IUserContext, UserAuthState, UserContext } from './User/UserContext';

function PrivateRoute({children, ...rest}: any): any {
  const userContext = useContext(UserContext) as IUserContext;

  return (
    <Route
      {...rest}
      render={({location}) => {
        let component = <div>Authenticating...</div>;

        switch (userContext.userAuthState) {
          case UserAuthState.UNAUTHED:
            component = (
              <Redirect
                to={{
                  pathname: '/login/',
                  state: {from: location}
                }}
              />
            );
            break;
          case UserAuthState.PROCESSING:
            break;
          case UserAuthState.AUTHED:
            component = children;
            break;
          default:
            throw new DOMException('Invalid state', userContext.userAuthState);
        }

        return component;
      }}
    />
  );
}

export default PrivateRoute;

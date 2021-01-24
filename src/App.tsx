import { ApolloProvider } from '@apollo/react-hooks';
import { CssBaseline } from '@material-ui/core';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, } from 'react-router-dom';
import { RestfulProvider } from 'restful-react';

import './App.scss';
import { TransactionProvider } from './components/Bill/BillContext';
import BillCreate from './components/Bill/BillCreate';

import BillDetail from './components/Bill/BillDetail';
import BillUpdate from './components/Bill/BillUpdate';
import LandingPage from './components/Index/LandingPage';

import PrivateRoute from './components/PrivateRoute';
import Setting from './components/Setting/Setting';
import Login from './components/User/Login';
import { IUserContext, UserContext, UserProvider } from './components/User/UserContext';
import UserProfile from './components/User/UserProfile';
import { getApolloClient } from './helpers/graphql';
import { getBaseURL } from './helpers/utils';

function LoginWrapper({location}: any) {
  // from.pathname
  const pathname = location?.state?.from?.pathname;

  return (
    <Login redirect={pathname} />
  );
}

// This is necessary or GraphQL Client won't have Auth header
function ApolloWrapper() {
  const userContext = useContext(UserContext) as IUserContext;

  return (
    <ApolloProvider client={getApolloClient(userContext.accessToken)}>

      <Switch>
        {/* Bill Detail pages */}
        {/* Create */}
        <PrivateRoute exact path="/detail/new">
          <BillCreate />
        </PrivateRoute>

        {/* Update ID */}
        <PrivateRoute path="/detail/:id/edit">
          <TransactionProvider>
            <BillUpdate />
          </TransactionProvider>
        </PrivateRoute>

        {/* Retrieve/Delete ID */}
        <PrivateRoute path="/detail/:id">
          <TransactionProvider>
            <BillDetail />
          </TransactionProvider>
        </PrivateRoute>

        <PrivateRoute path="/detail">
          <Redirect to="/detail/new" />
        </PrivateRoute>

        {/* User related */}
        <Route path="/login/" component={LoginWrapper} />

        <PrivateRoute path="/profile/">
          <UserProfile />
        </PrivateRoute>

        <PrivateRoute path="/setting/">
          <Setting />
        </PrivateRoute>


        <Route path="/" component={LandingPage} />
      </Switch>

    </ApolloProvider>
  );
}

function App(): any {
  const baseURL = getBaseURL();

  return (
    <>
      <CssBaseline />
      <Router>
        <RestfulProvider base={baseURL}>
          <UserProvider>
            <ApolloWrapper />
          </UserProvider>
        </RestfulProvider>
      </Router>
    </>
  );
}

export default App;

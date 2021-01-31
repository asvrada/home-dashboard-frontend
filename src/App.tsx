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
import { EnumPage, routeURL } from './helpers/url';
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
        {/* View all history Transactions */}
        <PrivateRoute exact path={routeURL(EnumPage.AllEntry)}>
          <div>todo: 查看所有bill</div>
        </PrivateRoute>

        {/* Bill Detail pages */}
        {/* Create */}
        <PrivateRoute exact path={routeURL(EnumPage.EntryNew)}>
          <BillCreate />
        </PrivateRoute>

        {/* Update ID */}
        <PrivateRoute path={routeURL(EnumPage.EntryEdit)}>
          <TransactionProvider>
            <BillUpdate />
          </TransactionProvider>
        </PrivateRoute>

        {/* Retrieve/Delete ID */}
        <PrivateRoute path={routeURL(EnumPage.Entry)}>
          <TransactionProvider>
            <BillDetail />
          </TransactionProvider>
        </PrivateRoute>

        <PrivateRoute path="/entry/">
          <Redirect to={routeURL(EnumPage.EntryNew)} />
        </PrivateRoute>

        {/* User related */}
        <Route path={routeURL(EnumPage.Login)} component={LoginWrapper} />

        <PrivateRoute path={routeURL(EnumPage.Profile)}>
          <UserProfile />
        </PrivateRoute>

        <PrivateRoute path={routeURL(EnumPage.Setting)}>
          <Setting />
        </PrivateRoute>

        <Route exact path={routeURL(EnumPage.Index)} component={LandingPage} />

        <Route>
          <h1>404 Not Found</h1>
        </Route>
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

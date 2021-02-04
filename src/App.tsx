import { ApolloProvider } from '@apollo/react-hooks';
import { CssBaseline } from '@material-ui/core';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, } from 'react-router-dom';
import { RestfulProvider } from 'restful-react';

import './App.scss';

import AllEntry from './components/AllEntry/AllEntry';
import AllEnum from './components/AllEnum/AllEnum';
import { TransactionProvider } from './components/Bill/BillContext';
import BillCreate from './components/Bill/BillCreate';

import BillDetail from './components/Bill/BillDetail';
import BillUpdate from './components/Bill/BillUpdate';
import LandingPage from './components/Index/LandingPage';
import WrapperContainer from './components/Layout/WrapperContainer';

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
      <WrapperContainer>
        <Switch>
          {/* Entry Related */}
          {/* View all history Transactions */}
          <PrivateRoute path={routeURL(EnumPage.AllEntry)}>
            <AllEntry />
          </PrivateRoute>

          {/* Create Entry */}
          <PrivateRoute exact path={routeURL(EnumPage.EntryNew)}>
            <BillCreate />
          </PrivateRoute>

          {/* Update Entry */}
          <PrivateRoute path={routeURL(EnumPage.EntryEdit)}>
            <TransactionProvider>
              <BillUpdate />
            </TransactionProvider>
          </PrivateRoute>

          {/* Detail Page Entry */}
          <PrivateRoute path={routeURL(EnumPage.Entry)}>
            <TransactionProvider>
              <BillDetail />
            </TransactionProvider>
          </PrivateRoute>

          <PrivateRoute exact path="/entry/">
            <Redirect to={routeURL(EnumPage.EntryNew)} />
          </PrivateRoute>

          {/* Enum Related */}
          {/* All Enum */}
          <PrivateRoute path={routeURL(EnumPage.AllEnum)}>
            <AllEnum />
          </PrivateRoute>

          {/* Create Enum */}
          <PrivateRoute exact path={routeURL(EnumPage.EnumNew)}>
            <h1>Create Enum</h1>
          </PrivateRoute>

          {/* Detail/Update Enum */}
          <PrivateRoute path={routeURL(EnumPage.Enum)}>
            <h1>Enum Detail</h1>
          </PrivateRoute>

          <PrivateRoute exact path="/enum/">
            <Redirect to={routeURL(EnumPage.EnumNew)} />
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
      </WrapperContainer>

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

import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";

import { RestfulProvider } from "restful-react";
import { ApolloProvider } from "@apollo/react-hooks";

import PrivateRoute from "./components/PrivateRoute";

import BillDetail from "./components/Bill/BillDetail";
import BillUpdate from "./components/Bill/BillUpdate";
import BillCreate from "./components/Bill/BillCreate";
import Login from "./components/User/Login";
import { IUserContext, UserContext, UserProvider } from "./components/User/UserContext";
import UserProfile from "./components/User/UserProfile";
import SiteHeader from "./components/SiteHeader";
import LandingPage from "./components/LandingPage";
import { TransactionProvider } from "./components/Bill/BillContext";
import { getBaseURL } from "./helpers/utils";
import { getApolloClient } from "./helpers/graphql";

import "./App.scss";

function LoginPage({location}: any) {
  // from.pathname
  const pathname = location?.state?.from?.pathname;

  console.log(pathname);

  return (
    <SiteHeader>
      <Login redirect={pathname} />
    </SiteHeader>
  );
}

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
        <Route path="/login/" component={LoginPage} />

        <PrivateRoute path="/profile/">
          <SiteHeader>
            <UserProfile />
          </SiteHeader>
        </PrivateRoute>

        <Route path="/" component={LandingPage} />
      </Switch>

    </ApolloProvider>
  );
}

function App() {
  const baseURL = getBaseURL();

  return (
    <Router>
      <RestfulProvider base={baseURL}>
        <UserProvider>
          <ApolloWrapper />
        </UserProvider>
      </RestfulProvider>
    </Router>
  );
}

export default App;

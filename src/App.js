import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { RestfulProvider } from "restful-react";
import { ApolloProvider } from "@apollo/react-hooks";
import BillDetail from "./components/Bill/BillDetail";
import BillUpdate from "./components/Bill/BillUpdate";
import BillCreate from "./components/Bill/BillCreate";
import Login from "./components/User/Login";
import { UserContext, UserProvider } from "./components/User/UserContext";
import UserProfile from "./components/User/UserProfile";
import SiteHeader from "./components/SiteHeader";
import { TransactionProvider } from "./components/Bill/BillContext";
import { getBaseURL } from "./helpers/utils";
import { getApolloClient } from "./helpers/graphql";

import "./App.scss";
import LandingPage from "./components/LandingPage";

function ApolloWrapper() {
  const userContext = useContext(UserContext);

  return (
    <ApolloProvider client={getApolloClient(userContext.accessToken)}>

      <Switch>
        {/* Bill Detail pages */}
        {/* Create */}
        <Route exact path="/detail/new">
          <BillCreate />
        </Route>

        {/* Update ID */}
        <Route path="/detail/:id/edit">
          <TransactionProvider>
            <BillUpdate />
          </TransactionProvider>
        </Route>

        {/* Retrieve/Delete ID */}
        <Route path="/detail/:id">
          <TransactionProvider>
            <BillDetail />
          </TransactionProvider>
        </Route>

        <Route path="/detail">
          <Redirect to="/detail/new" />
        </Route>

        {/* User related */}
        <Route path="/login/">
          <SiteHeader>
            <Login />
          </SiteHeader>
        </Route>

        <Route path="/profile/">
          <SiteHeader>
            <UserProfile />
          </SiteHeader>
        </Route>

        <Route path="/">
          <LandingPage/>
        </Route>
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

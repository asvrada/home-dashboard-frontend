import { ApolloProvider } from "@apollo/react-hooks";
import { Container, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import { RestfulProvider } from "restful-react";

import "./App.scss";
import { TransactionProvider } from "./components/Bill/BillContext";
import BillCreate from "./components/Bill/BillCreate";

import BillDetail from "./components/Bill/BillDetail";
import BillUpdate from "./components/Bill/BillUpdate";
import LandingPage from "./components/LandingPage";

import PrivateRoute from "./components/PrivateRoute";
import Setting from "./components/Setting";
import SiteHeader from "./components/SiteHeader";
import Login from "./components/User/Login";
import { IUserContext, UserContext, UserProvider } from "./components/User/UserContext";
import UserProfile from "./components/User/UserProfile";
import { getApolloClient } from "./helpers/graphql";
import { getBaseURL } from "./helpers/utils";

function LoginPage({location}: any) {
  // from.pathname
  const pathname = location?.state?.from?.pathname;

  return (
    <Login redirect={pathname} />
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    // "margin-top": theme.spacing(2),
    "padding": theme.spacing(1)
  }
}));


function ApolloWrapper() {
  const userContext = useContext(UserContext) as IUserContext;
  const classes = useStyles();

  return (
    <ApolloProvider client={getApolloClient(userContext.accessToken)}>
      <Router>
        <SiteHeader />

        <Container maxWidth="lg" className={classes.container}>
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
              <UserProfile />
            </PrivateRoute>

            <PrivateRoute path="/setting/">
              <Setting />
            </PrivateRoute>

            <Route path="/" component={LandingPage} />
          </Switch>

        </Container>
      </Router>
    </ApolloProvider>
  );
}

function App() {
  const baseURL = getBaseURL();

  return (
    <div>
      <RestfulProvider base={baseURL}>
        <UserProvider>
          <ApolloWrapper />
        </UserProvider>
      </RestfulProvider>
    </div>
  );
}

export default App;

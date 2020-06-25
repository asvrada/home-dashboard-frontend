import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { RestfulProvider } from "restful-react";
import { ApolloProvider } from "@apollo/react-hooks";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Summary from "./components/Summary/Summary";
import PieChart from "./components/Views/PieChart/PieChart";
import ListView from "./components/Views/ListView/ListView";
import BillDetail from "./components/Bill/BillDetail";
import BillUpdate from "./components/Bill/BillUpdate";
import BillCreate from "./components/Bill/BillCreate";
import Login from "./components/User/Login";
import { UserContext, UserProvider } from "./components/User/UserContext";
import User from "./components/User/User";
import UserNavbar from "./components/User/Navbar";
import { TransactionProvider } from "./components/Bill/BillContext";
import { getBaseURL } from "./helpers/utils";
import { getApolloClient } from "./helpers/graphql";

import "./App.scss";

function ApolloWrapper() {
  const userContext = useContext(UserContext);

  return (
    <ApolloProvider client={getApolloClient(userContext.getAccessToken())}>

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
          <UserNavbar>
            <Login />
          </UserNavbar>
        </Route>

        <Route path="/logout/">
          <UserNavbar>
            <div>/logout/</div>
          </UserNavbar>
        </Route>

        <Route path="/user/">
          <UserNavbar>
            <User />
          </UserNavbar>
        </Route>

        <Route path="/">
          <Container className="App" fluid>
            <Summary />

            <Row id="graph-container">
              <ListView />
              <PieChart />
            </Row>

          </Container>
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

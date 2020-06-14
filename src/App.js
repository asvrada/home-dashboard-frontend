import React from "react";
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
import { TransactionProvider } from "./components/Bill/BillContext";
import { UserProvider } from "./components/User/UserContext";

import { getBaseURL } from "./helpers/utils";
import { client } from "./helpers/graphql";

import "./App.scss";
import Login from "./components/User/Login";
import User from "./components/User/User";

function App() {
  let baseURL = getBaseURL();

  return (
    <Router>
      <ApolloProvider client={client}>
        <RestfulProvider base={baseURL}>

          <UserProvider>

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
                <Login />
              </Route>

              <Route path="/logout/">
                <div>/logout/</div>
              </Route>

              <Route path="/user/">
                <User />
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

          </UserProvider>

        </RestfulProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;

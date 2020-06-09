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

import { isDevEnv } from "./helpers/utils";
import { client } from "./helpers/graphql";

import "./App.scss";

function App() {
  let baseURL = null;
  if (isDevEnv()) {
    // mock server URL
    baseURL = "http://localhost:4444";
  } else {
    baseURL = "https://api.kksk.biz";
  }

  return (
    <Router>
      <ApolloProvider client={client}>
        <RestfulProvider base={baseURL}>

          <Switch>
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

        </RestfulProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;

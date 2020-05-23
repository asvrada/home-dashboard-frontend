import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import { RestfulProvider } from "restful-react";
import { ApolloProvider } from "@apollo/react-hooks";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Summary from "./components/Summary/Summary";
import PieChart from "./components/views/PieChart/PieChart";
import ListView from "./components/views/ListView/ListView";
import BillDetail from "./pages/BillDetail";

import { isDevEnv } from "./helpers/utils";
import { client } from "./helpers/graphql";
import BillUpdate from "./pages/BillUpdate";
import BillCreate from "./pages/BillCreate";
import { ProviderTransaction } from "./components/helpers/BillContext";

function App() {
  let baseURL = null;
  if (isDevEnv()) {
    // mock server URL
    baseURL = "http://localhost:4444";
  } else {
    baseURL = "http://localhost:4444";
  }

  return (
    <Router>
      <ApolloProvider client={client}>
        <RestfulProvider base={baseURL}>

          <Switch>
            {/* Create */}
            <Route exact path="/detail/new">
              <BillCreate/>
            </Route>

            {/* Update ID */}
            <Route path="/detail/:id/edit">
              <ProviderTransaction>
                <BillUpdate/>
              </ProviderTransaction>
            </Route>

            {/* Retrieve/Delete ID */}
            <Route path="/detail/:id">
              <ProviderTransaction>
                <BillDetail/>
              </ProviderTransaction>
            </Route>

            <Route path="/detail">
              {/* todo: redirect to /detail/new */}
              <p>todo</p>
            </Route>

            <Route path="/">
              <Container className="App" fluid>
                <Summary/>

                <Row id="graph-container">
                  <ListView/>
                  <PieChart/>
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

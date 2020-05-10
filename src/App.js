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
import BillDetail from "./components/detail/BillDetail";

import { isDevEnv } from "./helpers/Utils";
import { client } from "./helpers/graphql";

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
            {/* Edit ID */}
            <Route path="/detail/:id/edit"
                   children={<BillDetail mode="edit"/>}/>

            {/* View/Delete ID */}
            <Route path="/detail/:id" children={<BillDetail/>}/>

            {/* Show 404 */}
            <Route path="/detail" children={<BillDetail/>}/>

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

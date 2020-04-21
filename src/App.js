import React from "react";
import "./App.scss";

import { RestfulProvider } from "restful-react";

import Summary from "./components/Summary/Summary";
import PieChart from "./components/views/PieChart/PieChart";

import { isDevEnv } from "./helpers/Utils";
import { client } from "./helpers/graphql";
import { ApolloProvider } from "@apollo/react-hooks";
import ListView from "./components/views/ListView/ListView";

function App() {
  let baseURL = null;
  if (isDevEnv()) {
    // mock server URL
    baseURL = "http://localhost:4444";
  } else {
    baseURL = null;
  }
  return (
    <ApolloProvider client={client}>
      <RestfulProvider base={baseURL}>
        <div className="App container-fluid">
          <Summary/>

          <div id="graph-container" className="row">
              <ListView/>
              <PieChart/>
          </div>

        </div>
      </RestfulProvider>
    </ApolloProvider>
  );
}

export default App;

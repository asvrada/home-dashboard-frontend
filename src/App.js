import React from "react";
import './App.scss';

import { RestfulProvider } from "restful-react";

import Summary from "./components/Summary/Summary";
import ListView from "./components/views/ListView/ListView";
import PieChart from "./components/views/PieChart/PieChart";
import { isDevEnv } from "./helpers/Utils";

function App() {
  let baseURL = null;
  if (isDevEnv()) {
    // mock server URL
    baseURL = "http://localhost:4444";
  } else {
    // production server URL
    throw "Not Implemented";
  }
  return (
    <RestfulProvider base={baseURL}>
      <div className="App container-fluid">
        <Summary/>

        <div>
          <ListView/>
          <PieChart/>
        </div>

      </div>
    </RestfulProvider>
  );
}

export default App;

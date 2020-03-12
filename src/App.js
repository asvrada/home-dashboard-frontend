import React from "react";

import { RestfulProvider } from "restful-react";

import Summary from "./components/Summary";
import ListView from "./components/views/ListView";
import PieChart from "./components/views/PieChart";

function App() {
  return (
    <RestfulProvider base={"http://localhost:4444"}>
      <div className="App">
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

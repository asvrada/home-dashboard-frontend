import React from "react";

import Summary from "./components/Summary";
import ListView from "./components/money/ListView";
import PieChart from "./components/money/PieChart";

function App() {
  return (
    <div className="App">
      <Summary/>

      <div>
        <ListView/>
        <PieChart/>
      </div>


    </div>
  );
}

export default App;

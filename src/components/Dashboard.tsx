import React from "react";
import Row from "react-bootstrap/Row";

import Summary from "./Summary/Summary";
import ListView from "./Views/ListView/ListView";
import PieChart from "./Views/PieChart/PieChart";


function Dashboard() {
  return (
    <Row className="Dashboard fake-col">
      <Summary />

      <Row id="graph-container">
        <ListView />
        <PieChart />
      </Row>
    </Row>
  );

}

export default Dashboard;

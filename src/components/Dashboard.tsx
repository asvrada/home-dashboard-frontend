import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Summary from "./Summary/Summary";
import ListView from "./Views/ListView/ListView";
import PieChart from "./Views/PieChart/PieChart";


function Dashboard() {
  return (
    <Container className="Dashboard" fluid>
      <Summary />

      <Row id="graph-container">
        <ListView />
        <PieChart />
      </Row>

    </Container>
  );

}

export default Dashboard;

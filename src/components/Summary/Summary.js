import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useGet } from "restful-react";

import AddEntryGadget from "./AddEntryGadget";
import BudgetGadget from "./BudgetGadget";
import TimeDate from "./TimeDate";

import "./Summary.scss";

/**
 * Display a summary of information at the top of window
 * Information to display:
 *  Days left
 *  Budge left
 *  Stock info
 *  Add new entry
 */
function Summary() {
  // GET summary/
  const { data: objSummary } = useGet({
    path: "summary/",
  });

  // Generate <BudgetGadget>
  let componentBudgetGadget = <span>Loading...</span>;
  if (objSummary) {
    componentBudgetGadget = <BudgetGadget obj={objSummary}/>;
  }

  return (
    <Row className="Summary text-center align-items-center">
      <Col className="d-none d-lg-block" md={2}>
        <TimeDate/>
      </Col>

      <Col>
        {componentBudgetGadget}
      </Col>

      <Col md={1}>
        <AddEntryGadget/>
      </Col>
    </Row>
  );
}

export default Summary;

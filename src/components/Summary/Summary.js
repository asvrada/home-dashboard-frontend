import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGet } from "restful-react";

import { UserContext } from "../User/UserContext";
import AddEntryGadget from "./AddEntryGadget";
import BudgetGadget from "./BudgetGadget";

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
  const userContext = useContext(UserContext);

  // GET summary/
  const { data: objSummary } = useGet({
    path: "/restful/summary/",
    requestOptions: { headers: { Authorization: `Bearer ${userContext.accessToken}` } },
  });

  // Generate <BudgetGadget>
  let componentBudgetGadget = (
    <Row style={{
      height: "86px",
    }}>
      <Col>
        <span style={{
          display: "inline-block",
          height: "100%",
          "verticalAlign": "middle",
        }} />
        <span style={{
          display: "inline-block",
        }}>Loading...</span>
      </Col>
    </Row>)
  ;
  if (objSummary) {
    componentBudgetGadget = <BudgetGadget obj={objSummary} />;
  }

  return (
    <Row className="Summary text-center align-items-center">
      <Col>
        {componentBudgetGadget}
      </Col>

      <Col md={1}>
        <AddEntryGadget />
      </Col>
    </Row>
  );
}

export default Summary;

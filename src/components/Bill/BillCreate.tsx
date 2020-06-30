import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import WrapperContainer from "../Layout/WrapperContainer";
import BillFormFunc from "./BillFormFunc";

/**
 * For Create
 */
function BillCreate() {
  return (
    <WrapperContainer>
      <Row>
        <Col>
          <BillFormFunc transaction={undefined} />
        </Col>
      </Row>
    </WrapperContainer>
  );
}

export default BillCreate;

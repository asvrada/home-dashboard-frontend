import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import WrapperContainer from "../Layout/WrapperContainer";
import BillForm from "./BillForm";

/**
 * For Create
 */
function BillCreate() {
  return (
    <WrapperContainer>
      <Row>
        <Col>
          <BillForm transaction={undefined} />
        </Col>
      </Row>
    </WrapperContainer>
  );
}

export default BillCreate;

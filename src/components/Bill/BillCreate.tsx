import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import WrapperContainer from "../Layout/WrapperContainer";
import BillForm from "./BillForm";

/**
 * For Create
 */
function BillCreate(): any {
  return (
    <WrapperContainer>
      <Row className={'mt-2'}>
        <Col>
          <BillForm transaction={undefined} urlToGoBack={'/'} />
        </Col>
      </Row>
    </WrapperContainer>
  );
}

export default BillCreate;

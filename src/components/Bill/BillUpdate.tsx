import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getBill_bill } from "../../helpers/types/getBill";
import WrapperContainer from "../Layout/WrapperContainer";

import { BillContext } from "./BillContext";
import BillForm from "./BillForm";

// @ts-ignore

/**
 * For Update
 */
function BillUpdate() {
  const bill = useContext(BillContext) as getBill_bill;

  return (
    <WrapperContainer>
      <Row>
        <Col>
          <BillForm transaction={bill} urlToGoBack={`/detail/${bill.id}/`} />
        </Col>
      </Row>
    </WrapperContainer>
  );
}

export default BillUpdate;

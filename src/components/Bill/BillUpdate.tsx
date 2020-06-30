import React, { useContext } from "react";
import Col from "react-bootstrap/Col";

import { getBill_bill } from "../../helpers/types/getBill";

import { BillContext } from "./BillContext";
import BillFormFunc from "./BillFormFunc";
import WrapperForm from "./WrapperForm";

// @ts-ignore

/**
 * For Update
 */
function BillUpdate() {
  const bill = useContext(BillContext) as getBill_bill;

  return (
    <WrapperForm>
      <Col>
        <BillFormFunc transaction={bill} />
      </Col>
    </WrapperForm>
  );
}

export default BillUpdate;

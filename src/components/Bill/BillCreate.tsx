import React from "react";
import Col from "react-bootstrap/Col";

import WrapperForm from "./WrapperForm";
import BillFormFunc from "./BillFormFunc";

/**
 * For Create
 */
function BillCreate() {
  return (
    <WrapperForm>
      <Col>
        <BillFormFunc transaction={undefined} />
      </Col>
    </WrapperForm>
  );
}

export default BillCreate;

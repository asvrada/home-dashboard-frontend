import React from "react";
import Col from "react-bootstrap/Col";

import BillFormFunc from "./BillFormFunc";
import WrapperForm from "./WrapperForm";

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

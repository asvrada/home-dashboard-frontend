import React, { useContext } from "react";
// @ts-ignore
import { useParams } from "react-router-dom";

import { BillContext } from "./BillContext";
import BillForm from "./BillForm";
import Wrapper from "./Wrappers";

/**
 * For Update
 */
function BillUpdate() {
  const {id} = useParams();
  const bill = useContext(BillContext);

  return (
    <Wrapper>
      <BillForm transaction={bill} />
    </Wrapper>
  );
}

export default BillUpdate;

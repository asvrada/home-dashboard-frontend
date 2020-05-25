import React, { useContext } from "react";
// @ts-ignore

import { BillContext } from "./BillContext";
import BillForm from "./BillForm";
import Wrapper from "./Wrappers";
import { getBill_bill } from "../../helpers/types/getBill";

/**
 * For Update
 */
function BillUpdate() {
  const bill = useContext(BillContext) as getBill_bill;

  return (
    <Wrapper>
      <BillForm transaction={bill} />
    </Wrapper>
  );
}

export default BillUpdate;

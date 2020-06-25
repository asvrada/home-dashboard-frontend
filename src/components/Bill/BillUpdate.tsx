import React, { useContext } from "react";
// @ts-ignore

import { BillContext } from "./BillContext";
import Wrapper from "./Wrappers";
import { getBill_bill } from "../../helpers/types/getBill";
import BillFormFunc from "./BillFormFunc";

/**
 * For Update
 */
function BillUpdate() {
  const bill = useContext(BillContext) as getBill_bill;

  return (
    <Wrapper>
      <BillFormFunc transaction={bill} />
    </Wrapper>
  );
}

export default BillUpdate;

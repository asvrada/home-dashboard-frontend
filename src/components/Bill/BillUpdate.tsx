import React, { useContext } from "react";

import { getBill_bill } from "../../helpers/types/getBill";

import { BillContext } from "./BillContext";
import BillForm from "./BillForm";

// @ts-ignore

/**
 * For Update
 */
function BillUpdate() {
  const bill = useContext(BillContext) as getBill_bill;

  return (
    <BillForm transaction={bill} />
  );
}

export default BillUpdate;

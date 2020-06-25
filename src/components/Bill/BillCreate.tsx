import React from "react";

import Wrapper from "./Wrappers";
import BillFormFunc from "./BillFormFunc";

/**
 * For Create
 */
function BillCreate() {
  return (
    <Wrapper>
      <BillFormFunc transaction={undefined} />
    </Wrapper>
  );
}

export default BillCreate;

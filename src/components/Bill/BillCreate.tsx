import React from "react";

import Wrapper from "./Wrappers";
import BillForm from "./BillForm";

/**
 * For Create
 */
function BillCreate() {
    return (
        <Wrapper>
            <BillForm transaction={undefined}/>
        </Wrapper>
    );
}

export default BillCreate;

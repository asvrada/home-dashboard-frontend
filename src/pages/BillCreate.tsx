import React from "react";

import {Wrapper} from "../components/helpers/wrappers";
import BillForm from "../components/Bill/BillForm";

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

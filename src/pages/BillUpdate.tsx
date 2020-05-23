import React, {useContext} from "react";
// @ts-ignore
import {useParams} from "react-router-dom";

import {BillContext} from "../components/helpers/BillContext";
import BillForm from "../components/Bill/BillForm";
import {Wrapper} from "../components/helpers/wrappers";

/**
 * For Update
 */
function BillUpdate() {
    const {id} = useParams();
    const bill = useContext(BillContext);

    return (
        <Wrapper>
            <BillForm transaction={bill}/>
        </Wrapper>
    );
}

export default BillUpdate;

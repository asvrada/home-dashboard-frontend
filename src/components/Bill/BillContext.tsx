import React from "react";
// @ts-ignore
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";

import {DEFAULT_TRANSACTION, GET_BILL} from "../../helpers/graphql";

type Props = {
    children: any
}

const BillContext = React.createContext(DEFAULT_TRANSACTION);

function TransactionProvider({children}: Props) {
    const {id} = useParams();

    // get transaction detail
    const {loading, error, data} = useQuery(GET_BILL, {
        variables: {
            id: id,
        },
    });

    if (loading) {
        return <>Query Loading</>;
    }

    if (error) {
        return <>Query Error when useQuery</>;
    }

    // todo: validate
    const bill = data.bill;

    if (!bill) {
        return <>Query Error when data.bill</>;
    }

    return (
        <BillContext.Provider value={bill}>
            {children}
        </BillContext.Provider>
    );
}


export {TransactionProvider, BillContext};
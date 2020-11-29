import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { useParams } from "react-router-dom";

import { GET_BILL } from "../../helpers/graphql";

type Props = {
  children: any
}

const BillContext = React.createContext({});

function TransactionProvider({children}: Props) {
  const {id} = useParams();

  // get transaction detail
  const {loading, error, data} = useQuery(GET_BILL, {
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <>BillContext: Query is Loading</>;
  }

  if (error) {
    console.log(error);
    return <>BillContext: Errors occurred, see console</>;
  }

  // todo: validate
  const bill = data.bill;

  if (!bill) {
    return <>BillContext: data.bill does not exist</>;
  }

  return (
    <BillContext.Provider value={bill}>
      {children}
    </BillContext.Provider>
  );
}


export { TransactionProvider, BillContext };
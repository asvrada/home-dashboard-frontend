import React from "react";
import { useParams } from "react-router-dom";

function BillDetail({ mode }) {
  const { id } = useParams();
  if (id === undefined) {
    return <div>404</div>;
  }

  // get transaction detail


  return (<div></div>);
}

export default BillDetail;
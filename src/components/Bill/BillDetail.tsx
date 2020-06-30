import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BillContext } from "./BillContext";
import WrapperForm from "./WrapperForm";

import { getBill_bill } from "../../helpers/types/getBill";
import { DELETE } from "../../helpers/graphql";
import { unpackSummaryFlag } from "../../helpers/utils";

/**
 * For Retrieve and Delete
 */
function BillDetail() {
  const bill = useContext(BillContext) as getBill_bill;
  const history = useHistory();
  const [deleteObj] = useMutation(DELETE);

  const id: string = bill.id;
  const {isSkipBudget, isSkipTotal} = unpackSummaryFlag(bill.skipSummaryFlag);

  const handleDelete = () => {
    deleteObj({
      variables: {
        id: id
      }
    }).then(res => {
      console.log("Response", res);
      history.push("/");
    });
  };

  const componentSummaryFlag = (
    <div>
      <p>Summary Flag:</p>
      {isSkipBudget ? <p>Skip Budget</p> : null}
      {isSkipTotal ? <p>Skip Total</p> : null}
    </div>
  );

  return (
    <WrapperForm>
      <Col>
        <p>
          {bill.amount}
        </p>
        <p>
          {bill.category && bill.category.name}
        </p>
        <p>{bill.company && bill.company.name}</p>
        <p>{bill.card && bill.card.name}</p>
        <p>{bill.note}</p>

        {componentSummaryFlag}

        <p>{bill.timeCreated}</p>

        <div>
          <Button className="m-1"
                  onClick={() => history.push(`/`)}>Back</Button>
          <Button className="m-1"
                  onClick={() => history.push(
                    `/detail/${id}/edit/`)}>Edit</Button>
          <Button className="m-1"
                  onClick={handleDelete}>Delete</Button>
        </div>
      </Col>
    </WrapperForm>
  );
}

export default BillDetail;
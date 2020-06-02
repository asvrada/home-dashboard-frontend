import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BillContext } from "./BillContext";
import Wrapper from "./Wrappers";
import { getBill_bill } from "../../helpers/types/getBill";
import { useMutation } from "@apollo/react-hooks";
import { DELETE } from "../../helpers/graphql";

/**
 * For Retrieve and Delete
 */
function BillDetail() {
  const bill = useContext(BillContext) as getBill_bill;
  const history = useHistory();
  const id = bill.id;

  const [deleteObj] = useMutation(DELETE);

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

  return (
    <Wrapper>
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
        <p>{bill.skipSummaryFlag}</p>
        <p>{bill.timeCreated}</p>

        <div>
          <Button className="m-1"
                  onClick={() => history.push(`/`)}>Back</Button>
          <Button className="m-1"
                  onClick={() => history.push(
                    `/detail/${id}/edit`)}>Edit</Button>
          <Button className="m-1"
                  onClick={handleDelete}>Delete</Button>
        </div>
      </Col>
    </Wrapper>
  );
}

export default BillDetail;
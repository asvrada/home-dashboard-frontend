import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BillContext } from "./BillContext";
import Wrapper from "./Wrappers";

/**
 * For Retrieve and Delete
 */
function BillDetail() {
  const { id } = useParams();
  const bill = useContext(BillContext);
  const history = useHistory();

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
        <p>{bill.timeCreated}</p>

        <div>
          <Button className="m-1"
                  onClick={() => history.push(`/`)}>Back</Button>
          <Button className="m-1"
                  onClick={() => history.push(
                    `/detail/${id}/edit`)}>Edit</Button>
        </div>
      </Col>
    </Wrapper>
  );
}

export default BillDetail;
import React from "react";
import Container from "react-bootstrap/Container";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_BILL } from "../../helpers/graphql";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import BillForm from "./BillForm";

function Wrapper({ children }) {
  return (
    <Container>
      <Row>
        {children}
      </Row>
    </Container>
  );
}

/**
 * mode: undefined: view
 *     : edit: edit current bill
 * @param mode: str {undefined|edit}
 */
function BillDetail({ mode }) {
  const { id } = useParams();
  const history = useHistory();

  // get transaction detail
  const { loading, error, data } = useQuery(GET_BILL, {
    variables: {
      id: id,
    },
  });

  if (id === undefined) {
    return <Wrapper>You should not be there; Or provide ID</Wrapper>;
  }

  if (loading) {
    return <Wrapper>Query Loading</Wrapper>;
  }

  if (error) {
    return <Wrapper>Query Error</Wrapper>;
  }

  const bill = data.bill;

  if (mode === "edit") {
    return (
      <Wrapper>
        <BillForm transaction={bill}/>
      </Wrapper>
    );
  }

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
            onClick={() => history.push(`/detail/${id}/edit`)}>Edit</Button>
        </div>
      </Col>
    </Wrapper>
  );
}

export default BillDetail;
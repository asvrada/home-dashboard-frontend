import React from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_BILL } from "../../helpers/graphql";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Wrapper({ children }) {
  return (
    <Container>
      <Row>
        <Col>
          {children}
        </Col>
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
  console.log(bill);

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default BillDetail;
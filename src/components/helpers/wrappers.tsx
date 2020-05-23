import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React from "react";

type Props = {
    children: any
}

function Wrapper({children}: Props) {
  return (
    <Container>
      <Row>
        {children}
      </Row>
    </Container>
  );
}

export { Wrapper };
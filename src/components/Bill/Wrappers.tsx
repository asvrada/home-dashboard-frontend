import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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

export default Wrapper;
import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SiteHeader from "../SiteHeader";

type Props = {
  children: any
}

function Wrapper({children}: Props) {
  return (
    <div>
      <SiteHeader />
      <Container>
        <Row>
          {children}
        </Row>
      </Container>
    </div>
  );
}

export default Wrapper;
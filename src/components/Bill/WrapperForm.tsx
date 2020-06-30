import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SiteHeader from "../SiteHeader";

type Props = {
  children: any
}

function WrapperForm({children}: Props) {
  return (
    <>
      <SiteHeader />
      <Container>
        <Row>
          {children}
        </Row>
      </Container>
    </>
  );
}

export default WrapperForm;
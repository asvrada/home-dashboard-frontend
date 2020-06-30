import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


function WrapperContainer({children}: any) {
  return (
    <Container>
      <Row className={"justify-content-around"}>
        {children}
      </Row>
    </Container>
  );
}

export default WrapperContainer;

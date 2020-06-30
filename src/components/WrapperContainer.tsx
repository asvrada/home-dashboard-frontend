import React from "react";
import Container from "react-bootstrap/Container";


function WrapperContainer({children}: any) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default WrapperContainer;

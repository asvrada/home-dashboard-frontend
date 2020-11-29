import React from "react";
import Container from "react-bootstrap/Container";
import SiteHeader from "../SiteHeader";


function WrapperContainer({fluid, children}: any) {
  return (
    <div className="App">
      <SiteHeader />

      {/* If fluid missing, default to false */}
      <Container fluid={!!fluid}>
        {children}
      </Container>
    </div>
  );
}

export default WrapperContainer;

import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IUserContext, UserContext } from "./User/UserContext";
import Container from "react-bootstrap/Container";

function SiteHeader({children}: any) {
  const userContext = useContext(UserContext) as IUserContext;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link href="/">Main Page</Nav.Link>

          <Nav.Link href="/login/">Login</Nav.Link>

          <Nav.Link href="/profile/">Profile</Nav.Link>
        </Nav>

        {userContext.userAuthState}
      </Navbar>

      <Container fluid>
        {children}
      </Container>
    </>
  );
}

export default SiteHeader;

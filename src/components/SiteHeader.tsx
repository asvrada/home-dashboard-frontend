import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IUserContext, UserAuthState, UserContext } from "./User/UserContext";

function SiteHeader({children}: any) {
  const userContext = useContext(UserContext) as IUserContext;

  const componentNavbar = userContext.userAuthState === UserAuthState.AUTHED ? (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/profile/">Profile</Nav.Link>
        </Nav>
      </Navbar>
    ) :
    // Navbar that non-login user see
    (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/login/">Login</Nav.Link>
        </Nav>
      </Navbar>
    );

  return (
    <>
      {componentNavbar}

      {children}
    </>
  );
}

export default SiteHeader;

import React, { useContext } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IUserContext, UserAuthState, UserContext } from "./User/UserContext";

function SiteHeader({children}: any) {
  const userContext = useContext(UserContext) as IUserContext;

  const componentNavbar = userContext.userAuthState === UserAuthState.AUTHED ? (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto">
          <LinkContainer to="/profile/">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    ) :
    // Navbar that non-login user see
    (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto">
          <LinkContainer to="/login/">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
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

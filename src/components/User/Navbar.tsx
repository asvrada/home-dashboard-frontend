import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IUserContext, UserContext } from "./UserContext";

function UserNavbar({children}: any) {
  const userContext = useContext(UserContext) as IUserContext;

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link href="/login/">Login</Nav.Link>
          <Nav.Link onClick={() => {userContext.logout()}}>Logout</Nav.Link>
          <Nav.Link href="/user/">user</Nav.Link>
        </Nav>

        {userContext.tokenAccess}
      </Navbar>

      {children}
    </div>
  );
}

export default UserNavbar;

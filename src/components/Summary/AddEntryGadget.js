import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";

/**
 * Display a button which allows user to add a new entry to money log book
 */
function AddEntryGadget() {
  return (
    <Row className="AddEntryGadget justify-content-center m-1">
      <LinkContainer to="/detail/new/">
        <Button>New</Button>
      </LinkContainer>
    </Row>
  );
}

export default AddEntryGadget;

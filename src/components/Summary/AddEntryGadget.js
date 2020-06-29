import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

/**
 * Display a button which allows user to add a new entry to money log book
 */
function AddEntryGadget() {
  return (
    <Row className="AddEntryGadget justify-content-center m-1">
      <Button variant="primary" href="/detail/new/">
        New
      </Button>
    </Row>
  );
}

export default AddEntryGadget;

import React from "react";
import Row from "react-bootstrap/Row";

/**
 * Display a button which allows user to add a new entry to money log book
 */
function AddEntryGadget() {
  return (
    <Row className="AddEntryGadget justify-content-center">
      <button>
        New
      </button>
    </Row>
  );
}

export default AddEntryGadget;

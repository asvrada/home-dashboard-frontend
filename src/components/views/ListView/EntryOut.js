import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getNaturalCurrency } from "../../../helpers/Utils";

import CompanyCard from "./CompanyCard";
import Category from "./Category";

/**
 * Display a single entry of log
 */
function EntryOut({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  const componentCategory = <Category node={node}/>;
  const componentCompanyCard = <CompanyCard node={node}/>;
  const componentNote = node.note
    ? (<div className="word-break">- {node.note}</div>)
    : null;

  const componentSeparatorNote = componentNote
    ? (<div className="h-separator"/>) : null;

  return (
    <Row className="EntryOut Entry align-items-center">
      {componentCategory}

      {/* Detail */}
      <Col>
        {/* Amount Company Card*/}
        <Row className="align-items-center">
          <Col xs={7}>{amountNatural}</Col>
          {componentCompanyCard}
        </Row>

        {componentSeparatorNote}
        {componentNote}
      </Col>
    </Row>
  );
}

export default EntryOut;

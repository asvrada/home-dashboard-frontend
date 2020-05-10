import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getNaturalCurrency } from "../../../helpers/Utils";

import CompanyCard from "./CompanyCard";
import Category from "./Category";

function EntryIn({ node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  const componentCategory = <Category node={node}/>;
  const componentCompanyCard = <CompanyCard node={node}/>;
  const componentNote = node.note
    ? (<div className="word-break">+ {node.note}</div>)
    : null;
  const componentSeparatorNote = componentNote
    ? (<div className="h-separator"/>) : null;

  return (
    <Row className="EntryIn Entry align-items-center">
      {/* Detail */}
      <Col>
        {/* Amount Company Card */}
        <Row className="align-items-center">
          {componentCompanyCard}
          <Col xs={7}>{amountNatural}</Col>
        </Row>

        {componentSeparatorNote}
        {componentNote}
      </Col>

      {componentCategory}
    </Row>
  );
}

export default EntryIn;
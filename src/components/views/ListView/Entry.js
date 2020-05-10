import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import className from "classnames";

import { getNaturalCurrency } from "../../../helpers/Utils";

import CompanyAndCard from "./CompanyAndCard";
import Category from "./Category";

/**
 * Display a single entry of log
 */
function Entry({ isIncome, node }) {
  const amountNatural = getNaturalCurrency(node.amount);

  const componentCategory = <Category node={node}/>;
  const componentCompanyCard = <CompanyAndCard node={node}/>;
  const componentNote = node.note
    ? (
      <>
        <div className="h-separator"/>
        <div className="word-break">- {node.note}</div>
      </>
    )
    : null;

  let classname = className("Entry", "align-items-center", {
    "EntryIn": isIncome,
    "EntryOut": !isIncome,
  });

  return (
    <Row className={classname}>
      {componentCategory}

      {/* Amount Note */}
      <Col>
        {amountNatural}
        {componentNote}
      </Col>

      {/* Company Card */}
      {componentCompanyCard}
    </Row>
  );
}

export default Entry;

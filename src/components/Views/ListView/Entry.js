import React from "react";
import { useHistory } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import className from "classnames";

import CompanyAndCard from "./CompanyAndCard";
import Category from "./Category";

import { NaturalCurrency } from "../../../helpers/utils";

/**
 * Display a single entry of log
 */
function Entry({ isIncome, node }) {
  const history = useHistory();
  const componentCurrency = <NaturalCurrency amount={node.amount} />;

  const componentCategory = <Category node={node} />;
  const componentCompanyCard = <CompanyAndCard node={node} />;
  const componentNote = node.note
    ? (
      <>
        <div className="h-separator" />
        <div className="word-break">{isIncome ? '+' : '-'} {node.note}</div>
      </>
    )
    : null;

  let classname = className("Entry", "align-items-center", {
    "EntryIn": isIncome,
    "EntryOut": !isIncome,
  });

  return (
    <Row className={classname}
         onClick={() => history.push(`/detail/${node.id}`)}>
      {componentCategory}

      {/* Amount Note */}
      <Col>
        {componentCurrency}
        {componentNote}
      </Col>

      {/* Company Card */}
      {componentCompanyCard}
    </Row>
  );
}

export default Entry;
